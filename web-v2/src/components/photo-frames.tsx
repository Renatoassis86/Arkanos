"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Brush } from "./floating-art";

/* ============================================================
 * Símbolos flutuantes (clay) + faíscas — desenhados, NUNCA emoji.
 * Orbitam/flutuam ao redor das fotos para "contextualizar" a Arte.
 * ============================================================ */
export type Sym = { color: string; size: number; className: string; round?: boolean };

function ClaySymbol({ s, delay, reduce }: { s: Sym; delay: number; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`absolute ${s.className}`}
      style={{
        width: s.size,
        height: s.size,
        borderRadius: s.round ? "9999px" : "32%",
        background: `radial-gradient(circle at 32% 28%, #ffffffcc, ${s.color} 55%, ${s.color} 100%)`,
        boxShadow: `0 12px 24px -6px ${s.color}88, inset 0 -6px 12px -4px rgba(0,0,0,0.22)`,
      }}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* Estrelinha dourada (faísca) em SVG — reforço "celeste". */
function Spark({ className, delay, reduce }: { className: string; delay: number; reduce: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`absolute ${className}`}
      animate={reduce ? undefined : { scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path
        d="M12 2c.6 4.5 3 6.9 7.5 7.5C15 10.1 12.6 12.5 12 17c-.6-4.5-3-6.9-7.5-7.5C9 8.9 11.4 6.5 12 2z"
        fill="#f1c40f"
      />
    </motion.svg>
  );
}

const DEFAULT_SYMS: Sym[] = [
  { color: "#ec4899", size: 50, className: "left-[2%] top-[20%]" },
  { color: "#3b82f6", size: 42, className: "right-[4%] top-[12%]", round: true },
  { color: "#10b981", size: 46, className: "right-[0%] top-[56%]" },
  { color: "#8b5cf6", size: 36, className: "left-[8%] bottom-[14%]", round: true },
];

/* ============================================================
 * PhotoMask — para RECORTES (PNG transparente).
 * Blob de cor desconstruído ATRÁS da pessoa + brush vazando + anel + símbolos.
 * A pessoa não é cortada (fica por cima, object-contain).
 * ============================================================ */
export function PhotoMask({
  src,
  alt = "",
  color,
  symbols = DEFAULT_SYMS,
  priority = false,
  className = "",
  framePad = 16,
}: {
  src: string;
  alt?: string;
  color: string;
  symbols?: Sym[];
  priority?: boolean;
  className?: string;
  /** % de respiro entre a borda e a figura — menor = figura MAIOR. */
  framePad?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[520px] ${className}`}>
      {/* brush marca-d'água vazando além da foto */}
      <Brush color={color} className="inset-[6%]" opacity={0.16} />

      {/* anéis concêntricos girando */}
      <motion.div
        aria-hidden
        className="absolute inset-[7%] rounded-full border border-[#f1c40f]/25"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-[19%] rounded-full"
        style={{ border: `1px solid ${color}3a` }}
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
      />

      {/* blob de cor desconstruído + foto recortada por cima */}
      <div className="absolute flex items-end justify-center" style={{ inset: `${framePad}%` }}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(62% 62% at 50% 58%, ${color}45, ${color}22 70%, transparent)`,
            borderRadius: "46% 54% 50% 50% / 55% 55% 45% 45%",
          }}
        />
        <Image
          src={src}
          alt={alt}
          width={560}
          height={620}
          priority={priority}
          style={{ width: "auto", height: "auto" }}
          className="relative z-10 max-h-[112%] max-w-[112%] object-contain drop-shadow-[0_18px_30px_rgba(2,6,23,0.20)]"
        />
      </div>

      {/* símbolos clay flutuando */}
      {symbols.map((s, i) => (
        <ClaySymbol key={i} s={s} delay={i * 0.45} reduce={reduce} />
      ))}
      <Spark className="left-[18%] top-[6%] h-5 w-5" delay={0.2} reduce={reduce} />
      <Spark className="right-[12%] bottom-[10%] h-4 w-4" delay={1.1} reduce={reduce} />
    </div>
  );
}

/* ============================================================
 * PhotoCard — para fotos COM fundo (cenário próprio).
 * Card de cantos assimétricos (moldura desconstruída) + brush vazando + símbolos no canto.
 * ============================================================ */
export function PhotoCard({
  src,
  alt = "",
  color,
  className = "",
  symbols,
}: {
  src: string;
  alt?: string;
  color: string;
  className?: string;
  symbols?: Sym[];
}) {
  const reduce = useReducedMotion() ?? false;
  const syms = symbols ?? DEFAULT_SYMS.slice(0, 2);
  return (
    <div className={`relative mx-auto w-full max-w-[560px] ${className}`}>
      {/* brush vazando atrás do card */}
      <Brush color={color} className="-inset-[8%]" opacity={0.16} />
      {/* anel decorativo deslocado */}
      <div
        aria-hidden
        className="absolute -right-[4%] -top-[6%] h-24 w-24 rounded-full"
        style={{ border: `2px solid ${color}44` }}
      />

      {/* moldura desconstruída com a foto */}
      <div
        className="relative overflow-hidden border-4 border-white shadow-[0_24px_60px_rgba(2,6,23,0.16)]"
        style={{ borderRadius: "38% 62% 58% 42% / 45% 40% 60% 55%" }}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={650}
          style={{ width: "100%", height: "auto" }}
          className="block"
        />
      </div>

      {/* símbolos clay no canto */}
      {syms.map((s, i) => (
        <ClaySymbol key={i} s={s} delay={i * 0.5} reduce={reduce} />
      ))}
      <Spark className="right-[6%] bottom-[2%] h-5 w-5" delay={0.4} reduce={reduce} />
    </div>
  );
}

/* ============================================================
 * CornerCartela — foto "sangrando" do canto superior (como cartela/carta).
 * Posicionar dentro de uma section relative overflow-hidden.
 * ============================================================ */
export function CornerCartela({
  src,
  alt = "",
  color,
  side = "right",
}: {
  src: string;
  alt?: string;
  color: string;
  side?: "right" | "left";
}) {
  const pos = side === "right" ? "right-0" : "left-0";
  const radius =
    side === "right" ? "0 0 0 48px" : "0 0 48px 0";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 ${pos} hidden w-[320px] xl:block`}
    >
      <Brush color={color} className="-inset-6 h-56 w-72" opacity={0.18} />
      <div
        className="relative overflow-hidden border-4 border-white/80 shadow-[0_20px_50px_rgba(2,6,23,0.18)]"
        style={{ borderRadius: radius }}
      >
        <Image src={src} alt={alt} width={640} height={460} className="block w-full" />
      </div>
    </div>
  );
}
