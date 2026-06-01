import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizSubject, QuizQuestion, QuizQuestionGenerated, QuizQuestionVerified

print("Subjects in DB across all tables:")
for s in QuizSubject.objects.all():
    c1 = QuizQuestion.objects.filter(topic__subject=s).count()
    c2 = QuizQuestionGenerated.objects.filter(topic__subject=s).count()
    c3 = QuizQuestionVerified.objects.filter(topic__subject=s).count()
    print(f"- {s.name} (Q: {c1}, Gen: {c2}, Ver: {c3})")
