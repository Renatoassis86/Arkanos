import Link from "next/link";
import { Reveal } from "./reveal";
import { Brush } from "./floating-art";
import { PhotoMask } from "./photo-frames";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-32 pb-20">
      {/* Brushes de fundo em camadas */}
      <Brush color="#f1c40f" className="left-[-6%] top-[8%] h-72 w-72" opacity={0.16} />
      <Brush color="#ec4899" className="right-[-4%] top-[20%] h-64 w-64" opacity={0.14} />
      <Brush color="#34d399" className="bottom-[-8%] left-[30%] h-72 w-72" opacity={0.12} />

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
          <h1 className="font-display text-4xl leading-[1.06] text-slate-900 sm:text-5xl md:text-6xl">
            Cada estudante é <span className="text-[#3b82f6]">único</span>,
            <br />
            sua jornada de saber{" "}
            <span className="text-[#e0a417]">também</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            A Arkanos une a <strong className="text-slate-900">Educação Cristã Clássica</strong> à
            tecnologia — do <span className="font-bold text-pink-500">Trivium</span> ao{" "}
            <span className="font-bold text-emerald-500">Quadrivium</span> — para cultivar{" "}
            <span className="font-bold text-[#b8860b]">Verdade, Bondade e Beleza</span>.
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
              className="rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-base font-black text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Conhecer a plataforma
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Os jogos abrem ao entrar — crie sua conta para começar a jornada.
          </p>
        </Reveal>

        {/* Foto real recortada em máscara desconstruída + símbolos flutuantes */}
        <Reveal delay={0.15} className="flex justify-center">
          <PhotoMask
            src="/img/fotos/crianca-hero-menino.png"
            alt="Criança em sua jornada de aprendizado na Arkanos"
            color="#3b82f6"
            priority
            framePad={7}
            className="max-w-[560px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
