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

def apply_strict_verbatim_balanced():
    print("=== APPLYING VERBATIM QUESTIONS & BALANCED DISTRACTORS (EQUAL LENGTH & DETAIL) ===")

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

    verbatim_items = [
        {
            "question": "No início do século XIX, Portugal mantinha uma importante relação comercial com a Inglaterra. Ao mesmo tempo, Napoleão Bonaparte aumentava seu domínio sobre vários países da Europa. Explique por que essa situação trouxe problemas para Portugal.",
            "answer": "Portugal era aliada da Inglaterra e com o bloqueio continental, Napoleão Bonaparte impediu os países da Europa de ter relação com a Inglaterra. Assim, a França invade Portugal.",
            "distractors": [
                "Portugal era neutro na guerra e com a aliança ibérica, Napoleão Bonaparte exigiu os impostos das minas de ouro para defender Lisboa. Assim, a Inglaterra invade Portugal.",
                "Portugal tentou dominar a Espanha e com o tratado de paz europeu, Napoleão Bonaparte obrigou o rei português a vender todas as colônias. Assim, a Holanda invade Portugal.",
                "Portugal apoiou o exército francês e com o acordo comercial marítimo, Napoleão Bonaparte confiscou os navios portugueses no Atlântico. Assim, a Espanha invade Portugal."
            ],
            "explanation": "Como Portugal era aliado da Inglaterra, o Bloqueio Continental decretado por Napoleão proibiu o comércio com os ingleses, levando a França a invadir o território português.",
            "cronica": "O Guardião Aion recorda: as pressões diplomáticas na Europa napoleônica forçaram a decisão que mudaria para sempre o destino do Brasil."
        },
        {
            "question": "A chegada da Família Real ao Brasil, em 1808, trouxe mudanças para a colônia, principalmente para o Rio de Janeiro. Explique como a presença da Corte portuguesa ajudou a transformar o Brasil nesse período.",
            "answer": "Muitas inovações e mudanças ocorreram, à exemplo da criação da Faculdade de medicina, do primeiro jornal e do Banco do Brasil.",
            "distractors": [
                "Muitos conflitos e restrições ocorreram, à exemplo da proibição da imprensa régia, do fechamento das escolas e do porto do Rio.",
                "Poucas inovações formais ocorreram, à exemplo da transferência da capital colonial para Manaus e destruição das bibliotecas públicas.",
                "Diversas revoltas populares ocorreram, à exemplo do cancelamento das leis de comércio exterior e expulsão de todos os médicos."
            ],
            "explanation": "A instalação da Corte no Rio de Janeiro impulsionou a criação da Faculdade de Medicina, da Imprensa Régia (primeiro jornal) e do Banco do Brasil.",
            "cronica": "Aion contempla a transformação: de colônia restrita a sede do Reino Unido de Portugal, o Brasil floresceu em instituições e cultura."
        },
        {
            "question": "Durante a colonização, muitos africanos foram retirados de suas terras e vendidos como pessoas escravizadas. Eles pertenciam a diferentes povos e possuíam seus próprios costumes e tradições. Explique como muitos africanos se tornavam escravizados antes de serem vendidos aos comerciantes portugueses.",
            "answer": "Existiam conflitos entre tribos no continente africano e as pessoas que perdiam nestes conflitos acabavam sendo escravizadas e vendidas aos comerciantes portugueses.",
            "distractors": [
                "Existiam contratos voluntários de trabalho no continente africano e as pessoas que assinavam esses acordos acabavam emigrando para o Brasil colonial.",
                "Existiam seleções anuais organizadas pela igreja no continente africano e as pessoas escolhidas nessas assembleias viravam servas dos bispos portugueses.",
                "Existiam leis de imigração livre no continente africano e as famílias que viajavam aos portos acabavam contratadas pelos governadores do Nordeste."
            ],
            "explanation": "Guerras e conflitos entre diferentes reinos e tribos na África geravam prisioneiros de guerra, que eram posteriormente negociados com comerciantes europeus.",
            "cronica": "Aion observa com pesar como as divisões e rivalidades no continente africano foram exploradas pelo comércio colonial."
        },
        {
            "question": "Em 1807, a Família Real Portuguesa precisou deixar Portugal às pressas e realizar uma longa viagem até o Brasil. Explique o que estava acontecendo em Portugal e como foi realizada a viagem da Família Real até o Brasil.",
            "answer": "As tropas de Napoleão estavam invadindo Portugal e a família Real portuguesa estava fugindo às pressas para o Brasil. A viagem foi longa e difícil.",
            "distractors": [
                "As tropas inglesas estavam atacando o litoral de Portugal e a família Real portuguesa estava viajando em férias para a Bahia. A viagem foi calma e festiva.",
                "As revoltas civis estavam destruindo as cidades de Portugal e a família Real portuguesa estava se mudando de vez para a África. A viagem foi curta e tranquila.",
                "Os comerciantes holandeses estavam bloqueando o reino de Portugal e a família Real portuguesa estava se refugiando na França. A viagem foi rápida e confortável."
            ],
            "explanation": "A ameaça iminente da invasão francesa fez com que a Família Real embarcasse às pressas sob proteção britânica, enfrentando uma travessia exaustiva pelo Atlântico.",
            "cronica": "Sob tempestades e incertezas no oceano, a frota portuguesa cruzou o mar trazendo a coroa para o solo americano."
        },
        {
            "question": "Durante o período colonial, a produção de açúcar se tornou uma importante atividade econômica no Brasil. Grandes propriedades foram organizadas para realizar essa produção. Explique por que o açúcar era importante para os portugueses e como os engenhos participavam dessa atividade.",
            "answer": "Os engenhos foram criados para produzir o açúcar. O açúcar era um produto muito rentável na Europa, por isso os portugueses o fabricavam no Brasil.",
            "distractors": [
                "Os engenhos foram criados para moer o pau-brasil. O pau-brasil era o único produto consumido na Europa, por isso os portugueses o plantavam no Brasil.",
                "Os engenhos foram criados para armazenar o algodão. O algodão era o produto mais barato na Europa, por isso os portugueses o trocavam no Brasil.",
                "Os engenhos foram criados para minerar o ouro bruto. O ouro era um produto pouco valorizado na Europa, por isso os portugueses o guardavam no Brasil."
            ],
            "explanation": "Conhecido como 'ouro branco', o açúcar alcançava altíssimos preços no mercado europeu, tornando os engenhos estruturas centrais da economia colonial.",
            "cronica": "Aion vê a doçura do produto alimentar grandes fortunas na Europa, custando o esforço de milhares no Brasil."
        },
        {
            "question": "Um engenho de açúcar possuía vários espaços e construções. Alguns eram usados para produzir açúcar, enquanto outros serviam de moradia ou para atividades religiosas. Escolha três espaços de um engenho e explique para que cada um deles era utilizado.",
            "answer": "Senzala: era o local onde os escravizados dormiam e descansavam. Casa Grande: era a moradia do senhor de engenho e sua família. Casa de Purgar: era o local onde o melaço da cana era resfriado, endurecido e quebrado.",
            "distractors": [
                "Senzala: era o local onde o açúcar era ensacado e vendido. Casa Grande: era o alojamento dos guardas militares. Casa de Purgar: era o local onde os bois e cavalos do engenho eram alimentados.",
                "Senzala: era a capela religiosa para celebração das missas. Casa Grande: era o armazém de ferramentas de ferro. Casa de Purgar: era a moradia oficial do senhor de engenho e convidados.",
                "Senzala: era o escritório administrativo dos contadores do rei. Casa Grande: era a fábrica de tecidos de algodão. Casa de Purgar: era o dormitório precário de descanso dos escravizados."
            ],
            "explanation": "A Senzala abrigava os escravizados, a Casa Grande era a residência do senhor e a Casa de Purgar era a etapa de purificação e cristalização do açúcar.",
            "cronica": "Cada construção do engenho refletia a complexa engrenagem social e produtiva da sociedade açucareira."
        },
        {
            "question": "No Brasil colonial, as pessoas escravizadas realizavam diferentes tipos de trabalho nas cidades e no campo. Explique quem eram as pessoas escravizadas no Brasil e cite algumas atividades realizadas por elas.",
            "answer": "Os escravizados podiam ser indígenas ou africanos. A maior parte dos escravizados trabalharam nos engenhos e lavouras.",
            "distractors": [
                "Os escravizados podiam ser franceses ou holandeses. A maior parte dos escravizados trabalharam em bancos e escolas.",
                "Os escravizados podiam ser ingleses ou espanhóis. A maior parte dos escravizados trabalharam nos tribunais e marinha.",
                "Os escravizados podiam ser portugueses ou italianos. A maior parte dos escravizados trabalharam em lojas e cartórios."
            ],
            "explanation": "A escravidão incidiu sobre indígenas e, principalmente, africanos, que executavam a maior parte dos trabalhos braçais nos canaviais e instalações dos engenhos.",
            "cronica": "Aion contempla as mãos que moveram a terra e a moenda: o trabalho pesado dos indígenas e africanos sustentava a colônia."
        },
        {
            "question": "Milhares de africanos escravizados precisavam atravessar o oceano Atlântico antes de chegar ao Brasil. Muitos não sobreviviam à viagem. Explique por que essa travessia era tão difícil e perigosa para os africanos.",
            "answer": "As viagens eram realizadas através dos navios negreiros e estes navios eram muito insalubres. Na travessia, muitos escravizados morriam.",
            "distractors": [
                "As viagens eram realizadas através de barcos a remo rápidos e estes barcos eram muito luxuosos. Na travessia, muitos passageiros descansavam.",
                "As viagens eram realizadas através de caravelas reais e estas caravelas eram muito confortáveis. Na travessia, poucos marinheiros trabalhavam.",
                "As viagens eram realizadas através de fragatas inglesas e estas fragatas eram muito equipadas. Na travessia, todos os imigrantes desembarcavam."
            ],
            "explanation": "A travessia nos chamados tumbeiros ocorria em condições de extrema superlotação, falta de higiene, doenças e fome, resultando na morte de muitos passageiros.",
            "cronica": "Sobre as águas escuras do mar, as memórias dos navios negreiros permanecem como alerta sobre os limites da crueldade humana."
        },
        {
            "question": "Nos primeiros anos da presença portuguesa no Brasil, o pau-brasil foi um dos produtos mais explorados pelos europeus. Explique como a exploração do pau-brasil se tornou uma atividade econômica importante para os portugueses.",
            "answer": "O Pau-Brasil era um produto muito valorizado na Europa. Era utilizado para fabricar móveis e seu pigmento era extraído da madeira.",
            "distractors": [
                "O Pau-Brasil era um produto muito abundante na Europa. Era utilizado para alimentar o gado e suas folhas eram moídas para fazer chá.",
                "O Pau-Brasil era um produto muito barato na Europa. Era utilizado para construir navios de guerra e seus frutos serviam de remédio.",
                "O Pau-Brasil era um produto muito raro na Europa. Era utilizado para substituir o ouro e suas sementes eram usadas como moedas."
            ],
            "explanation": "O pau-brasil era altamente cobiçado na Europa devido à corante vermelha extraída de sua madeira, muito usada no tingimento de tecidos nobres e marcenaria.",
            "cronica": "Nas matas do litoral, a tinta vermelha do pau-brasil marcou o primeiro capítulo da exploração colonial."
        },
        {
            "question": "As pessoas escravizadas enfrentavam uma vida marcada pela falta de liberdade, pelo trabalho forçado e pela violência. Apesar disso, elas também desenvolveram diferentes formas de enfrentar a escravidão. Explique como era o trabalho das pessoas escravizadas e de que maneiras elas poderiam resistir à escravidão.",
            "answer": "Os escravizados resistiam de diversas maneiras. Além das fugas, os escravos criaram os quilombos, que eram comunidades de escravos fugitivos, onde eles se escondiam para serem salvos. O trabalho das pessoas escravizadas era muito cansativo e pesado.",
            "distractors": [
                "Os escravizados resistiam de raras maneiras. Além dos acordos, os escravos criaram os sindicatos, que eram associações de trabalhadores livres, onde eles recebiam salários diários. O trabalho das pessoas escravizadas era muito leve e voluntário.",
                "Os escravizados resistiam de poucas maneiras. Além dos protestos, os escravos criaram os tribunais, que eram conselhos de advogados urbanos, onde eles julgavam os feitores coloniais. O trabalho das pessoas escravizadas era muito calmo e moderado.",
                "Os escravizados resistiam de certas maneiras. Além das reuniões, os escravos criaram as vilas, que eram bairros comerciais de artesãos, onde eles fabricavam produtos para venda. O trabalho das pessoas escravizadas era muito seguro e tranquilo."
            ],
            "explanation": "Frente ao trabalho exaustivo e violento, os escravizados reagiam com fugas, revoltas e a criação de quilombos — refúgios seguros de liberdade e preservação cultural.",
            "cronica": "Aion rende homenagem aos quilombolas: mesmo nas sombras da opressão, a busca pela liberdade nunca se apagou."
        }
    ]

    for item in verbatim_items:
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

    print("Successfully registered 100% strict verbatim questions with BALANCED distractor lengths!")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    apply_strict_verbatim_balanced()
