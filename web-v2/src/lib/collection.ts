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

export type OrbBlock = "conhecimento" | "virtudes" | "mitico";
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

// Orbes com arte real em /img/cards/orbe-<key>.webp.
const ORB_ART = new Set([
  // Conhecimento (12)
  "conhecimento-abaco", "conhecimento-numero-um", "conhecimento-compasso-regua",
  "conhecimento-cubo-geometrico", "conhecimento-padrao-simetrico", "conhecimento-espiral-aurea",
  "conhecimento-lira-musical", "conhecimento-melodia-nota", "conhecimento-ritmo-batidas",
  "conhecimento-lua-ceu", "conhecimento-constelacoes", "conhecimento-astrolabio-tempo",
  // Virtudes (12)
  "virtude-verdade", "virtude-bondade", "virtude-beleza", "virtude-sabedoria",
  "virtude-prudencia", "virtude-fortaleza", "virtude-temperanca", "virtude-justica",
  "virtude-fe", "virtude-esperanca", "virtude-caridade", "virtude-humildade",
  // Mítico (1)
  "mitico-palavra",
]);

function orb(key: string, nome: string, block: OrbBlock): OrbDef {
  return { key, nome, block, art: ORB_ART.has(key) ? `/img/cards/orbe-${key}.webp` : null };
}

export const ORBS: OrbDef[] = [
  // Conhecimento — Número, Forma, Música e Cosmos (12)
  orb("conhecimento-abaco", "Orbe do Ábaco", "conhecimento"),
  orb("conhecimento-numero-um", "Orbe do Número", "conhecimento"),
  orb("conhecimento-compasso-regua", "Orbe do Compasso", "conhecimento"),
  orb("conhecimento-cubo-geometrico", "Orbe do Cubo", "conhecimento"),
  orb("conhecimento-padrao-simetrico", "Orbe da Simetria", "conhecimento"),
  orb("conhecimento-espiral-aurea", "Orbe da Espiral Áurea", "conhecimento"),
  orb("conhecimento-lira-musical", "Orbe da Lira", "conhecimento"),
  orb("conhecimento-melodia-nota", "Orbe da Melodia", "conhecimento"),
  orb("conhecimento-ritmo-batidas", "Orbe do Ritmo", "conhecimento"),
  orb("conhecimento-lua-ceu", "Orbe da Lua", "conhecimento"),
  orb("conhecimento-constelacoes", "Orbe das Constelações", "conhecimento"),
  orb("conhecimento-astrolabio-tempo", "Orbe do Astrolábio", "conhecimento"),
  // Virtudes Lendárias (12)
  orb("virtude-verdade", "Orbe da Verdade", "virtudes"),
  orb("virtude-bondade", "Orbe da Bondade", "virtudes"),
  orb("virtude-beleza", "Orbe da Beleza", "virtudes"),
  orb("virtude-sabedoria", "Orbe da Sabedoria", "virtudes"),
  orb("virtude-prudencia", "Orbe da Prudência", "virtudes"),
  orb("virtude-fortaleza", "Orbe da Fortaleza", "virtudes"),
  orb("virtude-temperanca", "Orbe da Temperança", "virtudes"),
  orb("virtude-justica", "Orbe da Justiça", "virtudes"),
  orb("virtude-fe", "Orbe da Fé", "virtudes"),
  orb("virtude-esperanca", "Orbe da Esperança", "virtudes"),
  orb("virtude-caridade", "Orbe da Caridade", "virtudes"),
  orb("virtude-humildade", "Orbe da Humildade", "virtudes"),
  // Mítico (1) — A Palavra
  orb("mitico-palavra", "A Palavra", "mitico"),
];

export const ORB_BLOCK_LABEL: Record<OrbBlock, string> = {
  conhecimento: "Conhecimento · Número, Forma e Cosmos",
  virtudes: "Virtudes Lendárias",
  mitico: "Mítico",
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
