import { Reveal } from "./reveal";

const TESTIMONIALS = [
  {
    quote:
      "Meus filhos finalmente pedem para estudar. A jornada do Trivium deu sentido ao que aprendem.",
    author: "Mariana, mãe educadora",
  },
  {
    quote:
      "A Crônica do Guardião transforma cada questão numa pequena aula de história e virtude.",
    author: "Prof. André, escola clássica",
  },
  {
    quote:
      "O Spelling Bee e o Radix viraram rotina divertida — e o vocabulário deles disparou.",
    author: "Cláudia, ensino domiciliar",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#0a0f1c] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f]">
            Famílias e escolas
          </p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            Quem caminha com a Arkanos
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7">
                <span className="font-display text-5xl leading-none text-[#f1c40f]/40">
                  “
                </span>
                <blockquote className="-mt-3 flex-1 text-base leading-relaxed text-slate-200">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-400">
                  {t.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
