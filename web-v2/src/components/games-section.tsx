import Link from "next/link";
import { Reveal } from "./reveal";

const GAMES = [
  {
    name: "Spelling Bee",
    phase: "Gramática",
    guardian: "Lyra",
    tag: "Inglês",
    accent: "#f1c40f",
    desc: "Soletração em inglês com significado, fonética (IPA) e frases de exemplo, organizada por série.",
    href: "/jogos",
  },
  {
    name: "Radix",
    phase: "Gramática",
    guardian: "Aion",
    tag: "Português",
    accent: "#60a5fa",
    desc: "Soletração e vocabulário em português, com palavras ligadas às virtudes e ao saber clássico.",
    href: "/jogos",
  },
  {
    name: "Desafio dos Sábios",
    phase: "Lógica",
    guardian: "Aion",
    tag: "Quiz",
    accent: "#a78bfa",
    desc: "Quiz pedagógico com mapas e diagramas e a Crônica do Guardião: fato histórico, curiosidade e conexão interdisciplinar.",
    href: "/desafio",
  },
  {
    name: "Ark",
    phase: "Retórica",
    guardian: "Kael",
    tag: "Em breve",
    accent: "#34d399",
    desc: "Criação de histórias ilustradas com propósito, cultivando a expressão e a beleza.",
    href: "#",
    soon: true,
  },
];

export function GamesSection() {
  return (
    <section id="jogos" className="bg-[#0a0f1c] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
            Os Jogos
          </p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            Aprender jogando, com propósito
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Cada minigame reforça uma fase do Trivium e é guiado por um Guardião.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider"
                    style={{ color: g.accent, backgroundColor: `${g.accent}1a` }}
                  >
                    {g.tag}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {g.phase}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-2xl text-white">{g.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                  Guardião(ã): {g.guardian}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {g.desc}
                </p>

                {g.soon ? (
                  <span className="mt-5 inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-400">
                    Em breve
                  </span>
                ) : (
                  <Link
                    href={g.href}
                    className="mt-5 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: g.accent }}
                  >
                    Jogar →
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
