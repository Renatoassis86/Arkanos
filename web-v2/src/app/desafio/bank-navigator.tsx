import Link from "next/link";
import {
  listBankSubjectsForGrade,
  listBankTrimestres,
  listBankProvas,
} from "@/db/queries/quiz";

const TRIMESTRES = [1, 2, 3];
const PROVAS = ["AV1", "AV2", "Prova"];

type Item = { label: string; href?: string };

function Step({
  title,
  items,
  back,
  empty,
}: {
  title: string;
  items: Item[];
  back?: string;
  empty?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
        Banco de Questões
      </p>
      <h1 className="font-display mb-8 text-center text-3xl text-white sm:text-4xl">
        {title}
      </h1>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-300">
          {empty ?? "Nada por aqui ainda."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((it) =>
            it.href ? (
              <Link
                key={it.label}
                href={it.href}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 transition active:scale-[0.98] hover:-translate-y-0.5 hover:border-[#f1c40f]/50 hover:bg-white/10"
              >
                <span className="text-lg font-bold text-white">{it.label}</span>
                <span className="text-[#f1c40f]">→</span>
              </Link>
            ) : (
              <div
                key={it.label}
                aria-disabled
                className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5 opacity-60"
              >
                <span className="text-lg font-bold text-slate-400">{it.label}</span>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Em desenvolvimento
                </span>
              </div>
            ),
          )}
        </div>
      )}

      {back && (
        <div className="mt-8 text-center">
          <Link
            href={back}
            className="text-sm font-bold text-slate-400 transition hover:text-[#f1c40f]"
          >
            ← Voltar
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Navegação dentro da série do aluno (grade vem do perfil, não da URL):
 * Disciplina → Trimestre → Prova.
 */
export async function BankNavigator({
  gradeId,
  subjectId,
  trimestre,
}: {
  gradeId: number;
  subjectId?: number;
  trimestre?: number;
}) {
  // 1) Disciplina (só as que têm conteúdo na série do aluno)
  if (!subjectId) {
    const subjects = await listBankSubjectsForGrade(gradeId);
    return (
      <Step
        title="Escolha a disciplina"
        empty="O conteúdo da sua série está em desenvolvimento. Volte em breve! 🛠️"
        items={subjects.map((s) => ({
          label: s.name,
          href: `/desafio?subject=${s.id}`,
        }))}
      />
    );
  }

  // 2) Trimestre (1º ao 3º — canônico)
  if (!trimestre) {
    const available = new Set(await listBankTrimestres(subjectId, gradeId));
    return (
      <Step
        title="Escolha o trimestre"
        back="/desafio"
        items={TRIMESTRES.map((t) => ({
          label: `${t}º Trimestre`,
          href: available.has(t)
            ? `/desafio?subject=${subjectId}&trimestre=${t}`
            : undefined,
        }))}
      />
    );
  }

  // 3) Prova (AV1, AV2, Prova — canônico)
  const provas = await listBankProvas(subjectId, gradeId, trimestre);
  const byName = new Map(provas.map((p) => [p.name, p.id]));
  return (
    <Step
      title="Escolha a prova"
      back={`/desafio?subject=${subjectId}`}
      items={PROVAS.map((name) => ({
        label: name,
        href: byName.has(name)
          ? `/desafio?subject=${subjectId}&trimestre=${trimestre}&assessment=${byName.get(name)}`
          : undefined,
      }))}
    />
  );
}
