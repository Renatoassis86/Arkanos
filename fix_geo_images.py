from desafio_dos_sabios.models import QuizQuestion

mapping = {
    'GEO5_VISUAL_001': 'geo_asia_mundi.png',
    'GEO5_VISUAL_002': 'geo_rosa_ventos.png',
    'GEO5_VISUAL_003': 'geo_rosa_ventos.png',
    'GEO5_VISUAL_004': 'geo_rosa_ventos.png',
    'GEO5_VISUAL_005': 'geo_globo_equador.png',
    'GEO5_VISUAL_006': 'geo_globo_meridiano.png',
    'GEO5_VISUAL_007': 'geo_globo_equador.png',
    'GEO5_VISUAL_008': 'geo_globo_meridiano.png',
    'GEO5_VISUAL_009': 'geo_america_sul_mundi.png',
    'GEO5_VISUAL_010': 'geo_mapa_argentina_baires.png',
    'GEO5_VISUAL_011': 'geo_mapa_chile_santiago.png',
    'GEO5_VISUAL_012': 'geo_mapa_chile_santiago.png',
    'GEO5_VISUAL_015': 'geo_camadas_terra.png',
    'GEO5_VISUAL_016': 'geo_camadas_terra.png',
    'GEO5_VISUAL_017': 'geo_camadas_terra.png',
    'GEO5_VISUAL_018': 'geo_rotacao_terra.png',
    'GEO5_VISUAL_019': 'geo_translacao_terra.png',
    'GEO5_VISUAL_021': 'geo_camadas_atmosfera.png',
    'GEO5_VISUAL_022': 'geo_camadas_atmosfera.png',
    'GEO5_VISUAL_023': 'geo_mapa_bolivia_lapaz.png',
    'GEO5_VISUAL_024': 'geo_mapa_bolivia_lapaz.png',
    'GEO5_VISUAL_029': 'geo_america_sul_mundi.png',
    'GEO5_VISUAL_030': 'geo_america_sul_mundi.png'
}

qs = QuizQuestion.objects.filter(has_image=True, topic__subject__name='Geografia')
print(f"Checking {qs.count()} questions...")

updated = 0
for q in qs:
    orig_id = q.metadata_json.get('id_original')
    if orig_id in mapping:
        img_name = mapping[orig_id]
        q.image_url = f"/static/img/quiz/{img_name}"
        q.save()
        print(f"Updated {orig_id} -> {img_name}")
        updated += 1

print(f"Total updated: {updated}")
