import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_STYLE = "Estilo heráldico clássico-cristão inspirado na logomarca Arkanos e nos guardiões Lyra, Aion e Kael. Paleta: azul-marinho profundo (#0b1222) + dourado (#f1c40f), com toques de azul-celeste. Iluminação dramática suave, nobre e acolhedora. Alta qualidade, apropriado para crianças.";

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
    { slug: "numa", tema: "Novo guardião Numa (Aritmética), adolescente, segurando ábaco dourado" },
    { slug: "geon", tema: "Novo guardião Geon (Geometria), adolescente, segurando compasso e sólidos" },
    { slug: "melos", tema: "Novo guardião Melos (Música), adolescente, segurando lira e ondas de harmonia" },
    { slug: "astra", tema: "Novo guardião Astra (Astronomia), adolescente, com esfera armilar e manto estrelado" },
  ].map(item => ({
    filename: `public/img/guardioes/guardiao-${item.slug}.webp`,
    prompt: `${item.tema}, corpo inteiro, pose heróica, fundo BRANCO PURO (solid white background). ${BASE_STYLE}`
  }))
];

async function generateFree(prompt, retries = 3) {
  // Pollinations.ai usa o modelo Flux para imagens incríveis por padrão
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&private=true&enhance=true&model=flux`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) }); // 30 segundos de timeout
      if (!response.ok) {
        throw new Error(`Pollinations API Error: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      console.log(`   ⚠️ Tentativa ${attempt}/${retries} falhou: ${err.message}`);
      if (attempt === retries) {
        throw err;
      }
      // Espera um pouco antes de tentar novamente
      await new Promise(r => setTimeout(r, 4000));
    }
  }
}

async function run() {
  console.log(`🚀 Iniciando geração alternativa de ${assetsToGenerate.length} assets...`);
  console.log(`🤖 Motor: Pollinations.ai (Flux - Gratuito e sem cota - Com Auto-Retry)`);

  // Garante que o diretório de guardiões exista
  const guardioesDir = path.resolve(__dirname, '../public/img/guardioes');
  if (!fs.existsSync(guardioesDir)) {
    fs.mkdirSync(guardioesDir, { recursive: true });
  }
  
  for (let i = 0; i < assetsToGenerate.length; i++) {
    const { filename, prompt } = assetsToGenerate[i];
    const fullPath = path.resolve(__dirname, '..', filename);
    
    if (fs.existsSync(fullPath)) {
      console.log(`[${i+1}/${assetsToGenerate.length}] ⏭️ Ignorando '${filename}' (já existe)`);
      continue;
    }

    console.log(`[${i+1}/${assetsToGenerate.length}] 🎨 Gerando via Flux: '${path.basename(filename)}'...`);
    try {
      const buffer = await generateFree(prompt);
      
      // Converte para WebP de alta qualidade diretamente com o Sharp
      await sharp(buffer)
        .webp({ quality: 90 })
        .toFile(fullPath);

      console.log(`   ✅ Salvo e convertido com sucesso!`);
    } catch (error) {
      console.error(`   ❌ Falha definitiva ao gerar '${path.basename(filename)}':`, error.message);
    }

    // Delay curto para educação com a API pública
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("==========================================");
  console.log("🎉 Geração alternativa concluída!");
  console.log("==========================================");
}

run();
