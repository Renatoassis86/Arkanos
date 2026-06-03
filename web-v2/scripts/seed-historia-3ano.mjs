// Substitui o banco de História do 3º ano (AV1 · 2º Trimestre) pelas questões
// Grécia/Roma (República, Guerras Médicas, Filosofia). Sem imagem.
// REMOVE as questões atuais dessa avaliação e insere as novas. Idempotente.
// Uso: node --env-file=.env.local scripts/seed-historia-3ano.mjs
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const FILE = "data/3ano_t2_av1_historia_grecia_roma.json";
const ANO = "3º ano", DISC = "História", PROVA = "AV1", TRIM = 2;
const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

async function ensure(sel, ins) {
  const f = await sel; if (f.length) return f[0].id;
  return (await ins)[0].id;
}

try {
  const items = JSON.parse(await readFile(FILE, "utf8"));

  // validação: resposta correta precisa estar entre as opções
  const invalidas = items
    .map((it, i) => ({ i: i + 1, ok: it.opcoes.includes(it.correta) }))
    .filter((x) => !x.ok);
  if (invalidas.length) {
    console.log("✗ Respostas fora das opções nas questões:", invalidas.map((x) => x.i).join(", "));
    process.exit(1);
  }

  const gradeId = await ensure(sql`select id from public.quiz_grades where name=${ANO} limit 1`, sql`insert into public.quiz_grades (name) values (${ANO}) returning id`);
  const subjectId = await ensure(sql`select id from public.quiz_subjects where name=${DISC} limit 1`, sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`);
  const assessmentId = await ensure(
    sql`select id from public.quiz_assessments where name=${PROVA} and grade_id=${gradeId} and subject_id=${subjectId} and trimestre is not distinct from ${TRIM} limit 1`,
    sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre) values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id`,
  );

  // ---- remove as questões atuais (e tópicos órfãos) dessa avaliação ----
  const del = await sql`
    delete from public.quiz_questions
    where topic_id in (select id from public.quiz_topics where assessment_id=${assessmentId})
    returning id`;
  await sql`delete from public.quiz_topics where assessment_id=${assessmentId}`;
  console.log(`Removidas ${del.length} questões antigas (3º ano · História · AV1 · T2).`);

  // ---- insere as novas ----
  let created = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const topicId = await ensure(
      sql`select id from public.quiz_topics where subject_id=${subjectId} and grade_id=${gradeId} and assessment_id=${assessmentId} and name=${it.tema} limit 1`,
      sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name) values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`,
    );
    const idOrig = `3A-T2-AV1-HIST-GR-${String(i + 1).padStart(2, "0")}`;
    await sql`
      insert into public.quiz_questions
        (topic_id, question, options, answer, type, difficulty, explanation,
         cronica_do_guardiao, has_image, image_mode, source, metadata_json)
      values (${topicId}, ${it.pergunta}, ${sql.json(it.opcoes)}, ${it.correta},
         'multiple_choice', 'medium', '', ${it.cronica || ""}, false, 'none', 'manual',
         ${sql.json({ id_original: idOrig, numero: i + 1, tema: it.tema, avaliacao: "AV1 - 2º Trimestre", ano: ANO, guardiao: "aion" })})`;
    created++;
  }

  console.log(`\n================ RELATÓRIO — História 3º ano · AV1 · T2 ================`);
  console.log(`Questões no arquivo .......... ${items.length}`);
  console.log(`Respostas válidas (∈ opções) . ${items.length}/${items.length} ✓`);
  console.log(`Inseridas .................... ${created}`);
  console.log(`Temas ........................ ${[...new Set(items.map((i) => i.tema))].join(", ")}`);
  console.log(`=======================================================================`);
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
