"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./user-menu";

const ITEMS: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/jogos", label: "Painel", match: (p) => p === "/jogos" },
  { href: "/radix", label: "Radix", match: (p) => p.startsWith("/radix") },
  { href: "/spelling-bee", label: "Spelling", match: (p) => p.startsWith("/spelling-bee") },
  { href: "/desafio", label: "Desafios", match: (p) => p.startsWith("/desafio") },
  { href: "/ranking", label: "Ranking", match: (p) => p.startsWith("/ranking") },
  { href: "/colecao", label: "Coleção", match: (p) => p.startsWith("/colecao") },
];

export function TopNav() {
  const pathname = usePathname();

  // Mostra só na área logada (esconde na landing e auth).
  if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#3730a3] text-white shadow-[0_4px_20px_rgba(2,6,23,0.25)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          {ITEMS.map((it) => {
            const active = it.match(pathname);
            return (
              <Link
                key={it.label}
                href={it.href}
                prefetch={false}
                className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wide transition sm:px-3.5 sm:py-2 sm:text-xs ${
                  active ? "bg-white/20 text-white shadow-sm" : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
        <div className="shrink-0">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
