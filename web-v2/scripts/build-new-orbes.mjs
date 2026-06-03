// Gera os novos orbes (cards/orbe-<key>.webp) a partir dos PNGs do Gemini em orbes/,
// segundo o mapeamento visual (índice da folha de contato -> chave do catálogo).
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/img/orbes");
const OUT = path.resolve("public/img/cards");
const files = (await readdir(SRC)).filter((f) => /\.png$/i.test(f)).sort();

// chave do catálogo -> índice na folha de contato (_contact_a/_b)
const MAP = {
  "conhecimento-abaco": 14,
  "conhecimento-espiral-aurea": 23,
  "conhecimento-cubo-geometrico": 25,
  "conhecimento-padrao-simetrico": 11,
  "conhecimento-compasso-regua": 1,
  "conhecimento-numero-um": 9,
  "conhecimento-lira-musical": 36,
  "conhecimento-ritmo-batidas": 19,
  "conhecimento-melodia-nota": 20,
  "conhecimento-lua-ceu": 16,
  "conhecimento-constelacoes": 13,
  "conhecimento-astrolabio-tempo": 27,
  "virtude-verdade": 12,
  "virtude-bondade": 33,
  "virtude-beleza": 5,
  "virtude-sabedoria": 30,
  "virtude-prudencia": 34,
  "virtude-fortaleza": 2,
  "virtude-temperanca": 32,
  "virtude-justica": 3,
  "virtude-fe": 18,
  "virtude-esperanca": 8,
  "virtude-caridade": 21,
  "virtude-humildade": 35,
  "mitico-palavra": 17,
};

// Remove o xadrez (falsa transparência) detectando o RAIO real de cada orbe
// (pelos pixels coloridos/saturados do anel dourado e do cristal) e mascarando
// num círculo exatamente nesse raio — o que sobra (cantos = xadrez cinza) fica
// transparente, e o fundo navy do card (cor da paleta) aparece. Sem furar a arte.
const SIZE = 900;

let ok = 0;
for (const [key, idx] of Object.entries(MAP)) {
  const src = path.join(SRC, files[idx]);
  const out = path.join(OUT, `orbe-${key}.webp`);

  const { data, info } = await sharp(src)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels, w = info.width, h = info.height, cx = w / 2, cy = h / 2;
  const radii = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      if (data[i + 3] < 10) continue; // já transparente (padding)
      const r = data[i], g = data[i + 1], b = data[i + 2];
      // pixel "do orbe": saturado (anel/cristal colorido). Xadrez é cinza -> ignora.
      if (Math.max(r, g, b) - Math.min(r, g, b) > 35) {
        const dx = x - cx, dy = y - cy;
        radii.push(Math.sqrt(dx * dx + dy * dy));
      }
    }
  }
  radii.sort((a, b) => a - b);
  const rOrb = radii.length ? radii[Math.floor(radii.length * 0.995)] : SIZE / 2;
  const R = Math.min(SIZE / 2, Math.ceil(rOrb) + 5);
  const circle = Buffer.from(
    `<svg width="${SIZE}" height="${SIZE}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff"/></svg>`,
  );

  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .composite([{ input: circle, blend: "dest-in" }])
    .webp({ quality: 86 })
    .toFile(out);
  console.log(`✓ orbe-${key}.webp  R=${R}`);
  ok++;
}
console.log(`\n${ok} orbes gerados em public/img/cards/`);
