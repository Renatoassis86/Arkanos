import { readFile, writeFile } from "node:fs/promises";
import postgres from "postgres";

const sourcePath = "C:\\Users\\renato\\.claude\\projects\\d--repositorio-geral-repositorio-arkanos\\memory\\questoes-geo-av1-completo-80.json";
const targetPath = "web-v2/data/quiz/geo-av1-completo-80.json";
const url = process.env.DATABASE_URL;

async function updateJsonFile(path) {
  const data = JSON.parse(await readFile(path, "utf8"));
  
  if (data.questoes && data.questoes.geo_av1_026) {
    data.questoes.geo_av1_026.pergunta = "Observe a imagem e identifique a qual país pertence esta bandeira.";
  }
  if (data.questoes && data.questoes.geo_av1_027) {
    data.questoes.geo_av1_027.pergunta = "Observe a imagem e identifique a qual país pertence esta bandeira.";
  }
  
  await writeFile(path, JSON.stringify(data, null, 2), "utf8");
  console.log(`✓ Updated JSON file at: ${path}`);
}

async function updateDatabase() {
  if (!url) {
    console.warn("⚠️ DATABASE_URL ausente. Ignorando atualização do banco de dados.");
    return;
  }
  
  const sql = postgres(url, { prepare: false, max: 1 });
  try {
    const updatedCount26 = await sql`
      update public.quiz_questions
      set question = 'Observe a imagem e identifique a qual país pertence esta bandeira.'
      where metadata_json ->> 'id_original' = 'geo_av1_026'
    `;
    console.log(`✓ Updated geo_av1_026 in DB.`);
    
    const updatedCount27 = await sql`
      update public.quiz_questions
      set question = 'Observe a imagem e identifique a qual país pertence esta bandeira.'
      where metadata_json ->> 'id_original' = 'geo_av1_027'
    `;
    console.log(`✓ Updated geo_av1_027 in DB.`);
  } catch (err) {
    console.error("✗ Falha ao atualizar banco de dados:", err.message);
  } finally {
    await sql.end();
  }
}

async function main() {
  try {
    await updateJsonFile(sourcePath);
    await updateJsonFile(targetPath);
    await updateDatabase();
    console.log("✓ All flag questions fixed successfully!");
  } catch (e) {
    console.error("✗ Falha na execução:", e.message);
    process.exitCode = 1;
  }
}

main();
