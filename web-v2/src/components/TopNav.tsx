"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "painel" | "desafios" | "colecao" | "ranking" | "universo";

const ITEMS: { href: string; label: string; icon: IconName; match: (p: string) => boolean }[] = [
  { href: "/jogos", label: "Painel", icon: "painel", match: (p) => p === "/jogos" },
  { href: "/desafio", label: "Desafios", icon: "desafios", match: (p) => p.startsWith("/desafio") || p.startsWith("/spelling") },
  { href: "/colecao", label: "Coleção", icon: "colecao", match: (p) => p.startsWith("/colecao") },
  { href: "/ranking", label: "Ranking", icon: "ranking", match: (p) => p.startsWith("/ranking") },
  { href: "/#universo", label: "Universo", icon: "universo", match: () => false },
];

function Icon({ name, active }: { name: IconName; active: boolean }) {
  const c = {
    width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: active ? 2.4 : 2,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "painel":
      return (<svg {...c}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></svg>);
    case "desafios":
      return (<svg {...c}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>);
    case "colecao":
      return (<svg {...c}><path d="M12 3 21 8 12 13 3 8z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" /></svg>);
    case "ranking":
      return (<svg {...c}><path d="M7 4h10v3a5 5 0 0 1-10 0z" /><path d="M9 14h6M10 14v3M14 14v3M8 20h8" /><path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3" /></svg>);
    case "universo":
      return (<svg {...c}><path d="M12 2c.6 4.6 3 7 7.5 7.5C15 10.1 12.6 12.5 12 17c-.6-4.5-3-6.9-7.5-7.5C9 8.9 11.4 6.6 12 2z" /><circle cx="18.5" cy="18.5" r="1.6" /></svg>);
  }
}

export function TopNav() {
  const pathname = usePathname();

  // Mostra só na área logada (esconde na landing e auth).
  if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1e3a8a] to-[#3730a3] text-white shadow-[0_4px_20px_rgba(2,6,23,0.25)]">
      <div className="mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((it) => {
          const active = it.match(pathname);
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-black uppercase tracking-wide transition ${
                active ? "bg-white/20 text-white" : "text-blue-100/80 hover:bg-white/10 hover:text-white"
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
