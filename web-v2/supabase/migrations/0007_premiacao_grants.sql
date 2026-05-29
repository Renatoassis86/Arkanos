-- ============================================================
-- Fase 2 · 0007 — Premiação: award_arks devolve o que foi RECÉM-concedido
-- grant_orb/grant_achievement passam a retornar boolean (houve desbloqueio?).
-- award_arks ganha a coluna `granted jsonb` (fila de reveals). Idempotente.
-- (DROP necessário: muda o tipo de retorno das funções.)
-- ============================================================

-- grant_orb: true se NOVO desbloqueio ou subida de raridade; false se nada mudou.
drop function if exists public.grant_orb(text, text);
create function public.grant_orb(p_key text, p_rarity text)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_old text;
begin
  if v_uid is null then return false; end if;
  select rarity into v_old from public.user_orbs where user_id = v_uid and orb_key = p_key;
  if v_old is null then
    insert into public.user_orbs (user_id, orb_key, rarity) values (v_uid, p_key, p_rarity);
    return true;
  elsif rarity_rank(p_rarity) > rarity_rank(v_old) then
    update public.user_orbs set rarity = p_rarity where user_id = v_uid and orb_key = p_key;
    return true;
  end if;
  return false;
end;
$$;

-- grant_achievement: true se foi desbloqueada agora; false se já tinha.
drop function if exists public.grant_achievement(text);
create function public.grant_achievement(p_key text)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then return false; end if;
  insert into public.user_achievements (user_id, achievement_key)
  values (v_uid, p_key)
  on conflict (user_id, achievement_key) do nothing;
  return found;
end;
$$;

-- award_arks: mesmas entradas; agora devolve também `granted` (array p/ reveal).
drop function if exists public.award_arks(text, jsonb, int, int, int, int);
create function public.award_arks(
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
  rank_total bigint,
  granted jsonb
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
  v_granted   jsonb := '[]'::jsonb;
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

  -- Conquistas (só entram em `granted` se foram NOVAS).
  if public.grant_achievement('primeiro-passo') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'primeiro-passo');
  end if;
  if v_qtotal > 0 then
    if v_pct >= 50  and public.grant_orb('argumento', 'terrestre') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', 'argumento', 'rarity', 'terrestre');
    end if;
    if v_pct >= 80  and public.grant_orb('deducao', 'lunar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', 'deducao', 'rarity', 'lunar');
    end if;
    if v_pct >= 100 and public.grant_orb('logos', 'solar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', 'logos', 'rarity', 'solar');
    end if;
  end if;

  return query
    select
      v_total,
      v_level,
      (v_level > coalesce(v_old_level, 1)),
      (select count(*) + 1 from public.profiles where total_xp > v_total),
      (select count(*) from public.profiles),
      v_granted;
end;
$$;
