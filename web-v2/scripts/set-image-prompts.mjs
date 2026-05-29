// Popula a coluna image_prompt das questões do Desafio (padrão Antigravity).
// Casa por TEXTO da pergunta (data/quiz_questions.json). Idempotente.
// Uso: npm run db:image-prompts
import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const STYLE =
  "Ilustração digital pintada à mão, estilo épico-clássico para crianças, " +
  "atmosfera de educação cristã clássica. Paleta azul-marinho profundo com " +
  "destaques dourados e toques de azul celeste. Iluminação dramática suave, " +
  "nobre e acolhedora. Composição panorâmica 16:9, foco central, leve vinheta. " +
  "Sem nenhum texto na imagem. Alta qualidade, apropriado para crianças.";

const PROMPTS = {
  Q001: "A primeira civilização europeia surgindo na ilha de Creta, ilha verdejante cercada pelo mar Egeu turquesa.",
  Q002: "O lendário rei Minos em seu trono no palácio de Cnossos.",
  Q003: "Cidade minoica construída na costa, casas claras à beira-mar com pequenos barcos.",
  Q004: "Rota de comércio marítimo minoica ligando Creta ao Egito e à Síria, com navios mercantes.",
  Q005: "Oficina minoica de cerâmica colorida, vasos pintados com polvos e ondas.",
  Q006: "Tumba minoica com oferendas e bens preparados para a vida além da morte.",
  Q007: "Cena simbólica e serena de vida após a morte na cultura minoica, luz suave.",
  Q008: "Afresco do salto do touro (taurocatapsia), atleta saltando sobre um grande touro.",
  Q009: "Tabuleta de argila gravada com a escrita Linear A minoica.",
  Q010: "Vista da cidade de Micenas sobre a colina ao entardecer.",
  Q011: "Guerreiros micênicos desembarcando para conquistar Creta por volta de 1450 a.C.",
  Q012: "Exército militarista micênico em formação, com lanças e escudos de bronze.",
  Q013: "Cidadela fortificada protegendo a cidade de Micenas.",
  Q014: "O famoso Portão dos Leões de Micenas em destaque.",
  Q015: "Armas de bronze encontradas em tumbas micênicas, dispostas como tesouro.",
  Q016: "O poeta Homero recitando a Ilíada à luz de tochas.",
  Q017: "Batalha épica da Guerra de Troia sob as muralhas da cidade.",
  Q018: "Páris levando Helena por um porto, com navios ao fundo.",
  Q019: "Odisseu arquitetando o plano do Cavalo de Troia, com rolos de planos.",
  Q020: "Soldados gregos escondidos dentro do cavalo de madeira, vista em corte.",
  Q021: "O longo cerco de dez anos a Troia, acampamento grego diante das muralhas.",
  Q022: "O rei Menelau de Esparta, esposo de Helena, com manto real.",
  Q023: "Agamenon, rei de Argos, com coroa e manto, expressão de comando.",
  Q024: "A terra de Canaã, com um vilarejo fenício na costa do Levante.",
  Q025: "Navegadores e comerciantes fenícios partindo ao mar em navios de vela.",
  Q026: "Colheita do múrice e tingimento de tecidos com o famoso corante púrpura.",
  Q027: "Escriba fenício criando o alfabeto, gravando símbolos em pedra.",
  Q028: "O alfabeto fenício influenciando alfabetos posteriores, símbolos antigos.",
  Q029: "Alfabeto fenício composto sobretudo de consoantes, com poucas vogais.",
  Q030: "Friso cronológico em sequência: palácio minoico, cidadela micênica, cavalo de Troia e navio fenício.",
  Q031: "O touro sagrado minoico, majestoso, como motivo central de arte.",
  Q032: "Talassocracia minoica: frota dominando os mares do Egeu.",
  Q033: "A Deusa-Mãe minoica segurando serpentes, figura reverente.",
  Q034: "Cidade minoica aberta e pacífica, sem grandes muralhas de defesa.",
};

const root = path.resolve(process.cwd(), "..");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL ausente.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });
try {
  const quiz = JSON.parse(
    await readFile(path.join(root, "data", "quiz_questions.json"), "utf8"),
  );
  let updated = 0;
  let missing = 0;
  for (const item of quiz) {
    const subject = PROMPTS[item.id];
    if (!subject) {
      missing++;
      continue;
    }
    const full = `${STYLE} Cena: ${subject}`;
    const res = await sql`
      update public.quiz_questions
         set image_prompt = ${full}, image_mode = 'generated_asset'
       where question = ${item.question}`;
    updated += res.count;
  }
  console.log(`✓ image_prompt definido em ${updated} questões (sem prompt: ${missing}).`);
} catch (err) {
  console.error("✗ Falha:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
