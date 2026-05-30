# PROJETO COLECIONÁVEIS E MESTRES — A Galeria do Reino

> Documento de conceito + biblioteca de prompts. Escrito pelo **Designer Sênior do Arkanos**.
> Define **Cards colecionáveis (TCG)**, **Orbes (30)**, **Medalhas**, o novo sistema de
> **Carimbos/Selos** e a **Galeria de Mestres** (homenagem aos grandes nomes da educação
> cristã clássica). Tudo **à luz da Educação Cristã Clássica** (Trivium + Quadrivium = 7 Artes
> Liberais; Verdade · Bondade · Beleza; guardiões).
>
> **Documentos irmãos:** `PROJETO_DESIGN_ARKANOS.md` (sistema de design, paleta, estilos-mestre),
> `GAMIFICACAO.md` (níveis, orbes, medalhas, títulos, prompts de jogo).
>
> **Princípio inegociável — CONSISTÊNCIA ABSOLUTA DO TRAÇO.** Antes de gerar qualquer figura,
> repita o ESTILO-MESTRE da família correta no início do prompt. **Três traços, nunca misturados:**
> 1. **Cards heráldicos** (navy + dourado, moldura ornamentada) — para cards, orbes, medalhas, selos de carta.
> 2. **Personagens chibi cartoon** (traço dos guardiões) — para os Mestres.
> 3. **Selos estilo Mario** (adesivos quadrados, lúdicos e nobres) — para os carimbos.
>
> **Salvaguarda de conteúdo:** apenas símbolos **clássicos e cristãos** — louros, brasões, vitrais,
> luz, virtudes, esferas celestes, colunas, pergaminhos, coroas. **Nada ocultista, esotérico,
> bélico-realista ou impróprio para crianças.** Toda imagem é *child-appropriate*. *Soli Deo gloria.*

---

## 0. Sumário

1. Cards colecionáveis (TCG) — anatomia, raridades, prompt-mestre do template
2. Orbes — as 30 ideias recriadas (significado + símbolo + prompt do interior)
3. Medalhas — recriar/expandir (olímpicas: bronze/prata/ouro/louro)
4. Carimbos / Selos — novo sistema (estilo Super Mario 3D Land/World)
5. Mestres — galeria de homenagem (chibi cartoon)
6. Manifesto — checklist do que recriar/gerar

---

## 1. CARDS COLECIONÁVEIS (TCG)

### 1.1 Filosofia

Inspiração de **estrutura** em **Pokémon** (moldura limpa, janela de arte grande, faixa de raridade,
símbolo do "tipo") e **Yu-Gi-Oh!** (rodapé com texto/lema, selo de autenticidade, borda nobre).
Mas a **identidade é 100% Arkanos**: **heráldica clássico-cristã**, ambiente **navy profundo
(`#0b1222`) + dourado (`#f1c40f`)**, brasão no topo e selo no rodapé. A carta não é "monstro de
batalha": é um **emblema de virtude e saber conquistado** — uma relíquia de jornada.

> Cada carta celebra **esforço, perseverança e caráter** (não vaidade). O ranking honra a jornada;
> a coleção é a "sala de troféus". Nada de estética de cassino ou loot-box.

### 1.2 Anatomia da carta (template fixo)

Proporção **vertical 3:4** (recomendado **750×1050 px**, retina **1500×2100**). Camadas, de cima
para baixo:

| Zona | Elemento | Descrição de design |
|---|---|---|
| **Topo** | **Brasão Arkanos** | Pequeno escudo/brasão dourado centralizado no alto da moldura (âncora da marca; a ampulheta dourada do logo pode habitar o brasão). |
| **Faixa de nome** | **Nome da carta** | Tarja sob o brasão, em **Cinzel** (composto por código, **não** na arte gerada). |
| **Janela de arte** | **Interior** | Grande retângulo de cantos arredondados (raio 24) com **moldura interna dourada fina**. É a única parte que muda entre cartas. |
| **Símbolo da Arte** | **Selo do tipo** | Ícone circular monocromático dourado no canto superior da janela (pena=Gramática, balança=Lógica, etc.) — o "tipo" Arkanos. |
| **Faixa de raridade** | **Borda + brilho** | A **moldura inteira** muda de material/brilho conforme a raridade (ver §1.3). Gema de raridade no canto inferior. |
| **Rodapé / lema** | **Descrição + lema** | Filactério (banner) dourado com espaço para descrição curta e **lema/citação** (texto por código). |
| **Selo de autenticidade** | **Selo Arkanos** | Pequeno selo circular de cera/lacre dourado no rodapé (carimbo do Reino) — assina a carta. |

> **Regra de produção:** o template é **uma imagem fixa**. **Nome, numeral, descrição e lema entram
> por código** (Canvas/SVG) — a IA **nunca** escreve texto na arte. A moldura traz **espaços vazios**
> reservados (faixa de nome, rodapé) para o texto compor por cima. Já existem
> `template-carta-nivel.webp`, `template-carta-orbe.webp` e `template-medalha.webp` — manter esses.

### 1.3 As 5 raridades (Terrestre → Celeste)

Mesmo template, **molduras com material/brilho crescente**. A raridade é lida em < 1 segundo pela
**cor da moldura, intensidade do brilho e fundo da janela**.

| Nº | Raridade | Nome | Material da moldura | Brilho / fundo da janela | Gema |
|---|---|---|---|---|---|
| 1 | Comum | **Orbe Terrestre** | bronze fosco, ornamentação simples | sem brilho; fundo navy liso | bronze opaca |
| 2 | Incomum | **Orbe Lunar** | prata polida, filigrana leve | leve halo prateado frio; fundo navy com leve névoa | prata |
| 3 | Rara | **Orbe Solar** | dourado pleno, ornamentação rica | raios dourados suaves saindo do centro | dourada |
| 4 | Épica | **Orbe Estelar** | dourado + esmalte azul-violeta, joias | partículas estelares azul-violeta; fundo cósmico | safira |
| 5 | Lendária | **Orbe Celeste** | dourado + **branco sagrado** luminoso, vitral | aura branca radiante, raios de glória, vitral atrás | diamante/luz |

> **Diferenciação visual canônica:**
> - **Terrestre:** terreno, humilde, mate. Pedra e bronze.
> - **Lunar:** frio, prateado, sereno. Filigrana lunar.
> - **Solar:** quente, dourado pleno, raios. O "ouro" da glória.
> - **Estelar:** noite cósmica, azul-violeta, joias estelares. O firmamento.
> - **Celeste:** **luz branca de vitral**, glória plena — a raridade mais alta (reservada a feitos máximos).
>
> O **mesmo orbe** pode existir em raridades diferentes conforme o feito que o concedeu (a moldura
> muda; o interior é o mesmo). Por isso o interior e a moldura são gerados/aplicados separadamente.

### 1.4 Prompt-mestre do template (gerar 1 vez por raridade, ou 1 base + variações)

> **ESTILO-MESTRE CARDS (cole sempre no início):**
> *"Heraldic classical-Christian collectible trading card frame, ornate border, deep navy background
> (#0b1222) with rich gold (#f1c40f) filigree, dramatic soft lighting, premium and noble yet
> child-friendly, symmetrical, clean. Top: small golden heraldic crest/shield. Bottom: golden ribbon
> banner and a small round wax-seal emblem. Large central rounded art window with a thin inner golden
> frame, **left EMPTY**. **No text, no letters, no numbers anywhere.** Transparent or flat-navy
> background. High quality, sharp, ornamental."*
> Em PT: *"Moldura de carta colecionável heráldica clássico-cristã, borda ornamentada, fundo
> azul-marinho profundo (#0b1222) com filigrana dourada rica (#f1c40f), iluminação dramática suave,
> premium e nobre mas apropriada para crianças, simétrica e limpa. Topo: pequeno brasão/escudo
> dourado. Rodapé: faixa de fita dourada + pequeno selo de lacre redondo. Grande janela central de
> arte com cantos arredondados e moldura interna dourada fina, **deixada VAZIA**. **Sem texto, sem
> letras, sem números.** Fundo transparente ou navy chapado. Alta qualidade, nítido, ornamental."*

**Variações de raridade (anexar ao estilo-mestre):**
- **Terrestre** → *"bronze matte frame, simple ornamentation, no glow, stone/earth accents."*
- **Lunar** → *"polished silver frame, fine filigree, subtle cool silver halo."*
- **Solar** → *"full gold frame, rich ornamentation, soft golden rays from center."*
- **Estelar** → *"gold frame with blue-violet enamel and gemstones, cosmic starry inner glow."*
- **Celeste** → *"radiant gold and sacred-white frame, stained-glass back, rays of glory, white aura."*

**Arquivos:** `template-carta-<raridade>.webp` em `public/img/cards/` (opcional, se quiser uma
moldura por raridade) — ou manter `template-carta-orbe.webp` e aplicar a faixa de raridade por código.

### 1.5 As três categorias de carta e seus significados

| Categoria | Arquivo-base | O que celebra | Como muda |
|---|---|---|---|
| **Cards de Nível** (50) | `nivel-era-1..5.webp` + numeral por código | A **escalada das Artes Liberais** — cada nível é um degrau de formação. Agrupados em 5 Eras (Primeiros Passos → A Coroa). | 5 fundos de Era; **numeral + nome compostos por código**. |
| **Cards de Orbe** (30) | `orbe-<key>.webp` (interior) + template + faixa de raridade | Cada orbe é uma **virtude/saber contemplado** (Trivium, Quadrivium, Virtudes). A relíquia de cada Arte. | Template fixo; muda só o **interior** + a **raridade**. |
| **Cards de Mestre** (galeria) | `carta-mestre-<slug>.webp` (interior) + template | **Homenagem** aos grandes mestres da educação cristã clássica — o aluno "coleciona" os sábios que apontam o caminho (ver §5). | Template fixo (raridade alta); interior = retrato chibi do Mestre dentro da janela. |

> **Cards de Mestre** são a ponte entre o sistema de cards e a Galeria de Mestres (§5): a **arte
> chibi** do Mestre (gerada em §5, fundo transparente) é **posta dentro da janela** da carta
> heráldica. Assim o traço chibi e o traço heráldico convivem **sem se misturar** — o chibi é o
> "retrato" emoldurado pela heráldica. Raridade sugerida: **Solar** (padrão) a **Celeste** (os 3–4
> mestres-fundadores).

---

## 2. ORBES — AS 30 IDEIAS (recriadas à luz da educação cristã clássica)

> **Keys preservadas** (arquivos já existentes mantidos). Cada interior é gerado **isolado** (só o
> miolo, sem moldura — a moldura/raridade entra por código). Arquivo: `orbe-<key>.webp` em
> `public/img/cards/`. Proporção da arte do interior: **quadrada ~1024×1024**, fundo **navy chapado
> ou transparente** (para encaixar na janela). **Sem texto.**
>
> **ESTILO-MESTRE ORBE (cole no início de cada prompt):**
> *"Single centered luminous magical orb/emblem, heraldic classical-Christian style, deep navy
> background (#0b1222) with gold (#f1c40f) accents, soft dramatic glow, ornamental, premium,
> child-friendly, no text, no letters. Symbolic and clean."*
> Em PT: *"Emblema/orbe luminoso único e centralizado, estilo heráldico clássico-cristão, fundo
> azul-marinho profundo (#0b1222) com acentos dourados (#f1c40f), brilho dramático suave, ornamental,
> premium, apropriado para crianças, sem texto, sem letras. Simbólico e limpo."*

### 2.1 Trivium — a Palavra (1–9)

| # | Orbe | Key | Significado (educação cristã clássica) | Símbolo | Prompt do interior (após estilo-mestre) |
|---|---|---|---|---|---|
| 1 | **Gramática** (Lyra) | `gramatica` | A arte de **nomear bem** — o dom da palavra dado por Deus (Gn 2:19, Adão nomeia). Fundamento do Trivium. | Pena dourada + letras iluminadas | *"a glowing golden quill writing luminous illuminated letters, soft pink-gold light"* |
| 2 | **Vocabulário** | `vocabulario` | A **riqueza das palavras** — quanto mais nomeamos, mais contemplamos a criação. | Livro aberto com palavras-luz subindo | *"an open illuminated book with luminous words rising like sparks, pink-gold glow"* |
| 3 | **Ortografia** | `ortografia` | A **correção e a ordem** da escrita — disciplina que reflete a ordem do Criador. | Letra perfeita gravada em selo | *"a perfectly engraved golden letterform inside a heraldic seal, precise and clean"* |
| 4 | **Logos** (Aion) | `logos` | A **Razão** — o raciocínio reto que busca a verdade; eco do *Logos* (Jo 1:1). Fundamento da Lógica. | Balança dourada equilibrada | *"a perfectly balanced golden scale of reason, blue-gold light, serene"* |
| 5 | **Dedução** | `deducao` | Do universal ao particular — **pensar com método** para chegar à verdade. | Labirinto resolvido com fio de luz | *"a small golden labyrinth solved by a thread of light leading to the center, blue glow"* |
| 6 | **Argumento** | `argumento` | A **defesa honesta da verdade** — argumentar sem manipular (Verdade na clareza). | Duas colunas/escudo com elo dourado | *"two classical pillars linked by a golden chain of logic, balanced, blue-gold"* |
| 7 | **Eloquência** (Kael) | `eloquencia` | Falar bem **a serviço do bem** — a palavra que edifica (Ef 4:29). Fundamento da Retórica. | Tribuna clássica + chama da palavra | *"a classical golden rostrum/tribune with a gentle flame of speech above it, red-gold glow"* |
| 8 | **Persuasão** | `persuasao` | Mover corações **para o bem e o verdadeiro** — retórica virtuosa. | Coração + ramo de oliveira dourado | *"a golden heart entwined with an olive branch, warm light, noble"* |
| 9 | **Narrativa** | `narrativa` | A **história bem contada** — a Verdade transmitida em forma de relato (parábolas). | Pergaminho-fita que vira estrada de luz | *"an unrolling golden scroll turning into a road of light/stars, storytelling glow"* |

### 2.2 Quadrivium — o Número e o Cosmos (10–19)

> O Quadrivium revela a **ordem do Criador** — número, forma, harmonia, cosmos (Sl 19:1; Sb 11:21,
> "tudo dispuseste com medida, número e peso").
>
> **Atenção (lacuna a recriar):** existem `orbe-numero`, `orbe-calculo`, `orbe-proporcao`,
> `orbe-ceus`, `orbe-constelacoes`, `orbe-calendario`. **FALTAM 4 arquivos:**
> `orbe-forma` (13), `orbe-simetria` (14), `orbe-harmonia` (15), `orbe-ritmo` (16). Prompts abaixo.

| # | Orbe | Key | Significado | Símbolo | Prompt do interior |
|---|---|---|---|---|---|
| 10 | **Número** (Numa) | `numero` | O número como **linguagem da criação** — Deus criou ordenando. | Ábaco dourado + algarismos sagrados | *"a golden abacus with glowing sacred numerals floating, green-gold light"* |
| 11 | **Cálculo** | `calculo` | A **medida exata** — calcular é honrar a ordem das coisas. | Algarismos que se somam em luz | *"golden numerals combining into a glowing sum, precise green-gold glow"* |
| 12 | **Proporção** | `proporcao` | A **harmonia das medidas** — a proporção áurea como beleza ordenada. | Espiral/retângulo áureo dourado | *"a golden ratio spiral and golden rectangle, elegant geometric light"* |
| 13 | **Forma** (Geon) | `forma` | A **geometria como contemplação** — as formas perfeitas refletem ideias eternas. | Sólidos platônicos + compasso | *"golden platonic solids (cube, sphere, tetrahedron) with a drawing compass, violet-gold glow"* |
| 14 | **Simetria** | `simetria` | O **equilíbrio e a ordem** — a simetria como assinatura do Criador na criação. | Figura espelhada perfeita | *"a perfectly symmetric mandala-like geometric figure, balanced, violet-gold light"* |
| 15 | **Harmonia** (Melos) | `harmonia` | A **música como ordem audível** — a harmonia das esferas; Verdade que se ouve. | Lira dourada + ondas de harmonia | *"a golden lyre with concentric harmony sound-waves, amber-gold glow"* |
| 16 | **Ritmo** | `ritmo` | O **tempo bem medido** — o ritmo como pulso ordenado da criação. | Notas em batida + pulso de luz | *"glowing golden musical notes in steady rhythmic pulses, amber light, ordered"* |
| 17 | **Céus** (Astra) | `ceus` | "Os céus proclamam a glória de Deus" (Sl 19:1) — astronomia como contemplação. | Esfera armilar dourada | *"a golden armillary sphere with tiny stars, indigo-gold cosmic glow"* |
| 18 | **Constelações** | `constelacoes` | As estrelas **ordenadas e nomeadas** por Deus (Sl 147:4). | Constelação dourada conectada | *"a golden constellation of connected stars, deep indigo sky, gentle glow"* |
| 19 | **Calendário** | `calendario` | O **tempo santificado** — luzeiros "para marcar estações" (Gn 1:14). | Roda do ano / sol e lua | *"a golden wheel of the year with sun and moon phases, indigo-gold, ordered"* |

### 2.3 Virtudes & Cosmovisão (20–30)

> Os **três transcendentais** (Verdade, Bondade, Beleza), as **quatro virtudes cardeais** (Prudência,
> Fortaleza, Temperança, Justiça) e as **três teologais** (Fé, Esperança, Caridade). O coração
> formativo do Arkanos.

| # | Orbe | Key | Significado | Símbolo | Prompt do interior |
|---|---|---|---|---|---|
| 20 | **Verdade** | `verdade` | "Eu sou o Caminho, a Verdade e a Vida" (Jo 14:6) — a clareza que não engana. | Cruz luminosa / sol da verdade | *"a luminous golden cross radiating light of truth, white-gold glow, reverent"* |
| 21 | **Bondade** | `bondade` | A formação do **bom caráter** — fazer o bem por amor. | Coração dourado + ramo de oliveira | *"a golden heart with an olive branch, warm gentle light, noble"* |
| 22 | **Beleza** | `beleza` | A **ordem que encanta** — a beleza reflete a glória do Criador. | Rosa dourada / rosácea de vitral | *"a golden rose / stained-glass rosette, harmonious, warm radiant light"* |
| 23 | **Sabedoria** | `sabedoria` | "O temor do Senhor é o princípio da sabedoria" (Pv 9:10). | Coruja + livro / lâmpada | *"a wise golden owl on an open book with a small lamp of wisdom, gold glow"* |
| 24 | **Prudência** | `prudencia` | A virtude que **discerne** o bem em cada situação. | Espelho clássico + serpente sábia | *"a classical golden hand-mirror with a coiled wise serpent emblem, calm gold light"* |
| 25 | **Fortaleza** (Coragem) | `fortaleza` | A **coragem firme** no bem — "o justo cai sete vezes e se levanta" (Pv 24:16). | Coluna/torre + escudo | *"a strong golden column/tower with a heraldic shield, steadfast, gold glow"* |
| 26 | **Temperança** | `temperanca` | O **autodomínio** — a medida justa em todas as coisas. | Jarras vertendo em equilíbrio | *"two golden vessels pouring in perfect balance, serene, gold light"* |
| 27 | **Justiça** | `justica` | **Dar a cada um o que é devido** — equidade e retidão. | Balança + espada de luz (romba) | *"a golden balance scale with a blunt ceremonial sword of justice, fair, gold glow"* |
| 28 | **Fé** | `fe` | A confiança que **vê o invisível** (Hb 11:1). | Âncora + cruz luminosa | *"a golden anchor entwined with a luminous cross, hopeful white-gold light"* |
| 29 | **Esperança** | `esperanca` | A **âncora da alma** que aguarda o bem prometido. | Âncora + estrela da alvorada | *"a golden anchor with a rising dawn star, gentle hopeful glow"* |
| 30 | **Caridade** | `caridade` | O **amor que tudo cumpre** — "a maior delas é o amor" (1Co 13). | Coração flamejante / chama de amor | *"a golden flaming heart of love radiating warm light, the greatest virtue, reverent"* |

---

## 3. MEDALHAS (olímpicas: bronze / prata / ouro / louro)

> Estilo **medalha olímpica**: disco circular em relevo, **fita azul-marinho**, símbolo central
> **monocromático dourado/metal**. Arquivo: `medalha-<key>.webp` em `public/img/cards/`. Quadrado
> **~1024×1024**, fundo transparente. **Sem texto.** Template existente: `template-medalha.webp`.
>
> **ESTILO-MESTRE MEDALHA (cole no início):**
> *"Olympic-style circular medal in relief, [bronze|silver|gold|gold-laurel] metal, deep navy ribbon,
> single centered monochrome symbol of [THEME], heraldic classical-Christian style, soft dramatic
> shine, premium, child-friendly, transparent background, no text, no letters."*

### 3.1 Medalhas existentes (9 — recriar/manter as keys)

| Medalha | Key | Critério | Significado | Tier | Símbolo / prompt central |
|---|---|---|---|---|---|
| **Primeiro Passo** | `primeiro-passo` | Concluir a 1ª prova | Todo grande caminho começa com um passo. | Bronze | porta aberta / pegada — *"an open door with a step of light"* |
| **Perseverança** | `perseveranca` | 7 dias de ofensiva | "O justo cai sete vezes e se levanta" (Pv 24:16). | Prata | chama persistente — *"a steady persistent flame"* |
| **Mente Clara** | `mente-clara` | 90%+ em Lógica | A razão reta que discerne a verdade. | Ouro | coruja + labirinto resolvido — *"a wise owl over a solved labyrinth"* |
| **Voz de Ouro** | `voz-de-ouro` | Concluir a trilha de Retórica | A palavra que edifica (Ef 4:29). | Ouro | pena + megafone clássico — *"a quill and a classical speaking trumpet"* |
| **Gabaritou** | `gabaritou` | 100% numa prova | A excelência buscada com dedicação. | Ouro | estrela perfeita / 100 estilizado — *"a perfect radiant star"* |
| **Ofensiva** | `ofensiva` | Manter ofensiva longa | A constância diária na jornada. | Prata | chama numerada / calendário aceso — *"a flame on a calendar streak"* |
| **Coroa de Louros** | `coroa-de-louros` | "Platinar" uma Arte | A vitória honrosa (1Co 9:25, coroa incorruptível). | Louro | coroa de louros — *"a golden laurel crown"* |
| **Guardião do Trivium** | `guardiao-trivium` | Completar Gram.+Lóg.+Ret. | Domínio da Palavra (as 3 artes do Trivium). | Louro | escudo com 3 símbolos — *"a heraldic shield bearing quill, scale and flame"* |
| **Contemplador dos Céus** | `contemplador-ceus` | Completar o Quadrivium | "Os céus proclamam a glória de Deus" (Sl 19:1). | Louro | esfera armilar + estrelas — *"an armillary sphere among stars"* |

### 3.2 Medalhas novas propostas (expansão — louro/ouro)

| Medalha | Key | Critério | Significado | Tier | Símbolo / prompt central |
|---|---|---|---|---|---|
| **Coração Sábio** | `coracao-sabio` | Completar as Virtudes (orbes 20–30) | A sabedoria que forma o caráter — fim de toda a educação. | Louro | coração + coroa de louros — *"a golden heart crowned with laurel"* |
| **Mestre das Sete Artes** | `sete-artes` | Completar Trivium + Quadrivium | Domínio das 7 Artes Liberais. | Louro | sete estrelas em coroa — *"seven golden stars arranged in a crown/ring"* |
| **Discípulo dos Mestres** | `discipulo-mestres` | Colecionar os Cards de Mestre | Honrar e aprender com os grandes da tradição. | Ouro | brasão com pena e louro — *"a heraldic crest with a quill and laurel"* |
| **Colecionador Celeste** | `colecionador-celeste` | Obter um orbe na raridade Celeste | A excelência da raridade máxima. | Louro | orbe radiante de vitral — *"a radiant stained-glass orb of glory"* |
| **Soli Deo Gloria** | `soli-deo-gloria` | Alcançar o Nível 50 (Platina) | A glória devolvida ao Criador — o topo da jornada. | Louro | sol/glória + coroa — *"a sunburst of glory crowned with laurel, reverent"* |

---

## 4. CARIMBOS / SELOS — sistema NOVO (estilo Super Mario 3D Land/World)

### 4.1 Conceito

Inspiração explícita nos **stamps do Super Mario 3D Land / 3D World**: **adesivos quadrados,
divertidos e colecionáveis**, ganhos ao realizar um feito específico. No Arkanos eles são
**divertidos E nobres** — um meio-termo lúdico entre a solenidade dos cards heráldicos e a leveza do
jogo. Funcionam como **carimbos comemorativos** que o aluno "cola" na sua coleção a cada marco.

**Diferença clara dos outros assets:**
- **Cards/Orbes/Medalhas** = heráldicos, navy+dourado, solenes.
- **Selos** = **adesivos quadrados**, fundo de cor viva (a cor da Arte), traço grosso de "sticker"
  (contorno branco de adesivo + leve sombra), **ícone chibi/clay simpático** no centro. Lúdicos,
  porém com bom gosto (sem cara de "joaninha infantilizada" — nobre e charmoso).

### 4.2 Especificação de traço

> **ESTILO-MESTRE SELO (cole no início de cada prompt):**
> *"Square commemorative sticker stamp, Super Mario 3D World stamp style: thick white sticker
> die-cut outline, soft drop shadow, rounded square, single bold friendly icon centered, flat vivid
> colors, cute and noble, premium, child-friendly, simple and iconic, no text, no letters. Arkanos
> palette, a touch of gold."*
> Em PT: *"Selo-adesivo quadrado comemorativo, estilo stamp do Super Mario 3D World: contorno branco
> grosso de adesivo recortado, sombra suave, quadrado de cantos arredondados, um ícone único, forte
> e simpático, centralizado, cores chapadas e vivas, fofo porém nobre, premium, apropriado para
> crianças, simples e icônico, sem texto, sem letras. Paleta Arkanos, um toque de dourado."*

**Arquivo:** `selo-<key>.webp` em `public/img/cards/selos/` (pasta nova). Quadrado **~512×512** (ou
1024 retina). **Fundo do quadrado preenchido** (cor da Arte) + contorno branco de adesivo
(**transparente fora do recorte**). **Sem texto.**

### 4.3 Os ~12 selos propostos

| # | Selo | Key | Feito que marca | Significado | Cor | Ícone / prompt central |
|---|---|---|---|---|---|---|
| 1 | **Primeira Leitura** | `primeira-leitura` | Ler a 1ª lição/clássico | O início do hábito de contemplar pela leitura. | rosa (`#ec4899`) | livrinho aberto sorridente — *"a cute open book with a tiny smile and a sparkle"* |
| 2 | **Gabaritou!** | `gabaritou` | Acertar 100% de uma prova | A alegria da excelência alcançada. | dourado | estrela/100 radiante — *"a bright radiant star giving a thumbs-up vibe"* |
| 3 | **Ofensiva de Fogo** | `ofensiva` | Manter ofensiva (streak) | A constância diária que forja o hábito. | âmbar (`#f59e0b`) | chama simpática com número — *"a cheerful flame mascot"* |
| 4 | **Madrugador** | `madrugador` | Estudar cedo / 1ª da manhã | "De manhã te buscarei" (Sl 63:1) — diligência. | índigo (`#6366f1`) | sol nascente fofo — *"a cute rising sun over a horizon"* |
| 5 | **Caçador de Orbes** | `cacador-orbes` | Obter o 1º orbe | A alegria de colecionar saber e virtude. | azul (`#3b82f6`) | orbe brilhante simpático — *"a cute glowing orb with sparkles"* |
| 6 | **Arte Completa** | `arte-completa` | Completar uma das 7 Artes | Domínio pleno de uma Arte Liberal. | verde (`#10b981`) | medalha-louro fofa com check — *"a cute laurel medal with a checkmark"* |
| 7 | **Pequeno Orador** | `pequeno-orador` | 1ª atividade de Retórica/fala | A coragem de usar bem a palavra. | vermelho (`#ef4444`) | balãozinho de fala nobre — *"a cute speech bubble with a tiny laurel"* |
| 8 | **Mente Geométrica** | `mente-geometrica` | Resolver puzzle de forma | A beleza da ordem geométrica. | roxo (`#8b5cf6`) | sólido geométrico sorridente — *"a cute smiling geometric solid (cube/sphere)"* |
| 9 | **Clássico Lido** | `classico-lido` | Concluir a leitura de um clássico | Subir aos ombros dos grandes (a "grande conversa"). | dourado | pergaminho com fita + selo — *"a cute rolled scroll with a wax seal and ribbon"* |
| 10 | **Coração Bondoso** | `coracao-bondoso` | Feito de virtude/bondade na jornada | A formação do bom caráter. | rosa+dourado | coração fofo com brilho — *"a cute glowing heart with a sparkle"* |
| 11 | **Contemplador** | `contemplador` | Concluir atividade de Astronomia | Contemplar os céus que proclamam a glória (Sl 19:1). | índigo | telescópio/estrela fofo — *"a cute telescope looking at a friendly star"* |
| 12 | **Coroado!** | `coroado` | Subir de Era / marco grande de nível | A vitória honrosa celebrada com alegria. | dourado | coroa de louros fofa com brilho — *"a cute golden laurel crown with sparkles"* |

> **Tom:** os selos podem sorrir e brilhar (lúdicos como Mario), mas o **vocabulário simbólico
> continua clássico-cristão** (louros, pergaminhos, estrelas, corações, sol). Nada de personagens de
> terceiros, nada fora do universo Arkanos.

---

## 5. MESTRES — Galeria de homenagem (chibi cartoon)

### 5.1 Conceito

Uma **galeria de Mestres**: homenagem aos grandes nomes da **educação cristã e clássica**. **Não são
retratos realistas** — são versões **chibi/cartoon respeitosas e infantis** (mesmo traço dos
guardiões), apresentando cada figura como um "sábio amigo" do Reino. Cada Mestre se liga a uma das
**7 Artes / virtudes** e ao **guardião** correspondente: **os guardiões são os "discípulos" que
apontam para esses Mestres** — quando um aluno avança numa Arte, o guardião o apresenta ao Mestre
daquela tradição.

> **Princípio de respeito:** homenagem, não caricatura ofensiva. Traços dignos, simpáticos, com um
> **atributo histórico reconhecível** (um livro, um instrumento, um traje da época estilizado) e
> **fundo transparente**. Sem zombaria, sem distorção desrespeitosa. *Apontam para a Verdade.*

### 5.2 Especificação de traço (família dos guardiões)

> **ESTILO-MESTRE MESTRE (cole no início — é o Estilo-mestre C dos guardiões):**
> *"Chibi cartoon mascot, anime style, thick clean black outlines, flat cel-shading, bright flat
> saturated colors, big expressive friendly eyes, simple shapes, full body, child-friendly, dignified
> and warm homage (not a caricature). Match the Arkanos guardians' exact art style. Period-appropriate
> simplified attire and one recognizable attribute. Pure transparent background (PNG). No painterly
> texture, no realism, no gradients, no text."*

**Arquivo:** `mestre-<slug>.png` em `public/img/site/mestres/` (pasta nova). **Corpo inteiro, fundo
transparente.** Para virar **Card de Mestre** (§1.5), a arte é posta dentro da janela do template
heráldico (`carta-mestre-<slug>.webp`).

### 5.3 A galeria

| Mestre | Slug | Século | Contribuição à educação cristã/clássica | Arte / virtude | Guardião (discípulo) | Atributo / prompt |
|---|---|---|---|---|---|---|
| **Quintiliano** | `quintiliano` | I d.C. | *Institutio Oratoria* — formação do orador virtuoso ("o homem bom que fala bem"); pai da pedagogia da Retórica. | **Retórica** | **Kael** | toga romana simplificada + rolo de pergaminho — *"a kind Roman teacher chibi in a simple toga holding a scroll, warm smile"* |
| **Boécio** | `boecio` | V–VI | Cunhou o termo *Quadrivium*; *A Consolação da Filosofia*; transmissor da matemática e música clássicas. | **Quadrivium** (Aritmética/Música) | **Numa / Melos** | túnica + pequena lira/ábaco — *"a gentle late-Roman scholar chibi holding a small lyre and abacus"* |
| **Santo Agostinho** | `agostinho` | IV–V | *De Magistro*, *De Doctrina Christiana*; o Mestre interior é Cristo; integrou as artes liberais à fé. | **Verdade / Sabedoria** | **Aion** | hábito de bispo simplificado + livro e coração flamejante — *"a wise bishop chibi holding a book and a small flaming heart, serene"* |
| **São Tomás de Aquino** | `aquino` | XIII | *Summa*; fé e razão em harmonia; método das questões disputadas; síntese clássico-cristã. | **Lógica / Sabedoria** | **Aion** | hábito dominicano + sol no peito + pena — *"a friendly Dominican friar chibi with a quill and a small sun emblem, thoughtful"* |
| **João Comênio (Comenius)** | `comenius` | XVII | *Didactica Magna*, *Orbis Pictus* (1º livro ilustrado infantil); "ensinar tudo a todos"; pai da didática. | **Gramática / Didática** | **Lyra** | trajes do séc. XVII + livro ilustrado aberto — *"a warm 17th-century teacher chibi holding an illustrated picture-book, kind eyes"* |
| **John Milton Gregory** | `gregory` | XIX | *As Sete Leis do Ensino* — princípios cristãos clássicos do ato de ensinar. | **Didática (as 7 leis)** | (mentor de todos) | terno do séc. XIX + livro "7 leis" — *"a dignified 19th-century educator chibi holding a book, gentle confident smile"* |
| **Charlotte Mason** | `mason` | XIX–XX | "Educação é uma atmosfera, uma disciplina, uma vida"; livros vivos, narração, contato com a natureza. | **Leitura / Natureza** | **Lyra / Astra** | vestido vitoriano + livro e flor/ramo — *"a kind Victorian lady educator chibi holding a living book and a small flower, warm"* |
| **Dorothy Sayers** | `sayers` | XX | *The Lost Tools of Learning* — reacendeu o Trivium moderno (fases poll-parrot/pert/poetic). | **Trivium** | **Lyra / Aion / Kael** | trajes anos 1940 + as 3 chaves do Trivium — *"a clever 20th-century British writer chibi holding three small keys, witty kind smile"* |
| **C. S. Lewis** | `lewis` | XX | *A Abolição do Homem*; imaginação batizada; defesa da Verdade, Bondade e Beleza na educação. | **Beleza / Imaginação** | **Kael / Astra** | terno tweed + livro e leãozinho heráldico — *"a warm 20th-century scholar chibi in tweed holding a book, a tiny heraldic lion at his side"* |

### 5.4 Mestres adicionais sugeridos (opcionais)

| Mestre | Slug | Século | Ligação | Atributo |
|---|---|---|---|---|
| **Pitágoras** (à luz clássica) | `pitagoras` | VI a.C. | Número e harmonia das esferas (Quadrivium). | monocórdio / triângulo — vínculo **Numa/Melos**. Apresentar só como tradição matemática, sem culto. |
| **Euclides** | `euclides` | IV–III a.C. | *Os Elementos* — a geometria como ordem. | compasso e régua — vínculo **Geon**. |
| **Beda, o Venerável** | `beda` | VII–VIII | Cômputo do tempo/calendário cristão; ciência monástica. | pena e roda do ano — vínculo **Astra**. |
| **Alcuíno de York** | `alcuino` | VIII | Restaurou as artes liberais (escola palatina de Carlos Magno). | livro das 7 artes — mentor do Trivium. |

> **Mapa guardião → Mestre (discipulado):** Lyra→Comenius/Mason (Gramática/leitura) · Aion→Aquino/
> Agostinho (Lógica/Verdade) · Kael→Quintiliano/Lewis (Retórica/Beleza) · Numa→Boécio/Pitágoras
> (Número) · Geon→Euclides (Forma) · Melos→Boécio/Pitágoras (Harmonia) · Astra→Beda (Céus). Sayers e
> Gregory são "mestres do método", ligados ao Trivium inteiro e ao ato de ensinar.

---

## 6. MANIFESTO — checklist do que recriar/gerar

> Marque conforme gerar. **Preservar todas as keys/arquivos já existentes.** Pastas:
> cards/orbes/medalhas → `public/img/cards/` · selos → `public/img/cards/selos/` (nova) ·
> mestres → `public/img/site/mestres/` (nova).

### 6.1 Já existe (NÃO regerar sem motivo)
- [x] Templates: `template-carta-nivel.webp`, `template-carta-orbe.webp`, `template-medalha.webp`
- [x] Cards de nível (5 Eras): `nivel-era-1..5.webp`
- [x] Orbes Trivium (9): `orbe-gramatica/vocabulario/ortografia/logos/deducao/argumento/eloquencia/persuasao/narrativa`
- [x] Orbes Quadrivium (6): `orbe-numero/calculo/proporcao/ceus/constelacoes/calendario`
- [x] Orbes Virtudes (11): `orbe-verdade/bondade/beleza/sabedoria/prudencia/fortaleza/temperanca/justica/fe/esperanca/caridade`
- [x] Medalhas (9): `medalha-primeiro-passo/perseveranca/mente-clara/voz-de-ouro/gabaritou/ofensiva/coroa-de-louros/guardiao-trivium/contemplador-ceus`

### 6.2 Cards — molduras de raridade (opcional, §1.4)
- [ ] `template-carta-terrestre` · [ ] `-lunar` · [ ] `-solar` · [ ] `-estelar` · [ ] `-celeste`
      (ou manter `template-carta-orbe.webp` + faixa de raridade por código)

### 6.3 Orbes — LACUNA do Quadrivium a recriar (§2.2)
- [ ] `orbe-forma` (13) · [ ] `orbe-simetria` (14) · [ ] `orbe-harmonia` (15) · [ ] `orbe-ritmo` (16)

### 6.4 Medalhas novas (§3.2)
- [ ] `medalha-coracao-sabio` · [ ] `medalha-sete-artes` · [ ] `medalha-discipulo-mestres`
- [ ] `medalha-colecionador-celeste` · [ ] `medalha-soli-deo-gloria`

### 6.5 Selos / carimbos — sistema novo (§4.3) → `public/img/cards/selos/`
- [ ] `selo-primeira-leitura` · [ ] `selo-gabaritou` · [ ] `selo-ofensiva` · [ ] `selo-madrugador`
- [ ] `selo-cacador-orbes` · [ ] `selo-arte-completa` · [ ] `selo-pequeno-orador` · [ ] `selo-mente-geometrica`
- [ ] `selo-classico-lido` · [ ] `selo-coracao-bondoso` · [ ] `selo-contemplador` · [ ] `selo-coroado`

### 6.6 Mestres — galeria chibi (§5.3) → `public/img/site/mestres/`
- [ ] `mestre-quintiliano` · [ ] `mestre-boecio` · [ ] `mestre-agostinho` · [ ] `mestre-aquino`
- [ ] `mestre-comenius` · [ ] `mestre-gregory` · [ ] `mestre-mason` · [ ] `mestre-sayers` · [ ] `mestre-lewis`
- [ ] Opcionais: `mestre-pitagoras` · `mestre-euclides` · `mestre-beda` · `mestre-alcuino`

### 6.7 Cards de Mestre (§1.5) → `public/img/cards/`
- [ ] `carta-mestre-<slug>.webp` (interior = arte chibi do Mestre na janela heráldica; raridade Solar→Celeste)

---

> **Lembrete final do Designer Sênior:** três traços que **nunca se misturam** — heráldico (cards/
> orbes/medalhas), chibi (guardiões e Mestres), sticker Mario (selos). Repita o ESTILO-MESTRE da
> família no início de cada prompt. Texto **sempre por código**, nunca na arte. Símbolos só
> **clássicos e cristãos**, sempre apropriados para crianças. Dourado é acento, não fundo. Verdade na
> clareza, Bondade na formação, Beleza na ordem — *Soli Deo gloria.*
