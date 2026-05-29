import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "@/db/schema";

/**
 * Conexão Drizzle + postgres-js com o Postgres do Supabase.
 * `prepare: false` é obrigatório ao usar o pooler do Supabase (pgbouncer
 * em transaction mode), que não suporta prepared statements.
 */
const client = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
