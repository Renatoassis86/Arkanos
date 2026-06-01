import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getHud, getLeaderboard } from "@/lib/collection-data";
import { LEVELS } from "@/lib/collection";
import { Brush } from "@/components/floating-art";

export const dynamic = "force-dynamic";

const MEDAL: Record<number, string> = { 1: "#d4a017", 2: "#94a3b8", 3: "#b87333" };

export default async function RankingPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/ranking");

  const leaders = await getLeaderboard(supabase, 50);
  const meInTop = leaders.some((r) => r.userId === hud.userId);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#e8f0ff] via-[#eee9ff] to-[#fef3e8] pb-28 text-slate-800">
      {/* Brushes-marca d'água (cores dividindo o fundo) */}
      <Brush color="#f1c40f" className="left-[-18%] top-[14%] h-72 w-72" opacity={0.16} />
      <Brush color="#6366f1" className="right-[-20%] top-[42%] h-72 w-72" opacity={0.16} />
      <Brush color="#ec4899" className="bottom-[10%] left-[-16%] h-72 w-72" opacity={0.12} />

      <header className="relative overflow-hidden border-b border-slate-200 bg-white px-5 pb-7 pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(70% 60% at 50% 0%, rgba(241,196,15,0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[4px] text-[#b8860b]">
            Ranking Geral
          </p>
          <h1 className="font-display mt-2 text-3xl text-slate-900 sm:text-4xl">
            Sábios de Arkanos
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sua posição: <strong className="text-[#b8860b]">#{hud.rankPos}</strong> de{" "}
            {hud.rankTotal} · <strong className="text-slate-900">{hud.totalArks} pts</strong>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Pontuação por TRI: acertar questões difíceis vale mais.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 pt-6">
        <ol className="space-y-2">
          {leaders.map((r) => {
            const me = r.userId === hud.userId;
            const levelName = LEVELS.find((l) => l.n === r.level)?.nome ?? "";
            const medalColor = MEDAL[r.rank];
            return (
              <li
                key={r.userId}
                className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 ${
                  me ? "border-[#f1c40f] bg-[#f1c40f]/10" : "border-slate-200 bg-white"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black"
                    style={
                      medalColor
                        ? { backgroundColor: medalColor, color: "#fff" }
                        : { backgroundColor: "#f1f5f9", color: "#64748b" }
                    }
                  >
                    {r.rank}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-bold ${me ? "text-[#b8860b]" : "text-slate-900"}`}
                    >
                      {r.displayName} {me && <span className="text-xs">(você)</span>}
                    </span>
                    <span className="text-xs text-slate-500">
                      Nível {r.level}
                      {levelName ? ` · ${levelName}` : ""}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="font-display text-lg text-slate-900">{r.totalArks}</span>
                  <span className="ml-1 text-xs text-slate-400">pts</span>
                </span>
              </li>
            );
          })}
        </ol>

        {!meInTop && (
          <div className="mt-3 flex items-center justify-between rounded-2xl border-2 border-[#f1c40f] bg-[#f1c40f]/10 px-4 py-3">
            <span className="flex items-center gap-3">
              <span className="w-8 text-center text-lg font-black text-[#b8860b]">
                #{hud.rankPos}
              </span>
              <span className="font-bold text-[#b8860b]">{hud.displayName} (você)</span>
            </span>
            <span className="font-display text-lg text-slate-900">{hud.totalArks} pts</span>
          </div>
        )}

        <Link
          href="/desafio"
          className="mt-8 flex w-full items-center justify-center rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] shadow-md transition hover:-translate-y-0.5"
        >
          Ir para os Desafios →
        </Link>
      </div>
    </main>
  );
}
