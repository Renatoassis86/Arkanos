import { listBankSubjectsForGrade } from "../src/db/queries/quiz";

async function run() {
  const subjects1 = await listBankSubjectsForGrade(1);
  console.log("Grade 1 Subjects:", subjects1);

  const subjects2 = await listBankSubjectsForGrade(2);
  console.log("Grade 2 Subjects:", subjects2);
}

run().catch(console.error);
