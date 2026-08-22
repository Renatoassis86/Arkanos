import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { login } from "../actions";
import {
  AuthShell,
  inputClass,
  labelClass,
  submitClass,
  errorClass,
} from "@/components/auth-shell";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error, next } = await searchParams;
  if (user) {
    redirect(next ?? "/jogos");
  }

  return (
    <AuthShell
      title="Entrar"
      subtitle="Use seu nome e seu sobrenome"
      footer={
        <>
          Não tem conta?{" "}
          <Link href="/signup" className="font-bold text-[#b8860b] hover:underline">
            Cadastre-se
          </Link>
        </>
      }
    >
      {error && <p className={errorClass}>{decodeURIComponent(error)}</p>}

      <form action={login} className="mt-5 space-y-4">
        <label className="space-y-1.5">
          <span className={labelClass}>Nome</span>
          <input
            name="nome"
            type="text"
            required
            autoComplete="off"
            placeholder="Seu nome"
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Último sobrenome</span>
          <input
            name="sobrenome"
            type="text"
            required
            autoComplete="off"
            placeholder="Seu último sobrenome"
            className={inputClass}
          />
        </label>

        <button type="submit" className={`${submitClass} py-4 text-base`}>
          Entrar
        </button>
      </form>
    </AuthShell>
  );
}
