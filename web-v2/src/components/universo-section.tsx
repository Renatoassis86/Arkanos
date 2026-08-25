"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const GUARDIOES = [
  { slug: "lyra", nome: "Lyra", arte: "Gramática", color: "#ec4899", pos: "left-1/2 top-[2%] -translate-x-1/2" },
  { slug: "aion", nome: "Aion", arte: "Lógica", color: "#3b82f6", pos: "right-[6%] bottom-[14%]" },
  { slug: "kael", nome: "Kael", arte: "Retórica", color: "#ef4444", pos: "left-[6%] bottom-[14%]" },
];

function Orbit() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* anéis celestes */}
      <div className="absolute inset-[8%] rounded-full border border-[#f1c40f]/30" />
      <div className="absolute inset-[22%] rounded-full border border-white/15" />

      {/* emblema/orbe luminoso central — o coração do Reino */}
      <div className="absolute inset-[30%] flex items-center justify-center">
        <motion.div
          className="relative h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #fff7d6, #f1c40f 45%, #b8860b 78%, #7a5a12 100%)",
            boxShadow: "0 0 60px 10px rgba(241,196,15,0.45), inset 0 -10px 24px rgba(0,0,0,0.35)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* brilho/realce do orbe (placeholder até a arte do Grande Guardião) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 48% 36%, rgba(255,255,255,0.55), rgba(255,255,255,0) 52%)",
            }}
          />
        </motion.div>
      </div>

      {/* guardiões orbitando (cada um flutua suave) */}
      {GUARDIOES.map((g, i) => (
        <motion.div
          key={g.slug}
          className={`absolute ${g.pos} w-[26%]`}
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        >
          <div
            className="absolute inset-x-[10%] bottom-[6%] top-[18%] rounded-full blur-md"
            style={{ background: `${g.color}55` }}
          />
          <Image
            src={`/img/guardioes/${g.slug}.png`}
            alt={`${g.nome}, guardião(ã) de ${g.arte}`}
            width={200}
            height={260}
            style={{ width: "auto" }}
            className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
          />
          <span
            className="font-emblem absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow"
            style={{ color: g.color }}
          >
            {g.nome}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function UniversoSection() {
  return (
    <section id="universo" className="relative overflow-hidden bg-[#eef4ff] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[3rem] px-6 py-16 shadow-[0_30px_80px_rgba(2,6,23,0.25)] sm:px-12"
          style={{ background: "radial-gradient(120% 100% at 50% 0%, #1e2a52, #0b1222 70%)" }}
        >
          {/* estrelas/faíscas de fundo */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(2px 2px at 20% 30%, #fff7, transparent)," +
                "radial-gradient(2px 2px at 70% 20%, #fff5, transparent)," +
                "radial-gradient(1.5px 1.5px at 40% 70%, #ffd86a88, transparent)," +
                "radial-gradient(2px 2px at 85% 60%, #fff6, transparent)," +
                "radial-gradient(1.5px 1.5px at 60% 85%, #fff4, transparent)",
            }}
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
                O Universo Arkanos
              </p>
              <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                Um reino guiado por sete guardiões
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Cada uma das 7 Artes Liberais tem um <strong className="text-white">guardião-mentor</strong>{" "}
                que acompanha a criança na jornada do saber. Eles narram cada conquista, contam a Crônica
                do Guardião e celebram a virtude formada, do Trivium ao Quadrivium.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  ["Lyra", "Gramática"],
                  ["Aion", "Lógica"],
                  ["Kael", "Retórica"],
                  ["Numa", "Aritmética"],
                  ["Geon", "Geometria"],
                  ["Melos", "Música"],
                  ["Astra", "Astronomia"],
                ].map(([n, a]) => (
                  <span
                    key={n}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200"
                  >
                    <span className="text-[#f1c40f]">{n}</span> · {a}
                  </span>
                ))}
              </div>
              <Link
                href="/colecao"
                prefetch={false}
                className="mt-8 inline-flex rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
              >
                Conhecer os guardiões
              </Link>
            </Reveal>

            <Reveal delay={0.15} className="flex justify-center">
              <Orbit />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
