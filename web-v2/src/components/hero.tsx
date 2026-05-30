import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

const GUARDIANS = [
  { name: "Lyra", role: "Gramática", img: "/img/guardioes/lyra.png", color: "#ec4899" },
  { name: "Aion", role: "Lógica", img: "/img/guardioes/aion.png", color: "#60a5fa" },
  { name: "Kael", role: "Retórica", img: "/img/guardioes/kael.png", color: "#f87171" },
];

export function Hero() {
  return (
    <section className="hero-aurora relative overflow-hidden bg-[#0b1222] px-6 pt-36 pb-24">
      {/* Aurora multicolorida — mais cor sem perder o navy/dourado */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 50% 0%, rgba(241,196,15,0.18), transparent 70%)," +
            "radial-gradient(35% 30% at 12% 12%, rgba(236,72,153,0.16), transparent 60%)," +
            "radial-gradient(35% 30% at 88% 16%, rgba(96,165,250,0.16), transparent 60%)," +
            "radial-gradient(40% 35% at 50% 95%, rgba(52,211,153,0.12), transparent 65%)",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-6 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[3px] text-[#f1c40f] sm:text-sm">
          <span>✦ Cosmovisão Cristã</span>
          <span className="text-slate-500">·</span>
          <span className="text-pink-300">Clássico</span>
          <span className="text-slate-500">·</span>
          <span className="text-emerald-300">7 Artes Liberais</span>
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Aprender com <span className="text-[#f1c40f]">sabedoria</span>,
          <br />
          jogar com <span className="text-[#60a5fa]">propósito</span>.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-slate-300 sm:text-xl">
          A Arkanos transforma a{" "}
          <strong className="text-white">Educação Cristã Clássica</strong> em jornadas e
          jogos — do <span className="text-pink-300">Trivium</span> ao{" "}
          <span className="text-emerald-300">Quadrivium</span> — para cultivar{" "}
          <span className="text-[#f1c40f]">Verdade, Bondade e Beleza</span>.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-[#f1c40f] px-9 py-4 text-base font-black text-[#0b1222] shadow-[0_10px_30px_rgba(241,196,15,0.4)] transition hover:-translate-y-1"
          >
            Criar conta grátis
          </Link>
          <Link
            href="#programas"
            className="rounded-full border-2 border-white/20 bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/20"
          >
            Conhecer a plataforma
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Os jogos abrem ao entrar — crie sua conta para começar a jornada.
        </p>
      </Reveal>

      {/* Guardiões do Trivium (coloridos) */}
      <div
        id="guardioes"
        className="relative z-10 mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {GUARDIANS.map((g, i) => (
          <Reveal key={g.name} delay={0.15 + i * 0.12}>
            <div
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border bg-white/5 p-6 transition duration-300 hover:-translate-y-1.5"
              style={{ borderColor: `${g.color}55` }}
            >
              <div
                className="pointer-events-none absolute -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl transition group-hover:opacity-60"
                style={{ background: g.color }}
              />
              <Image
                src={g.img}
                alt={`${g.name} — Guardião(ã) da ${g.role}`}
                width={300}
                height={380}
                style={{ width: "auto" }}
                className="relative z-10 h-52 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-105"
              />
              <h3 className="font-display relative z-10 mt-4 text-2xl text-white">{g.name}</h3>
              <p
                className="relative z-10 text-sm font-bold uppercase tracking-widest"
                style={{ color: g.color }}
              >
                {g.role}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
