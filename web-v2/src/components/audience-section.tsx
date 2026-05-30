import { Reveal } from "./reveal";

type Audience = {
  tag: string;
  title: string;
  emoji: string;
  color: string;
  intro: string;
  bullets: string[];
};

const AUDIENCES: Audience[] = [
  {
    tag: "Para Escolas",
    title: "Escolas Clássicas e Cristãs",
    emoji: "🏫",
    color: "#60a5fa",
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
    emoji: "🏡",
    color: "#34d399",
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
    <section className="relative overflow-hidden bg-[#0a0f1c] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
            Para quem é
          </p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            Feito para escolas e para famílias educadoras
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            A mesma jornada formativa, do jeito que faz sentido para a sua realidade.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.tag} delay={i * 0.1}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl border bg-white/5 p-8 transition hover:-translate-y-1"
                style={{ borderColor: `${a.color}55` }}
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
                <h3 className="font-display mt-2 flex items-center gap-3 text-3xl text-white">
                  <span className="text-4xl">{a.emoji}</span>
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{a.intro}</p>
                <ul className="mt-5 space-y-2.5">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-200">
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
