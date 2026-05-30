/**
 * Teoria de Resposta ao Item (TRI) — pontuação dos jogos de perguntas.
 *
 * Modelo logístico de 3 parâmetros (3PL): P(θ) = c + (1−c) / (1 + e^(−a(θ−b))).
 * Acertar itens DIFÍCEIS vale mais que acertar fáceis; errar fáceis pesa mais.
 * A habilidade θ é estimada por EAP (média a posteriori, prior N(0,1)) — estável
 * mesmo em provas curtas, sem problemas de convergência do MLE.
 *
 * A pontuação final combina habilidade (TRI) + velocidade (tempo).
 */

export type ItemResult = {
  /** "easy"|"medium"|"hard" (ou "facil"|"medio"|"dificil"). */
  difficulty: string;
  /** "multiple_choice"|"true_false"|"short_answer"|"spelling" (afeta o chute c). */
  type?: string;
  correct: boolean;
};

function params(it: ItemResult): { a: number; b: number; c: number } {
  const d = (it.difficulty || "").toLowerCase();
  const b = d === "hard" || d === "dificil" ? 1.0 : d === "medium" || d === "medio" ? 0.0 : -1.0;
  // chute (guessing): múltipla escolha 4 opções ≈ 0,25; V/F ≈ 0,5; digitação ≈ 0,05.
  const c =
    it.type === "true_false" ? 0.5 : it.type === "short_answer" || it.type === "spelling" ? 0.05 : 0.25;
  return { a: 1.2, b, c };
}

function icc(theta: number, p: { a: number; b: number; c: number }): number {
  return p.c + (1 - p.c) / (1 + Math.exp(-p.a * (theta - p.b)));
}

/** Estima a habilidade θ por EAP sobre uma grade [−4, 4]. */
export function estimateAbility(items: ItemResult[]): number {
  if (items.length === 0) return 0;
  let num = 0;
  let den = 0;
  for (let theta = -4; theta <= 4.0001; theta += 0.1) {
    const prior = Math.exp(-(theta * theta) / 2); // ∝ N(0,1)
    let like = 1;
    for (const it of items) {
      const p = icc(theta, params(it));
      like *= it.correct ? p : 1 - p;
    }
    const w = like * prior;
    num += theta * w;
    den += w;
  }
  return den > 0 ? num / den : 0;
}

function erf(x: number): number {
  const s = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return s * y;
}

/** Percentil de habilidade (0–100) a partir de θ. */
export function abilityPercentile(theta: number): number {
  return Math.round((0.5 * (1 + erf(theta / Math.SQRT2))) * 100);
}

export type TriScore = {
  theta: number;
  abilityPct: number;
  /** Pontuação final (apenas habilidade TRI — SEM fator tempo). */
  points: number;
};

/**
 * Pontuação da sessão pela habilidade θ (TRI), escalada 0–1000.
 * SEM fator tempo: o que importa é a criança LER (sobretudo as curiosidades das
 * crônicas), não responder rápido.
 */
export function sessionScore(items: ItemResult[]): TriScore {
  const theta = Math.max(-3, Math.min(3, estimateAbility(items)));
  return {
    theta,
    abilityPct: abilityPercentile(theta),
    points: Math.max(0, Math.round(((theta + 3) / 6) * 1000)),
  };
}
