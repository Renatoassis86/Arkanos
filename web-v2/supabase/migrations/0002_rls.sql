-- ============================================================
-- Fase 1 · 0002 — Row Level Security
-- Corrige a falha de personificação da auth antiga: cada usuário só
-- acessa o próprio perfil. Conteúdo fica somente-leitura para o público.
--
-- ⚠️ ATENÇÃO (transição): o Django atual continua no ar até o cutover.
-- O role usado pela connection string do Django (normalmente o OWNER das
-- tabelas, ou `service_role`) IGNORA RLS automaticamente, então o Django
-- segue funcionando. Os roles `anon`/`authenticated` (usados pelo Next via
-- Supabase) é que passam a respeitar as políticas abaixo. Confirme qual role
-- a DATABASE_URL do Django usa antes de aplicar em produção.
-- ============================================================

-- ---------- profiles: dono-apenas ----------
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- O insert normal vem do trigger (security definer). Fallback para self-insert:
drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
  for insert with check (auth.uid() = id);

-- ---------- conteúdo: leitura pública, escrita só service_role ----------
-- (service_role ignora RLS, então não precisa de policy de escrita.)
do $$
declare
  t text;
  content_tables text[] := array[
    'quiz_subjects', 'quiz_grades', 'quiz_assessments', 'quiz_topics',
    'quiz_questions', 'quiz_questions_generated', 'quiz_questions_verified',
    'jogos_palavraspellingbee', 'jogos_palavraradix', 'jogos_jogo', 'jogos_conquista'
  ];
begin
  foreach t in array content_tables loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I on public.%I;', t || '_read', t);
    execute format('create policy %I on public.%I for select using (true);', t || '_read', t);
  end loop;
end $$;
