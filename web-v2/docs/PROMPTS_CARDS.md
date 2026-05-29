# Prompts de Geração de Imagens — Cards, Orbes, Medalhas, Guardiões (Gemini)

> **REGRA DE OURO — PADRONIZAÇÃO (leia antes de gerar):**
> Existem **apenas 3 molduras/templates fixos** (carta-orbe, carta-nível, medalha).
> **NUNCA varie a moldura.** Gere cada template **uma única vez**. Para cada item,
> gere **só a ARTE INTERNA** (quadrada, fundo transparente, sem moldura e sem texto).
> A moldura, o nome, a raridade/nível e as cores entram **por código** sobre o template.
> Assim TODAS as imagens ficam idênticas em moldura — só muda o conteúdo interno.

## Estilo da casa (Arkanos) — colar em TODO prompt
> *Estilo heráldico clássico-cristão inspirado na **logomarca Arkanos** e nos guardiões
> Lyra, Aion e Kael. Paleta: azul-marinho profundo (#0b1222) + dourado (#f1c40f),
> com toques de azul-celeste. Iluminação dramática suave, nobre e acolhedora.
> Alta qualidade, apropriado para crianças.*

## Specs técnicas
- **Cartas (orbe/nível):** vertical 2:3 — **1024×1536**.
- **Interiores (arte interna):** **quadrado 1024×1024**, **fundo transparente**, sem moldura, sem texto.
- **Medalhas:** **1024×1024**, fundo transparente.
- **Guardiões:** vertical **1024×1536**, corpo inteiro, **fundo transparente**.
- Formato: **PNG** (transparência) → depois converter p/ WebP.

---

## 1. TEMPLATES FIXOS (gerar 1× cada — nunca variar)

**`template-carta-orbe.png`**
> Moldura de carta colecionável vertical (2:3), estilo Arkanos: navy profundo com
> ornamentos dourados entalhados, **brasão alado no topo** (inspirado na logomarca
> Arkanos), **selo circular Arkanos no rodapé**, uma **JANELA CENTRAL retangular VAZIA
> e transparente** (espaço para a arte interna) e um pequeno **encaixe de gema** no
> topo (para a raridade). Sem texto. Fundo transparente fora da carta. + estilo da casa.

**`template-carta-nivel.png`**
> Mesma moldura Arkanos vertical (2:3), porém com **medalhão circular no topo** (vazio,
> para o numeral romano) e **faixa dourada inferior** (vazia, para o nome do nível);
> **janela central vazia** para a arte da Era. Sem texto. Fundo transparente. + estilo da casa.

**`template-medalha.png`**
> Medalhão **circular olímpico** em metal dourado polido, borda ornamentada estilo
> Arkanos, **fita azul-marinho** pendurada no topo, **centro circular VAZIO e
> transparente** (para o emblema). Sem texto. Fundo transparente. + estilo da casa.
> (O metal bronze/prata/ouro é ajustado por código.)

---

## 2. ORBES — arte interna (30) · `orbe-<slug>.png`
Prefixo de cada prompt: *"Ícone/emblema central, composição quadrada, fundo transparente,
sem moldura, sem texto, + estilo da casa. Tema:"*

| Arquivo | Orbe | Tema do interior |
|---|---|---|
| orbe-gramatica.png | Gramática | letra iluminada / pena dourada |
| orbe-vocabulario.png | Vocabulário | livro aberto com palavras brilhando |
| orbe-ortografia.png | Ortografia | letras alinhadas com selo de acerto |
| orbe-logos.png | Logos | balança em equilíbrio sobre labirinto |
| orbe-deducao.png | Dedução | engrenagens e lupa |
| orbe-argumento.png | Argumento | duas mãos em diálogo / setas lógicas |
| orbe-eloquencia.png | Eloquência | tribuna clássica com chama da palavra |
| orbe-persuasao.png | Persuasão | laço dourado unindo mentes |
| orbe-narrativa.png | Narrativa | livro-pergaminho com cena épica |
| orbe-numero.png | Número | algarismos sagrados / ábaco dourado |
| orbe-calculo.png | Cálculo | símbolos matemáticos em órbita |
| orbe-proporcao.png | Proporção | proporção áurea / espiral |
| orbe-forma.png | Forma | sólidos geométricos (cubo, esfera) |
| orbe-simetria.png | Simetria | mandala geométrica espelhada |
| orbe-harmonia.png | Harmonia | lira com ondas sonoras |
| orbe-ritmo.png | Ritmo | pulsos/ondas em compasso |
| orbe-ceus.png | Céus | esfera armilar com estrelas |
| orbe-constelacoes.png | Constelações | constelação ligada por linhas |
| orbe-calendario.png | Calendário | ciclo solar/lunar em anel |
| orbe-verdade.png | Verdade | cruz luminosa irradiando |
| orbe-bondade.png | Bondade | coração com chama suave |
| orbe-beleza.png | Beleza | rosa dourada / vitral |
| orbe-sabedoria.png | Sabedoria | coruja com auréola |
| orbe-prudencia.png | Prudência | espelho e serpente clássica |
| orbe-fortaleza.png | Fortaleza (Coragem) | coluna/leão dourado |
| orbe-temperanca.png | Temperança | duas taças em equilíbrio |
| orbe-justica.png | Justiça | balança e espada |
| orbe-fe.png | Fé | âncora luminosa |
| orbe-esperanca.png | Esperança | aurora nascente |
| orbe-caridade.png | Caridade | mãos dando luz / pelicano clássico |

> **Raridade** (Terrestre→Celeste) NÃO muda a arte: é um brilho/gema aplicado por código.

---

## 3. NÍVEIS — fundos de Era (5) · `nivel-era-<N>.png`
(Arte de fundo da janela; o numeral e o nome entram por código sobre `template-carta-nivel.png`.)
| Arquivo | Era / Níveis | Tema do fundo |
|---|---|---|
| nivel-era-1.png | I (1–10) Primeiros Passos | pedra/terra, amanhecer bronze |
| nivel-era-2.png | II (11–20) Trivium | pergaminhos e letras, dourado |
| nivel-era-3.png | III (21–30) Quadrivium | cosmos e geometria, azul |
| nivel-era-4.png | IV (31–40) Sabedoria | grande biblioteca, violeta |
| nivel-era-5.png | V (41–50) A Coroa | céu glorioso e luz, branco-dourado |

---

## 4. MEDALHAS — emblema interno · `medalha-<slug>.png`
(Emblema central, quadrado, transparente; vai no centro de `template-medalha.png`. O metal
bronze/prata/ouro/louro é dado por código.)
| Arquivo | Medalha | Emblema |
|---|---|---|
| medalha-primeiro-passo.png | Primeiro Passo | pegada / porta aberta |
| medalha-perseveranca.png | Perseverança | chama persistente |
| medalha-mente-clara.png | Mente Clara | coruja / labirinto resolvido |
| medalha-voz-de-ouro.png | Voz de Ouro | pena com megafone clássico |
| medalha-gabaritou.png | Gabaritou | alvo com flecha no centro |
| medalha-ofensiva.png | Ofensiva (streak) | calendário com chama |
| medalha-coroa-de-louros.png | Coroa de Louros | coroa de louros |
| medalha-guardiao-trivium.png | Guardião do Trivium | escudo com 3 símbolos |
| medalha-contemplador-ceus.png | Contemplador dos Céus | esfera armilar |

---

## 5. GUARDIÕES por idade · `guardiao-<nome>-fase<N>.png`
A criança "cresce" com o personagem: a **fase** segue a idade/etapa.
- **fase1** = criança (~6–9, Gramática) · **fase2** = pré-adolescente (~10–12, Lógica) ·
  **fase3** = adolescente (~13+, Retórica).
Prompt base: *"Personagem [NOME] do Arkanos, [idade da fase], corpo inteiro, pose heróica,
mesmo design/figurino do guardião atual, fundo transparente, + estilo da casa."*

| Guardião | Arte | Arquivos |
|---|---|---|
| **Lyra** (Gramática) | soletrando, com letras flutuantes | guardiao-lyra-fase1/2/3.png |
| **Aion** (Lógica) | com balança/engrenagens | guardiao-aion-fase1/2/3.png |
| **Kael** (Retórica) | orando/discursando | guardiao-kael-fase1/2/3.png |

**Quadrivium (novos guardiões)** — `guardiao-<nome>.png` (idade ~12+):
| Guardião | Arte |
|---|---|
| guardiao-numa.png | Numa (Aritmética): ábaco dourado |
| guardiao-geon.png | Geon (Geometria): compasso e sólidos |
| guardiao-melos.png | Melos (Música): lira e ondas de harmonia |
| guardiao-astra.png | Astra (Astronomia): esfera armilar, manto estrelado |

---

## 6. Onde colocar os arquivos
- Templates e artes: `web-v2/public/img/cards/` (orbes, níveis, medalhas) e
  `web-v2/public/img/guardioes/` (guardiões).
- Depois ligamos no código (a moldura + nome + raridade entram por composição/CSS).
