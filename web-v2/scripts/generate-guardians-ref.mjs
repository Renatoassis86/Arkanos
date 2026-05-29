// Regenera TODOS os guardiões preservando o traço original (chibi cartoon), usando
// as artes originais (lyra/aion/kael.png) como REFERÊNCIA via Flux Kontext
// (Pollinations, grátis) + identidade travada no texto.
//
// Uso: node --env-file=.env.local scripts/generate-guardians-ref.mjs [--force]
//
// Gera: 3 base + 9 fases de idade (fase1/2/3) + 4 do Quadrivium (sem original,
// usam um base como referência de ESTILO). Saída: public/img/guardioes/guardiao-<nome>.webp.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "ref-assets";
const FORCE = process.argv.includes("--force");
const GDIR = path.resolve(__dirname, "..", "public/img/guardioes");

// Trava de estilo (personagens): NÃO usar o estilo heráldico/pintado dos objetos.
const STYLE =
  "Chibi cartoon mascot, anime style, thick clean black outlines, flat cel-shading, " +
  "bright flat saturated colors, big expressive eyes, simple shapes, full body, " +
  "child-friendly illustration. Match the reference image's exact art style and design. " +
  "Pure solid white background. No painterly texture, no realism, no gradients.";

// Identidade fiel de cada guardião original (extraída das artes lyra/aion/kael.png).
const CHARS = {
  lyra: {
    ref: "lyra.png",
    identity:
      "Character LYRA: a GIRL with BRIGHT PINK hair in a SIDE PONYTAIL, TEAL-GREEN eyes, " +
      "wearing a RED tunic dress with GOLD trim and a BLUE cape, holding a glowing GOLDEN FEATHER QUILL",
    action: "dynamic spelling pose with a few floating golden letters around her",
  },
  aion: {
    ref: "aion.png",
    identity:
      "Character AION: a BOY with spiky BLUE hair, BLUE eyes, wearing a CREAM tunic with GOLD trim, " +
      "a BLUE cape and a brown belt, with a large GOLDEN POCKET-WATCH/CLOCK pendant on his chest",
    action: "thoughtful confident pose with a glowing golden balance scale and floating gears",
  },
  kael: {
    ref: "kael.png",
    identity:
      "Character KAEL: a BOY with spiky RED-ORANGE hair, dark eyes, wearing a RED tunic jacket with GOLD trim " +
      "and a BLUE cape and brown belt, holding a silver SWORD",
    action: "confident heroic speaking pose, one arm raised, glowing golden light around him",
  },
};

const AGES = {
  fase1: "drawn as a YOUNG CHILD about 6-8 years old, smaller body and rounder face",
  fase2: "drawn as a PRETEEN about 10-12 years old",
  fase3: "drawn as a TEENAGER about 14-15 years old, a bit taller and older but still cute and chibi",
};

// Quadrivium: novos guardiões SEM original — usam um base como referência de ESTILO.
const QUAD = {
  numa: {
    refChar: "aion",
    identity:
      "Character NUMA, teen guardian of Arithmetic: spiky GREEN hair, friendly eyes, a TEAL tunic with GOLD trim and a teal cape",
    action: "holding a glowing GOLDEN ABACUS with floating golden numbers around him",
  },
  geon: {
    refChar: "aion",
    identity:
      "Character GEON, teen guardian of Geometry: PURPLE hair, a purple tunic with GOLD trim and a violet cape",
    action: "holding a GOLDEN COMPASS with floating geometric solids (cube, sphere, pyramid)",
  },
  melos: {
    refChar: "lyra",
    identity:
      "Character MELOS, teen guardian of Music: wavy AMBER-ORANGE hair, an orange tunic with GOLD trim and a cape",
    action: "playing a small GOLDEN LYRE with floating musical notes and sound waves",
  },
  astra: {
    refChar: "aion",
    identity:
      "Character ASTRA, teen guardian of Astronomy: dark INDIGO hair, a deep-blue STARRY cape with gold stars and a tunic with GOLD trim",
    action: "holding a GOLDEN ARMILLARY SPHERE with floating stars and constellations",
  },
};

// Monta a lista de jobs: { name, refFile, prompt }
function buildJobs() {
  const jobs = [];
  for (const [name, c] of Object.entries(CHARS)) {
    jobs.push({ name, refFile: c.ref, prompt: `${STYLE} ${c.identity}. ${c.action}.` });
    for (const [phase, age] of Object.entries(AGES)) {
      jobs.push({
        name: `${name}-${phase}`,
        refFile: c.ref,
        prompt: `${STYLE} ${c.identity}, ${age}. ${c.action}.`,
      });
    }
  }
  for (const [name, q] of Object.entries(QUAD)) {
    jobs.push({
      name,
      refFile: CHARS[q.refChar].ref,
      prompt: `${STYLE} ${q.identity}. ${q.action}.`,
    });
  }
  return jobs;
}

async function ensureBucket() {
  const r = await fetch(`${SUPA}/storage/v1/bucket`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, apikey: KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  });
  if (!r.ok && r.status !== 409) {
    const t = await r.text();
    if (!t.includes("already exists")) console.log("aviso bucket:", r.status, t.slice(0, 120));
  }
}

async function uploadRef(refFile) {
  const buf = fs.readFileSync(path.join(GDIR, refFile));
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = await fetch(`${SUPA}/storage/v1/object/${BUCKET}/${refFile}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, apikey: KEY, "Content-Type": "image/png", "x-upsert": "true" },
      body: buf,
    });
    if (r.ok) return `${SUPA}/storage/v1/object/public/${BUCKET}/${refFile}`;
    if (attempt === 3) throw new Error(`upload ${refFile}: ${r.status}`);
    await new Promise((x) => setTimeout(x, 3000));
  }
}

async function kontext(prompt, imageUrl) {
  const u = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux-kontext&image=${encodeURIComponent(imageUrl)}&width=1024&height=1024&nologo=true&private=true`;
  const r = await fetch(u, { signal: AbortSignal.timeout(120000) });
  if (!r.ok) throw new Error(`flux-kontext ${r.status}: ${(await r.text()).slice(0, 140)}`);
  return Buffer.from(await r.arrayBuffer());
}

async function run() {
  if (!SUPA || !KEY) {
    console.error("✗ Faltam NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no .env.local");
    process.exit(1);
  }
  await ensureBucket();

  // Sobe cada referência uma única vez.
  const refUrls = {};
  for (const f of [...new Set(Object.values(CHARS).map((c) => c.ref))]) {
    refUrls[f] = await uploadRef(f);
  }

  const jobs = buildJobs();
  console.log(`🎨 ${jobs.length} guardiões (Flux Kontext + referência, chibi)...`);
  let ok = 0;
  for (const j of jobs) {
    const out = path.join(GDIR, `guardiao-${j.name}.webp`);
    if (fs.existsSync(out) && !FORCE) {
      console.log(`⏭️  ${j.name} (existe)`);
      continue;
    }
    try {
      console.log(`→ ${j.name} ...`);
      const buf = await kontext(j.prompt, refUrls[j.refFile]);
      await sharp(buf).webp({ quality: 90 }).toFile(out);
      console.log(`   ✅ guardiao-${j.name}.webp (${buf.length} b)`);
      ok++;
    } catch (e) {
      console.error(`   ❌ ${j.name}: ${e.message}`);
    }
    await new Promise((x) => setTimeout(x, 1500));
  }
  console.log(`✔ ${ok} gerados`);
}

run();
