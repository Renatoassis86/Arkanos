/* Composição de carta colecionável: arte (miolo) + moldura fixa vazada por cima,
 * com numeral/nome compostos via código (estratégia eficiente de GAMIFICACAO.md
 * §11.5/§11.6). Estados: desbloqueado, bloqueado (silhueta), faixa de raridade. */
import type { Rarity } from "@/lib/collection";
import { RARITY_GLOW } from "@/lib/collection";

type CardType = "orbe" | "nivel" | "medalha";

interface GameCardProps {
  type: CardType;
  /** Arte do miolo (orbe-<key>.webp) ou fundo da Era (nivel-era-N.webp). */
  artSrc?: string | null;
  /** Nome composto sobre a carta (ex.: "Gramático", "Orbe de Logos"). */
  title?: string;
  /** Selo curto no topo (ex.: número do nível). */
  badge?: string;
  /** Glifo central (medalhas / fallback quando não há arte). */
  symbol?: string;
  rarity?: Rarity;
  /** Cor do anel da medalha (tier). */
  tierColor?: string;
  locked?: boolean;
  className?: string;
}

const TEMPLATE: Record<CardType, string> = {
  orbe: "/img/cards/template-carta-orbe.webp",
  nivel: "/img/cards/template-carta-nivel.webp",
  medalha: "/img/cards/template-medalha.webp",
};

export function GameCard({
  type,
  artSrc,
  title,
  badge,
  symbol,
  rarity,
  tierColor,
  locked = false,
  className = "",
}: GameCardProps) {
  const shape = type === "medalha" ? "aspect-square" : "aspect-[2/3]";
  const glow = rarity ? RARITY_GLOW[rarity] : tierColor;
  // Objeto-placeholder para orbe sem arte: esfera estilizada (trocável pela arte real).
  const orbColor = rarity ? RARITY_GLOW[rarity] : "#f1c40f";
  const showOrbSphere = type === "orbe" && !artSrc;
  // Medalha tem arte completa (medalha-<key>.webp): mostra inteira, sem moldura.
  const artFit = type === "medalha" ? "object-contain" : "object-cover";
  const showTemplate = type !== "medalha" || !artSrc;
  // Glifo só aparece como fallback quando não há arte (medalhas sem .webp).
  const showSymbol = symbol && !artSrc;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl ${shape} ${className}`}
      style={
        glow && !locked
          ? { boxShadow: `0 0 0 1px ${glow}55, 0 0 22px -6px ${glow}` }
          : undefined
      }
    >
      {/* 1. Miolo — arte gerada (ou placeholder escuro). Silhueta quando locked. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101a33] to-[#070b16]">
        {artSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artSrc}
            alt=""
            className={`h-full w-full ${artFit} transition ${
              locked ? "scale-105 opacity-25 grayscale blur-[1px]" : "group-hover:scale-105"
            }`}
          />
        )}
        {/* Objeto-placeholder: esfera/orbe por código (até virem as artes originais). */}
        {showOrbSphere && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`aspect-square w-[55%] rounded-full transition group-hover:scale-105 ${
                locked ? "opacity-25 grayscale" : ""
              }`}
              style={{
                background: `radial-gradient(circle at 35% 30%, #ffffffcc 0%, ${orbColor} 38%, ${orbColor}66 62%, #0a0f1c 100%)`,
                boxShadow: locked ? "none" : `0 0 26px -4px ${orbColor}, inset 0 -8px 16px -6px #000`,
              }}
            />
          </div>
        )}
        {/* Glifo central (fallback de medalha sem arte) */}
        {showSymbol && (
          <div
            className={`absolute inset-0 flex items-center justify-center text-5xl ${
              locked ? "opacity-30 grayscale" : "drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]"
            }`}
          >
            {symbol}
          </div>
        )}
      </div>

      {/* 2. Moldura fixa por cima (centro vazado deixa o miolo aparecer).
          Medalha com arte própria não usa moldura genérica. */}
      {showTemplate && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={TEMPLATE[type]}
          alt=""
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${
            locked ? "opacity-60" : ""
          }`}
        />
      )}

      {/* 3. Selo de topo (número do nível) */}
      {badge && (
        <span className="absolute left-1/2 top-[6%] -translate-x-1/2 rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-black text-[#f1c40f] backdrop-blur">
          {badge}
        </span>
      )}

      {/* 4. Nome composto na base */}
      {title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2.5 pt-6 text-center">
          <p
            className={`font-display text-[11px] font-bold leading-tight sm:text-xs ${
              locked ? "text-slate-500" : "text-white"
            }`}
          >
            {title}
          </p>
        </div>
      )}

      {/* 5. Cadeado quando bloqueado */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl opacity-70" aria-hidden>
            🔒
          </span>
        </div>
      )}
    </div>
  );
}
