import Link from "next/link";
import Image from "next/image";

const COLS = [
  {
    title: "Plataforma",
    links: [
      { label: "As 7 Artes Liberais", href: "#programas" },
      { label: "Jogos", href: "#jogos" },
      { label: "Públicos", href: "#publicos" },
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
    <footer id="contato" className="border-t border-slate-200 bg-[#f8fafc] px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo.png"
              alt="Arkanos"
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
            />
            <span className="font-emblem text-lg font-bold tracking-[2px] text-slate-900">ARKANOS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            O Reino do Saber e da Virtude: jogos da Educação Cristã Clássica, do Trivium ao
            Quadrivium (as 7 Artes Liberais).
          </p>
          <p className="font-emblem mt-5 text-xs font-black uppercase tracking-[3px] text-[#b8860b]">
            Verdade · Bondade · Beleza
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 transition hover:text-[#b8860b]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Arkanos · O Reino do Saber e da Virtude.
      </div>
    </footer>
  );
}
