import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../../(auth)/actions";
import { ageFromBirthdate, recommendedTrack, TRACK_LABELS } from "@/lib/trivium";
import {
  getHud,
  getOwnedCollection,
  getLeaderboard,
  getDailyProgress,
  getRecentSessions,
} from "@/lib/collection-data";
import { GameCard } from "@/components/game-card";
import { GuardianAvatar } from "@/components/guardian-avatar";
import {
  LEVELS,
  ERAS,
  ORBS,
  TITLES,
  DAILY_MISSIONS,
  eraForLevel,
} from "@/lib/collection";

// Guardião-guia de cada trilha do Trivium.
const TRACK_GUARDIAN: Record<string, string> = {
  gramatica: "lyra",
  logica: "aion",
  retorica: "kael",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/jogos");

  const [owned, leaders, daily, recent] = await Promise.all([
    getOwnedCollection(supabase, hud.userId),
    getLeaderboard(supabase, 5),
    getDailyProgress(supabase, hud.userId),
    getRecentSessions(supabase, hud.userId, 6),
  ]);

  const GAME_LABEL: Record<string, { nome: string; icon: string }> = {
    desafio: { nome: "Desafio dos Sábios", icon: "⚔️" },
    "spelling-bee": { nome: "Spelling Bee", icon: "🐝" },
  };
  const relativo = (iso: string) => {
    const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    return dias <= 0 ? "hoje" : dias === 1 ? "ontem" : `há ${dias} dias`;
  };

  const age = ageFromBirthdate(hud.dataNascimento);
  const track = recommendedTrack(age);
  const levelDef = LEVELS.find((l) => l.n === hud.level) ?? LEVELS[0];
  const equippedTitle = owned.titles.find((t) => t.equipped);

  const niveis = LEVELS.filter((l) => hud.level >= l.n).length;
  const previewOrbs = ORBS.filter((o) => owned.orbs.has(o.key)).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0b1222] pb-24 text-white">
      {/* ---------------- HUD (avatar + nível + barra de Arks + título) ---------------- */}
      <header className="relative overflow-hidden border-b border-white/10 px-5 pb-7 pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(241,196,15,0.14), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#f1c40f]/40 bg-[#f1c40f]/10 font-display text-3xl font-black text-[#f1c40f]">
            {hud.displayName.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-display mt-3 text-2xl text-white">{hud.displayName}</h1>
          <p className="mt-1 text-sm text-slate-300">
            Nível <strong className="text-[#f1c40f]">{hud.level}</strong> · {levelDef.nome}
            {equippedTitle ? ` · ⭐ ${TITLES.find((t) => t.key === equippedTitle.key)?.nome}` : ""}
          </p>
          {hud.streak > 0 && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-sm font-bold text-orange-300">
              🔥 {hud.streak} {hud.streak === 1 ? "dia" : "dias"} de ofensiva
            </span>
          )}

          {/* Barra de Arks rumo ao próximo nível */}
          <div className="mt-4 w-full max-w-md">
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-400">
              <span className="text-[#f1c40f]">⚜️ {hud.totalArks} Arks</span>
              <span>
                {hud.arksForNext > 0 ? `${hud.arksForNext} p/ Nv ${hud.level + 1}` : "Nível máximo!"}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f1c40f] to-[#d4af37]"
                style={{ width: `${hud.levelProgress}%` }}
              />
            </div>
          </div>

          {/* Arks por tipo */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
            <ArkChip emoji="🥉" n={hud.arks.bronze} color="#e0a86b" />
            <ArkChip emoji="🥈" n={hud.arks.prata} color="#cbd5e1" />
            <ArkChip emoji="🥇" n={hud.arks.ouro} color="#f1c40f" />
            <ArkChip emoji="💎" n={hud.arks.diamante} color="#67e8f9" />
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <GuardianAvatar name={TRACK_GUARDIAN[track]} size={52} />
            <p className="text-left text-sm text-slate-300">
              Seu guia na trilha de{" "}
              <strong className="text-[#f1c40f]">{TRACK_LABELS[track]}</strong>
              {age !== null ? ` (${age} anos)` : ""}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-7 px-5 pt-7">
        {/* ---------------- Jogar ---------------- */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/desafio"
            className="rounded-2xl border border-[#f1c40f]/40 bg-gradient-to-br from-[#f1c40f]/15 to-transparent p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-2xl">⚔️</p>
            <p className="font-display mt-1 text-lg text-white">Desafio dos Sábios</p>
            <p className="text-xs text-slate-400">Quiz · Aion · Lógica</p>
          </Link>
          <Link
            href="/spelling-bee"
            className="rounded-2xl border border-[#fb7185]/40 bg-gradient-to-br from-[#fb7185]/15 to-transparent p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-2xl">🐝</p>
            <p className="font-display mt-1 text-lg text-white">Spelling Bee</p>
            <p className="text-xs text-slate-400">Soletração · Lyra · Gramática</p>
          </Link>
          <Link
            href="/colecao"
            className="col-span-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-2xl">🏆</p>
            <div>
              <p className="font-display text-lg text-white">Coleção</p>
              <p className="text-xs text-slate-400">
                {owned.orbs.size} orbes · {niveis} níveis
              </p>
            </div>
          </Link>
        </div>

        {/* ---------------- Missões do dia ---------------- */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-white">📜 Missões do dia</h2>
            {DAILY_MISSIONS.every((m) => daily[m.metric] >= m.target) && (
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-300">
                Tudo completo! ✨
              </span>
            )}
          </div>
          <div className="space-y-3">
            {DAILY_MISSIONS.map((m) => {
              const cur = Math.min(daily[m.metric], m.target);
              const done = cur >= m.target;
              return (
                <div key={m.key} className="flex items-center gap-3">
                  <span className={`text-xl ${done ? "" : "opacity-60 grayscale"}`}>
                    {done ? "✅" : m.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className={done ? "font-bold text-emerald-300" : "text-slate-200"}>
                        {m.label}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {cur}/{m.target}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${done ? "bg-emerald-400" : "bg-[#f1c40f]"}`}
                        style={{ width: `${(cur / m.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- Últimos desafios ---------------- */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-display mb-3 text-lg text-white">🕮 Últimos desafios</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-400">
              Você ainda não concluiu nenhum desafio. Comece agora e seus resultados aparecem aqui!
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((s, i) => {
                const g = GAME_LABEL[s.game] ?? { nome: s.game, icon: "🎮" };
                const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-lg">{g.icon}</span>
                      <span>
                        <span className="block font-bold text-white">{g.nome}</span>
                        <span className="text-xs text-slate-400">
                          {s.correct}/{s.total} · {relativo(s.at)}
                        </span>
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="font-display text-base text-[#f1c40f]">{s.points}</span>
                      <span className="block text-[10px] text-slate-400">{pct}% · pts</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ---------------- Projetos e atividades ---------------- */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-display mb-3 text-lg text-white">📌 Projetos e atividades</h2>
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-5 text-center">
            <p className="text-2xl">🗓️</p>
            <p className="mt-1 text-sm text-slate-300">
              Nenhum projeto ou atividade com prazo no momento.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Em breve: trabalhos e projetos com data, atribuídos pela escola ou pela família.
            </p>
          </div>
        </section>

        {/* ---------------- Ranking (posição em evidência + top 5) ---------------- */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-white">🏅 Ranking</h2>
            <span className="text-sm font-bold text-slate-300">
              Você é <strong className="text-[#f1c40f]">#{hud.rankPos}</strong> de {hud.rankTotal}
            </span>
          </div>
          <ol className="mt-4 space-y-1.5">
            {leaders.map((r) => {
              const me = r.userId === hud.userId;
              return (
                <li
                  key={r.userId}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    me ? "bg-[#f1c40f]/15 font-bold text-[#f1c40f]" : "text-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 text-center font-black text-slate-400">{r.rank}</span>
                    {r.displayName}
                    {me && <span className="text-xs">(você)</span>}
                  </span>
                  <span className="text-xs">
                    Nv {r.level} · {r.totalArks} Arks
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ---------------- Prévia da coleção ---------------- */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-white">Coleção em destaque</h2>
            <Link href="/colecao" className="text-xs font-bold text-[#f1c40f] hover:underline">
              Ver tudo →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {/* card do nível atual */}
            <GameCard
              type="nivel"
              artSrc={ERAS[eraForLevel(hud.level)].bg}
              badge={`Nv ${hud.level}`}
              title={levelDef.nome}
            />
            {previewOrbs.map((o) => (
              <GameCard
                key={o.key}
                type="orbe"
                artSrc={o.art}
                title={o.nome}
                rarity={owned.orbs.get(o.key)}
              />
            ))}
            {/* preenche os espaços vazios com slots bloqueados */}
            {Array.from({ length: Math.max(0, 3 - previewOrbs.length) }).map((_, i) => {
              const next = ORBS.filter((o) => !owned.orbs.has(o.key))[i];
              if (!next) return null;
              return (
                <GameCard
                  key={`lock-${next.key}`}
                  type="orbe"
                  artSrc={next.art}
                  title="???"
                  locked
                />
              );
            })}
          </div>
        </section>

        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-300 transition hover:bg-white/10"
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}

function ArkChip({ emoji, n, color }: { emoji: string; n: number; color: string }) {
  return (
    <span
      className="rounded-full px-3 py-1"
      style={{ backgroundColor: `${color}26`, color }}
    >
      {emoji} {n}
    </span>
  );
}
