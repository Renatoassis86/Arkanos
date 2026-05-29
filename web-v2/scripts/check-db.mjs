// Testa a conexão Postgres (DATABASE_URL) e lista as tabelas do schema public.
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, {
  prepare: false,
  max: 1,
  idle_timeout: 5,
  connect_timeout: 10,
});

try {
  const [{ now }] = await sql`select now() as now`;
  const tables = await sql`
    select table_name from information_schema.tables
    where table_schema = 'public' order by table_name`;
  console.log("✓ Conexão OK. now =", now);
  console.log(`tabelas public (${tables.length}):`, tables.map((t) => t.table_name).join(", "));
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
