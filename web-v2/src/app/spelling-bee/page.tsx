import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listSpellingWords } from "@/db/queries/spelling";
import { SpellingBeeGame } from "@/components/spelling-bee-game";

export const dynamic = "force-dynamic";

export default async function SpellingBeePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/spelling-bee");

  const words = await listSpellingWords(12);

  return (
    <div className="min-h-screen bg-[#0b1222]">
      <header className="border-b border-white/10 bg-[#0a0f1c]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-4">
          <Link href="/jogos" className="flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-bold text-white">Spelling Bee</span>
          </Link>
          <span className="rounded-full border border-[#f1c40f]/30 bg-[#f1c40f]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#f1c40f]">
            Lyra · Gramática
          </span>
        </div>
      </header>

      <main className="px-6 py-12">
        <SpellingBeeGame words={words} authed />
      </main>
    </div>
  );
}
