import os
import sys
import django
from pathlib import Path

# Add project root to path
root = Path(__file__).resolve().parent
sys.path.append(str(root))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

MAPPING = [
    ("continentes", "/static/img/quiz/geo_continentes.png"),
    ("oceanos", "/static/img/quiz/geo_oceanos.png"),
    ("rosa dos ventos", "/static/img/quiz/geo_rosa_ventos.png"),
    ("QVL", "/static/img/quiz/mat_qvl_base.png"),
    ("Quadro valor de lugar", "/static/img/quiz/mat_qvl_base.png"),
    ("Ábaco", "/static/img/quiz/mat_abaco_base.png"),
    ("Equador", "/static/img/quiz/geo_globo_imaginarias.png"),
    ("Meridiano", "/static/img/quiz/geo_globo_imaginarias.png"),
    ("barraca de feira", "/static/img/quiz/mat_barraca_feira.png"),
    ("nascer do sol", "/static/img/quiz/geo_rosa_ventos.png"),
]

def update_images():
    updated = 0
    questions = QuizQuestion.objects.filter(has_image=True)
    
    for q in questions:
        prompt = (q.image_prompt or "").lower()
        question_text = q.question.lower()
        
        found_url = None
        for key, url in MAPPING:
            if key.lower() in prompt or key.lower() in question_text:
                found_url = url
                break
        
        if found_url:
            q.image_url = found_url
            q.save()
            updated += 1
            print(f"Updated {q.id} with {found_url}")

    print(f"Total updated: {updated}")

if __name__ == "__main__":
    update_images()
