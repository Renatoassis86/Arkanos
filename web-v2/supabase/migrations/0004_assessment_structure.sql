-- ============================================================
-- 0004 — Estrutura de avaliação: trimestre separado do tipo de prova.
-- name passa a ser o TIPO (AV1 | AV2 | Prova); trimestre vira coluna própria.
-- Idempotente.
-- ============================================================

alter table public.quiz_assessments
  add column if not exists trimestre integer;

-- Normaliza dados no formato antigo "AV1 - 2º Trimestre" → name='AV1', trimestre=2
update public.quiz_assessments
   set trimestre = 2, name = 'AV1'
 where name = 'AV1 - 2º Trimestre' and trimestre is null;

-- Unicidade passa a considerar o trimestre (permite AV1 em trimestres diferentes)
alter table public.quiz_assessments
  drop constraint if exists quiz_assessments_name_grade_id_subject_id_key;
drop index if exists public.quiz_assessments_uq;
create unique index if not exists quiz_assessments_uq
  on public.quiz_assessments (name, grade_id, subject_id, trimestre);
