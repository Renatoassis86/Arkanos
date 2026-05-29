import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

const GUARDIANS = [
  { name: "Lyra", role: "Gramática", img: "/img/guardioes/lyra.png", color: "#f1c40f" },
  { name: "Aion", role: "Lógica", img: "/img/guardioes/aion.png", color: "#60a5fa" },
  { name: "Kael", role: "Retórica", img: "/img/guardioes/kael.png", color: "#a78bfa" },
];

export function Hero() {
  return (
    <section className="hero-aurora relative overflow-hidden bg-[#0b1222] px-6 pt-36 pb-24">
      {/* Brilho dourado de fundo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(241,196,15,0.14), transparent 70%)",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-6 text-xs font-extrabold uppercase tracking-[4px] text-[#f1c40f] sm:text-sm">
          Cosmovisão Cristã • Clássico • Jogos com Propósito
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Aprender com <span className="text-[#f1c40f]">sabedoria</span>,
          <br />
          jogar com <span className="text-[#60a5fa]">propósito</span>.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-slate-300 sm:text-xl">
          A Arkanos é um ecossistema onde a{" "}
          <strong className="text-white">aprendizagem cristã clássica</strong> vira
          jornadas e jogos guiados para cultivar virtudes e pensamento claro.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-[#f1c40f] px-9 py-4 text-base font-black text-[#0b1222] shadow-[0_10px_30px_rgba(241,196,15,0.4)] transition hover:-translate-y-1"
          >
            Começar agora
          </Link>
          <Link
            href="#programas"
            className="rounded-full border-2 border-white/20 bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/20"
          >
            Conhecer programas
          </Link>
        </div>
      </Reveal>

      {/* Os três Guardiões do Trivium */}
      <div
        id="guardioes"
        className="relative z-10 mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {GUARDIANS.map((g, i) => (
          <Reveal key={g.name} delay={0.15 + i * 0.12}>
            <div className="group flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
              <Image
                src={g.img}
                alt={`${g.name} — Guardião(ã) da ${g.role}`}
                width={300}
                height={380}
                style={{ width: "auto" }}
                className="h-52 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-105"
              />
              <h3 className="font-display mt-4 text-2xl text-white">{g.name}</h3>
              <p
                className="text-sm font-bold uppercase tracking-widest"
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
