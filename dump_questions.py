import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

with open('questions_dump.txt', 'w', encoding='utf-8') as f:
    for q in QuizQuestion.objects.all():
        f.write(f"ID: {q.id} | Subject: {q.topic.subject.name} | has_image: {q.has_image} | type: {q.type} | Q: {q.question}\n")
print("Dumped questions to questions_dump.txt")
