import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/img/quiz/5ano_t2_av1_historia");
const items = JSON.parse(await readFile("data/5ano_t2_av1_historia.json", "utf8"));
const CELL = 300, IMG = 286, COLS = 4;
const bg = { r: 18, g: 18, b: 30, alpha: 1 };

async function sheet(name, list) {
  const rows = Math.ceil(list.length / COLS);
  const W = COLS * CELL, H = rows * CELL;
  const comps = [];
  for (let j = 0; j < list.length; j++) {
    const it = list[j];
    const file = (typeof it.imagem === "string" ? it.imagem : it.imagem.arquivo).replace(/\.png$/i, ".webp");
    const buf = await sharp(path.join(DIR, file)).resize(IMG, IMG, { fit: "contain", background: bg }).png().toBuffer();
    const col = j % COLS, row = Math.floor(j / COLS);
    comps.push({ input: buf, left: col * CELL + 7, top: row * CELL + 7 });
    const label = `q${String(it.numero).padStart(2, "0")} ${it.tema}`.slice(0, 26);
    const svg = Buffer.from(`<svg width="${CELL - 8}" height="24"><rect width="${CELL - 8}" height="24" rx="4" fill="#f1c40fdd"/><text x="6" y="17" font-size="14" font-family="Arial" font-weight="bold" fill="#16161e">${label}</text></svg>`);
    comps.push({ input: svg, left: col * CELL + 7, top: row * CELL + 7 });
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: bg } }).composite(comps).webp({ quality: 80 }).toFile(path.resolve(name));
  console.log(name, W + "x" + H);
}

await sheet("_verify_a.webp", items.slice(0, 20));
await sheet("_verify_b.webp", items.slice(20, 40));
