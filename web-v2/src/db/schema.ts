import {
  pgTable,
  bigint,
  integer,
  text,
  varchar,
  boolean,
  jsonb,
  timestamp,
  date,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Schema Drizzle curado a partir das tabelas reais do Postgres (Supabase).
 * Os nomes físicos (pgTable("<nome_real>")) preservam o banco do Django atual.
 * Tabelas de CONTEÚDO são preservadas e usadas já; `profiles` é nova (Fase 1).
 *
 * Para validar/refinar contra o banco real: `npm run db:pull` (read-only).
 */

// ============================================================
// CONTEÚDO — Desafio dos Sábios (quiz_*)
// ============================================================

export const quizSubjects = pgTable("quiz_subjects", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const quizGrades = pgTable("quiz_grades", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const quizAssessments = pgTable(
  "quiz_assessments",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    gradeId: bigint("grade_id", { mode: "number" })
      .notNull()
      .references(() => quizGrades.id),
    subjectId: bigint("subject_id", { mode: "number" })
      .notNull()
      .references(() => quizSubjects.id),
    trimestre: integer("trimestre"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (t) => [
    uniqueIndex("quiz_assessments_uq").on(
      t.name,
      t.gradeId,
      t.subjectId,
      t.trimestre,
    ),
  ],
);

export const quizTopics = pgTable(
  "quiz_topics",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    subjectId: bigint("subject_id", { mode: "number" })
      .notNull()
      .references(() => quizSubjects.id),
    gradeId: bigint("grade_id", { mode: "number" }).references(() => quizGrades.id),
    assessmentId: bigint("assessment_id", { mode: "number" }).references(
      () => quizAssessments.id,
    ),
    name: varchar("name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (t) => [
    uniqueIndex("quiz_topics_uq").on(t.subjectId, t.gradeId, t.assessmentId, t.name),
  ],
);

/**
 * Colunas compartilhadas das 3 tabelas de questões (espelha BaseQuizQuestion).
 * Factory: retorna builders novos a cada chamada (Drizzle muta os builders por tabela).
 */
const baseQuestionColumns = () => ({
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  topicId: bigint("topic_id", { mode: "number" })
    .notNull()
    .references(() => quizTopics.id),
  question: text("question").notNull(),
  options: jsonb("options"),
  answer: text("answer").notNull(),
  type: varchar("type", { length: 30 }).notNull().default("multiple_choice"),
  difficulty: varchar("difficulty", { length: 10 }).notNull().default("medium"),
  journey: varchar("journey", { length: 50 }).notNull().default("Logos"),
  explanation: text("explanation").notNull().default(""),
  cronicaDoGuardiao: text("cronica_do_guardiao").notNull().default(""),
  tags: jsonb("tags").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  hasImage: boolean("has_image").notNull().default(false),
  imageMode: varchar("image_mode", { length: 25 }).notNull().default("none"),
  imageUrl: text("image_url"),
  imagePrompt: text("image_prompt"),
  imageAlt: varchar("image_alt", { length: 300 }),
  image: text("image"), // campo legado
  metadataJson: jsonb("metadata_json").notNull().default({}),
});

export const quizQuestions = pgTable("quiz_questions", {
  ...baseQuestionColumns(),
  source: varchar("source", { length: 20 }).notNull().default("manual"),
});

export const quizQuestionsGenerated = pgTable("quiz_questions_generated", {
  ...baseQuestionColumns(),
  aiModel: varchar("ai_model", { length: 50 }).notNull().default("gemini-2.0-flash"),
});

export const quizQuestionsVerified = pgTable("quiz_questions_verified", {
  ...baseQuestionColumns(),
  // FK legada para o auth_user do Django (integer). Sem .references() porque
  // a auth antiga será descartada; mantido só para leitura dos dados existentes.
  verifiedById: integer("verified_by_id"),
});

export const questionGenerationCache = pgTable(
  "desafio_dos_sabios_questiongenerationcache",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    topicId: bigint("topic_id", { mode: "number" })
      .notNull()
      .references(() => quizTopics.id),
    difficulty: varchar("difficulty", { length: 10 }).notNull(),
    generatedCount: integer("generated_count").notNull().default(0),
    lastGeneratedAt: timestamp("last_generated_at", { withTimezone: true }).notNull(),
  },
  (t) => [uniqueIndex("qgc_topic_difficulty_uq").on(t.topicId, t.difficulty)],
);

// ============================================================
// CONTEÚDO — Jogos (jogos_*)
// ============================================================

export const palavrasSpellingBee = pgTable("jogos_palavraspellingbee", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  palavra: varchar("palavra", { length: 100 }).notNull(),
  significado: text("significado").notNull(),
  ipa: varchar("ipa", { length: 100 }).notNull().default(""),
  exemplo: text("exemplo").notNull().default(""),
  serie: varchar("serie", { length: 10 }).notNull().default("2ano"),
  dificuldade: varchar("dificuldade", { length: 10 }).notNull().default("facil"),
});

export const palavrasRadix = pgTable("jogos_palavraradix", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  palavra: varchar("palavra", { length: 100 }).notNull(),
  significado: text("significado").notNull().default(""),
  exemplo: text("exemplo").notNull().default(""),
  dificuldade: varchar("dificuldade", { length: 20 }).notNull().default("facil"),
});

export const jogos = pgTable("jogos_jogo", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  nome: varchar("nome", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  tipo: varchar("tipo", { length: 20 }).notNull(),
  descricao: text("descricao").notNull().default(""),
  dificuldade: varchar("dificuldade", { length: 20 }).notNull().default(""),
  ativo: boolean("ativo").notNull().default(true),
});

export const conquistas = pgTable("jogos_conquista", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  nome: varchar("nome", { length: 100 }).notNull(),
  descricao: text("descricao").notNull(),
  icone: varchar("icone", { length: 50 }).notNull(),
  pontosNecessarios: integer("pontos_necessarios").notNull().default(0),
  tipo: varchar("tipo", { length: 50 }).notNull(),
});

// ============================================================
// AUTH — profiles (NOVA, Fase 1)
// FK id → auth.users(id) é criada no SQL (supabase/migrations/0001_profiles.sql),
// pois a tabela auth.users vive no schema `auth`, fora do escopo do Drizzle public.
// ============================================================

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  serie: text("serie"),
  dataNascimento: date("data_nascimento"),
  role: text("role").notNull().default("student"),
  totalXp: integer("total_xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streakCount: integer("streak_count").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDate: date("last_active_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ============================================================
// GAMIFICAÇÃO — eventos (Fase 2, event-sourced)
// ============================================================

export const gameEvents = pgTable("game_events", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  userId: uuid("user_id").notNull(),
  game: text("game").notNull(),
  type: text("type").notNull(),
  payload: jsonb("payload").notNull().default({}),
  xpDelta: integer("xp_delta").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ============================================================
// COLEÇÃO — o que o aluno conquistou (Fase 3+4, migration 0006)
// O catálogo (quais orbes/medalhas/níveis existem) vive em src/lib/collection.ts.
// ============================================================

export const userOrbs = pgTable("user_orbs", {
  userId: uuid("user_id").notNull(),
  orbKey: text("orb_key").notNull(),
  rarity: text("rarity").notNull().default("terrestre"),
  obtainedAt: timestamp("obtained_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userAchievements = pgTable("user_achievements", {
  userId: uuid("user_id").notNull(),
  achievementKey: text("achievement_key").notNull(),
  unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userTitles = pgTable("user_titles", {
  userId: uuid("user_id").notNull(),
  titleKey: text("title_key").notNull(),
  equipped: boolean("equipped").notNull().default(false),
  obtainedAt: timestamp("obtained_at", { withTimezone: true }).notNull().defaultNow(),
});
