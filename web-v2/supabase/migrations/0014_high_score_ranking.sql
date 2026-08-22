-- ============================================================
-- 0014 — Ranking por Recorde Pessoal / High Score da Melhor Corrida
-- Substitui o ranking meramente cumulativo (tempo gasto) por um
-- ranking de mérito e desempenho competitivo (melhor rodada/streak alcançado).
-- ============================================================

-- Adiciona colunas de recorde pessoal ao perfil
alter table public.profiles
  add column if not exists high_score integer not null default 0,
  add column if not exists max_streak integer not null default 0,
  add column if not exists best_game_level text not null default 'facil';

-- Atualiza o high_score com base no histórico anterior caso exista
update public.profiles p
   set high_score = greatest(p.high_score, coalesce((
         select max(e.xp_delta) from public.game_events e where e.user_id = p.id
       ), 0)),
       max_streak = greatest(p.max_streak, coalesce((
         select max((e.payload->>'correct')::int) from public.game_events e where e.user_id = p.id
       ), 0))
 where p.high_score = 0;

-- Função atualizada de ranking pessoal
drop function if exists public.my_rank();
create or replace function public.my_rank()
returns table(
  rank_pos bigint,
  rank_total bigint,
  high_score integer,
  max_streak integer
)
language sql security definer set search_path = public as $$
  with me as (
    select id, coalesce(high_score, 0) as hs, coalesce(max_streak, 0) as ms, total_xp
      from public.profiles
     where id = auth.uid()
  )
  select
    coalesce((
      select count(*) + 1
        from public.profiles p, me
       where (p.high_score > me.hs)
          or (p.high_score = me.hs and p.max_streak > me.ms)
          or (p.high_score = me.hs and p.max_streak = me.ms and p.total_xp > me.total_xp)
    ), 1::bigint),
    (select count(*) from public.profiles)::bigint,
    (select hs from me),
    (select ms from me);
$$;

-- Leaderboard ordenado por HIGH SCORE (Melhor Corrida)
drop function if exists public.leaderboard_top(int);
create or replace function public.leaderboard_top(p_limit int default 50)
returns table(
  rank bigint,
  user_id uuid,
  display_name text,
  level integer,
  total_xp integer,
  high_score integer,
  max_streak integer
)
language sql security definer set search_path = public as $$
  select
    row_number() over (
      order by coalesce(p.high_score, 0) desc,
               coalesce(p.max_streak, 0) desc,
               p.total_xp desc,
               p.created_at asc
    ) as rank,
    p.id as user_id,
    coalesce(nullif(p.display_name, ''), 'Sábio') as display_name,
    p.level,
    p.total_xp,
    p.high_score,
    p.max_streak
  from public.profiles p
  order by coalesce(p.high_score, 0) desc, coalesce(p.max_streak, 0) desc, p.total_xp desc
  limit greatest(1, least(p_limit, 100));
$$;

-- Função unificada award_arks atualizada para persistir high score e calcular ranking por mérito
drop function if exists public.award_arks(text, jsonb, int, int, int, int, int);
create or replace function public.award_arks(
  p_game text,
  p_payload jsonb,
  p_bronze int,
  p_prata int,
  p_ouro int,
  p_diamante int,
  p_points int default 0
)
returns table(
  total_arks integer,
  lvl integer,
  leveled_up boolean,
  rank_pos bigint,
  rank_total bigint,
  granted jsonb,
  new_high_score boolean,
  current_high_score integer
)
language plpgsql security definer set search_path = public as $$
declare
  v_uid         uuid := auth.uid();
  v_value       int;
  v_old_level   int;
  v_old_hs      int;
  v_old_streak  int;
  v_total       int;
  v_level       int;
  v_correct     int := coalesce((p_payload->>'correct')::int, 0);
  v_qtotal      int := coalesce((p_payload->>'total')::int, 0);
  v_pct         int := case when v_qtotal > 0 then (v_correct * 100) / v_qtotal else 0 end;
  v_granted     jsonb := '[]'::jsonb;
  v_last        date;
  v_streak      int;
  v_new_streak  int;
  v_new_hs      boolean := false;
  v_cur_hs      int;
  v_o1 text; v_o2 text; v_o3 text;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Pontuação obtida nesta corrida
  v_value := coalesce(nullif(greatest(p_points, 0), 0),
                      greatest(p_bronze, 0) * 10 + greatest(p_prata, 0) * 20
                    + greatest(p_ouro, 0) * 40 + greatest(p_diamante, 0) * 100);

  insert into public.game_events (user_id, game, type, payload, xp_delta)
  values (v_uid, p_game, 'SESSION_FINISHED', coalesce(p_payload, '{}'::jsonb), v_value);

  select p.level, p.last_active_date, p.streak_count, coalesce(p.high_score, 0), coalesce(p.max_streak, 0)
    into v_old_level, v_last, v_streak, v_old_hs, v_old_streak
    from public.profiles p where p.id = v_uid;

  if v_last = current_date then
    v_new_streak := coalesce(v_streak, 0);
  elsif v_last = current_date - 1 then
    v_new_streak := coalesce(v_streak, 0) + 1;
  else
    v_new_streak := 1;
  end if;

  v_new_hs := (v_value > v_old_hs);
  v_cur_hs := greatest(v_old_hs, v_value);

  update public.profiles p
     set total_xp         = p.total_xp + v_value,
         high_score       = v_cur_hs,
         max_streak       = greatest(coalesce(p.max_streak, 0), v_correct),
         arks_bronze      = p.arks_bronze + greatest(p_bronze, 0),
         arks_prata       = p.arks_prata + greatest(p_prata, 0),
         arks_ouro        = p.arks_ouro + greatest(p_ouro, 0),
         arks_diamante    = p.arks_diamante + greatest(p_diamante, 0),
         level            = public.level_for_xp(p.total_xp + v_value),
         streak_count     = v_new_streak,
         longest_streak   = greatest(p.longest_streak, v_new_streak),
         last_active_date = current_date,
         updated_at       = now()
   where p.id = v_uid
   returning p.total_xp, p.level into v_total, v_level;

  if public.grant_achievement('primeiro-passo') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'primeiro-passo');
  end if;
  if v_pct >= 100 and public.grant_achievement('gabaritou') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'gabaritou');
  end if;
  if v_new_streak >= 3 and public.grant_achievement('ofensiva') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'ofensiva');
  end if;
  if v_new_streak >= 7 and public.grant_achievement('perseveranca') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'perseveranca');
  end if;

  if v_new_streak >= 7 then perform public.grant_title('o-perseverante'); end if;
  if v_cur_hs >= 1000 then perform public.grant_title('mente-clara'); end if;
  if v_level >= 50 then perform public.grant_title('sabio-coroado'); end if;

  if p_game = 'radix' or p_game = 'spelling-bee' then
    v_o1 := 'ortografia'; v_o2 := 'vocabulario'; v_o3 := 'gramatica';
    if v_correct >= 10 and public.grant_orb(v_o1, 'terrestre') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o1, 'rarity', 'terrestre');
    end if;
    if v_correct >= 25 and public.grant_orb(v_o2, 'lunar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o2, 'rarity', 'lunar');
    end if;
    if v_correct >= 50 and public.grant_orb(v_o3, 'solar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o3, 'rarity', 'solar');
    end if;
  end if;

  return query
    select
      v_total,
      v_level,
      (v_level > coalesce(v_old_level, 1)),
      (select count(*) + 1 from public.profiles where high_score > v_cur_hs or (high_score = v_cur_hs and max_streak > greatest(v_old_streak, v_correct))),
      (select count(*) from public.profiles),
      v_granted,
      v_new_hs,
      v_cur_hs;
end;
$$;
