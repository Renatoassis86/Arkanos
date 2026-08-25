import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Painel de marca (desktop) */}
      <aside className="relative hidden overflow-hidden border-r border-slate-200 bg-gradient-to-br from-[#fffdf3] via-white to-[#fdf0f7] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 25% 8%, rgba(241,196,15,0.20), transparent 70%)," +
              "radial-gradient(40% 35% at 90% 100%, rgba(236,72,153,0.16), transparent 65%)",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/img/logo.png"
            alt="Arkanos"
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-wide text-slate-900">
            ARKANOS
          </span>
        </Link>

        <div className="relative z-10">
          <Image
            src="/img/guardioes/lyra.png"
            alt="Lyra, Guardiã da Gramática"
            width={420}
            height={520}
            priority
            style={{ width: "auto" }}
            className="h-80 object-contain drop-shadow-[0_15px_30px_rgba(2,6,23,0.18)]"
          />
          <h2 className="font-display mt-6 text-4xl leading-tight text-slate-900">
            O Reino do Saber e da Virtude
          </h2>
          <p className="mt-3 max-w-sm text-slate-600">
            Aprenda com sabedoria e jogue com propósito, do Trivium ao Quadrivium, as 7 Artes
            Liberais.
          </p>
          <p className="mt-6 text-xs font-black uppercase tracking-[3px] text-[#b8860b]">
            Verdade · Bondade · Beleza
          </p>
        </div>

        <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-slate-400">
          Guiado por Lyra · Aion · Kael
        </span>
      </aside>

      {/* Painel do formulário */}
      <section className="relative flex items-center justify-center bg-[#f6f8fc] px-4 py-12 sm:px-6 sm:py-20">
        <div className="w-full max-w-lg">
          <Link href="/" className="mb-8 flex flex-col items-center gap-3 lg:hidden">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={80}
              height={80}
              priority
              className="h-16 w-16 object-contain"
            />
          </Link>

          <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 sm:p-12 shadow-[0_25px_70px_-15px_rgba(11,18,34,0.12)] backdrop-blur-xl">
            <header className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/80 bg-amber-50 text-2xl shadow-inner">
                🏛️
              </div>
              <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">{subtitle}</p>
            </header>
            {children}
          </div>

          <p className="mt-8 text-center text-sm font-semibold text-slate-500">{footer}</p>
        </div>
      </section>
    </main>
  );
}

export const inputClass =
  "w-full rounded-2xl border-2 border-slate-200/90 bg-slate-50/50 px-5 py-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f1c40f] focus:bg-white focus:ring-4 focus:ring-[#f1c40f]/20 shadow-sm";

export const labelClass =
  "block text-xs font-black uppercase tracking-[1.5px] text-slate-500 mb-2";

export const submitClass =
  "w-full rounded-2xl bg-gradient-to-r from-[#f1c40f] via-[#eab308] to-[#d97706] px-6 py-4.5 text-base font-black uppercase tracking-wider text-[#0b1222] shadow-[0_10px_25px_-5px_rgba(241,196,15,0.45)] transition duration-200 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(241,196,15,0.55)]";

export const errorClass =
  "rounded-2xl border-2 border-rose-300 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700 shadow-sm mb-6";
