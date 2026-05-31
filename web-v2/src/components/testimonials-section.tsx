import Image from "next/image";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";

const TESTIMONIALS = [
  {
    quote:
      "Meus filhos finalmente pedem para estudar. A jornada do Trivium deu sentido ao que aprendem.",
    author: "Mariana, mãe educadora",
    photo: "/img/fotos/leitura-mae-filha.png",
    color: "#ec4899",
  },
  {
    quote:
      "A Crônica do Guardião transforma cada questão numa pequena aula de história e virtude.",
    author: "Prof. André, escola clássica",
    photo: "/img/fotos/familia-comemora-bg.png",
    color: "#3b82f6",
  },
  {
    quote:
      "O Spelling Bee e o Radix viraram rotina divertida — e o vocabulário deles disparou.",
    author: "Cláudia, ensino domiciliar",
    photo: "/img/fotos/familia-sofa-bg.png",
    color: "#10b981",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] px-6 py-24">
      {/* Brushes-marca d'água */}
      <Brush color="#e0a417" className="left-[-6%] top-[10%] h-72 w-72" opacity={0.10} />
      <Brush color="#10b981" className="right-[-8%] bottom-[6%] h-80 w-80" opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
            Famílias e escolas
          </p>
          <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
            Quem caminha com a Arkanos
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
                {/* foto no topo do card */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={t.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, transparent 55%, #ffffff)` }}
                  />
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 h-9 w-9 rounded-full border-2 border-white/70"
                    style={{ background: `${t.color}55` }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 pt-3">
                  <span className="font-display text-5xl leading-none" style={{ color: `${t.color}66` }}>
                    “
                  </span>
                  <blockquote className="-mt-3 flex-1 text-base leading-relaxed text-slate-700">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                    {t.author}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
