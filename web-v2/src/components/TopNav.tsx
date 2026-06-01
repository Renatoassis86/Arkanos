"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./user-menu";

const ITEMS: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/jogos", label: "Painel", match: (p) => p === "/jogos" },
  { href: "/desafio", label: "Desafios", match: (p) => p.startsWith("/desafio") || p.startsWith("/spelling") },
  { href: "/colecao", label: "Coleção", match: (p) => p.startsWith("/colecao") },
  { href: "/ranking", label: "Ranking", match: (p) => p.startsWith("/ranking") },
  { href: "/#universo", label: "Universo", match: () => false },
];

export function TopNav() {
  const pathname = usePathname();

  // Mostra só na área logada (esconde na landing e auth).
  if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1e3a8a] to-[#3730a3] text-white shadow-[0_4px_20px_rgba(2,6,23,0.25)]">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto pr-12 sm:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ITEMS.map((it) => {
            const active = it.match(pathname);
            return (
              <Link
                key={it.label}
                href={it.href}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-black uppercase tracking-wide transition ${
                  active ? "bg-white/20 text-white" : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
