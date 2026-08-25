import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getHud, getLeaderboard } from "@/lib/collection-data";
import { LEVELS } from "@/lib/collection";
import { Brush } from "@/components/floating-art";
import { TrophyIcon, StarIcon, CheckCircleIcon } from "@/components/game-icons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MEDAL: Record<number, string> = { 1: "#d4a017", 2: "#94a3b8", 3: "#b87333" };

export default async function RankingPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/ranking");

  const leaders = await getLeaderboard(supabase, 50);
  const meInTop = leaders.some((r) => r.userId === hud.userId);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#e8f0ff] via-[#eee9ff] to-[#fef3e8] pb-28 text-slate-800">
      {/* Brushes-marca d'água */}
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
          <p className="text-xs font-black uppercase tracking-[4px] text-[#b8860b] flex items-center justify-center gap-1.5">
            <TrophyIcon className="h-4 w-4" /> Ranking Geral dos Sábios
          </p>
          <h1 className="font-display mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Mestres do Saber
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sua posição: <strong className="text-[#b8860b]">#{hud.rankPos}</strong> de{" "}
            {hud.rankTotal} · Seu Recorde: <strong className="text-slate-900">{hud.highScore} pts</strong>
          </p>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Classificação pelo <strong>Recorde da Melhor Corrida</strong> e <strong>Sequência de Acertos Consecutivos</strong>.
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
                className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 shadow-sm ${
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
                      {r.displayName} {me && <span className="text-xs font-normal">(você)</span>}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      Nível {r.level} {levelName ? `· ${levelName}` : ""}
                      {r.maxStreak > 0 && (
                        <span className="ml-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {r.maxStreak} seguidas
                        </span>
                      )}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="font-display text-lg font-black text-slate-900">{r.highScore}</span>
                  <span className="ml-1 text-xs text-slate-400 font-bold">pts</span>
                </span>
              </li>
            );
          })}
        </ol>

        {!meInTop && (
          <div className="mt-3 flex items-center justify-between rounded-2xl border-2 border-[#f1c40f] bg-[#f1c40f]/10 px-4 py-3 shadow-sm">
            <span className="flex items-center gap-3">
              <span className="w-8 text-center text-lg font-black text-[#b8860b]">
                #{hud.rankPos}
              </span>
              <span className="font-bold text-[#b8860b]">{hud.displayName} (você)</span>
            </span>
            <span className="font-display text-lg font-black text-slate-900">{hud.highScore} pts</span>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/radix"
            prefetch={false}
            className="flex-1 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5"
          >
            Jogar Radix →
          </Link>
          <Link
            href="/spelling-bee"
            prefetch={false}
            className="flex-1 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5"
          >
            Jogar Spelling Bee →
          </Link>
        </div>
      </div>
    </main>
  );
}
