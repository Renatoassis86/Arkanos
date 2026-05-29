import { z } from "zod";

/**
 * Validação das variáveis de ambiente (SERVER-SIDE).
 * Falha cedo com mensagem clara se algo essencial faltar.
 *
 * ⚠️ NÃO importe este módulo em componentes client: ele lê segredos do servidor
 * (DATABASE_URL, SERVICE_ROLE). No browser, use process.env.NEXT_PUBLIC_* direto.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL ausente"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY ausente"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, "NEXT_PUBLIC_SUPABASE_URL ausente"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY ausente"),
});

export const env = schema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
