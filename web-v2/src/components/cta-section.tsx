import Link from "next/link";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="bg-[#0b1222] px-6 py-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#f1c40f]/20 bg-gradient-to-br from-[#11192e] to-[#0a0f1c] px-8 py-16 text-center">
          {/* glow multicolor */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 50% 0%, rgba(241,196,15,0.18), transparent 70%)," +
                "radial-gradient(30% 40% at 10% 100%, rgba(236,72,153,0.14), transparent 65%)," +
                "radial-gradient(30% 40% at 90% 100%, rgba(52,211,153,0.14), transparent 65%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Comece a jornada do saber
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Para <span className="text-[#60a5fa]">escolas</span> clássicas e cristãs e para{" "}
              <span className="text-[#34d399]">famílias educadoras</span> — Verdade, Bondade e
              Beleza nas 7 Artes Liberais.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-[#f1c40f] px-9 py-4 text-base font-black text-[#0b1222] shadow-[0_10px_30px_rgba(241,196,15,0.4)] transition hover:-translate-y-1"
              >
                Criar conta grátis
              </Link>
              <Link
                href="#contato"
                className="rounded-full border-2 border-white/20 bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
