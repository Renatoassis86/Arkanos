import { Reveal } from "./reveal";

const STATS = [
  { value: "7", label: "Artes Liberais", color: "#e0a417" },
  { value: "2", label: "Jogos disponíveis", color: "#db2777" },
  { value: "+370", label: "Questões e palavras", color: "#2563eb" },
  { value: "7", label: "Guardiões mentores", color: "#059669" },
];

export function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] px-6 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p
              className="font-display text-4xl font-black sm:text-5xl"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
