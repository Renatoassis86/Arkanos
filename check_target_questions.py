import os
import sys
import django
from pathlib import Path

root = Path(__file__).resolve().parent
sys.path.append(str(root))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion, QuizAssessment

def check_missing_images():
    target_assessments = QuizAssessment.objects.filter(
        name__icontains='AV1',
        # Filter by grade and subject
    )
    
    # We want:
    # Geo 3yr, 5yr
    # Math 3yr
    
    filtered = []
    for a in target_assessments:
        if ('Geografia' in a.subject.name and ('3º Ano' in a.grade.name or '5º Ano' in a.grade.name)) or \
           ('Matemática' in a.subject.name and '3º Ano' in a.grade.name):
            filtered.append(a)
    
    print(f"Checking {len(filtered)} assessments.")
    
    for a in filtered:
        print(f"\n--- Assessment: {a.name} | {a.grade.name} | {a.subject.name} ---")
        qs = QuizQuestion.objects.filter(topic__assessment=a, has_image=True, image_url__isnull=True)
        print(f"Questions with has_image=True but missing image_url: {qs.count()}")
        for q in qs[:10]:
            print(f"  ID: {q.id} | Question: {q.question[:60]} | Prompt: {q.image_prompt}")

if __name__ == "__main__":
    check_missing_images()
