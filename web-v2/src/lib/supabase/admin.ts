import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Client admin (service_role) — SOMENTE servidor (Server Actions).
 * Usado para criar contas de aluno já confirmadas (admin.createUser), evitando a
 * validação de domínio de e-mail do signup público. NUNCA expor no client.
 */
export function createAdminClient() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
