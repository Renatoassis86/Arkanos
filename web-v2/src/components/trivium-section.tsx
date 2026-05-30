import { Reveal } from "./reveal";

type Arte = {
  name: string;
  guardian: string;
  color: string;
  emoji: string;
  desc: string;
};

const TRIVIUM: Arte[] = [
  {
    name: "Gramática",
    guardian: "Lyra",
    color: "#ec4899",
    emoji: "📖",
    desc: "Memória e vocabulário — os fatos fundamentais de cada saber, cantados e repetidos com alegria.",
  },
  {
    name: "Lógica",
    guardian: "Aion",
    color: "#60a5fa",
    emoji: "⚖️",
    desc: "Pensar com clareza, argumentar e reconhecer a Verdade em cada coisa.",
  },
  {
    name: "Retórica",
    guardian: "Kael",
    color: "#f87171",
    emoji: "🎺",
    desc: "Comunicar o bem e a verdade com eloquência e Beleza.",
  },
];

const QUADRIVIUM: Arte[] = [
  {
    name: "Aritmética",
    guardian: "Numa",
    color: "#34d399",
    emoji: "🔢",
    desc: "O número e a ordem — a linguagem com que o Criador mediu o mundo.",
  },
  {
    name: "Geometria",
    guardian: "Geon",
    color: "#a78bfa",
    emoji: "📐",
    desc: "Formas e proporções — a harmonia visível da criação.",
  },
  {
    name: "Música",
    guardian: "Melos",
    color: "#fbbf24",
    emoji: "🎵",
    desc: "Ritmo e harmonia — a beleza que se ouve, eco das esferas celestes.",
  },
  {
    name: "Astronomia",
    guardian: "Astra",
    color: "#818cf8",
    emoji: "🔭",
    desc: "“Os céus proclamam a glória de Deus” (Sl 19:1) — o cosmos e suas ordens.",
  },
];

function ArteCard({ a, n }: { a: Arte; n: number }) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border bg-white/5 p-6 transition hover:-translate-y-1"
      style={{ borderColor: `${a.color}55` }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
        style={{ background: a.color }}
      />
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
          style={{ backgroundColor: `${a.color}22` }}
        >
          {a.emoji}
        </span>
        <div>
          <h3 className="font-display text-2xl leading-none text-white">{a.name}</h3>
          <p
            className="mt-1 text-xs font-black uppercase tracking-widest"
            style={{ color: a.color }}
          >
            Arte {n} · {a.guardian}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">{a.desc}</p>
    </div>
  );
}

export function TriviumSection() {
  return (
    <section id="programas" className="relative overflow-hidden bg-[#0b1222] px-6 py-24">
      {/* brilhos coloridos de fundo (mais cor, sem perder o navy) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40% 30% at 12% 8%, rgba(236,72,153,0.12), transparent 60%)," +
            "radial-gradient(40% 30% at 88% 30%, rgba(96,165,250,0.12), transparent 60%)," +
            "radial-gradient(45% 35% at 50% 100%, rgba(52,211,153,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
            A Jornada do Saber
          </p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            As 7 Artes Liberais
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            O <strong className="text-white">Trivium</strong> (a Palavra) e o{" "}
            <strong className="text-white">Quadrivium</strong> (o Número e o Cosmos) —
            sete artes que conduzem à <span className="text-[#f1c40f]">Verdade</span>, à{" "}
            <span className="text-[#f1c40f]">Bondade</span> e à{" "}
            <span className="text-[#f1c40f]">Beleza</span>, e à contemplação do Criador.
          </p>
        </Reveal>

        {/* Trivium */}
        <Reveal className="mt-14">
          <p className="mb-4 text-center text-sm font-black uppercase tracking-[3px] text-pink-300/80">
            Trivium · a Palavra
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TRIVIUM.map((a, i) => (
              <ArteCard key={a.name} a={a} n={i + 1} />
            ))}
          </div>
        </Reveal>

        {/* Quadrivium */}
        <Reveal className="mt-12" delay={0.1}>
          <p className="mb-4 text-center text-sm font-black uppercase tracking-[3px] text-emerald-300/80">
            Quadrivium · o Número e o Cosmos
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {QUADRIVIUM.map((a, i) => (
              <ArteCard key={a.name} a={a} n={i + 4} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center" delay={0.15}>
          <p className="text-sm text-slate-400">
            A trilha é recomendada pela idade — da memória ao pensamento, à expressão e à
            ordem do cosmos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
