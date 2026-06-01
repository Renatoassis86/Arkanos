import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask } from "./photo-frames";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1f57d6] to-[#2f73ef] px-6 pt-32 pb-20">
      {/* Brushes de fundo em camadas (claros sobre o azul) */}
      <Brush color="#ffffff" className="left-[-6%] top-[8%] h-72 w-72" opacity={0.12} />
      <Brush color="#f1c40f" className="right-[-4%] top-[20%] h-64 w-64" opacity={0.14} />
      <Brush color="#60a5fa" className="bottom-[-8%] left-[30%] h-72 w-72" opacity={0.25} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Texto */}
        <Reveal>
          <p className="font-emblem mb-5 inline-flex flex-wrap items-center gap-x-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[3px] shadow-sm">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#e0a417]" />
            <span className="text-[#b8860b]">Cosmovisão Cristã</span>
            <span className="text-slate-300">·</span>
            <span className="text-pink-500">Clássico</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-500">7 Artes Liberais</span>
          </p>
          <h1 className="font-display text-4xl text-white sm:text-5xl md:text-[3.5rem]">
            Cada estudante é <span className="text-[#fcd34d]">único</span>, sua jornada de
            saber <span className="text-[#fcd34d]">também</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-50/90">
            A Arkanos une a <strong className="font-semibold text-white">Educação Cristã
            Clássica</strong> à tecnologia, do <strong className="font-semibold text-white">Trivium</strong> ao{" "}
            <strong className="font-semibold text-white">Quadrivium</strong>, para cultivar{" "}
            <strong className="font-semibold text-[#fcd34d]">Verdade, Bondade e Beleza</strong>.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-8 py-4 text-base font-black text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
            >
              Criar conta grátis
            </Link>
            <Link
              href="#programas"
              className="rounded-full border-2 border-white/60 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/20"
            >
              Conhecer a plataforma
            </Link>
          </div>
          <p className="mt-4 text-xs text-blue-100/80">
            Os jogos abrem ao entrar. Crie sua conta para começar a jornada.
          </p>
        </Reveal>

        {/* Foto real recortada em máscara desconstruída + símbolos flutuantes */}
        <Reveal delay={0.15} className="flex justify-center">
          <PhotoMask
            src="/img/fotos/crianca-hero-menino.png"
            alt="Criança em sua jornada de aprendizado na Arkanos"
            color="#f1c40f"
            priority
            framePad={7}
            className="max-w-[560px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
