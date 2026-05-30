import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

const GUARDIANS = [
  { name: "Lyra", role: "Gramática", img: "/img/guardioes/lyra.png", color: "#ec4899" },
  { name: "Aion", role: "Lógica", img: "/img/guardioes/aion.png", color: "#3b82f6" },
  { name: "Kael", role: "Retórica", img: "/img/guardioes/kael.png", color: "#ef4444" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-36 pb-24">
      {/* Aurora pastel multicolor (claro) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 50% -5%, rgba(241,196,15,0.22), transparent 70%)," +
            "radial-gradient(35% 30% at 10% 10%, rgba(236,72,153,0.18), transparent 60%)," +
            "radial-gradient(35% 30% at 90% 14%, rgba(59,130,246,0.18), transparent 60%)," +
            "radial-gradient(40% 35% at 50% 100%, rgba(52,211,153,0.16), transparent 65%)",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-6 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[3px] shadow-sm sm:text-sm">
          <span className="text-[#b8860b]">✦ Cosmovisão Cristã</span>
          <span className="text-slate-300">·</span>
          <span className="text-pink-500">Clássico</span>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-500">7 Artes Liberais</span>
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-slate-900 sm:text-6xl md:text-7xl">
          Aprender com <span className="text-[#e0a417]">sabedoria</span>,
          <br />
          jogar com <span className="text-[#3b82f6]">propósito</span>.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-slate-600 sm:text-xl">
          A Arkanos transforma a{" "}
          <strong className="text-slate-900">Educação Cristã Clássica</strong> em jornadas e
          jogos — do <span className="font-bold text-pink-500">Trivium</span> ao{" "}
          <span className="font-bold text-emerald-500">Quadrivium</span> — para cultivar{" "}
          <span className="font-bold text-[#b8860b]">Verdade, Bondade e Beleza</span>.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-9 py-4 text-base font-black text-[#3b2f00] shadow-[0_10px_30px_rgba(241,196,15,0.45)] transition hover:-translate-y-1"
          >
            Criar conta grátis
          </Link>
          <Link
            href="#programas"
            className="rounded-full border-2 border-slate-300 bg-white px-9 py-4 text-base font-black text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Conhecer a plataforma
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Os jogos abrem ao entrar — crie sua conta para começar a jornada.
        </p>
      </Reveal>

      {/* Guardiões do Trivium (cards claros, coloridos) */}
      <div
        id="guardioes"
        className="relative z-10 mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {GUARDIANS.map((g, i) => (
          <Reveal key={g.name} delay={0.15 + i * 0.12}>
            <div
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition duration-300 hover:-translate-y-1.5"
              style={{ borderColor: `${g.color}40` }}
            >
              <div
                className="pointer-events-none absolute -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
                style={{ background: g.color }}
              />
              <Image
                src={g.img}
                alt={`${g.name} — Guardião(ã) da ${g.role}`}
                width={300}
                height={380}
                style={{ width: "auto" }}
                className="relative z-10 h-52 object-contain drop-shadow-[0_10px_20px_rgba(2,6,23,0.18)] transition duration-300 group-hover:scale-105"
              />
              <h3 className="font-display relative z-10 mt-4 text-2xl text-slate-900">{g.name}</h3>
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
