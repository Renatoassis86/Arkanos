// Liga as URLs das imagens geradas às questões.
// 1) Gere as imagens (ver docs/PROMPTS_IMAGENS.md) e suba no Storage/public.
// 2) Preencha scripts/quiz-image-urls.json -> { "Q001": "https://.../q001.webp", ... }
// 3) npm run db:link-images
import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const root = path.resolve(process.cwd(), "..");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });
try {
  const quiz = JSON.parse(
    await readFile(path.join(root, "data", "quiz_questions.json"), "utf8"),
  );
  const map = JSON.parse(
    await readFile(path.join(process.cwd(), "scripts", "quiz-image-urls.json"), "utf8"),
  );
  const textById = Object.fromEntries(quiz.map((q) => [q.id, q.question]));

  let updated = 0;
  let skipped = 0;
  for (const [id, imgUrl] of Object.entries(map)) {
    const text = textById[id];
    if (!imgUrl || !text) {
      skipped++;
      continue;
    }
    const res = await sql`
      update public.quiz_questions
         set image_url = ${imgUrl}, has_image = true, image_mode = 'generated_asset'
       where question = ${text}`;
    updated += res.count;
  }
  console.log(`✓ image_url ligado em ${updated} questões (puladas: ${skipped}).`);
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
