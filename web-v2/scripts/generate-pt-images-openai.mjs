// Gera ilustrações das 50 questões de português usando DALL-E 3
import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const NEGATIVE =
  "texto, letras, palavras, marca d'água, logos, violência gráfica, " +
  "rostos deformados, elementos modernos anacrônicos, fotorrealismo de pele, " +
  "3D, pixel art, cartoon americano, traço diferente.";

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const buffer = await res.arrayBuffer();
  await writeFile(destPath, Buffer.from(buffer));
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("✗ Erro: OPENAI_API_KEY não localizada.");
    process.exit(1);
  }

  const items = JSON.parse(await readFile(path.join(process.cwd(), "data", "3ano_t2_av1_portugues.json"), "utf8"));
  const outputDir = path.join(process.cwd(), "public", "img", "quiz", "3ano_t2_av1_pt");

  await mkdir(outputDir, { recursive: true });

  console.log("============================================================");
  console.log(`Iniciando geração de ${items.length} imagens de português via DALL-E 3`);
  console.log(`Destino: ${outputDir}`);
  console.log("============================================================");

  for (const it of items) {
    const filename = it.imagem.arquivo;
    const destPath = path.join(outputDir, filename);
    const fullPrompt = `${it.imagem.prompt}. Negative prompt: ${NEGATIVE}`;

    console.log(`-> Gerando '${filename}'...`);
    
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
      console.log(`   Sucesso! Salvo em public/img/quiz/3ano_t2_av1_pt/${filename}`);
    } catch (err) {
      console.error(`   Erro inesperado para ${filename}: ${err.message}`);
    }
  }

  console.log("============================================================");
  console.log("Processo concluído!");
  console.log("============================================================");
}

main().catch((err) => {
  console.error("✗ Falha fatal:", err.message);
  process.exitCode = 1;
});
