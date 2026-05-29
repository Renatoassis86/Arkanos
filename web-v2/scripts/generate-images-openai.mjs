// Gera as ilustrações do Desafio usando a API DALL-E 3 da OpenAI (via OPENAI_API_KEY).
// Uso: node --env-file=.env.local scripts/generate-images-openai.mjs
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const STYLE =
  "Digital hand-painted classic illustration for children, classical Christian education atmosphere. " +
  "Deep navy blue palette with golden highlights and sky blue touches. Soft, noble, and welcoming dramatic lighting. " +
  "Panoramic composition 16:9, central focus, subtle vignette. NO TEXT OR LETTERS in the image. High quality, appropriate for children.";

const NEGATIVE =
  "text, letters, words, watermark, logos, graphic violence, deformed faces, modern anachronistic elements, skin photorealism.";

const TOPICS = {
  minoica: "Palace of Knossos in Crete, dolphin frescoes, bull leaping, ships in the turquoise Aegean sea.",
  micenica: "Citadel of Mycenae, cyclopean walls, and Lion Gate at sunset.",
  troia: "The wooden Trojan Horse standing before the walls of Troy at dawn, Greek ships in the background.",
  fenicios: "Phoenician ship with a purple sail sailing on the Mediterranean, ancient alphabet carved on a stone block.",
  linha_tempo: "Epic historical timeline frieze featuring a Minoan palace, Mycenaean citadel, Trojan horse, and Phoenician galley ship."
};

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const buffer = await res.arrayBuffer();
  await writeFile(destPath, Buffer.from(buffer));
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("✗ Erro: OPENAI_API_KEY não localizada no ambiente.");
    process.exit(1);
  }

  const outputDir = path.join(process.cwd(), "public", "img", "quiz");
  await mkdir(outputDir, { recursive: true });

  console.log("============================================================");
  console.log(`Iniciando geração de 5 imagens via OpenAI DALL-E 3`);
  console.log(`Destino: ${outputDir}`);
  console.log("============================================================");

  for (const [key, scenePrompt] of Object.entries(TOPICS)) {
    const filename = `${key}.png`;
    const destPath = path.join(outputDir, filename);
    const fullPrompt = `${STYLE} Scene: ${scenePrompt}. Negative prompt: ${NEGATIVE}`;

    console.log(`-> Gerando '${filename}' usando DALL-E 3...`);
    
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1792x1024",
          quality: "standard"
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`   Erro na API da OpenAI (Status: ${response.status}): ${errText}`);
        continue;
      }

      const resData = await response.json();
      const imageUrl = resData.data?.[0]?.url;

      if (!imageUrl) {
        console.error("   Erro: URL da imagem não encontrada na resposta.");
        continue;
      }

      await downloadImage(imageUrl, destPath);
      console.log(`   Sucesso! Salvo em public/img/quiz/${filename}`);
    } catch (err) {
      console.error(`   Erro inesperado para ${filename}: ${err.message}`);
    }
  }

  console.log("============================================================");
  console.log("Processo de geração da OpenAI concluído!");
  console.log("============================================================");
}

main().catch((err) => {
  console.error("✗ Falha fatal:", err.message);
  process.exitCode = 1;
});
