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

def build_theo_strict_av2():
    print("=== REBUILDING THEO (3º ANO - AV2) 100% STRICTLY FROM FLASHCARDS 18-21 AND EXERCISE PHOTOS ===")

    subject_hist, _ = QuizSubject.objects.get_or_create(name="História")
    grade3, _ = QuizGrade.objects.get_or_create(name="3º ano")
    assessment_av2, _ = QuizAssessment.objects.get_or_create(name="AV2", grade=grade3, subject=subject_hist)

    # Clean old 3º ano topics to ensure ZERO extra/random questions exist
    QuizTopic.objects.filter(grade=grade3).delete()

    # ==========================================
    # 1. EXERCÍCIO DE REVISÃO (AS 10 PERGUNTAS DAS FOTOS DO 3º ANO)
    # ==========================================
    topic_ex = QuizTopic.objects.create(
        name="Exercício de Revisão (Folha do 3º Ano)",
        subject=subject_hist,
        grade=grade3,
        assessment=assessment_av2
    )

    ex_questions = [
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

    for qd in ex_questions:
        QuizQuestion.objects.create(
            topic=topic_ex,
            question=qd["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[qd["answer"]] + qd["distractors"],
            answer=qd["answer"],
            explanation=qd["explanation"],
            cronica_do_guardiao=qd["cronica"],
            has_image=False
        )

    # ==========================================
    # 2. FLASHCARD 18 – AVANÇOS ARQUITETÔNICOS EM ROMA
    # ==========================================
    topic_fc18 = QuizTopic.objects.create(
        name="Flashcard 18 – Avanços Arquitetônicos em Roma",
        subject=subject_hist,
        grade=grade3,
        assessment=assessment_av2
    )

    fc18_questions = [
        {
            "question": "Durante a expansão de Roma, como aconteceu a transformação dos antigos vilarejos rústicos em grandes cidades planejadas?",
            "answer": "Os vilarejos de cabanas e terra batida foram substituídos por cidades planejadas com edifícios de pedra, praças públicas, ruas pavimentadas e redes de esgoto.",
            "distractors": [
                "Os vilarejos foram abandonados e a população passou a morar exclusivamente em barcos de madeira ancorados nos rios sem nenhuma construção fixa de pedra.",
                "Os vilarejos foram destruídos para a criação de grandes florestas fechadas onde era proibido construir casas ou pavimentar qualquer estrada de rodagem.",
                "Os vilarejos permaneceram sem nenhuma mudança por mil anos, mantendo apenas cabanas de palha sem praças, calçamento ou edifícios públicos de pedra."
            ],
            "explanation": "A engenharia romana revolucionou o urbanismo, transformando rústicos vilarejos em metrópoles com arquitetura monumental e infraestrutura pública.",
            "cronica": "Aion contempla a pedra e o concreto: a disciplina dos construtores romanos ergueu monumentos que desafiaram os séculos.",
            "image_url": "/img/quiz/aqueduto_romano.jpg"
        },
        {
            "question": "Para que serviam os famosos aquedutos romanos e qual benefício direto eles trouxeram para a população urbana?",
            "answer": "Traziam água limpa e potável de nascentes distantes para abastecer as casas, fontes públicas e os banhos públicos da cidade de forma contínua.",
            "distractors": [
                "Armazenavam pólvora e armas de guerra para proteger as fronteiras do império contra invasões de tribos vizinhas durante o inverno.",
                "Serviam como prisões fechadas para guardar criminosos e impedir a circulação de pedestres pelas ruas centrais do Fórum Romano.",
                "Eram pontes decorativas construídas apenas para apoiar estátuas de imperadores sem canalizar água para o uso da população."
            ],
            "explanation": "Os aquedutos traziam milhões de litros de água doce diariamente, permitindo higiene, saúde e conforto nas cidades romanas.",
            "cronica": "Das montanhas às fontes da cidade, as águas conduzidas pelos aquedutos romanos simbolizavam a força da civilização.",
            "image_url": "/img/quiz/aqueduto_romano.jpg"
        },
        {
            "question": "Qual inovação técnica da arquitetura romana permitiu construir pontes, aquedutos e monumentos de pedra extremamente resistentes?",
            "answer": "A invenção do arco arquitetônico (que distribui o peso) e do concreto vulcânico de puzolana, garantindo estabilidade por milhares de anos.",
            "distractors": [
                "O uso exclusivo de troncos de palmeiras amarrados com cordas de algodão, sem utilizar nenhum tipo de pedra ou argamassa resistente.",
                "A fabricação de tijolos de barro secos ao ar que se desfaziam com a água das chuvas e precisavam ser reconstruídos anualmente.",
                "A montagem de colunas de gesso oco amarradas com cipós vegetais que não suportavam o peso de telhados ou andares superiores."
            ],
            "explanation": "O arco distribui o peso com eficiência para as colunas, e o concreto romano com cinza vulcânica endurecia até mesmo debaixo d'água.",
            "cronica": "Aion observa os arcos eternos: a combinação de geometria inteligente e materiais vulcânicos eternizou as obras de Roma."
        }
    ]

    for qd in fc18_questions:
        QuizQuestion.objects.create(
            topic=topic_fc18,
            question=qd["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[qd["answer"]] + qd["distractors"],
            answer=qd["answer"],
            explanation=qd["explanation"],
            cronica_do_guardiao=qd["cronica"],
            has_image=bool(qd.get("image_url")),
            image_url=qd.get("image_url")
        )

    # ==========================================
    # 3. FLASHCARD 19 – ROMA TORNA-SE UMA POTÊNCIA MUNDIAL
    # ==========================================
    topic_fc19 = QuizTopic.objects.create(
        name="Flashcard 19 – Roma Torna-se uma Potência Mundial",
        subject=subject_hist,
        grade=grade3,
        assessment=assessment_av2
    )

    fc19_questions = [
        {
            "question": "Após qual histórico conjunto de conflitos no mar e na terra Roma venceu Cartago e assumiu o domínio do Mar Mediterrâneo?",
            "answer": "Após as Guerras Púnicas, nas quais Roma derrotou a rival cidade de Cartago e passou a controlar todas as rotas de comércio do Mediterrâneo.",
            "distractors": [
                "Após as Guerras Médicas, nas quais Roma foi derrotada pelos persas e perdeu seus navios e territórios para os reis do oriente.",
                "Após as Guerras de Troia, nas quais Roma assinou um tratado de submissão e entregou suas riquezas aos comerciantes gregos.",
                "Após as Guerras Peloponésias, nas quais Roma dividiu seu exército com Esparta e abandonou a navegação pelas ilhas."
            ],
            "explanation": "A vitória sobre a cidade fenícia de Cartago transformou Roma na potência hegemônica de todo o Mar Mediterrâneo (Mare Nostrum).",
            "cronica": "Aion vê o triunfo nas águas azuis: com a queda de Cartago, as legiões e frotas de Roma dominaram o mundo antigo.",
            "image_url": "/img/quiz/roma_potencia_mediterraneo.jpg"
        },
        {
            "question": "Por quais motivos a cidade de Roma passou a ser chamada de 'Capital do Mundo' com o título de civilização de 'Categoria sem igual'?",
            "answer": "Porque centralizava riquezas, leis, rotas de comércio e cultura de três continentes (Europa, Ásia e África), impondo ordem e infraestrutura sem precedentes.",
            "distractors": [
                "Porque era uma vila isolada no interior que proibiu o comércio com outros povos e não mantinha exército nem estradas.",
                "Porque ficava localizada no topo de uma montanha inatingível que não mantinha nenhuma relação com as demais nações.",
                "Porque decidiu fechar seus portos para navios estrangeiros e abandonar a escrita de leis em documentos oficiais."
            ],
            "explanation": "Roma tornou-se a métrica de civilização do mundo antigo, integrando territórios continentais sob uma mesma lei e administração.",
            "cronica": "Todos os caminhos levavam a Roma: no auge do seu esplendor, a cidade eterna brilhava como o coração do império."
        }
    ]

    for qd in fc19_questions:
        QuizQuestion.objects.create(
            topic=topic_fc19,
            question=qd["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[qd["answer"]] + qd["distractors"],
            answer=qd["answer"],
            explanation=qd["explanation"],
            cronica_do_guardiao=qd["cronica"],
            has_image=bool(qd.get("image_url")),
            image_url=qd.get("image_url")
        )

    # ==========================================
    # 4. FLASHCARD 20 – REINADO DE JÚLIO CÉSAR
    # ==========================================
    topic_fc20 = QuizTopic.objects.create(
        name="Flashcard 20 – Reinado de Júlio César",
        subject=subject_hist,
        grade=grade3,
        assessment=assessment_av2
    )

    fc20_questions = [
        {
            "question": "Qual era a origem de Júlio César, quais disciplinas ele estudou na juventude e como se destacou na carreira militar?",
            "answer": "Nasceu de uma nobre família patrícia, estudou oratória e retórica na Grécia, e conquistou a Gália demonstrando inteligência tática e bravura militar.",
            "distractors": [
                "Nasceu em uma família humilde de agricultores, estudou carpintaria na Fenícia e destacou-se como marinheiro no rio Nilo.",
                "Nasceu em uma família de comerciantes persas, estudou navegação na ilha de Creta e destacou-se como artesão em Esparta.",
                "Nasceu em uma família de escravizados libertos, estudou música na Bretanha e destacou-se como poeta na corte do rei egípcio."
            ],
            "explanation": "César uniu a formação clássica em oratória com uma liderança excepcional no exército, conquistando a admiração de Roma.",
            "cronica": "Aion lembra a audácia de César: a palavra firme e a espada afiada abriram-lhe o caminho para a glória militar.",
            "image_url": "/img/quiz/julio_cesar_rubicao.jpg"
        },
        {
            "question": "Por qual motivo Júlio César desobedeceu às ordens de Pompeu e do Senado e como ele conquistou o poder em Roma?",
            "answer": "Porque o Senado ordenou que ele desmobilizasse suas tropas; César desobedeceu cruzando o rio Rubicão com suas legiões armadas e derrotou Pompeu.",
            "distractors": [
                "Porque Pompeu convidou César para morar no Egito; César recusou o convite e decidiu viver como filósofo isolado na Grécia.",
                "Porque o Senado entregou a coroa pacificamente a César em uma cerimônia sem que ele precisasse marchar com exército.",
                "Porque os soldados de César se recusaram a lutar e fugiram para a África, deixando Pompeu governando sozinho sem oposição."
            ],
            "explanation": "Ao marchar com o exército sobre o rio Rubicão em 49 a.C. ('A sorte está lançada'), César iniciou a guerra civil que lhe deu o governo.",
            "cronica": "Às margens do Rubicão, o destino de Roma foi selado: o passo de César transformou a República em um governo centralizado.",
            "image_url": "/img/quiz/julio_cesar_rubicao.jpg"
        },
        {
            "question": "Quais foram as principais reformas e melhorias sociais implementadas por Júlio César durante o seu governo?",
            "answer": "Reformou o calendário criando o calendário juliano (365 dias e ano bissexto), distribuiu terras aos veteranos e construiu grandes obras públicas.",
            "distractors": [
                "Proibiu o uso de calendários, destruiu as estradas de pedra e confiscou as terras dos camponeses para entregar a reis inimigos.",
                "Aumentou os impostos sobre os mais pobres, fechou as escolas de retórica e cancelou o fornecimento de trigo para a população.",
                "Substituiu a língua latina pelo grego antigo em todos os tribunais e cancelou o direito de cidadania de todos os soldados."
            ],
            "explanation": "César organizou a administração pública, ajustou a contagem do tempo no calendário e ofereceu trabalho e terras ao povo romano.",
            "cronica": "Aion observa o tempo ajustado no calendário juliano: uma reforma que serviu de base para a contagem dos dias até a era moderna."
        },
        {
            "question": "Por que os senadores conspiraram contra Júlio César, como ele foi assassinado e quem assumiu o governo após sua morte?",
            "answer": "Os senadores temiam que César se tornasse rei absoluto; ele foi assassinado no Senado nos Idos de Março (44 a.C.) e seu jovem herdeiro Otávio assumiu o poder.",
            "distractors": [
                "Os senadores apoiaram César até a velhice; ele faleceu dormindo em seu palácio e seu general Pompeu governou no dia seguinte.",
                "Os senadores odiavam César porque ele queria morar na Espanha; ele foi envenenado no mar por piratas e marinheiros governaram.",
                "Os senadores apoiaram César mas ele foi capturado em uma batalha na Gália, permitindo que os gauleses governassem a cidade."
            ],
            "explanation": "César foi assassinado em 44 a.C. por senadores republicanos. Seu sobrinho e herdeiro adotivo, Otávio, venceu os rivais e governou Roma.",
            "cronica": "Nos Idos de Março, os punhais feriram o ditador, mas o jovem Otávio ergueria sobre suas cinzas o Primeiro Império."
        }
    ]

    for qd in fc20_questions:
        QuizQuestion.objects.create(
            topic=topic_fc20,
            question=qd["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[qd["answer"]] + qd["distractors"],
            answer=qd["answer"],
            explanation=qd["explanation"],
            cronica_do_guardiao=qd["cronica"],
            has_image=bool(qd.get("image_url")),
            image_url=qd.get("image_url")
        )

    # ==========================================
    # 5. FLASHCARD 21 – REINADO DE CÉSAR AUGUSTO
    # ==========================================
    topic_fc21 = QuizTopic.objects.create(
        name="Flashcard 21 – Reinado de César Augusto",
        subject=subject_hist,
        grade=grade3,
        assessment=assessment_av2
    )

    fc21_questions = [
        {
            "question": "Quem se tornou o PRIMEIRO imperador oficial de Roma, qual nome venerável ele recebeu e qual o significado desse título?",
            "answer": "Otávio tornou-se o primeiro imperador, assumindo o nome de César Augusto, título supremo que significa 'Venerável', 'Sagrado' ou 'Elevado'.",
            "distractors": [
                "Pompeu tornou-se o primeiro imperador, assumindo o nome de Pompeu Magno, título que significa 'O Construtor de Pontes de Pedra'.",
                "Marco Antônio tornou-se o primeiro imperador, assumindo o nome de Antônio Rei, título que significa 'O Guerreiro dos Mares'.",
                "Bruto tornou-se o primeiro imperador, assumindo o nome de Bruto o Jovem, título que significa 'O Orador da Assembleia'."
            ],
            "explanation": "Em 27 a.C., o Senado concedeu a Otávio o título sacrossanto de Augusto, dando início ao período imperial de Roma.",
            "cronica": "Aion contempla a coroação de Augusto: a sabedoria e a autoridade do novo imperador trouxeram estabilidade ao império."
        },
        {
            "question": "O que significa o termo 'Pax Romana' e como essa nova época influenciou o desenvolvimento do Império durante o governo de César Augusto?",
            "answer": "Significa 'Paz Romana', um longo período de cerca de 200 anos de estabilidade, segurança nas fronteiras, prosperidade no comércio e avanço cultural.",
            "distractors": [
                "Significa 'Guerra em Roma', um período de conflitos urbanos que destruiu os monumentos e paralisou o comércio por dois séculos.",
                "Significa 'Imposto Romano', um conjunto de leis fiscais que confiscava os bens dos agricultores para financiar banquetes reais.",
                "Significa 'Pacto de Troia', um acordo diplomático no qual Roma vendeu suas províncias para os reis comerciantes da Ásia."
            ],
            "explanation": "A Pax Romana permitiu a circulação segura de produtos e ideias por estradas e mares protegidos pelas legiões imperiais.",
            "cronica": "Sob o manto da Pax Romana, o comércio floresceu e as cidades romanas viveram anos de prosperidade e paz."
        },
        {
            "question": "Quais melhorias administrativas e urbanas foram criadas por César Augusto para beneficiar os moradores das cidades romanas?",
            "answer": "Criou os 'graneleiros reais' para garantir a distribuição de trigo à população, além de organizar bombeiros e guarda de segurança urbana.",
            "distractors": [
                "Proibiu a venda de grãos nas praças, fechou o porto do rio Tibre e demitiu todos os guardas e bombeiros da cidade.",
                "Aumentou os preços dos alimentos, vendeu os aquedutos para particulares e proibiu a construção de novas casas nas províncias.",
                "Ergueu muros internos para separar os cidadãos e proibiu a entrada de azeite e trigo trazidos pelos navios coloniais."
            ],
            "explanation": "Augusto preocupou-se com a ordem e a alimentação do povo, criando graneleiros públicos, corpo de bombeiros (vigiles) e polícia.",
            "cronica": "Aion observa o cuidado do imperador: ao proteger as cidades contra o fogo e a fome, Augusto conquistou a admiração de Roma."
        },
        {
            "question": "Qual imperador governava o Império Romano quando Jesus Cristo nasceu em Belém da Judeia?",
            "answer": "César Augusto, que emitiu o decreto para o recenseamento de todo o império quando Jesus nasceu na Judeia (Lucas 2:1).",
            "distractors": [
                "Júlio César, que já havia falecido mais de quarenta anos antes do nascimento de Cristo na região da Judeia.",
                "Nero, que governou muitos anos depois durante as primeiras perseguições aos cristãos nas arenas de Roma.",
                "Alexandre o Grande, rei grego da Macedônia que viveu e governou três séculos antes da era cristã."
            ],
            "explanation": "O Evangelho de Lucas (2:1) registra que o nascimento de Cristo em Belém ocorreu durante o reinado do imperador César Augusto.",
            "cronica": "O Guardião Aion curva-se diante do tempo histórico: sob o governo do imperador Augusto na distante Roma, nasce o Salvador em Belém."
        }
    ]

    for qd in fc21_questions:
        QuizQuestion.objects.create(
            topic=topic_fc21,
            question=qd["question"],
            type="multiple_choice",
            difficulty="medium",
            options=[qd["answer"]] + qd["distractors"],
            answer=qd["answer"],
            explanation=qd["explanation"],
            cronica_do_guardiao=qd["cronica"],
            has_image=bool(qd.get("image_url")),
            image_url=qd.get("image_url")
        )

    print("Successfully built Theo (3º ano - AV2) question bank strictly matching Flashcards 18-21 and Revision Sheet photos!")

    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    build_theo_strict_av2()
