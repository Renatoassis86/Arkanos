// Gera as ilustrações do Desafio usando a API REST do Gemini Imagen 3.
// Uso: node --env-file=.env.local scripts/generate-images.mjs [--mode topics|questions]
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const STYLE =
  "Ilustração digital pintada à mão, estilo épico-clássico para crianças, " +
  "atmosfera de educação cristã clássica. Paleta azul-marinho profundo com " +
  "destaques dourados e toques de azul celeste. Iluminação dramática suave, " +
  "nobre e acolhedora. Composição panorâmica 16:9, foco central, leve vinheta. " +
  "Sem nenhum texto na imagem. Alta qualidade, apropriado para crianças.";

const NEGATIVE =
  "texto, letras, palavras, marca d'água, logos, violência gráfica, " +
  "rostos deformados, elementos modernos anacrônicos, fotorrealismo de pele.";

const TOPICS = {
  minoica: "Palácio de Cnossos em Creta, afrescos de golfinhos e salto do touro, navios no Egeu.",
  micenica: "Cidadela de Micenas, muralhas ciclópicas e Portão dos Leões ao entardecer.",
  troia: "O Cavalo de Troia diante das muralhas ao amanhecer, navios gregos.",
  fenicios: "Navio fenício de vela púrpura no Mediterrâneo, alfabeto gravado em pedra.",
  linha_tempo: "Friso cronológico em sequência: palácio minoico, cidadela micênica, cavalo de Troia e navio fenício."
};

const QUESTIONS = {
  q001: "A primeira civilização europeia surgindo na ilha de Creta, ilha verdejante cercada pelo mar Egeu turquesa.",
  q002: "O lendário rei Minos em seu trono no palácio de Cnossos.",
  q003: "Cidade minoica construída na costa, casas claras à beira-mar com pequenos barcos.",
  q004: "Rota de comércio marítimo minoica ligando Creta ao Egito e à Síria, com navios mercantes.",
  q005: "Oficina minoica de cerâmica colorida, vasos pintados com polvos e ondas.",
  q006: "Tumba minoica com oferendas e bens preparados para a vida além da morte.",
  q007: "Cena simbólica e serena de vida após a morte na cultura minoica, luz suave.",
  q008: "Afresco do salto do touro (taurocatapsia), atleta saltando sobre um grande touro.",
  q009: "Tabuleta de argila gravada com a escrita Linear A minoica.",
  q010: "Vista da cidade de Micenas sobre a colina ao entardecer.",
  q011: "Guerreiros micênicos desembarcando para conquistar Creta por volta de 1450 a.C.",
  q012: "Exército militarista micênico em formação, com lanças e escudos de bronze.",
  q013: "Cidadela fortificada protegendo a cidade de Micenas.",
  q014: "O famoso Portão dos Leões de Micenas em destaque.",
  q015: "Armas de bronze encontradas em tumbas micênicas, dispostas como tesouro.",
  q016: "O poeta Homero recitando a Ilíada à luz de tochas.",
  q017: "Batalha épica da Guerra de Troia sob as muralhas da cidade.",
  q018: "Páris levando Helena por um porto, com navios ao fundo.",
  q019: "Odisseu arquitetando o plano do Cavalo de Troia, com rolos de planos.",
  q020: "Soldados gregos escondidos dentro do cavalo de madeira, vista em corte.",
  q021: "O longo cerco de dez anos a Troia, acampamento grego diante das muralhas.",
  q022: "O rei Menelau de Esparta, esposo de Helena, com manto real.",
  q023: "Agamenon, rei de Argos, com coroa e manto, expressão de comando.",
  q024: "A terra de Canaã, com um vilarejo fenício na costa do Levante.",
  q025: "Navegadores e comerciantes fenícios partindo ao mar em navios de vela.",
  q026: "Colheita do múrice e tingimento de tecidos com o famoso corante púrpura.",
  q027: "Escriba fenício criando o alfabeto, gravando símbolos em pedra.",
  q028: "O alfabeto fenício influenciando alfabetos posteriores, símbolos antigos.",
  q029: "Alfabeto fenício composto sobretudo de consoantes, com poucas vogais.",
  q030: "Friso cronológico em sequência: palácio minoico, cidadela micênica, cavalo de Troia e navio fenício.",
  q031: "O touro sagrado minoico, majestoso, como motivo central de arte.",
  q032: "Talassocracia minoica: frota dominando os mares do Egeu.",
  q033: "A Deusa-Mãe minoica segurando serpentes, figura reverente.",
  q034: "Cidade minoica aberta e pacífica, sem grandes muralhas de defesa."
};

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("✗ Erro: GEMINI_API_KEY não localizada.");
    console.error("  Certifique-se de configurar a variável GEMINI_API_KEY no seu arquivo .env.local.");
    process.exit(1);
  }

  // Identifica modo das flags: --mode topics ou --mode questions
  const args = process.argv.slice(2);
  let mode = "topics";
  if (args.includes("--mode")) {
    const idx = args.indexOf("--mode");
    if (idx + 1 < args.length) {
      mode = args[idx + 1];
    }
  }

  const items = mode === "questions" ? QUESTIONS : TOPICS;
  const outputDir = path.join(process.cwd(), "public", "img", "quiz");

  await mkdir(outputDir, { recursive: true });

  console.log("============================================================");
  console.log(`Iniciando geração de ${Object.keys(items).length} imagens no modo '${mode.toUpperCase()}'`);
  console.log(`Destino: ${outputDir}`);
  console.log("============================================================");

  for (const [key, scenePrompt] of Object.entries(items)) {
    const filename = `${key}.webp`;
    const fullPrompt = `${STYLE} Cena: ${scenePrompt}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    const payload = {
      instances: [{ prompt: fullPrompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
        outputMimeType: "image/webp",
        negativePrompt: NEGATIVE
      }
    };

    try {
      process.stdout.write(`-> Gerando '${filename}'... `);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        console.log(`erro HTTP! Status: ${res.status}`);
        console.error(`   Detalhes: ${text}`);
        continue;
      }

      const data = await res.json();
      const predictions = data.predictions || [];
      if (predictions.length === 0) {
        console.log("erro! Nenhuma imagem retornada.");
        continue;
      }

      const pred = predictions[0];
      const b64 = pred.bytesBase64Encoded || (pred.image && pred.image.imageBytes);
      if (!b64) {
        console.log("erro! Bytes da imagem não localizados no retorno.");
        continue;
      }

      const buffer = Buffer.from(b64, "base64");
      await writeFile(path.join(outputDir, filename), buffer);
      console.log("sucesso!");
    } catch (err) {
      console.log(`erro inesperado: ${err.message}`);
    }
  }

  console.log("============================================================");
  console.log("Processo de geração concluído!");
  console.log("============================================================");
}

main().catch((err) => {
  console.error("✗ Falha fatal:", err.message);
  process.exitCode = 1;
});
