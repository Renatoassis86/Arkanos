import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy oficial da Next.js 16+ (antigo "middleware").
 * Renova a sessão do Supabase, protege rotas e força a desativação de cache
 * em respostas autenticadas para impedir exibição de 404/obsoletas em trocas de conta.
 */
const PROTECTED_PREFIXES = ["/jogos", "/desafio", "/radix", "/spelling-bee", "/ranking", "/colecao"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  // Desativa cache local do navegador para evitar renderização de páginas obsoletas pós-logout
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) return response;

  try {
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
          response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

    if (!user && isProtected) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("next", pathname);
      const redir = NextResponse.redirect(redirectUrl);
      redir.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
      return redir;
    }

    return response;
  } catch {
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
