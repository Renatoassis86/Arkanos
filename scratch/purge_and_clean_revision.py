import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizSubject, QuizGrade, QuizAssessment, QuizTopic, QuizQuestion
)

def purge_and_rebuild_revision():
    print("=== PURGING AND REBUILDING EXCLUSIVELY THE 10 REVISION QUESTIONS ===")

    subject, _ = QuizSubject.objects.get_or_create(name="História")
    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    assessment, _ = QuizAssessment.objects.get_or_create(name="AV2", grade=grade, subject=subject)

    # 1. Delete ALL old topics containing 'Revisão'
    old_topics = QuizTopic.objects.filter(name__icontains="Revisão")
    for t in old_topics:
        # Delete questions associated with old revision topics except our target 10
        q_count = QuizQuestion.objects.filter(topic=t).count()
        print(f"Deleting topic '{t.name}' with {q_count} questions...")
        QuizQuestion.objects.filter(topic=t).delete()
        t.delete()

    # 2. Create clean topic 'Exercício de Revisão'
    topic = QuizTopic.objects.create(
        name="Exercício de Revisão",
        subject=subject,
        grade=grade,
        assessment=assessment
    )

    # 3. The 10 EXACT clean questions from the 3 images (No 'Na folha de revisão' text)
    questions_10 = [
        {
            "question": "Quais são as duas principais formas de resistência negra durante a escravidão?",
            "answer": "Formas de desobediência e fuga, como destruição dos materiais de trabalho, revolta e a formação de quilombos.",
            "distractors": [
                "Acordos diplomáticos com a Coroa Portuguesa e pagamento de impostos.",
                "Trabalho voluntário aos domingos e conversão ao catolicismo.",
                "Fuga para a Europa e petições enviadas ao Rei de Portugal."
            ],
            "explanation": "As principais formas de resistência negra durante a escravidão eram a desobediência e a fuga, que incluíam a destruição dos materiais de trabalho, revoltas e a formação de quilombos.",
            "cronica": "O Guardião Aion recorda: a liberdade não foi presente concedido, mas chama acesa no coração daqueles que resistiram nos vales e florestas do Brasil Colônia."
        },
        {
            "question": "Quem foram Zumbi e Dandara dos Palmares e qual seu papel no Quilombo dos Palmares?",
            "answer": "Líderes do Quilombo dos Palmares que lutaram contra a escravidão e a libertação dos negros. Zumbi foi o último líder e Dandara foi a esposa guerreira que lutou no Quilombo.",
            "distractors": [
                "Governadores portugueses nomeados para administrar a Capitania de Pernambuco.",
                "Comerciantes holandeses que compravam açúcar no Recife.",
                "Padres jesuítas responsáveis pela fundação das primeiras escolas de Olinda."
            ],
            "explanation": "Zumbi e Dandara foram líderes heroicos do Quilombo dos Palmares. Zumbi foi o último grande líder e Dandara uma guerreira fundamental na defesa do quilombo.",
            "cronica": "Aion contempla Palmares: na Serra da Barriga, os nomes de Zumbi e Dandara ecoam como símbolos eternos de coragem e dignidade."
        },
        {
            "question": "O que era o massapê e por que ele era importante para a produção de açúcar?",
            "answer": "É o solo fértil propício para a plantação e cultivo de cana-de-açúcar.",
            "distractors": [
                "Um tipo de ferramenta de ferro usada para moer a cana no engenho.",
                "A casa onde os escravizados dormiam após a colheita.",
                "Um navio negreiro que transportava africanos até o litoral."
            ],
            "explanation": "O massapê é o solo escuro, argiloso e extremamente fértil do litoral nordestino, essencial para a plantação e cultivo da cana-de-açúcar.",
            "cronica": "Sobre a terra escura do Nordeste, Aion viu erguerem-se os canaviais que moldaram a economia e a história do Brasil açucareiro."
        },
        {
            "question": "O que eram os quilombos?",
            "answer": "Comunidade fundada por escravizados fugidos que oferecia um refúgio seguro e preservava as tradições africanas.",
            "distractors": [
                "Fortes militares construídos pelos portugueses para defender o litoral contra piratas.",
                "Feiras livres onde o açúcar era vendido aos comerciantes europeus.",
                "Grandes galpões usados para armazenar ferramentas e sacos de açúcar."
            ],
            "explanation": "Os quilombos eram comunidades autônomas formadas por escravizados que fugiam dos engenhos, funcionando como centros de refúgio, resistência e preservação cultural.",
            "cronica": "Dentro dos quilombos, o som dos tambores e o cultivo da terra mantinham viva a chama das raízes africanas no solo brasileiro."
        },
        {
            "question": "Quais os seis principais elementos que compunham a instalação de um engenho de açúcar?",
            "answer": "Casa-Grande, Senzala, Moenda, Fornalha, Casa de Purgar, Capela.",
            "distractors": [
                "Prefeitura, Hospital, Quartel, Mercado, Teatro, Praça.",
                "Porto, Navio, Farol, Armazém, Banco, Correio.",
                "Senzala, Biblioteca, Cinema, Garagem, Moenda, Fábrica."
            ],
            "explanation": "O engenho açucareiro era um complexo produtivo formado por Casa-Grande, Senzala, Moenda, Fornalha, Casa de Purgar e Capela.",
            "cronica": "Aion observa a estrutura do engenho: um micro-mundo colonial de trabalho árduo, fé e forte hierarquia social."
        },
        {
            "question": "O que era o tráfico transatlântico de escravizados?",
            "answer": "Foi o transporte forçado de africanos para as Américas para serem escravizados.",
            "distractors": [
                "Um acordo comercial pacífico de troca de mercadorias entre reis da Europa.",
                "A migração voluntária de trabalhadores europeus para o Brasil.",
                "Uma rota de turismo marítimo entre a África e a Ásia no século XVI."
            ],
            "explanation": "O tráfico transatlântico foi o transporte forçado de seres humanos trazidos da África para as Américas em navios negreiros.",
            "cronica": "Aion recorda com tristeza as águas do Atlântico, testemunhas da dor de milhões de almas arrancadas de sua terra natal."
        },
        {
            "question": "Como era a vida das pessoas escravizadas nos engenhos e quais trabalhos elas realizavam?",
            "answer": "Trabalhavam por longas horas, realizando tarefas como o plantio e colheita da cana, moagem, purificação do açúcar e serviços domésticos.",
            "distractors": [
                "Tinham jornadas de 4 horas diárias e recebiam salários em moedas de ouro.",
                "Trabalhavam apenas como administradores e contadores do senhor de engenho.",
                "Dedicavam-se exclusivamente à pintura de quadros e construção de igrejas."
            ],
            "explanation": "As pessoas escravizadas enfrentavam longas horas de trabalho exaustivo, atuando no plantio e colheita da cana, moagem, purificação do açúcar e tarefas domésticas.",
            "cronica": "Do romper da alvorada até a noite alta, a força e o suor dos escravizados ergueram as riquezas do Brasil Colônia."
        },
        {
            "question": "O que era a Casa-Grande e a Senzala e qual a diferença entre elas?",
            "answer": "A Casa-Grande era a residência do senhor de engenho e sua família, simbolizando o poder. A Senzala era a moradia precária dos escravizados, sem conforto e superlotada.",
            "distractors": [
                "A Casa-Grande era onde se guardava o açúcar e a Senzala era a igreja do engenho.",
                "A Casa-Grande era a moradia dos escravizados domésticos e a Senzala era o forte militar.",
                "Ambas eram habitações idênticas distribuídas igualmente entre os moradores do engenho."
            ],
            "explanation": "A Casa-Grande era a moradia confortável do senhor de engenho e sua família, enquanto a Senzala era a habitação precária e superlotada das pessoas escravizadas.",
            "cronica": "Em dois espaços tão próximos e opostos, Aion contempla o retrato marcante da desigualdade do período açucareiro."
        },
        {
            "question": "O que significa dizer que o Brasil tinha uma sociedade patriarcal?",
            "answer": "Significava que o pai/homem era a autoridade máxima da família e da sociedade.",
            "distractors": [
                "Significava que as mulheres e os filhos tomavam todas as decisões políticas.",
                "Significava que a sociedade era governada por conselhos de jovens estudantes.",
                "Significava que não havia líderes e todos tinham o mesmo poder de voto."
            ],
            "explanation": "Dizer que o Brasil tinha uma sociedade patriarcal significava que a figura masculina (o pai/homem) concentrava a autoridade máxima na família e na sociedade.",
            "cronica": "Na casa patriarcal colonial, a palavra do senhor de engenho era a lei suprema sobre toda a sua família e servos."
        },
        {
            "question": "O que era o trabalho dos indígenas no processo de catequização e por que ele era importante para os jesuítas?",
            "answer": "O trabalho no processo de catequização era impor a cultura e religião católica aos indígenas, tornando-os submissos.",
            "distractors": [
                "Era ensinar os padres jesuítas a navegar pelos rios da Amazônia sem mapa.",
                "Era construir fábricas de navios na Europa para a Marinha de Portugal.",
                "Era organizar torneios esportivos entre tribos rivais no litoral."
            ],
            "explanation": "A catequização jesuítica buscava impor a fé católica e a cultura europeia aos indígenas, visando torná-los submissos à ordem colonial.",
            "cronica": "Nas missões e aldeamentos, a fé e os costumes europeus transformaram o modo de vida milenar dos povos originários."
        }
    ]

    for item in questions_10:
        options = [item["answer"]] + item["distractors"]
        QuizQuestion.objects.create(
            topic=topic,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=options,
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    print("Successfully created EXACTLY 10 clean revision questions under 'Exercício de Revisão'!")

    # Export json
    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    purge_and_rebuild_revision()
