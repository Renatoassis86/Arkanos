import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizSubject, QuizGrade, QuizAssessment, QuizTopic, QuizQuestion
)

def wipe_theo():
    print("=== WIPING ALL 3RD GRADE (THEO) QUESTIONS FROM SQLITE AND JSON ===")

    grade3 = QuizGrade.objects.filter(name="3º ano").first()
    if grade3:
        topics = QuizTopic.objects.filter(grade=grade3)
        count_q = QuizQuestion.objects.filter(topic__in=topics).count()
        topics.delete()
        print(f"Deleted {count_q} questions and all topics for 3º ano (Theo).")
    else:
        print("Grade 3º ano not found.")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    wipe_theo()
