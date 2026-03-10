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

### 3. Sistema de Gamificação (XP e Níveis)
- **Evolução**: Implementamos um sistema de progressão real com XP e níveis baseados em uma curva RPG (`Nível = floor(sqrt(XP/100)) + 1`).
- **Contexto**: O progresso agora é sincronizado entre o backend (Django) e as interfaces de jogo (Spelling Bee e Desafio dos Sábios), com HUDs dinâmicos e overlays de "Level Up" que celebram a evolução do aluno.

### 4. Suporte Visual Didático (Desafio dos Sábios)
- **Evolução**: Adicionamos suporte para questões visuais (mapas, diagramas e análise de imagens).
- **Conteúdo**: Criamos assets premium de Geografia (Mapas de Continentes, Camadas da Terra) integrados ao banco de dados via scripts de semente (`seed_geo_visual`).


---

## 🛠️ Manutenibilidade e Limpeza

- **Refatoração de CSS**: Centralizamos os estilos de "RPG Tech" em arquivos específicos (`game-rpg.css`), evitando poluição no `arkanos.css` global.
- **Consistência de Classnames**: Padronizamos as classes do Header para evitar conflitos entre templates legados e novos.
- **Recuperação de Desastres**: Reimplementamos o monitoramento de arquivos críticos de infraestrutura (`requirements.txt`, `runtime.txt`) que haviam sido silenciados por regras amplas demais no `.gitignore`.

---

## 🔧 Resolução de Crash (Vercel 500)

### 1. Arquivos de Construção (Build Assets)
- **O Problema**: A Vercel reportou `500: INTERNAL_SERVER_ERROR` (crash da Função Serverless).
- **A Solução**: Descobrimos que o `.gitignore` estava ignorando `*.txt`, o que incluía o `requirements.txt`. Sem ele, a Vercel não instalava o Django. Removemos a regra e restauramos os arquivos.
- **Aprendizado**: Arquivos de infraestrutura na raiz do projeto nunca devem ser ignorados por extensões genéricas.

### 2. Pacotes Python (`__init__.py`)
- **O Problema**: Pastas como `arkanos` e `core` não possuíam o arquivo `__init__.py`, impedindo o reconhecimento como pacotes.
- **A Solução**: Criação manual dos arquivos indicadores de pacote para garantir compatibilidade com ambientes de produção.

### 3. Falha de Módulo no Vercel (`sys.path` em `wsgi.py`)
- **O Problema**: A Vercel executava a aplicação a partir de `backend/core/wsgi.py`, mas os apps (`arkanos`, `jogos`, etc.) estavam na raiz do projeto. Isso gerava um `ModuleNotFoundError` interno (`FUNCTION_INVOCATION_FAILED`).
- **A Solução**: Modificamos o `wsgi.py` para injetar dinamicamente o diretório raiz absoluto (`project_root`) no `sys.path` antes de carregar as configurações do Django.
- **Aprendizado**: Ao implantar Django em funções Serverless, sempre garanta que o Caminho de Execução (*Execution Path*) alcance suas pastas e módulos personalizados.

-----

## 🎓 Próximos Passos
1. Finalizar a integração de IA no "Desafio dos Sábios" (Geração de imagens sob demanda).
2. Expandir o banco de questões de História e Ciências com suporte visual.
3. Implementar o sistema de "Medalhas Lendárias" (Achievements) no frontend.
4. Iniciar o módulo de Retórica com o Guardião Kael.

> **Status Atual**: 🟢 Deploy Estável | 🛡️ Gamificação Ativa | 🌍 Suporte Visual Pronto

