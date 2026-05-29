import { sql } from "drizzle-orm";
import { db } from "@/db/client";
import { palavrasSpellingBee } from "@/db/schema";

export type SpellingWord = {
  id: number;
  palavra: string;
  significado: string;
  ipa: string;
  exemplo: string;
  dificuldade: string;
};

/** Palavras do Spelling Bee (Lyra · Gramática), em ordem aleatória. */
export async function listSpellingWords(limit = 12): Promise<SpellingWord[]> {
  const rows = await db
    .select({
      id: palavrasSpellingBee.id,
      palavra: palavrasSpellingBee.palavra,
      significado: palavrasSpellingBee.significado,
      ipa: palavrasSpellingBee.ipa,
      exemplo: palavrasSpellingBee.exemplo,
      dificuldade: palavrasSpellingBee.dificuldade,
    })
    .from(palavrasSpellingBee)
    .orderBy(sql`random()`)
    .limit(limit);
  return rows;
}
