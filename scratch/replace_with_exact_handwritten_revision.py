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

def build_exact_revision():
    print("=== SEEDING VERBATIM EXACT 10 REVISION QUESTIONS & ANSWERS FROM IMAGES ===")

    subject, _ = QuizSubject.objects.get_or_create(name="História")
    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    assessment, _ = QuizAssessment.objects.get_or_create(name="AV2", grade=grade, subject=subject)

    # Clean old revision topics
    QuizTopic.objects.filter(name__icontains="Revisão").delete()

    # Create official topic
    topic = QuizTopic.objects.create(
        name="Exercício de Revisão",
        subject=subject,
        grade=grade,
        assessment=assessment
    )

    exact_data = [
        {
            "question": "No início do século XIX, Portugal mantinha uma importante relação comercial com a Inglaterra. Ao mesmo tempo, Napoleão Bonaparte aumentava seu domínio sobre vários países da Europa. Explique por que essa situação trouxe problemas para Portugal.",
            "answer": "Portugal era aliada da Inglaterra e com o bloqueio continental, Napoleão Bonaparte impediu os países da Europa de ter relação com a Inglaterra. Assim, a França invadiu Portugal.",
            "distractors": [
                "Portugal decidiu declarar guerra contra a Espanha e perdeu todo o seu exército na Europa.",
                "A Inglaterra cortou todas as rotas de comércio com Portugal por falta de pagamento de dívidas.",
                "Napoleão ofereceu o trono português ao Rei da Prússia sem o conhecimento da Inglaterra."
            ],
            "explanation": "Como Portugal era aliado da Inglaterra, o Bloqueio Continental decretado por Napoleão proibiu o comércio com os ingleses, levando a França a invadir o território português.",
            "cronica": "O Guardião Aion recorda: as pressões diplomáticas na Europa napoleônica forçaram a decisão que mudaria para sempre o destino do Brasil."
        },
        {
            "question": "A chegada da Família Real ao Brasil, em 1808, trouxe mudanças para a colônia, principalmente para o Rio de Janeiro. Explique como a presença da Corte portuguesa ajudou a transformar o Brasil nesse período.",
            "answer": "Muitas inovações e mudanças ocorreram, à exemplo da criação da faculdade de medicina, do primeiro jornal e do Banco do Brasil.",
            "distractors": [
                "A Corte proibiu o comércio de mercadorias estrangeiras e fechou todos os portos coloniais.",
                "O Rio de Janeiro foi abandonado e a capital foi transferida imediatamente para Manaus.",
                "Todas as escolas e igrejas foram fechadas para cortar despesas da família real."
            ],
            "explanation": "A instalação da Corte no Rio de Janeiro impulsionou a criação da Faculdade de Medicina, da Imprensa Régia (primeiro jornal) e do Banco do Brasil.",
            "cronica": "Aion contempla a transformação: de colônia restrita a sede do Reino Unido de Portugal, o Brasil floresceu em instituições e cultura."
        },
        {
            "question": "Durante a colonização, muitos africanos foram retirados de suas terras e vendidos como pessoas escravizadas. Eles pertenciam a diferentes povos e possuíam seus próprios costumes e tradições. Explique como muitos africanos se tornavam escravizados antes de serem vendidos aos comerciantes portugueses.",
            "answer": "Existiam conflitos entre tribos no continente africano e as pessoas que perdiam nestes conflitos acabavam sendo escravizadas e vendidas aos comerciantes portugueses.",
            "distractors": [
                "Os africanos viajavam voluntariamente para a Europa onde assinavam contratos de trabalho agrícola.",
                "Havia uma eleição anual promovida pelos governadores portugueses nas aldeias de Angola.",
                "Todos os africanos eram marinheiros contratados pelas companhias comerciais francesas."
            ],
            "explanation": "Guerras e conflitos entre diferentes reinos e tribos na África geravam prisioneiros de guerra, que eram posteriormente negociados com comerciantes europeus.",
            "cronica": "Aion observa com pesar como as divisões e rivalidades no continente africano foram exploradas pelo comércio colonial."
        },
        {
            "question": "Em 1807, a Família Real Portuguesa precisou deixar Portugal às pressas e realizar uma longa viagem até o Brasil. Explique o que estava acontecendo em Portugal e como foi realizada a viagem da Família Real até o Brasil.",
            "answer": "As tropas de Napoleão estavam invadindo Portugal e a família real portuguesa estava fugindo às pressas para o Brasil. A viagem foi longa e difícil.",
            "distractors": [
                "D. João viajou pacificamente em um passeio de férias com apoio das tropas francesas.",
                "A viagem durou apenas dois dias graças ao uso de navios a vapor modernos de última geração.",
                "A família real viajou por terra cruzando o oceano Atlântico a cavalo."
            ],
            "explanation": "A ameaça iminente da invasão francesa fez com que a Família Real embarcasse às pressas sob proteção britânica, enfrentando uma travessia exaustiva pelo Atlântico.",
            "cronica": "Sob tempestades e incertezas no oceano, a frota portuguesa cruzou o mar trazendo a coroa para o solo americano."
        },
        {
            "question": "Durante o período colonial, a produção de açúcar se tornou uma importante atividade econômica no Brasil. Grandes propriedades foram organizadas para realizar essa produção. Explique por que o açúcar era importante para os portugueses e como os engenhos participavam dessa atividade.",
            "answer": "Os engenhos foram criados para produzir o açúcar. O açúcar era um produto muito rentável na Europa, por isso os portugueses o fabricavam no Brasil.",
            "distractors": [
                "O açúcar era usado exclusivamente para alimentar os cavalos do exército em Portugal.",
                "Os engenhos serviam apenas como postos de correio entre Recife e Salvador.",
                "O açúcar não tinha valor econômico e era distribuído gratuitamente nas feiras da Europa."
            ],
            "explanation": "Conhecido como 'ouro branco', o açúcar alcançava altíssimos preços no mercado europeu, tornando os engenhos estruturas centrais da economia colonial.",
            "cronica": "Aion vê a doçura do produto alimentar grandes fortunas na Europa, custando o esforço de milhares no Brasil."
        },
        {
            "question": "Um engenho de açúcar possuía vários espaços e construções. Alguns eram usados para produzir açúcar, enquanto outros serviam de moradia ou para atividades religiosas. Escolha três espaços de um engenho e explique para que cada um deles era utilizado.",
            "answer": "Senzala: era o local onde os escravizados dormiam e descansavam. Casa Grande: era a moradia do senhor de engenho e sua família. Casa de Purgar: era o local onde o melaço da cana era resfriado, endurecido e quebrado.",
            "distractors": [
                "Senzala: escola dos filhos do senhor; Casa Grande: estábulo dos cavalos; Moenda: hospital da vila.",
                "Casa de Purgar: igreja principal; Senzala: tribunal da cidade; Capela: moradia dos escravos.",
                "Casa Grande: fábrica de tecido; Senzala: armazém de ouro; Casa de Purgar: garagem de carruagens."
            ],
            "explanation": "A Senzala abrigava os escravizados, a Casa Grande era a residência do senhor e a Casa de Purgar era a etapa de purificação e cristalização do açúcar.",
            "cronica": "Cada construção do engenho refletia a complexa engrenagem social e produtiva da sociedade açucareira."
        },
        {
            "question": "No Brasil colonial, as pessoas escravizadas realizavam diferentes tipos de trabalho nas cidades e no campo. Explique quem eram as pessoas escravizadas no Brasil e cite algumas atividades realizadas por elas.",
            "answer": "Os escravizados podiam ser indígenas ou africanos. A maior parte dos escravizados trabalhavam nos engenhos e lavouras.",
            "distractors": [
                "Os escravizados eram apenas imigrantes italianos que trabalhavam em escritórios de advocacia.",
                "Eram cavaleiros portugueses que serviam como guardas de honra da família real.",
                "Eram marinheiros holandeses que cuidavam da manutenção dos portos do Rio de Janeiro."
            ],
            "explanation": "A escravidão incidiu sobre indígenas e, principalmente, africanos, que executavam a maior parte dos trabalhos braçais nos canaviais e instalações dos engenhos.",
            "cronica": "Aion contempla as mãos que moveram a terra e a moenda: o trabalho pesado dos indígenas e africanos sustentava a colônia."
        },
        {
            "question": "Milhares de africanos escravizados precisavam atravessar o oceano Atlântico antes de chegar ao Brasil. Muitos não sobreviviam à viagem. Explique por que essa travessia era tão difícil e perigosa para os africanos.",
            "answer": "As viagens eram realizadas através dos navios negreiros e estes navios eram muito insalubres. Na travessia, muitos escravizados morriam.",
            "distractors": [
                "Os navios ofereciam cabines individuais com médicos e refeições fartas para todos.",
                "A travessia era feita a pé durante o inverno quando o oceano congelava.",
                "Não havia perigo pois os navios eram acompanhados por escoltas turísticas inglesas."
            ],
            "explanation": "A travessia nos chamados tumbeiros ocorria em condições de extrema superlotação, falta de higiene, doenças e fome, resultando na morte de muitos passageiros.",
            "cronica": "Sobre as águas escuras do mar, as memórias dos navios negreiros permanecem como alerta sobre os limites da crueldade humana."
        },
        {
            "question": "Nos primeiros anos da presença portuguesa no Brasil, o pau-brasil foi um dos produtos mais explorados pelos europeus. Explique como a exploração do pau-brasil se tornou uma atividade econômica importante para os portugueses.",
            "answer": "O Pau-Brasil era um produto muito valorizado na Europa. Era utilizado para fabricar móveis e seu pigmento era extraído da madeira.",
            "distractors": [
                "O pau-brasil era moído para fazer farinha alimentícia consumida nas navegações.",
                "As folhas do pau-brasil eram usadas para fabricar remédios contra a febre amarela.",
                "A madeira era queimada para iluminar as ruas de Lisboa durante os festivais de inverno."
            ],
            "explanation": "O pau-brasil era altamente cobiçado na Europa devido à corante vermelha extraída de sua madeira, muito usada no tingimento de tecidos nobres e marcenaria.",
            "cronica": "Nas matas do litoral, a tinta vermelha do pau-brasil marcou o primeiro capítulo da exploração colonial."
        },
        {
            "question": "As pessoas escravizadas enfrentavam uma vida marcada pela falta de liberdade, pelo trabalho forçado e pela violência. Apesar disso, elas também desenvolveram diferentes formas de enfrentar a escravidão. Explique como era o trabalho das pessoas escravizadas e de que maneiras elas poderiam resistir à escravidão.",
            "answer": "Os escravizados resistiam de diversas maneiras. Além das fugas, os escravos criaram os quilombos, que eram comunidades de escravos fugitivos onde eles se escondiam para serem salvos. O trabalho das pessoas escravizadas era muito cansativo e pesado.",
            "distractors": [
                "Os escravizados não resistiam e preferiam trabalhar sem descanso para ganhar promoções de cargo.",
                "A única forma de resistência era enviar cartas registradas para os bispos em Roma.",
                "O trabalho era leve e divertido, consistindo apenas em organizar banquetes de comemoração."
            ],
            "explanation": "Frente ao trabalho exaustivo e violento, os escravizados reagiam com fugas, revoltas e a criação de quilombos — refúgios seguros de liberdade e preservação cultural.",
            "cronica": "Aion rende homenagem aos quilombolas: mesmo nas sombras da opressão, a busca pela liberdade nunca se apogou."
        }
    ]

    for item in exact_data:
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

    print("Successfully built verbatim 10 questions and answers!")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    build_exact_revision()
