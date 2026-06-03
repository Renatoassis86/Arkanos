import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GameCard } from "@/components/game-card";
import { TitlesManager } from "@/components/titles-manager";
import { Brush } from "@/components/floating-art";
import {
  getHud,
  getOwnedCollection,
  type Owned,
} from "@/lib/collection-data";
import {
  LEVELS,
  ERAS,
  ORBS,
  ORB_BLOCK_LABEL,
  MEDALS,
  MEDAL_TIER_COLOR,
  medalArt,
  TITLES,
  type OrbBlock,
} from "@/lib/collection";

export default async function ColecaoPage() {
  const supabase = await createClient();
  const hud = await getHud(supabase);
  if (!hud) redirect("/login?next=/colecao");
  const owned: Owned = await getOwnedCollection(supabase, hud.userId);

  const niveisDesbloqueados = LEVELS.filter((l) => hud.level >= l.n).length;
  const orbesObtidos = owned.orbs.size;
  const medalhasObtidas = MEDALS.filter((m) => owned.achievements.has(m.key)).length;
  const titulosObtidos = owned.titles.length;

  const blocks: OrbBlock[] = ["conhecimento", "virtudes", "mitico"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff7e8] via-[#f1eaff] to-[#e8f5ff] pb-28 text-slate-800">
      {/* Brushes-marca d'água (cores dividindo o fundo) */}
      <Brush color="#e0a417" className="left-[-18%] top-[12%] h-72 w-72" opacity={0.16} />
      <Brush color="#8b5cf6" className="right-[-20%] top-[40%] h-72 w-72" opacity={0.16} />
      <Brush color="#ec4899" className="right-[-16%] top-[64%] h-72 w-72" opacity={0.12} />
      <Brush color="#10b981" className="bottom-[8%] left-[-16%] h-72 w-72" opacity={0.14} />

      {/* Cabeçalho + barra de progresso de coleção rumo à Platina */}
      <header className="border-b border-slate-200 bg-white px-5 pb-8 pt-7">
        <div className="mx-auto max-w-5xl">
          <Link href="/jogos" className="text-sm font-bold text-slate-500 hover:text-[#b8860b]">
            ← Perfil
          </Link>
          <h1 className="font-display mt-2 text-3xl text-slate-900 sm:text-4xl">Coleção</h1>
          <p className="mt-1 text-sm text-slate-600">
            A sala de troféus da sua jornada rumo ao{" "}
            <strong className="text-[#b8860b]">Sábio Coroado de Arkanos</strong>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
            <Chip label={`Níveis ${niveisDesbloqueados}/${LEVELS.length}`} />
            <Chip label={`Orbes ${orbesObtidos}/${ORBS.length}`} />
            <Chip label={`Medalhas ${medalhasObtidas}/${MEDALS.length}`} />
            <Chip label={`Títulos ${titulosObtidos}/${TITLES.length}`} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-12 px-5 pt-8">
        {/* ---------------- Níveis ---------------- */}
        <Section title="Níveis · A Escada das Artes Liberais" hint="50 cards · 5 Eras">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6">
            {LEVELS.map((l) => {
              const locked = hud.level < l.n;
              return (
                <GameCard
                  key={l.n}
                  type="nivel"
                  artSrc={ERAS[l.era].bg}
                  badge={`Nv ${l.n}`}
                  title={locked ? `${l.arks} Arks` : l.nome}
                  locked={locked}
                />
              );
            })}
          </div>
        </Section>

        {/* ---------------- Orbes ---------------- */}
        <Section title="Orbes · Cartas Colecionáveis" hint="30 cards · Trivium · Quadrivium · Virtudes">
          <div className="space-y-7">
            {blocks.map((block) => {
              const orbs = ORBS.filter((o) => o.block === block);
              return (
                <div key={block}>
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#b8860b]">
                    {ORB_BLOCK_LABEL[block]}
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6">
                    {orbs.map((o) => {
                      const rarity = owned.orbs.get(o.key);
                      const isOwned = rarity !== undefined;
                      return (
                        <GameCard
                          key={o.key}
                          type="orbe"
                          artSrc={o.art}
                          title={o.nome}
                          rarity={rarity}
                          locked={!isOwned}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ---------------- Medalhas ---------------- */}
        <Section title="Medalhas" hint="Vitrine olímpica · bronze · prata · ouro · louro">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7">
            {MEDALS.map((m) => {
              const locked = !owned.achievements.has(m.key);
              return (
                <div key={m.key} className="flex flex-col items-center gap-2 text-center">
                  <GameCard
                    type="medalha"
                    artSrc={medalArt(m.key)}
                    tierColor={MEDAL_TIER_COLOR[m.tier]}
                    locked={locked}
                    className="w-full max-w-[120px]"
                  />
                  <div>
                    <p className={`text-xs font-bold ${locked ? "text-slate-400" : "text-slate-900"}`}>
                      {m.nome}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-slate-400">{m.criterio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ---------------- Títulos ---------------- */}
        <Section title="Títulos" hint="Toque para equipar o exibido no seu perfil">
          <TitlesManager owned={owned.titles} />
        </Section>

        {/* Fluxo: da Coleção segue para o Ranking geral */}
        <Link
          href="/ranking"
          className="flex w-full items-center justify-center rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] shadow-md transition hover:-translate-y-0.5"
        >
          Ver ranking geral →
        </Link>
      </div>
    </main>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#f1c40f]/40 bg-[#f1c40f]/10 px-3 py-1 text-[#b8860b]">
      {label}
    </span>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-display text-xl text-slate-900 sm:text-2xl">{title}</h2>
        {hint && <p className="text-right text-xs text-slate-400">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
