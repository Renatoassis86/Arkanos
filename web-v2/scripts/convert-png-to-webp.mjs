import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertAndRename() {
  const dir = path.join(__dirname, '../public/img/cards');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('orbe_') && f.endsWith('.png'));

  for (const file of files) {
    // extrai o nome base (ex: orbe_gramatica_1780068024937.png -> orbe-gramatica.webp)
    const match = file.match(/orbe_([a-z]+)_/);
    if (match) {
      const nome = match[1];
      const newName = `orbe-${nome}.webp`;
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, newName);

      await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
      fs.unlinkSync(inputPath);
      console.log(`Convertido e renomeado: ${file} -> ${newName}`);
    }
  }
}

convertAndRename();
