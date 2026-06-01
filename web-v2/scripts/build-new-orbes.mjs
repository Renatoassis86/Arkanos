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

let ok = 0;
for (const [key, idx] of Object.entries(MAP)) {
  const src = path.join(SRC, files[idx]);
  const out = path.join(OUT, `orbe-${key}.webp`);
  await sharp(src)
    .resize(900, 900, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 86 })
    .toFile(out);
  console.log(`✓ orbe-${key}.webp  <-  ${files[idx]}`);
  ok++;
}
console.log(`\n${ok} orbes gerados em public/img/cards/`);
