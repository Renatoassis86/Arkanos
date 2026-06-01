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

export function BottomNav() {
  const pathname = usePathname();

  // Esconde nas telas de auth e na landing informativa (que tem seu próprio header).
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  )
    return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-red-600 h-12 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-full sm:border sm:shadow-[0_8px_30px_rgba(2,6,23,0.15)] text-white">
      <div className="mx-auto flex max-w-md items-stretch justify-around sm:gap-1 sm:px-2">
        {ITEMS.map((it) => {
          const active =
            it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex flex-1 select-none flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold transition active:scale-95 sm:flex-none sm:rounded-full sm:px-4 ${
                  active ? "text-[#ffea00]" : "text-white/70 hover:text-white"
                }`}
            >
              <span className="text-xl leading-none">{it.icon}</span>
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
