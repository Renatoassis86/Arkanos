import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoCard } from "./photo-frames";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Brushes-marca d'água */}
      <Brush color="#f1c40f" className="left-[6%] top-[2%] h-72 w-72" opacity={0.10} />
      <Brush color="#8b5cf6" className="right-[8%] bottom-[2%] h-64 w-64" opacity={0.07} />

      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#f1c40f]/30 bg-gradient-to-br from-[#fffdf3] via-white to-[#f0f7ff] px-6 py-12 shadow-[0_20px_60px_rgba(2,6,23,0.08)] sm:px-12">
          {/* glow multicolor */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 50% 0%, rgba(241,196,15,0.18), transparent 70%)," +
                "radial-gradient(30% 40% at 8% 100%, rgba(236,72,153,0.14), transparent 65%)," +
                "radial-gradient(30% 40% at 92% 100%, rgba(16,185,129,0.14), transparent 65%)",
            }}
          />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            {/* texto */}
            <div>
              <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#b8860b]">
                Comece agora
              </p>
              <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
                Comece a jornada do saber
              </h2>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                Para <span className="font-bold text-[#2563eb]">escolas</span> clássicas e cristãs e
                para <span className="font-bold text-[#059669]">famílias educadoras</span> — Verdade,
                Bondade e Beleza nas 7 Artes Liberais.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-9 py-4 text-base font-black text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
                >
                  Criar conta grátis
                </Link>
                <Link
                  href="#contato"
                  className="rounded-full border-2 border-slate-300 bg-white px-9 py-4 text-base font-black text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Falar com a equipe
                </Link>
              </div>
            </div>

            {/* foto */}
            <div className="hidden lg:block">
              <PhotoCard
                src="/img/fotos/familia-mesa-2.png"
                alt="Família começando a jornada de aprendizado com a Arkanos"
                color="#f1c40f"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
