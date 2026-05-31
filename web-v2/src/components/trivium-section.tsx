import { Reveal } from "./reveal";

type Arte = {
  name: string;
  guardian: string;
  color: string;
  desc: string;
};

const TRIVIUM: Arte[] = [
  {
    name: "Gramática",
    guardian: "Lyra",
    color: "#ec4899",
    desc: "Memória e vocabulário — os fatos fundamentais de cada saber, cantados e repetidos com alegria.",
  },
  {
    name: "Lógica",
    guardian: "Aion",
    color: "#3b82f6",
    desc: "Pensar com clareza, argumentar e reconhecer a Verdade em cada coisa.",
  },
  {
    name: "Retórica",
    guardian: "Kael",
    color: "#ef4444",
    desc: "Comunicar o bem e a verdade com eloquência e Beleza.",
  },
];

const QUADRIVIUM: Arte[] = [
  {
    name: "Aritmética",
    guardian: "Numa",
    color: "#10b981",
    desc: "O número e a ordem — a linguagem com que o Criador mediu o mundo.",
  },
  {
    name: "Geometria",
    guardian: "Geon",
    color: "#8b5cf6",
    desc: "Formas e proporções — a harmonia visível da criação.",
  },
  {
    name: "Música",
    guardian: "Melos",
    color: "#f59e0b",
    desc: "Ritmo e harmonia — a beleza que se ouve, eco das esferas celestes.",
  },
  {
    name: "Astronomia",
    guardian: "Astra",
    color: "#6366f1",
    desc: "“Os céus proclamam a glória de Deus” (Sl 19:1) — o cosmos e suas ordens.",
  },
];

function ArteCard({ a, n }: { a: Arte; n: number }) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition hover:-translate-y-1"
      style={{ borderColor: `${a.color}40` }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
        style={{ background: a.color }}
      />
      <div className="flex items-center gap-3">
        <span
          className="font-display flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white shadow-sm"
          style={{ backgroundColor: a.color }}
        >
          {a.name.charAt(0)}
        </span>
        <div>
          <h3 className="font-display text-2xl leading-none text-slate-900">{a.name}</h3>
          <p
            className="mt-1 text-xs font-black uppercase tracking-widest"
            style={{ color: a.color }}
          >
            Arte {n} · {a.guardian}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{a.desc}</p>
    </div>
  );
}

export function TriviumSection() {
  return (
    <section id="programas" className="relative overflow-hidden bg-[#f8fafc] px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(40% 30% at 12% 8%, rgba(236,72,153,0.10), transparent 60%)," +
            "radial-gradient(40% 30% at 88% 30%, rgba(59,130,246,0.10), transparent 60%)," +
            "radial-gradient(45% 35% at 50% 100%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            A Jornada do Saber
          </p>
          <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
            As 7 Artes Liberais
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            O <strong className="text-slate-900">Trivium</strong> (a Palavra) e o{" "}
            <strong className="text-slate-900">Quadrivium</strong> (o Número e o Cosmos) —
            sete artes que conduzem à <span className="font-bold text-[#b8860b]">Verdade</span>, à{" "}
            <span className="font-bold text-[#b8860b]">Bondade</span> e à{" "}
            <span className="font-bold text-[#b8860b]">Beleza</span>, e à contemplação do Criador.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <p className="mb-4 text-center text-sm font-black uppercase tracking-[3px] text-pink-600">
            Trivium · a Palavra
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TRIVIUM.map((a, i) => (
              <ArteCard key={a.name} a={a} n={i + 1} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <p className="mb-4 text-center text-sm font-black uppercase tracking-[3px] text-emerald-600">
            Quadrivium · o Número e o Cosmos
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {QUADRIVIUM.map((a, i) => (
              <ArteCard key={a.name} a={a} n={i + 4} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center" delay={0.15}>
          <p className="text-sm text-slate-500">
            A trilha é recomendada pela idade — da memória ao pensamento, à expressão e à
            ordem do cosmos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
