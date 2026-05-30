// Importa o banco de Geografia (Sul da Ásia, Rota da Seda, Monções, Cartografia).
// 3º ano · Geografia · AV1 · 2º Trimestre. Formato alternativas por LETRA.
// Guarda a descrição da imagem (image_prompt/metadata) para gerar depois; NÃO
// vincula image_url ainda (evita link quebrado). Idempotente por id_original.
// Uso: node --env-file=.env.local scripts/import-geografia.mjs
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const FILE = "data/3ano_t2_av1_geografia.json";
const ANO = "3º ano", DISC = "Geografia", PROVA = "AV1", TRIM = 2;
const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

async function ensure(s, i) { const f = await s; return f.length ? f[0].id : (await i)[0].id; }

try {
  const items = JSON.parse(await readFile(FILE, "utf8"));
  let created = 0, skipped = 0;
  const errors = [];

  const gradeId = await ensure(
    sql`select id from public.quiz_grades where name = ${ANO} limit 1`,
    sql`insert into public.quiz_grades (name) values (${ANO}) returning id`);
  const subjectId = await ensure(
    sql`select id from public.quiz_subjects where name = ${DISC} limit 1`,
    sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`);
  const assessmentId = await ensure(
    sql`select id from public.quiz_assessments
        where name = ${PROVA} and grade_id = ${gradeId} and subject_id = ${subjectId}
          and trimestre is not distinct from ${TRIM} limit 1`,
    sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre)
        values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id`);

  for (const it of items) {
    try {
      const topicId = await ensure(
        sql`select id from public.quiz_topics
            where subject_id = ${subjectId} and grade_id = ${gradeId}
              and assessment_id = ${assessmentId} and name = ${it.tema} limit 1`,
        sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name)
            values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`);

      const idOrig = `3A-T2-AV1-GEO-${String(it.id).padStart(3, "0")}`;
      const dup = await sql`select id from public.quiz_questions
        where metadata_json ->> 'id_original' = ${idOrig} limit 1`;
      if (dup.length) { skipped++; continue; }

      const alts = ["A", "B", "C", "D"].map((k) => it.alternativas[k]).filter((v) => v != null);
      const answer = it.alternativas[it.resposta_correta] ?? "";
      const arquivo = it.imagem_requerida ? `3a-t2-av1-geo-${String(it.id).padStart(3, "0")}.webp` : null;

      await sql`
        insert into public.quiz_questions
          (topic_id, question, options, answer, type, difficulty, explanation,
           cronica_do_guardiao, has_image, image_mode, image_url, image_prompt,
           image_alt, source, metadata_json)
        values (
          ${topicId}, ${it.pergunta}, ${sql.json(alts)}, ${answer},
          'multiple_choice', 'medium',
          ${"Resposta correta: " + answer + "."}, ${it.cronica || ""},
          false, 'none', null,
          ${it.descricao_imagem || null}, ${arquivo ? "Ilustração para a questão " + it.id : null},
          'manual',
          ${sql.json({ id_original: idOrig, avaliacao: "AV1 - 2º Trimestre", ano: ANO,
                       guardiao: it.guardiao, arquivo, imagem_requerida: !!it.imagem_requerida,
                       tipo_imagem: it.tipo_imagem, descricao_imagem: it.descricao_imagem })}
        )`;
      created++;
    } catch (e) { errors.push({ id: it.id, error: e.message }); }
  }
  console.log(`✓ ${FILE}: ${created} criadas, ${skipped} já existiam.`);
  if (errors.length) console.log("Erros:\n" + JSON.stringify(errors, null, 2));
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally { await sql.end(); }
