import os, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

count = 0
print("Questions without maps/images:")
for q in QuizQuestion.objects.filter(has_image=False)[:10]:
    print(f"ID: {q.id} | Subject: {q.topic.subject.name} | Q: {q.question[:60]}")
    count += 1
