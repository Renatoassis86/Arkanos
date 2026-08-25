import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizTopic, QuizQuestion, QuizSubject, QuizGrade, QuizAssessment

def reassign():
    print("=== REASSIGNING TOPICS SO ONLY 10 SHEET QUESTIONS REMAIN IN 'Exercício de Revisão' ===")

    subject = QuizSubject.objects.get(name="História")
    grade = QuizGrade.objects.get(name="5º ano")
    assessment = QuizAssessment.objects.get(name="AV2", grade=grade, subject=subject)

    # 1. Create specific topic for cap10 revision sheet
    cap10_topic, _ = QuizTopic.objects.get_or_create(
        name="Exercícios de Revisão do Cap. 10",
        subject=subject,
        grade=grade,
        assessment=assessment
    )

    # 2. Create unique topic for the 3 image sheets
    sheet_topic, _ = QuizTopic.objects.get_or_create(
        name="Exercício de Revisão",
        subject=subject,
        grade=grade,
        assessment=assessment
    )

    # Reassign Q101..Q110 to cap10_topic
    q100s = QuizQuestion.objects.filter(id__gte=101, id__lte=110)
    for q in q100s:
        q.topic = cap10_topic
        q.save()
    print(f"Reassigned {q100s.count()} questions (Q101..Q110) to 'Exercícios de Revisão do Cap. 10'")

    # Ensure Q161..Q170 belong exclusively to sheet_topic 'Exercício de Revisão'
    q160s = QuizQuestion.objects.filter(id__gte=161, id__lte=170)
    for q in q160s:
        q.topic = sheet_topic
        q.save()
    print(f"Verified {q160s.count()} questions (Q161..Q170) belong to 'Exercício de Revisão'")

    # Export clean JSON
    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    reassign()
