import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

MAPPING_RULES = [
    # Geography
    ('antártida', 'geo_antartica_mundi.png'),
    ('américa do sul', 'geo_america_sul_mundi.png'),
    ('sul', 'geo_america_sul_mundi.png'),
    ('brasil', 'geo_america_sul_mundi.png'),
    ('áfrica', 'geo_africa_mundi.png'),
    ('ásia', 'geo_asia_mundi.png'),
    ('oceano', 'geo_oceanos.png'),
    ('mar', 'geo_oceanos.png'),
    ('hemisfério', 'geo_globo_imaginarias.png'),
    ('paralelos', 'geo_globo_imaginarias.png'),
    ('coordenadas', 'geo_globo_imaginarias.png'),
    ('linha do equador', 'geo_globo_equador.png'),
    ('equador', 'geo_globo_equador.png'),
    ('globo', 'geo_globo_equador.png'),
    ('atmosfera', 'geo_camadas_atmosfera.png'),
    ('ar', 'geo_camadas_atmosfera.png'),
    ('camadas', 'geo_camadas_terra.png'),
    ('crosta', 'geo_camadas_terra.png'),
    ('núcleo', 'geo_camadas_terra.png'),
    ('manto', 'geo_camadas_terra.png'),
    ('bússola', 'geo_bussola.png'),
    ('instrumento', 'geo_bussola.png'),
    ('orientação', 'geo_rosa_ventos.png'),
    ('rosa dos ventos', 'geo_rosa_ventos.png'),
    ('pontos', 'geo_rosa_ventos.png'),
    ('cardeais', 'geo_rosa_ventos.png'),
    ('colaterais', 'geo_rosa_ventos.png'),
    ('direção', 'geo_rosa_ventos.png'),
    ('rotação', 'geo_rotacao_terra.png'),
    ('sol', 'geo_sol_nascendo.png'),
    ('translação', 'geo_translacao_terra.png'),
    ('estações', 'geo_translacao_terra.png'),
    ('continente', 'geo_continentes.png'),
    ('mapa', 'geo_america_sul_mundi.png'),
    ('capital', 'geo_america_sul_mundi.png'),

    # Math fallback
    ('ábaco', 'mat_abaco_base.png'),
    ('material dourado', 'mat_material_dourado.png'),
    ('qvl', 'mat_qvl_base.png'),
    ('quadro de valor', 'mat_qvl_base.png'),
    ('dezena', 'mat_qvl_base.png'),
    ('unidade', 'mat_qvl_base.png'),
    ('centena', 'mat_qvl_base.png'),
    ('algarismo', 'mat_qvl_base.png'),
    ('feira', 'mat_barraca_feira.png'),
    ('comprar', 'mat_barraca_feira.png'),
    ('preço', 'mat_barraca_feira.png'),
    ('valor', 'mat_barraca_feira.png')
]

print("Iniciando Refined Bulk Update...")

total_matches = 0
for term, img_name in MAPPING_RULES:
    updated = QuizQuestion.objects.filter(question__icontains=term).update(
        has_image=True, 
        image_mode='uploaded_asset',
        image_url=f"/static/img/quiz/{img_name}"
    )
    if updated > 0:
        print(f"[{term.upper()}] Vinculado -> {img_name} ({updated} questões)")
        total_matches += updated

print(f"\nBulk Update concluído! {total_matches} vinculações realizadas.")
