import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { login } from "../actions";
import { BirthdateInput } from "@/components/birthdate-input";
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
  searchParams: Promise<{ error?: string; next?: string; collision?: string; nome?: string; sobrenome?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error, next, collision, nome, sobrenome } = await searchParams;
  if (user) {
    redirect(next ?? "/jogos");
  }

  const isCollision = collision === "1" && !!nome && !!sobrenome;

  return (
    <AuthShell
      title="Entrar"
      subtitle={isCollision ? "Encontramos mais de um aluno com esse nome" : "Use seu nome e seu sobrenome"}
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

      {isCollision ? (
        <form action={login} className="mt-8 space-y-6">
          <input type="hidden" name="next" value={next ?? "/jogos"} />
          <input type="hidden" name="nome" value={nome} />
          <input type="hidden" name="sobrenome" value={sobrenome} />
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
            Existe mais de um aluno cadastrado como{" "}
            <strong className="text-slate-800">
              {nome} {sobrenome}
            </strong>
            . Informe a data de nascimento para confirmarmos quem é você.
          </p>
          <div>
            <label className={labelClass}>Data de nascimento</label>
            <BirthdateInput required className={inputClass} />
            <p className="mt-1.5 text-xs text-slate-500">
              Só digite os números, as barras aparecem sozinhas (ex: 15/07/1986).
            </p>
          </div>

          <div className="pt-2">
            <button type="submit" className={submitClass}>
              Confirmar e entrar →
            </button>
          </div>
        </form>
      ) : (
        <form action={login} className="mt-8 space-y-6">
          <input type="hidden" name="next" value={next ?? "/jogos"} />
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
      )}
    </AuthShell>
  );
}
