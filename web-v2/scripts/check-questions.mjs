import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

try {
  const counts = await sql`
    select 
      g.name as grade,
      s.name as subject,
      a.name as assessment,
      a.trimestre,
      count(q.id) as count
    from public.quiz_questions q
    join public.quiz_topics t on q.topic_id = t.id
    join public.quiz_assessments a on t.assessment_id = a.id
    join public.quiz_subjects s on a.subject_id = s.id
    join public.quiz_grades g on a.grade_id = g.id
    group by g.name, s.name, a.name, a.trimestre
    order by g.name, s.name, a.name, a.trimestre
  `;
  console.log("Database Quiz Question Counts:");
  console.table(counts);
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
