import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask } from "./photo-frames";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef4ff] px-6 py-24">
      {/* Brushes-marca d'água */}
      <Brush color="#f1c40f" className="left-[6%] top-[2%] h-72 w-72" opacity={0.10} />
      <Brush color="#8b5cf6" className="right-[8%] bottom-[2%] h-64 w-64" opacity={0.07} />

      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#f1c40f]/40 bg-gradient-to-br from-[#1e3a8a] via-[#1f57d6] to-[#2563eb] px-6 py-12 shadow-[0_24px_70px_rgba(30,58,138,0.35)] sm:px-12">
          {/* glow multicolor */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 50% 0%, rgba(241,196,15,0.22), transparent 70%)," +
                "radial-gradient(30% 40% at 8% 100%, rgba(236,72,153,0.22), transparent 65%)," +
                "radial-gradient(30% 40% at 92% 100%, rgba(96,165,250,0.30), transparent 65%)",
            }}
          />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            {/* texto */}
            <div>
              <p className="font-emblem mb-3 text-xs font-extrabold uppercase tracking-[4px] text-[#fcd34d]">
                Comece agora
              </p>
              <h2 className="font-display text-4xl text-white sm:text-5xl">
                Comece a jornada do saber
              </h2>
              <p className="mt-4 max-w-xl text-lg text-blue-100">
                Para <span className="font-bold text-[#93c5fd]">escolas</span> clássicas e cristãs e
                para <span className="font-bold text-[#86efac]">famílias educadoras</span>, com
                Verdade, Bondade e Beleza nas 7 Artes Liberais.
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
                  className="rounded-full border-2 border-white/60 bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  Falar com a equipe
                </Link>
              </div>
            </div>

            {/* foto */}
            <div className="hidden lg:block">
              <PhotoMask
                src="/img/fotos/familia-mesa-2.png"
                alt="Família começando a jornada de aprendizado com a Arkanos"
                color="#f1c40f"
                circleMask
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
