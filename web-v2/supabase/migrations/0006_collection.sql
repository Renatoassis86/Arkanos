-- ============================================================
-- Fase 3+4 · 0006 — Coleção (orbes, medalhas, títulos) + ranking
-- O CATÁLOGO (quais orbes/medalhas/níveis existem) vive no app (TS); aqui só
-- persistimos o que o aluno CONQUISTOU + as funções de leitura do ranking.
-- Idempotente.
-- ============================================================

-- ---------- Tabelas do que foi conquistado (chaveadas por *_key textual) ----------
create table if not exists public.user_orbs (
  user_id     uuid not null references auth.users (id) on delete cascade,
  orb_key     text not null,
  rarity      text not null default 'terrestre',  -- terrestre|lunar|solar|estelar|celeste
  obtained_at timestamptz not null default now(),
  primary key (user_id, orb_key)
);

create table if not exists public.user_achievements (
  user_id         uuid not null references auth.users (id) on delete cascade,
  achievement_key text not null,
  unlocked_at     timestamptz not null default now(),
  primary key (user_id, achievement_key)
);

create table if not exists public.user_titles (
  user_id     uuid not null references auth.users (id) on delete cascade,
  title_key   text not null,
  equipped    boolean not null default false,
  obtained_at timestamptz not null default now(),
  primary key (user_id, title_key)
);

-- ---------- RLS: cada um lê/gerencia apenas a própria coleção ----------
do $$
declare t text;
begin
  foreach t in array array['user_orbs','user_achievements','user_titles'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I on public.%I;', t || '_own_select', t);
    execute format('create policy %I on public.%I for select using (auth.uid() = user_id);', t || '_own_select', t);
    execute format('drop policy if exists %I on public.%I;', t || '_own_write', t);
    execute format('create policy %I on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id);', t || '_own_write', t);
  end loop;
end $$;

-- Rank numérico de raridade (para "subir" a raridade de um orbe já possuído).
create or replace function public.rarity_rank(r text)
returns int language sql immutable as $$
  select case r
    when 'celeste'   then 5
    when 'estelar'   then 4
    when 'solar'     then 3
    when 'lunar'     then 2
    else 1 end;
$$;

-- Concede um orbe (idempotente; mantém a MAIOR raridade já obtida). SECURITY DEFINER.
create or replace function public.grant_orb(p_key text, p_rarity text)
returns void language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then return; end if;
  insert into public.user_orbs (user_id, orb_key, rarity)
  values (v_uid, p_key, p_rarity)
  on conflict (user_id, orb_key) do update
    set rarity = case when rarity_rank(excluded.rarity) > rarity_rank(public.user_orbs.rarity)
                      then excluded.rarity else public.user_orbs.rarity end;
end;
$$;

-- Concede uma medalha/conquista (idempotente). SECURITY DEFINER.
create or replace function public.grant_achievement(p_key text)
returns void language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then return; end if;
  insert into public.user_achievements (user_id, achievement_key)
  values (v_uid, p_key)
  on conflict (user_id, achievement_key) do nothing;
end;
$$;

-- ---------- Ranking (SECURITY DEFINER: contorna a RLS dono-apenas de profiles) ----------
-- O ranking é público por design (nome + nível + Arks), conforme GAMIFICACAO.md §1.
create or replace function public.leaderboard_top(p_limit int default 20)
returns table(rank bigint, user_id uuid, display_name text, level int, total_xp int)
language sql security definer set search_path = public as $$
  select row_number() over (order by total_xp desc, level desc, created_at asc) as rank,
         id, coalesce(nullif(display_name, ''), 'Sábio Anônimo'), level, total_xp
  from public.profiles
  order by total_xp desc, level desc, created_at asc
  limit greatest(p_limit, 1);
$$;

create or replace function public.my_rank()
returns table(rank_pos bigint, rank_total bigint)
language sql security definer set search_path = public as $$
  select (select count(*) + 1 from public.profiles
            where total_xp > (select total_xp from public.profiles where id = auth.uid())),
         (select count(*) from public.profiles);
$$;

-- ============================================================
-- Estende award_arks: ao FINALIZAR, concede medalhas/orbes da trilha de Lógica
-- (Desafio = Logos). Mesma assinatura/retorno de 0005 — efeito colateral só.
-- ============================================================
create or replace function public.award_arks(
  p_game text,
  p_payload jsonb,
  p_bronze int,
  p_prata int,
  p_ouro int,
  p_diamante int
)
returns table(
  total_arks integer,
  lvl integer,
  leveled_up boolean,
  rank_pos bigint,
  rank_total bigint
)
language plpgsql security definer set search_path = public as $$
declare
  v_uid       uuid := auth.uid();
  v_value     int;
  v_old_level int;
  v_total     int;
  v_level     int;
  v_correct   int := coalesce((p_payload->>'correct')::int, 0);
  v_qtotal    int := coalesce((p_payload->>'total')::int, 0);
  v_pct       int := case when v_qtotal > 0 then (v_correct * 100) / v_qtotal else 0 end;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  v_value := greatest(p_bronze, 0) * 10
           + greatest(p_prata, 0) * 20
           + greatest(p_ouro, 0) * 40
           + greatest(p_diamante, 0) * 100;

  insert into public.game_events (user_id, game, type, payload, xp_delta)
  values (v_uid, p_game, 'SESSION_FINISHED', coalesce(p_payload, '{}'::jsonb), v_value);

  select p.level into v_old_level from public.profiles p where p.id = v_uid;

  update public.profiles p
     set total_xp      = p.total_xp + v_value,
         arks_bronze   = p.arks_bronze + greatest(p_bronze, 0),
         arks_prata    = p.arks_prata + greatest(p_prata, 0),
         arks_ouro     = p.arks_ouro + greatest(p_ouro, 0),
         arks_diamante = p.arks_diamante + greatest(p_diamante, 0),
         level         = public.level_for_xp(p.total_xp + v_value),
         updated_at    = now()
   where p.id = v_uid
   returning p.total_xp, p.level into v_total, v_level;

  -- Conquistas (medalha de boas-vindas + orbes da Lógica conforme desempenho).
  perform public.grant_achievement('primeiro-passo');
  if v_qtotal > 0 then
    if v_pct >= 50  then perform public.grant_orb('argumento', 'terrestre'); end if;
    if v_pct >= 80  then perform public.grant_orb('deducao',   'lunar');     end if;
    if v_pct >= 100 then perform public.grant_orb('logos',     'solar');     end if;
  end if;

  return query
    select
      v_total,
      v_level,
      (v_level > coalesce(v_old_level, 1)),
      (select count(*) + 1 from public.profiles where total_xp > v_total),
      (select count(*) from public.profiles);
end;
$$;
