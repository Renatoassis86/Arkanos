# PROJETO DE DESIGN ARKANOS — O Reino do Saber e da Virtude

> Documento mestre da identidade visual. Escrito pelo **Designer Sênior do Arkanos**.
> Guia único para landing, plataforma gamificada e consultoria. Tudo aqui é **decisão de design**:
> paleta, tipografia, estilo de assets, biblioteca de prompts, montagem por página e manifesto.
>
> Princípio inegociável: **CONSISTÊNCIA ABSOLUTA DO TRAÇO**. Antes de gerar qualquer figura,
> repita o ESTILO-MESTRE da família correta no início do prompt. Se algo não couber no estilo,
> sinalize — nunca improvise um estilo novo.
>
> Documentos irmãos: `ARKANOS_LEGADO.md` (o que o legado fazia), `GAMIFICACAO.md` (Arks, níveis,
> orbes, medalhas, prompts de jogo), `PROMPTS_DESIGN_SITE.md` (doc vivo de prompts do site),
> `SITE_ESTRUTURA.md` (mapa de páginas/componentes). Este documento unifica e expande todos eles.

---

## 0. Sumário

1. Visão e cosmovisão (propósito, princípios à luz da fé, tom de voz)
2. Sistema de design (paleta, tipografia, espaçamento, cards/sombras/cantos, animação, brushes)
3. As 3 famílias de assets (estilos-mestre fixos)
4. Biblioteca completa de prompts (a parte central)
5. Aplicação por página
6. Manifesto de assets (checklist)

---

## 1. Visão e cosmovisão

### 1.1 O que estamos construindo
**ARKANOS — O Reino do Saber e da Virtude** é uma plataforma de **Educação Cristã Clássica**
estruturada nas **7 Artes Liberais** (Trivium: Gramática, Lógica, Retórica · Quadrivium: Aritmética,
Geometria, Música, Astronomia), ancorada em **Verdade, Bondade e Beleza** e na **contemplação do
Criador**. A gamificação serve à formação da **virtude** — nunca ao vício. Cada conquista aponta
para algo mais alto do que pontos: aponta para o caráter e para a glória de Deus (*"Os céus
proclamam a glória de Deus"* — Sl 19:1).

O negócio é **duplo**:
1. **Plataforma** gamificada para alunos (jogos, Arks, níveis, orbes, medalhas, missões, ranking).
2. **Consultoria educacional** para escolas e famílias (implantação, formação de professores,
   suporte, relatórios em tempo real).

O público é **escolas** clássicas/cristãs e **famílias educadoras (homeschool)**.

### 1.2 Princípios de design à luz da fé cristã clássica
O design materializa o transcendental clássico **Verdade · Bondade · Beleza**:

- **Verdade (clareza):** a interface nunca engana nem manipula. Hierarquia honesta, dados reais,
  zero *dark patterns*. O lúdico jamais distorce o conteúdo. Tipografia legível, contraste alto.
- **Bondade (formação):** cada recompensa celebra **esforço, perseverança e caráter**, não vaidade.
  A linguagem encoraja ("o justo cai sete vezes e se levanta" — Pv 24:16). Nada de FOMO, loot-box
  abusivo, ou estética de cassino. O ranking honra a jornada, não humilha.
- **Beleza (ordem):** proporção, simetria e ritmo visual — a beleza como reflexo da ordem do
  Criador. Espaçamento generoso, alinhamento rigoroso, paleta harmônica. Dourado como acento de
  glória, não como excesso. O Quadrivium (número, forma, harmonia, cosmos) é a própria gramática
  da beleza ordenada.

Decisões estéticas decorrentes:
- **Tema CLARO**, premium e lúdico (referências de *acabamento*: Educacross, BYJU's FutureSchool,
  Kodland) **à luz da cosmovisão clássica** — nunca copiar conteúdo dessas marcas, apenas o nível
  de polimento.
- **NUNCA usar emoji como ícone.** Onde a tentação seria um emoji, usamos **ilustração 3D clay**
  ou **personagem chibi** flutuante. Emoji só pode aparecer dentro de texto de depoimento real.
- Movimento **sutil e contínuo** (flutuar/orbitar/parallax leve) que nunca distrai do conteúdo,
  sempre respeitando `prefers-reduced-motion`.
- Heráldica/glória ficam **dentro da plataforma** (cartas, premiações, navy+dourado); o **site
  institucional** é claro, arejado e acolhedor. Dois "ambientes", mesma alma.

### 1.3 Tom de voz da marca
- **Nobre, mas caloroso.** Falamos como um mentor sábio que respeita a criança e a família.
- **Convite, não pressão.** "Avance na jornada", "Venha contemplar", "Junte-se ao Reino".
- **Enraizado.** Citações bíblicas e clássicas aparecem com naturalidade, sem proselitismo agressivo.
- **Claro para dois públicos:** para a **escola/gestor**, falamos de resultado, formação docente e
  relatórios; para a **família**, de jornada, segurança, valores e prazer de aprender.
- **Os guardiões narram a plataforma** (Lyra, Aion, Kael, Numa, Geon, Melos, Astra). Cada um tem
  personalidade fixa; eles celebram conquistas e consolam tropeços sempre apontando para a virtude.
- Vocabulário recorrente: *jovem sábio, jornada, Reino, Arte, guardião, contemplar, virtude, Arks,
  trilha, coroa.* Evitar: jargão técnico cru, gírias passageiras, linguagem de "viciar o usuário".

---

## 2. Sistema de design

### 2.1 Paleta oficial
Cada Arte/guardião tem **uma cor-assinatura**. O **dourado** é a cor da marca (glória, conquista).
O **navy** é o ambiente sagrado da plataforma (cartas, premiações). O **claro** é o ambiente do site.

| Token | Hex | Dono / uso |
|---|---|---|
| `lyra` (rosa) | `#ec4899` | Gramática · Lyra · Spelling Bee, Radix |
| `aion` (azul) | `#3b82f6` | Lógica · Aion · Desafio dos Sábios |
| `kael` (vermelho) | `#ef4444` | Retórica · Kael · Ark (histórias), Debate |
| `numa` (verde) | `#10b981` | Aritmética · Numa · Ábaco Sagrado |
| `geon` (roxo) | `#8b5cf6` | Geometria · Geon · quebra-cabeças de forma |
| `melos` (âmbar) | `#f59e0b` | Música · Melos · ritmo e harmonia |
| `astra` (índigo) | `#6366f1` | Astronomia · Astra · cosmos e calendário |
| `code` (ciano) | `#06b6d4` | Programação — "a nova linguagem" |
| `gold` (dourado claro) | `#f1c40f` | Acento de marca, brilhos, badges |
| `gold-btn` (dourado botão) | `#e0a417` | Botões/CTA dourados |
| `gold-ink` (dourado texto) | `#b8860b` | Dourado legível sobre fundo claro |
| `navy` (marinho profundo) | `#0b1222` / `#0f172a` | Ambiente da plataforma, cartas, premiação |
| `ink` (texto) | `#0f172a` | Títulos e texto principal no claro |
| `muted` (texto suave) | `#475569` | Texto secundário, legendas |
| `bg` (fundo claro) | `#ffffff` / `#f6f8fc` | Fundos do site |

**Regras de uso da cor**
- Cada **módulo/seção** adota a cor da sua Arte (halo/brush, blob sob a foto, badges).
- O **dourado é acento**, nunca o fundo de grandes áreas. Glória se dosa.
- Texto sempre `ink`/`muted` no claro; para dourado em texto, usar `gold-ink` (`#b8860b`),
  nunca `#f1c40f` puro sobre branco (contraste insuficiente).
- Gradientes de blob: da cor da Arte (~12% de opacidade) ao transparente. Suaves, nunca berrantes.
- Programação usa `code` ciano e é apresentada como a **8ª linguagem** ("nova língua do nosso tempo"),
  irmã das 7 Artes, não substituta delas.

### 2.2 Tipografia
- **Display / títulos: `Cinzel`** (serifada romana, com ar de inscrição clássica). Usar em hero,
  títulos de seção, nomes de Arte/guardião, nomes de cartas. Peso 600–700. Evitar Cinzel em blocos
  longos (cansa) — só títulos e rótulos curtos.
- **Texto / UI: uma sans humanista** (ex.: `Inter`, `Geist` ou `Nunito Sans`). Corpo, botões,
  legendas, dados. Preferir uma sans com cantos levemente suaves para combinar com o lúdico clay.
- **Numerais de jogo/HUD:** a mesma sans, peso 700, *tabular-nums* para Arks/níveis não "pularem".
- Escala tipográfica (claro, desktop): display 56/44 · h1 40 · h2 32 · h3 24 · corpo 18/16 ·
  legenda 14 · micro 12. Mobile reduz ~20%. Altura de linha generosa (1.5 no corpo).
- Hierarquia: Cinzel define o "tom de Reino"; a sans garante leitura confortável.

### 2.3 Escala de espaçamento (grid de 4px)
Base **4px**. Steps: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- Padding interno de card: 24–32. Gap entre cards: 24. Gutter de grid: 24–32.
- Respiro vertical entre seções: 96 (desktop) / 64 (mobile). Generosidade = beleza/ordem.
- Largura de leitura de blocos de texto: máx. ~68ch. Container do site: máx. 1200–1280px.

### 2.4 Cards, sombras e cantos
- **Cantos:** raio padrão **16px** em cards; **12px** em botões/pílulas; **24px** em painéis
  grandes/hero-cards; **9999px** em badges e avatares circulares.
- **Sombras (claro):** suaves e em camadas, nunca duras.
  - `shadow-sm`: `0 1px 2px rgba(15,23,42,.06)`
  - `shadow-card`: `0 8px 24px rgba(15,23,42,.08)`
  - `shadow-float`: `0 16px 40px rgba(15,23,42,.12)` (elementos flutuantes/hover)
  - Halo de cor: `0 12px 32px rgba(<cor da Arte>,.18)` por trás de fotos/ícones daquele módulo.
- **Borda:** 1px `rgba(15,23,42,.06)` ou borda dourada fina (1px `#f1c40f`) em cards "premium".
- **Cards de jogo/Arte:** topo com a cor da Arte (faixa/halo) + foto/guardião sobre blob,
  badges (idade, Arte), título em Cinzel, descrição em sans, CTA dourado. Hover: leve elevação
  (`translateY(-4px)` + `shadow-float`) e brilho dourado sutil.
- **Cartas da plataforma (níveis/orbes):** ambiente **navy+dourado**, moldura ornamentada,
  template fixo (já gerado em `public/img/cards/`). Aqui sim a heráldica brilha.

### 2.5 Princípios de animação
Movimento a serviço da contemplação, nunca da distração. **Sempre** respeitar
`prefers-reduced-motion: reduce` → desliga flutuação/orbitação/parallax e mantém só fades curtos.

- **Flutuar (`float`):** ícones 3D e guardiões sobem/descem 6–10px num ciclo de 4–7s, *ease-in-out*,
  com fases dessincronizadas entre elementos (nada "pulsa junto").
- **Orbitar (`orbit`):** no hero, ícones giram lentamente (20–40s por volta) ao redor da criança
  central, em anéis de raios diferentes; combina com flutuação leve.
- **Parallax suave:** ao rolar, camadas de brush/blob movem-se mais devagar que o conteúdo
  (fator 0.1–0.3). Sutil, perceptível só no canto do olho.
- **Entrada (`reveal`):** seções aparecem com fade + leve `translateY(16px)` quando entram na
  viewport (já existe `reveal.tsx`). Stagger de 60–90ms entre filhos.
- **Hover:** elevação + sombra + brilho dourado; escala máx. 1.03. Transições 150–250ms.
- **Premiação (plataforma):** overlay escurecido, **raios dourados**, partículas/confete, "punch"
  de zoom, carta que **vira (flip)** e brilha, fanfarra + vibração. É o momento de glória — pode ser
  exuberante, mas curto (2–4s) e sempre com botão "Continuar". (Ver `premiacao-overlay.tsx`,
  `floating-celebration.tsx`.)
- **Curvas:** padrão `cubic-bezier(.22,.61,.36,1)` (ease-out suave). Nada de "molas" exageradas
  no site institucional; um quê de elasticidade só nas premiações.

### 2.6 Brushes e fundos em camadas (por módulo)
Cada módulo ganha **profundidade** com camadas atrás do conteúdo (feitas em código —
SVG/CSS, sem geração externa; ver `Brush` em `floating-art.tsx`):

1. **Blob de cor** da Arte (radial, ~10–14% de opacidade) — dá o "clima" do módulo.
2. **Brush/pincelada orgânica** (SVG com leve textura) na cor da Arte, atrás de fotos e títulos.
3. **Anéis/órbitas** finos (dourado a 8–15%) sugerindo o "cosmos" e a órbita dos saberes.
4. **Partículas/estrelinhas** douradas esparsas (densidade baixíssima) reforçando o tema celeste.
5. **Grade/linhas guia** quase invisíveis em seções do Quadrivium (geometria/ordem).

Regra: **um brush dominante por seção**, na cor daquela Arte. Nunca empilhar cores rivais no
mesmo módulo (mantém a leitura calma e a beleza ordenada).

---

## 3. As 3 famílias de assets (estilos-mestre fixos)

Toda figura do projeto pertence a **uma** destas três famílias. O ESTILO-MESTRE de cada família é
**fixo** e deve ser repetido no início de **todo** prompt daquela família, para o traço nunca variar.

### Família A — Fotografia recortada (crianças e adultos)
Pessoas reais, estúdio, recorte perfeito em **PNG transparente**, prontas para flutuar sobre blobs.

> **ESTILO-MESTRE A (cole sempre no início):**
> *"Professional studio photo, real Brazilian person, soft natural lighting, vivid clean colors,
> modern and bright look, joyful and confident, high sharpness, no text, no logo, **perfect cutout
> with a 100% transparent background (PNG)**. Posture of someone who studies/teaches/discovers with
> joy. Diverse, authentic, child-appropriate."*
> Em PT: *"Foto profissional de estúdio, pessoa brasileira real, iluminação suave e natural, cores
> vivas e limpas, visual moderno e claro, alegre e confiante, alta nitidez, sem texto, sem logo,
> recorte perfeito com fundo 100% transparente (PNG). Postura de quem estuda/ensina/descobre com
> prazer. Diversidade brasileira autêntica, apropriado para crianças."*

Regras A: **diversidade brasileira real** (tons de pele, cabelos, idades), roupas atemporais e
limpas (nada de marcas/estampas datadas), iluminação coerente entre todas as fotos para que
convivam na mesma página. Sempre cutout transparente.

### Família B — Ícones/figuras 3D clay (objetos do nosso universo)
Objetos e símbolos das Artes em **3D "clay/plasticine soft"**, para flutuar e orbitar.

> **ESTILO-MESTRE B (cole sempre no início):**
> *"3D icon in soft **clay / plasticine** style, rounded corners, soft chunky volumes, matte
> finish, gentle contact shadow, vivid Arkanos-palette colors, premium yet playful and
> child-friendly, **100% transparent background (PNG)**, no text, ready to float. Single centered
> object, studio soft light."*
> Em PT: *"Ícone 3D em estilo clay/plasticina macia, cantos arredondados, volumes macios e
> fofos, acabamento fosco, sombra de contato suave, cores vivas da paleta Arkanos, premium porém
> lúdico e infantil, fundo 100% transparente (PNG), sem texto, pronto para flutuar. Objeto único
> centralizado, luz suave de estúdio."*

Regras B: **um objeto por imagem**, centralizado, mesma escala de "fofura" e mesmo nível de
acabamento fosco em todos. Cada objeto carrega a **cor da Arte** a que pertence (ver prompts).

### Família C — Personagens chibi cartoon (guardiões)
Os guardiões. Identidades **fixas** (ver `scripts/generate-guardians-ref.mjs`). **Não criar novos
guardiões sem aprovação.** O pipeline existente usa Flux Kontext com as artes originais
(`lyra/aion/kael.png`) como referência de estilo.

> **ESTILO-MESTRE C (cole sempre no início):**
> *"Chibi cartoon mascot, anime style, thick clean black outlines, flat cel-shading, bright flat
> saturated colors, big expressive eyes, simple shapes, full body, child-friendly illustration.
> Match the reference image's exact art style and design. Pure transparent background (PNG). No
> painterly texture, no realism, no gradients, no text."*

Regras C: para qualquer **pose nova** de um guardião existente, manter **a identidade exata** do
script (cor de cabelo, olhos, traje, item) e usar a arte original como referência. Saída final:
`public/img/guardioes/guardiao-<nome>.webp` (transparente). Identidades canônicas:

| Guardião | Arte | Cor | Identidade fixa (resumo do script) |
|---|---|---|---|
| **Lyra** | Gramática | `#ec4899` | Menina, cabelo ROSA em rabo-de-cavalo lateral, olhos verde-água, túnica vermelha com dourado, capa azul, **pena dourada brilhante**. |
| **Aion** | Lógica | `#3b82f6` | Menino, cabelo AZUL espetado, olhos azuis, túnica creme com dourado, capa azul, cinto marrom, **relógio de bolso dourado** no peito. |
| **Kael** | Retórica | `#ef4444` | Menino, cabelo VERMELHO-LARANJA espetado, túnica vermelha com dourado, capa azul, cinto marrom, **espada prateada**. |
| **Numa** | Aritmética | `#10b981` | Adolescente, cabelo VERDE espetado, túnica teal com dourado e capa teal, **ábaco dourado** + números flutuantes. |
| **Geon** | Geometria | `#8b5cf6` | Adolescente, cabelo ROXO, túnica roxa com dourado e capa violeta, **compasso dourado** + sólidos (cubo, esfera, pirâmide). |
| **Melos** | Música | `#f59e0b` | Adolescente, cabelo âmbar-laranja ondulado, túnica laranja com dourado e capa, **lira dourada** + notas/ondas sonoras. |
| **Astra** | Astronomia | `#6366f1` | Adolescente, cabelo índigo escuro, **capa estrelada azul-profundo com estrelas douradas**, túnica com dourado, **esfera armilar dourada** + estrelas. |

> Já existem no repositório: bases dos 7 guardiões + fases de idade (fase1/2/3) de Lyra/Aion/Kael
> (ver §6). Use SEMPRE essas como referência ao gerar poses novas.

---

## 4. Biblioteca completa de prompts (parte central)

> **Como usar:** para cada figura, cole o **ESTILO-MESTRE da família** (§3) + a **cena específica**
> abaixo. Salve com o **nome de arquivo** na **pasta** indicada, na **proporção/fundo** indicados.
> Pastas canônicas:
> - Fotos (Família A) → `web-v2/public/img/site/fotos/`
> - Ícones 3D (Família B) → `web-v2/public/img/site/icones/`
> - Mockups de dispositivo → `web-v2/public/img/site/mockups/`
> - Guardiões (Família C) → `web-v2/public/img/guardioes/`
> - Cartas/medalhas/níveis da gamificação → `web-v2/public/img/cards/` (em grande parte já gerados;
>   prompts em `GAMIFICACAO.md` §11). Aqui focamos no **site/plataforma/consultoria**.

### 4.A — HERO (Família A + B)

**A1. Criança central do hero** — `hero-crianca.png` · `fotos/` · vertical **~900×1100** · **PNG transparente** · Estilo-mestre A
> Cena: *"Brazilian child, about 9 years old, smiling brightly and confident, holding a tablet/book
> close to the chest, looking slightly up toward the viewer, wearing a clean modern light-colored
> outfit. Whole upper body, slight three-quarter angle, perfect transparent cutout."*
> Esta criança fica no centro do hero, com os ícones 3D orbitando ao redor (já implementado em
> `floating-art.tsx` / `HeroShowcase`).

**A2. Variação do hero — menina apontando para cima** — `hero-crianca-2.png` · `fotos/` · vertical ~900×1100 · PNG transparente · Estilo-mestre A
> Cena: *"Brazilian girl, about 8 years old, joyful, one hand raised pointing up as if reaching a
> floating star of knowledge, the other holding a book, dynamic happy posture. Transparent cutout."*

**A3. Variação do hero — menino contemplando** — `hero-crianca-3.png` · `fotos/` · vertical ~900×1100 · PNG transparente · Estilo-mestre A
> Cena: *"Brazilian boy, about 11 years old, calm and curious, looking up with wonder as if
> contemplating the stars, holding a glowing tablet showing a constellation, gentle smile.
> Transparent cutout."*

### 4.B — CRIANÇAS E ADULTOS DAS SEÇÕES (Família A)
Cada foto vive sobre um **blob na cor do módulo**. Sempre cutout transparente, vertical ~800×1000
(salvo indicação), `fotos/`, Estilo-mestre A. Diversidade brasileira.

**B1. Criança estudando (Desafio dos Sábios / Lógica · azul)** — `foto-desafios.png`
> *"Brazilian child focused and happy, answering a quiz on a tablet, finger about to tap an answer,
> slight smile of discovery, sitting posture. Transparent cutout."*

**B2. Criança soletrando (Spelling Bee / Gramática · rosa)** — `foto-spelling.png`
> *"Brazilian child cheerfully spelling a word, mouth shaping a letter, one hand gesturing, joyful
> expression, holding a small book. Transparent cutout."*

**B3. Criança com matemática/geometria (Quadrivium / Numa · verde)** — `foto-quadrivium.png`
> *"Brazilian child curious and engaged, holding geometric shapes / a small abacus, looking at them
> with wonder, bright expression. Transparent cutout."*

**B4. Criança programando (Programação · ciano)** — `foto-programacao.png`
> *"Brazilian child assembling colorful coding blocks / a small friendly robot, concentrated and
> delighted, modern clean look. Transparent cutout."*

**B5. Estudo em casa / homeschool (família · âmbar)** — `foto-familia.png` · horizontal ~1100×850
> *"Brazilian mother (or father) and child studying together at a cozy home table, warm and loving,
> the child pointing at a tablet, both smiling. Whole scene, two people, transparent cutout."*

**B6. Sala de aula clássica (escola · azul)** — `foto-escola.png` · horizontal ~1200×850
> *"Brazilian children in a calm, classical and welcoming classroom setting, attentive and happy,
> a few seated, warm light. Group of 2–3 children, transparent cutout."*

**B7. Professor(a) (consultoria/formação · dourado)** — `foto-professora.png` · vertical ~800×1000
> *"Brazilian teacher, warm and inspiring, mid-adult, gesturing as if teaching, holding a tablet
> with reports, confident professional yet caring look, smart-casual clothes. Transparent cutout."*

**B8. Gestor(a) escolar (decisor · navy/dourado)** — `foto-gestor.png` · vertical ~800×1000
> *"Brazilian school principal / coordinator, professional and approachable, mid-adult, arms gently
> crossed or holding a folder, confident reassuring smile, business-casual. Transparent cutout."*

**B9. Família educadora completa (faixa CTA família)** — `foto-familia-completa.png` · horizontal ~1300×900
> *"Brazilian family (parents and 1–2 children) happy together with a tablet/book, homeschool vibe,
> warm and united, looking at the viewer. Transparent cutout."*

**B10. Aluno comemorando conquista (gamificação/premiação)** — `foto-aluno-comemora.png` · vertical ~800×1000
> *"Brazilian child celebrating a victory, fists up in joy, big proud smile, eyes bright, as if
> just earned an achievement. Transparent cutout."*

### 4.C — ÍCONES 3D CLAY NO NOSSO CONTEXTO (Família B)
Pasta `icones/`, **~512×512**, **PNG transparente**, Estilo-mestre B, **um objeto centralizado**.
A cor entre parênteses é o acabamento dominante daquele objeto.

| # | Arquivo | Objeto / cena (após Estilo-mestre B) | Cor |
|---|---|---|---|
| C1 | `orbe.png` | *"a glowing magical orb of knowledge, blue core with golden sparkles inside, soft glow"* | azul+dourado |
| C2 | `pena.png` | *"a golden writing quill feather, elegant, soft pink-and-gold tones"* (Gramática/Lyra) | rosa+dourado |
| C3 | `livro.png` | *"an open illuminated book with soft glowing pages, a tiny star above it"* | rosa |
| C4 | `pergaminho.png` | *"a rolled illuminated scroll/parchment with a golden seal and faint glow"* | dourado |
| C5 | `balanca.png` | *"a golden balance scale, perfectly symmetric"* (Lógica/Aion) | azul |
| C6 | `compasso.png` | *"a golden drawing compass with small geometric solids (cube, sphere, pyramid) around it"* (Geometria/Geon) | roxo |
| C7 | `nota.png` | *"a glossy musical note (or a small golden lyre) with tiny floating sound waves"* (Música/Melos) | âmbar |
| C8 | `esfera-armilar.png` | *"a golden armillary sphere with tiny stars/constellation around it"* (Astronomia/Astra) | índigo |
| C9 | `codigo.png` | *"a block with code braces { } symbol, friendly and glossy"* (Programação) | ciano |
| C10 | `coruja.png` | *"a cute wise owl, holding a tiny book, friendly big eyes, small graduate vibe"* (sabedoria) | dourado+âmbar |
| C11 | `trofeu.png` | *"a golden trophy cup, premium, soft glow"* | dourado |
| C12 | `medalha.png` | *"a golden round medal with a navy ribbon, blank center, soft shine"* | dourado+navy |
| C13 | `bussola.png` | *"a golden compass (navigation), classic, pointing north, soft glow"* | dourado |
| C14 | `ampulheta.png` | *"an elegant golden hourglass with glowing sand — the Arkanos logo mark"* | dourado |
| C15 | `abaco.png` | *"a small golden abacus with colorful beads"* (Aritmética/Numa) | verde |
| C16 | `solido.png` | *"a set of glossy geometric solids (cube, sphere, tetrahedron) stacked"* (Geometria) | roxo |
| C17 | `estrela.png` | *"a single glowing golden star / small constellation"* (Astronomia) | índigo |
| C18 | `coroa.png` | *"a small golden laurel crown, soft glow"* (conquista/virtude) | dourado |
| C19 | `escudo.png` | *"a heraldic shield with a golden trim, soft and friendly"* (guardião/proteção) | navy+dourado |
| C20 | `chave.png` | *"a golden ornate key, soft glow"* (acesso ao saber) | dourado |

> Estes ícones orbitam a criança no hero e pontuam as seções (um por Arte). Para faixas CTA e
> "Como funciona", podem aparecer maiores (~768px) — manter o mesmo traço clay.

### 4.D — GUARDIÕES (Família C)
Pasta `guardioes/`, Estilo-mestre C, **PNG/WebP transparente**, **corpo inteiro**. Identidades
fixas da tabela em §3 (Família C). **Manter a identidade exata** e usar a arte original como
referência (pipeline `generate-guardians-ref.mjs`).

**Quadrivium — já gerados (base):** `guardiao-numa.webp`, `guardiao-geon.webp`, `guardiao-melos.webp`,
`guardiao-astra.webp`. Para regenerar/ajustar, usar os prompts do script (já canônicos).

**Poses extras (a gerar conforme necessidade) — manter identidade + referência:**

**D1. Lyra — pose de boas-vindas** — `guardiao-lyra-acolhe.webp`
> Estilo-mestre C + identidade de Lyra + *"welcoming pose, one hand extended toward the viewer,
> warm smile, a few floating golden letters around her."*

**D2. Aion — pose pensativa (tutorial)** — `guardiao-aion-explica.webp`
> Estilo-mestre C + identidade de Aion + *"explaining pose, pointing upward to a floating glowing
> balance scale and gears, thoughtful confident look."*

**D3. Kael — pose heroica (CTA/Retórica)** — `guardiao-kael-discursa.webp`
> Estilo-mestre C + identidade de Kael + *"heroic speaking pose, one arm raised, golden light
> around him, inspiring expression."*

**D4. Numa — apresentando o Ábaco Sagrado** — `guardiao-numa-abaco.webp`
> Estilo-mestre C + identidade de Numa + *"presenting a glowing golden abacus, friendly, floating
> golden numbers around him."*

**D5. Geon / Melos / Astra — poses de apresentação** — `guardiao-geon-apresenta.webp`,
`guardiao-melos-apresenta.webp`, `guardiao-astra-apresenta.webp`
> Estilo-mestre C + identidade respectiva + *"friendly presenting pose toward the viewer, holding
> their signature item (compass+solids / golden lyre / armillary sphere)."*

**D6. Guardiões falando (narração de premiação/fim de jogo)** — `guardiao-<nome>-fala.webp`
> Estilo-mestre C + identidade + *"close-up half body, speaking warmly to the viewer, gentle proud
> smile, one hand on chest or gesturing."* (Usado nas telas narradas — ver `GAMIFICACAO.md` §9.)

> **Fases de idade** (onboarding por idade): Lyra/Aion/Kael já têm `-fase1/-fase2/-fase3`. Se o
> Quadrivium precisar de fases, seguir o mesmo padrão de sufixo e os textos `AGES` do script.

### 4.E — MOCKUPS DE DISPOSITIVO (composição)
Pasta `mockups/`, **PNG transparente** (device recortado), horizontal **~1400×1000**. Estes são
**fotomontagens**: um aparelho realista exibindo uma **captura real da tela do jogo**. Não gerar a
UI por IA — usar **screenshot real** da plataforma dentro do device.

**E1. Tablet exibindo o Desafio dos Sábios** — `mockup-tablet-desafio.png`
> Composição: tablet moderno em ângulo leve (3/4), recorte transparente, sombra suave de contato.
> Dentro da tela: **screenshot real** do quiz (HUD com Arks, guardião Aion, questão). Moldura
> escura fina, brilho sutil de vidro. Em volta (no layout), ícones 3D clay flutuam.

**E2. Laptop exibindo o painel de relatórios (consultoria)** — `mockup-laptop-relatorios.png`
> Laptop em vista frontal levemente inclinada, recorte transparente. Tela: **screenshot real** do
> dashboard de relatórios em tempo real (gráficos, turmas, progresso). Para a página de escola.

**E3. Celular exibindo a Coleção/Ranking** — `mockup-celular-colecao.png`
> Smartphone vertical, recorte transparente. Tela: **screenshot real** da página de coleção (orbes,
> níveis) ou do ranking. Para faixas de gamificação e família.

**E4. Trio de dispositivos (multiplataforma)** — `mockup-trio.png`
> Laptop + tablet + celular agrupados, cada um com uma tela real diferente, recorte transparente.
> Para hero de "Programas" ou seção "Acesse de qualquer lugar".

> **Diretriz de composição:** sempre device realista + **screenshot real** da nossa tela (nunca UI
> inventada). Recorte transparente para que o device flutue sobre o blob/brush da seção. Sombra de
> contato coerente com a luz das fotos da página.

### 4.F — MASCOTE / COMPANHEIRO (à luz do nosso contexto)
O companheiro do aluno é a **Coruja da Sabedoria** — símbolo clássico-cristão do saber e da
vigília ("vigiar e contemplar"). Família **B (clay 3D)** para o site/UI e versão **C-compatível**
se virar personagem narrador. Pasta `icones/` (ou `guardioes/` se ganhar fala).

**F1. Coruja da Sabedoria — base** — `mascote-coruja.png` · `icones/` · ~600×600 · transparente · Estilo-mestre B
> *"a cute wise owl mascot in soft clay 3D, big friendly eyes, tiny golden graduate/laurel touch,
> holding a small glowing book, warm amber-and-gold tones, premium and child-friendly."*

**F2. Coruja — poses de UI** — `mascote-coruja-aponta.png`, `mascote-coruja-comemora.png`, `mascote-coruja-acena.png` · `icones/` · transparente · Estilo-mestre B
> Variações: *apontando* (para dicas/tutorial), *comemorando* (premiação leve), *acenando*
> (onboarding/vazios). Mesmo traço clay, mesma coruja.

> A coruja **complementa** os guardiões (não os substitui): ela é a "voz amiga" da interface
> (dicas, tooltips, estados vazios); os guardiões são os mestres de cada Arte.

---

## 5. Aplicação por página

> Componentes existentes: `Hero`+`floating-art` (HeroShowcase, Brush), `FeatureRow`,
> `games-section`, `trivium-section`, `programacao-section`, `audience-section`, `stats-section`,
> `testimonials-section`, `cta-section`, `site-header/footer`, `game-card`. A criar:
> `ProgramCard`, `DeliverablesGrid`, `StepsRow`, `CtaBand`, `StatBig`+`BrazilReach`, `FounderCard`,
> `LogosStrip`, `DeviceMockup`. **Adapte tudo ao Arkanos — nunca copie textos da Educacross.**

### 5.1 Landing (`/`)
Ordem e montagem (claro, respiro 96px entre seções; cada seção com brush na cor do módulo):
1. **Header** claro; "Meu Painel" quando logado. Menu: Programas · Para Escolas · Para Famílias ·
   Sobre · Entrar.
2. **Hero** (`HeroShowcase`): `hero-crianca.png` central sobre blob dourado/azul; ícones 3D
   (`orbe`, `pena`, `balanca`, `compasso`, `nota`, `estrela`, `codigo`) **orbitando**; título em
   **Cinzel** ("O Reino do Saber e da Virtude"), subtítulo em sans, dois CTAs (escola / família).
3. **Stats** (`stats-section`): 7 Artes · jogos · questões · 7 guardiões (números reais).
4. **Jogos** (`games-section` / `game-card`): cards coloridos por Arte (Desafio/azul, Spelling/rosa,
   Quadrivium/verde, Ark/vermelho), cada um com guardião + foto sobre blob.
5. **As 7 Artes Liberais** (`trivium-section`): Trivium + Quadrivium, cada Arte com seu guardião,
   cor e ícone 3D. Brush celeste de fundo.
6. **Programação — "a nova linguagem"** (`programacao-section`): ciano, `foto-programacao.png` +
   `codigo.png`. Posicionada como 8ª linguagem irmã das 7 Artes.
7. **Públicos** (`audience-section`): duas colunas — **Escolas** (`foto-escola.png`/`foto-gestor.png`)
   × **Famílias** (`foto-familia.png`/`foto-familia-completa.png`), cada uma com seu CTA.
8. **FeatureRow — Relatórios em tempo real** (`FeatureRow`): `mockup-laptop-relatorios.png` +
   checklist (acompanhamento por aluno/turma, para escola e para família).
9. **FeatureRow — Gamificação com guardiões** (`FeatureRow`): `mockup-tablet-desafio.png` +
   guardião + checklist (Arks, níveis, orbes, medalhas, ranking que honra a jornada).
10. **Programas** (a criar — `ProgramCard` grid): base (nossos jogos) + expansões correlatas.
11. **"O que você recebe"** (`DeliverablesGrid`): 2 colunas — Experiência Digital × Consultoria.
12. **Presença/números + selos** (`BrazilReach`, `LogosStrip`) — quando houver dados reais.
13. **Depoimentos** (`testimonials-section`).
14. **CTA + Footer + crédito Arkos** (`cta-section`, `site-footer`, `site-credit`).

### 5.2 Páginas de Programas (`/programas` e `/programas/[slug]`)
Base = **nossos jogos/Artes**; expansões = correlatas (adaptadas, nunca copiadas):
- **Base (nossos):** Desafio dos Sábios (Lógica), Spelling Bee (Gramática), Radix (Gramática/PT),
  Ábaco Sagrado (Aritmética/Numa, *em breve*), Ark (Retórica/Kael, *em breve*), Coleção/Jornada.
- **Expansões correlatas (a definir conteúdo com o usuário):** Alfabetização e Leitura, Avaliação
  Digital, Olimpíadas/Eventos Gamificados, Expedição de Aprendizagem (Mat+Português), Trilhas de
  Leitura, Biblioteca digital.

Cada **página de programa** monta-se com:
1. **Hero do programa** — guardião + foto + `mockup` do programa, cor da Arte.
2. **"O que é"** — `FeatureRow` (texto + imagem).
3. **"O que você recebe"** — `DeliverablesGrid`.
4. **"Como funciona em N passos"** — `StepsRow` (ícone 3D numerado + título + texto).
5. **`CtaBand`** — faixa colorida "Quero este programa na minha escola/casa".

`ProgramCard` (grid em `/programas`): foto/mascote no topo, badges (Arte, idade), título Cinzel,
descrição, "Ver Programa".

### 5.3 "O que você recebe" (`DeliverablesGrid`)
Duas colunas, ícones 3D clay em cada item (nunca emoji):
- **Experiência Digital (aluno):** jogos das 7 Artes, Arks/níveis, orbes e medalhas, missões,
  ranking que honra a jornada, coleção (sala de troféus), narração dos guardiões.
- **Consultoria / Acompanhamento (escola e família):** implantação guiada, **formação de
  professores**, suporte contínuo, **relatórios em tempo real** (aluno/turma), trilhas alinhadas ao
  currículo clássico, materiais de apoio.

### 5.4 "Como funciona em N passos" (`StepsRow`)
Para escola e para família, 3–4 passos, cada um com **ícone 3D numerado** (clay) + título Cinzel:
- Escola: 1) Diagnóstico e planejamento · 2) Implantação + formação docente · 3) Alunos jogam e
  aprendem · 4) Relatórios em tempo real e acompanhamento.
- Família: 1) Cadastro e perfil por idade · 2) Trilha sugerida (Trivium→Quadrivium) · 3) Jornada
  diária com guardiões · 4) Acompanhe o progresso em casa.

### 5.5 Faixas CTA escola/família (`CtaBand`)
Faixa colorida (azul para escola, âmbar para família), título Cinzel + checklist curto + foto/mockup
recortado + botão dourado. Ex.: *"Leve o Reino do Saber para a sua escola"* / *"Eduque seus filhos
com Verdade, Bondade e Beleza"*.

### 5.6 Página Sobre (`/sobre`)
- **Hero "Sobre"** — posicionamento/missão (Cinzel) + foto inspiradora (professor/criança).
- **"Nossa Missão"** — faixa com os transcendentais (Verdade, Bondade, Beleza) e o propósito de
  educação cristã clássica.
- **"Nossa História"** — narrativa do projeto (timeline simples).
- **"Fundadores"** (`FounderCard`) — foto recortada + nome + papel + frase.
- **Presença/números** (`StatBig`/`BrazilReach`) — quando houver dados reais.
- **Parcerias e prêmios** (`LogosStrip`) — selos/escolas parceiras, quando houver.
> Conteúdo institucional **adaptado ao Arkanos** (7 Artes, guardiões, cosmovisão) — nunca copiar
> textos de terceiros.

---

## 6. Manifesto de assets (checklist)

> Marque conforme gerar. Pastas: A=`site/fotos/` · B=`site/icones/` · mockups=`site/mockups/` ·
> C=`guardioes/` · cartas=`cards/`.

### Já existe (não regerar sem motivo)
- [x] Guardiões base: Lyra, Aion, Kael, Numa, Geon, Melos, Astra (`guardioes/guardiao-*.webp`)
- [x] Fases de idade: Lyra/Aion/Kael `-fase1/-fase2/-fase3` (`guardioes/`)
- [x] Cartas de nível (5 Eras) + template (`cards/nivel-era-1..5.webp`, `template-carta-nivel.webp`)
- [x] Orbes (Trivium + Quadrivium + Virtudes) + template (`cards/orbe-*.webp`, `template-carta-orbe.webp`)
- [x] Medalhas (primeiro-passo, perseverança, mente-clara, voz-de-ouro, gabaritou, ofensiva,
      coroa-de-louros, guardiao-trivium, contemplador-ceus) + template (`cards/medalha-*.webp`)
- [x] Brush/HeroShowcase/FeatureRow (código — `floating-art.tsx`, `feature-row.tsx`)

### Hero (Família A + B)
- [ ] `hero-crianca.png` (A1)
- [ ] `hero-crianca-2.png` (A2) · [ ] `hero-crianca-3.png` (A3)
- [ ] Ícones do hero: `orbe` `pena` `livro` `balanca` `compasso` `nota` `estrela` `codigo` (C1–C9)

### Fotos de seção e públicos (Família A)
- [ ] `foto-desafios.png` (B1) · [ ] `foto-spelling.png` (B2) · [ ] `foto-quadrivium.png` (B3)
- [ ] `foto-programacao.png` (B4) · [ ] `foto-familia.png` (B5) · [ ] `foto-escola.png` (B6)
- [ ] `foto-professora.png` (B7) · [ ] `foto-gestor.png` (B8)
- [ ] `foto-familia-completa.png` (B9) · [ ] `foto-aluno-comemora.png` (B10)

### Ícones 3D clay (Família B)
- [ ] `pergaminho` `coruja` `trofeu` `medalha` `bussola` `ampulheta` `abaco` `solido` `coroa`
      `escudo` `chave` (C4, C10–C20) — além dos 8 do hero acima.

### Mascote (Família B)
- [ ] `mascote-coruja.png` (F1) · [ ] poses `aponta` `comemora` `acena` (F2)

### Guardiões — poses extras (Família C)
- [ ] `guardiao-lyra-acolhe` · [ ] `guardiao-aion-explica` · [ ] `guardiao-kael-discursa`
- [ ] `guardiao-numa-abaco` · [ ] `guardiao-geon-apresenta` · [ ] `guardiao-melos-apresenta`
      · [ ] `guardiao-astra-apresenta`
- [ ] `guardiao-<nome>-fala` (set de narração de premiação, conforme necessidade)

### Mockups de dispositivo (composição com screenshot real)
- [ ] `mockup-tablet-desafio.png` (E1) · [ ] `mockup-laptop-relatorios.png` (E2)
- [ ] `mockup-celular-colecao.png` (E3) · [ ] `mockup-trio.png` (E4)

### Componentes de página a criar (código — fora do escopo de geração de imagem)
- [ ] `ProgramCard` · [ ] `DeliverablesGrid` · [ ] `StepsRow` · [ ] `CtaBand`
- [ ] `StatBig` + `BrazilReach` · [ ] `FounderCard` · [ ] `LogosStrip` · [ ] `DeviceMockup`

---

> **Lembrete final do Designer Sênior:** repita o ESTILO-MESTRE da família no início de cada prompt;
> mantenha a mesma luz/escala entre fotos; um brush dominante por seção; dourado é acento, não fundo;
> nunca emoji como ícone; movimento sempre sutil e com `prefers-reduced-motion`. Verdade na clareza,
> Bondade na formação, Beleza na ordem — *Soli Deo gloria*.
