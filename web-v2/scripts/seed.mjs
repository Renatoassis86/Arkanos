// Seed de conteúdo no banco novo a partir dos dumps do projeto Django.
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

try {
  // Reset idempotente (cascade limpa topics/questions dependentes).
  await sql`truncate table public.quiz_subjects restart identity cascade`;
  await sql`truncate table public.jogos_palavraspellingbee restart identity cascade`;

  // -------- Quiz (Desafio dos Sábios) --------
  const quiz = JSON.parse(
    await readFile(path.join(root, "data", "quiz_questions.json"), "utf8"),
  );
  const subjectId = new Map();
  const topicId = new Map();
  let qCount = 0;

  for (const item of quiz) {
    if (!subjectId.has(item.subject)) {
      const [s] = await sql`
        insert into public.quiz_subjects (name) values (${item.subject}) returning id`;
      subjectId.set(item.subject, s.id);
    }
    const sid = subjectId.get(item.subject);
    const tkey = `${item.subject}||${item.topic}`;
    if (!topicId.has(tkey)) {
      const [t] = await sql`
        insert into public.quiz_topics (subject_id, name) values (${sid}, ${item.topic}) returning id`;
      topicId.set(tkey, t.id);
    }
    const tid = topicId.get(tkey);

    await sql`
      insert into public.quiz_questions (topic_id, question, options, answer, type, difficulty, source)
      values (
        ${tid}, ${item.question},
        ${item.options ? sql.json(item.options) : null},
        ${normAnswer(item.answer)},
        ${item.type ?? "multiple_choice"},
        ${item.difficulty ?? "medium"},
        'manual'
      )`;
    qCount++;
  }
  console.log(`✓ Quiz: ${subjectId.size} disciplina(s), ${topicId.size} tópico(s), ${qCount} questões`);

  // -------- Spelling Bee (palavras dos arquivos JS) --------
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
  console.log("\n✓ Seed concluído.");
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
