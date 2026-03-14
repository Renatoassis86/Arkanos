import os
import sys
import django
from pathlib import Path

# Add project root to path
root = Path(__file__).resolve().parent
sys.path.append(str(root))
sys.path.append(str(root / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

# Keyword mapping for images
IMAGE_KEYWORDS = {
    'geo_africa_mundi.png': ['africa', 'africano'],
    'geo_america_sul_mundi.png': ['america do sul', 'sul-americano', 'brasil', 'argentina', 'chile', 'peru', 'colombia', 'venezuela', 'equador', 'paraguai', 'uruguai', 'bolivia'],
    'geo_antartica_mundi.png': ['antartida', 'antartica', 'gelo', 'polo sul'],
    'geo_asia_mundi.png': ['asia', 'asiatico', 'china', 'japao', 'india'],
    'geo_bussola.png': ['bussola', 'orientacao', 'norte', 'sul', 'leste', 'oeste'],
    'geo_camadas_atmosfera.png': ['atmosfera', 'camadas da atmosfera', 'troposfera', 'estratosfera'],
    'geo_camadas_terra.png': ['camadas da terra', 'crosta', 'manto', 'nucleo'],
    'geo_continentes.png': ['continentes', 'terras emersas'],
    'geo_globo.png': ['globo terrestre', 'planeta terra', 'esferico'],
    'geo_globo_equador.png': ['equador', 'linha do equador', 'hemisferio'],
    'geo_globo_imaginarias.png': ['linhas imaginarias', 'paralelos', 'meridianos'],
    'geo_globo_meridiano.png': ['meridiano', 'greenwich'],
    'geo_japao_asia.png': ['japao', 'japão', 'toquio', 'arquipelago'],
    'geo_mapa_argentina_baires.png': ['argentina', 'buenos aires'],
    'geo_mapa_bolivia_lapaz.png': ['bolivia', 'la paz'],
    'geo_mapa_chile_santiago.png': ['chile', 'santiago'],
    'geo_oceanos.png': ['oceanos', 'mares', 'pacifico', 'atlantico', 'indico'],
    'geo_rosa_ventos.png': ['rosa dos ventos', 'pontos cardeais'],
    'geo_rotacao_terra.png': ['rotacao', 'dia e noite', 'eixo da terra'],
    'geo_sol_nascendo.png': ['sol nascendo', 'amanhecer', 'leste', 'oriente'],
    'geo_sol_poente.png': ['sol se pondo', 'anoitecer', 'oeste', 'ocidente'],
    'geo_translacao_terra.png': ['translacao', 'estacoes do ano', 'orbitando o sol'],
    'mat_abaco_base.png': ['abaco', 'calcular', 'contagem'],
    'mat_barraca_feira.png': ['feira', 'mercado', 'barraca', 'compras', 'preco', 'custo'],
    'mat_material_dourado.png': ['material dourado', 'cubinhos', 'placas', 'barras'],
    'mat_qvl_base.png': ['qvl', 'quadro de valor e lugar', 'unidades', 'dezenas', 'centenas']
}

def verify_mismatches():
    qs = QuizQuestion.objects.filter(has_image=True)
    mismatches = []
    
    for q in qs:
        image_url = q.image_url or ""
        filename = os.path.basename(image_url)
        
        if filename not in IMAGE_KEYWORDS:
            continue
            
        keywords = IMAGE_KEYWORDS[filename]
        question_text = (q.question or "").lower()
        prompt_text = (q.image_prompt or "").lower()
        
        # Check if ANY keyword is in the question or prompt
        match_found = False
        for kw in keywords:
            if kw in question_text or kw in prompt_text:
                match_found = True
                break
        
        if not match_found:
            mismatches.append({
                'id': q.id,
                'question': q.question[:100],
                'image': filename,
                'keywords': keywords
            })
            print(f"Mismatch found in Q {q.id}:")
            print(f"  Question: {q.question[:100]}...")
            print(f"  Assigned Image: {filename}")
            print(f"  Expected Keywords: {keywords}")
            print("-" * 30)

    print(f"\nTotal potential mismatches identified: {len(mismatches)}")
    
    # Write report to markdown for preview
    with open('mismatch_report.md', 'w', encoding='utf-8') as f:
        f.write("# Relatório de Inconsistência de Imagens\n\n")
        f.write("| ID | Pergunta (Início) | Imagem Atual | Motivo da Inconsistência |\n")
        f.write("|----|-------------------|--------------|--------------------------|\n")
        for m in mismatches:
            f.write(f"| {m['id']} | {m['question']}... | `{m['image']}` | Nenhum termo de {m['keywords']} encontrado |\n")

    return mismatches

if __name__ == "__main__":
    verify_mismatches()
