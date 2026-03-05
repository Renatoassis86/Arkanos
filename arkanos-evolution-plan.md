# Plano de Evolução: Projeto Arkanos

Este documento detalha o plano para corrigir a estrutura, aprimorar a jogabilidade do Spelling Bee e elevar a estética do projeto Arkanos para um nível premium RPG/Clássico/Tech.

## 🎯 Objetivos
1. **Estabilização**: Corrigir ambiente e estrutura para execução local estável.
2. **Precisão Spelling Bee**: Implementar TTS, comparação inteligente e feedback didático.
3. **Gamificação Pro**: Sistema de medalhas, níveis e rankings.
4. **UI/UX Revolucionária**: Estética "RPG Clássico Tecnológico" (Aventura/Mística) com profundidade e animações.

---

## 🏗️ Fase 1: Estabilização e Estrutura (Backend)
- [ ] Padronizar uso do ambiente `.venv`.
- [ ] Corrigir caminhos de templates e estáticos no Django (`settings.py`).
- [ ] Migrar lógica de banco de dados para suportar gamificação (Níveis, Medalhas).
- [ ] Criar API endpoints para persistência de progresso real (não apenas LocalStorage).

## 🎮 Fase 2: Core Gameplay (Spelling Bee)
- [ ] **Vocalização**: Integrar Web Speech API para leitura clara das palavras.
- [ ] **Algoritmo de Precisão**: Normalização de strings (acentos, espaços) para evitar falsos erros.
- [ ] **Feedback Didático**: Ao errar, exibir a palavra correta e destacar a letra/parte onde houve o erro.
- [ ] **Dificuldade Dinâmica**: Adaptar o tempo e complexidade conforme o desempenho da criança.

## 🏆 Fase 3: Sistema de Gamificação
- [ ] **Medalhas**: Definir triggers para conquistas (ex: "Primeiras 10 palavras", "Perfect Round").
- [ ] **Níveis**: Implementar progressão de XP e desbloqueio de novos temas baseados na série escolar.
- [ ] **Leaderboard**: Backend dinâmico para ranking por série e geral.

## 🎨 Fase 4: Design "RPG Clássico Tech"
- [ ] **Paleta**: Cores vibrantes (Ouro, Esmeralda, Rubi, Azul Meia-noite) - **BANIMENTO DO ROXO**.
- [ ] **Tipografia**: Serifas clássicas para títulos, Sans moderna para leitura técnica.
- [ ] **Efeitos**: Profundidade com camadas (parallax), texturas de pergaminho/metal e micro-animações de partículas (tech glow).
- [ ] **Responsividade**: Garantir que a experiência de "mesa de jogo" funcione em tablets e desktops.

---

## 🛠️ Próximos Passos Imediatos
1. Configurar script de inicialização local.
2. Atualizar `jogos/models.py` para incluir o sistema de gamificação.
3. Iniciar o redesign do componente principal do Spelling Bee.
