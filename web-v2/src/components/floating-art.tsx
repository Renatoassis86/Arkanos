"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/* ============================================================
 * Brushes / fundos em camadas — blobs orgânicos coloridos por trás dos módulos.
 * ============================================================ */
export function Brush({
  color,
  className = "",
  opacity = 0.18,
}: {
  color: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-0 blur-2xl ${className}`}
      style={{
        background: color,
        opacity,
        borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
      }}
    />
  );
}

/* ============================================================
 * Marca d'água CONTEXTUAL — símbolos das Artes (pena, compasso, estrela,
 * livro, esfera, lira) em linha, esfumados, para as seções claras.
 * ============================================================ */
const MARKS: { d: string; fill?: boolean }[] = [
  { d: "M5 19c7-1.2 11-6 14.5-13.5L21 3l-1 4.2L15.5 8.5 M6 18.5 9 17.5" }, // pena
  { d: "M12 3.5 16.8 18 M12 3.5 7.2 18 M7.2 18a6 6 0 0 0 9.6 0 M12 3.5a1.2 1.2 0 1 0 0-.1" }, // compasso
  { d: "M3 5h8v15H5a2 2 0 0 1-2-2zM21 5h-8v15h6a2 2 0 0 0 2-2zM12 5v15", fill: false }, // livro
  { d: "M12 2.5l2.5 6.9 7.3.2-5.8 4.5 2.1 7-6.1-4.1-6.1 4.1 2.1-7L2.2 9.6l7.3-.2z", fill: true }, // estrela
];

function Mark({
  d,
  fill,
  color,
  size,
  className,
  delay,
  reduce,
}: {
  d: string;
  fill?: boolean;
  color: string;
  size: number;
  className: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`absolute ${className}`}
      style={{ width: size, height: size }}
      animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path
        d={d}
        fill={fill ? color : "none"}
        stroke={fill ? "none" : color}
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/** Marca d'água contextual (símbolos das Artes) em azul claro nas seções claras. */
export function ContextWatermark({
  color = "#60a5fa",
  opacity = 0.16,
}: {
  color?: string;
  opacity?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" style={{ opacity }}>
      <Mark d={MARKS[0].d} color={color} size={120} className="left-[3%] top-[12%]" delay={0} reduce={reduce} />
      <Mark d={MARKS[1].d} color={color} size={104} className="right-[5%] top-[16%]" delay={0.8} reduce={reduce} />
      <Mark d={MARKS[3].d} fill color={color} size={64} className="left-[14%] bottom-[14%]" delay={1.4} reduce={reduce} />
      <Mark d={MARKS[2].d} color={color} size={110} className="right-[10%] bottom-[10%]" delay={0.4} reduce={reduce} />
      <Mark d={MARKS[3].d} fill color={color} size={40} className="right-[34%] top-[8%]" delay={1.1} reduce={reduce} />
    </div>
  );
}

/* Etiqueta flutuante (pílula com rótulo) — orbita a figura central. */
function Chip({
  label,
  color,
  className,
  delay,
  reduce,
}: {
  label: string;
  color: string;
  className: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.span
      className={`absolute rounded-full border-2 bg-white/95 px-3 py-1.5 text-xs font-black shadow-[0_10px_25px_rgba(2,6,23,0.10)] backdrop-blur ${className}`}
      style={{ borderColor: `${color}55`, color }}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {label}
    </motion.span>
  );
}

/* Figura 3D "clay" (placeholder do ícone gerado externamente). */
function Clay({
  color,
  size,
  className,
  delay,
  reduce,
  round = false,
}: {
  color: string;
  size: number;
  className: string;
  delay: number;
  reduce: boolean;
  round?: boolean;
}) {
  return (
    <motion.span
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: round ? "9999px" : "30%",
        background: `radial-gradient(circle at 32% 28%, #ffffffcc, ${color} 55%, ${color} 100%)`,
        boxShadow: `0 12px 24px -6px ${color}88, inset 0 -6px 12px -4px rgba(0,0,0,0.25)`,
      }}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/**
 * Showcase do hero (estilo Educacross adaptado): figura central (guardião/criança)
 * sobre blob, com anéis, ícones 3D flutuantes e etiquetas orbitando.
 * SLOTS: trocar a imagem central por `/img/site/fotos/hero-crianca.png` e os Clay por
 * ícones 3D gerados (ver docs/PROMPTS_DESIGN_SITE.md).
 */
export function HeroShowcase() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Anéis concêntricos girando devagar */}
      <motion.div
        aria-hidden
        className="absolute inset-[6%] rounded-full border border-[#f1c40f]/25"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-[18%] rounded-full border border-[#60a5fa]/25"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Blob colorido + figura central */}
      <div className="absolute inset-[20%] flex items-end justify-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 60%, rgba(241,196,15,0.30), rgba(236,72,153,0.18) 70%, transparent)",
            borderRadius: "46% 54% 50% 50% / 55% 55% 45% 45%",
          }}
        />
        <Image
          src="/img/guardioes/lyra.png"
          alt="Guardiã Lyra"
          width={420}
          height={520}
          priority
          style={{ width: "auto" }}
          className="relative z-10 h-[82%] object-contain drop-shadow-[0_18px_30px_rgba(2,6,23,0.18)]"
        />
      </div>

      {/* Ícones 3D flutuantes (placeholders 'clay') */}
      <Clay color="#ec4899" size={54} className="left-[4%] top-[26%]" delay={0} reduce={reduce} />
      <Clay color="#3b82f6" size={46} className="right-[6%] top-[16%]" delay={0.6} reduce={reduce} round />
      <Clay color="#10b981" size={50} className="right-[2%] top-[52%]" delay={1.1} reduce={reduce} />
      <Clay color="#8b5cf6" size={40} className="left-[10%] bottom-[16%]" delay={0.3} reduce={reduce} round />
      <Clay color="#06b6d4" size={44} className="right-[16%] bottom-[8%]" delay={0.9} reduce={reduce} />

      {/* Etiquetas orbitando */}
      <Chip label="Desafios" color="#3b82f6" className="left-[-4%] top-[40%]" delay={0.2} reduce={reduce} />
      <Chip label="7 Artes" color="#ec4899" className="right-[-6%] top-[34%]" delay={0.8} reduce={reduce} />
      <Chip label="Coleção" color="#e0a417" className="left-[14%] top-[6%]" delay={1.2} reduce={reduce} />
      <Chip label="Programação" color="#06b6d4" className="bottom-[2%] left-[34%]" delay={0.5} reduce={reduce} />
    </div>
  );
}
