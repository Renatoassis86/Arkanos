import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../(auth)/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { trackForSerie } from "@/lib/trivium";
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
import { GamepadIcon, TrophyIcon, StarIcon, BookIcon } from "@/components/game-icons";

const GAME_LABEL: Record<string, { nome: string; mono: string; color: string }> = {
  desafio: { nome: "Desafio dos Sábios", mono: "D", color: "#3b82f6" },
  "spelling-bee": { nome: "Spelling Bee", mono: "S", color: "#ec4899" },
  radix: { nome: "Radix", mono: "R", color: "#10b981" },
};

type GameOption = {
  id: string;
  nome: string;
  sub: string;
  tag: string;
  href: string;
  guardian: string;
  bgGradient: string;
  borderHover: string;
  btnBg: string;
  btnText: string;
  tagBg: string;
  tagText: string;
};

const GAMES_CATALOG: GameOption[] = [
  {
    id: "radix",
    nome: "Radix · Soletração",
    sub: "Soletre palavras em português por ordem de dificuldade e suba no ranking dos sábios.",
    tag: "Língua Portuguesa",
    href: "/radix",
    guardian: "lyra",
    bgGradient: "from-emerald-700 via-teal-800 to-emerald-950",
    borderHover: "hover:border-emerald-400",
    btnBg: "bg-emerald-400 hover:bg-emerald-300 text-emerald-950",
    btnText: "Jogar Radix",
    tagBg: "bg-emerald-500/20 border-emerald-400/30",
    tagText: "text-emerald-300",
  },
  {
    id: "spelling-bee",
    nome: "Spelling Bee",
    sub: "Ouça a pronúncia em inglês, peça significado, exemplos e soletre com precisão fonética.",
    tag: "English Language",
    href: "/spelling-bee",
    guardian: "lyra",
    bgGradient: "from-pink-600 via-rose-700 to-pink-900",
    borderHover: "hover:border-pink-300",
    btnBg: "bg-pink-100 hover:bg-white text-pink-900",
    btnText: "Jogar Spelling",
    tagBg: "bg-pink-500/20 border-pink-300/30",
    tagText: "text-pink-200",
  },
  {
    id: "desafio",
    nome: "Desafio dos Sábios",
    sub: "Quiz dinâmico de lógica, ciências, matemática e raciocínio com pontuação ponderada.",
    tag: "Quiz & Lógica",
    href: "/desafio",
    guardian: "aion",
    bgGradient: "from-blue-700 via-indigo-800 to-slate-900",
    borderHover: "hover:border-blue-400",
    btnBg: "bg-amber-400 hover:bg-amber-300 text-amber-950",
    btnText: "Iniciar Desafio",
    tagBg: "bg-blue-500/20 border-blue-400/30",
    tagText: "text-blue-200",
  },
];

type Tool = { label: string; sub: string; mono: string; color: string; href?: string; soon?: boolean };
const TOOLS: Tool[] = [
  { label: "Coleção", sub: "Orbes e níveis", mono: "C", color: "#e0a417", href: "/colecao" },
  { label: "Ranking", sub: "Sua posição", mono: "R", color: "#f59e0b", href: "/ranking" },
  { label: "Clube Livro", sub: "Leitura", mono: "L", color: "#6366f1", href: "/#clube-do-livro" },
  { label: "Universo", sub: "Guardiões", mono: "U", color: "#8b5cf6", href: "/#universo" },
  { label: "Projetos", sub: "Em breve", mono: "P", color: "#10b981", soon: true },
  { label: "Relatórios", sub: "Em breve", mono: "G", color: "#0ea5e9", soon: true },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/jogos");

  const [owned, leaders, daily, recent] = await Promise.all([
    getOwnedCollection(supabase, hud.userId),
    getLeaderboard(supabase, 5),
    getDailyProgress(supabase, hud.userId),
    getRecentSessions(supabase, hud.userId, 4),
  ]);

  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const relativo = (iso: string) => {
    const dias = Math.floor((now - new Date(iso).getTime()) / 86400000);
    return dias <= 0 ? "hoje" : dias === 1 ? "ontem" : `há ${dias} dias`;
  };

  const track = trackForSerie(hud.serie);
  const levelDef = LEVELS.find((l) => l.n === hud.level) ?? LEVELS[0];
  const equippedTitle = owned.titles.find((t) => t.equipped);
  const previewOrbs = ORBS.filter((o) => owned.orbs.has(o.key)).slice(0, 3);
  const dailyDone = DAILY_MISSIONS.filter((m) => daily[m.metric] >= m.target).length;
  const dailyPct = Math.round((dailyDone / DAILY_MISSIONS.length) * 100);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#e8f0ff] via-[#f1eaff] to-[#fdeef4] pb-16 text-slate-800">
      <Brush color="#f1c40f" className="left-[-20%] top-[10%] h-72 w-72" opacity={0.14} />
      <Brush color="#8b5cf6" className="right-[-22%] top-[34%] h-72 w-72" opacity={0.14} />
      <Brush color="#3b82f6" className="bottom-[6%] left-[-18%] h-72 w-72" opacity={0.12} />

      {/* ============ HUD DO JOGADOR ============ */}
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#1e3a8a] via-[#3730a3] to-[#6d28d9] px-3.5 pb-6 pt-6 sm:px-5 sm:pb-7 sm:pt-7">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 18% 0%, rgba(241,196,15,0.30), transparent 70%)," +
              "radial-gradient(50% 50% at 92% 100%, rgba(236,72,153,0.26), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <AvatarUploader userId={hud.userId} currentUrl={hud.avatarUrl} displayName={hud.displayName} size={64} />
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-xl sm:text-2xl leading-tight text-white truncate">{hud.displayName}</h1>
              <p className="mt-0.5 text-xs sm:text-sm text-blue-100 truncate">
                Nível <strong className="text-[#fcd34d]">{hud.level}</strong> · {levelDef.nome}
                {equippedTitle ? ` · ★ ${TITLES.find((t) => t.key === equippedTitle.key)?.nome}` : ""}
              </p>
              <div className="mt-2 max-w-md">
                <div className="mb-1 flex justify-between text-[10px] sm:text-[11px] font-bold text-blue-100">
                  <span className="text-[#fcd34d]">{hud.totalArks} Arks</span>
                  <span>{hud.arksForNext > 0 ? `${hud.arksForNext} p/ Nv ${hud.level + 1}` : "Nível máximo!"}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#f1c40f] to-[#e0a417]" style={{ width: `${hud.levelProgress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* strip de métricas */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat value={String(hud.streak)} label={hud.streak === 1 ? "dia de ofensiva" : "dias ofensiva"} accent="#fb923c" />
            <Stat value={`${dailyDone}/${DAILY_MISSIONS.length}`} label="meta do dia" accent="#34d399" />
            <Stat value={String(hud.totalArks)} label="Arks" accent="#fcd34d" />
            <Stat value={`#${hud.rankPos}`} label={`de ${hud.rankTotal} no ranking`} accent="#60a5fa" />
          </div>
        </div>
      </header>

      {/* ============ DASHBOARD ============ */}
      <div className="relative mx-auto max-w-5xl px-3 pt-5 sm:px-6 sm:pt-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {/* ---- COLUNA PRINCIPAL ---- */}
          <div className="space-y-5 lg:col-span-2">
            
            {/* ========================================================================= */}
            {/* SEÇÃO DEDICADA: SALÃO DOS JOGOS (ESCOLHA SEU JOGO) */}
            {/* ========================================================================= */}
            <section className="rounded-2xl sm:rounded-3xl border-2 border-indigo-200 bg-white/90 p-4 sm:p-6 shadow-md backdrop-blur">
              <div className="mb-3.5 flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-indigo-600">
                    <GamepadIcon className="h-4 w-4" /> Salão dos Jogos
                  </span>
                  <h2 className="font-display text-lg sm:text-2xl font-black text-slate-900">
                    Escolha seu Desafio
                  </h2>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-indigo-700 border border-indigo-100">
                  3 Jogos
                </span>
              </div>

              <div className="grid gap-3">
                {GAMES_CATALOG.map((g) => (
                  <Link
                    key={g.id}
                    href={g.href}
                    prefetch={false}
                    className={`group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-r ${g.bgGradient} p-3.5 sm:p-4 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${g.borderHover}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <GuardianAvatar name={g.guardian} size={48} ring="#ffffff" className="shrink-0 group-hover:scale-105 transition duration-200" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block rounded-md border px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${g.tagBg} ${g.tagText}`}>
                              {g.tag}
                            </span>
                          </div>
                          <h3 className="font-display text-base sm:text-lg font-black leading-tight text-white mt-0.5 truncate">
                            {g.nome}
                          </h3>
                          <p className="mt-0.5 text-[11px] sm:text-xs text-white/80 line-clamp-2">
                            {g.sub}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 sm:self-center">
                        <span className={`inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-black uppercase tracking-wider shadow-md transition group-hover:scale-105 active:scale-95 ${g.btnBg}`}>
                          {g.btnText} →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Suas ferramentas */}
            <Panel title="Suas ferramentas" color="#3b82f6">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
                {TOOLS.map((t) => {
                  const inner = (
                    <div
                      className="flex h-full flex-col items-center gap-1 rounded-2xl border bg-white p-2.5 sm:p-3 text-center shadow-sm transition hover:-translate-y-0.5"
                      style={{ borderColor: `${t.color}33` }}
                    >
                      <Mono mono={t.mono} color={t.color} size={36} />
                      <p className="mt-1 text-[11px] sm:text-xs font-black leading-tight text-slate-900 truncate w-full">{t.label}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 truncate w-full">{t.sub}</p>
                    </div>
                  );
                  return t.soon || !t.href ? (
                    <div key={t.label} className="cursor-default opacity-70">{inner}</div>
                  ) : (
                    <Link key={t.label} href={t.href} prefetch={false} className="block h-full">{inner}</Link>
                  );
                })}
              </div>
            </Panel>

            {/* Mapa da Jornada */}
            <Panel
              title="Mapa das 7 Artes Liberais"
              color="#8b5cf6"
              right={<Link href="/colecao" prefetch={false} className="text-xs font-bold text-[#b8860b] hover:underline">Coleção →</Link>}
            >
              <JourneyMap track={track} />
            </Panel>
          </div>

          {/* ---- SIDEBAR ---- */}
          <aside className="space-y-5">
            {/* Meta do dia */}
            <Panel title="Meta do dia" color="#10b981" right={<Ring pct={dailyPct} color="#10b981" />}>
              <div className="space-y-3">
                {DAILY_MISSIONS.map((m) => {
                  const cur = Math.min(daily[m.metric], m.target);
                  const done = cur >= m.target;
                  return (
                    <div key={m.key} className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                        {done ? "✓" : ""}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className={done ? "font-bold text-emerald-600" : "text-slate-700"}>{m.label}</span>
                          <span className="text-xs font-bold text-slate-400">{cur}/{m.target}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                          <div className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-[#e0a417]"}`} style={{ width: `${(cur / m.target) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Ranking */}
            <Panel
              title="Ranking"
              color="#f59e0b"
              right={<span className="text-xs font-bold text-slate-500">#{hud.rankPos} de {hud.rankTotal}</span>}
            >
              <ol className="space-y-1">
                {leaders.map((r) => {
                  const me = r.userId === hud.userId;
                  return (
                    <li key={r.userId} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm ${me ? "bg-[#f1c40f]/15 font-bold text-[#b8860b]" : "text-slate-700"}`}>
                      <span className="flex items-center gap-2 truncate">
                        <span className="w-5 text-center font-black text-slate-400">{r.rank}</span>
                        <span className="truncate">{r.displayName}{me && " (você)"}</span>
                      </span>
                      <span className="shrink-0 text-xs text-slate-400 font-bold">{r.highScore} pts</span>
                    </li>
                  );
                })}
              </ol>
              <Link href="/ranking" prefetch={false} className="mt-2 block text-center text-xs font-bold text-[#b8860b] hover:underline">Ver completo →</Link>
            </Panel>

            {/* Últimos desafios */}
            <Panel title="Últimos desafios" color="#6366f1">
              {recent.length === 0 ? (
                <p className="text-sm text-slate-500">Comece a jogar e seus resultados aparecem aqui.</p>
              ) : (
                <ul className="space-y-2">
                  {recent.map((s, i) => {
                    const g = GAME_LABEL[s.game] ?? { nome: s.game, mono: "?", color: "#64748b" };
                    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                    return (
                      <li key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2 text-sm">
                        <span className="flex items-center gap-2.5 truncate">
                          <Mono mono={g.mono} color={g.color} size={32} />
                          <span className="truncate">
                            <span className="block truncate font-bold text-slate-900">{g.nome}</span>
                            <span className="text-xs text-slate-500">{s.correct}/{s.total} · {relativo(s.at)}</span>
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="font-display text-base text-[#b8860b]">{s.points}</span>
                          <span className="block text-[10px] text-slate-400">{pct}%</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Panel>

            {/* Coleção em destaque */}
            <Panel title="Coleção" color="#e0a417" right={<Link href="/colecao" prefetch={false} className="text-xs font-bold text-[#b8860b] hover:underline">Ver tudo →</Link>}>
              <div className="grid grid-cols-3 gap-2">
                <GameCard type="nivel" artSrc={ERAS[eraForLevel(hud.level)].bg} badge={`Nv ${hud.level}`} title={levelDef.nome} />
                {previewOrbs.map((o) => (
                  <GameCard key={o.key} type="orbe" artSrc={o.art} title={o.nome} rarity={owned.orbs.get(o.key)} />
                ))}
                {Array.from({ length: Math.max(0, 2 - previewOrbs.length) }).map((_, i) => {
                  const next = ORBS.filter((o) => !owned.orbs.has(o.key))[i];
                  if (!next) return null;
                  return <GameCard key={`lock-${next.key}`} type="orbe" artSrc={next.art} title="???" locked />;
                })}
              </div>
            </Panel>
          </aside>
        </div>

        <form action={logout} className="mx-auto mt-8 max-w-xs">
          <button type="submit" className="w-full rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-500 transition hover:bg-white active:scale-95">
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}

/* ---------- helpers ---------- */

function Mono({ mono, color, size = 44 }: { mono: string; color: string; size?: number }) {
  return (
    <span
      className="font-display flex shrink-0 items-center justify-center rounded-xl sm:rounded-2xl font-black text-white shadow-sm"
      style={{ width: size, height: size, background: `linear-gradient(145deg, ${color}, ${color}cc)`, fontSize: size * 0.42 }}
    >
      {mono}
    </span>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-2 sm:px-3 sm:py-2.5 text-center backdrop-blur">
      <p className="font-display text-xl sm:text-2xl leading-none" style={{ color: accent }}>{value}</p>
      <p className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide leading-tight text-blue-100">{label}</p>
    </div>
  );
}

function Panel({
  title,
  color,
  right,
  children,
}: {
  title: string;
  color: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-l-4 bg-white/85 p-3.5 sm:p-4 shadow-sm backdrop-blur" style={{ borderColor: `${color}26`, borderLeftColor: color }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-sm sm:text-base font-black text-slate-900">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  return (
    <svg width="38" height="38" viewBox="0 0 42 42" className="shrink-0">
      <circle cx="21" cy="21" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
      <circle cx="21" cy="21" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 21 21)" />
      <text x="21" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#334155">{pct}%</text>
    </svg>
  );
}
