import { Reveal } from "./reveal";

const STATS = [
  { value: "7", label: "Artes Liberais", color: "#f1c40f" },
  { value: "2", label: "Jogos disponíveis", color: "#ec4899" },
  { value: "+370", label: "Questões e palavras", color: "#60a5fa" },
  { value: "7", label: "Guardiões mentores", color: "#34d399" },
];

export function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-[#0b1222] px-6 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p
              className="font-display text-4xl font-black sm:text-5xl"
              style={{ color: s.color }}
            >
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
