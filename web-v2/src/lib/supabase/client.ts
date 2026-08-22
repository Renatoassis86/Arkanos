import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase para uso no browser (Client Components).
 * Usa apenas variáveis públicas (NEXT_PUBLIC_*), nunca segredos do servidor.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyzcompany.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_anon_key",
  );
}
