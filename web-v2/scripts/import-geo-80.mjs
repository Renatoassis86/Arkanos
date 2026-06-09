import { readFile } from "node:fs/promises";
import postgres from "postgres";

const FILE = "web-v2/data/quiz/geo-av1-completo-80.json";
const ANO = "5º ano", DISC = "Geografia", PROVA = "AV1", TRIM = 2;
const url = process.env.DATABASE_URL;

if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

async function ensure(selectQuery, insertQuery) {
  const found = await selectQuery;
  if (found.length) return found[0].id;
  const inserted = await insertQuery;
  return inserted[0].id;
}

try {
  const fileContent = JSON.parse(await readFile(FILE, "utf8"));
  const items = Object.values(fileContent.questoes);
  
  let created = 0, skipped = 0;
  const errors = [];

  const gradeId = await ensure(
    sql`select id from public.quiz_grades where name = ${ANO} limit 1`,
    sql`insert into public.quiz_grades (name) values (${ANO}) returning id`
  );
  const subjectId = await ensure(
    sql`select id from public.quiz_subjects where name = ${DISC} limit 1`,
    sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`
  );
  const assessmentId = await ensure(
    sql`select id from public.quiz_assessments
        where name = ${PROVA} and grade_id = ${gradeId} and subject_id = ${subjectId}
          and trimestre is not distinct from ${TRIM} limit 1`,
    sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre)
        values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id`
  );

  for (const it of items) {
    try {
      const topicId = await ensure(
        sql`select id from public.quiz_topics
            where subject_id = ${subjectId} and grade_id = ${gradeId}
              and assessment_id = ${assessmentId} and name = ${it.tema} limit 1`,
        sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name)
            values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`
      );

      const idOrig = it.id; // e.g. geo_av1_001
      const dup = await sql`select id from public.quiz_questions
        where metadata_json ->> 'id_original' = ${idOrig} and topic_id in (
          select id from public.quiz_topics where assessment_id = ${assessmentId}
        ) limit 1`;
        
      if (dup.length) { skipped++; continue; }

      const alts = ["A", "B", "C", "D"].map((k) => it.alternativas[k]).filter((v) => v != null);
      const answer = it.alternativas[it.respostaCorreta] ?? "";
      const hasImage = !!it.imagem;
      const imageUrl = hasImage ? `/img/quiz/geo-av1/${it.imagem}` : null;

      await sql`
        insert into public.quiz_questions
          (topic_id, question, options, answer, type, difficulty, explanation,
           cronica_do_guardiao, has_image, image_mode, image_url, image_prompt,
           image_alt, source, metadata_json)
        values (
          ${topicId}, ${it.pergunta}, ${sql.json(alts)}, ${answer},
          'multiple_choice', ${it.dificuldade || 'medium'},
          '', ${it.cronicaGuardiao || ""},
          ${hasImage}, ${hasImage ? 'generated_asset' : 'none'}, ${imageUrl},
          ${it.promptImagem || null}, ${hasImage ? "Ilustração para a questão " + it.numero : null},
          'manual',
          ${sql.json({ id_original: idOrig, avaliacao: "AV1 - 2º Trimestre", ano: ANO,
                       guardiao: "Aion", arquivo: it.imagem, tema: it.tema, subtema: it.subtema })}
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
