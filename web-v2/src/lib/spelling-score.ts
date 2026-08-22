/**
 * Motor de Pontuação Competitiva por Corrida (High-Score System).
 * - Pontua palavras baseado no nível (Fácil: 10, Médio: 30, Difícil: 60)
 * - Concede multiplicador/bônus de profundidade por rodada avançada
 * - Avalia a maior sequência de acertos e o nível máximo atingido
 */

export type SpellingItemResult = {
  difficulty: string;
  correct: boolean;
};

export type RunScoreSummary = {
  totalPoints: number;
  streak: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  highestTier: "Fácil" | "Médio" | "Difícil";
};

export function calculateSpellingScore(results: SpellingItemResult[]): RunScoreSummary {
  let totalPoints = 0;
  let streak = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;
  let highestTier: "Fácil" | "Médio" | "Difícil" = "Fácil";

  for (let i = 0; i < results.length; i++) {
    const item = results[i];
    if (!item.correct) continue;

    streak++;
    const round = i + 1;
    const diff = (item.difficulty || "").toLowerCase();

    if (diff === "dificil" || diff === "hard") {
      hardCorrect++;
      highestTier = "Difícil";
      totalPoints += 60 + round * 10;
    } else if (diff === "medio" || diff === "medium") {
      mediumCorrect++;
      if (highestTier !== "Difícil") highestTier = "Médio";
      totalPoints += 30 + round * 5;
    } else {
      easyCorrect++;
      totalPoints += 10 + round * 2;
    }
  }

  return {
    totalPoints,
    streak,
    easyCorrect,
    mediumCorrect,
    hardCorrect,
    highestTier,
  };
}
