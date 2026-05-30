# Prompts de Design do Site (documento vivo) — Arkanos

> Mantido pelo agente **senior-designer**. Gere cada asset externamente (ChatGPT/DALL·E/Midjourney)
> com o **ESTILO-MESTRE** + a descrição do item, salve com o **nome do arquivo** na **pasta** indicada.
> O traço **NUNCA varia**. Sempre fundo **transparente (PNG)** salvo indicação contrária.
>
> Pastas: fotos → `web-v2/public/img/site/fotos/` · ícones 3D → `web-v2/public/img/site/icones/`
> Personagens (guardiões) já existem em `web-v2/public/img/guardioes/`.

---

## Paleta oficial
Lyra rosa `#ec4899` · Aion azul `#3b82f6` · Kael vermelho `#ef4444` · Numa verde `#10b981` ·
Geon roxo `#8b5cf6` · Melos âmbar `#f59e0b` · Astra índigo `#6366f1` · Programação ciano `#06b6d4` ·
Dourado `#f1c40f`/`#e0a417`. Tema do site: **claro**.

---

## ESTILO-MESTRE A — Fotografia (crianças)
> "Foto profissional de estúdio, criança brasileira sorrindo, alegre e confiante, iluminação suave e
> natural, cores vivas, visual moderno e limpo, **recorte perfeito com fundo 100% transparente (PNG)**,
> nitidez alta, sem texto. Postura de quem estuda/descobre com prazer."

## ESTILO-MESTRE B — Ícones/figuras 3D flutuantes
> "Ícone 3D estilo **clay/plasticine soft**, cantos arredondados, volumes macios, acabamento fosco,
> sombra suave de contato, cores vivas da paleta Arkanos, **fundo 100% transparente (PNG)**, sem texto,
> apto a flutuar. Estética amigável, premium e infantil."

## ESTILO-MESTRE C — Personagens (guardiões)
> Chibi cartoon anime, contorno limpo, cel-shading chapado, olhos grandes, fundo transparente.
> Identidades fixas (ver `scripts/generate-guardians-ref.mjs`). NÃO criar novos sem aprovação.

---

## 1) HERO — criança central + elementos orbitando
- **`hero-crianca.png`** — pasta `fotos/` · vertical (~900×1100) · ESTILO-MESTRE A.
  CENA: criança segurando um tablet/livro, olhando para frente, sorrindo. Recorte transparente.
- **Ícones 3D flutuantes** (pasta `icones/`, ESTILO-MESTRE B, ~512×512):
  - `orbe.png` — orbe mágico brilhante azul-dourado (saber).
  - `pena.png` — pena dourada (Gramática/Lyra, rosa+dourado).
  - `livro.png` — livro aberto iluminado (rosa).
  - `balanca.png` — balança dourada (Lógica/Aion, azul).
  - `compasso.png` — compasso + sólidos geométricos (Quadrivium, roxo/verde).
  - `nota.png` — nota musical (Música/Melos, âmbar).
  - `estrela.png` — estrela/constelação (Astronomia/Astra, índigo).
  - `codigo.png` — bloco de código `{ }` (Programação, ciano).
> No site, esses ícones orbitam a criança com flutuação suave (já implementado em `floating-art.tsx`).

## 2) SEÇÕES INTERNAS (alternar texto/imagem, foto sobre blob colorido)
Para cada módulo, uma foto de criança (ESTILO-MESTRE A) sobre um blob na cor do módulo:
- **`foto-desafios.png`** (azul/Aion) — criança concentrada respondendo no tablet.
- **`foto-spelling.png`** (rosa/Lyra) — criança soletrando, feliz.
- **`foto-quadrivium.png`** (verde/Numa) — criança com material de matemática/geometria.
- **`foto-programacao.png`** (ciano) — criança montando blocos de código/robótica.
- **`foto-familia.png`** (âmbar) — criança estudando em casa com um responsável.
- **`foto-escola.png`** (azul) — alunos em sala, clima clássico e acolhedor.

## 3) Cards/etiquetas flutuantes (UI, feitos no código)
Pílulas com rótulo ("Desafios", "Coleção", "Ranking", "7 Artes", "Programação") e mini-cards
(ex.: "Pontuação TRI", "Crônica do Guardião") — implementados em `floating-art.tsx` (sem geração).

---

## Manifesto (atualizar conforme gerar)
- [ ] hero-crianca.png
- [ ] icones: orbe, pena, livro, balanca, compasso, nota, estrela, codigo
- [ ] fotos de seção: desafios, spelling, quadrivium, programacao, familia, escola
- [x] guardiões (já existem)
- [x] orbes/medalhas/cards (já existem em `public/img/cards/`)
