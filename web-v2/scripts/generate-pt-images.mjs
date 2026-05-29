import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const NEGATIVE =
  "texto, letras, palavras, marca d'água, logos, violência gráfica, " +
  "rostos deformados, elementos modernos anacrônicos, fotorrealismo de pele, " +
  "3D, pixel art, cartoon americano, traço diferente.";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("✗ Erro: GEMINI_API_KEY não localizada.");
    process.exit(1);
  }

  const items = JSON.parse(await readFile(path.join(process.cwd(), "data", "3ano_t2_av1_portugues.json"), "utf8"));
  const outputDir = path.join(process.cwd(), "public", "img", "quiz", "3ano_t2_av1");

  await mkdir(outputDir, { recursive: true });

  console.log("============================================================");
  console.log(`Iniciando geração de ${items.length} imagens de português`);
  console.log(`Destino: ${outputDir}`);
  console.log("============================================================");

  for (const it of items) {
    const filename = it.imagem.arquivo;
    const fullPrompt = it.imagem.prompt;
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
