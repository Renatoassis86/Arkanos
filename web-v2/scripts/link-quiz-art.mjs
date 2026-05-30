// Vincula no banco as imagens do quiz JÁ depositadas em public/img/quiz/<pasta>/.
// Para cada questão que precisa de imagem, se o arquivo existir → seta image_url;
// se não existir → mantém sem imagem (placeholder). Idempotente.
// Uso: node --env-file=.env.local scripts/link-quiz-art.mjs
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

// Mesmos conjuntos de build-image-prompts.mjs (+ idPrefix do id_original).
const SETS = [
  {
    file: "data/3ano_t2_av1_geografia.json",
    folder: "3ano_t2_av1_geografia",
    prefix: "3a-t2-av1-geo",
    idPrefix: "3A-T2-AV1-GEO",
  },
];

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

try {
  let linked = 0, pending = 0;
  for (const set of SETS) {
    const items = JSON.parse(fs.readFileSync(set.file, "utf8")).filter((it) => it.imagem_requerida);
    for (const it of items) {
      const nnn = String(it.id).padStart(3, "0");
      const arquivo = `${set.prefix}-${nnn}.webp`;
      const filePath = path.join("public/img/quiz", set.folder, arquivo);
      const idOrig = `${set.idPrefix}-${nnn}`;
      if (fs.existsSync(filePath)) {
        await sql`update public.quiz_questions
                     set image_url = ${`/img/quiz/${set.folder}/${arquivo}`},
                         has_image = true, image_mode = 'generated_asset',
                         image_alt = ${it.descricao_imagem || ("Ilustração para a questão " + it.id)}
                   where metadata_json ->> 'id_original' = ${idOrig}`;
        linked++;
      } else {
        pending++;
      }
    }
  }
  console.log(`✓ Vinculadas: ${linked} · pendentes (sem arquivo ainda): ${pending}`);
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
