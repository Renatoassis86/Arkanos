import spellingBySerieJson from "../../../data/spelling_by_serie.json";
import radix3AnoJson from "../../../data/radix_3ano.json";
import radix5AnoJson from "../../../data/radix_5ano.json";

export type SpellingWord = {
  id: number;
  palavra: string;
  significado: string;
  ipa?: string;
  exemplo?: string;
  dificuldade: string;
  serie?: string;
  serie_slug?: string;
  silabas?: string;
  classe?: string;
  sinonimos?: string;
  idioma?: string;
};

const spellingData = spellingBySerieJson as unknown as Record<string, SpellingWord[]>;
const radix3Data = radix3AnoJson as unknown as SpellingWord[];
const radix5Data = radix5AnoJson as unknown as SpellingWord[];

/** 
 * Palavras do Spelling Bee (Inglês) por série - Carrega 100% das palavras do banco da série.
 * 2º ano: 88 palavras
 * 3º ano: 108 palavras
 * 4º ano: 129 palavras
 * 5º ano: 42 palavras
 * Total Geral: 367 palavras
 */
export async function listSpellingWords(serie = "todos", limit?: number): Promise<SpellingWord[]> {
  let pool: SpellingWord[] = [];
  if (serie === "todos") {
    for (const [key, items] of Object.entries(spellingData)) {
      for (const item of items) {
        pool.push({ ...item, serie: key, serie_slug: key });
      }
    }
  } else if (spellingData[serie]) {
    pool = spellingData[serie].map((item) => ({ ...item, serie, serie_slug: serie }));
  }

  if (pool.length > 0) {
    return limit && limit > 0 ? pool.slice(0, limit) : pool;
  }

  return [];
}

/** 
 * Palavras do Radix (Português) por série.
 * 3º ano: 148 palavras
 * 5º ano: 150 palavras
 * Total Geral: 298 palavras
 */
export async function listRadixWords(serie = "todos", limit?: number): Promise<SpellingWord[]> {
  if (serie === "3ano") {
    const mapped = radix3Data.map((w) => ({ ...w, serie: "3º Ano", serie_slug: "3ano" }));
    return limit && limit > 0 ? mapped.slice(0, limit) : mapped;
  }

  if (serie === "5ano") {
    const mapped = radix5Data.map((w) => ({ ...w, serie: "5º Ano", serie_slug: "5ano" }));
    return limit && limit > 0 ? mapped.slice(0, limit) : mapped;
  }

  // "todos"
  const all = [
    ...radix3Data.map((w) => ({ ...w, serie: "3º Ano", serie_slug: "3ano" })),
    ...radix5Data.map((w) => ({ ...w, serie: "5º Ano", serie_slug: "5ano" })),
  ];
  return limit && limit > 0 ? all.slice(0, limit) : all;
}
