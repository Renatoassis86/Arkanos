-- ============================================================
-- 0005 — Arks (4 tipos) + concessão ao finalizar + ranking
-- Mantém total_xp como o VALOR total (em Arks). Adiciona contadores por tipo.
-- Idempotente.
-- ============================================================

alter table public.profiles
  add column if not exists arks_bronze   integer not null default 0,
  add column if not exists arks_prata    integer not null default 0,
  add column if not exists arks_ouro     integer not null default 0,
  add column if not exists arks_diamante integer not null default 0;

-- Concede Arks ao FINALIZAR a partida: registra evento, soma valor + contadores,
-- atualiza nível e devolve a posição no ranking global. SECURITY DEFINER.
drop function if exists public.award_arks(text, jsonb, int, int, int, int);
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

  return query
    select
      v_total,
      v_level,
      (v_level > coalesce(v_old_level, 1)),
      (select count(*) + 1 from public.profiles where total_xp > v_total),
      (select count(*) from public.profiles);
end;
$$;
