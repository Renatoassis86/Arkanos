// Gera/atualiza o documento VIVO de prompts de imagem do quiz:
//   web-v2/docs/PROMPTS_QUIZ_IMAGENS.md
// Para cada questão que precisa de imagem, escreve: prompt padronizado + nome do
// arquivo + pasta onde depositar. "Alimentar" = adicionar um conjunto em SETS e
// re-rodar. Uso: node scripts/build-image-prompts.mjs
import fs from "node:fs";

// Conjuntos de dados que possuem imagens a gerar (adicione novos aqui).
const SETS = [
  {
    file: "data/3ano_t2_av1_geografia.json",
    folder: "3ano_t2_av1_geografia",
    prefix: "3a-t2-av1-geo",
    titulo: "Geografia · 3º ano · AV1 · 2º Trimestre",
  },
];

const MASTER =
  'Ilustração educacional infantil no estilo ARKANOS: cartoon anime 2D, traço limpo com contorno ' +
  'definido, cel-shading chapado, cores vivas e suaves, iluminação suave, aparência amigável e ' +
  'didática. Proporção 3:2 (paisagem). Fundo branco limpo, sem moldura. SEM nenhum texto, letra, ' +
  'número ou rótulo na imagem. A CENA preenche o quadro e é o foco principal. Opcional: um pequeno ' +
  'guardião chibi observando ao canto (Aion = menino de cabelo azul espetado, túnica creme com ' +
  'detalhes dourados e capa azul).';

let out = `# Prompts de Imagem do Quiz (documento vivo)

> Fluxo: gere cada imagem externamente (Gemini/ChatGPT) usando o **prompt** abaixo,
> salve com o **nome do arquivo** exato na **pasta** indicada e rode
> \`node --env-file=.env.local scripts/link-quiz-art.mjs\` para vincular no banco.
> Depois \`git add\` as imagens + deploy.
>
> ⚠️ **Mapas (interpretação):** geradores de imagem NÃO produzem mapas geograficamente
> precisos (posições/contornos de países saem errados). Para essas, prefira um **mapa real**
> (base cartográfica) ou aceite uma versão estilizada/decorativa.

## Estilo-mestre (use sempre no início do prompt)
${MASTER}

`;

let total = 0;
for (const set of SETS) {
  const items = JSON.parse(fs.readFileSync(set.file, "utf8")).filter((it) => it.imagem_requerida);
  out += `\n---\n\n## ${set.titulo}\n`;
  out += `Pasta: \`web-v2/public/img/quiz/${set.folder}/\`\n`;
  for (const it of items) {
    const nnn = String(it.id).padStart(3, "0");
    const arquivo = `${set.prefix}-${nnn}.webp`;
    const ehMapa = /mapa/i.test(it.descricao_imagem) || it.tipo_imagem === "interpretação";
    total++;
    out += `\n### Q${it.id} — ${it.tema}${ehMapa ? " 🗺️ (mapa: ver aviso)" : ""}\n`;
    out += `- **Arquivo:** \`${arquivo}\`\n`;
    out += `- **Pergunta:** ${it.pergunta}\n`;
    out += `- **Prompt:** ${MASTER} CENA: ${it.descricao_imagem}\n`;
  }
}

out += `\n---\n\nTotal de imagens pendentes: **${total}**.\n`;
fs.writeFileSync("docs/PROMPTS_QUIZ_IMAGENS.md", out);
console.log(`✓ docs/PROMPTS_QUIZ_IMAGENS.md gerado (${total} imagens).`);
