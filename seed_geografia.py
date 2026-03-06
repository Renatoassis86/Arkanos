import os
import django
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
import sys
sys.path.append(os.path.dirname(__file__))
django.setup()

from desafio_dos_sabios.models import QuizSubject, QuizTopic, QuizQuestion

def seed():
    print("Starting Geography 5th Grade Seeding...")
    
    # 1. Create Subjects
    subjects_to_create = ["Português", "História", "Geografia", "Matemática", "Ciências"]
    for s_name in subjects_to_create:
        QuizSubject.objects.get_or_create(name=s_name)
    
    geo = QuizSubject.objects.get(name="Geografia")
    
    # 2. Create Topics for Geography
    topics_list = [
        "Continentes", "Oceanos", "Hemisférios", "Rosa dos ventos", "Estrutura da Terra",
        "América do Sul", "Pontos cardeais", "Pontos colaterais", "Hemisférios terrestres",
        "Planeta Terra", "Movimento de rotação", "Movimento de translação", "Camadas da Terra",
        "Camadas da atmosfera", "Argentina", "Chile", "Bolívia", "Uruguai", "Paraguai",
        "Territórios", "Territórios ultramarinos"
    ]
    
    for t_name in topics_list:
        QuizTopic.objects.get_or_create(subject=geo, name=t_name)
    
    print(f"Created {len(topics_list)} topics for Geography.")

    # 3. Insert Questions (User Provided JSON)
    questions_data = [
        {"subject":"Geografia","topic":"Continentes","difficulty":"easy","question":"Qual das opções apresenta apenas continentes?","options":["América, Ásia, África, Europa, Oceania e Antártida","Brasil, Argentina, Chile e Peru","Atlântico, Pacífico, Índico e Ártico","África, Brasil, China e Canadá"],"answer":"América, Ásia, África, Europa, Oceania e Antártida","explanation":"Esses são os continentes reconhecidos pela divisão geográfica mais utilizada."},
        {"subject":"Geografia","topic":"Oceanos","difficulty":"easy","question":"Qual é o maior oceano do planeta Terra?","options":["Oceano Pacífico","Oceano Atlântico","Oceano Índico","Oceano Ártico"],"answer":"Oceano Pacífico","explanation":"O Oceano Pacífico é o maior oceano da Terra."},
        {"subject":"Geografia","topic":"Oceanos","difficulty":"easy","question":"Qual conjunto apresenta corretamente os cinco oceanos?","options":["Pacífico, Atlântico, Índico, Ártico e Antártico","Pacífico, Mediterrâneo, Vermelho e Índico","Atlântico, Caribe, Ártico e Índico","Pacífico, Atlântico e Negro"],"answer":"Pacífico, Atlântico, Índico, Ártico e Antártico","explanation":"Esses são os cinco oceanos que compõem as grandes massas de água da Terra."},
        {"subject":"Geografia","topic":"Hemisférios","difficulty":"medium","question":"Os hemisférios da Terra são divididos por linhas imaginárias. Quais são os hemisférios principais?","options":["Norte, Sul, Oriente e Ocidente","Europa e Ásia","Norte e América","África e Oceania"],"answer":"Norte, Sul, Oriente e Ocidente","explanation":"Esses hemisférios são definidos pelas linhas imaginárias da Terra."},
        {"subject":"Geografia","topic":"Rosa dos ventos","difficulty":"easy","question":"Quais são os quatro pontos cardeais?","options":["Norte, Sul, Leste e Oeste","Norte, Sul, Nordeste e Sudoeste","Leste, Oeste, Sudeste e Noroeste","Norte, Nordeste, Sul e Sudeste"],"answer":"Norte, Sul, Leste e Oeste","explanation":"Esses são os quatro pontos cardeais representados na rosa dos ventos."},
        {"subject":"Geografia","topic":"Rosa dos ventos","difficulty":"medium","question":"Qual das opções apresenta apenas pontos colaterais?","options":["Nordeste, Sudeste, Noroeste e Sudoeste","Norte, Sul, Leste e Oeste","Nordeste, Norte e Sul","Sudeste, Oeste e Norte"],"answer":"Nordeste, Sudeste, Noroeste e Sudoeste","explanation":"Esses são os pontos colaterais da rosa dos ventos."},
        {"subject":"Geografia","topic":"Estrutura da Terra","difficulty":"medium","question":"Qual é a camada mais externa da Terra?","options":["Crosta","Manto","Núcleo externo","Núcleo interno"],"answer":"Crosta","explanation":"A crosta é a camada mais superficial do planeta."},
        {"subject":"Geografia","topic":"Estrutura da Terra","difficulty":"medium","question":"Qual conjunto apresenta corretamente as camadas internas da Terra?","options":["Crosta, manto, núcleo externo e núcleo interno","Crosta, atmosfera e núcleo","Manto, oceanos e núcleo","Crosta, água e magma"],"answer":"Crosta, manto, núcleo externo e núcleo interno","explanation":"Essas são as quatro principais camadas internas do planeta."},
        {"subject":"Geografia","topic":"América do Sul","difficulty":"easy","question":"Qual é a capital da Argentina?","options":["Buenos Aires","Santiago","Lima","Montevidéu"],"answer":"Buenos Aires","explanation":"Buenos Aires é a capital da Argentina."},
        {"subject":"Geografia","topic":"América do Sul","difficulty":"easy","question":"Qual é a capital do Chile?","options":["Santiago","Assunção","La Paz","Montevidéu"],"answer":"Santiago","explanation":"Santiago é a capital do Chile."},
        {"subject":"Geografia","topic":"América do Sul","difficulty":"easy","question":"Qual é a capital do Uruguai?","options":["Montevidéu","Buenos Aires","Lima","Caracas"],"answer":"Montevidéu","explanation":"Montevidéu é a capital do Uruguai."},
        {"subject":"Geografia","topic":"América do Sul","difficulty":"easy","question":"Qual é a capital do Paraguai?","options":["Assunção","Santiago","La Paz","Quito"],"answer":"Assunção","explanation":"Assunção é a capital do Paraguai."},
        {"subject":"Geografia","topic":"América do Sul","difficulty":"medium","question":"Qual país da América do Sul tem como capital La Paz?","options":["Bolívia","Chile","Argentina","Uruguai"],"answer":"Bolívia","explanation":"La Paz é uma das capitais administrativas da Bolívia."}
    ]

    count = 0
    for q in questions_data:
        try:
            topic = QuizTopic.objects.get(subject__name=q['subject'], name=q['topic'])
            QuizQuestion.objects.get_or_create(
                topic=topic,
                question=q['question'],
                options=q['options'],
                answer=q['answer'],
                type="multiple_choice",
                difficulty=q['difficulty'],
                explanation=q['explanation'],
                source="teacher_added"
            )
            count += 1
        except Exception as e:
            print(f"Error seeding question: {e}")

    print(f"Successfully seeded {count} Geography questions.")

if __name__ == "__main__":
    seed()
