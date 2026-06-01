import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

for q in QuizQuestion.objects.all()[:10]:
    subj = q.topic.subject.name if q.topic and q.topic.subject else "No Subject"
    print(f"ID: {q.id} | Subject: {subj} | Question: {q.question[:40]}...")
