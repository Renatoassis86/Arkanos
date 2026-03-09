# 📓 Diário de Bordo — Arkanos One

Este documento registra a evolução do projeto Arkanos, as decisões de design, os desafios técnicos superados e os aprendizados consolidados.

---

## 🏗️ Estrutura e Arquitetura

### 1. Sistema de Header Duplo (Estilo *Cidade Viva Education*)
- **O Problema**: O menu superior transparente ficava "sujo" ao rolar a página, com letras brancas sobrepondo textos e elementos claros do site, tornando-os ilegíveis.
- **A Solução**: Implementamos uma barra de topo fixa (`header-top`) para slogan e links institucionais, e um menu principal (`header-main`) que transita de transparente para um **azul escuro sólido (`#0f172a`)** imediatamente após o scroll de 30px.
- **Aprendizado**: O uso de classes CSS controladas por JavaScript (`site-header--scrolled`) é mais robusto do que manipular estilos diretamente via JS, permitindo transições suaves via `transition: all 0.4s ease`.

### 2. Otimização de Ativos (Vercel Ready)
- **O Problema**: Arquivos MP4 pesados e assets redundantes estavam inchando o repositório, retardando o deploy e correndo o risco de exceder os limites da Vercel.
- **A Solução**: 
    - Criamos a *templatetag* `remote_video` para servir vídeos pesados via **Supabase Storage** em produção, mantendo o fallback local para desenvolvimento.
    - Substituímos vídeos não essenciais por imagens estáticas de alta qualidade geradas por IA (`indicadores.png`, `suporte.png`).
    - Limpeza agressiva de arquivos temporários (`.patch`, `.txt`, logs).
- **Aprendizado**: Centralizar o gerenciamento de assets pesados fora do bundle da aplicação é essencial para escalabilidade.

---

## 🎨 Design e User Experience (RPG Tech)

### 1. Personagens em Ação
- **Evolução**: Saímos de modelos estáticos para poses de ação dinâmicas para Lyra, Aion e Kael.
- **Contexto**: Lyra agora aparece "soletrando" e Aion "digitando", criando uma conexão direta com a mecânica dos jogos (Spelling Bee e Radix).

### 2. Bandeirolas Horizontais
- **Mudança**: Substituímos fotos circulares por **bandeirolas estilo U-Flag** nas seções de Programas e Passos.
- **Impacto**: O layout horizontal side-by-side aproveita melhor o espaço de tela e evita rolagens verticais excessivas, mantendo o usuário focado no fluxo de adoção.

---

## 🛠️ Manutenibilidade e Limpeza

- **Refatoração de CSS**: Centralizamos os estilos de "RPG Tech" em arquivos específicos (`game-rpg.css`), evitando poluição no `arkanos.css` global.
- **Consistência de Classnames**: Padronizamos as classes do Header para evitar conflitos entre templates legados e novos.
- **Recuperação de Desastres**: Implementamos um fluxo de "Rollback & Restore" para garantir que arquivos críticos de infraestrutura (`requirements.txt`, `runtime.txt`) permaneçam íntegros após limpezas.

---

## 🎓 Próximos Passos
1. Finalizar a integração de IA no "Desafio dos Sábios".
2. Monitorar a performance de carregamento dos vídeos via Supabase.
3. Iniciar o módulo de Retórica com o Guardião Kael.

> **Status Atual**: 🟢 Deploy Estável | 🛡️ Design Premium | 🚀 Código Limpo
