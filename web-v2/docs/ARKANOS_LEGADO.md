# Arkanos — Características do site legado (referência para a migração)

> Documento de referência: o que a versão Django original trazia, para guiar a
> reconstrução no web-v2 (Next.js). Não descreve o estado atual do web-v2.

## 1. Identidade e propósito
**ARKANOS – O Reino do Saber e da Virtude.** Jogos educacionais cristãos clássicos,
estruturados no **Trivium**, ancorados em **Verdade, Bondade e Beleza**.
- Público: crianças/adolescentes, famílias cristãs educadoras, escolas clássicas.
- Estética "RPG Tech": personagens-guardiões, HUDs, overlays de level-up.
- Onboarding por idade: ≤9 → **Gramática** · ≤12 → **Lógica** · acima → **Retórica**.

## 2. Landing page (seções modulares em `templates/arkanos/sections/`)
- **Header duplo**: barra de topo + menu que vira azul `#0f172a` após 30px de scroll.
- Hero · Guardiões (Lyra/Aion/Kael) · Jogos · Metodologia/Etapas/Passos (bandeirolas
  horizontais U-Flag) · Programas · Diferenciais · Depoimentos · Conteúdos/Métricas ·
  CTA banner · Footer.
- Institucionais: sobre, programas, familia, fale-conosco, jornada, rankings, avatar, demo.
- Vídeos pesados via Supabase Storage (templatetag `remote_video`).

## 3. Jogos — o que cada um deve fazer
### Spelling Bee — Guardiã Lyra (Gramática · Inglês)
Soletração em inglês. Palavra: `significado`, `ipa`, `exemplo`, `serie` (1º–9º), `dificuldade`.
Sorteio pela série do aluno (fallback: todas). Exige login. `save-progress` → XP.

### Radix — Guardião Aion (Gramática · Português)
Soletração/digitação em português; vocabulário ligado a valores. Modo `digitacao`.

### Desafio dos Sábios — (Lógica · Quiz pedagógico) — o mais elaborado
Hierarquia Disciplina → Série → Avaliação → Tópico → Questão. Tipos: múltipla escolha,
V/F, resposta curta, ordenação e visuais (mapa, diagrama, interpretação, MC com imagem).
- **Crônica do Guardião**: curiosidade + fato histórico + conexão interdisciplinar.
- **Geração por IA** (Arquiteto Pedagógico/OpenAI) → bancos manual/gerada/verificada + moderação.
- Suporte visual (mapas/diagramas de Geografia).

### Ark — (Retórica · Criação de histórias) — embrionário
Gerador de livros infantis com IA: faixa etária, gênero, tema, `worldview='christian'`,
personagens com arco moral, assets, export PDF/eBook, ficha catalográfica. Views ainda stubs.
Guardião Kael (Retórica), a implementar.

## 4. Gamificação (DOIS sistemas paralelos — unificar na v2)
**A — `PerfilEstudante` (app `jogos`)**: Nível = ⌊√(XP/100)⌋+1; barra de progresso; medalhas.
Desafio dá 20/30/50 XP (fácil/médio/difícil). Spelling Bee → `save-progress` → level-up overlay.
**B — `game_engine` (API REST)**: GameSession/GameEvent; UserProgress linear (XP//200+1);
conquistas ("Primeiro Sangue", "Discípulo de Logos", "Trinca"); leaderboard global top 10.
UX comum: HUD dinâmico, overlays de Level Up; roadmap previa "Medalhas Lendárias".

## 5. Outras características
- Trilhas do Trivium como espinha dorsal (Gramática → Lógica → Retórica).
- Guardiões ligados à mecânica (Lyra soletra, Aion digita, Kael retórica).
- Auth por faixa etária + previsão de painel de pais.
- Páginas de comunidade: rankings, avatar, jornada.
- CSS temático separado (`game-rpg.css`, `auth-rpg.css`).

## 6. Tradução para o web-v2
- Conteúdo (questões + palavras) já no banco novo, legível via Drizzle.
- Fase 2: motor de gamificação **unificado** (event-sourced) substituindo A/B.
- Fase 2/3: **registry modular de jogos** (Spelling Bee/Radix em Phaser, Desafio em React)
  + portar a landing page.
