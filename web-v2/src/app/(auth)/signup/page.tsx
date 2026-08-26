import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signup } from "../actions";
import {
  AuthShell,
  inputClass,
  labelClass,
  submitClass,
  errorClass,
} from "@/components/auth-shell";

const SERIES = [
  "Infantil 2",
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
  "1ª série EM",
  "2ª série EM",
  "3ª série EM",
];

export default async function SignupPage({
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
      title="Criar conta"
      subtitle="É rapidinho, só seu nome e sua série!"
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
        <div>
          <input
            name="data_nascimento"
            type="text"
            required
            inputMode="numeric"
            autoComplete="off"
            placeholder="15/07/1986"
            pattern="\d{2}/\d{2}/\d{4}"
            title="Formato: DD/MM/AAAA"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Data de nascimento — formato DD/MM/AAAA (dia/mês/ano), ex: 15/07/1986.
          </p>
        </div>
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
          Para entrar depois, use o seu <strong className="text-slate-700">nome</strong>{" "}
          e o seu <strong className="text-slate-700">último sobrenome</strong>.
        </p>

        <button type="submit" className={submitClass}>
          Criar conta
        </button>
      </form>
    </AuthShell>
  );
}
