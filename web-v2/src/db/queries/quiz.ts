import { eq, inArray, and, or, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import {
  quizSubjects,
  quizTopics,
  quizQuestions,
  quizAssessments,
  quizGrades,
} from "@/db/schema";
import staticQuizData from "@/data/quiz_questions.json";

/** Lista todas as disciplinas (smoke test de conexão + leitura). */
export async function listSubjects() {
  try {
    const rows = await db.select().from(quizSubjects).orderBy(quizSubjects.name);
    if (rows.length > 0) return rows;
  } catch {
    // fallback
  }
  return [{ id: 1, name: "História", createdAt: new Date() }];
}

export async function listAssessments() {
  try {
    const rows = await db.select().from(quizAssessments).orderBy(quizAssessments.name);
    if (rows.length > 0) return rows;
  } catch {
    // fallback
  }
  return [{ id: 2, name: "AV2", gradeId: 1, subjectId: 1, trimestre: 2, createdAt: new Date() }];
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
export async function listDesafioQuestions(
  limit = 500, 
  assessmentId?: number,
  gradeName?: string
): Promise<DesafioQuestion[]> {
  try {
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
        grade: quizGrades.name,
      })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizSubjects, eq(quizTopics.subjectId, quizSubjects.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .innerJoin(quizGrades, eq(quizAssessments.gradeId, quizGrades.id))
      .where(
        and(
          inArray(quizQuestions.type, [
            "multiple_choice",
            "image_multiple_choice",
            "true_false",
            "map_analysis",
            "diagram_analysis",
            "visual_interpretation",
            "ordering",
          ]),
          assessmentId ? eq(quizTopics.assessmentId, assessmentId) : undefined
        )
      )
      .limit(limit);

    if (rows.length > 0) {
      const targetGrade = gradeName ? gradeName.toLowerCase() : "";
      const filtered = rows.filter((r) => {
        if (!targetGrade) return true;
        const g = (r.grade || "").toLowerCase();
        if (targetGrade.includes("3") && !g.includes("3")) return false;
        if (targetGrade.includes("5") && !g.includes("5")) return false;
        return true;
      });

      if (filtered.length > 0) {
        return filtered.map((r) => ({
          id: typeof r.id === "string" ? parseInt(r.id, 10) || 1 : r.id,
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
    }
  } catch (err) {
    console.warn("DB query listDesafioQuestions failed, using static JSON fallback:", err);
  }

  // Fallback estático usando staticQuizData (160 questões exclusivas de Benjamim e Theo)
  const targetGrade = gradeName ? gradeName.toLowerCase() : "5º ano";

  const filtered = staticQuizData.filter((q: any) => {
    const qGrade = (q.grade || "5º ano").toLowerCase();
    
    // Strict grade filter
    if (targetGrade.includes("3") && !qGrade.includes("3")) return false;
    if (targetGrade.includes("5") && !qGrade.includes("5")) return false;

    if (!assessmentId) return true;
    if (assessmentId === 2) return (q.assessment === "AV2" || q.trimestre === 2);
    if (assessmentId === 1) return (q.assessment === "AV1" || q.trimestre === 1);
    return true;
  });

  return filtered.map((q: any, idx: number) => ({
    id: idx + 1,
    question: q.question,
    options: q.options || null,
    answer: String(q.answer),
    type: q.type || "multiple_choice",
    difficulty: q.difficulty || "medium",
    explanation: q.explanation || "",
    cronica: q.cronica_do_guardiao || "",
    subject: q.subject || "História",
    topic: q.topic || "Geral",
    imageUrl: q.image_url || null,
    imageAlt: q.image_alt || null,
  }));
}

// ============================================================
// Navegação em cascata dos bancos (só caminhos com questões reais):
// Disciplina → Série → Trimestre → Prova
// ============================================================

export async function listBankSubjects() {
  try {
    const rows = await db
      .selectDistinct({ id: quizSubjects.id, name: quizSubjects.name })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .innerJoin(quizSubjects, eq(quizAssessments.subjectId, quizSubjects.id))
      .orderBy(quizSubjects.name);
    if (rows.length > 0) return rows;
  } catch {
    // fallback
  }
  return [{ id: 1, name: "História" }];
}

export async function listBankGrades(subjectId: number) {
  try {
    const rows = await db
      .selectDistinct({ id: quizGrades.id, name: quizGrades.name })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .innerJoin(quizGrades, eq(quizAssessments.gradeId, quizGrades.id))
      .where(eq(quizAssessments.subjectId, subjectId))
      .orderBy(quizGrades.name);
    if (rows.length > 0) return rows;
  } catch {
    // fallback
  }
  return [{ id: 1, name: "5º ano" }, { id: 2, name: "3º ano" }];
}

export async function listBankTrimestres(subjectId: number, gradeId: number) {
  try {
    const rows = await db
      .selectDistinct({ trimestre: quizAssessments.trimestre, name: quizAssessments.name })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .where(
        and(
          eq(quizAssessments.subjectId, subjectId),
          eq(quizAssessments.gradeId, gradeId),
        ),
      );

    if (rows.length > 0) {
      const trimestres = new Set<number>();
      for (const r of rows) {
        if (r.trimestre) {
          trimestres.add(r.trimestre);
        } else if (r.name.includes("AV2") || r.name.includes("2")) {
          trimestres.add(2);
        } else if (r.name.includes("AV1") || r.name.includes("1")) {
          trimestres.add(1);
        } else {
          trimestres.add(2);
        }
      }
      return Array.from(trimestres);
    }
  } catch {
    // fallback
  }
  return [1, 2, 3];
}

export async function listBankProvas(
  subjectId: number,
  gradeId: number,
  trimestre: number,
) {
  let list: { id: number; name: string }[] = [];
  try {
    const rows = await db
      .selectDistinct({ id: quizAssessments.id, name: quizAssessments.name })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .where(
        and(
          eq(quizAssessments.subjectId, subjectId),
          eq(quizAssessments.gradeId, gradeId),
        ),
      )
      .orderBy(quizAssessments.name);

    list = rows.map((r) => ({
      id: typeof r.id === "string" ? parseInt(r.id, 10) || 1 : r.id,
      name: r.name,
    }));
  } catch (err) {
    console.warn("DB query listBankProvas failed, using fallback list:", err);
  }

  const hasAV2 = list.some((p) => p.name === "AV2");
  const hasAV1 = list.some((p) => p.name === "AV1");

  if (!hasAV2) {
    list.push({ id: 2, name: "AV2" });
  }
  if (!hasAV1) {
    list.push({ id: 1, name: "AV1" });
  }

  return list;
}

/** Resolve o id da série (quiz_grades) pelo nome (ex.: "3º ano"). */
export async function getGradeIdByName(name: string): Promise<number | null> {
  if (!name) return 1;
  const cleanName = name.trim().toLowerCase();

  try {
    const allGrades = await db
      .select({ id: quizGrades.id, name: quizGrades.name })
      .from(quizGrades);

    if (allGrades.length > 0) {
      let found = allGrades.find((g) => g.name.toLowerCase() === cleanName);
      if (found) return found.id;

      if (cleanName.includes("5")) {
        found = allGrades.find((g) => g.name.includes("5"));
        if (found) return found.id;
      }
      if (cleanName.includes("3")) {
        found = allGrades.find((g) => g.name.includes("3"));
        if (found) return found.id;
      }
      return allGrades[0]?.id ?? 1;
    }
  } catch {
    // fallback
  }

  if (cleanName.includes("3")) return 2;
  return 1;
}

/** Disciplinas com questões para uma série específica. */
export async function listBankSubjectsForGrade(gradeId: number) {
  return db
    .selectDistinct({ id: quizSubjects.id, name: quizSubjects.name })
    .from(quizQuestions)
    .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
    .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
    .innerJoin(quizSubjects, eq(quizAssessments.subjectId, quizSubjects.id))
    .where(eq(quizAssessments.gradeId, gradeId))
    .orderBy(quizSubjects.name);
}
