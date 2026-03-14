import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def fix_mismatches():
    print("Iniciando correção de imagens...")
    
    # 1. Antártida (geo_antartica_mundi.png)
    q1 = QuizQuestion.objects.filter(question__icontains='Antártida', has_image=True)
    for q in q1:
        if q.image_url != '/static/img/quiz/geo_antartica_mundi.png':
            print(f"Atualizando ID {q.id}: Antártida")
            q.image_url = '/static/img/quiz/geo_antartica_mundi.png'
            q.save()

    # 2. Brasil / América do Sul (geo_america_sul_mundi.png)
    q2 = QuizQuestion.objects.filter(question__icontains='Brasil', has_image=True)
    for q in q2:
        if 'fronteira' in q.question.lower() or 'uruguai' in q.question.lower():
             if q.image_url != '/static/img/quiz/geo_america_sul_mundi.png':
                print(f"Atualizando ID {q.id}: América do Sul")
                q.image_url = '/static/img/quiz/geo_america_sul_mundi.png'
                q.save()

    # 3. Geologia / Camadas da Terra (geo_camadas_terra.png)
    q3 = QuizQuestion.objects.filter(question__icontains='núcleo', has_image=True)
    for q in q3:
        if 'manto' in q.question.lower() or 'crosta' in q.question.lower():
            if q.image_url != '/static/img/quiz/geo_camadas_terra.png':
                print(f"Atualizando ID {q.id}: Camadas da Terra")
                q.image_url = '/static/img/quiz/geo_camadas_terra.png'
                q.save()

    # 4. Globo Equador (geo_globo_equador.png)
    q4 = QuizQuestion.objects.filter(question__icontains='Equador', has_image=True)
    for q in q4:
        if 'hemisfério' in q.question.lower() or 'paralelos' in q.question.lower():
            if q.image_url != '/static/img/quiz/geo_globo_equador.png':
                print(f"Atualizando ID {q.id}: Globo Equador")
                q.image_url = '/static/img/quiz/geo_globo_equador.png'
                q.save()

    # 5. Remover QVL de matemática genérica (onde não faz sentido)
    # Perguntas que são de comparação (>, <, =) muitas vezes não precisam do QVL se os números forem pequenos ou se a lógica for direta.
    q_math = QuizQuestion.objects.filter(topic__subject__name='matematica', has_image=True, image_url='/static/img/quiz/mat_qvl_base.png')
    for q in q_math:
        if '___' in q.question or 'comparar' in q.question.lower() or 'maior' in q.question.lower():
            print(f"Removendo QVL desnecessário do ID {q.id}")
            q.has_image = False
            q.image_mode = 'none'
            q.image_url = None
            q.save()

    print("Correção concluída.")

if __name__ == "__main__":
    fix_mismatches()
