// Seed completo e resiliente de conteúdo no banco a partir do data/quiz_questions.json.
// Idempotente: reseta as tabelas semeadas antes de inserir.
// Uso: npm run db:seed
import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const root = path.resolve(process.cwd(), ".."); // repositorio_arkanos/
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1, connect_timeout: 15 });

function normAnswer(a) {
  if (typeof a === "boolean") return String(a); // "true" | "false"
  if (Array.isArray(a)) return JSON.stringify(a); // ordering
  return String(a);
}

async function ensureGrade(name) {
  const f = await sql`select id from public.quiz_grades where name=${name} limit 1`;
  if (f.length) return f[0].id;
  const [ins] = await sql`insert into public.quiz_grades (name) values (${name}) returning id`;
  return ins.id;
}

async function ensureSubject(name) {
  const f = await sql`select id from public.quiz_subjects where name=${name} limit 1`;
  if (f.length) return f[0].id;
  const [ins] = await sql`insert into public.quiz_subjects (name) values (${name}) returning id`;
  return ins.id;
}

async function ensureAssessment(name, gradeId, subjectId, trimestre) {
  const f = await sql`
    select id from public.quiz_assessments 
    where name=${name} and grade_id=${gradeId} and subject_id=${subjectId} 
    limit 1`;
  if (f.length) {
    // Atualiza trimestre se necessário
    await sql`update public.quiz_assessments set trimestre=${trimestre} where id=${f[0].id}`;
    return f[0].id;
  }
  const [ins] = await sql`
    insert into public.quiz_assessments (name, grade_id, subject_id, trimestre) 
    values (${name}, ${gradeId}, ${subjectId}, ${trimestre}) 
    returning id`;
  return ins.id;
}

async function ensureTopic(name, subjectId, gradeId, assessmentId) {
  const f = await sql`
    select id from public.quiz_topics 
    where subject_id=${subjectId} and grade_id=${gradeId} and assessment_id=${assessmentId} and name=${name} 
    limit 1`;
  if (f.length) return f[0].id;
  const [ins] = await sql`
    insert into public.quiz_topics (subject_id, grade_id, assessment_id, name) 
    values (${subjectId}, ${gradeId}, ${assessmentId}, ${name}) 
    returning id`;
  return ins.id;
}

try {
  console.log("Iniciando seed idempotente do banco...");

  // Reset idempotente (cascade limpa topics/questions dependentes).
  await sql`truncate table public.quiz_grades restart identity cascade`;
  await sql`truncate table public.quiz_subjects restart identity cascade`;
  await sql`truncate table public.jogos_palavraspellingbee restart identity cascade`;

  // -------- Quiz (Desafio dos Sábios) --------
  const jsonPath = path.join(root, "data", "quiz_questions.json");
  const quiz = JSON.parse(await readFile(jsonPath, "utf8"));
  let qCount = 0;

  for (const item of quiz) {
    const gradeName = item.grade || "5º ano";
    const subjectName = item.subject || "História";
    const assessmentName = item.assessment || "AV2";
    const trimestre = item.trimestre || 2;
    const topicName = item.topic || "Geral";

    const gid = await ensureGrade(gradeName);
    const sid = await ensureSubject(subjectName);
    const aid = await ensureAssessment(assessmentName, gid, sid, trimestre);
    const tid = await ensureTopic(topicName, sid, gid, aid);

    await sql`
      insert into public.quiz_questions (
        topic_id, question, options, answer, type, difficulty, 
        explanation, cronica_do_guardiao, has_image, image_mode, 
        image_url, image_alt, source, metadata_json
      )
      values (
        ${tid}, ${item.question},
        ${item.options ? sql.json(item.options) : null},
        ${normAnswer(item.answer)},
        ${item.type ?? "multiple_choice"},
        ${item.difficulty ?? "medium"},
        ${item.explanation ?? ""},
        ${item.cronica_do_guardiao ?? ""},
        ${item.has_image ?? true},
        ${item.image_mode ?? "uploaded_asset"},
        ${item.image_url ?? null},
        ${item.image_alt ?? null},
        'manual',
        ${sql.json(item.metadata_json ?? {})}
      )`;
    qCount++;
  }
  console.log(`✓ Quiz: ${qCount} questões semeadas com sucesso nas séries, disciplinas e avaliações!`);

  // -------- Spelling Bee --------
  const files = { "2ano": "palavras_2ano.js", "4ano": "palavras_4ano.js" };
  const re = /\{\s*word:\s*"([^"]+)",\s*meaning:\s*"([^"]+)",\s*frase:\s*"([^"]+)"\s*\}/g;
  let wCount = 0;

  for (const [serie, fname] of Object.entries(files)) {
    let content;
    try {
      content = await readFile(
        path.join(root, "backend", "static", "spellingbee", "palavras", fname),
        "utf8",
      );
    } catch {
      console.log(`  (aviso) ${fname} não encontrado — pulando`);
      continue;
    }
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      const [, word, meaning, frase] = m;
      await sql`
        insert into public.jogos_palavraspellingbee (palavra, significado, exemplo, serie, ipa)
        values (${word}, ${meaning}, ${frase}, ${serie}, ${`/${word}/`})`;
      wCount++;
    }
  }
  console.log(`✓ Spelling Bee: ${wCount} palavra(s)`);
  console.log("\n✓ Seed concluído com sucesso!");
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
