import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { listDesafioQuestions, getGradeIdByName } from "@/db/queries/quiz";
import { DesafioQuiz } from "@/components/desafio-quiz";
import { BankNavigator } from "./bank-navigator";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function num(v: string | string[] | undefined): number | undefined {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default async function DesafioPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const subjectId = num(params.subject);
  const trimestre = num(params.trimestre);
  const assessmentId = num(params.assessment);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, serie")
    .eq("id", user.id)
    .single();

  const serie = profile?.serie ?? null;
  const gradeId = serie ? await getGradeIdByName(serie) : null;

  let body;
  if (assessmentId) {
    const questions = await listDesafioQuestions(50, assessmentId);
    const backHref =
      subjectId && trimestre
        ? `/desafio?subject=${subjectId}&trimestre=${trimestre}`
        : "/desafio";
    body = (
      <>
        <div className="mx-auto mb-6 max-w-2xl">
          <Link
            href={backHref}
            className="text-sm font-bold text-slate-500 transition hover:text-[#b8860b]"
          >
            ← Trocar prova
          </Link>
        </div>
        <DesafioQuiz questions={shuffle(questions)} authed />
      </>
    );
  } else if (!gradeId) {
    body = (
      <div className="mx-auto max-w-lg rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="font-display mt-2 text-2xl text-slate-900">
          Conteúdo em desenvolvimento
        </h1>
        <p className="mt-2 text-slate-600">
          As provas {serie ? `do ${serie}` : "da sua série"} ainda estão sendo
          preparadas. Volte em breve!
        </p>
      </div>
    );
  } else {
    body = (
      <BankNavigator
        gradeId={gradeId}
        subjectId={subjectId}
        trimestre={trimestre}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4">
          <Link href="/jogos" className="flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-bold text-slate-900">
              Desafio dos Sábios
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {serie && (
              <span className="rounded-full border border-[#f1c40f]/40 bg-[#f1c40f]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#b8860b]">
                {serie}
              </span>
            )}
            <Link
              href="/jogos"
              className="text-sm font-bold text-slate-500 transition hover:text-[#b8860b]"
            >
              ← Painel
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">{body}</main>
    </div>
  );
}
