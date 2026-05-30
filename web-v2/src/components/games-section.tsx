import Link from "next/link";
import { Reveal } from "./reveal";

const GAMES = [
  {
    name: "Desafio dos Sábios",
    arte: "Lógica",
    guardian: "Aion",
    tag: "Quiz",
    accent: "#60a5fa",
    desc: "Quiz pedagógico com a Crônica do Guardião: curiosidade, fato histórico e conexão interdisciplinar. Pontuação por TRI.",
  },
  {
    name: "Spelling Bee",
    arte: "Gramática",
    guardian: "Lyra",
    tag: "Inglês",
    accent: "#ec4899",
    desc: "Soletração em inglês com significado, fonética (IPA) e frases de exemplo, organizada por série.",
  },
  {
    name: "Ábaco Sagrado",
    arte: "Aritmética",
    guardian: "Numa",
    tag: "Quadrivium",
    accent: "#34d399",
    desc: "O número e a ordem com que o Criador mediu o mundo — cálculo e raciocínio do Quadrivium.",
    soon: true,
  },
  {
    name: "Ark",
    arte: "Retórica",
    guardian: "Kael",
    tag: "Histórias",
    accent: "#f87171",
    desc: "Criação de histórias ilustradas com propósito, cultivando a expressão e a beleza.",
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
            Cada jogo reforça uma das <strong className="text-white">7 Artes Liberais</strong>{" "}
            (Trivium e Quadrivium) e é guiado por um Guardião.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/5 p-6 transition hover:-translate-y-1.5"
                style={{ borderColor: `${g.accent}55` }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-3xl transition group-hover:opacity-50"
                  style={{ background: g.accent }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider"
                    style={{ color: g.accent, backgroundColor: `${g.accent}1f` }}
                  >
                    {g.tag}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {g.arte}
                  </span>
                </div>

                <h3 className="font-display relative z-10 mt-5 text-2xl text-white">{g.name}</h3>
                <p className="relative z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                  Guardião(ã): {g.guardian}
                </p>
                <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {g.desc}
                </p>

                {g.soon ? (
                  <span className="relative z-10 mt-5 inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-400">
                    Em breve
                  </span>
                ) : (
                  <Link
                    href="/signup"
                    className="relative z-10 mt-5 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0b1222] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: g.accent }}
                  >
                    Entrar para jogar →
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
