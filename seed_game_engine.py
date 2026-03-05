import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from core.game_engine.models import GameDefinition, Achievement
from modules.desafio_dos_sabios.models import QuizQuestion

def seed_game_definitions():
    print("Seeding Game Definitions...")
    GameDefinition.objects.get_or_create(
        key="desafio_dos_sabios",
        defaults={
            "name": "Desafio dos Sábios",
            "journey": "Logos",
            "modes": ["aprendiz", "desafio", "torneio"],
            "scoring_rules_key": "default_quiz_rules"
        }
    )

def seed_achievements():
    print("Seeding Achievements...")
    achievements = [
        {
            "key": "primeiro_sangue",
            "name": "Primeiro Sangue",
            "description": "Primeira partida finalizada",
            "icon": "⚔️",
            "rule_key": "first_game_finished"
        },
        {
            "key": "trinca",
            "name": "Trinca",
            "description": "3 acertos seguidos",
            "icon": "🔥",
            "rule_key": "streak_3"
        },
        {
            "key": "impecavel",
            "name": "Impecável",
            "description": "100% de acerto em uma sessão (>= 5 perguntas)",
            "icon": "💎",
            "rule_key": "perfect_score_5"
        },
        {
            "key": "discipulo_logos",
            "name": "Discípulo de Logos",
            "description": "Acumular 500 XP em jogos da jornada Logos",
            "icon": "📚",
            "rule_key": "logos_500_xp"
        }
    ]
    for ach in achievements:
        Achievement.objects.get_or_create(key=ach['key'], defaults=ach)

def seed_quiz_questions():
    print("Seeding Quiz Questions...")
    # Example data
    questions = [
        {
            "question": "De onde vem o nome minoicos?",
            "options": ["Do rei Minos", "De um rio", "De uma cidade", "De um templo"],
            "answer": "Do rei Minos",
            "type": "multiple_choice",
            "difficulty": "easy",
            "subject": "História",
            "topic": "Civilizações do Egeu",
            "journey": "Logos",
            "explanation": "O nome vem do mitológico rei Minos de Creta."
        }
    ]
    
    # Check if data/quiz_questions.json exists
    json_path = 'data/quiz_questions.json'
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)

    for q in questions:
        # Convert non-string answers to JSON strings if needed
        # (QuizQuestion.answer is a TextField)
        if not isinstance(q['answer'], str):
            q['answer'] = json.dumps(q['answer'])
        
        # We use question text as unique identifier for get_or_create in this simple seed
        defaults = {k:v for k,v in q.items() if k != 'id'}
        defaults['source'] = 'manual'
        
        QuizQuestion.objects.get_or_create(
            question=q['question'],
            defaults=defaults
        )

if __name__ == "__main__":
    seed_game_definitions()
    seed_achievements()
    seed_quiz_questions()
    print("Seed completed successfully!")
