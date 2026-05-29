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
    <main className="min-h-screen bg-[#0b1222] lg:grid lg:grid-cols-2">
      {/* Painel de marca (desktop) */}
      <aside className="hero-aurora relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 30% 10%, rgba(241,196,15,0.14), transparent 70%)",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/img/logo.png"
            alt="Arkanos"
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain drop-shadow-[0_0_15px_rgba(241,196,15,0.4)]"
          />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            ARKANOS
          </span>
        </Link>

        <div className="relative z-10">
          <Image
            src="/img/guardioes/lyra.png"
            alt="Lyra — Guardiã da Gramática"
            width={420}
            height={520}
            priority
            style={{ width: "auto" }}
            className="h-80 object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.55)]"
          />
          <h2 className="font-display mt-6 text-4xl leading-tight text-white">
            O Reino do Saber e da Virtude
          </h2>
          <p className="mt-3 max-w-sm text-slate-300">
            Aprenda com sabedoria e jogue com propósito, nas três fases do
            Trivium.
          </p>
          <p className="mt-6 text-xs font-black uppercase tracking-[3px] text-[#f1c40f]">
            Verdade · Bondade · Beleza
          </p>
        </div>

        <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-slate-500">
          Guiado por Lyra · Aion · Kael
        </span>
      </aside>

      {/* Painel do formulário */}
      <section className="relative flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex flex-col items-center gap-3 lg:hidden"
          >
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={72}
              height={72}
              priority
              className="h-16 w-16 object-contain drop-shadow-[0_0_15px_rgba(241,196,15,0.4)]"
            />
            <span className="font-display text-xl font-bold tracking-wide text-white">
              ARKANOS
            </span>
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur">
            <header className="mb-6 text-center">
              <h1 className="font-display text-3xl text-white">{title}</h1>
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            </header>
            {children}
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
        </div>
      </section>
    </main>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0b1222]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#f1c40f]/60 focus:ring-2 focus:ring-[#f1c40f]/20";

export const labelClass =
  "block text-xs font-bold uppercase tracking-wider text-slate-400";

export const submitClass =
  "w-full rounded-xl bg-gradient-to-br from-[#f1c40f] to-[#d4af37] px-4 py-3 text-sm font-black uppercase tracking-wider text-[#0c1222] shadow-[0_4px_20px_rgba(241,196,15,0.35)] transition hover:-translate-y-0.5";

export const errorClass =
  "rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-200";
