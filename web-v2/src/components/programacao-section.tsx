import Link from "next/link";
import { Reveal } from "./reveal";

const PILARES = [
  {
    mono: "{ }",
    color: "#06b6d4",
    title: "Pensamento Lógico",
    desc: "Algoritmos, padrões e resolução de problemas — a Lógica do Trivium em ação no mundo digital.",
  },
  {
    mono: "</>",
    color: "#8b5cf6",
    title: "Criar com Propósito",
    desc: "Jogos, histórias e aplicativos que comunicam o bem e a beleza — a Retórica que constrói.",
  },
  {
    mono: "Aa",
    color: "#ec4899",
    title: "A Nova Linguagem",
    desc: "Ler e escrever no idioma que move o mundo de hoje, com a mesma disciplina das letras clássicas.",
  },
  {
    mono: "✦",
    color: "#e0a417",
    title: "À Luz da Cosmovisão",
    desc: "Tecnologia a serviço da Verdade, da Bondade e da Beleza — criar como quem reflete o Criador.",
  },
];

export function ProgramacaoSection() {
  return (
    <section
      id="programacao"
      className="relative overflow-hidden bg-gradient-to-br from-[#f0fbff] via-white to-[#f5f0ff] px-6 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(40% 30% at 85% 10%, rgba(6,182,212,0.14), transparent 60%)," +
            "radial-gradient(40% 30% at 12% 90%, rgba(139,92,246,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-black uppercase tracking-[3px] text-cyan-600">
            Em breve · Nova Linguagem
          </span>
          <h2 className="font-display mt-4 text-4xl text-slate-900 sm:text-5xl">
            Programação: a linguagem que ordena e cria
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Aprender a programar é aprender uma <strong className="text-slate-900">nova língua</strong>{" "}
            — que une a <span className="font-bold text-[#3b82f6]">lógica</span> e a{" "}
            <span className="font-bold text-[#8b5cf6]">criação</span>. Uma aliada natural das 7 Artes
            Liberais, à luz da Educação Cristã Clássica.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition hover:-translate-y-1.5"
                style={{ borderColor: `${p.color}40` }}
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-45"
                  style={{ background: p.color }}
                />
                <span
                  className="relative z-10 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-2 font-mono text-lg font-black text-white shadow-sm"
                  style={{ backgroundColor: p.color }}
                >
                  {p.mono}
                </span>
                <h3 className="font-display relative z-10 mt-4 text-xl text-slate-900">
                  {p.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center" delay={0.15}>
          <Link
            href="/signup"
            className="inline-flex rounded-full bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(6,182,212,0.35)] transition hover:-translate-y-1"
          >
            Quero acompanhar o lançamento →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
