import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (antigo "middleware" — renomeado na Next.js 16).
 * Renova a sessão do Supabase e protege rotas. À PROVA DE FALHAS: se o ambiente
 * de auth não estiver configurado ou ocorrer erro, não derruba o site (segue sem
 * sessão). A autorização definitiva é feita dentro de cada página/Server Action.
 */
const PROTECTED_PREFIXES = ["/jogos"];

export async function proxy(request: NextRequest) {
  const passthrough = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sem env de auth no build/runtime: não quebra — só não renova a sessão.
  if (!url || !anon) return passthrough;

  try {
    let response = passthrough;
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

    if (!user && isProtected) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch {
    // Qualquer falha (env inválido, rede, etc.) não pode derrubar o site inteiro.
    return passthrough;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
