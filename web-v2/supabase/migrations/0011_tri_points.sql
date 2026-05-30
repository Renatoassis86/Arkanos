-- ============================================================
-- 0011 — Pontuação por TRI: award_arks aceita p_points (pontuação da sessão
-- calculada por Teoria de Resposta ao Item). O total/ranking/nível passam a
-- usar p_points; os contadores de Arks por tipo (bronze/prata/ouro/diamante)
-- continuam para a coleção. Fallback p/ a soma antiga se p_points <= 0.
-- Mesmo retorno de 0010. Idempotente.
-- ============================================================

drop function if exists public.award_arks(text, jsonb, int, int, int, int);
drop function if exists public.award_arks(text, jsonb, int, int, int, int, int);
create function public.award_arks(
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
  v_last      date;
  v_streak    int;
  v_new_streak int;
  v_o1 text; v_o2 text; v_o3 text;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Pontuação da sessão: TRI (p_points) quando informada; senão, soma antiga.
  v_value := coalesce(nullif(greatest(p_points, 0), 0),
                      greatest(p_bronze, 0) * 10 + greatest(p_prata, 0) * 20
                    + greatest(p_ouro, 0) * 40 + greatest(p_diamante, 0) * 100);

  insert into public.game_events (user_id, game, type, payload, xp_delta)
  values (v_uid, p_game, 'SESSION_FINISHED', coalesce(p_payload, '{}'::jsonb), v_value);

  select p.level, p.last_active_date, p.streak_count
    into v_old_level, v_last, v_streak
    from public.profiles p where p.id = v_uid;

  if v_last = current_date then
    v_new_streak := coalesce(v_streak, 0);
  elsif v_last = current_date - 1 then
    v_new_streak := coalesce(v_streak, 0) + 1;
  else
    v_new_streak := 1;
  end if;

  update public.profiles p
     set total_xp        = p.total_xp + v_value,
         arks_bronze     = p.arks_bronze + greatest(p_bronze, 0),
         arks_prata      = p.arks_prata + greatest(p_prata, 0),
         arks_ouro       = p.arks_ouro + greatest(p_ouro, 0),
         arks_diamante   = p.arks_diamante + greatest(p_diamante, 0),
         level           = public.level_for_xp(p.total_xp + v_value),
         streak_count    = v_new_streak,
         longest_streak  = greatest(p.longest_streak, v_new_streak),
         last_active_date = current_date,
         updated_at      = now()
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
  if p_game = 'desafio' and v_pct >= 90 and public.grant_achievement('mente-clara') then
    v_granted := v_granted || jsonb_build_object('kind', 'medal', 'key', 'mente-clara');
  end if;

  if v_new_streak >= 7 then perform public.grant_title('o-perseverante'); end if;
  if p_game = 'desafio' and v_pct >= 90 then perform public.grant_title('mente-clara'); end if;
  if v_level >= 50 then perform public.grant_title('sabio-coroado'); end if;

  if p_game = 'desafio' then
    v_o1 := 'argumento'; v_o2 := 'deducao'; v_o3 := 'logos';
  elsif p_game = 'spelling-bee' then
    v_o1 := 'ortografia'; v_o2 := 'vocabulario'; v_o3 := 'gramatica';
  end if;

  if v_qtotal > 0 and v_o1 is not null then
    if v_pct >= 50  and public.grant_orb(v_o1, 'terrestre') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o1, 'rarity', 'terrestre');
    end if;
    if v_pct >= 80  and public.grant_orb(v_o2, 'lunar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o2, 'rarity', 'lunar');
    end if;
    if v_pct >= 100 and public.grant_orb(v_o3, 'solar') then
      v_granted := v_granted || jsonb_build_object('kind', 'orb', 'key', v_o3, 'rarity', 'solar');
    end if;
  end if;

  return query
    select
      v_total, v_level,
      (v_level > coalesce(v_old_level, 1)),
      (select count(*) + 1 from public.profiles where total_xp > v_total),
      (select count(*) from public.profiles),
      v_granted;
end;
$$;
