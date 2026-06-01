import Link from "next/link";

/* Mapa da Jornada das 7 Artes Liberais — trilha gamificada.
 * Cada Arte é uma estação guiada por um Guardião; as jogáveis levam ao jogo,
 * as demais ficam "em breve". Marca "Você aqui" na trilha recomendada (idade). */

type Art = {
  key: string;
  nome: string;
  grupo: "Trivium" | "Quadrivium";
  inicial: string;
  guardiao: string;
  color: string;
  jogo?: { nome: string; href: string };
};

const ARTES: Art[] = [
  { key: "gramatica", nome: "Gramática", grupo: "Trivium", inicial: "L", guardiao: "Lyra", color: "#ec4899", jogo: { nome: "Spelling Bee", href: "/spelling-bee" } },
  { key: "logica", nome: "Lógica", grupo: "Trivium", inicial: "A", guardiao: "Aion", color: "#3b82f6", jogo: { nome: "Desafio dos Sábios", href: "/desafio" } },
  { key: "retorica", nome: "Retórica", grupo: "Trivium", inicial: "K", guardiao: "Kael", color: "#ef4444" },
  { key: "aritmetica", nome: "Aritmética", grupo: "Quadrivium", inicial: "N", guardiao: "Numa", color: "#10b981" },
  { key: "geometria", nome: "Geometria", grupo: "Quadrivium", inicial: "G", guardiao: "Geon", color: "#8b5cf6" },
  { key: "musica", nome: "Música", grupo: "Quadrivium", inicial: "M", guardiao: "Melos", color: "#f59e0b" },
  { key: "astronomia", nome: "Astronomia", grupo: "Quadrivium", inicial: "A", guardiao: "Astra", color: "#6366f1" },
];

export function JourneyMap({ track }: { track: string }) {
  return (
    <div className="relative">
      {/* espinha da trilha */}
      <div className="absolute bottom-6 left-[34px] top-6 w-1 rounded-full bg-gradient-to-b from-[#f1c40f]/50 via-[#8b5cf6]/30 to-slate-200" />
      <ul className="space-y-3">
        {ARTES.map((a) => {
          const atual = a.key === track;
          const jogavel = !!a.jogo;
          const node = (
            <div
              className={`relative flex items-center gap-3 rounded-2xl border p-3 transition ${
                jogavel ? "bg-white shadow-sm hover:-translate-y-0.5" : "bg-white/55"
              }`}
              style={{ borderColor: `${a.color}40` }}
            >
              <span
                className="font-display relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-black text-white shadow-md"
                style={{
                  background: `radial-gradient(circle at 34% 28%, #ffffff66, ${a.color} 60%, ${a.color} 100%)`,
                  opacity: jogavel ? 1 : 0.65,
                }}
              >
                {a.inicial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: a.color }}>
                  {a.grupo} · {a.guardiao}
                </p>
                <p className="font-display text-lg leading-tight text-slate-900">{a.nome}</p>
                <p className="truncate text-xs text-slate-500">
                  {a.jogo ? a.jogo.nome : "Trilha em preparação"}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                {atual && (
                  <span className="rounded-full bg-[#f1c40f] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#3b2f00]">
                    Você aqui
                  </span>
                )}
                {jogavel ? (
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                    style={{ background: a.color }}
                  >
                    Jogar
                  </span>
                ) : (
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Em breve
                  </span>
                )}
              </div>
            </div>
          );
          return (
            <li key={a.key}>
              {jogavel ? (
                <Link href={a.jogo!.href} className="block">
                  {node}
                </Link>
              ) : (
                node
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
