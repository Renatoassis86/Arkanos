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
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
];

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthShell
      title="Criar conta"
      subtitle="É rapidinho — só seu nome e sua série!"
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/login" className="font-bold text-[#b8860b] hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      {error && <p className={errorClass}>{decodeURIComponent(error)}</p>}

      <form action={signup} className="mt-5 space-y-4">
        <input
          name="nome"
          type="text"
          required
          autoComplete="off"
          placeholder="Seu nome"
          className={inputClass}
        />
        <input
          name="sobrenome"
          type="text"
          required
          autoComplete="off"
          placeholder="Seu sobrenome"
          className={inputClass}
        />
        <label className="space-y-1.5">
          <span className={labelClass}>Data de nascimento</span>
          <input
            name="data_nascimento"
            type="date"
            required
            className={`${inputClass} [color-scheme:dark]`}
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelClass}>Série</span>
          <select name="serie" defaultValue="3º ano" className={inputClass}>
            {SERIES.map((s) => (
              <option key={s} value={s} className="bg-white text-slate-900">
                {s}
              </option>
            ))}
          </select>
        </label>

        <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          📌 Para entrar depois, use o seu <strong className="text-slate-200">nome</strong>{" "}
          e o seu <strong className="text-slate-200">sobrenome</strong>.
        </p>

        <button type="submit" className={submitClass}>
          Criar conta
        </button>
      </form>
    </AuthShell>
  );
}
