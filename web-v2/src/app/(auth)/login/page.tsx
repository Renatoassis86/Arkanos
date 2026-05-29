import Link from "next/link";
import { login } from "../actions";
import {
  AuthShell,
  inputClass,
  submitClass,
  errorClass,
} from "@/components/auth-shell";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <AuthShell
      title="Entrar"
      subtitle="Bem-vindo de volta ao Reino do Saber"
      footer={
        <>
          Não tem conta?{" "}
          <Link href="/signup" className="font-bold text-[#f1c40f] hover:underline">
            Cadastre-se
          </Link>
        </>
      }
    >
      {error && <p className={errorClass}>{decodeURIComponent(error)}</p>}

      <form action={login} className="mt-5 space-y-4">
        <input type="hidden" name="next" value={next ?? "/jogos"} />
        <input
          name="email"
          type="email"
          required
          placeholder="E-mail"
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Senha"
          className={inputClass}
        />
        <button type="submit" className={submitClass}>
          Entrar
        </button>
      </form>
    </AuthShell>
  );
}
