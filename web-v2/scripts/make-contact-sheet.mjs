// Monta uma folha de contato (grade numerada) de todas as PNG em public/img/orbes/
// para classificação visual. Saída: _contact.webp na raiz do projeto.
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/img/orbes");
const files = (await readdir(DIR)).filter((f) => /\.png$/i.test(f)).sort();

const CELL = 320, IMG = 300, COLS = 4;
const bg = { r: 18, g: 18, b: 30, alpha: 1 };

async function sheet(name, start, end) {
  const list = files.slice(start, end);
  const rows = Math.ceil(list.length / COLS);
  const W = COLS * CELL, H = rows * CELL;
  const comps = [];
  for (let j = 0; j < list.length; j++) {
    const i = start + j;
    const buf = await sharp(path.join(DIR, files[i]))
      .resize(IMG, IMG, { fit: "contain", background: bg })
      .png()
      .toBuffer();
    const col = j % COLS, row = Math.floor(j / COLS);
    const left = col * CELL + 10, top = row * CELL + 10;
    comps.push({ input: buf, left, top });
    const svg = Buffer.from(
      `<svg width="56" height="32"><rect width="56" height="32" rx="6" fill="#f1c40f"/><text x="28" y="23" font-size="20" font-family="Arial" font-weight="bold" fill="#16161e" text-anchor="middle">${i}</text></svg>`,
    );
    comps.push({ input: svg, left, top });
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: bg } })
    .composite(comps)
    .webp({ quality: 84 })
    .toFile(path.resolve(name));
  console.log(name, W + "x" + H);
}

await sheet("_contact_a.webp", 0, 20);
await sheet("_contact_b.webp", 20, files.length);
