import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask, type Sym } from "./photo-frames";

type Audience = {
  tag: string;
  title: string;
  color: string;
  panelBg: string;
  photo: string;
  alt: string;
  symbols: Sym[];
  intro: string;
  bullets: string[];
  cta: { label: string; href: string };
};

const AUDIENCES: Audience[] = [
  {
    tag: "Para Escolas",
    title: "Escolas Clássicas e Cristãs",
    color: "#3b82f6",
    panelBg: "#eff6ff",
    photo: "/img/fotos/familia-comemora-bg.png",
    alt: "Estudantes celebrando suas conquistas na Arkanos",
    symbols: [
      { color: "#3b82f6", size: 50, className: "left-[2%] top-[16%]" },
      { color: "#f1c40f", size: 40, className: "right-[4%] top-[10%]", round: true },
      { color: "#8b5cf6", size: 44, className: "right-[2%] bottom-[18%]" },
    ],
    intro:
      "Estruture o currículo nas 7 Artes Liberais com avaliações e acompanhamento de verdade.",
    bullets: [
      "Banco de questões por série, trimestre e avaliação",
      "Pontuação por TRI (Teoria de Resposta ao Item) — mede a habilidade real",
      "Ranking e progresso por aluno, turma e disciplina",
      "Gamificação que serve à formação da virtude, não ao vício",
    ],
    cta: { label: "Levar para minha escola", href: "/signup" },
  },
  {
    tag: "Para Famílias",
    title: "Famílias Educadoras (homeschool)",
    color: "#10b981",
    panelBg: "#ecfdf5",
    photo: "/img/fotos/familia-sofa-bg.png",
    alt: "Família educadora estudando junta em casa",
    symbols: [
      { color: "#10b981", size: 50, className: "right-[2%] top-[16%]" },
      { color: "#ec4899", size: 40, className: "left-[4%] top-[10%]", round: true },
      { color: "#f1c40f", size: 44, className: "left-[2%] bottom-[18%]" },
    ],
    intro:
      "Eduque em casa com trilhas por idade e jogos que ensinam brincando — do Trivium ao Quadrivium.",
    bullets: [
      "Trilha recomendada pela idade do seu filho",
      "Jogos do saber: Desafio dos Sábios, Spelling Bee e mais",
      "Coleção, níveis e conquistas que celebram cada avanço",
      "Verdade, Bondade e Beleza à luz da Educação Cristã Clássica",
    ],
    cta: { label: "Começar em casa", href: "/signup" },
  },
];

export function AudienceSection() {
  return (
    <section id="publicos" className="relative overflow-hidden bg-white px-6 py-24">
      <Brush color="#3b82f6" className="left-[-8%] top-[6%] h-80 w-80" opacity={0.08} />
      <Brush color="#10b981" className="right-[-8%] bottom-[6%] h-80 w-80" opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            Para quem é
          </p>
          <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
            Feito para escolas e para famílias educadoras
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A mesma jornada formativa, do jeito que faz sentido para a sua realidade.
          </p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {AUDIENCES.map((a, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={a.tag} delay={0.05}>
                <div
                  className="grid items-center gap-8 rounded-[2.5rem] border border-white p-6 shadow-[0_18px_50px_rgba(2,6,23,0.07)] sm:p-10 lg:grid-cols-2"
                  style={{ backgroundColor: a.panelBg }}
                >
                  {/* texto */}
                  <div className={reverse ? "lg:order-2" : ""}>
                    <p
                      className="font-emblem text-xs font-black uppercase tracking-[3px]"
                      style={{ color: a.color }}
                    >
                      {a.tag}
                    </p>
                    <h3 className="font-display mt-2 text-3xl text-slate-900 sm:text-4xl">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{a.intro}</p>
                    <ul className="mt-5 space-y-3">
                      {a.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-black text-white"
                            style={{ backgroundColor: a.color }}
                          >
                            ✓
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={a.cta.href}
                      className="mt-7 inline-flex rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5"
                      style={{ backgroundColor: a.color }}
                    >
                      {a.cta.label}
                    </Link>
                  </div>

                  {/* foto recortada em máscara desconstruída */}
                  <div className={reverse ? "lg:order-1" : ""}>
                    <PhotoMask src={a.photo} alt={a.alt} color={a.color} symbols={a.symbols} circleMask />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
