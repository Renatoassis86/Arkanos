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
    <section className="bg-[#f8fafc] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            Famílias e escolas
          </p>
          <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
            Quem caminha com a Arkanos
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
                <span className="font-display text-5xl leading-none text-[#e0a417]/50">
                  “
                </span>
                <blockquote className="-mt-3 flex-1 text-base leading-relaxed text-slate-700">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">
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
