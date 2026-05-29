# ARKANOS — Sistema de Gamificação (documento mestre)

> Visão: uma jornada formativa estilo "mundo aberto / platina de PS5", à luz da
> **Educação Cristã Clássica** (Trivium + Quadrivium). Cada conquista aponta para
> **Verdade, Bondade e Beleza** e para a contemplação do Criador. A gamificação
> serve à formação da virtude — não ao vício.

Decisões fixadas:
- A moeda/pontuação se chama **Arks** (4 tipos: Bronze, Prata, Ouro, Diamante).
- **Ranking** mostra **nome + nível + Arks** (global e por jogo).
- Tudo é **interconectado**: cada ação vira evento → Arks → nível → ranking → medalhas/orbes/missões.
- **Regra de ouro:** Arks só são salvos ao **FINALIZAR a partida**; abandonou antes → perde as moedas daquela partida.

---

## 1. Modelo de dados (fundação já existente + novo)

**Já existe** (Fase 1 da migração):
- `profiles.total_xp`, `profiles.level` — progresso único.
- `game_events` (event-sourced): `user_id, game, type, payload, xp_delta, created_at`.
- `level_for_xp(xp)` = `floor(sqrt(xp/100)) + 1`; `award_xp()` (atômico).

**A criar (por fase):**
```
achievements        (key, nome, descricao, tier, icon_url, rule_key)
user_achievements   (user_id, achievement_key, unlocked_at)
orbs                (key, nome, arte, raridade, card_url)
user_orbs           (user_id, orb_key, obtained_at)
titles              (key, nome, rule_key)
user_titles         (user_id, title_key, equipped)
missions            (key, nome, descricao, tipo, meta, xp_reward, due_date?)
user_missions       (user_id, mission_key, progress, completed_at)
leaderboard (VIEW)  (user_id, display_name, level, total_xp, por jogo)
```
Ranking por jogo = soma de `xp_delta` em `game_events` agrupado por `game`.

## 2. Moeda — Arks (a pontuação)
Os pontos são **Arks** (moedas), em **4 tipos por valor**:
| Ark | Cor | Ganha em | Valor (pontos) |
|---|---|---|---|
| **Ark de Bronze** | bronze | acerto fácil | 10 |
| **Ark de Prata** | prata | acerto médio | 20 |
| **Ark de Ouro** | dourado | acerto difícil | 40 |
| **Ark Diamante** | diamante (azul) | feito especial (gabaritar prova, ofensiva, missão) | 100 |

**Regra de ouro:** as moedas só são **salvas no banco ao FINALIZAR a partida**.
Abandonou antes do fim → as moedas daquela partida são **perdidas** (incentiva concluir).
O **valor total em Arks** alimenta o **nível** e o **ranking**. (No banco, o campo
`total_xp`/`xp_delta` passa a representar Arks — renomeação cosmética no build.)

Outras fontes de Arks: login diário/ofensiva, entregar projeto/missão.

## 3. Níveis — "A Escada das Artes Liberais"
(Curva √: nível = ⌊√(Arks/100)⌋+1 — o "Arks" aqui é o valor TOTAL somado das moedas)

**50 níveis**, cada um com seu **card**. Arks necessários = `(nível − 1)² × 100`.
Agrupados em 5 Eras (cada Era = um tema visual de card).

**Era I — Os Primeiros Passos (1–10)** — tons terrosos/bronze
1 Aprendiz · 2 Iniciado · 3 Pupilo · 4 Aplicado · 5 Estudante Dedicado · 6 Leitor ·
7 Memorioso · 8 Discípulo · 9 Aprendiz das Letras · 10 Guardião Iniciante

**Era II — A Arte da Palavra / Trivium (11–20)** — dourado
11 Gramático · 12 Escriba · 13 Mestre das Letras · 14 Dialético · 15 Lógico ·
16 Argumentador · 17 Pensador Claro · 18 Retórico · 19 Orador · 20 Voz de Ouro

**Era III — A Arte do Número / Quadrivium (21–30)** — azul/cosmos
21 Aritmético · 22 Calculista · 23 Mestre dos Números · 24 Geômetra ·
25 Arquiteto das Formas · 26 Músico das Esferas · 27 Harmonista · 28 Astrônomo ·
29 Navegante dos Céus · 30 Contemplador do Cosmos

**Era IV — A Sabedoria (31–40)** — violeta
31 Filósofo Novato · 32 Amante da Sabedoria · 33 Bacharel das Artes · 34 Erudito ·
35 Sábio · 36 Mestre das Sete Artes · 37 Guardião do Saber · 38 Conselheiro ·
39 Doutor das Artes · 40 Sábio Ancião

**Era V — A Coroa (41–50)** — branco sagrado/dourado
41 Iluminado · 42 Portador da Verdade · 43 Servo da Bondade · 44 Mensageiro da Beleza ·
45 Virtuoso · 46 Mestre Coroado · 47 Guardião Lendário · 48 Sábio Celeste ·
49 Sábio Imortal · 50 **⭐ Sábio Coroado de Arkanos** (Platina — o topo)

> Curva: os primeiros níveis vêm rápido (engajamento) e o topo (Nv 50 ≈ 240.100 Arks)
> é a "platina". Cada nível concede um **card de nível**.

## 4. Orbes (cartas colecionáveis) — raridade celeste
Template de carta **fixo** (estilo Pokémon, máscara Arkanos); só muda o interior + a faixa de raridade.

| Raridade | Nome | Cor/brilho |
|---|---|---|
| Comum | **Orbe Terrestre** | bronze |
| Incomum | **Orbe Lunar** | prata |
| Rara | **Orbe Solar** | dourado |
| Épica | **Orbe Estelar** | azul-violeta |
| Lendária | **Orbe Celeste** | branco sagrado |

**30 orbes**, cada um com seu **card** (template fixo; só muda o interior + a faixa de raridade).

**Trivium — a Palavra (1–9)**
1 Orbe da Gramática (Lyra) · 2 Orbe do Vocabulário · 3 Orbe da Ortografia ·
4 Orbe de Logos (Aion) · 5 Orbe da Dedução · 6 Orbe do Argumento ·
7 Orbe da Eloquência (Kael) · 8 Orbe da Persuasão · 9 Orbe da Narrativa

**Quadrivium — o Número e o Cosmos (10–19)**
10 Orbe do Número (Numa) · 11 Orbe do Cálculo · 12 Orbe da Proporção ·
13 Orbe da Forma (Geon) · 14 Orbe da Simetria · 15 Orbe da Harmonia (Melos) ·
16 Orbe do Ritmo · 17 Orbe dos Céus (Astra) · 18 Orbe das Constelações · 19 Orbe do Calendário

**Virtudes & Cosmovisão (20–30)**
20 Orbe da Verdade · 21 Orbe da Bondade · 22 Orbe da Beleza · 23 Orbe da Sabedoria ·
24 Orbe da Prudência · 25 Orbe da Fortaleza (Coragem) · 26 Orbe da Temperança ·
27 Orbe da Justiça · 28 Orbe da Fé · 29 Orbe da Esperança · 30 Orbe da Caridade

> A **raridade** (Terrestre→Celeste) é a moldura/brilho do card; o mesmo orbe pode
> existir em raridades diferentes conforme o feito que o concedeu.

## 5. Medalhas (estilo olímpico) — Bronze / Prata / Ouro / Louro
| Medalha | Critério | Tier |
|---|---|---|
| Primeiro Passo | concluir 1ª prova | Bronze |
| Perseverança | 7 dias de ofensiva | Prata |
| Mente Clara | 90%+ em Lógica | Ouro |
| Voz de Ouro | concluir trilha de Retórica | Ouro |
| Coroa de Louros | "platinar" uma Arte | Louro |
| Guardião do Trivium | completar Gram.+Lóg.+Ret. | Louro |
| Contemplador dos Céus | completar o Quadrivium | Louro |

## 6. Títulos (exibidos no perfil)
*O Perseverante · Mente Clara · Voz de Ouro · Guardião do Trivium · Contemplador dos Céus · Sábio Coroado.*

## 7. Missões / Quests (estilo mundo aberto)
- **Diárias** (ofensiva, "responda 10 questões hoje").
- **Semanais** (ligas).
- **Por data** (projetos/trabalhos com prazo → notificação no dashboard).
- **De jornada** (completar uma Arte → recompensa lendária).

## 8. Trivium + Quadrivium → jogos, guardiões e idade
**Trivium (a Palavra) — ~6 a 13 anos**
- Gramática · **Lyra** · Spelling Bee, Radix ✅
- Lógica · **Aion** · Desafio dos Sábios ✅
- Retórica · **Kael** · Ark (histórias), Debate

**Quadrivium (o Número e o Cosmos) — ~12+** *(novos guardiões)*
- Aritmética · **Numa** · "Ábaco Sagrado"
- Geometria · **Geon** · quebra-cabeças de forma/proporção
- Música · **Melos** · ritmo e harmonia
- Astronomia · **Astra** · cosmos, calendário, esferas

> Cosmovisão: o Quadrivium revela a **ordem do Criador** (Sl 19:1 — "Os céus
> proclamam a glória de Deus"). Recomendação por idade via data de nascimento.

## 9. UX — Fim de jogo + revelação de ranking (narrado pelo guardião)
**Sucesso:** *"Bem-feito, jovem sábio! [Guardião] sorri: 'Tua dedicação honra o
Autor de toda sabedoria. Avança na jornada!'"* + resultado (%, Arks, orbe/medalha)
+ revelação animada do ranking ("Você subiu para o #7!").
**Tropeço:** *"A jornada do saber tem tropeços, e o sábio se levanta — 'O justo
cai sete vezes e se levanta' (Pv 24:16). Tenta de novo!"*
Estética: navy/dourado, brushes, ícones monocromáticos por elemento, personagem "falando".

## 10. Dashboard pós-login (o "save game")
HUD: avatar + nível + barra de Arks + título · **ranking geral (posição em evidência)** ·
missões/projetos por data · coleção de orbes · vitrine de medalhas · notificações ·
tudo narrado pelos guardiões.

## 10.5 Tela de Premiação (reveal estilo clássico de games)
Quando o aluno atinge o critério de um **nível, medalha ou orbe**, sobe um overlay
premium de premiação (como "Achievement Unlocked" + abertura de carta):
- Fundo escurecido + **raios de luz** dourados, partículas/confete, leve "punch" de zoom.
- O **card** do item surge virando/brilhando (flip) com o nome e a categoria.
- Texto narrado pelo guardião: *"Você conquistou o Orbe de Logos! Aion declara: 'A
  verdade se ilumina para quem persevera.'"*
- Som de fanfarra + vibração (já temos o util de feedback).
- Botões: **Ver na coleção** / **Continuar**.
- **Persistência:** cada conquista é gravada no banco (`user_*`) ANTES do reveal;
  se ganhar vários itens de uma vez, mostra em fila (um card após o outro).

## 10.6 Página de Coleção (a "sala de troféus")
Rota dedicada (ex.: `/colecao`) mostrando TUDO que o aluno já ganhou:
- **Níveis** (50 cards) — desbloqueados coloridos; futuros em silhueta com o Arks que falta.
- **Orbes** (30 cards) — grade por bloco (Trivium / Quadrivium / Virtudes); locked = silhueta.
- **Medalhas** — vitrine olímpica (bronze/prata/ouro/louro).
- **Títulos** — lista, com opção de "equipar" o título exibido no perfil.
- Barra de **progresso de coleção** (ex.: "Orbes 12/30 · Níveis 8/50") rumo à **Platina**.
- Tudo no tema navy/dourado, brushes, ícones monocromáticos, narração dos guardiões.

---

## 11. PROMPTS DE IMAGEM

### 11.1 Estilo-mestre (preâmbulo comum)
> *Estilo heráldico clássico-cristão, paleta azul-marinho profundo (#0b1222) com
> dourado (#f1c40f); iluminação dramática suave; sem texto na imagem; fundo
> transparente; alta qualidade; apropriado para crianças.*

### 11.2 Medalhas (olímpicas) — `medal-<slug>.webp`
Formato: *"Medalha circular em relevo [ouro|prata|bronze], fita azul-marinho, símbolo
central monocromático de [TEMA], + estilo-mestre."*
- Primeiro Passo → pegada/porta aberta (bronze)
- Perseverança → chama persistente (prata)
- Mente Clara → coruja/labirinto resolvido (ouro)
- Voz de Ouro → pena/megafone clássico (ouro)
- Coroa de Louros → coroa de louros (louro/dourado)
- Guardião do Trivium → escudo com 3 símbolos (louro)
- Contemplador dos Céus → esfera armilar/estrelas (louro)

### 11.3 Orbes (carta colecionável) — `orb-<arte>-<raridade>.webp`
**Template FIXO (gerar 1 vez):** *"Carta colecionável vertical, moldura ornamentada
navy + dourado estilo Arkanos, brasão no topo, selo Arkanos no rodapé, faixa de
raridade [COR], janela central vazia para o interior; + estilo-mestre."*
**Interiores (trocar só o miolo):**
- Gramática → letras iluminadas/pena (Lyra)
- Logos → balança/labirinto (Aion)
- Eloquência → tribuna/chama da palavra (Kael)
- Número → ábaco/algarismos sagrados (Numa)
- Forma → sólidos geométricos/compasso (Geon)
- Harmonia → lira/ondas sonoras (Melos)
- Céus → esfera armilar/constelações (Astra)
- Verdade/Bondade/Beleza → cruz luminosa / coração / rosa dourada
**Cores de raridade:** Terrestre=bronze · Lunar=prata · Solar=dourado · Estelar=azul-violeta · Celeste=branco sagrado.

### 11.4 Guardiões do Quadrivium (novos) — `guardian-<nome>.png` (transparente)
- **Numa** (Aritmética): jovem sábio com ábaco dourado.
- **Geon** (Geometria): figura com compasso e sólidos geométricos.
- **Melos** (Música): personagem com lira, ondas de harmonia.
- **Astra** (Astronomia): figura com esfera armilar e manto estrelado.
*(mesmo estilo dos guardiões atuais Lyra/Aion/Kael, corpo inteiro, fundo transparente.)*

### 11.5 Cards de Nível (50) — estratégia eficiente
Em vez de gerar 50 imagens, gere **5 fundos de card (1 por Era)** e **componha o
numeral + nome por cima via código** (Canvas/SVG) na hora de exibir. Assim 5 imagens
cobrem os 50 níveis.
Prompt por Era: *"Fundo de card colecionável vertical, moldura Arkanos navy+dourado,
cena de [Era I pedra/terra · II pergaminho · III cosmos · IV biblioteca · V céu glorioso],
espaço central livre para numeral e nome; + estilo-mestre."*

### 11.6 Cards de Orbe (30) — estratégia eficiente
Gere **1 template de carta** (§11.3) + **os interiores** de cada orbe (§4). O template e a
cor de raridade entram por código; só o miolo é arte. (Ideal: 30 interiores; mínimo viável:
1 interior por bloco/arte e variar o nome.)

---

## 12. Roadmap por fases
1. **Fim de jogo + Ranking** (tela narrada + resultado + leaderboard global/por jogo).
2. **Medalhas & Títulos** (tabelas + regras + vitrine + 1ª leva de imagens).
3. **Orbes (cartas)** (coleção + template + raridades).
4. **Dashboard "save game"** (HUD completo pós-login).
5. **Quadrivium** (1º jogo novo — Aritmética/Numa).
6. **Missões/Quests & "Platina"** (quests por data + topo da jornada).
