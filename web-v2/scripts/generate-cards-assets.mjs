import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env.local manualmente (ou use node --env-file=.env.local)
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
    }
  });
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!GEMINI_API_KEY && !OPENAI_API_KEY) {
  console.error("❌ ERRO: Nenhuma chave de API encontrada. Defina GEMINI_API_KEY ou OPENAI_API_KEY no .env.local");
  process.exit(1);
}

const BASE_STYLE = "Estilo heráldico clássico-cristão inspirado na logomarca Arkanos e nos guardiões Lyra, Aion e Kael. Paleta: azul-marinho profundo (#0b1222) + dourado (#f1c40f), com toques de azul-celeste. Iluminação dramática suave, nobre e acolhedora. Alta qualidade, apropriado para crianças.";

// ==========================================
// LISTA DE ASSETS A GERAR
// ==========================================
const assetsToGenerate = [
  // ORBES (30)
  ...[
    { slug: "gramatica", tema: "letra iluminada / pena dourada" },
    { slug: "vocabulario", tema: "livro aberto com palavras brilhando" },
    { slug: "ortografia", tema: "letras alinhadas com selo de acerto" },
    { slug: "logos", tema: "balança em equilíbrio sobre labirinto" },
    { slug: "deducao", tema: "engrenagens e lupa" },
    { slug: "argumento", tema: "duas mãos em diálogo / setas lógicas" },
    { slug: "eloquencia", tema: "tribuna clássica com chama da palavra" },
    { slug: "persuasao", tema: "laço dourado unindo mentes" },
    { slug: "narrativa", tema: "livro-pergaminho com cena épica" },
    { slug: "numero", tema: "algarismos sagrados / ábaco dourado" },
    { slug: "calculo", tema: "símbolos matemáticos em órbita" },
    { slug: "proporcao", tema: "proporção áurea / espiral" },
    { slug: "forma", tema: "sólidos geométricos (cubo, esfera)" },
    { slug: "simetria", tema: "mandala geométrica espelhada" },
    { slug: "harmonia", tema: "lira com ondas sonoras" },
    { slug: "ritmo", tema: "pulsos/ondas em compasso" },
    { slug: "ceus", tema: "esfera armilar com estrelas" },
    { slug: "constelacoes", tema: "constelação ligada por linhas" },
    { slug: "calendario", tema: "ciclo solar/lunar em anel" },
    { slug: "verdade", tema: "cruz luminosa irradiando" },
    { slug: "bondade", tema: "coração com chama suave" },
    { slug: "beleza", tema: "rosa dourada / vitral" },
    { slug: "sabedoria", tema: "coruja com auréola" },
    { slug: "prudencia", tema: "espelho e serpente clássica" },
    { slug: "fortaleza", tema: "coluna/leão dourado" },
    { slug: "temperanca", tema: "duas taças em equilíbrio" },
    { slug: "justica", tema: "balança e espada" },
    { slug: "fe", tema: "âncora luminosa" },
    { slug: "esperanca", tema: "aurora nascente" },
    { slug: "caridade", tema: "mãos dando luz / pelicano clássico" }
  ].map(item => ({
    filename: `public/img/cards/orbe-${item.slug}.webp`,
    prompt: `Ícone central, composição quadrada, fundo BRANCO PURO (solid white background). Tema: ${item.tema}. ${BASE_STYLE}`
  })),

  // NÍVEIS / ERAS (5)
  ...[
    { num: 1, tema: "pedra/terra, amanhecer bronze" },
    { num: 2, tema: "pergaminhos e letras, dourado" },
    { num: 3, tema: "cosmos e geometria, azul" },
    { num: 4, tema: "grande biblioteca, violeta" },
    { num: 5, tema: "céu glorioso e luz, branco-dourado" }
  ].map(item => ({
    filename: `public/img/cards/nivel-era-${item.num}.webp`,
    prompt: `Arte de fundo vertical (2:3) para carta. Tema: ${item.tema}. ${BASE_STYLE}`
  })),

  // MEDALHAS (9)
  ...[
    { slug: "primeiro-passo", tema: "pegada / porta aberta" },
    { slug: "perseveranca", tema: "chama persistente" },
    { slug: "mente-clara", tema: "coruja / labirinto resolvido" },
    { slug: "voz-de-ouro", tema: "pena com megafone clássico" },
    { slug: "gabaritou", tema: "alvo com flecha no centro" },
    { slug: "ofensiva", tema: "calendário com chama" },
    { slug: "coroa-de-louros", tema: "coroa de louros" },
    { slug: "guardiao-trivium", tema: "escudo com 3 símbolos" },
    { slug: "contemplador-ceus", tema: "esfera armilar" }
  ].map(item => ({
    filename: `public/img/cards/medalha-${item.slug}.webp`,
    prompt: `Emblema central para medalha, composição quadrada, fundo BRANCO PURO (solid white background). Tema: ${item.tema}. ${BASE_STYLE}`
  })),

  // GUARDIÕES (13)
  ...[
    { slug: "lyra-fase1", tema: "Personagem Lyra do Arkanos, criança (6-9 anos), soletrando com letras flutuantes" },
    { slug: "lyra-fase2", tema: "Personagem Lyra do Arkanos, pré-adolescente (10-12 anos), soletrando com letras flutuantes" },
    { slug: "lyra-fase3", tema: "Personagem Lyra do Arkanos, adolescente (13+ anos), soletrando com letras flutuantes" },
    { slug: "aion-fase1", tema: "Personagem Aion do Arkanos, criança (6-9 anos), com balança/engrenagens" },
    { slug: "aion-fase2", tema: "Personagem Aion do Arkanos, pré-adolescente (10-12 anos), com balança/engrenagens" },
    { slug: "aion-fase3", tema: "Personagem Aion do Arkanos, adolescente (13+ anos), com balança/engrenagens" },
    { slug: "kael-fase1", tema: "Personagem Kael do Arkanos, criança (6-9 anos), orando/discursando" },
    { slug: "kael-fase2", tema: "Personagem Kael do Arkanos, pré-adolescente (10-12 anos), orando/discursando" },
    { slug: "kael-fase3", tema: "Personagem Kael do Arkanos, adolescente (13+ anos), orando/discursando" },
    // Novos Guardiões Quadrivium
    { slug: "numa", tema: "Novo guardião Numa (Aritmética), adolescente, segurando ábaco dourado" },
    { slug: "geon", tema: "Novo guardião Geon (Geometria), adolescente, segurando compasso e sólidos" },
    { slug: "melos", tema: "Novo guardião Melos (Música), adolescente, segurando lira e ondas de harmonia" },
    { slug: "astra", tema: "Novo guardião Astra (Astronomia), adolescente, com esfera armilar e manto estrelado" },
  ].map(item => ({
    filename: `public/img/guardioes/guardiao-${item.slug}.webp`,
    prompt: `${item.tema}, corpo inteiro, pose heróica, fundo BRANCO PURO (solid white background). ${BASE_STYLE}`
  }))
];

// ==========================================
// FUNÇÕES DE GERAÇÃO
// ==========================================
async function generateWithGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: prompt }],
      parameters: { sampleCount: 1, outputMimeType: "image/png" } // Imagen 3 default to PNG
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${text}`);
  }

  const data = await response.json();
  if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
    return Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  } else {
    throw new Error(`Invalid Gemini API response: ${JSON.stringify(data)}`);
  }
}

async function generateWithOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API Error: ${response.status} - ${text}`);
  }

  const data = await response.json();
  if (data.data && data.data[0] && data.data[0].b64_json) {
    return Buffer.from(data.data[0].b64_json, 'base64');
  } else {
    throw new Error("Invalid OpenAI API response");
  }
}

// ==========================================
// EXECUÇÃO
// ==========================================
async function run() {
  console.log(`🚀 Iniciando geração de ${assetsToGenerate.length} assets...`);
  console.log(`🤖 Motor: ${GEMINI_API_KEY ? 'Gemini (Imagen 3)' : 'OpenAI (DALL-E 3)'}`);
  
  for (let i = 0; i < assetsToGenerate.length; i++) {
    const { filename, prompt } = assetsToGenerate[i];
    const fullPath = path.resolve(__dirname, '..', filename);
    
    if (fs.existsSync(fullPath)) {
      console.log(`[${i+1}/${assetsToGenerate.length}] ⏭️ Ignorando '${filename}' (já existe)`);
      continue;
    }

    console.log(`[${i+1}/${assetsToGenerate.length}] 🎨 Gerando '${path.basename(filename)}'...`);
    try {
      const buffer = GEMINI_API_KEY ? await generateWithGemini(prompt) : await generateWithOpenAI(prompt);
      
      fs.writeFileSync(fullPath, buffer);
      console.log(`   ✅ Salvo com sucesso!`);
    } catch (error) {
      console.error(`   ❌ Falha ao gerar:`, error.message);
      // Aguarda 5 segundos antes de continuar em caso de erro de rate limit
      await new Promise(r => setTimeout(r, 5000));
    }

    // Delay para respeitar rate limits (especialmente Gemini gratuito)
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log("==========================================");
  console.log("🎉 Geração concluída!");
  console.log("⚠️ NOTA SOBRE TRANSPARÊNCIA: As APIs (OpenAI/Gemini) geralmente retornam PNGs com fundo sólido (branco ou texturizado).");
  console.log("Para remover o fundo das 57 imagens e deixá-las perfeitamente transparentes, utilize o Remove.bg em lote, ou a ferramenta de 'Magic Eraser' do seu editor de imagens.");
  console.log("==========================================");
}

run();
