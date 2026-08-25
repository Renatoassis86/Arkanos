import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizTopic, QuizQuestion

def isolate_10_revision_questions():
    print("=== ISOLATING EXCLUSIVELY THE 10 REVISION SHEET QUESTIONS ===")

    # 1. Rename any old 'Exercício de Revisão Escolar' topics to 'Revisão Antiga'
    old_topics = QuizTopic.objects.filter(name__icontains="Revisão Escolar")
    for t in old_topics:
        t.name = "História do Brasil (Revisão Geral)"
        t.save()
        print(f"Renamed old topic {t.id} to '{t.name}'")

    # 2. Get or create the unique topic 'Exercício de Revisão'
    rev_topic = QuizTopic.objects.filter(name="Exercício de Revisão").first()
    if rev_topic:
        rev_questions = QuizQuestion.objects.filter(topic=rev_topic)
        print(f"Found {rev_questions.count()} questions under 'Exercício de Revisão'")
        
        # Verify exact questions count
        for q in rev_questions:
            print(f"  - Q{q.id}: {q.question[:60]}...")

    # 3. Export all questions to static JSON files
    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    isolate_10_revision_questions()
