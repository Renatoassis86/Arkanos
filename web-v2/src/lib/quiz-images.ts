/**
 * Reconhecimento/resolução da imagem de cada questão do Desafio dos Sábios.
 * Resolve na ordem: arquivo explícito → numero+tema → id → (tags, via manifesto).
 * As imagens vivem em /public/img/quiz/<assessment>/historia_5ano_t2_av1_qXX_tema.webp
 */

export type QuestionImageInput = {
  id?: string;
  numero?: number;
  tema?: string;
  imagem?: string | { arquivo: string; alt?: string; tags?: string[] };
  tags?: string[];
};

const BASE = "/img/quiz/5ano_t2_av1_historia/";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** kebab/snake sem acento, para casar com o nome padronizado do arquivo. */
export function slugTema(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Garante extensão .webp (as imagens servidas são otimizadas em webp). */
function toWebp(file: string): string {
  return file.replace(/\.(png|jpe?g|webp)$/i, "") + ".webp";
}

/**
 * Retorna o caminho público da imagem da questão, ou null se não houver
 * informação suficiente. Espelha a regra 9 do importador.
 */
export function getImageForQuestion(q: QuestionImageInput): string | null {
  // 1) arquivo explícito (string ou objeto { arquivo })
  const file = typeof q.imagem === "string" ? q.imagem : q.imagem?.arquivo;
  if (file) return BASE + toWebp(file);

  // 2) número + tema (nome padronizado historia_5ano_t2_av1_qXX_tema)
  if (q.numero != null && q.tema) {
    return `${BASE}historia_5ano_t2_av1_q${pad2(q.numero)}_${slugTema(q.tema)}.webp`;
  }

  // 3) id direto (já é o slug base da questão)
  if (q.id) return `${BASE}${toWebp(q.id)}`;

  return null;
}

/** Nome de arquivo padronizado (sem extensão) a partir de numero+tema. */
export function standardImageName(numero: number, tema: string): string {
  return `historia_5ano_t2_av1_q${pad2(numero)}_${slugTema(tema)}`;
}
