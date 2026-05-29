import Link from "next/link";
import Image from "next/image";

const COLS = [
  {
    title: "Plataforma",
    links: [
      { label: "Jornada do Trivium", href: "#programas" },
      { label: "Jogos", href: "#jogos" },
      { label: "Desafios", href: "/jogos" },
      { label: "Guardiões", href: "#guardioes" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", href: "/login" },
      { label: "Criar conta", href: "/signup" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-[#0a0f1c] px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-lg font-bold text-white">
              ARKANOS
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            O Reino do Saber e da Virtude — jogos educacionais da Educação Cristã
            Clássica, nas fases do Trivium.
          </p>
          <p className="mt-5 text-xs font-black uppercase tracking-[3px] text-[#f1c40f]">
            Verdade · Bondade · Beleza
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-300 transition hover:text-[#f1c40f]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Arkanos — O Reino do Saber e da Virtude.
      </div>
    </footer>
  );
}
