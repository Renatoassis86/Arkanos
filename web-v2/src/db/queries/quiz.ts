import { eq, inArray, and } from "drizzle-orm";
import { db } from "@/db/client";
import {
  quizSubjects,
  quizTopics,
  quizQuestions,
  quizAssessments,
  quizGrades,
} from "@/db/schema";

/** Lista todas as disciplinas (smoke test de conexão + leitura). */
export async function listSubjects() {
  return db.select().from(quizSubjects).orderBy(quizSubjects.name);
}

export async function listAssessments() {
  return db.select().from(quizAssessments).orderBy(quizAssessments.name);
}

export type DesafioQuestion = {
  id: number;
  question: string;
  options: string[] | null;
  answer: string;
  type: string;
  difficulty: string;
  explanation: string;
  cronica: string;
  subject: string;
  topic: string;
  imageUrl: string | null;
  imageAlt: string | null;
};

/** Questões jogáveis (inclui os tipos visuais) com disciplina, tópico e imagem. */
export async function listDesafioQuestions(limit = 30, assessmentId?: number): Promise<DesafioQuestion[]> {
  const rows = await db
    .select({
      id: quizQuestions.id,
      question: quizQuestions.question,
      options: quizQuestions.options,
      answer: quizQuestions.answer,
      type: quizQuestions.type,
      difficulty: quizQuestions.difficulty,
      explanation: quizQuestions.explanation,
      cronica: quizQuestions.cronicaDoGuardiao,
      subject: quizSubjects.name,
      topic: quizTopics.name,
      imageUrl: quizQuestions.imageUrl,
      imageLegacy: quizQuestions.image,
      imageAlt: quizQuestions.imageAlt,
    })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizSubjects, eq(quizTopics.subjectId, quizSubjects.id))
    .where(
      and(
        inArray(quizQuestions.type, [
          "multiple_choice",
          "image_multiple_choice",
          "true_false",
          "map_analysis",
          "diagram_analysis",
          "visual_interpretation",
        ]),
        assessmentId ? eq(quizTopics.assessmentId, assessmentId) : undefined
      )
    )
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    question: r.question,
    options: r.options as string[] | null,
    answer: r.answer,
    type: r.type,
    difficulty: r.difficulty,
    explanation: r.explanation,
    cronica: r.cronica,
    subject: r.subject,
    topic: r.topic,
    imageUrl: r.imageUrl ?? r.imageLegacy ?? null,
    imageAlt: r.imageAlt,
  }));
}

// ============================================================
// Navegação em cascata dos bancos (só caminhos com questões reais):
// Disciplina → Série → Trimestre → Prova
// ============================================================

export async function listBankSubjects() {
  return db
    .selectDistinct({ id: quizSubjects.id, name: quizSubjects.name })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
    .innerJoin(quizSubjects, eq(quizAssessments.subjectId, quizSubjects.id))
    .orderBy(quizSubjects.name);
}

export async function listBankGrades(subjectId: number) {
  return db
    .selectDistinct({ id: quizGrades.id, name: quizGrades.name })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
    .innerJoin(quizGrades, eq(quizAssessments.gradeId, quizGrades.id))
    .where(eq(quizAssessments.subjectId, subjectId))
    .orderBy(quizGrades.name);
}

export async function listBankTrimestres(subjectId: number, gradeId: number) {
  const rows = await db
    .selectDistinct({ trimestre: quizAssessments.trimestre })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
    .where(
      and(
        eq(quizAssessments.subjectId, subjectId),
        eq(quizAssessments.gradeId, gradeId),
      ),
    )
    .orderBy(quizAssessments.trimestre);
  return rows.map((r) => r.trimestre).filter((t): t is number => t != null);
}

export async function listBankProvas(
  subjectId: number,
  gradeId: number,
  trimestre: number,
) {
  return db
    .selectDistinct({ id: quizAssessments.id, name: quizAssessments.name })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
    .where(
      and(
        eq(quizAssessments.subjectId, subjectId),
        eq(quizAssessments.gradeId, gradeId),
        eq(quizAssessments.trimestre, trimestre),
      ),
    )
    .orderBy(quizAssessments.name);
}
