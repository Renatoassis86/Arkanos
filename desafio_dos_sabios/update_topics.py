import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizTopic, QuizSubject

def update_topics_structure():
    try:
        sub = QuizSubject.objects.get(name='Geografia')
        
        mapping = {
            'Continentes': 'CAPÍTULO 1 - Continentes',
            'Pontos cardeais': 'CAPÍTULO 1 - Pontos Cardeais',
            'Pontos colaterais': 'CAPÍTULO 1 - Pontos Colaterais',
            'Hemisférios terrestres': 'CAPÍTULO 1 - Hemisférios',
            'Argentina': 'CAPÍTULO 2 - Argentina',
            'Chile': 'CAPÍTULO 2 - Chile',
            'Bolívia': 'CAPÍTULO 2 - Bolívia',
            'Uruguai': 'CAPÍTULO 2 - Uruguai',
            'Paraguai': 'CAPÍTULO 2 - Paraguai',
            'Movimento de rotação': 'PLANETA TERRA - Rotação',
            'Movimento de translação': 'PLANETA TERRA - Translação',
            'Camadas da Terra': 'PLANETA TERRA - Camadas da Terra',
            'Camadas da atmosfera': 'PLANETA TERRA - Atmosfera',
            'Territórios': 'TERRITÓRIOS - Conceito de território',
            'Territórios ultramarinos': 'TERRITÓRIOS - Territórios ultramarinos'
        }
        
        for old_name, new_name in mapping.items():
            count = QuizTopic.objects.filter(subject=sub, name=old_name).update(name=new_name)
            if count > 0:
                print(f"Atualizado: {old_name} -> {new_name}")
            else:
                # If it already has the new name or doesn't exist, ignore
                pass
                
        print("Estrutura de tópicos atualizada com sucesso.")
    except QuizSubject.DoesNotExist:
        print("Erro: Disciplina 'Geografia' não encontrada.")

if __name__ == "__main__":
    update_topics_structure()
