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

      <form action={login} className="mt-8 space-y-6">
        <div>
          <label className={labelClass}>Nome</label>
          <input
            name="nome"
            type="text"
            required
            autoComplete="off"
            placeholder="Seu primeiro nome"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Último sobrenome</label>
          <input
            name="sobrenome"
            type="text"
            required
            autoComplete="off"
            placeholder="Seu último sobrenome"
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <button type="submit" className={submitClass}>
            Entrar no Arkanos →
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
