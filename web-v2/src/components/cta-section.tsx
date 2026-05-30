import Link from "next/link";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="bg-white px-6 py-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#f1c40f]/30 bg-gradient-to-br from-[#fffdf3] via-white to-[#f0f7ff] px-8 py-16 text-center shadow-[0_20px_60px_rgba(2,6,23,0.08)]">
          {/* glow multicolor */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 60% at 50% 0%, rgba(241,196,15,0.22), transparent 70%)," +
                "radial-gradient(30% 40% at 8% 100%, rgba(236,72,153,0.16), transparent 65%)," +
                "radial-gradient(30% 40% at 92% 100%, rgba(16,185,129,0.16), transparent 65%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display text-4xl text-slate-900 sm:text-5xl">
              Comece a jornada do saber
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Para <span className="font-bold text-[#2563eb]">escolas</span> clássicas e cristãs e
              para <span className="font-bold text-[#059669]">famílias educadoras</span> — Verdade,
              Bondade e Beleza nas 7 Artes Liberais.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
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
        </div>
      </Reveal>
    </section>
  );
}
