import os
import django
import json

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def seed():
    questions = [
        # Português
        {
            "subject": "Português",
            "topic": "Gramática",
            "question": "Qual é o coletivo de 'lobos'?",
            "options": ["Cardume", "Alcateia", "Enxame", "Bando"],
            "answer": "Alcateia",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "Alcateia é o substantivo coletivo para um grupo de lobos."
        },
        # Matemática
        {
            "subject": "Matemática",
            "topic": "Aritmética",
            "question": "Quanto é 7 x 8?",
            "options": ["48", "54", "56", "62"],
            "answer": "56",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "7 vezes 8 é igual a 56."
        },
        # Robótica
        {
            "subject": "Robótica",
            "topic": "Sensores",
            "question": "Qual sensor é usado para medir distância usando ondas sonoras?",
            "options": ["LDR", "Ultrassônico", "Potenciômetro", "Infravermelho"],
            "answer": "Ultrassônico",
            "type": "multiple_choice",
            "difficulty": "medium",
            "explanation": "Sensores ultrassônicos emitem ondas sonoras de alta frequência e medem o tempo de retorno para calcular distância."
        },
        # História
        {
            "subject": "História",
            "topic": "Brasil Colônia",
            "question": "Quem descobriu o Brasil em 1500?",
            "options": ["D. Pedro I", "Pedro Álvares Cabral", "Vasco da Gama", "Cristóvão Colombo"],
            "answer": "Pedro Álvares Cabral",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "Pedro Álvares Cabral liderou a frota portuguesa que chegou ao Brasil em 22 de abril de 1500."
        },
        # Ciências
        {
            "subject": "Ciências",
            "topic": "Sistema Solar",
            "question": "Qual é o maior planeta do nosso sistema solar?",
            "options": ["Terra", "Marte", "Júpiter", "Saturno"],
            "answer": "Júpiter",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "Júpiter é o maior planeta do Sistema Solar, tanto em diâmetro quanto em massa."
        },
        # Inglês
        {
            "subject": "Inglês",
            "topic": "Colors",
            "question": "What color is the sky on a clear day?",
            "options": ["Green", "Yellow", "Blue", "Red"],
            "answer": "Blue",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "O céu em um dia limpo é azul (Blue)."
        },
        # Geografia
        {
            "subject": "Geografia",
            "topic": "Continentes",
            "question": "Em qual continente fica o Brasil?",
            "options": ["Europa", "África", "Ásia", "América"],
            "answer": "América",
            "type": "multiple_choice",
            "difficulty": "easy",
            "explanation": "O Brasil está localizado na América do Sul."
        }
    ]

    print("Seeding Desafio dos Sábios questions...")
    for q in questions:
        QuizQuestion.objects.get_or_create(
            subject=q["subject"],
            topic=q["topic"],
            question=q["question"],
            defaults={
                "options": q["options"],
                "answer": q["answer"],
                "type": q["type"],
                "difficulty": q["difficulty"],
                "explanation": q["explanation"]
            }
        )
    print("Done!")

if __name__ == "__main__":
    seed()
