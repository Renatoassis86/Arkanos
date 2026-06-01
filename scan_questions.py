import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

print("Total Questions:", QuizQuestion.objects.count())

subjects = ['geografia', 'matematica']
for sub in subjects:
    q_all = QuizQuestion.objects.filter(topic__subject__name=sub)
    print(f"\n[{sub.upper()}] Total Questions: {q_all.count()}")
    for q in q_all[:5]:  # Just first 5 for preview
        print(f"ID: {q.id} | Has Image: {q.has_image} | Image URL: {q.image_url} | Q: {q.question[:40]}...")
