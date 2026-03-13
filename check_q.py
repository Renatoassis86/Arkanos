import os
import sys
import django
from pathlib import Path

# Add project root to path
root = Path(__file__).resolve().parent
sys.path.append(str(root))
# Add backend to path (where settings are)
sys.path.append(str(root / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def check_q():
    q = QuizQuestion.objects.filter(question__icontains="QUAL DESTES É UM CONTINENTE?").first()
    if q:
        print(f"ID: {q.id}")
        print(f"Question: {q.question}")
        print(f"Image URL: '{q.image_url}'")
        print(f"Has Image: {q.has_image}")
    else:
        print("Question not found")

if __name__ == "__main__":
    check_q()
