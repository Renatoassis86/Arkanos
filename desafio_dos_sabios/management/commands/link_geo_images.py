"""
Management command: link_geo_images
Linca as 17 imagens geradas via Antigravity às questões correspondentes no banco.
"""
from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import QuizQuestion

MAPPING = {
    # GEO3_VISUAL - 3º Ano IDs
    "GEO3_VISUAL_001": "geo_asia_mundi",
    "GEO3_VISUAL_002": "geo_africa_mundi",
    "GEO3_VISUAL_003": "geo_antartica_mundi",
    "GEO3_VISUAL_004": "geo_america_sul_mundi",
    "GEO3_VISUAL_005": "geo_atlantico_mundi",
    "GEO3_VISUAL_006": "geo_pacifico_sul",
    "GEO3_VISUAL_007": "geo_indico_mundi",
    "GEO3_VISUAL_008": "geo_rosa_ventos",
    "GEO3_VISUAL_009": "geo_rosa_ventos_simples",
    "GEO3_VISUAL_010": "geo_sol_nascendo",
    "GEO3_VISUAL_011": "geo_sol_poente",
    "GEO3_VISUAL_012": "geo_bussola",
    "GEO3_VISUAL_013": "geo_asia_mundi",
    "GEO3_VISUAL_014": "geo_japao_asia",
    "GEO3_VISUAL_015": "geo_japao_asia", # Bandeira/Templo pode usar o mapa focado
    "GEO3_VISUAL_016": "geo_globo_equador",
    "GEO3_VISUAL_017": "geo_globo_meridiano",
    "GEO3_VISUAL_018": "geo_globo_equador",
    "GEO3_VISUAL_019": "geo_globo_meridiano",
    
    # GEO5_VISUAL - IDs específicos
    "GEO5_VISUAL_001": "geo_asia_mundi",
    "GEO5_VISUAL_002": "geo_rosa_ventos",
    "GEO5_VISUAL_003": "geo_rosa_ventos", # Nordeste pode usar a rosa completa
    "GEO5_VISUAL_004": "geo_rosa_ventos", # Sudoeste pode usar a rosa completa
    "GEO5_VISUAL_005": "geo_globo_equador",
    "GEO5_VISUAL_006": "geo_globo_meridiano",
    "GEO5_VISUAL_007": "geo_globo_equador",
    "GEO5_VISUAL_008": "geo_globo_meridiano",
    "GEO5_VISUAL_015": "geo_camadas_terra",
    "GEO5_VISUAL_016": "geo_camadas_terra",
    "GEO5_VISUAL_017": "geo_camadas_terra",
    "GEO5_VISUAL_018": "geo_rotacao_terra",
    # Mapeando via Prompt keywords se o ID falhar ou para abranger mais
    "keywords": [
        ("África",            "geo_africa_mundi"),
        ("América do Sul",    "geo_america_sul_mundi"),
        ("Antártica",         "geo_antartica_mundi"),
        ("Atlântico",         "geo_atlantico_mundi"),
        ("Pacífico",          "geo_pacifico_sul"),
        ("Índico",            "geo_indico_mundi"),
        ("Japão",             "geo_japao_asia"),
        ("rosa dos ventos",   "geo_rosa_ventos"),
        ("bússola",           "geo_bussola"),
        ("sol nascendo",      "geo_sol_nascendo"),
        ("sol poente",        "geo_sol_poente"),
    ]
}

class Command(BaseCommand):
    help = "Mapeia as imagens estáticas para as questões do Quiz."

    def handle(self, *args, **options):
        # 1. Busca todos os geo_*.png no diretório (já sabemos os nomes)
        # 2. Varre as questões que têm metadata_json__id_original ou image_prompt
        
        updated = 0
        qs = QuizQuestion.objects.filter(has_image=True)
        
        for q in qs:
            orig_id = q.metadata_json.get("id_original", "")
            prompt  = q.image_prompt.lower() if q.image_prompt else ""
            found_img = None

            # Check direct ID mapping
            if orig_id in MAPPING:
                found_img = MAPPING[orig_id]
            
            # Check keyword mapping
            if not found_img:
                for kw, img_name in MAPPING["keywords"]:
                    if kw.lower() in prompt:
                        found_img = img_name
                        break
            
            if found_img:
                # Localizamos o arquivo (pegamos o mais recente se houver múltiplos, ou o base)
                # Neste caso, movemos com nomes fixos ou padrões. 
                # O agent moveu arquivos mantendo os timestamps do brain?
                # Vamos assumir o padrão arkanos/img/quiz/{found_img}_*.png ou apenas arkanos/img/quiz/{found_img}.png
                # Como movemos geo_*.png, vou precisar ajustar os nomes no static para fixos sem timestamp se possível.
                
                # Para simplificar este script, vou apenas usar uma URL fixa que o desenvolvedor deve garantir.
                # MAS, como os arquivos têm timestamps, vou usar um "starts_with" no view logic ou fixá-los aqui?
                # Melhors: vou renomear os arquivos no static para nomes fixos via shell.
                
                q.image_url = f"/static/arkanos/img/quiz/{found_img}.png"
                q.save()
                updated += 1
                self.stdout.write(f"✓ {orig_id} -> {found_img}.png")

        self.stdout.write(self.style.SUCCESS(f"Total atualizado: {updated}"))
