import Link from "next/link";
import Image from "next/image";
import { listDesafioQuestions } from "@/db/queries/quiz";
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
  const gradeId = num(params.grade);
  const trimestre = num(params.trimestre);
  const assessmentId = num(params.assessment);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let body;
  if (assessmentId) {
    const questions = await listDesafioQuestions(50, assessmentId);
    const backHref =
      subjectId && gradeId && trimestre
        ? `/desafio?subject=${subjectId}&grade=${gradeId}&trimestre=${trimestre}`
        : "/desafio";
    body = (
      <>
        <div className="mx-auto mb-6 max-w-2xl">
          <Link
            href={backHref}
            className="text-sm font-bold text-slate-400 transition hover:text-[#f1c40f]"
          >
            ← Trocar prova
          </Link>
        </div>
        <DesafioQuiz questions={shuffle(questions)} authed={!!user} />
      </>
    );
  } else {
    body = (
      <BankNavigator
        subjectId={subjectId}
        gradeId={gradeId}
        trimestre={trimestre}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1222]">
      <header className="border-b border-white/10 bg-[#0a0f1c]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-bold text-white">
              Desafio dos Sábios
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-slate-300 transition hover:text-[#f1c40f]"
          >
            ← Início
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">{body}</main>
    </div>
  );
}
