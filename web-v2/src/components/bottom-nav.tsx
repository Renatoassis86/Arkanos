"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "inicio" | "desafios" | "colecao" | "ranking" | "perfil";

const ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/jogos", label: "Início", icon: "inicio" },
  { href: "/desafio", label: "Desafios", icon: "desafios" },
  { href: "/colecao", label: "Coleção", icon: "colecao" },
  { href: "/ranking", label: "Ranking", icon: "ranking" },
  { href: "/jogos", label: "Perfil", icon: "perfil" },
];

function Icon({ name, active }: { name: IconName; active: boolean }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: active ? 2.4 : 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "inicio":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      );
    case "desafios":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "colecao":
      return (
        <svg {...common}>
          <path d="M12 3 21 8 12 13 3 8z" />
          <path d="M3 12l9 5 9-5" />
          <path d="M3 16l9 5 9-5" />
        </svg>
      );
    case "ranking":
      return (
        <svg {...common}>
          <path d="M7 4h10v3a5 5 0 0 1-10 0z" />
          <path d="M9 14h6M10 14v3M14 14v3M8 20h8" />
          <path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3" />
        </svg>
      );
    case "perfil":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
  }
}

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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-gradient-to-r from-[#1e3a8a] to-[#3730a3] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-6px_24px_rgba(2,6,23,0.18)] sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-full sm:border sm:border-white/15 sm:shadow-[0_10px_30px_rgba(2,6,23,0.30)]">
      <div className="mx-auto flex max-w-md items-stretch justify-around sm:gap-1 sm:px-2">
        {ITEMS.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`flex flex-1 select-none flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition active:scale-95 sm:flex-none sm:rounded-full sm:px-4 ${
                active ? "text-white" : "text-blue-100/80 hover:text-white"
              }`}
            >
              <Icon name={it.icon} active={active} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
