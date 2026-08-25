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

def inspect_theo():
    print("=== INSPECTING THEO (3º ANO) QUESTIONS IN SQLITE ===")
    grade3 = QuizGrade.objects.filter(name="3º ano").first()
    if not grade3:
        print("Grade 3º ano not found!")
        return

    questions = QuizQuestion.objects.filter(topic__grade=grade3)
    print(f"Total 3º ano questions: {questions.count()}")
    for q in questions:
        print(f"ID: {q.id} | Topic: {q.topic.name} | Assessment: {q.topic.assessment.name} | Question: {q.question[:60]}...")

if __name__ == "__main__":
    inspect_theo()
