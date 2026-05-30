"use client";

import { motion } from "motion/react";

/**
 * Celebração FLUTUANTE de acerto — substitui emojis por uma animação real:
 * orbes coloridos que sobem, giram e desaparecem. Sem ícones de IA.
 */
const COLORS = ["#f1c40f", "#ec4899", "#60a5fa", "#34d399", "#a78bfa"];

export function FloatingCelebration({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const color = COLORS[i % COLORS.length];
        const spread = (i - (count - 1) / 2) * 16; // distribui na horizontal
        const rise = 50 + ((i * 37) % 50); // altura que sobe (pseudo-aleatório estável)
        const size = 6 + ((i * 13) % 8);
        const square = i % 3 === 0;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: size,
              height: size,
              background: color,
              borderRadius: square ? 2 : "9999px",
              boxShadow: `0 0 10px ${color}aa`,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: spread,
              y: -rise,
              scale: [0, 1.1, 0.9, 0.4],
              rotate: square ? 220 : 0,
            }}
            transition={{
              duration: 1.4,
              delay: (i % 5) * 0.04,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
