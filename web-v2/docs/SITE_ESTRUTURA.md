# Estrutura do Site Arkanos (mapa mestre — inspiração Educacross/BYJU's/Kodland)

> Tema **claro** + paleta dos personagens + cosmovisão cristã clássica. Cada seção usa
> componentes reutilizáveis. Assets via `senior-designer` (ver `PROMPTS_DESIGN_SITE.md`).
> Legenda: ✅ feito · 🟡 parcial · ⬜ a fazer.

## Componentes reutilizáveis
- ✅ `Hero` + `floating-art` (HeroShowcase: figura central sobre blob, anéis, ícones flutuantes, etiquetas).
- ✅ `FeatureRow` (texto + checklist + personagem sobre blob; alternável `reverse`).
- ✅ `Brush` (fundos orgânicos em camadas por módulo).
- ⬜ `ProgramCard` (card vertical: foto+mascote no topo, badges, título, descrição, "Ver Programa").
- ⬜ `DeliverablesGrid` ("O que você recebe": 2 colunas — Experiência Digital × Consultoria/Acompanhamento).
- ⬜ `StepsRow` ("Como funciona em N passos": ícone numerado + título + texto).
- ⬜ `CtaBand` (faixa colorida "Quero X na minha escola" + checklist + foto/mockup).
- ⬜ `StatBig` + `BrazilReach` (presença/números: +alunos, +escolas, mapa).
- ⬜ `FounderCard`, `LogosStrip` (parcerias/prêmios), `DeviceMockup` (tablet/laptop com tela do jogo).

## Página inicial (/)
1. ✅ Header (claro, "Meu Painel" quando logado)
2. ✅ Hero animado
3. ✅ Stats (7 artes, jogos, questões, guardiões)
4. ✅ Jogos (cards coloridos)
5. ✅ As 7 Artes Liberais (Trivium + Quadrivium)
6. ✅ Programação ("nova linguagem")
7. ✅ Públicos (Escolas × Famílias)
8. ✅ FeatureRow: Relatórios em tempo real (escola+família)
9. ✅ FeatureRow: Gamificação com guardiões
10. ⬜ Programas (base = nossos + expansões correlatas) — `ProgramCard` grid + menu "Programas"
11. ⬜ "O que você recebe" (`DeliverablesGrid`)
12. ⬜ Presença/números + selos (`BrazilReach`, `LogosStrip`) — quando houver dados reais
13. ✅ Depoimentos
14. ✅ CTA + Footer + crédito Arkos

## Programas (base + expansões) — a criar
Base (nossos): **Desafio dos Sábios** (Lógica), **Spelling Bee** (Gramática), **Coleção/Jornada**,
**Ábaco Sagrado/Numa** (em breve), **Ark/Kael** (em breve).
Expansões correlatas (inspiração Educacross, a definir conteúdo): Alfabetização e Leitura, Avaliação
Digital, Olimpíadas/Eventos Gamificados, Expedição Aprendizagem (Mat+Português), Trilhas de Leitura,
Biblioteca digital. → cada um vira página com: hero do programa, "O que é", "O que você recebe",
"Como funciona em N passos", CtaBand.

## Clube do Livro (módulo de Leitura · Gramática/Lyra) — a criar
Espaço de formação leitora à luz da Educação Cristã Clássica (bons livros → Verdade, Bondade, Beleza).
Vinculado à **Biblioteca** indicada da Arkanos. Guardiã: **Lyra**.
- ⬜ **Vídeos** — narração/contação da história de cada livro (player + capítulos).
- ⬜ **Ebooks + Resumos** — leitura do livro com resumo, contexto e fichamento (visão cristã clássica).
- ⬜ **Fórum** — crianças e pais conversam sobre os livros (moderado; perguntas-guia por livro).
- ⬜ **Flashcards** — memorização do conteúdo (personagens, vocabulário, virtudes, fatos) com repetição
  espaçada; integra a gamificação (Arks/coleção) e a pontuação TRI.
- Estrutura por livro: capa, vídeo, ebook/resumo, baralho de flashcards, tópico de fórum.
- Componentes a criar: `BookCard`, `BookClub` (rota `/clube-do-livro`), `Flashcards`, `BookForum`.
- Assets (via senior-designer): capas/ilustrações dos livros, miniaturas de vídeo, ícones 3D (livro,
  marca-página, baú de histórias) — todos no traço-mestre.

## Página Sobre — a criar
- Hero "Sobre" (liderança/posicionamento) · "Nossa Missão" (faixa) · "Nossa História" · "Fundadores"
  (`FounderCard`) · Presença/números · Parcerias e prêmios (`LogosStrip`).

## Observações
- Imagens (fotos de crianças recortadas, ícones 3D, mockups) vêm do fluxo do `senior-designer`
  (ChatGPT) — ver `PROMPTS_DESIGN_SITE.md`. Enquanto não chegam, usamos guardiões + blobs + placeholders.
- Conteúdo dos "programas expansões" e dos números de presença precisa de definição do usuário.
