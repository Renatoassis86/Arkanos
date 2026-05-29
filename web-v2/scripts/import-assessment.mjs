// Importa um banco de questões de uma AVALIAÇÃO (ex.: AV1 do 2º trimestre, 3º ano).
// Cria a hierarquia Série → Disciplina → Avaliação → Tópico → Questão. Idempotente (dedup por id).
// Uso:  npm run db:import-assessment            (usa data/3ano_t2_av1.json)
//   ou: npm run db:import-assessment -- data/<arquivo>.json
//
// Imagens: ficam em public/img/quiz/<nome-do-arquivo-sem-.json>/<imagem.arquivo>
// e o image_url é montado automaticamente. (Ou use imagem.url para URL absoluta.)
import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const file = process.argv[2] || "data/3ano_t2_av1.json";
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const slug = path.basename(file).replace(/\.json$/i, "");
const imgBase = `/img/quiz/${slug}/`;
const sql = postgres(url, { prepare: false, max: 1 });

async function ensure(selectQuery, insertQuery) {
  const found = await selectQuery;
  if (found.length) return found[0].id;
  const inserted = await insertQuery;
  return inserted[0].id;
}

// Deriva { prova: 'AV1'|'AV2'|'Prova', trimestre: 1|2|3 } dos campos estruturados
// (it.prova/it.trimestre) ou do texto legado (it.avaliacao = "AV1 - 2º Trimestre").
function parseAval(it) {
  const av = String(it.avaliacao || "");
  const provaM = av.match(/AV\s*\d+|Prova/i);
  const triM = av.match(/(\d)\s*º?\s*Trimestre/i);
  return {
    prova: it.prova || (provaM ? provaM[0].replace(/\s+/g, "").toUpperCase() : av || "AV1"),
    trimestre:
      it.trimestre != null ? Number(it.trimestre) : triM ? Number(triM[1]) : null,
  };
}

try {
  const items = JSON.parse(await readFile(path.resolve(process.cwd(), file), "utf8"));
  let created = 0;
  let skipped = 0;
  const errors = [];

  for (const it of items) {
    try {
      const gradeId = await ensure(
        sql`select id from public.quiz_grades where name = ${it.ano} limit 1`,
        sql`insert into public.quiz_grades (name) values (${it.ano}) returning id`,
      );
      const subjectId = await ensure(
        sql`select id from public.quiz_subjects where name = ${it.disciplina} limit 1`,
        sql`insert into public.quiz_subjects (name) values (${it.disciplina}) returning id`,
      );
      const { prova, trimestre } = parseAval(it);
      const assessmentId = await ensure(
        sql`select id from public.quiz_assessments
            where name = ${prova} and grade_id = ${gradeId} and subject_id = ${subjectId}
              and trimestre is not distinct from ${trimestre} limit 1`,
        sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre)
            values (${prova}, ${gradeId}, ${subjectId}, ${trimestre}) returning id`,
      );
      const topicId = await ensure(
        sql`select id from public.quiz_topics
            where subject_id = ${subjectId} and grade_id = ${gradeId}
              and assessment_id = ${assessmentId} and name = ${it.tema} limit 1`,
        sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name)
            values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`,
      );

      const dup = await sql`
        select id from public.quiz_questions
        where metadata_json ->> 'id_original' = ${it.id} limit 1`;
      if (dup.length) {
        skipped++;
        continue;
      }

      const alts = Array.isArray(it.alternativas) ? it.alternativas : [];
      const answer =
        typeof it.resposta_correta === "number"
          ? (alts[it.resposta_correta] ?? "")
          : String(it.resposta_correta ?? "");

      const img = it.imagem || {};
      const imageUrl = img.url || (img.arquivo ? imgBase + img.arquivo : null);

      await sql`
        insert into public.quiz_questions
          (topic_id, question, options, answer, type, difficulty, explanation,
           cronica_do_guardiao, has_image, image_mode, image_url, image_prompt,
           image_alt, source, metadata_json)
        values (
          ${topicId}, ${it.pergunta}, ${sql.json(alts)}, ${answer},
          ${it.tipo || "multiple_choice"}, ${it.dificuldade || "medium"},
          ${it.explicacao || ""}, ${it.cronica_do_guardiao || ""},
          ${!!imageUrl}, ${imageUrl ? "generated_asset" : "none"},
          ${imageUrl}, ${img.prompt || null}, ${img.alt || null},
          'manual',
          ${sql.json({ id_original: it.id, avaliacao: it.avaliacao, ano: it.ano })}
        )`;
      created++;
    } catch (e) {
      errors.push({ id: it.id, error: e.message });
    }
  }

  console.log(`✓ ${file}: ${created} criadas, ${skipped} já existiam.`);
  if (errors.length) console.log("Erros:\n" + JSON.stringify(errors, null, 2));
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
