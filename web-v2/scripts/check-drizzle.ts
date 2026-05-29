// Valida a camada Drizzle tipada (mesmo caminho do app) contra os dados reais.
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import { quizSubjects, palavrasSpellingBee, quizQuestions } from "../src/db/schema";

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const db = drizzle(client);

const subjects = await db.select().from(quizSubjects);
const [{ words }] = await db
  .select({ words: sql<number>`count(*)::int` })
  .from(palavrasSpellingBee);
const [{ questions }] = await db
  .select({ questions: sql<number>`count(*)::int` })
  .from(quizQuestions);

console.log("disciplinas:", subjects);
console.log("palavras spelling bee:", words);
console.log("questões:", questions);

await client.end();
