import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getHud, getLeaderboard } from "@/lib/collection-data";
import { LEVELS } from "@/lib/collection";

export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/ranking");

  const leaders = await getLeaderboard(supabase, 50);
  const meInTop = leaders.some((r) => r.userId === hud.userId);

  const medal = (rank: number) =>
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <main className="min-h-screen bg-[#0b1222] pb-28 text-white">
      <header className="relative overflow-hidden border-b border-white/10 px-5 pb-7 pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(241,196,15,0.14), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[4px] text-[#f1c40f]">
            🏅 Ranking Geral
          </p>
          <h1 className="font-display mt-2 text-3xl text-white sm:text-4xl">
            Sábios de Arkanos
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Sua posição:{" "}
            <strong className="text-[#f1c40f]">#{hud.rankPos}</strong> de {hud.rankTotal} ·{" "}
            <strong className="text-white">{hud.totalArks} pts</strong>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Pontuação por TRI — acertar questões difíceis vale mais.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 pt-6">
        <ol className="space-y-2">
          {leaders.map((r) => {
            const me = r.userId === hud.userId;
            const levelName = LEVELS.find((l) => l.n === r.level)?.nome ?? "";
            return (
              <li
                key={r.userId}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                  me
                    ? "border-[#f1c40f] bg-[#f1c40f]/15"
                    : r.rank <= 3
                      ? "border-[#f1c40f]/25 bg-white/5"
                      : "border-white/10 bg-white/5"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="w-8 shrink-0 text-center text-lg font-black text-slate-300">
                    {medal(r.rank) ?? r.rank}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-bold ${me ? "text-[#f1c40f]" : "text-white"}`}
                    >
                      {r.displayName} {me && <span className="text-xs">(você)</span>}
                    </span>
                    <span className="text-xs text-slate-400">
                      Nível {r.level}
                      {levelName ? ` · ${levelName}` : ""}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="font-display text-lg text-white">{r.totalArks}</span>
                  <span className="ml-1 text-xs text-slate-400">pts</span>
                </span>
              </li>
            );
          })}
        </ol>

        {!meInTop && (
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#f1c40f] bg-[#f1c40f]/15 px-4 py-3">
            <span className="flex items-center gap-3">
              <span className="w-8 text-center text-lg font-black text-[#f1c40f]">
                #{hud.rankPos}
              </span>
              <span className="font-bold text-[#f1c40f]">{hud.displayName} (você)</span>
            </span>
            <span className="font-display text-lg text-white">{hud.totalArks} pts</span>
          </div>
        )}

        <Link
          href="/desafio"
          className="mt-8 flex w-full items-center justify-center rounded-full bg-[#f1c40f] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
        >
          ⚔️ Ir para os Desafios
        </Link>
      </div>
    </main>
  );
}
