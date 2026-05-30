// Importa o banco de História (Grécia/Roma) — formato com alternativas por LETRA.
// Coloca em: 3º ano · História · AV1 · 2º Trimestre, temas = tópicos.
// Idempotente (dedup por metadata_json->>'id_original' = 3A-T2-AV1-HIST-NNN).
// Uso: node --env-file=.env.local scripts/import-historia.mjs
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const FILE = "data/3ano_t2_av1_historia.json";
const ANO = "3º ano";
const DISC = "História";
const PROVA = "AV1";
const TRIM = 2;

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

async function ensure(selectQuery, insertQuery) {
  const found = await selectQuery;
  if (found.length) return found[0].id;
  const inserted = await insertQuery;
  return inserted[0].id;
}

try {
  const items = JSON.parse(await readFile(FILE, "utf8"));
  let created = 0, skipped = 0;
  const errors = [];

  const gradeId = await ensure(
    sql`select id from public.quiz_grades where name = ${ANO} limit 1`,
    sql`insert into public.quiz_grades (name) values (${ANO}) returning id`,
  );
  const subjectId = await ensure(
    sql`select id from public.quiz_subjects where name = ${DISC} limit 1`,
    sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`,
  );
  const assessmentId = await ensure(
    sql`select id from public.quiz_assessments
        where name = ${PROVA} and grade_id = ${gradeId} and subject_id = ${subjectId}
          and trimestre is not distinct from ${TRIM} limit 1`,
    sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre)
        values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id`,
  );

  for (const it of items) {
    try {
      const topicId = await ensure(
        sql`select id from public.quiz_topics
            where subject_id = ${subjectId} and grade_id = ${gradeId}
              and assessment_id = ${assessmentId} and name = ${it.tema} limit 1`,
        sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name)
            values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`,
      );

      const idOrig = `3A-T2-AV1-HIST-${String(it.id).padStart(3, "0")}`;
      const dup = await sql`
        select id from public.quiz_questions
        where metadata_json ->> 'id_original' = ${idOrig} limit 1`;
      if (dup.length) { skipped++; continue; }

      const alts = ["A", "B", "C", "D"].map((k) => it.alternativas[k]).filter((v) => v != null);
      const answer = it.alternativas[it.resposta_correta] ?? "";

      await sql`
        insert into public.quiz_questions
          (topic_id, question, options, answer, type, difficulty, explanation,
           cronica_do_guardiao, has_image, image_mode, source, metadata_json)
        values (
          ${topicId}, ${it.pergunta}, ${sql.json(alts)}, ${answer},
          'multiple_choice', 'medium',
          '', ${it.cronica || ""},
          false, 'none', 'manual',
          ${sql.json({ id_original: idOrig, avaliacao: "AV1 - 2º Trimestre", ano: ANO, guardiao: it.guardiao })}
        )`;
      created++;
    } catch (e) {
      errors.push({ id: it.id, error: e.message });
    }
  }

  console.log(`✓ ${FILE}: ${created} criadas, ${skipped} já existiam.`);
  if (errors.length) console.log("Erros:\n" + JSON.stringify(errors, null, 2));
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
