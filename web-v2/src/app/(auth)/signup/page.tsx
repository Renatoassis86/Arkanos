import Link from "next/link";
import { signup } from "../actions";
import {
  AuthShell,
  inputClass,
  labelClass,
  submitClass,
  errorClass,
} from "@/components/auth-shell";

const SERIES = [
  ["1ano", "1º Ano"],
  ["2ano", "2º Ano"],
  ["3ano", "3º Ano"],
  ["4ano", "4º Ano"],
  ["5ano", "5º Ano"],
  ["6ano", "6º Ano"],
  ["7ano", "7º Ano"],
  ["8ano", "8º Ano"],
  ["9ano", "9º Ano"],
] as const;

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece sua jornada no Trivium"
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/login" className="font-bold text-[#f1c40f] hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      {error && <p className={errorClass}>{decodeURIComponent(error)}</p>}

      <form action={signup} className="mt-5 space-y-4">
        <input
          name="display_name"
          type="text"
          required
          placeholder="Nome"
          className={inputClass}
        />
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
          minLength={6}
          placeholder="Senha (mín. 6 caracteres)"
          className={inputClass}
        />
        <label className="space-y-1.5">
          <span className={labelClass}>Data de nascimento</span>
          <input
            name="data_nascimento"
            type="date"
            className={`${inputClass} [color-scheme:dark]`}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Série</span>
          <select name="serie" defaultValue="2ano" className={inputClass}>
            {SERIES.map(([value, label]) => (
              <option key={value} value={value} className="bg-[#0b1222]">
                {label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={submitClass}>
          Criar conta
        </button>
      </form>
    </AuthShell>
  );
}
