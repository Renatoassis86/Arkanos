"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Início", icon: "🏠" },
  { href: "/desafio", label: "Desafios", icon: "⚔️" },
  { href: "/colecao", label: "Coleção", icon: "🏆" },
  { href: "/ranking", label: "Ranking", icon: "🏅" },
  { href: "/jogos", label: "Perfil", icon: "👤" },
];

export function TopNav() {
  const pathname = usePathname();

  // Hide on auth and landing pages (same logic as BottomNav)
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  )
    return null;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-red-600 h-12 flex items-center justify-center backdrop-blur text-white">
      <div className="mx-auto flex max-w-5xl items-stretch justify-around px-2">
        {ITEMS.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`flex flex-1 select-none flex-col items-center gap-0.5 py-2 text-[11px] font-bold transition active:scale-95 sm:flex-none sm:rounded-full sm:px-4 text-white ${pathname === it.href ? "underline underline-offset-4" : ""}`}
          >
            <span className="text-xl leading-none">{it.icon}</span>
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
