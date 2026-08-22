import { z } from "zod";

/**
 * Validação das variáveis de ambiente (SERVER-SIDE).
 * Falha cedo com mensagem clara se algo essencial faltar.
 *
 * ⚠️ NÃO importe este módulo em componentes client: ele lê segredos do servidor
 * (DATABASE_URL, SERVICE_ROLE). No browser, use process.env.NEXT_PUBLIC_* direto.
 */
const schema = z.object({
  DATABASE_URL: z.string().default("postgres://postgres:postgres@localhost:5432/postgres"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default("dummy_service_role_key"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().default("https://xyzcompany.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default("dummy_anon_key"),
});

export const env = schema.parse({
  DATABASE_URL: process.env.DATABASE_URL || undefined,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || undefined,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || undefined,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || undefined,
});
