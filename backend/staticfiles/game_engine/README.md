# Arkanos Game Engine

Este diretório contém a camada central de jogos da plataforma Arkanos.

## Estrutura

- `core/game_engine/`: App Django e Lógica JS Core.
- `modules/`: Módulos de jogos específicos (ex: `desafio_dos_sabios`).

## Endpoints da Engine

- `GET /api/game-engine/games/`: Lista jogos registrados.
- `POST /api/game-engine/games/session/start/`: Inicia uma sessão.
- `POST /api/game-engine/games/session/event/`: Registra eventos (ex: acertos).
- `POST /api/game-engine/games/session/finish/`: Finaliza sessão e calcula XP/Nível.
- `GET /api/game-engine/progress/me/`: Retorna progresso do usuário logado.

## Como adicionar novos jogos

1. Registre o jogo na tabela `GameDefinition` (via seed ou admin).
2. Crie um novo módulo em `modules/[nome_do_jogo]`.
3. Utilize a classe `GameEngine` no frontend para gerenciar a sessão.

## Migrations & Seed

Para configurar o ambiente:
```bash
python manage.py makemigrations game_engine desafio_dos_sabios
python manage.py migrate
python seed_game_engine.py
```
