import Link from "next/link";
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
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthShell
      title="Entrar"
      subtitle="Use seu nome e seu sobrenome"
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
          <span className={labelClass}>Sobrenome</span>
          <input
            name="sobrenome"
            type="text"
            required
            autoComplete="off"
            placeholder="Seu sobrenome"
            className={inputClass}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Data de nascimento</span>
          <input
            name="data_nascimento"
            type="date"
            required
            className={`${inputClass} [color-scheme:dark]`}
          />
        </label>

        <button type="submit" className={submitClass}>
          Entrar
        </button>
      </form>
    </AuthShell>
  );
}
