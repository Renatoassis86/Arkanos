
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from modules.desafio_dos_sabios.models import QuizQuestion

def seed_more_qs():
    print("Seeding more Desafio dos Sábios MC questions...")
    
    questions = [
        # Guerra de Troia
        {
            'question': 'Quem foi o herói grego quase invencível, exceto pelo seu calcanhar, na Guerra de Troia?',
            'options': ['Héctor', 'Aquiles', 'Ulisses', 'Páris'],
            'answer': 'Aquiles',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Guerra de Troia',
            'explanation': 'Aquiles era o maior guerreiro grego, morto por uma flecha no calcanhar.'
        },
        {
            'question': 'Qual foi o estratagema usado pelos gregos para finalmente invadir a cidade de Troia?',
            'options': ['Um túnel subterrâneo', 'Um enorme Cavalo de Madeira', 'Um cerco de 20 anos', 'Um suborno aos guardas'],
            'answer': 'Um enorme Cavalo de Madeira',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Guerra de Troia',
            'explanation': 'O Cavalo de Troia permitiu que soldados gregos entrassem na cidade escondidos.'
        },

        # Linha do Tempo
        {
            'question': 'Qual evento marca tradicionalmente o fim da Idade Antiga e o início da Idade Média?',
            'options': ['Descoberta da América', 'Queda de Constantinopla', 'Queda do Império Romano do Ocidente', 'Revolução Francesa'],
            'answer': 'Queda do Império Romano do Ocidente',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Linha do Tempo',
            'explanation': 'A queda de Roma em 476 d.C. é o marco do fim da Antiguidade.'
        },
        {
            'question': 'Qual destas civilizações floresceu PRIMEIRO na região do Mar Egeu?',
            'options': ['Romana', 'Minoica', 'Micênica', 'Bizantina'],
            'answer': 'Minoica',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Linha do Tempo',
            'explanation': 'A civilização Minoica em Creta precedeu a Micênica no continente.'
        }
    ]

    for q_data in questions:
        if not QuizQuestion.objects.filter(question=q_data['question']).exists():
            QuizQuestion.objects.create(**q_data)
            
    # Remove or update old non-MC questions to keep everything multiple choice as requested
    # Actually, the view already filters them, but let's be clean.
    QuizQuestion.objects.exclude(type='multiple_choice').delete()
    print("Deleted non-multiple-choice questions and added new MC ones.")

if __name__ == "__main__":
    seed_more_qs()
