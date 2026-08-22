import { sql, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { palavrasSpellingBee } from "@/db/schema";
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

/** Palavras do Spelling Bee (Inglês) por série. */
export async function listSpellingWords(serie = "todos", limit = 12): Promise<SpellingWord[]> {
  try {
    const query = db
      .select({
        id: palavrasSpellingBee.id,
        palavra: palavrasSpellingBee.palavra,
        significado: palavrasSpellingBee.significado,
        ipa: palavrasSpellingBee.ipa,
        exemplo: palavrasSpellingBee.exemplo,
        dificuldade: palavrasSpellingBee.dificuldade,
        serie: palavrasSpellingBee.serie,
      })
      .from(palavrasSpellingBee);

    const rows =
      serie && serie !== "todos"
        ? await query.where(eq(palavrasSpellingBee.serie, serie)).orderBy(sql`random()`).limit(limit)
        : await query.orderBy(sql`random()`).limit(limit);

    if (rows && rows.length > 0) return rows as SpellingWord[];
  } catch {
    // Fallback gracioso para arquivo JSON local
  }

  // Carrega do JSON por série
  const seriesData = loadJsonSafe<Record<string, SpellingWord[]>>("data/spelling_by_serie.json");
  if (seriesData) {
    let pool: SpellingWord[] = [];
    if (serie === "todos" || !seriesData[serie]) {
      pool = Object.values(seriesData).flat();
    } else {
      pool = seriesData[serie] || [];
    }
    if (pool.length > 0) {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit);
    }
  }

  return [];
}

/** Palavras do Radix (Português) por série (3º Ano / 5º Ano / Todos). */
export async function listRadixWords(serie = "3ano", limit = 12): Promise<SpellingWord[]> {
  const file =
    serie === "5ano"
      ? "data/radix_5ano.json"
      : serie === "todos"
      ? "data/radix_all.json"
      : "data/radix_3ano.json";

  const data = loadJsonSafe<SpellingWord[]>(file) || loadJsonSafe<SpellingWord[]>("data/radix_all.json") || [];
  if (data.length > 0) {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }
  return [];
}
