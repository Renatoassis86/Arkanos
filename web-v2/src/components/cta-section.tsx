import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask } from "./photo-frames";

export function CtaSection({ authed }: { authed?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-[#eef4ff] px-4 py-16 sm:px-6 sm:py-24">
      {/* Brushes-marca d'água */}
      <Brush color="#f1c40f" className="left-[6%] top-[2%] h-72 w-72" opacity={0.10} />
      <Brush color="#8b5cf6" className="right-[8%] bottom-[2%] h-64 w-64" opacity={0.07} />

      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border-2 border-[#f1c40f]/40 bg-gradient-to-br from-[#1e3a8a] via-[#1f57d6] to-[#2563eb] px-5 py-10 sm:px-12 sm:py-12 shadow-[0_24px_70px_rgba(30,58,138,0.35)]">
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
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* texto */}
            <div className="text-center lg:text-left">
              <p className="font-emblem mb-2 sm:mb-3 text-xs font-extrabold uppercase tracking-[3px] sm:tracking-[4px] text-[#fcd34d]">
                Comece agora
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Comece a jornada do saber
              </h2>
              <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-blue-100 leading-relaxed">
                Para <span className="font-bold text-[#93c5fd]">escolas</span> clássicas e cristãs e
                para <span className="font-bold text-[#86efac]">famílias educadoras</span>, com
                Verdade, Bondade e Beleza nas 7 Artes Liberais.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                {authed ? (
                  <Link
                    href="/jogos"
                    prefetch={false}
                    className="w-full sm:w-auto text-center rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
                  >
                    Acessar Meu Painel →
                  </Link>
                ) : (
                  <Link
                    href="/signup"
                    className="w-full sm:w-auto text-center rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
                  >
                    Criar conta grátis
                  </Link>
                )}
                <Link
                  href="#contato"
                  className="w-full sm:w-auto text-center rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  Falar com a equipe
                </Link>
              </div>
            </div>

            {/* foto */}
            <div className="hidden lg:flex justify-center">
              <PhotoMask
                src="/img/fotos/familia-mesa-2.png"
                alt="Família começando a jornada de aprendizado com a Arkanos"
                color="#f1c40f"
                circleMask
                className="max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
