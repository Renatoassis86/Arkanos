import { Reveal } from "./reveal";

type Audience = {
  tag: string;
  title: string;
  mono: string;
  color: string;
  intro: string;
  bullets: string[];
};

const AUDIENCES: Audience[] = [
  {
    tag: "Para Escolas",
    title: "Escolas Clássicas e Cristãs",
    mono: "E",
    color: "#3b82f6",
    intro:
      "Estruture o currículo nas 7 Artes Liberais com avaliações e acompanhamento de verdade.",
    bullets: [
      "Banco de questões por série, trimestre e avaliação",
      "Pontuação por TRI (Teoria de Resposta ao Item) — mede a habilidade real",
      "Ranking e progresso por aluno, turma e disciplina",
      "Gamificação que serve à formação da virtude, não ao vício",
    ],
  },
  {
    tag: "Para Famílias",
    title: "Famílias Educadoras (homeschool)",
    mono: "F",
    color: "#10b981",
    intro:
      "Eduque em casa com trilhas por idade e jogos que ensinam brincando — do Trivium ao Quadrivium.",
    bullets: [
      "Trilha recomendada pela idade do seu filho",
      "Jogos do saber: Desafio dos Sábios, Spelling Bee e mais",
      "Coleção, níveis e conquistas que celebram cada avanço",
      "Verdade, Bondade e Beleza à luz da Educação Cristã Clássica",
    ],
  },
];

export function AudienceSection() {
  return (
    <section id="publicos" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.tag} delay={i * 0.1}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl border-2 bg-white p-8 shadow-[0_12px_36px_rgba(2,6,23,0.07)] transition hover:-translate-y-1"
                style={{ borderColor: `${a.color}40` }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
                  style={{ background: a.color }}
                />
                <p
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: a.color }}
                >
                  {a.tag}
                </p>
                <h3 className="font-display mt-2 flex items-center gap-3 text-3xl text-slate-900">
                  <span
                    className="font-display flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white shadow-sm"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.mono}
                  </span>
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{a.intro}</p>
                <ul className="mt-5 space-y-2.5">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span style={{ color: a.color }} className="mt-0.5 font-black">
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
