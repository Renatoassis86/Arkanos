/**
 * Catálogo da Coleção (fonte da verdade para EXIBIR níveis, orbes, medalhas e
 * títulos). O que o aluno conquistou vive no banco (tabelas user_*); aqui está
 * apenas o que EXISTE. Espelha web-v2/docs/GAMIFICACAO.md §3–§7.
 */

// ============================================================
// Níveis — "A Escada das Artes Liberais" (50 níveis, 5 Eras)
// ============================================================

export type Era = 1 | 2 | 3 | 4 | 5;

export const ERAS: Record<Era, { nome: string; bg: string }> = {
  1: { nome: "Os Primeiros Passos", bg: "/img/cards/nivel-era-1.webp" },
  2: { nome: "A Arte da Palavra", bg: "/img/cards/nivel-era-2.webp" },
  3: { nome: "A Arte do Número", bg: "/img/cards/nivel-era-3.webp" },
  4: { nome: "A Sabedoria", bg: "/img/cards/nivel-era-4.webp" },
  5: { nome: "A Coroa", bg: "/img/cards/nivel-era-5.webp" },
};

const LEVEL_NAMES = [
  // Era I (1–10)
  "Aprendiz", "Iniciado", "Pupilo", "Aplicado", "Estudante Dedicado", "Leitor",
  "Memorioso", "Discípulo", "Aprendiz das Letras", "Guardião Iniciante",
  // Era II (11–20)
  "Gramático", "Escriba", "Mestre das Letras", "Dialético", "Lógico",
  "Argumentador", "Pensador Claro", "Retórico", "Orador", "Voz de Ouro",
  // Era III (21–30)
  "Aritmético", "Calculista", "Mestre dos Números", "Geômetra", "Arquiteto das Formas",
  "Músico das Esferas", "Harmonista", "Astrônomo", "Navegante dos Céus", "Contemplador do Cosmos",
  // Era IV (31–40)
  "Filósofo Novato", "Amante da Sabedoria", "Bacharel das Artes", "Erudito", "Sábio",
  "Mestre das Sete Artes", "Guardião do Saber", "Conselheiro", "Doutor das Artes", "Sábio Ancião",
  // Era V (41–50)
  "Iluminado", "Portador da Verdade", "Servo da Bondade", "Mensageiro da Beleza", "Virtuoso",
  "Mestre Coroado", "Guardião Lendário", "Sábio Celeste", "Sábio Imortal", "Sábio Coroado de Arkanos",
];

export type LevelDef = { n: number; nome: string; era: Era; arks: number };

/** Arks acumulados necessários para atingir o nível n: (n−1)² × 100. */
export function arksForLevel(n: number): number {
  return (n - 1) * (n - 1) * 100;
}

export function eraForLevel(n: number): Era {
  return Math.min(5, Math.ceil(n / 10)) as Era;
}

export const LEVELS: LevelDef[] = LEVEL_NAMES.map((nome, i) => {
  const n = i + 1;
  return { n, nome, era: eraForLevel(n), arks: arksForLevel(n) };
});

export const MAX_LEVEL = LEVELS.length;

// ============================================================
// Orbes (cartas colecionáveis) — 30, em 3 blocos
// `art` = slug do arquivo /img/cards/orbe-<art>.webp (null = sem arte ainda).
// ============================================================

export type OrbBlock = "trivium" | "quadrivium" | "virtudes";
export type Rarity = "terrestre" | "lunar" | "solar" | "estelar" | "celeste";

export const RARITY_LABEL: Record<Rarity, string> = {
  terrestre: "Orbe Terrestre",
  lunar: "Orbe Lunar",
  solar: "Orbe Solar",
  estelar: "Orbe Estelar",
  celeste: "Orbe Celeste",
};

/** Cor/brilho da faixa de raridade (navy/dourado theme). */
export const RARITY_GLOW: Record<Rarity, string> = {
  terrestre: "#cd7f32",
  lunar: "#cbd5e1",
  solar: "#f1c40f",
  estelar: "#8b5cf6",
  celeste: "#fefce8",
};

export type OrbDef = { key: string; nome: string; block: OrbBlock; art: string | null };

// Orbes com arte real em /img/cards/orbe-<key>.webp. Faltam só 4 do Quadrivium
// (forma, simetria, harmonia, ritmo) — esses caem no objeto-placeholder do GameCard.
const ORB_ART = new Set([
  // Trivium (9)
  "gramatica", "vocabulario", "ortografia", "logos", "deducao", "argumento",
  "eloquencia", "persuasao", "narrativa",
  // Quadrivium (6 de 10)
  "numero", "calculo", "proporcao", "ceus", "constelacoes", "calendario",
  // Virtudes (11)
  "verdade", "bondade", "beleza", "sabedoria", "prudencia", "fortaleza",
  "temperanca", "justica", "fe", "esperanca", "caridade",
]);

function orb(key: string, nome: string, block: OrbBlock): OrbDef {
  return { key, nome, block, art: ORB_ART.has(key) ? `/img/cards/orbe-${key}.webp` : null };
}

export const ORBS: OrbDef[] = [
  // Trivium — a Palavra (1–9)
  orb("gramatica", "Orbe da Gramática", "trivium"),
  orb("vocabulario", "Orbe do Vocabulário", "trivium"),
  orb("ortografia", "Orbe da Ortografia", "trivium"),
  orb("logos", "Orbe de Logos", "trivium"),
  orb("deducao", "Orbe da Dedução", "trivium"),
  orb("argumento", "Orbe do Argumento", "trivium"),
  orb("eloquencia", "Orbe da Eloquência", "trivium"),
  orb("persuasao", "Orbe da Persuasão", "trivium"),
  orb("narrativa", "Orbe da Narrativa", "trivium"),
  // Quadrivium — o Número e o Cosmos (10–19)
  orb("numero", "Orbe do Número", "quadrivium"),
  orb("calculo", "Orbe do Cálculo", "quadrivium"),
  orb("proporcao", "Orbe da Proporção", "quadrivium"),
  orb("forma", "Orbe da Forma", "quadrivium"),
  orb("simetria", "Orbe da Simetria", "quadrivium"),
  orb("harmonia", "Orbe da Harmonia", "quadrivium"),
  orb("ritmo", "Orbe do Ritmo", "quadrivium"),
  orb("ceus", "Orbe dos Céus", "quadrivium"),
  orb("constelacoes", "Orbe das Constelações", "quadrivium"),
  orb("calendario", "Orbe do Calendário", "quadrivium"),
  // Virtudes & Cosmovisão (20–30)
  orb("verdade", "Orbe da Verdade", "virtudes"),
  orb("bondade", "Orbe da Bondade", "virtudes"),
  orb("beleza", "Orbe da Beleza", "virtudes"),
  orb("sabedoria", "Orbe da Sabedoria", "virtudes"),
  orb("prudencia", "Orbe da Prudência", "virtudes"),
  orb("fortaleza", "Orbe da Fortaleza", "virtudes"),
  orb("temperanca", "Orbe da Temperança", "virtudes"),
  orb("justica", "Orbe da Justiça", "virtudes"),
  orb("fe", "Orbe da Fé", "virtudes"),
  orb("esperanca", "Orbe da Esperança", "virtudes"),
  orb("caridade", "Orbe da Caridade", "virtudes"),
];

export const ORB_BLOCK_LABEL: Record<OrbBlock, string> = {
  trivium: "Trivium · a Palavra",
  quadrivium: "Quadrivium · o Número e o Cosmos",
  virtudes: "Virtudes & Cosmovisão",
};

// ============================================================
// Medalhas (olímpicas) — Bronze / Prata / Ouro / Louro
// ============================================================

export type MedalTier = "bronze" | "prata" | "ouro" | "louro";

export type MedalDef = { key: string; nome: string; criterio: string; tier: MedalTier };

export const MEDALS: MedalDef[] = [
  { key: "primeiro-passo", nome: "Primeiro Passo", criterio: "Concluir a 1ª prova", tier: "bronze" },
  { key: "gabaritou", nome: "Gabaritou", criterio: "Acertar 100% numa partida", tier: "ouro" },
  { key: "ofensiva", nome: "Ofensiva", criterio: "3 dias seguidos jogando", tier: "prata" },
  { key: "perseveranca", nome: "Perseverança", criterio: "7 dias de ofensiva", tier: "prata" },
  { key: "mente-clara", nome: "Mente Clara", criterio: "90%+ em Lógica", tier: "ouro" },
  { key: "voz-de-ouro", nome: "Voz de Ouro", criterio: "Concluir a trilha de Retórica", tier: "ouro" },
  { key: "coroa-de-louros", nome: "Coroa de Louros", criterio: "\"Platinar\" uma Arte", tier: "louro" },
  { key: "guardiao-trivium", nome: "Guardião do Trivium", criterio: "Completar Gramática + Lógica + Retórica", tier: "louro" },
  { key: "contemplador-ceus", nome: "Contemplador dos Céus", criterio: "Completar o Quadrivium", tier: "louro" },
];

// ============================================================
// Missões diárias — progresso computado dos game_events do dia (sem tabela).
// ============================================================

export type DailyMetric = "sessions" | "correct" | "games";

export type MissionDef = {
  key: string;
  label: string;
  icon: string;
  target: number;
  metric: DailyMetric;
};

export const DAILY_MISSIONS: MissionDef[] = [
  { key: "play1", label: "Finalize 1 partida", icon: "🎯", target: 1, metric: "sessions" },
  { key: "correct15", label: "Acerte 15 no total", icon: "✅", target: 15, metric: "correct" },
  { key: "both-games", label: "Jogue os 2 jogos", icon: "🎮", target: 2, metric: "games" },
];

export const MEDAL_TIER_COLOR: Record<MedalTier, string> = {
  bronze: "#cd7f32",
  prata: "#cbd5e1",
  ouro: "#f1c40f",
  louro: "#e8d8a0",
};

/** Arte da medalha em /img/cards/medalha-<key>.webp (as 7 do catálogo existem). */
export function medalArt(key: string): string {
  return `/img/cards/medalha-${key}.webp`;
}

// ============================================================
// Títulos (exibidos no perfil)
// ============================================================

export type TitleDef = { key: string; nome: string };

export const TITLES: TitleDef[] = [
  { key: "o-perseverante", nome: "O Perseverante" },
  { key: "mente-clara", nome: "Mente Clara" },
  { key: "voz-de-ouro", nome: "Voz de Ouro" },
  { key: "guardiao-trivium", nome: "Guardião do Trivium" },
  { key: "contemplador-ceus", nome: "Contemplador dos Céus" },
  { key: "sabio-coroado", nome: "Sábio Coroado" },
];
