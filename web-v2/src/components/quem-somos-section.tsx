import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoCard } from "./photo-frames";

const PILARES = [
  { strong: "Verdade", text: "o que é real e digno de ser conhecido.", color: "#3b82f6" },
  { strong: "Bondade", text: "a formação do caráter e da virtude.", color: "#10b981" },
  { strong: "Beleza", text: "a ordem que encanta e aponta ao Criador.", color: "#ec4899" },
];

export function QuemSomosSection() {
  return (
    <section id="institucional" className="relative overflow-hidden bg-[#fffdf3] px-6 py-24">
      <Brush color="#f1c40f" className="left-[-6%] top-[10%] h-80 w-80" opacity={0.12} />
      <Brush color="#e0a417" className="right-[-8%] bottom-[8%] h-72 w-72" opacity={0.08} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            Quem somos
          </p>
          <h2 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
            O Reino do Saber e da Virtude
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A Arkanos é uma <strong className="text-slate-900">plataforma gamificada</strong> e uma{" "}
            <strong className="text-slate-900">consultoria</strong> de{" "}
            <strong className="text-slate-900">Educação Cristã Clássica</strong>. Conduzimos crianças
            pelas <strong className="text-slate-900">7 Artes Liberais</strong> — do Trivium (a Palavra)
            ao Quadrivium (o Número e o Cosmos) — para que aprendam a pensar, falar e contemplar bem.
          </p>
          <ul className="mt-7 space-y-3">
            {PILARES.map((p) => (
              <li key={p.strong} className="flex items-start gap-3 text-base text-slate-700">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span>
                  <strong className="text-slate-900">{p.strong}</strong> — {p.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-base italic text-[#b8860b]">
            Tudo aponta para a contemplação do Criador. <span className="not-italic">Soli Deo gloria.</span>
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <PhotoCard
            src="/img/fotos/trivium-gramatica-prof.png"
            alt="Educadora da Arkanos com materiais das artes da linguagem"
            color="#e0a417"
          />
        </Reveal>
      </div>
    </section>
  );
}
