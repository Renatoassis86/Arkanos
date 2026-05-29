import { Reveal } from "./reveal";

const STATS = [
  { value: "3", label: "Fases do Trivium" },
  { value: "4", label: "Jogos formativos" },
  { value: "+250", label: "Palavras e desafios" },
  { value: "3", label: "Guardiões mentores" },
];

export function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-[#0b1222] px-6 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-black text-[#f1c40f] sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
