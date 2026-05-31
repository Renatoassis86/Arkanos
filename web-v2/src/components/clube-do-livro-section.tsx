import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask, type Sym } from "./photo-frames";

const RECURSOS = [
  { strong: "Vídeos", text: "narração e contação das histórias de cada livro." },
  { strong: "Ebooks + Resumos", text: "leitura com contexto e fichamento à luz cristã clássica." },
  { strong: "Fórum", text: "crianças e pais conversam sobre os livros, com perguntas-guia." },
  { strong: "Flashcards", text: "memorização com repetição espaçada — integrada à coleção." },
];

const SYMS: Sym[] = [
  { color: "#6366f1", size: 50, className: "left-[2%] top-[16%]" },
  { color: "#ec4899", size: 40, className: "right-[4%] top-[10%]", round: true },
  { color: "#f1c40f", size: 44, className: "right-[2%] bottom-[16%]" },
];

export function ClubeDoLivroSection() {
  return (
    <section id="clube-do-livro" className="relative overflow-hidden bg-[#eef2ff] px-6 py-24">
      <Brush color="#6366f1" className="left-[-8%] top-[8%] h-80 w-80" opacity={0.12} />
      <Brush color="#ec4899" className="right-[-8%] bottom-[6%] h-72 w-72" opacity={0.08} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="lg:order-2">
          <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#4f46e5]">
            Leitura · Gramática · Lyra
          </p>
          <h2 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
            Clube do Livro
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Um espaço de formação leitora à luz da Educação Cristã Clássica: bons livros que cultivam a
            Verdade, a Bondade e a Beleza — para a família ler e conversar junto.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {RECURSOS.map((r) => (
              <li
                key={r.strong}
                className="rounded-2xl border border-white bg-white/70 p-4 text-sm text-slate-600 shadow-sm"
              >
                <strong className="text-slate-900">{r.strong}:</strong> {r.text}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="mt-7 inline-flex rounded-full bg-[#4f46e5] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5"
          >
            Entrar no Clube
          </Link>
        </Reveal>

        <Reveal delay={0.12} className="lg:order-1">
          <PhotoMask
            src="/img/fotos/clube-familia-livro.png"
            alt="Família lendo um livro juntos no Clube do Livro"
            color="#6366f1"
            symbols={SYMS}
          />
        </Reveal>
      </div>
    </section>
  );
}
