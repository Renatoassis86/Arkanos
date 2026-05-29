import Link from "next/link";
import {
  listSubjects,
  listBankSubjects,
  listBankGrades,
  listBankTrimestres,
  listBankProvas,
} from "@/db/queries/quiz";

// Estruturas canônicas: aparecem sempre; sem dados → "Em desenvolvimento".
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
const TRIMESTRES = [1, 2, 3];
const PROVAS = ["AV1", "AV2", "Prova"];

type Item = { label: string; href?: string };

function Step({
  title,
  items,
  back,
}: {
  title: string;
  items: Item[];
  back?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
        Banco de Questões
      </p>
      <h1 className="font-display mb-8 text-center text-3xl text-white sm:text-4xl">
        {title}
      </h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it) =>
          it.href ? (
            <Link
              key={it.label}
              href={it.href}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 transition hover:-translate-y-0.5 hover:border-[#f1c40f]/50 hover:bg-white/10"
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

export async function BankNavigator({
  subjectId,
  gradeId,
  trimestre,
}: {
  subjectId?: number;
  gradeId?: number;
  trimestre?: number;
}) {
  // 1) Disciplina — mostra todas as cadastradas; sem banco → em desenvolvimento.
  if (!subjectId) {
    const [all, available] = await Promise.all([listSubjects(), listBankSubjects()]);
    const ok = new Set(available.map((s) => s.id));
    return (
      <Step
        title="Escolha a disciplina"
        items={all.map((s) => ({
          label: s.name,
          href: ok.has(s.id) ? `/desafio?subject=${s.id}` : undefined,
        }))}
      />
    );
  }

  // 2) Série — 1º ao 9º ano (canônico).
  if (!gradeId) {
    const grades = await listBankGrades(subjectId);
    const byName = new Map(grades.map((g) => [g.name, g.id]));
    return (
      <Step
        title="Escolha a série"
        back="/desafio"
        items={SERIES.map((name) => ({
          label: name,
          href: byName.has(name)
            ? `/desafio?subject=${subjectId}&grade=${byName.get(name)}`
            : undefined,
        }))}
      />
    );
  }

  // 3) Trimestre — 1º ao 3º (canônico).
  if (!trimestre) {
    const available = new Set(await listBankTrimestres(subjectId, gradeId));
    return (
      <Step
        title="Escolha o trimestre"
        back={`/desafio?subject=${subjectId}`}
        items={TRIMESTRES.map((t) => ({
          label: `${t}º Trimestre`,
          href: available.has(t)
            ? `/desafio?subject=${subjectId}&grade=${gradeId}&trimestre=${t}`
            : undefined,
        }))}
      />
    );
  }

  // 4) Prova — AV1, AV2, Prova (canônico).
  const provas = await listBankProvas(subjectId, gradeId, trimestre);
  const byName = new Map(provas.map((p) => [p.name, p.id]));
  return (
    <Step
      title="Escolha a prova"
      back={`/desafio?subject=${subjectId}&grade=${gradeId}`}
      items={PROVAS.map((name) => ({
        label: name,
        href: byName.has(name)
          ? `/desafio?subject=${subjectId}&grade=${gradeId}&trimestre=${trimestre}&assessment=${byName.get(name)}`
          : undefined,
      }))}
    />
  );
}
