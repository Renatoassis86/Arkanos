import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { listRadixWords } from "@/db/queries/spelling";
import { RadixGame } from "@/components/radix-game";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RadixPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Carrega todas as palavras do Radix para permitir troca dinâmica de série
  const words = await listRadixWords("todos", 300);

  return (
    <div className="min-h-screen bg-[#f3f8f5]">
      <header className="border-b border-emerald-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4">
          <Link href="/jogos" className="flex items-center gap-2.5">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-lg font-bold text-slate-900">
              Radix <span className="text-xs font-medium text-emerald-700">· Soletração</span>
            </span>
          </Link>
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
            Lyra · Gramática
          </span>
        </div>
      </header>

      <main className="px-6 py-10">
        <RadixGame words={words} authed={!!user} />
      </main>
    </div>
  );
}
