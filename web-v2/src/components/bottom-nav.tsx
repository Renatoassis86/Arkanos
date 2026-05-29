"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Início", icon: "🏠" },
  { href: "/desafio", label: "Desafios", icon: "⚔️" },
  { href: "/colecao", label: "Coleção", icon: "🏆" },
  { href: "/jogos", label: "Perfil", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Esconde nas telas de auth (foco no formulário).
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0f1c]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {ITEMS.map((it) => {
          const active =
            it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex flex-1 select-none flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold transition active:scale-95 ${
                active ? "text-[#f1c40f]" : "text-slate-400"
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
