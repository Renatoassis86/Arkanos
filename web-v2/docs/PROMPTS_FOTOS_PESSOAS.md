# Prompts — Fotos de Pessoas (PNG transparente) para todo o site

> **Objetivo:** "rechear" o site de pessoas reais, recortadas, para entrar em **máscaras
> desconstruídas** com brushes/ícones/vetores ao redor (a moldura é feita no código — a foto sai
> **limpa**). Referência de *onde colocar*: layout da Educacross (hero com criança, banners de família
> de canto a canto, seções alternadas, faixas CTA, depoimentos). Identidade e textos: 100% Arkanos.
>
> **Pastas:** individuais/grupos → `web-v2/public/img/site/fotos/` · banners full-bleed (canto a canto)
> → `web-v2/public/img/site/banners/`. **Sempre PNG, fundo 100% transparente, sem texto, sem logo.**

## Como gerar (consistência)
1. **1 prompt = 1 imagem.** Gere **na mesma conversa** para o traço/iluminação não variar.
2. **Âncora:** gere primeiro a **F01** (protagonista do hero), aprove, e nas seguintes **anexe a F01**
   adicionando *"Mesma iluminação, recorte e tratamento de cor da imagem anexa."*
3. **Diversidade brasileira** real (tons de pele, cabelos, biotipos), roupas modernas e claras.
4. **Recorte perfeito** (cabelo limpo), pessoa **inteira ou da cintura pra cima** conforme indicado.

---

## ESTILO-MESTRE A (cole SEMPRE no início de cada prompt)
> *Professional studio photo, real Brazilian person, soft natural lighting, vivid clean colors,
> modern and bright look, joyful and confident, high sharpness, no text, no logo, **perfect cutout
> with a 100% transparent background (PNG)**. Authentic Brazilian diversity, child-appropriate,
> premium and friendly.*
>
> PT: *Foto profissional de estúdio, pessoa brasileira real, iluminação suave e natural, cores vivas
> e limpas, visual moderno e claro, alegre e confiante, alta nitidez, sem texto, sem logo, **recorte
> perfeito com fundo 100% transparente (PNG)**. Diversidade brasileira autêntica, apropriada para
> crianças, premium e simpática.*

---

# ZONA 1 — HERO (home · `floating-art.tsx` → HeroShowcase)
Pasta: `site/fotos/` · vertical **900×1200** (3:4) · cintura pra cima ou corpo inteiro.

- **F01 · `hero-protagonista.png` · (ÂNCORA — gerar 1º)**
  [ESTILO-MESTRE A] + *Criança brasileira de ~9 anos, sorriso confiante, segurando um tablet/livro
  junto ao peito, olhando levemente para cima como quem descobre algo. Roupa clara e moderna, leve
  ângulo 3/4, corpo da cintura pra cima.*
- **F02 · `hero-menina.png`** — [A] + *Menina ~8 anos, alegre, uma mão erguida apontando pra cima
  (alcançando uma "estrela do saber"), a outra segurando um livro; postura dinâmica, corpo inteiro.*
- **F03 · `hero-menino.png`** — [A] + *Menino ~11 anos, calmo e curioso, olhando pra cima com
  admiração, segurando um tablet; corpo inteiro, leve 3/4.*

# ZONA 2 — BANNERS DE CANTO A CANTO (full-bleed · `site/banners/`)
Horizontal largo **2000×1100**. A pessoa/família fica deslocada para um lado (espaço para texto do outro).

- **B01 · `banner-familia.png`** — [A] + *Família brasileira (pai, mãe e 1–2 filhos) estudando junto,
  afetuosa e feliz, a criança apontando para um tablet; todos recortados, agrupados à direita do quadro,
  corpo da cintura pra cima.*
- **B02 · `banner-turma.png`** — [A] + *Grupo de 3–4 crianças brasileiras de uniforme clássico discreto,
  atentas e felizes lado a lado, como numa sala acolhedora; recortadas, alinhadas, da cintura pra cima.*
- **B03 · `banner-mae-filho.png`** — [A] + *Mãe e filho(a) lendo um livro juntos, aconchego de
  homeschool, sorrindo um para o outro; recortados à esquerda do quadro.*

# ZONA 3 — PÚBLICOS (home · `audience-section.tsx` → Escolas × Famílias)
Pasta: `site/fotos/` · vertical **800×1000**.

- **F04 · `publico-escolas.png`** — [A] + *Professora brasileira acolhedora ao lado de duas crianças
  atentas, clima de escola clássica; agrupados, da cintura pra cima.* (azul · escola)
- **F05 · `publico-familias.png`** — [A] + *Pai ou mãe e filho(a) sorrindo, estudando em casa com um
  tablet; afeto de família educadora.* (verde · família)

# ZONA 4 — FEATURE ROWS (home · `feature-row.tsx`)
Pasta: `site/fotos/` · vertical **800×1000**.

- **F06 · `feature-relatorios.png`** — [A] + *Professora/coordenadora brasileira, adulta, profissional
  e cuidadosa, segurando um tablet com relatórios, gesto de quem explica dados; smart-casual.* (azul)
- **F07 · `feature-gamificacao.png`** — [A] + *Criança comemorando uma conquista, punhos erguidos,
  grande sorriso orgulhoso, como quem ganhou uma medalha.* (rosa)

# ZONA 5 — PROGRAMAS / "O que você recebe" (cards · `site/fotos/`)
Vertical **800×1000**, uma criança por programa (cor da Arte).

- **F08 · `prog-desafios.png`** — [A] + *Criança concentrada e feliz respondendo um quiz no tablet,
  dedo prestes a tocar a resposta, leve sorriso de descoberta.* (Lógica · azul)
- **F09 · `prog-spelling.png`** — [A] + *Criança soletrando alegremente, boca formando uma letra,
  uma mão gesticulando, segurando um livrinho.* (Gramática · rosa)
- **F10 · `prog-quadrivium.png`** — [A] + *Criança curiosa segurando formas geométricas ou um pequeno
  ábaco, olhando com admiração.* (Quadrivium · verde)
- **F11 · `prog-programacao.png`** — [A] + *Criança montando blocos coloridos de programação / um
  robozinho amigável, concentrada e encantada, visual moderno.* (Programação · ciano)
- **F12 · `prog-leitura.png`** — [A] + *Criança imersa e sorridente lendo um livro de capa dura,
  acolhedora.* (Leitura · âmbar)

# ZONA 6 — CLUBE DO LIVRO (`/clube-do-livro` · `site/fotos/`)
- **F13 · `clube-crianca-lendo.png`** · 800×1000 — [A] + *Criança encantada lendo um livro ilustrado,
  expressão de quem viaja na história.*
- **F14 · `clube-familia-lendo.png`** · horizontal 1400×1000 — [A] + *Mãe/pai lendo em voz alta para
  uma ou duas crianças atentas e sorridentes, aconchego.*
- **F15 · `clube-contacao.png`** · 800×1000 — [A] + *Contador(a) de histórias adulto(a), expressivo,
  gesticulando como quem narra; caloroso e teatral, sem adereços.*

# ZONA 7 — CTA / FAIXA FINAL (`cta-section.tsx` · `site/banners/`)
- **B04 · `cta-familia.png`** · horizontal 1800×900 — [A] + *Família brasileira feliz (pais e 1–2
  filhos) olhando para o espectador, unida, clima de convite/começo de jornada; recortados, agrupados.*

# ZONA 8 — SOBRE / CONSULTORIA (`/sobre` · `site/fotos/`)
- **F16 · `sobre-professora.png`** · 800×1000 — [A] + *Professora brasileira inspiradora, adulta,
  segurando um tablet com relatórios, ar profissional e acolhedor, smart-casual.*
- **F17 · `sobre-gestor.png`** · 800×1000 — [A] + *Diretor(a)/coordenador(a) escolar, profissional e
  acessível, adulto, segurando uma pasta, sorriso seguro; business-casual.*
- **F18 · `sobre-consultoria.png`** · horizontal 1400×1000 — [A] + *Dois educadores adultos brasileiros
  conversando sobre um tablet, parceria e confiança, ambiente de trabalho leve.*

# ZONA 9 — DEPOIMENTOS (headshots · `site/fotos/`)
Quadrado **600×600**, busto, sorriso natural (entram em avatares redondos).

- **F19 · `depo-mae.png`** — [A] + *Retrato de mãe brasileira ~35 anos, calorosa, sorriso natural, busto.*
- **F20 · `depo-professor.png`** — [A] + *Retrato de professor brasileiro ~40 anos, confiante e
  gentil, smart-casual, busto.*
- **F21 · `depo-educadora.png`** — [A] + *Retrato de mãe educadora brasileira ~30 anos, simpática,
  busto.*

# ZONA 10 — PAINEL DO ALUNO (dashboard · opcional · `site/fotos/`)
- **F22 · `painel-aluno-comemora.png`** · 800×1000 — [A] + *Criança comemorando vitória com alegria,
  punhos erguidos, grande sorriso (premiação/conquista).*
- **F23 · `painel-aluno-estudando.png`** · 800×1000 — [A] + *Criança focada e feliz com um tablet,
  postura de quem está numa jornada de estudo.*

---

## Resumo (23 fotos)
**Banners full-bleed (`site/banners/`):** B01 família · B02 turma · B03 mãe+filho · B04 CTA família.
**Individuais/grupos (`site/fotos/`):** F01–F23 (hero, públicos, features, programas, clube, sobre,
depoimentos, painel).

> Depois de gerar: deposite os arquivos nas pastas indicadas e me avise — eu troco os **placeholders**
> (hero `lyra.png`, blobs vazios) pelas fotos e monto as **máscaras desconstruídas** (recorte +
> brushes + ícones 3D + vetores ao redor) em cada seção.
