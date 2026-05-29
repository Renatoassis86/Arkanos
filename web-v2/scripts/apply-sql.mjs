// Aplica, em ordem, todos os .sql de supabase/migrations no banco apontado por DATABASE_URL.
// Uso: npm run db:apply   (carrega .env.local via --env-file)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente. Preencha web-v2/.env.local.");
  process.exit(1);
}

const dir = path.join(process.cwd(), "supabase", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

const sql = postgres(url, { prepare: false, max: 1 });
try {
  for (const file of files) {
    const ddl = await readFile(path.join(dir, file), "utf8");
    process.stdout.write(`>> ${file} ... `);
    await sql.unsafe(ddl);
    console.log("ok");
  }
  console.log(`\n✓ ${files.length} migration(s) aplicada(s).`);
} catch (err) {
  console.error(`\n✗ Falha: ${err.message}`);
  process.exitCode = 1;
} finally {
  await sql.end();
}
