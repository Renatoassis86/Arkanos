"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "./user-menu";

const NAV = [
  { label: "Sobre", href: "#institucional" },
  { label: "Públicos", href: "#publicos" },
  { label: "7 Artes", href: "#programas" },
  { label: "Jogos", href: "#jogos" },
  { label: "Clube do Livro", href: "#clube-do-livro" },
  { label: "Universo", href: "#universo" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader({ authed = false }: { authed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#15265f]/95 shadow-[0_4px_30px_rgba(2,6,23,0.25)] backdrop-blur"
          : "border-white/10 bg-[#15265f]/75 backdrop-blur-md"
      }`}
    >
      <div
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-6 transition-all duration-300"
        style={{ height: scrolled ? 70 : 90 }}
      >
        <Link href="/" aria-label="Arkanos — início" className="flex items-center">
          <Image
            src="/img/logo.png"
            alt="Arkanos"
            width={96}
            height={96}
            priority
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-12 w-12" : "h-[64px] w-[64px]"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-blue-50 transition-colors hover:bg-white/10 hover:text-[#fcd34d]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {authed ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-2xl border-2 border-[#f1c40f] px-7 py-3 text-[13px] font-black uppercase tracking-[2px] text-[#fcd34d] transition hover:bg-[#f1c40f]/10"
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="rounded-2xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-7 py-3 text-[13px] font-black uppercase tracking-[2px] text-[#3b2f00] shadow-[0_6px_20px_rgba(241,196,15,0.45)] transition hover:-translate-y-0.5"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex flex-col gap-[5px] p-2 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-extrabold uppercase tracking-wide text-slate-700 hover:bg-[#f1c40f]/10 hover:text-[#b8860b]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-3">
            {authed ? (
              <Link
                href="/jogos"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-[#3b2f00]"
              >
                Meu Painel →
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border-2 border-[#f1c40f] px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-[#b8860b]"
                >
                  Entrar
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-[#3b2f00]"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
