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
import { Brush } from "@/components/floating-art";
import { AvatarUploader } from "@/components/avatar-uploader";
import { JourneyMap } from "@/components/journey-map";
import { LEVELS, ERAS, ORBS, TITLES, DAILY_MISSIONS, eraForLevel } from "@/lib/collection";

const TRACK_GUARDIAN: Record<string, string> = {
  gramatica: "lyra",
  logica: "aion",
  retorica: "kael",
};

const GAME_LABEL: Record<string, { nome: string; mono: string; color: string }> = {
  desafio: { nome: "Desafio dos Sábios", mono: "D", color: "#3b82f6" },
  "spelling-bee": { nome: "Spelling Bee", mono: "S", color: "#ec4899" },
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

// eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const relativo = (iso: string) => {
    const dias = Math.floor((now - new Date(iso).getTime()) / 86400000);
    return dias <= 0 ? "hoje" : dias === 1 ? "ontem" : `há ${dias} dias`;
  };

  const age = ageFromBirthdate(hud.dataNascimento);
  const track = recommendedTrack(age);
  const levelDef = LEVELS.find((l) => l.n === hud.level) ?? LEVELS[0];
  const equippedTitle = owned.titles.find((t) => t.equipped);
  const niveis = LEVELS.filter((l) => hud.level >= l.n).length;
  const previewOrbs = ORBS.filter((o) => owned.orbs.has(o.key)).slice(0, 4);

  // Ação recomendada conforme a trilha (idade).
  const RECO =
    track === "gramatica"
      ? { nome: "Spelling Bee", sub: "Soletração com Lyra · Gramática", href: "/spelling-bee", color: "#ec4899", guardian: "lyra" }
      : { nome: "Desafio dos Sábios", sub: "Quiz com Aion · Lógica", href: "/desafio", color: "#3b82f6", guardian: "aion" };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#e8f0ff] via-[#f1eaff] to-[#fdeef4] pb-28 text-slate-800">
      {/* Brushes-marca d'água (cores dividindo o fundo) */}
      <Brush color="#f1c40f" className="left-[-20%] top-[10%] h-72 w-72" opacity={0.16} />
      <Brush color="#8b5cf6" className="right-[-22%] top-[34%] h-72 w-72" opacity={0.16} />
      <Brush color="#ec4899" className="right-[-18%] top-[60%] h-72 w-72" opacity={0.12} />
      <Brush color="#3b82f6" className="bottom-[6%] left-[-18%] h-72 w-72" opacity={0.14} />

      {/* HUD */}
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#1e3a8a] via-[#3730a3] to-[#6d28d9] px-5 pb-8 pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(241,196,15,0.30), transparent 70%)," +
              "radial-gradient(50% 50% at 92% 100%, rgba(236,72,153,0.28), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <AvatarUploader
            userId={hud.userId}
            currentUrl={hud.avatarUrl}
            displayName={hud.displayName}
          />
          <h1 className="font-display mt-3 text-2xl text-white">{hud.displayName}</h1>
          <p className="mt-1 text-sm text-blue-100">
            Nível <strong className="text-[#fcd34d]">{hud.level}</strong> · {levelDef.nome}
            {equippedTitle
              ? ` · ★ ${TITLES.find((t) => t.key === equippedTitle.key)?.nome}`
              : ""}
          </p>
          {hud.streak > 0 && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-bold text-amber-200">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {hud.streak} {hud.streak === 1 ? "dia" : "dias"} de ofensiva
            </span>
          )}

          <div className="mt-4 w-full max-w-md">
            <div className="mb-1 flex justify-between text-xs font-bold text-blue-100">
              <span className="text-[#fcd34d]">{hud.totalArks} Arks</span>
              <span>
                {hud.arksForNext > 0 ? `${hud.arksForNext} p/ Nv ${hud.level + 1}` : "Nível máximo!"}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f1c40f] to-[#e0a417]"
                style={{ width: `${hud.levelProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
            <ArkChip label="Bronze" n={hud.arks.bronze} color="#b87333" />
            <ArkChip label="Prata" n={hud.arks.prata} color="#64748b" />
            <ArkChip label="Ouro" n={hud.arks.ouro} color="#d4a017" />
            <ArkChip label="Diamante" n={hud.arks.diamante} color="#0891b2" />
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <GuardianAvatar name={TRACK_GUARDIAN[track]} size={52} />
            <p className="text-left text-sm text-blue-50">
              Seu guia na trilha de{" "}
              <strong className="text-[#fcd34d]">{TRACK_LABELS[track]}</strong>
              {age !== null ? ` (${age} anos)` : ""}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-7 px-5 pt-7">
        {/* Continue sua jornada (ação recomendada) */}
        <Link href={RECO.href} className="block">
          <div
            className="relative overflow-hidden rounded-3xl p-5 text-white shadow-lg transition hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${RECO.color}, ${RECO.color}bb)` }}
          >
            <div
              className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }}
            />
            <div className="relative flex items-center gap-4">
              <GuardianAvatar name={RECO.guardian} size={64} ring="#ffffff" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[3px] text-white/85">
                  Continue sua jornada
                </p>
                <p className="font-display text-xl leading-tight">{RECO.nome}</p>
                <p className="truncate text-xs text-white/85">{RECO.sub}</p>
              </div>
              <span
                className="rounded-full bg-white px-5 py-2.5 text-sm font-black uppercase tracking-wider shadow"
                style={{ color: RECO.color }}
              >
                Jogar
              </span>
            </div>
          </div>
        </Link>

        {/* Mapa da Jornada das 7 Artes */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="font-emblem text-[11px] font-black uppercase tracking-[3px] text-[#b8860b]">
                A Jornada do Saber
              </p>
              <h2 className="font-display text-xl text-slate-900">Mapa das 7 Artes Liberais</h2>
            </div>
            <Link href="/colecao" className="text-xs font-bold text-[#b8860b] hover:underline">
              Coleção · {owned.orbs.size} orbes →
            </Link>
          </div>
          <JourneyMap track={track} />
        </section>

        {/* Missões do dia */}
        <Card title="Missões do dia" color="#3b82f6">
          {DAILY_MISSIONS.every((m) => daily[m.metric] >= m.target) && (
            <span className="float-right -mt-9 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-600">
              Tudo completo!
            </span>
          )}
          <div className="space-y-3">
            {DAILY_MISSIONS.map((m) => {
              const cur = Math.min(daily[m.metric], m.target);
              const done = cur >= m.target;
              return (
                <div key={m.key} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                      done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className={done ? "font-bold text-emerald-600" : "text-slate-700"}>
                        {m.label}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {cur}/{m.target}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-[#e0a417]"}`}
                        style={{ width: `${(cur / m.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Últimos desafios */}
        <Card title="Últimos desafios" color="#8b5cf6">
          {recent.length === 0 ? (
            <p className="text-sm text-slate-500">
              Você ainda não concluiu nenhum desafio. Comece agora e seus resultados aparecem aqui!
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((s, i) => {
                const g = GAME_LABEL[s.game] ?? { nome: s.game, mono: "?", color: "#64748b" };
                const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2.5">
                      <Mono mono={g.mono} color={g.color} size={36} />
                      <span>
                        <span className="block font-bold text-slate-900">{g.nome}</span>
                        <span className="text-xs text-slate-500">
                          {s.correct}/{s.total} · {relativo(s.at)}
                        </span>
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="font-display text-base text-[#b8860b]">{s.points}</span>
                      <span className="block text-[10px] text-slate-400">{pct}% · pts</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Projetos e atividades */}
        <Card title="Projetos e atividades" color="#ec4899">
          <div className="rounded-xl border border-dashed border-slate-300 bg-[#f8fafc] p-5 text-center">
            <p className="text-sm text-slate-600">
              Nenhum projeto ou atividade com prazo no momento.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Em breve: trabalhos e projetos com data, atribuídos pela escola ou pela família.
            </p>
          </div>
        </Card>

        {/* Ranking */}
        <Card title="Ranking" color="#f59e0b">
          <span className="float-right -mt-9 text-sm font-bold text-slate-600">
            Você é <strong className="text-[#b8860b]">#{hud.rankPos}</strong> de {hud.rankTotal}
          </span>
          <ol className="mt-1 space-y-1.5">
            {leaders.map((r) => {
              const me = r.userId === hud.userId;
              return (
                <li
                  key={r.userId}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    me ? "bg-[#f1c40f]/15 font-bold text-[#b8860b]" : "text-slate-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 text-center font-black text-slate-400">{r.rank}</span>
                    {r.displayName}
                    {me && <span className="text-xs">(você)</span>}
                  </span>
                  <span className="text-xs">
                    Nv {r.level} · {r.totalArks} pts
                  </span>
                </li>
              );
            })}
          </ol>
          <Link href="/ranking" className="mt-3 block text-center text-xs font-bold text-[#b8860b] hover:underline">
            Ver ranking completo →
          </Link>
        </Card>

        {/* Prévia da coleção */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg text-slate-900">Coleção em destaque</h2>
            <Link href="/colecao" className="text-xs font-bold text-[#b8860b] hover:underline">
              Ver tudo →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <GameCard
              type="nivel"
              artSrc={ERAS[eraForLevel(hud.level)].bg}
              badge={`Nv ${hud.level}`}
              title={levelDef.nome}
            />
            {previewOrbs.map((o) => (
              <GameCard key={o.key} type="orbe" artSrc={o.art} title={o.nome} rarity={owned.orbs.get(o.key)} />
            ))}
            {Array.from({ length: Math.max(0, 3 - previewOrbs.length) }).map((_, i) => {
              const next = ORBS.filter((o) => !owned.orbs.has(o.key))[i];
              if (!next) return null;
              return <GameCard key={`lock-${next.key}`} type="orbe" artSrc={next.art} title="???" locked />;
            })}
          </div>
        </section>

        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-full border border-slate-300 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-500 transition hover:bg-slate-100"
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}

function Mono({ mono, color, size = 44 }: { mono: string; color: string; size?: number }) {
  return (
    <span
      className="font-display flex shrink-0 items-center justify-center rounded-2xl font-black text-white shadow-sm"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.42 }}
    >
      {mono}
    </span>
  );
}

function GameLink({
  href,
  mono,
  color,
  nome,
  sub,
}: {
  href: string;
  mono: string;
  color: string;
  nome: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border-2 p-5 shadow-sm transition hover:-translate-y-0.5"
      style={{ borderColor: `${color}40`, background: `linear-gradient(180deg, ${color}1f, ${color}08)` }}
    >
      <Mono mono={mono} color={color} />
      <p className="font-display mt-2 text-lg text-slate-900">{nome}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </Link>
  );
}

function Card({
  title,
  children,
  color = "#3b82f6",
}: {
  title: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <section
      className="rounded-2xl border border-l-4 p-5 shadow-sm backdrop-blur"
      style={{
        borderColor: `${color}33`,
        borderLeftColor: color,
        background: `linear-gradient(180deg, ${color}1f, ${color}0a)`,
      }}
    >
      <h2 className="font-display mb-3 text-lg text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function ArkChip({ label, n, color }: { label: string; n: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/12 px-3 py-1 text-white">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label} {n}
    </span>
  );
}
