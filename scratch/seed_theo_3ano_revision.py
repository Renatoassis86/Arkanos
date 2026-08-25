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

def seed_theo_revision():
    print("=== SEEDING EXCLUSIVELY THE 10 REVISION QUESTIONS FOR THEO (3º ANO) ===")

    subject, _ = QuizSubject.objects.get_or_create(name="História")
    grade3, _ = QuizGrade.objects.get_or_create(name="3º ano")
    assessment, _ = QuizAssessment.objects.get_or_create(name="AV2", grade=grade3, subject=subject)

    # Clean old revision topics for 3º ano
    QuizTopic.objects.filter(grade=grade3, name__icontains="Revisão").delete()

    # Create clean topic for 3º ano
    topic = QuizTopic.objects.create(
        name="Exercício de Revisão",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    theo_verbatim_items = [
        {
            "question": "Por que o município da cidade do Rio de Janeiro é considerado um lugar histórico?",
            "answer": "Por ser uma das cidades mais antigas do Brasil e ter sido capital do país por muito tempo, além de abrigar marcos históricos importantes.",
            "distractors": [
                "Por ser uma das cidades mais novas do litoral e ter sido fundada por comerciantes holandeses no século passado, além de abrigar praias de turismo moderno.",
                "Por ser uma área estritamente rural de agricultura e ter sido criada para a extração de pau-brasil, além de abrigar pequenas vilas de pescadores sem monumentos.",
                "Por ser uma cidade planejada recentemente e ter sido construída para abrigar indústrias automotivas, além de abrigar portos de transporte de carga."
            ],
            "explanation": "O Rio de Janeiro possui grande importância histórica por ser uma das primeiras povoações coloniais do Brasil, tendo sido a capital do Reino e da República por quase dois séculos.",
            "cronica": "O Guardião Aion recorda: as ruas de pedra do Rio de Janeiro guardam memórias vivas de imperadores, líderes e acontecimentos que moldaram o país."
        },
        {
            "question": "Qual era a principal atividade econômica do Brasil durante o período colonial?",
            "answer": "A produção de açúcar.",
            "distractors": [
                "A fabricação de tecidos.",
                "A extração de petróleo.",
                "O cultivo de café verde."
            ],
            "explanation": "A produção de açúcar nos engenhos nordestinos foi o motor central da economia colonial brasileira durante os séculos XVI e XVII.",
            "cronica": "Aion contempla a história: dos vastos canaviais saiu a riqueza que sustentava os canais de comércio entre o Brasil e a Europa."
        },
        {
            "question": "Como era a vida das pessoas escravizadas no período colonial?",
            "answer": "Trabalhavam por longas horas sem direitos, morando em senzalas e realizando trabalhos pesados.",
            "distractors": [
                "Trabalhavam por poucas horas com salários, morando em casas próprias e realizando tarefas leves.",
                "Trabalhavam apenas como administradores dos engenhos, morando na Casa-Grande e recebendo prêmios.",
                "Trabalhavam apenas como professores e médicos nas vilas, morando em hotéis e recebendo aposentadoria."
            ],
            "explanation": "As pessoas escravizadas enfrentavam jornadas exaustivas de trabalho forçado, viviam em habitações precárias (senzalas) e não possuíam direitos ou liberdade.",
            "cronica": "Aion observa o passado com compaixão: a força e o sofrimento dos escravizados ergueram as bases do Brasil colonial."
        },
        {
            "question": "Quais foram as primeiras cidades do Brasil e por que elas foram criadas?",
            "answer": "Salvador e São Vicente. Criadas para ocupar o território e defender o país.",
            "distractors": [
                "Rio de Janeiro e Brasília. Criadas para sediar campeonatos e festivais de música.",
                "Curitiba e Porto Alegre. Criadas para plantar maçãs e exportar tecidos para a Europa.",
                "Manaus e Belém. Criadas para construir estradas de ferro e fabricar automóveis."
            ],
            "explanation": "São Vicente (1532) e Salvador (1549 - primeira capital) foram fundadas pela Coroa Portuguesa para povoar, organizar a administração e proteger a costa contra invasores.",
            "cronica": "Sobre o litoral brasileiro, as primeiras vilas nasceram como fortalezas de fé, trabalho e organização comunitária."
        },
        {
            "question": "Qual a importância dos patrimônios históricos para um município?",
            "answer": "Preservar a história e a cultura da cidade.",
            "distractors": [
                "Aumentar o valor dos impostos sobre as casas.",
                "Substituir todos os edifícios antigos por prédios.",
                "Fechar os museus e proibir a visitação pública."
            ],
            "explanation": "Os patrimônios históricos (monumentos, edifícios, documentos e tradições) mantêm viva a memória e a identidade cultural dos habitantes do município.",
            "cronica": "Aion ensina: um povo que respeita e preserva suas raízes constrói um futuro seguro e honrado."
        },
        {
            "question": "O que é a zona rural de um município e quais são suas principais atividades?",
            "answer": "É a área do campo onde se realiza a agricultura e a pecuária.",
            "distractors": [
                "É a área central da cidade onde se concentram os grandes bancos e shopping centers.",
                "É o porto marítimo de navios onde se fabricam aviões e computadores modernos.",
                "É o bairro residencial de apartamentos onde se localizam as universidades e teatros."
            ],
            "explanation": "A zona rural compreende o espaço fora das cidades (campo), dedicada principalmente ao cultivo de alimentos (agricultura) e criação de animais (pecuária).",
            "cronica": "Do trabalho silencioso da terra no campo vem o alimento que nutre as famílias de todas as cidades."
        },
        {
            "question": "O que é a zona urbana e quais são seus principais serviços?",
            "answer": "É a área da cidade onde se concentram comércios e serviços.",
            "distractors": [
                "É a área de florestas onde se concentram rios selvagens e animais da mata.",
                "É o espaço de lavouras de trigo onde se criam rebanhos de gado e ovelhas.",
                "É o distrito minerador isolado onde se extraem pedras preciosas da serra."
            ],
            "explanation": "A zona urbana é a cidade propriamente dita, onde há maior densidade populacional, prédios, lojas, escolas, hospitais e prestação de serviços.",
            "cronica": "Aion observa o ritmo pulsante da zona urbana, onde o trabalho e as artes se encontram na convivência diária."
        },
        {
            "question": "O que são serviços públicos e por que eles são importantes para o município?",
            "answer": "São serviços essenciais prestados para garantir a qualidade de vida da população.",
            "distractors": [
                "São produtos de luxo vendidos exclusivamente para os comerciantes mais ricos da região.",
                "São festas particulares organizadas pelos clubes esportivos no final de semana.",
                "São propagandas de empresas estrangeiras para incentivar a compra de eletrônicos."
            ],
            "explanation": "Serviços públicos (como água encanada, iluminação, coleta de lixo, saúde e educação) são mantidos pelo governo para atender às necessidades básicas de todos os cidadãos.",
            "cronica": "A ordem e o bem-estar de uma comunidade dependem do cuidado com os serviços que atendem a todos os seus moradores."
        },
        {
            "question": "Qual a diferença entre espaço público e espaço privado?",
            "answer": "Espaço público: Aberto a todos (praças, ruas). Espaço privado: Pertence a alguém (casas, lojas).",
            "distractors": [
                "Espaço público: Pertence a uma empresa fechada (fábricas). Espaço privado: Aberto ao mar aberto sem dono.",
                "Espaço público: Usado apenas à noite por guardas. Espaço privado: Usado apenas de dia por alunos de escolas.",
                "Espaço público: Proibido para cidadãos comuns. Espaço privado: Gratuito e mantido pela prefeitura para festas."
            ],
            "explanation": "Espaços públicos (ruas, praças, parques) pertencem à coletividade e são de livre acesso, enquanto espaços privados (casas, estabelecimentos) são de propriedade particular.",
            "cronica": "Respeitar o espaço público e honrar a propriedade privada são atitudes essenciais para a convivência justa em sociedade."
        },
        {
            "question": "Como o trabalho das pessoas contribui para o desenvolvimento de um município?",
            "answer": "Produzindo bens e serviços e gerando impostos para melhorias.",
            "distractors": [
                "Impedindo a construção de escolas e reduzindo a produção de alimentos.",
                "Aumentando o lixo nas ruas e cancelando o transporte coletivo da cidade.",
                "Fechando todos os pontos comerciais e proibindo a circulação de dinheiro."
            ],
            "explanation": "O trabalho da população cria riqueza, gera serviços necessários ao dia a dia e recolhe tributos que financiam obras e melhorias para a própria cidade.",
            "cronica": "O Guardião Aion ensina: todo trabalho honesto e bem feito honra a Deus e constrói o progresso do município."
        }
    ]

    for item in theo_verbatim_items:
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

    print("Successfully registered 100% strict verbatim questions and balanced distractors for Theo (3º ano)!")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    seed_theo_revision()
