import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GameCard } from "@/components/game-card";
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
  RARITY_LABEL,
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

  const blocks: OrbBlock[] = ["trivium", "quadrivium", "virtudes"];

  return (
    <main className="min-h-screen bg-[#0b1222] pb-24 text-white">
      {/* Cabeçalho + barra de progresso de coleção rumo à Platina */}
      <header className="border-b border-white/10 bg-gradient-to-b from-[#101a33] to-transparent px-5 pb-8 pt-7">
        <div className="mx-auto max-w-5xl">
          <Link href="/jogos" className="text-sm font-bold text-slate-400 hover:text-[#f1c40f]">
            ← Perfil
          </Link>
          <h1 className="font-display mt-2 text-3xl text-white sm:text-4xl">Coleção</h1>
          <p className="mt-1 text-sm text-slate-300">
            A sala de troféus da sua jornada rumo ao{" "}
            <strong className="text-[#f1c40f]">Sábio Coroado de Arkanos</strong>.
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
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#f1c40f]">
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
                          title={isOwned ? o.nome : RARITY_LABEL.terrestre}
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
                    <p className={`text-xs font-bold ${locked ? "text-slate-500" : "text-white"}`}>
                      {m.nome}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-slate-500">{m.criterio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ---------------- Títulos ---------------- */}
        <Section title="Títulos" hint="Exibidos no seu perfil">
          <div className="flex flex-wrap gap-2.5">
            {TITLES.map((t) => {
              const mine = owned.titles.find((x) => x.key === t.key);
              const locked = !mine;
              return (
                <span
                  key={t.key}
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${
                    locked
                      ? "border-white/10 text-slate-600"
                      : mine?.equipped
                        ? "border-[#f1c40f] bg-[#f1c40f]/15 text-[#f1c40f]"
                        : "border-[#f1c40f]/30 text-slate-200"
                  }`}
                >
                  {locked ? "🔒 " : mine?.equipped ? "⭐ " : ""}
                  {t.nome}
                </span>
              );
            })}
          </div>
        </Section>
      </div>
    </main>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#f1c40f]/30 bg-[#f1c40f]/10 px-3 py-1 text-[#f1c40f]">
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
        <h2 className="font-display text-xl text-white sm:text-2xl">{title}</h2>
        {hint && <p className="text-right text-xs text-slate-500">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
