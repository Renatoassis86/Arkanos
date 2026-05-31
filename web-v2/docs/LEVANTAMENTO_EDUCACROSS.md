# Levantamento de Referências (Educacross) → Aplicação no Arkanos

> **O que é este documento.** As capturas da Educacross (e BYJU's/Kodland) que você me enviou foram
> analisadas e destiladas no padrão de layout abaixo. Elas vieram como *prints colados no chat* (não
> como arquivos no repositório), então aqui registro a **estrutura/diagramação** observada e **como
> cada padrão já está (ou será) aplicado** no nosso site — **sem copiar texto, marca ou ilustração**
> da Educacross. Nossa identidade (cosmovisão cristã clássica, 7 Artes, guardiões, paleta) é 100%
> Arkanos. Fontes-irmãs: `PROJETO_DESIGN_ARKANOS.md` (§2 sistema de design, §2.6 brushes),
> `SITE_ESTRUTURA.md` (mapa de seções).

---

## 1. Levantamento dos padrões de layout (o que extraímos das telas)

| # | Padrão observado na Educacross | Descrição da diagramação | Onde aplicamos no Arkanos |
|---|---|---|---|
| P1 | **Hero em 2 colunas** | Texto à esquerda (selo + título grande + subtítulo + 2 botões) e, à direita, **criança recortada** sobre um fundo colorido com **elementos orbitando** ao redor. | `Hero` + `HeroShowcase` (`floating-art.tsx`). |
| P2 | **Criança recortada sobre "blob"** | A foto da criança (PNG sem fundo) fica **sobre uma mancha de cor** orgânica; nunca num retângulo seco. | `HeroShowcase` e `FeatureRow` (blob atrás da figura). |
| P3 | **Elementos flutuando ao redor da figura** | Ícones 3D, etiquetas (pílulas), estrelas e anéis **orbitam e flutuam** suavemente em volta da criança. | `Clay` (ícones 3D) + `Chip` (etiquetas) + anéis girando no `HeroShowcase`. |
| P4 | **Caixas de texto com micro-animação de entrada** | Blocos de texto e cards **surgem com fade + leve subida** conforme rolam para a tela; hover ergue o card. | `Reveal` (fade-up no scroll) + `hover:-translate-y` nos cards. |
| P5 | **Seções alternadas texto/imagem** | Linhas que **alternam** o lado do texto e da imagem (zig-zag), cada uma com sua cor. | `FeatureRow` (prop `reverse`). |
| P6 | **Cards coloridos por tema** | Grade de cards, cada um com **cor própria**, faixa/etiqueta no topo, título, descrição e botão. | `GamesSection`, `game-card.tsx`, `TriviumSection`. |
| P7 | **Brush / mancha de cor como marca d'água** | Atrás de quase toda seção há **manchas suaves de cor** (pinceladas) dando profundidade, sem competir com o texto. | `Brush` (`floating-art.tsx`) — **agora aplicado em todas as seções da home** (§3). |
| P8 | **Números/“stats” em destaque** | Faixa com números grandes e coloridos (alunos, escolas, etc.). | `StatsSection`. |
| P9 | **Faixa CTA colorida ao final** | Bloco arredondado, fundo com glow multicor, título + botões. | `CtaSection`. |
| P10 | **Paleta viva, tema claro** | Fundos claros (branco/cinza levíssimo), cor usada em acentos (botões, blobs, badges), bastante respiro. | Tema claro global + paleta dos guardiões. |
| P11 | **Movimento sutil e contínuo** | Tudo se mexe um pouco o tempo todo (flutuar/orbitar), mas **nada distrai** da leitura. | `motion/react` com `prefers-reduced-motion` respeitado. |

---

## 2. Caixas de texto + animações (como mantemos)

- **Entrada:** `Reveal` aplica *fade + subida de ~16px* quando o bloco entra na viewport (uma vez).
- **Hover de card:** `transition hover:-translate-y-1.5` + leve aumento de brilho do blob/halo.
- **Etiquetas (Chips):** pílulas brancas com borda na cor da Arte, **flutuando** (ciclo 4–5s).
- **Curva padrão:** *ease-out* suave; nada de "molas" no site institucional (elasticidade só nas premiações).
- **Acessibilidade:** com `prefers-reduced-motion: reduce`, flutuação/órbita desligam e ficam só fades curtos.

> Regra de ouro: **um brush dominante por seção**, na cor daquela Arte — nunca empilhar cores rivais
> no mesmo módulo (mantém a leitura calma e a "beleza ordenada").

---

## 3. Brushes como marca d'água — especificação aplicada

O componente `Brush` (em `floating-art.tsx`) desenha uma **mancha orgânica borrada** (CSS puro, sem
asset externo), posicionável e com opacidade baixa:

```tsx
<Brush color="#f1c40f" className="left-[-8%] top-[6%] h-80 w-80" opacity={0.10} />
```

**Cobertura atual (home):**

| Seção | Brushes (cor · opacidade) |
|---|---|
| `Hero` | dourado 0.16 · rosa 0.14 · verde 0.12 |
| `GamesSection` | dourado 0.10 · rosa 0.08 · azul 0.07 |
| `TriviumSection` | (decoração própria por Arte) |
| `AudienceSection` | (decoração própria) |
| `TestimonialsSection` | dourado 0.10 · verde 0.08 |
| `CtaSection` | dourado 0.10 · roxo 0.07 |

**Como replicar em qualquer página nova:**
1. Marque a `<section>` como `relative overflow-hidden`.
2. Logo após a abertura, solte 2–3 `<Brush>` nas cores da Arte daquela seção (opacidade **0.06–0.12**).
3. Envolva o conteúdo em um wrapper com `relative z-10` para ficar acima das manchas.

> **Próximo nível (opcional):** trocar o blob borrado por uma **pincelada SVG** com leve textura
> (mais "aquarela/têmpera") — registrado em `PROJETO_DESIGN_ARKANOS.md` §2.6, item 2.

---

## 4. Tipografia da marca (3 níveis)

Best practices de tipografia web aplicadas ao contexto (clássico-cristão, premium, infantil, escolas+famílias):

| Nível | Fonte | Uso | Por quê |
|---|---|---|---|
| **Títulos** | **Fraunces** (serifa *old-style* variável) | h1–h3, `.font-display` | Herança clássica + calor editorial; *optical sizing*; carrega Verdade · Bondade · Beleza. |
| **Corpo/UI** | **Plus Jakarta Sans** (humanista) | texto, botões, dashboards | Legível para crianças e pais; calorosa e moderna; ótima em relatórios. |
| **Emblema** | **Cinzel** (capitulares romanas) | wordmark, nomes de carta, eyebrows | Heráldica do "Reino"; usada só como acento (nunca em parágrafos). |

Wiring: `layout.tsx` (next/font, `display:swap`) → variáveis `--font-display-brand`, `--font-sans-brand`,
`--font-cinzel` → `globals.css` (`--font-display`, `--font-sans`, `--font-emblem` + utilitário `.font-emblem`).

> Alternativas calmas, se quiser trocar depois: títulos **Newsreader** ou **Lora**; corpo **Inter**.

---

## 5. O que falta para "ficar igual à referência"

- [ ] Trocar o **placeholder do hero** (`/img/guardioes/lyra.png`) pela **foto de criança recortada**
      (`hero-crianca.png`) e os `Clay` pelos **ícones 3D** reais (ver `PROMPTS_PARA_CHATGPT.md` Família A/B).
- [ ] Aplicar `.font-emblem` (Cinzel) nas **eyebrows** das seções (acento heráldico consistente).
- [ ] Rolar os brushes para as **demais páginas** (jogos, coleção, ranking, sobre, clube do livro).
- [ ] (Opcional) Brush em **SVG aquarela** no lugar do blob borrado.
