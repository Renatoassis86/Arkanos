import { Reveal } from "./reveal";
import { PhotoMask, type Sym } from "./photo-frames";

const STATS = [
  { value: "7", label: "Artes Liberais", color: "#e0a417" },
  { value: "2", label: "Jogos disponíveis", color: "#db2777" },
  { value: "+370", label: "Questões e palavras", color: "#2563eb" },
  { value: "7", label: "Guardiões mentores", color: "#059669" },
];

const SYMS: Sym[] = [
  { color: "#ec4899", size: 46, className: "left-[2%] top-[16%]" },
  { color: "#f1c40f", size: 38, className: "right-[6%] top-[10%]", round: true },
  { color: "#10b981", size: 40, className: "right-[2%] bottom-[18%]" },
];

export function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] px-6 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* foto: criança comemorando */}
        <Reveal className="flex justify-center">
          <PhotoMask
            src="/img/fotos/crianca-comemora-menina.png"
            alt="Criança comemorando suas conquistas na Arkanos"
            color="#ec4899"
            symbols={SYMS}
            className="max-w-[360px]"
          />
        </Reveal>

        {/* números */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
      </div>
    </section>
  );
}
