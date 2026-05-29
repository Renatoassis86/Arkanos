# Roteiro de Imagens — Desafio dos Sábios (gerar via Gemini/Antigravity)

Guia para gerar e plugar as ilustrações de cada questão. O app **já renderiza**
a imagem quando `quiz_questions.image_url` está preenchido (senão mostra um banner
temático por disciplina).

## Pipeline
1. **Prompts** já estão no banco (coluna `image_prompt`) — rode `npm run db:image-prompts`.
2. **Gere** as imagens rodando o script gerador automático usando seu token da API do Gemini (Google AI Studio):
   - **Opção Eficiente (5 imagens - Padrão)**: `npm run db:generate-images`
   - **Opção Completa (34 imagens)**: `npm run db:generate-images:all`
   *(Nota: Certifique-se de ter a variável `GEMINI_API_KEY` configurada no seu `.env.local`)*
3. **Imagens locais**: As imagens serão salvas automaticamente na pasta `public/img/quiz/`. Se preferir Produção, suba os arquivos no Storage do Supabase.
4. **Ligue**: O arquivo `scripts/quiz-image-urls.json` já vem pré-mapeado para as imagens geradas localmente. Rode `npm run db:link-images` para associar tudo no banco de dados.

## Onde guardar
- **Produção (recomendado):** bucket público `quiz` no Supabase Storage →
  `https://psunkikpftnvcgylxiys.supabase.co/storage/v1/object/public/quiz/<arquivo>.webp`
- **Dev rápido:** `web-v2/public/img/quiz/<arquivo>.webp` → `image_url = /img/quiz/<arquivo>.webp`
- **Specs:** 16:9, **1536×864**, **WebP** (~150–250 KB), sem texto na imagem.
- **Nome sugerido:** `q001.webp`, `q002.webp`, … (casa com os ids do `quiz_questions.json`).

## Estilo-mestre (preâmbulo — já embutido nos prompts do banco)
> Ilustração digital pintada à mão, estilo épico-clássico para crianças, atmosfera de
> educação cristã clássica. Paleta azul-marinho profundo com destaques dourados e toques
> de azul celeste. Iluminação dramática suave, nobre e acolhedora. Composição panorâmica
> 16:9, foco central, leve vinheta. **Sem nenhum texto na imagem.** Alta qualidade,
> apropriado para crianças.

**Negative prompt:** texto, letras, palavras, marca d'água, logos, violência gráfica,
rostos deformados, elementos modernos anacrônicos, fotorrealismo de pele.

## Opção eficiente — 1 por TÓPICO (5 imagens)
1. **Minoica** — Palácio de Cnossos em Creta, afrescos de golfinhos e salto do touro, navios no Egeu.
2. **Micênica** — Cidadela de Micenas, muralhas ciclópicas e Portão dos Leões ao entardecer.
3. **Guerra de Troia** — O Cavalo de Troia diante das muralhas ao amanhecer, navios gregos.
4. **Fenícios** — Navio fenício de vela púrpura no Mediterrâneo, alfabeto gravado em pedra.
5. **Linha do Tempo** — Friso: minoico → micênico → cavalo de Troia → navio fenício.

## Roteiro completo — 1 por QUESTÃO (34)
Concatene cada cena ao estilo-mestre (já feito no banco).

### Civilização Minoica
- **Q001** Primeira civilização europeia na ilha de Creta, cercada pelo mar Egeu turquesa.
- **Q002** O lendário rei Minos em seu trono no palácio de Cnossos.
- **Q003** Cidade minoica na costa, casas claras à beira-mar com barcos.
- **Q004** Rota de comércio ligando Creta ao Egito e à Síria, navios mercantes.
- **Q005** Oficina minoica de cerâmica, vasos pintados com polvos e ondas.
- **Q006** Tumba minoica com oferendas para a vida além da morte.
- **Q007** Cena serena de vida após a morte minoica, luz suave.
- **Q008** Salto do touro (taurocatapsia), atleta saltando sobre o touro.
- **Q009** Tabuleta de argila com a escrita Linear A.
- **Q031** O touro sagrado minoico, majestoso, motivo de arte.
- **Q032** Talassocracia: frota minoica dominando os mares.
- **Q033** A Deusa-Mãe minoica segurando serpentes.
- **Q034** Cidade minoica aberta e pacífica, sem grandes muralhas.

### Civilização Micênica
- **Q010** Cidade de Micenas sobre a colina ao entardecer.
- **Q011** Guerreiros micênicos conquistando Creta (~1450 a.C.).
- **Q012** Exército militarista micênico em formação.
- **Q013** Cidadela fortificada protegendo a cidade.
- **Q014** O Portão dos Leões de Micenas em destaque.
- **Q015** Armas de bronze de tumbas micênicas, como tesouro.

### Guerra de Troia
- **Q016** Homero recitando a Ilíada à luz de tochas.
- **Q017** Batalha épica sob as muralhas de Troia.
- **Q018** Páris levando Helena por um porto, navios ao fundo.
- **Q019** Odisseu arquitetando o plano do cavalo, com planos à mão.
- **Q020** Soldados gregos escondidos dentro do cavalo (vista em corte).
- **Q021** O cerco de dez anos a Troia, acampamento grego.
- **Q022** O rei Menelau de Esparta, esposo de Helena.
- **Q023** Agamenon, rei de Argos, com coroa e manto.

### Fenícios
- **Q024** A terra de Canaã, vilarejo fenício na costa do Levante.
- **Q025** Navegadores e comerciantes fenícios partindo ao mar.
- **Q026** Tingimento de tecidos com o corante púrpura.
- **Q027** Escriba fenício criando o alfabeto em pedra.
- **Q028** Alfabeto fenício influenciando alfabetos posteriores.
- **Q029** Alfabeto fenício, sobretudo consoantes (poucas vogais).

### Linha do Tempo
- **Q030** Friso cronológico: minoico → micênico → cavalo de Troia → navio fenício.

## "Animado"
Imagen/Gemini gera estáticas. O app já aplica **Ken Burns** (zoom/pan lento) na imagem.
Para animação real: gerar loops curtos com **Veo** (MP4/WebM) ou usar **Lottie** (.json).
