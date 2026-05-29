import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit não carrega .env.local automaticamente.
loadEnv({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  // Introspecção/diff usa esta conexão. `db:pull` é READ-ONLY.
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
