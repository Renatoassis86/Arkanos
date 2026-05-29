import { Reveal } from "./reveal";

const PHASES = [
  {
    n: "I",
    name: "Gramática",
    age: "até ~9 anos",
    color: "#f1c40f",
    guardian: "Lyra",
    desc: "Memorização, vocabulário e regras — os fatos fundamentais de cada saber, cantados e repetidos com alegria.",
  },
  {
    n: "II",
    name: "Lógica",
    age: "~10 a 12 anos",
    color: "#60a5fa",
    guardian: "Aion",
    desc: "Dedução, causas e relações — aprender a pensar com clareza, argumentar e reconhecer a verdade.",
  },
  {
    n: "III",
    name: "Retórica",
    age: "adolescência",
    color: "#a78bfa",
    guardian: "Kael",
    desc: "Expressão, criatividade e persuasão — comunicar o bem e a verdade com eloquência e beleza.",
  },
];

export function TriviumSection() {
  return (
    <section id="programas" className="bg-[#0b1222] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
            A Jornada
          </p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            As três fases do Trivium
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            A trilha é recomendada pela idade do aluno e avança da memória ao
            pensamento e à expressão.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">
                <span
                  className="font-display absolute -top-4 right-2 select-none text-8xl font-black opacity-10"
                  style={{ color: p.color }}
                >
                  {p.n}
                </span>
                <h3 className="font-display text-3xl text-white">{p.name}</h3>
                <p
                  className="mt-1 text-xs font-black uppercase tracking-widest"
                  style={{ color: p.color }}
                >
                  {p.age} · {p.guardian}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
