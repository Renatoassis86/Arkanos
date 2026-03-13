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

def fix_images():
    mapping = {
        'geo_oceanos.png': ['oceano', 'oceanos', 'atlântico', 'pacífico', 'índico', 'ártico', 'antártico'],
        'geo_continentes.png': ['continente', 'europa', 'ásia', 'áfrica', 'américa', 'oceania', 'antártida'],
        'geo_rosa_ventos.png': ['rosa dos ventos', 'pontos cardeais', 'norte', 'sul', 'leste', 'oeste'],
        'geo_globo_imaginarias.png': ['paralelos', 'meridianos', 'latitude', 'longitude', 'equador', 'greenwich'],
        'geo_japao_asia.png': ['japão', 'japao'],
        'geo_asia_mundi.png': ['ásia'], # Já coberto por continentes, mas este é específico
        'geo_africa_mundi.png': ['áfrica'],
        'geo_america_sul_mundi.png': ['américa do sul'],
        'geo_bussola.png': ['bússola', 'bussola'],
        'geo_globo_equador.png': ['equador'],
        'geo_globo_meridiano.png': ['meridiano de greenwich'],
        'geo_sol_nascendo.png': ['sol nasce', 'nascer do sol'],
        'geo_sol_poente.png': ['sol se põe', 'pôr do sol'],
        'geo_antartica_mundi.png': ['antártida', 'antartida'],
        'mat_abaco_base.png': ['abaco', 'ábaco'],
        'mat_qvl_base.png': ['qvl', 'quadro de ordens', 'posicional'],
        'mat_barraca_feira.png': ['feira', 'barraca', 'venda', 'comprar', 'preço']
    }
    
    total_updated = 0
    
    # Process each mapping
    for img_name, keywords in mapping.items():
        img_url = f'/static/img/quiz/{img_name}'
        for kw in keywords:
            # Case insensitive search - update all questions matching keyword
            questions = QuizQuestion.objects.filter(question__icontains=kw)
            count = questions.update(image_url=img_url, has_image=True)
            if count > 0:
                print(f"Updated {count} questions for '{kw}' with image '{img_name}'")
                total_updated += count

    print(f"\nTotal questions updated with images: {total_updated}")

if __name__ == "__main__":
    fix_images()
