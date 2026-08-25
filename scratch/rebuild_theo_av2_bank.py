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

def rebuild_theo_bank():
    print("=== REBUILDING THEO (3º ANO, AV2, HISTÓRIA) QUESTION BANK FROM FLASHCARDS 18-21 & REVISION SHEET ===")

    subject, _ = QuizSubject.objects.get_or_create(name="História")
    grade3, _ = QuizGrade.objects.get_or_create(name="3º ano")
    assessment, _ = QuizAssessment.objects.get_or_create(name="AV2", grade=grade3, subject=subject)

    # Clean old 3º ano topics to guarantee zero mismatched questions
    QuizTopic.objects.filter(grade=grade3).delete()

    # ==========================================
    # TOPIC 1: EXERCÍCIO DE REVISÃO (10 QUESTÕES VERBATIM)
    # ==========================================
    topic_rev = QuizTopic.objects.create(
        name="Exercício de Revisão",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    revision_questions = [
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

    for item in revision_questions:
        QuizQuestion.objects.create(
            topic=topic_rev,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[item["answer"]] + item["distractors"],
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    # ==========================================
    # TOPIC 2: FLASHCARD 18 – AVANÇOS ARQUITETÔNICOS EM ROMA
    # ==========================================
    topic_fc18 = QuizTopic.objects.create(
        name="Flashcard 18 – Avanços Arquitetônicos em Roma",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    fc18_questions = [
        {
            "question": "Durante a expansão de Roma, como aconteceu a transformação dos antigos vilarejos em grandes cidades organizadas?",
            "answer": "Os vilarejos de cabanas e terra batida foram substituídos por cidades planejadas com edifícios de pedra, praças públicas, ruas pavimentadas e redes de esgoto.",
            "distractors": [
                "Os vilarejos foram abandonados e a população passou a morar exclusivamente em barcos de madeira ancorados nos rios sem nenhuma construção fixa de pedra.",
                "Os vilarejos foram destruídos para a criação de grandes florestas fechadas onde era proibido construir casas ou pavimentar qualquer estrada de rodagem.",
                "Os vilarejos permaneceram sem nenhuma mudança por mil anos, mantendo apenas cabanas de palha sem praças, calçamento ou edifícios públicos de pedra."
            ],
            "explanation": "A engenharia romana revolucionou o urbanismo, transformando rústicos vilarejos em metrópoles com arquitetura monumental e infraestrutura pública.",
            "cronica": "Aion contempla a pedra e o concreto: a disciplina dos construtores romanos ergueu monumentos que desafiaram os séculos."
        },
        {
            "question": "Qual foi a função das incríveis construções romanas como aquedutos, estradas pavimentadas, fórung e termas para a população?",
            "answer": "Traziam água limpa contínua para as casas e banhos públicos, facilitavam o transporte rápido de mercadorias e tropas, e garantiam locais de comércio, lazer e higiene.",
            "distractors": [
                "Serviam apenas para acumular grãos estragados e impedir que os moradores pudessem viajar ou comerciar entre as províncias do império.",
                "Eram construídas exclusivamente para bloquear a passagem de ar e impedir a circulação de pedestres nas ruas centrais das vilas de Roma.",
                "Serviam apenas para guardar estátuas de madeira sem nenhuma utilidade prática para o suprimento de água, transporte ou higiene dos moradores."
            ],
            "explanation": "As obras públicas de Roma melhoraram a qualidade de vida urbana com água potável (aquedutos), integração territorial (vias) e convivência comunitária (termas e fórum).",
            "cronica": "Das montanhas às fontes da cidade, as águas conduzidas pelos aquedutos romanos simbolizavam o vigor de uma civilização."
        },
        {
            "question": "Como os engenheiros romanos conseguiram construir pontes e aquedutos gigantescos que duraram milhares de anos?",
            "answer": "Utilizaram a invenção do arco arquitetônico e do cimento de puzolana (cimento resistente com cinza vulcânica), distribuindo o peso com grande estabilidade.",
            "distractors": [
                "Utilizaram apenas troncos de amendoeira amarrados com cordas de algodão sem usar nenhum tipo de pedra, argamassa ou estrutura curva de sustentação.",
                "Utilizaram tijolos de barro secos ao sol sem nenhuma cola ou fundamento, que se desfaziam com a primeira chuva forte da estação de inverno.",
                "Utilizaram estruturas de bambu e colunas ocas de gesso que precisavam ser reconstruídas semanalmente pelos soldados do exército imperial."
            ],
            "explanation": "A combinação do arco (que distribui o peso com perfeição) e do concreto vulcânico permitiu aos romanos erguer estruturas sólidas e duradouras.",
            "cronica": "Aion observa os arcos de pedra: a sabedoria da engenharia romana uniu beleza e resistência para servir a gerações."
        }
    ]

    for item in fc18_questions:
        QuizQuestion.objects.create(
            topic=topic_fc18,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[item["answer"]] + item["distractors"],
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    # ==========================================
    # TOPIC 3: FLASHCARD 19 – ROMA TORNA-SE UMA POTÊNCIA MUNDIAL
    # ==========================================
    topic_fc19 = QuizTopic.objects.create(
        name="Flashcard 19 – Roma Torna-se uma Potência Mundial",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    fc19_questions = [
        {
            "question": "Após qual famoso conjunto de conflitos Roma venceu sua grande rival Cartago e se tornou a maior potência mundial do mar Mediterrâneo?",
            "answer": "Após as Guerras Púnicas, nas quais Roma derrotou a poderosa cidade de Cartago e assumiu o controle das rotas comerciais do Mar Mediterrâneo.",
            "distractors": [
                "Após as Guerras Médicas, nas quais Roma foi derrotada pelos persas e perdeu todo o seu litoral e rotas marítimas para o Egito.",
                "Após as Guerras de Troia, nas quais Roma assinou um tratado de submissão e entregou suas riquezas aos comerciantes da Grécia antiga.",
                "Após as Guerras Peloponésias, nas quais Roma dividiu seu território com os espartanos e abandonou a navegação pelo Mediterrâneo."
            ],
            "explanation": "A vitória sobre Cartago nas Guerras Púnicas transformou Roma de uma potência regional em senhora absoluta do Mar Mediterrâneo (Mare Nostrum).",
            "cronica": "Aion vê o triunfo nas águas do Mediterrâneo: com a queda de Cartago, Roma assumiu a liderança do mundo antigo."
        },
        {
            "question": "Por quais motivos Roma passou a ser conhecida como a 'Capital do Mundo' e recebeu o título de civilização de 'Categoria sem igual'?",
            "answer": "Porque centralizava as riquezas, leis, rotas comerciais e cultura de três continentes (Europa, Ásia e África), impondo organização e ordem sem precedentes.",
            "distractors": [
                "Porque era a menor aldeia da Europa e não possuía nenhum exército, lei escrita ou comércio com os povos vizinhos do mar Mediterrâneo.",
                "Porque ficava isolada no topo de uma montanha inatingível sem manter relações ou trocas culturais com nenhuma outra nação do mundo.",
                "Porque decidiu proibir o uso de moedas e fechar suas fronteiras para todos os viajantes, estudantes e comerciantes estrangeiros."
            ],
            "explanation": "Roma tornou-se o centro gravitacional do mundo conhecido, onde convergiam produtos, filósofos, leis e a administração de um império continental.",
            "cronica": "Todos os caminhos levavam a Roma: no auge do seu poder, a cidade eterna brilhava como a capital de muitas nações."
        }
    ]

    for item in fc19_questions:
        QuizQuestion.objects.create(
            topic=topic_fc19,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[item["answer"]] + item["distractors"],
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    # ==========================================
    # TOPIC 4: FLASHCARD 20 – REINADO DE JÚLIO CÉSAR
    # ==========================================
    topic_fc20 = QuizTopic.objects.create(
        name="Flashcard 20 – Reinado de Júlio César",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    fc20_questions = [
        {
            "question": "Qual era a origem familiar de Júlio César, quais matérias ele estudou na juventude e como se destacou na carreira militar?",
            "answer": "Nasceu em uma família patrícia nobre, estudou retórica e oratória na Grécia, e conquistou a Gália demonstrando coragem e genialidade tática como general.",
            "distractors": [
                "Nasceu em uma família camponesa pobre da África, estudou carpintaria na Pérsia e destacou-se como marinheiro de pesca no rio Nilo.",
                "Nasceu em uma família de comerciantes estrangeiros, estudou navegação na Britânia e destacou-se como construtor de carruagens em Esparta.",
                "Nasceu em uma família de escravizados libertos, estudou pintura na Fenícia e destacou-se como poeta da corte do rei da Pérsia."
            ],
            "explanation": "Nascido da nobreza patrícia, César aliou excelente oratória ao talento militar, conquistando as tribos da Gália e a admiração dos soldados.",
            "cronica": "Aion recorda a liderança de César: a eloquência nas palavras e a bravura nos campos de batalha abriram-lhe as portas do poder."
        },
        {
            "question": "Por que Júlio César desobedeceu às ordens do general Pompeu e do Senado e como ele conquistou o governo de Roma?",
            "answer": "Porque o Senado exigiu que ele entregasse suas legiões; César desobedeceu cruzando o rio Rubicão com seu exército ('A sorte está lançada') e venceu Pompeu.",
            "distractors": [
                "Porque Pompeu convidou César para uma festa de aniversário; César recusou o convite e decidiu mudar-se para a Grécia com sua família.",
                "Porque o Senado deu de presente o governo a César; ele aceitou pacificamente sem precisar marchar com nenhum soldado para Roma.",
                "Porque os soldados de César decidiram abandonar as armas e fugir para o Egito, deixando Pompeu governando sozinho sem oposição."
            ],
            "explanation": "Ao cruzar o rio Rubicão com suas legiões armadas, César desafiou o Senado e deu início à guerra civil que culminaria em seu governo como ditador vitalício.",
            "cronica": "Às margens do Rubicão, o destino de Roma foi decidido: o gesto audacioso de César marcou a transição da República para o Império."
        },
        {
            "question": "Quais foram as importantes melhorias e reformas realizadas por Júlio César durante o seu governo em Roma?",
            "answer": "Criou o calendário juliano (com 365 dias e ano bissexto), distribuiu terras aos veteranos, construiu obras públicas e reformou a administração das províncias.",
            "distractors": [
                "Proibiu a contagem dos dias do ano, destruiu as estradas de pedra e confiscou as terras de todos os cidadãos para vender aos inimigos.",
                "Aumentou os impostos sobre os mais pobres, fechou as escolas de retórica e cancelou o fornecimento de trigo para a população de Roma.",
                "Substituiu o uso da língua latina pelo grego antigo em todos os documentos oficiais e cancelou o direito de cidadania de todos os romanos."
            ],
            "explanation": "César reorganizou a sociedade romana reformando o calendário, gerando empregos em obras públicas e apoiando os soldados veteranos e o povo.",
            "cronica": "Aion observa as reformas de César: o tempo ajustado no calendário e o trabalho no campo trouxeram estabilidade ao povo."
        },
        {
            "question": "Por quais motivos o Senado se opôs a Júlio César, como ele foi assassinado e quem assumiu o governo de Roma após sua morte?",
            "answer": "O Senado temia que César se tornasse rei absoluto; ele foi assassinado no Senado nos Idos de Março (44 a.C.) e seu herdeiro Otávio (César Augusto) assumiu o poder.",
            "distractors": [
                "O Senado amava César como rei; ele morreu de velhice em seu leito e seu general Pompeu assumiu o governo com o apoio da população.",
                "O Senado opôs-se a César porque ele queria morar na Espanha; ele foi envenenado por piratas no mar e os marinheiros assumiram o governo.",
                "O Senado opôs-se a César porque ele era muito jovem; ele foi derrotado em uma batalha na Gália e os gauleses governaram Roma."
            ],
            "explanation": "Conspiradores do Senado liderados por Bruto e Cássio mataram César em 44 a.C. Após guerras civis, seu jovem herdeiro Otávio consolidou o poder.",
            "cronica": "Nos Idos de Março, os punhais da traição feriram César, mas o sangue derramado selaria o nascimento do Império sob Otávio."
        }
    ]

    for item in fc20_questions:
        QuizQuestion.objects.create(
            topic=topic_fc20,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[item["answer"]] + item["distractors"],
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    # ==========================================
    # TOPIC 5: FLASHCARD 21 – REINADO DE CÉSAR AUGUSTO
    # ==========================================
    topic_fc21 = QuizTopic.objects.create(
        name="Flashcard 21 – Reinado de César Augusto",
        subject=subject,
        grade=grade3,
        assessment=assessment
    )

    fc21_questions = [
        {
            "question": "Quem se tornou o PRIMEIRO imperador oficial de Roma, qual nome venerável ele assumiu e qual o significado desse título?",
            "answer": "Otávio tornou-se o primeiro imperador, assumindo o nome de César Augusto, título que significa 'Venerável', 'Sagrado' ou 'Elevado pelos Deuses'.",
            "distractors": [
                "Pompeu tornou-se o primeiro imperador, assumindo o nome de Pompeu Magno, título que significa 'O Construtor de Pontes de Pedra'.",
                "Marco Antônio tornou-se o primeiro imperador, assumindo o nome de Antônio Rei, título que significa 'O Guerreiro dos Mares'.",
                "Bruto tornou-se o primeiro imperador, assumindo o nome de Bruto o Jovem, título que significa 'O Orador da Assembleia'."
            ],
            "explanation": "Otávio recebeu do Senado em 27 a.C. o título de 'Augusto' (venerável), marcando a inauguração oficial do Império Romano.",
            "cronica": "Aion contempla a coroação de Augusto: o jovem herdeiro de César recebeu a dignidade suprema para governar o império."
        },
        {
            "question": "O que significa o termo 'Pax Romana' e como essa nova forma de governo transformou o Império durante o reinado de César Augusto?",
            "answer": "Significa 'Paz Romana', um período de cerca de 200 anos de estabilidade, segurança nas fronteiras, prosperidade econômica e desenvolvimento cultural.",
            "distractors": [
                "Significa 'Guerra em Roma', um período de 50 anos de batalhas diárias no centro da cidade que destruiu o comércio e os edifícios públicos.",
                "Significa 'Imposto Romano', um conjunto de leis que confiscava todas as colheitas dos camponeses para financiar banquetes reais.",
                "Significa 'Pacto de Troia', um acordo secreto em que Roma vendeu suas províncias para os reinos vizinhos da Ásia Menor."
            ],
            "explanation": "A Pax Romana trouxe relativa paz interna e proteção nas fronteiras, permitindo a expansão do comércio, das estradas e das artes.",
            "cronica": "Sob as asas da Pax Romana, os campos produziram com fartura e os navegantes cruzaram o Mediterrâneo em segurança."
        },
        {
            "question": "Quais foram as principais melhorias governamentais promovidas por César Augusto para garantir o bem-estar e o abastecimento das cidades?",
            "answer": "Criou os 'graneleiros reais' para garantir trigo à população, organizou um corpo de bombeiros e polícia urbana e reformou a administração das províncias.",
            "distractors": [
                "Proibiu o transporte de alimentos pelas estradas, fechou o porto do Rio Tibre e cancelou os bombeiros e guardas de segurança da cidade.",
                "Aumentou os preços do pão nas cidades, vendeu os aquedutos para particulares e demitiu todos os governadores das províncias romanas.",
                "Construiu grandes muros dentro da própria cidade para separar os moradores e proibiu o comércio de grãos e azeite no Fórum."
            ],
            "explanation": "César Augusto estruturou a administração pública criando bombeiros (vigiles), custodiantes do trigo e correios oficiais para o Império.",
            "cronica": "Aion observa o zelo de Augusto: ao garantir o pão e a proteção urbana, o imperador fortaleceu a confiança do povo."
        },
        {
            "question": "Qual imperador romano estava governando o mundo antigo quando Jesus Cristo nasceu na Judeia?",
            "answer": "César Augusto, que governava o Império Romano quando Jesus nasceu em Belém da Judeia, conforme registrado nas Escrituras (Lucas 2:1).",
            "distractors": [
                "Júlio César, que já havia falecido mais de quarenta anos antes do nascimento de Cristo na região da Judeia.",
                "Nero, que governou muitos anos depois durante as primeiras perseguições aos cristãos em Roma.",
                "Alexandre o Grande, que foi um rei grego da Macedônia e governou três séculos antes da era cristã."
            ],
            "explanation": "Conforme o relato de Lucas 2:1, o decreto para o recenseamento de todo o mundo habitado foi emitido por César Augusto durante o nascimento de Cristo.",
            "cronica": "O Guardião Aion curva-se diante da plenitude dos tempos: sob o decreto de César Augusto na distante Roma, cumpre-se a promessa em Belém."
        }
    ]

    for item in fc21_questions:
        QuizQuestion.objects.create(
            topic=topic_fc21,
            question=item["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[item["answer"]] + item["distractors"],
            answer=item["answer"],
            explanation=item["explanation"],
            cronica_do_guardiao=item["cronica"],
            has_image=False
        )

    print("Successfully rebuilt Theo (3º ano) question bank with 100% exact alignment to Flashcards 18-21 and Revision Sheet!")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    rebuild_theo_bank()
