import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizSubject, QuizQuestion

print("Subjects in DB:")
for s in QuizSubject.objects.all():
    count = QuizQuestion.objects.filter(topic__subject=s).count()
    print(f"- {s.name} (Questions: {count})")
