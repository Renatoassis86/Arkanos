"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { GameCard } from "./game-card";
import { playFanfare } from "@/lib/feedback";
import {
  ORBS,
  MEDALS,
  LEVELS,
  ERAS,
  eraForLevel,
  RARITY_LABEL,
  MEDAL_TIER_COLOR,
  medalArt,
  type Rarity,
} from "@/lib/collection";

export type RevealItem =
  | { kind: "level"; level: number }
  | { kind: "orb"; key: string; rarity: Rarity }
  | { kind: "medal"; key: string };

// Orbes da Lógica → narrados por Aion; demais, narração genérica.
const AION_ORBS = new Set(["logos", "deducao", "argumento"]);

type View = {
  category: string;
  title: string;
  narration: string;
  card: React.ReactNode;
};

function resolve(item: RevealItem): View {
  if (item.kind === "level") {
    const def = LEVELS.find((l) => l.n === item.level);
    return {
      category: "Novo Nível",
      title: `Nível ${item.level} — ${def?.nome ?? ""}`,
      narration: "Avança na Escada das Artes Liberais. Tua dedicação honra o Autor de toda sabedoria!",
      card: (
        <GameCard
          type="nivel"
          artSrc={ERAS[eraForLevel(item.level)].bg}
          badge={`Nv ${item.level}`}
          title={def?.nome}
        />
      ),
    };
  }
  if (item.kind === "orb") {
    const orb = ORBS.find((o) => o.key === item.key);
    const aion = AION_ORBS.has(item.key);
    return {
      category: RARITY_LABEL[item.rarity],
      title: orb?.nome ?? "Orbe",
      narration: aion
        ? "Aion declara: “A verdade se ilumina para quem persevera.”"
        : "Um novo orbe brilha em tua coleção. Continue firme na jornada!",
      card: <GameCard type="orbe" artSrc={orb?.art} rarity={item.rarity} title={orb?.nome} />,
    };
  }
  const medal = MEDALS.find((m) => m.key === item.key);
  return {
    category: medal ? `Medalha · ${medal.tier}` : "Medalha",
    title: medal?.nome ?? "Medalha",
    narration: "Toda grande jornada começa com um passo firme. Bem-vindo, jovem sábio!",
    card: (
      <GameCard
        type="medalha"
        artSrc={medalArt(item.key)}
        tierColor={medal ? MEDAL_TIER_COLOR[medal.tier] : "#f1c40f"}
      />
    ),
  };
}

export function PremiacaoOverlay({
  items,
  onClose,
}: {
  items: RevealItem[];
  onClose: () => void;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length > 0) playFanfare();
  }, [i, items.length]);

  if (items.length === 0) return null;

  const item = items[i];
  const view = resolve(item);
  const last = i >= items.length - 1;

  function advance() {
    if (last) onClose();
    else setI((n) => n + 1);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/80 px-6 backdrop-blur-sm"
      >
        {/* Raios de luz dourados girando */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-[150vmax] w-[150vmax] opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(241,196,15,0.22) 8deg, transparent 16deg, transparent 24deg, rgba(241,196,15,0.22) 32deg, transparent 40deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(40% 40% at 50% 45%, rgba(241,196,15,0.25), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xs font-black uppercase tracking-[5px] text-[#f1c40f]"
          >
            ✦ Conquista desbloqueada ✦
          </motion.p>

          {/* Card girando para revelar */}
          <motion.div
            key={i}
            initial={{ rotateY: 90, scale: 0.7, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
            style={{ transformPerspective: 1000 }}
            className="my-5 w-44"
          >
            {view.card}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            {view.category}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display mt-1 text-2xl text-white"
          >
            {view.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-200"
          >
            {view.narration}
          </motion.p>

          {items.length > 1 && (
            <p className="mt-3 text-xs text-slate-500">
              {i + 1} de {items.length}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/colecao"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
            >
              Ver na coleção
            </Link>
            <button
              onClick={advance}
              className="rounded-full bg-[#f1c40f] px-8 py-3 text-sm font-black uppercase tracking-wider text-[#0b1222] transition active:scale-95 hover:-translate-y-0.5"
            >
              {last ? "Continuar" : "Próximo →"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
