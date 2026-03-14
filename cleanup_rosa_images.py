import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

qs = QuizQuestion.objects.filter(topic__assessment__id=1, has_image=True, image_url='/static/img/quiz/geo_rosa_ventos.png')
print(f"Checking {qs.count()} questions with rosa_ventos in Assessment 1...")

count = 0
for q in qs:
    question_text = (q.question or "").lower()
    prompt_text = (q.image_prompt or "").lower()
    
    if 'rosa dos ventos' not in question_text and 'rosa dos ventos' not in prompt_text:
        q.has_image = False
        q.image_mode = 'none'
        q.image_url = None
        q.save()
        count += 1
        print(f"Removed misapplied image from Q {q.id}: {q.question[:40]}")

print(f"Successfully cleaned up {count} questions.")
