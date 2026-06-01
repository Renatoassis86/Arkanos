// Converte e otimiza os orbes do Gemini: public/img/cards/orbe-*.png  ->  orbe-*.webp
// Uso: solte os PNGs (nomeados orbe-<chave>.png) em public/img/cards/ e rode:
//   node scripts/optimize-orbes.mjs
// Gera webp ~1024px, qualidade 82 (leve para deploy) e remove os PNGs de origem.

import { readdir, unlink, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/img/cards");
const SIZE = 1024;
const QUALITY = 82;

const files = (await readdir(DIR)).filter(
  (f) => /^orbe-.+\.png$/i.test(f),
);

if (files.length === 0) {
  console.log("Nenhum orbe-*.png encontrado em public/img/cards/. Nada a fazer.");
  process.exit(0);
}

let ok = 0;
for (const f of files) {
  const src = path.join(DIR, f);
  const out = path.join(DIR, f.replace(/\.png$/i, ".webp"));
  try {
    await sharp(src)
      .resize(SIZE, SIZE, { fit: "cover", position: "centre" })
      .webp({ quality: QUALITY })
      .toFile(out);
    const { size } = await stat(out);
    await unlink(src);
    console.log(`✓ ${f} -> ${path.basename(out)} (${Math.round(size / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${f}: ${e.message}`);
  }
}
console.log(`\nPronto: ${ok}/${files.length} orbes otimizados.`);
