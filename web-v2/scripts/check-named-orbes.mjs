// Folha de contato dos orbes JÁ nomeados (cards/orbe-<key>.webp), em ordem de catálogo,
// com rótulo da chave para conferência visual. Saída: _named.webp
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/img/cards");
const KEYS = [
  "conhecimento-abaco", "conhecimento-numero-um", "conhecimento-compasso-regua",
  "conhecimento-cubo-geometrico", "conhecimento-padrao-simetrico", "conhecimento-espiral-aurea",
  "conhecimento-lira-musical", "conhecimento-melodia-nota", "conhecimento-ritmo-batidas",
  "conhecimento-lua-ceu", "conhecimento-constelacoes", "conhecimento-astrolabio-tempo",
  "virtude-verdade", "virtude-bondade", "virtude-beleza", "virtude-sabedoria",
  "virtude-prudencia", "virtude-fortaleza", "virtude-temperanca", "virtude-justica",
  "virtude-fe", "virtude-esperanca", "virtude-caridade", "virtude-humildade",
  "mitico-palavra",
];

const CELL = 300, IMG = 270, COLS = 5, LBL = 30;
const rows = Math.ceil(KEYS.length / COLS);
const W = COLS * CELL, H = rows * (CELL + LBL);
const bg = { r: 18, g: 18, b: 30, alpha: 1 };
const comps = [];
for (let i = 0; i < KEYS.length; i++) {
  const buf = await sharp(path.join(OUT, `orbe-${KEYS[i]}.webp`))
    .resize(IMG, IMG, { fit: "contain", background: bg }).png().toBuffer();
  const col = i % COLS, row = Math.floor(i / COLS);
  const left = col * CELL + 15, top = row * (CELL + LBL) + 5;
  comps.push({ input: buf, left, top });
  const label = KEYS[i].replace("conhecimento-", "C·").replace("virtude-", "V·").replace("mitico-", "M·");
  const svg = Buffer.from(
    `<svg width="${CELL - 10}" height="${LBL}"><text x="${(CELL - 10) / 2}" y="20" font-size="17" font-family="Arial" font-weight="bold" fill="#f1c40f" text-anchor="middle">${label}</text></svg>`,
  );
  comps.push({ input: svg, left: col * CELL, top: row * (CELL + LBL) + IMG + 8 });
}
await sharp({ create: { width: W, height: H, channels: 4, background: bg } })
  .composite(comps).webp({ quality: 84 }).toFile(path.resolve("_named.webp"));
console.log("_named.webp", W + "x" + H);
