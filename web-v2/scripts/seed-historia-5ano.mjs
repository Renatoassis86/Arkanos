// Seed/importador — História · 5º Ano · 2º Trimestre · AV1 (Desafio dos Sábios).
// 1) reconhece a imagem de cada questão (mapa SRC abaixo), otimiza p/ webp com nome padronizado;
// 2) importa as questões no banco (quiz_*) vinculando image_url;
// 3) valida e imprime relatório.
// Uso: node --env-file=.env.local scripts/seed-historia-5ano.mjs
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";
import sharp from "sharp";

const DATA = "data/5ano_t2_av1_historia.json";
const IMG_DIR = "public/img/quiz/5ano_t2_av1_historia";
const URL_BASE = "/img/quiz/5ano_t2_av1_historia/";
const ANO = "5º ano", DISC = "História", PROVA = "AV1", TRIM = 2;

// Reconhecimento visual: número da questão -> índice da imagem na folha de contato.
const SRC = {
  // q01-20 (colonização): cruz/litoral, pau-brasil, caravelas, Martim Afonso, São Vicente,
  // porto, sesmarias, mapa-capitanias, donatário, função, Pernambuco, governo, Tomé de Sousa,
  // Salvador, capital, jesuítas, catequese, Anchieta, indígenas, ocas.
  1: 0, 2: 1, 3: 2, 4: 5, 5: 3, 6: 7, 7: 15, 8: 16, 9: 11, 10: 8,
  11: 13, 12: 10, 13: 9, 14: 12, 15: 6, 16: 18, 17: 17, 18: 43, 19: 19, 20: 31,
  // q21-40 (bandeiras, indígenas, jesuítas, Anchieta)
  21: 21, 22: 37, 23: 27, 24: 39, 25: 40, 26: 23, 27: 29, 28: 22, 29: 32, 30: 41,
  31: 44, 32: 45, 33: 55, 34: 48, 35: 46, 36: 57, 37: 58, 38: 47, 39: 33, 40: 56,
};

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
const pad2 = (n) => String(n).padStart(2, "0");
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

async function ensure(sel, ins) {
  const f = await sel; if (f.length) return f[0].id;
  return (await ins)[0].id;
}

const report = { total: 0, vinculadas: 0, semImagem: [], orfas: [], contagem: [], criadas: 0, atualizadas: 0, erros: [] };

try {
  const items = JSON.parse(await readFile(DATA, "utf8"));
  report.total = items.length;

  // arquivos-fonte (PNGs brutos) ordenados — mesma ordem da folha de contato
  const raw = (await readdir(IMG_DIR)).filter((f) => /\.png$/i.test(f)).sort();
  const usados = new Set();

  // ---- 1) otimizar/renomear imagens reconhecidas ----
  for (const it of items) {
    const target = (typeof it.imagem === "string" ? it.imagem : it.imagem?.arquivo).replace(/\.png$/i, ".webp");
    const srcIdx = SRC[it.numero];
    if (srcIdx == null || !raw[srcIdx]) { report.semImagem.push(it.numero); continue; }
    usados.add(raw[srcIdx]);
    const out = path.join(IMG_DIR, target);
    await sharp(path.join(IMG_DIR, raw[srcIdx]))
      .resize({ width: 1024, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    it._url = URL_BASE + target;
    it._alt = `Ilustração histórica: ${it.tema}.`;
  }
  report.orfas = raw.filter((f) => !usados.has(f)); // imagens não vinculadas (extras q01-q20 + duplicatas)

  // ---- 2) importar no banco ----
  const gradeId = await ensure(sql`select id from public.quiz_grades where name=${ANO} limit 1`, sql`insert into public.quiz_grades (name) values (${ANO}) returning id`);
  const subjectId = await ensure(sql`select id from public.quiz_subjects where name=${DISC} limit 1`, sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`);
  const assessmentId = await ensure(
    sql`select id from public.quiz_assessments where name=${PROVA} and grade_id=${gradeId} and subject_id=${subjectId} and trimestre is not distinct from ${TRIM} limit 1`,
    sql`insert into public.quiz_assessments (name, grade_id, subject_id, trimestre) values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id`,
  );

  for (const it of items) {
    try {
      if (!it._url) continue; // sem imagem -> não importa (regra: nenhuma questão sem imagem)
      const topicId = await ensure(
        sql`select id from public.quiz_topics where subject_id=${subjectId} and grade_id=${gradeId} and assessment_id=${assessmentId} and name=${it.tema} limit 1`,
        sql`insert into public.quiz_topics (subject_id, grade_id, assessment_id, name) values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id`,
      );
      const alts = ["A", "B", "C", "D"].map((k) => it.alternativas[k]).filter((v) => v != null);
      const answer = it.alternativas[it.respostaCorreta] ?? "";
      const cont = it.imagem?.quantidadeEsperada ?? null;
      const meta = { id_original: it.id, numero: it.numero, tipo: it.tipo, tema: it.tema, avaliacao: "AV1 - 2º Trimestre", ano: ANO, guardiao: "aion", contagem: cont, tags: it.imagem?.tags ?? [] };

      const dup = await sql`select id from public.quiz_questions where metadata_json->>'id_original'=${it.id} limit 1`;
      if (dup.length) {
        await sql`update public.quiz_questions set
            question=${it.enunciado}, options=${sql.json(alts)}, answer=${answer},
            cronica_do_guardiao=${it.cronicaAion || ""}, has_image=true, image_mode='real',
            image_url=${it._url}, image_alt=${it._alt}, metadata_json=${sql.json(meta)}
          where id=${dup[0].id}`;
        report.atualizadas++;
      } else {
        await sql`insert into public.quiz_questions
            (topic_id, question, options, answer, type, difficulty, explanation,
             cronica_do_guardiao, has_image, image_mode, image_url, image_alt, source, metadata_json)
          values (${topicId}, ${it.enunciado}, ${sql.json(alts)}, ${answer}, 'multiple_choice', 'medium', '',
             ${it.cronicaAion || ""}, true, 'real', ${it._url}, ${it._alt}, 'manual', ${sql.json(meta)})`;
        report.criadas++;
      }
      report.vinculadas++;
      // coerência de contagem (verificação manual recomendada — imagem gerada por IA)
      if (cont != null) report.contagem.push({ q: it.numero, tema: it.tema, esperado: cont, resposta: answer });
    } catch (e) {
      report.erros.push({ q: it.numero, error: e.message });
    }
  }

  // ---- 3) validações ----
  const targets = items.filter((i) => i._url).map((i) => i._url);
  const dupTargets = targets.filter((t, i) => targets.indexOf(t) !== i);
  for (const it of items) {
    if (it._url && !(await exists(path.join("public", it._url.replace(/^\//, "")).replace("public/img", "public/img")))) {
      report.semImagem.push(it.numero);
    }
  }

  // ---- relatório ----
  console.log("\n================ RELATÓRIO — História 5º Ano · T2 · AV1 ================");
  console.log(`Questões no arquivo .............. ${report.total}`);
  console.log(`Questões importadas .............. ${report.criadas} criadas, ${report.atualizadas} atualizadas`);
  console.log(`Imagens vinculadas ............... ${report.vinculadas}`);
  console.log(`Questões SEM imagem .............. ${report.semImagem.length ? report.semImagem.join(", ") : "nenhuma ✓"}`);
  console.log(`Imagens órfãs (não usadas) ....... ${report.orfas.length} (extras/duplicatas — não impactam o banco)`);
  console.log(`Imagens-alvo duplicadas .......... ${dupTargets.length ? dupTargets.join(", ") : "nenhuma ✓"}`);
  console.log(`Questões de CONTAGEM (conferir) .. ${report.contagem.length}`);
  for (const c of report.contagem) console.log(`   • q${c.q} (${c.tema}): a imagem deve conter ${c.esperado} — resposta correta = "${c.resposta}"`);
  if (report.erros.length) console.log(`ERROS:\n${JSON.stringify(report.erros, null, 2)}`);
  console.log("=======================================================================\n");
} catch (e) {
  console.error("✗ Falha:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
