import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask, type Sym } from "./photo-frames";

const GAMES_SYMS: Sym[] = [
  { color: "#3b82f6", size: 48, className: "left-[2%] top-[18%]" },
  { color: "#f1c40f", size: 38, className: "right-[4%] top-[12%]", round: true },
  { color: "#ec4899", size: 42, className: "right-[0%] bottom-[20%]" },
];

const GAMES = [
  {
    name: "Radix · Soletração",
    arte: "Gramática",
    guardian: "Lyra",
    tag: "Português",
    accent: "#10b981",
    href: "/radix",
    desc: "Soletração do vocabulário em português por nível de dificuldade, com captura fonética precisa e ranking dos sábios.",
  },
  {
    name: "Spelling Bee",
    arte: "Gramática",
    guardian: "Lyra",
    tag: "Inglês",
    accent: "#ec4899",
    href: "/spelling-bee",
    desc: "Soletração em inglês com significado, fonética e frases de exemplo, com baralho completo por série escolar.",
  },
  {
    name: "Desafio dos Sábios",
    arte: "Lógica",
    guardian: "Aion",
    tag: "Quiz",
    accent: "#3b82f6",
    href: "/desafio",
    desc: "Quiz pedagógico com a Crônica do Guardião: curiosidade, fato histórico e conexão interdisciplinar. Pontuação por TRI.",
  },
  {
    name: "Ábaco Sagrado",
    arte: "Aritmética",
    guardian: "Numa",
    tag: "Quadrivium",
    accent: "#f59e0b",
    desc: "O número e a ordem com que o Criador mediu o mundo: cálculo mental e raciocínio do Quadrivium.",
    soon: true,
  },
  {
    name: "Ark",
    arte: "Retórica",
    guardian: "Kael",
    tag: "Histórias",
    accent: "#8b5cf6",
    desc: "Criação de histórias ilustradas com propósito, cultivando a expressão, a oratória e a beleza.",
    soon: true,
  },
];

export function GamesSection() {
  return (
    <section id="jogos" className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#1e3a8a] px-6 py-24">
      {/* Brushes-marca d'água (cores vivas sobre o escuro) */}
      <Brush color="#a855f7" className="left-[-8%] top-[6%] h-80 w-80" opacity={0.35} />
      <Brush color="#ec4899" className="right-[-6%] top-[30%] h-72 w-72" opacity={0.28} />
      <Brush color="#3b82f6" className="bottom-[-6%] left-[40%] h-72 w-72" opacity={0.30} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="flex justify-center lg:order-1">
            <PhotoMask
              src="/img/fotos/crianca-pensa-menino.png"
              alt="Criança concentrada em um desafio da Arkanos"
              color="#3b82f6"
              symbols={GAMES_SYMS}
              className="max-w-[440px]"
            />
          </Reveal>
          <Reveal className="lg:order-2">
            <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#fcd34d]">
              Os Jogos
            </p>
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Aprender jogando, com propósito
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Cada jogo reforça uma das <strong className="text-[#fcd34d]">7 Artes Liberais</strong>{" "}
              (Trivium e Quadrivium) e é guiado por um Guardião, com desafios pedagógicos e
              pontuação de mérito por nível de acertos.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-white p-5 shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition hover:-translate-y-1.5"
                style={{ borderColor: `${g.accent}40` }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
                  style={{ background: g.accent }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                    style={{ color: g.accent, backgroundColor: `${g.accent}1f` }}
                  >
                    {g.tag}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {g.arte}
                  </span>
                </div>

                <h3 className="font-display relative z-10 mt-4 text-xl font-black text-slate-900 leading-tight">
                  {g.name}
                </h3>
                <p className="relative z-10 mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Guardião(ã): {g.guardian}
                </p>
                <p className="relative z-10 mt-2.5 flex-1 text-xs leading-relaxed text-slate-600">
                  {g.desc}
                </p>

                {g.soon ? (
                  <span className="relative z-10 mt-4 inline-flex w-fit rounded-full border border-slate-200 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Em breve
                  </span>
                ) : (
                  <Link
                    href={g.href ?? "/signup"}
                    className="relative z-10 mt-4 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5"
                    style={{ backgroundColor: g.accent }}
                  >
                    Jogar Agora →
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
