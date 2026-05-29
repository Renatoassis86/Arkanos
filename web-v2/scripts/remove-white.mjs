import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  'template-carta-nivel.webp',
  'template-carta-orbe.webp',
  'template-medalha.webp'
];

async function processImage(filename) {
  const filePath = path.join(__dirname, '../public/img/cards', filename);
  const tempPath = path.join(__dirname, '../public/img/cards', `temp-${filename}`);
  if (!fs.existsSync(filePath)) {
    console.log(`Arquivo não encontrado: ${filePath}`);
    return;
  }

  try {
    const img = sharp(filePath);
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    // Iterar sobre os pixels (cada pixel tem 4 valores: R, G, B, A)
    // Removemos os que são quase puramente brancos
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Limiar para branco (245 a 255)
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // Torna transparente
      }
    }

    // Salva em um arquivo temporário
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    })
    .webp({ quality: 100 })
    .toFile(tempPath);
    
    // Agora podemos apagar o antigo e renomear o novo
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);

    console.log(`Fundo branco removido de: ${filename}`);
  } catch (err) {
    console.error(`Erro ao processar ${filename}:`, err);
  }
}

async function run() {
  console.log('Iniciando remoção de fundo branco dos templates...');
  for (const img of images) {
    await processImage(img);
  }
  console.log('Concluído!');
}

run();
