import type { DesafioQuestion } from "@/db/queries/quiz";

/** Embaralha um array (Fisher-Yates), sem mutar o original. */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Embaralha as alternativas da questão (a correta é comparada por TEXTO,
 *  então a letra/posição da resposta certa muda a cada partida). */
export function withShuffledOptions(q: DesafioQuestion): DesafioQuestion {
  if (!q.options || q.options.length < 2) return q;
  return { ...q, options: shuffle(q.options) };
}

/** Monta uma rodada: sorteia N questões do banco e embaralha as alternativas de cada. */
export function roundOf(questions: DesafioQuestion[], n = 30): DesafioQuestion[] {
  return shuffle(questions).slice(0, n).map(withShuffledOptions);
}
