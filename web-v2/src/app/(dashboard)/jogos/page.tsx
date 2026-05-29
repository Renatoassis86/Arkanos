import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../../(auth)/actions";
import { ageFromBirthdate, recommendedTrack, TRACK_LABELS } from "@/lib/trivium";
import { getHud, getOwnedCollection, getLeaderboard } from "@/lib/collection-data";
import { GameCard } from "@/components/game-card";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { LEVELS, ERAS, ORBS, TITLES, eraForLevel } from "@/lib/collection";

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

  const [owned, leaders] = await Promise.all([
    getOwnedCollection(supabase, hud.userId),
    getLeaderboard(supabase, 5),
  ]);

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
