import fs from "fs";
import path from "path";

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

function loadJsonSafe<T>(relativePath: string): T | null {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) {
      const data = fs.readFileSync(fullPath, "utf-8");
      return JSON.parse(data) as T;
    }
  } catch {
    // fallback
  }
  return null;
}

/** 
 * Palavras do Spelling Bee (Inglês) por série - Carrega 100% das palavras do banco da série.
 * 2º ano: 88 palavras
 * 3º ano: 108 palavras
 * 4º ano: 129 palavras
 * 5º ano: 42 palavras
 * Total Geral: 367 palavras
 */
export async function listSpellingWords(serie = "todos", limit?: number): Promise<SpellingWord[]> {
  const seriesData = loadJsonSafe<Record<string, SpellingWord[]>>("data/spelling_by_serie.json");
  if (seriesData) {
    let pool: SpellingWord[] = [];
    if (serie === "todos") {
      for (const [key, items] of Object.entries(seriesData)) {
        for (const item of items) {
          pool.push({ ...item, serie: key, serie_slug: key });
        }
      }
    } else if (seriesData[serie]) {
      pool = seriesData[serie].map((item) => ({ ...item, serie, serie_slug: serie }));
    }

    if (pool.length > 0) {
      return limit && limit > 0 ? pool.slice(0, limit) : pool;
    }
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
    const r3 = loadJsonSafe<SpellingWord[]>("data/radix_3ano.json") || [];
    const mapped = r3.map((w) => ({ ...w, serie: "3º Ano", serie_slug: "3ano" }));
    return limit && limit > 0 ? mapped.slice(0, limit) : mapped;
  }

  if (serie === "5ano") {
    const r5 = loadJsonSafe<SpellingWord[]>("data/radix_5ano.json") || [];
    const mapped = r5.map((w) => ({ ...w, serie: "5º Ano", serie_slug: "5ano" }));
    return limit && limit > 0 ? mapped.slice(0, limit) : mapped;
  }

  // "todos"
  const r3 = loadJsonSafe<SpellingWord[]>("data/radix_3ano.json") || [];
  const r5 = loadJsonSafe<SpellingWord[]>("data/radix_5ano.json") || [];
  const all = [
    ...r3.map((w) => ({ ...w, serie: "3º Ano", serie_slug: "3ano" })),
    ...r5.map((w) => ({ ...w, serie: "5º Ano", serie_slug: "5ano" })),
  ];
  return limit && limit > 0 ? all.slice(0, limit) : all;
}
