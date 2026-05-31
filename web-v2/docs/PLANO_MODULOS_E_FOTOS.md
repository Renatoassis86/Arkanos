# Plano de Módulos e Disposição de Fotos — Site Arkanos

> Plano completo de arquitetura da página informativa (Institucional → Contato), construído sobre as
> **17 fotos reais** em `public/img/fotos/`. Benchmark de *forma*: Educacross/BYJU's/Kodland.
> Identidade/conteúdo: 100% Arkanos (cosmovisão cristã clássica, 7 Artes, Verdade·Bondade·Beleza).
> Tipografia já definida (boas práticas): **Fraunces** (títulos) · **Plus Jakarta Sans** (corpo) ·
> **Cinzel** (emblema/eyebrows). Personagens animados (guardiões) ficam **só** no módulo *Universo Arkanos*.

---

## 1. Inventário real das 17 fotos (mapa de renomeação)

### Recortes — PNG transparente (entram em **máscara desconstruída**, flutuando)
| Origem (timestamp) | Nome semântico → `public/img/fotos/` | Conteúdo | Onde usar |
|---|---|---|---|
| 09_40_32 | `crianca-hero-menino.png` | Menino camisa azul, livros, olhando pra cima | **Hero** (protagonista) |
| 09_40_40 | `crianca-comemora-menina.png` | Menina, punho erguido, mochila, livro | **Gamificação** / premiação |
| 09_40_48 | `crianca-pensa-menino.png` | Menino camisa verde, pensativo, tablet | **Jogos/Desafios** (Lógica) |
| 09_41_25 | `escola-turma-arkanos.png` | Professora + 3 alunos **uniforme ARKANOS**, tablet | **Para Escolas** |
| 09_41_43 | `familia-sofa.png` | Família no sofá com laptop | **Para Famílias** |
| 09_42_30 | `clube-familia-livro.png` | Família lendo, brilho mágico no livro | **Clube do Livro** |
| 09_42_38 | `universo-livro-magico.png` | Família + livro com **castelo/dragão** saindo | **Universo Arkanos** (abertura) |
| 09_43_06 | `quadrivium-ciencia.png` | Educador de jaleco, molécula + livro "Science" | **Quadrivium / Ciência** |

### Com fundo — vão em **card mascarado** (a própria foto traz cenário/luz)
| Origem | Nome semântico | Conteúdo | Onde usar |
|---|---|---|---|
| 09_45_02 | `trivium-gramatica-prof.png` | Professora c/ livros Língua Portuguesa/Gramática | **Trivium / a Palavra** |
| 09_42_59 | `consultoria-executiva.png` | Executiva apontando, tablet | **Consultoria/Relatórios** + CTA |
| 09_42_09 | `gamificacao-familia-xp.png` | Família comemora **com ícones XP/estrela** | **Gamificação** (destaque) |
| 09_40_55 | `familia-mesa-1.png` | Família na mesa com tablet | banner/quem-somos |
| 09_41_02 | `familia-mesa-2.png` | Família na mesa (variação) | reserva |
| 09_41_09 | `leitura-mae-filha.png` | Mãe e filha lendo | Clube do Livro (card) |
| 09_41_51 | `familia-sofa-bg.png` | Família no sofá (com fundo) | reserva/depoimento |
| 09_42_02 | `familia-comemora-bg.png` | Família comemorando (com fundo) | reserva |
| 09_42_46 | `clube-familia-livro-bg.png` | Família + livro mágico (com fundo) | Clube do Livro (card) |

> **Recortar depois (opcional):** as fotos "com fundo" podem ganhar versão transparente para também
> flutuarem. Por ora entram em cards arredondados com a própria luz.

---

## 2. Sistema de tratamento de foto (3 componentes novos)

Padroniza o pedido do cliente: *PNG em moldura desconstruída, brush marca-d'água saindo por trás,
símbolos contextualizados ao redor, círculos/linhas atrás, foto+texto em fundo de cor diferente,
e a "cartela" sangrando do canto superior.*

1. **`<PhotoMask>`** — para **recortes transparentes**. Camadas (de trás p/ frente):
   `Brush` (marca-d'água na cor do módulo, vazando além da foto) → **forma orgânica/blob** com a foto
   recortada por cima (`border-radius` assimétrico = "moldura desconstruída") → **anel/círculo** fino
   dourado + **traços lineares** → **símbolos contextuais flutuantes** (ícones 3D clay: pena, balança,
   compasso, estrela…) orbitando → **chips** opcionais. Tudo anima sutil (float/orbit, respeita reduce).
2. **`<PhotoCard>`** — para **fotos com fundo**. A foto vai num **card de cantos arredondados
   assimétricos** com leve sombra, **brush** vazando atrás e 1–2 **símbolos** no canto. Bom para
   blocos "foto + texto" onde o fundo da seção é **cor diferente** do fundo principal.
3. **`<CornerCartela>`** — foto **sangrando do canto superior** da página (como cartela/carta),
   mascarada num retângulo de canto arredondado que entra a partir da borda direita do topo, com brush
   e símbolos. Usada no Hero e em aberturas de módulo.

**Tokens de tratamento (consistência):**
- Blob/máscara: `border-radius` assimétrico (ex.: `46% 54% 50% 50% / 55% 55% 45% 45%`).
- Brush: opacidade 0.10–0.18, **na cor da Arte do módulo**, sempre **vazando** além da foto.
- Símbolos = ícones 3D clay (família B do design) — pena (Gramática), balança (Lógica), tribuna
  (Retórica), ábaco (Aritmética), compasso (Geometria), lira (Música), esfera armilar (Astronomia),
  cruz/louros/estrela (virtudes). **Nunca emoji.**
- Foto+texto: alterna lado (zig-zag); o lado da foto recebe **fundo de cor diferente** (faixa/painel).

---

## 3. Arquitetura de módulos (ordem final, Institucional → Contato)

> Header fixo: **logo à esquerda**, nav central, **Entrar + Cadastrar no canto superior direito**.
> Respiro generoso entre módulos; **um brush dominante por seção** na cor da Arte.

| # | Módulo | Fundo | Foto(s) · tratamento | Símbolos ao redor | Cor |
|---|---|---|---|---|---|
| 0 | **Header** | branco translúcido | — (logo) + **Entrar/Cadastrar** à direita | ampulheta (marca) | dourado |
| 1 | **Institucional / Hero** | branco | `crianca-hero-menino` em **PhotoMask** + **CornerCartela** `familia-mesa-1` no canto sup. dir. | orbe, pena, balança, estrela | dourado/azul |
| 2 | **Credibilidade (números)** | `#f8fafc` | — (stats) | linhas/anéis | dourado |
| 3 | **Quem Somos / Manifesto** | painel creme `#fffdf3` | `trivium-gramatica-prof` em **PhotoCard** + texto | louros, cruz luminosa | dourado |
| 4 | **Para Escolas** | painel azul `#eff6ff` | `escola-turma-arkanos` (**PhotoMask**, recorte) | brasão, esfera, balança | azul |
| 5 | **Para Famílias** | painel verde `#ecfdf5` | `familia-sofa` (**PhotoMask**, recorte) | coração, livro, ábaco | verde |
| 6 | **As 7 Artes (Trivium+Quadrivium)** | branco | `trivium-gramatica-prof` + `quadrivium-ciencia` (**PhotoCard/Mask**) | pena, compasso, lira, esfera | rosa/roxo |
| 7 | **Jogos / Programas** | `#f8fafc` | `crianca-pensa-menino` (**PhotoMask**) nos cards | balança, orbe | multicor |
| 8 | **Gamificação** | painel âmbar `#fffbeb` | `gamificacao-familia-xp` (**PhotoCard**, já tem XP) + `crianca-comemora-menina` (**PhotoMask**) | medalha, coroa de louros, estrela | âmbar |
| 9 | **Clube do Livro** | painel índigo `#eef2ff` | `clube-familia-livro` (**PhotoMask**) + `leitura-mae-filha` (**PhotoCard**) | livro, marca-página, baú | índigo/rosa |
| 10 | **★ Universo Arkanos** (dedicado) | navy claro/gradiente | **`universo-livro-magico`** de abertura + **GUARDIÕES ANIMADOS** (chibi: Lyra, Aion, Kael, Numa, Geon, Melos, Astra) | constelações, esfera armilar | navy+dourado |
| 11 | **Consultoria / Relatórios** | painel azul `#eff6ff` | `consultoria-executiva` (**PhotoCard**) + texto | gráfico, escudo, esfera | azul |
| 12 | **Depoimentos** | `#f8fafc` | bustos (gerar depois) ou `familia-*-bg` | aspas douradas | dourado |
| 13 | **CTA final** | faixa gradiente clara | `consultoria-executiva` ou `familia-mesa-2` (**PhotoCard** sangrando) | louros, estrela | dourado |
| 14 | **Contato / Footer** | `#f8fafc` | — (form + canais) + crédito Arkos | ampulheta | dourado |

**Notas de ouro:**
- **Universo Arkanos** é o ÚNICO lugar com personagens animados (guardiões chibi) — explica a
  mitologia (7 Artes, guardiões, jornada). As fotos de pessoas reais NÃO se misturam com guardiões nas
  outras seções.
- Toda foto vaza para fora da sua máscara (desconstruída) com brush por trás — nunca um retângulo seco.
- Foto **sempre** acompanhada de **símbolos contextuais** da Arte daquela seção.

---

## 4. Header — Entrar / Cadastrar (canto superior direito)
Já implementado em `site-header.tsx`: à direita, **Entrar** (contorno dourado) + **Cadastrar**
(preenchido dourado); quando logado, vira **Meu Painel**. Manter; só revisar espaçamento/contraste.

## 5. Tipografia (boas práticas — já aplicada)
Títulos **Fraunces** (serifa old-style, herança+calor), corpo **Plus Jakarta Sans** (legível, moderna),
emblema/eyebrows/wordmark **Cinzel** (heráldica). Sem emojis; símbolos sempre ilustrados.

## 6. Ordem de implementação proposta
1. Renomear as 17 fotos (mapa §1) + criar pastas.
2. Criar `PhotoMask`, `PhotoCard`, `CornerCartela` (+ símbolos clay reutilizáveis).
3. Trocar o placeholder do **Hero** pela `crianca-hero-menino` + cartela de canto.
4. Construir módulos 3→9 (Quem Somos, Escolas, Famílias, 7 Artes, Jogos, Gamificação, Clube do Livro).
5. Módulo **Universo Arkanos** (guardiões animados).
6. Consultoria, Depoimentos, CTA, Contato.
