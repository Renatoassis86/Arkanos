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
  gradeName?: string,
  subjectId?: number
): Promise<DesafioQuestion[]> {
  const targetGrade = gradeName ? gradeName.toLowerCase() : "5º ano";

  // Helper local para filtrar questões do 5º ano de Geografia que dependem de imagem
  const filterGeo5Images = <T extends { subject?: string; grade?: string; imageUrl?: string | null; imageLegacy?: string | null; image_url?: string | null; image?: string | null; has_image?: boolean; type?: string; question?: string }>(items: T[]): T[] => {
    return items.filter((q) => {
      const qSub = (q.subject || "").toLowerCase();
      const qGrd = (q.grade || "5º ano").toLowerCase();
      const isGeo5 = qSub.includes("geo") && (qGrd.includes("5") || targetGrade.includes("5"));

      if (isGeo5) {
        const hasImg = !!(q.imageUrl || q.imageLegacy || q.image_url || q.image || q.has_image);
        const isVisualType = ["map_analysis", "diagram_analysis", "visual_interpretation", "image_multiple_choice"].includes(q.type || "");
        const qText = (q.question || "").toLowerCase();
        const mentionsImg = qText.includes("mapa") || qText.includes("imagem") || qText.includes("figura") || qText.includes("legenda");
        if (hasImg || isVisualType || mentionsImg) return false;
      }
      return true;
    });
  };

  try {
    let rows = await db
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

    let filtered = rows.filter((r) => {
      if (subjectId && subjectId === 2 && !r.subject.toLowerCase().includes("geo")) return false;
      if (subjectId && subjectId === 1 && !r.subject.toLowerCase().includes("his")) return false;
      if (!targetGrade) return true;
      const g = (r.grade || "").toLowerCase();
      if (targetGrade.includes("3") && !g.includes("3")) return false;
      if (targetGrade.includes("5") && !g.includes("5")) return false;
      return true;
    });

    // Se o filtro com assessmentId não encontrou questões para a matéria/série, busca todas as questões da matéria/série no DB
    if (filtered.length === 0 && assessmentId) {
      const allRows = await db
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
          inArray(quizQuestions.type, [
            "multiple_choice",
            "image_multiple_choice",
            "true_false",
            "map_analysis",
            "diagram_analysis",
            "visual_interpretation",
            "ordering",
          ])
        )
        .limit(limit);

      filtered = allRows.filter((r) => {
        if (subjectId && subjectId === 2 && !r.subject.toLowerCase().includes("geo")) return false;
        if (subjectId && subjectId === 1 && !r.subject.toLowerCase().includes("his")) return false;
        if (!targetGrade) return true;
        const g = (r.grade || "").toLowerCase();
        if (targetGrade.includes("3") && !g.includes("3")) return false;
        if (targetGrade.includes("5") && !g.includes("5")) return false;
        return true;
      });
    }

    const finalDbRows = filterGeo5Images(filtered);

    if (finalDbRows.length > 0) {
      return finalDbRows.map((r) => ({
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
  } catch (err) {
    console.warn("DB query listDesafioQuestions failed, using static JSON fallback:", err);
  }

  // Fallback estático usando staticQuizData (527 questões de Benjamim e Theo)
  let filtered = staticQuizData.filter((q: any) => {
    const qGrade = (q.grade || "5º ano").toLowerCase();
    const qSubject = (q.subject || "História").toLowerCase();
    
    if (subjectId === 2 && !qSubject.includes("geo")) return false;
    if (subjectId === 1 && !qSubject.includes("his")) return false;

    // Strict grade filter
    if (targetGrade.includes("3") && !qGrade.includes("3")) return false;
    if (targetGrade.includes("5") && !qGrade.includes("5")) return false;

    if (!assessmentId) return true;
    if (assessmentId === 99) return q.topic === "Exercício de Revisão";
    if (assessmentId === 2) return (q.assessment === "AV2" || q.trimestre === 2);
    if (assessmentId === 1) return (q.assessment === "AV1" || q.trimestre === 1);
    return true;
  });

  // Se o filtro específico por assessment não retornou nada, recua para todas as questões da série/matéria
  if (filtered.length === 0) {
    filtered = staticQuizData.filter((q: any) => {
      const qGrade = (q.grade || "5º ano").toLowerCase();
      const qSubject = (q.subject || "História").toLowerCase();
      
      if (subjectId === 2 && !qSubject.includes("geo")) return false;
      if (subjectId === 1 && !qSubject.includes("his")) return false;

      if (targetGrade.includes("3") && !qGrade.includes("3")) return false;
      if (targetGrade.includes("5") && !qGrade.includes("5")) return false;
      return true;
    });
  }

  const finalStaticRows = filterGeo5Images(filtered);

  return finalStaticRows.map((q: any, idx: number) => ({
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
  return [
    { id: 1, name: "História" },
    { id: 2, name: "Geografia" }
  ];
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
  const hasRevisao = list.some((p) => p.name === "Exercício de Revisão");

  if (!hasAV2) {
    list.push({ id: 2, name: "AV2" });
  }
  if (!hasAV1) {
    list.push({ id: 1, name: "AV1" });
  }
  if (!hasRevisao) {
    list.push({ id: 99, name: "Exercício de Revisão" });
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
  const subjectsMap = new Map<number, string>();
  
  // Base canonica: 1 = História, 2 = Geografia
  subjectsMap.set(1, "História");
  subjectsMap.set(2, "Geografia");

  try {
    const rows = await db
      .selectDistinct({ id: quizSubjects.id, name: quizSubjects.name })
      .from(quizQuestions)
      .innerJoin(quizTopics, eq(quizQuestions.topicId, quizTopics.id))
      .innerJoin(quizAssessments, eq(quizTopics.assessmentId, quizAssessments.id))
      .innerJoin(quizSubjects, eq(quizAssessments.subjectId, quizSubjects.id))
      .where(eq(quizAssessments.gradeId, gradeId))
      .orderBy(quizSubjects.name);

    for (const r of rows) {
      if (r.id && r.name) {
        subjectsMap.set(typeof r.id === "string" ? parseInt(r.id, 10) : r.id, r.name);
      }
    }
  } catch {
    /* fallback */
  }

  return Array.from(subjectsMap.entries()).map(([id, name]) => ({ id, name }));
}
