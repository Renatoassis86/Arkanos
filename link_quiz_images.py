import os
import django
import shutil

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

# Folders Setup
BASE_STATIC_DIR = os.path.join('backend', 'static', 'img', 'quiz')
LINKED_STATIC_DIR = os.path.join('backend', 'static', 'img', 'quiz_linked')
os.makedirs(LINKED_STATIC_DIR, exist_ok=True)

MAPPING_RULES = [
    # Geography Rules
    (['antártida', 'polo sul'], 'geo_antartica_mundi.png'),
    (['america do sul', 'américa do sul', 'brasil', 'argentina', 'chile', 'paraguai', 'uruguai', 'venezuela', 'colômbia', 'equador', 'peru', 'bolívia'], 'geo_america_sul_mundi.png'),
    (['áfrica', 'deserto do saara'], 'geo_africa_mundi.png'),
    (['ásia', 'japão', 'china', 'índia'], 'geo_asia_mundi.png'),
    (['oceano', 'pacífico', 'atlântico', 'índico'], 'geo_oceanos.png'),
    (['hemisfério', 'linha do equador', 'meridiano', 'paralelos', 'linhas imag'], 'geo_globo_imaginarias.png'),
    (['equador', 'globo'], 'geo_globo_equador.png'),
    (['atmosfera', 'camadas da terra'], 'geo_camadas_atmosfera.png'),
    (['crosta', 'manto', 'núcleo'], 'geo_camadas_terra.png'),
    (['bússola', 'norte', 'sul', 'leste', 'oeste'], 'geo_bussola.png'),
    (['rosa dos ventos', 'pontos cardeais'], 'geo_rosa_ventos.png'),
    (['rotação', 'dia e noite'], 'geo_rotacao_terra.png'),
    (['translação', 'estações do ano'], 'geo_translacao_terra.png'),
    (['sol nascendo', 'madrugada', 'amanhecer'], 'geo_sol_nascendo.png'),
    (['sol poente', 'tarde', 'crepúsculo'], 'geo_sol_poente.png'),
    (['continente'], 'geo_continentes.png'),

    # Math Rules
    (['ábaco', 'bolinhas', 'contar'], 'mat_abaco_base.png'),
    (['material dourado', 'cubinhos', 'placa', 'barra'], 'mat_material_dourado.png'),
    (['qvl', 'quadro de valor', 'unidade', 'dezena', 'centena'], 'mat_qvl_base.png'),
    (['feira', 'preço', 'comprar', 'troco'], 'mat_barraca_feira.png')
]

from django.db import transaction

questions = QuizQuestion.objects.all()
updated_count = 0

with transaction.atomic():
    for q in questions:
        q_lower = q.question.lower()
        matched_image = None
        
        for keywords, img_name in MAPPING_RULES:
            if any(keyword in q_lower for keyword in keywords):
                matched_image = img_name
                break
                
        if matched_image:
            # Safe Direct Relative Reference instead of file duplication for speed
            q.has_image = True
            q.image_mode = 'uploaded_asset'
            q.image_url = f"/static/img/quiz/{matched_image}"
            q.save()
            updated_count += 1

print(f"Directly mapped {updated_count} questions successfully.")



