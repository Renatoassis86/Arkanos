import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * Client Supabase para uso em Server Components, Route Handlers e Server Actions.
 * `cookies()` é assíncrono na Next 15+/16 — daí o await.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Chamado de um Server Component (cookies read-only):
            // o proxy (proxy.ts) cuida de renovar a sessão. Ignorar.
          }
        },
      },
    },
  );
}
