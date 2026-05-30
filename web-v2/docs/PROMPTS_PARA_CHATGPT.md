# Prompts para o ChatGPT — copia-e-cola (Arkanos)

> Versão otimizada para **gerar uma figura por vez** mantendo o traço **idêntico**.
> Fonte detalhada: `PROJETO_DESIGN_ARKANOS.md` (§3 estilos-mestre, §4 prompts) e
> `PROJETO_COLECIONAVEIS_E_MESTRES.md` (cards/orbes/medalhas/selos/Mestres).

## Como usar (regra de consistência)
1. **1 prompt = 1 imagem.** Nunca cole o arquivo todo de uma vez.
2. **Gere por FAMÍLIA, na MESMA conversa do ChatGPT.** Não misture famílias na mesma sessão
   (foto, ícone 3D e personagem têm traços diferentes).
3. **Método da ÂNCORA:** o **1º bloco** de cada família traz o prompt completo (com o Estilo-mestre).
   Gere, **aprove**, e nos blocos seguintes **anexe a imagem-âncora aprovada** e use o prompt curto
   *"Mesmo estilo, traço e acabamento da imagem anexa. [cena]"*. Assim todas saem iguais à âncora.
4. **Sempre** salve com o **nome do arquivo** na **pasta** indicada, na proporção/fundo indicados.
5. Pastas: fotos → `web-v2/public/img/site/fotos/` · ícones → `.../site/icones/` ·
   mockups → `.../site/mockups/` · guardiões → `.../guardioes/` · mestres → `.../site/mestres/` ·
   cards/orbes/medalhas → `.../cards/` · selos → `.../cards/selos/`.

---

# FAMÍLIA A — Fotografia de crianças/adultos (PNG transparente)
Pasta: `web-v2/public/img/site/fotos/` · **Âncora = A1**.

**ESTILO-MESTRE A (vai no início da âncora):**
> *Foto profissional de estúdio, pessoa brasileira real, iluminação suave e natural, cores vivas e
> limpas, visual moderno e claro, alegre e confiante, alta nitidez, sem texto, sem logo, recorte
> perfeito com fundo 100% transparente (PNG). Diversidade brasileira autêntica, apropriado para
> crianças.*

### A1 · `hero-crianca.png` · ~900×1100 · PNG transparente · **(ÂNCORA — gere primeiro e aprove)**
> [ESTILO-MESTRE A] + *Criança brasileira de ~9 anos, sorrindo, confiante, segurando um tablet/livro
> junto ao peito, olhando levemente para cima em direção ao espectador, roupa clara e moderna. Corpo
> da cintura para cima, leve ângulo de 3/4, recorte perfeito transparente.*

> **A partir daqui, anexe `hero-crianca.png` aprovada e use:** *"Mesmo estilo, iluminação e traço da
> imagem anexa. [cena abaixo]. Recorte perfeito, fundo 100% transparente (PNG)."*

- A2 · `hero-crianca-2.png` · vertical ~900×1100 — *Menina ~8 anos, alegre, uma mão erguida apontando para cima como quem alcança uma estrela do saber, a outra segurando um livro, postura dinâmica.*
- A3 · `hero-crianca-3.png` · vertical ~900×1100 — *Menino ~11 anos, calmo e curioso, olhando para cima com admiração, segurando um tablet brilhante com uma constelação.*
- B1 · `foto-desafios.png` · ~800×1000 — *Criança concentrada e feliz respondendo um quiz no tablet, dedo prestes a tocar a resposta, leve sorriso de descoberta, sentada.* (Lógica · azul)
- B2 · `foto-spelling.png` · ~800×1000 — *Criança soletrando alegremente, boca formando uma letra, uma mão gesticulando, segurando um livrinho.* (Gramática · rosa)
- B3 · `foto-quadrivium.png` · ~800×1000 — *Criança curiosa segurando formas geométricas / um pequeno ábaco, olhando com admiração.* (Quadrivium · verde)
- B4 · `foto-programacao.png` · ~800×1000 — *Criança montando blocos coloridos de programação / um robozinho amigável, concentrada e encantada, visual moderno.* (Programação · ciano)
- B5 · `foto-familia.png` · horizontal ~1100×850 — *Mãe (ou pai) e filho estudando juntos numa mesa aconchegante em casa, afetuoso, a criança apontando para um tablet, ambos sorrindo. Duas pessoas.* (homeschool · âmbar)
- B6 · `foto-escola.png` · horizontal ~1200×850 — *Crianças brasileiras numa sala de aula clássica, calma e acolhedora, atentas e felizes, luz quente. Grupo de 2–3 crianças.* (escola · azul)
- B7 · `foto-professora.png` · ~800×1000 — *Professora brasileira, acolhedora e inspiradora, adulta, gesticulando como quem ensina, segurando um tablet com relatórios, ar profissional e cuidadoso, roupa smart-casual.* (consultoria · dourado)
- B8 · `foto-gestor.png` · ~800×1000 — *Diretor(a)/coordenador(a) escolar, profissional e acessível, adulto, segurando uma pasta, sorriso seguro e tranquilizador, business-casual.* (decisor · navy)
- B9 · `foto-familia-completa.png` · horizontal ~1300×900 — *Família brasileira (pais e 1–2 filhos) feliz com um tablet/livro, clima homeschool, unida, olhando para o espectador.* (faixa família)
- B10 · `foto-aluno-comemora.png` · ~800×1000 — *Criança comemorando uma vitória, punhos erguidos de alegria, grande sorriso orgulhoso, como quem acabou de ganhar uma conquista.* (premiação)

---

# FAMÍLIA B — Ícones 3D "clay" (PNG transparente)
Pasta: `web-v2/public/img/site/icones/` · **512×512** · **Âncora = `orbe.png`**.

**ESTILO-MESTRE B (vai no início da âncora):**
> *Ícone 3D em estilo clay/plasticina macia, cantos arredondados, volumes macios e fofos, acabamento
> fosco, sombra de contato suave, cores vivas da paleta Arkanos, premium porém lúdico e infantil,
> fundo 100% transparente (PNG), sem texto, pronto para flutuar. Objeto único centralizado, luz
> suave de estúdio.*

### `orbe.png` · **(ÂNCORA — gere primeiro e aprove)**
> [ESTILO-MESTRE B] + *um orbe mágico do saber brilhando, núcleo azul com faíscas douradas dentro, brilho suave.*

> **Depois, anexe `orbe.png` e use:** *"Mesmo estilo clay, acabamento fosco e nível de fofura da
> imagem anexa, objeto único centralizado, fundo 100% transparente (PNG). Objeto: [abaixo]."*

- `pena.png` — *pena dourada de escrever, elegante, tons rosa-e-dourado* (Gramática)
- `livro.png` — *livro aberto iluminado com páginas brilhando, uma estrelinha acima* (rosa)
- `pergaminho.png` — *pergaminho enrolado iluminado com selo dourado e leve brilho* (dourado)
- `balanca.png` — *balança dourada perfeitamente simétrica* (Lógica · azul)
- `compasso.png` — *compasso de desenho dourado com pequenos sólidos (cubo, esfera, pirâmide) ao redor* (Geometria · roxo)
- `nota.png` — *nota musical brilhante (ou uma pequena lira dourada) com ondinhas sonoras* (Música · âmbar)
- `esfera-armilar.png` — *esfera armilar dourada com estrelinhas/constelação ao redor* (Astronomia · índigo)
- `codigo.png` — *um bloco com o símbolo de chaves de código { }, amigável e brilhante* (Programação · ciano)
- `coruja.png` — *uma coruja sábia fofa segurando um livrinho, olhos grandes amigáveis, ar de formando* (sabedoria · dourado/âmbar) — **mascote**
- `trofeu.png` — *troféu/taça dourado, premium, brilho suave*
- `medalha.png` — *medalha redonda dourada com fita azul-marinho, centro vazio, brilho suave*
- `bussola.png` — *bússola dourada clássica apontando o norte, brilho suave*
- `ampulheta.png` — *ampulheta dourada elegante com areia brilhante — o símbolo do logo Arkanos*
- `abaco.png` — *pequeno ábaco dourado com contas coloridas* (Aritmética · verde)
- `solido.png` — *conjunto de sólidos geométricos brilhantes (cubo, esfera, tetraedro) empilhados* (Geometria · roxo)
- `estrela.png` — *uma única estrela dourada brilhante / pequena constelação* (Astronomia · índigo)
- `coroa.png` — *pequena coroa de louros dourada, brilho suave* (conquista/virtude)
- `escudo.png` — *escudo heráldico com borda dourada, suave e amigável* (guardião/proteção · navy)
- `chave.png` — *chave dourada ornamentada, brilho suave* (acesso ao saber)

---

# FAMÍLIA C — Guardiões (personagem chibi, PNG transparente)
Pasta: `web-v2/public/img/guardioes/` · **Âncora = a arte ORIGINAL do guardião** (`lyra/aion/kael.png`
ou a base já gerada). **Identidades fixas — nunca mude cabelo/olhos/traje/item.**

**ESTILO-MESTRE C:**
> *Chibi cartoon mascote, estilo anime, contorno preto grosso e limpo, cel-shading chapado, cores
> vivas e saturadas, olhos grandes expressivos, formas simples, corpo inteiro, ilustração infantil,
> fundo transparente (PNG), sem realismo, sem degradês, sem texto.*

> **Para uma POSE NOVA de um guardião:** anexe a arte original dele e use:
> *"Mesma personagem, traço e identidade exata da imagem anexa (não mude cabelo, olhos, roupa nem o
> item). Nova pose: [descreva]. Corpo inteiro, fundo 100% transparente (PNG)."*

Identidades (resumo — detalhe em `PROJETO_DESIGN_ARKANOS.md` §3 e `scripts/generate-guardians-ref.mjs`):
Lyra (rosa, pena dourada) · Aion (azul, relógio) · Kael (vermelho, espada) · Numa (verde, ábaco) ·
Geon (roxo, compasso) · Melos (âmbar, lira) · Astra (índigo, esfera armilar/capa estrelada).

---

# MOCKUPS de dispositivo
Pasta: `web-v2/public/img/site/mockups/`.
> Prefira **moldura de aparelho real** (tablet/laptop) com **screenshot REAL** do nosso app por dentro
> (capture a tela). Se gerar por IA, peça apenas o aparelho vazio: *"a clean modern tablet (and a
> laptop) device mockup, front/3-quarter view, blank screen, soft contact shadow, transparent
> background (PNG), no brand"* — e componha a tela do app por cima no código/editor.

---

# COLECIONÁVEIS & MESTRES
Use o MESMO método de âncora. Os prompts completos (cards TCG, 30 orbes com significado, medalhas,
12 selos estilo Mario 3D World, 9 Mestres chibi) estão em **`PROJETO_COLECIONAVEIS_E_MESTRES.md`**.
- **Cards/Orbes/Medalhas** (heráldico) → âncora = `template-carta-orbe.webp` já existente; gere os
  interiores referenciando o template.
- **Selos** (estilo Mario) → âncora = o 1º selo aprovado; pasta `cards/selos/`.
- **Mestres** (chibi) → mesma Família C; âncora = 1º Mestre aprovado; pasta `site/mestres/`.

> Peça que eu expanda esta seção em blocos autocontidos (como as Famílias A/B acima) quando for gerar.
