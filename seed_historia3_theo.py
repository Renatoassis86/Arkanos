import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

def seed_historia3_theo():
    print("Seeding 50 History AV2 (3º Ano - Theo) questions for Desafio dos Sábios...")

    grade, _ = QuizGrade.objects.get_or_create(name="3º ano")
    subject, _ = QuizSubject.objects.get_or_create(name="História")
    assessment, _ = QuizAssessment.objects.get_or_create(
        name="AV2", grade=grade, subject=subject
    )

    questions_data = [
        # =========================================================================
        # EIXO 1: JÚLIO CÉSAR E AS REFORMAS DE ROMA (10 Questões)
        # =========================================================================
        {
            "id": "HIST3_THEO_001",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Quem foi o famoso líder romano que nasceu em uma família de patrícios (nobres) e conquistou a região da Gália em 58 a.C.?",
            "alternativas": ["Júlio César", "César Augusto", "Brutus", "Marco Antônio"],
            "resposta": "Júlio César",
            "explicacao": "Júlio César nasceu em uma família patrícia e tornou-se um grande general ao conquistar a Gália.",
            "cronica_do_guardiao": "Júlio César estudou história, matemática, música e retórica para se tornar um líder admirado.",
            "imagem_prompt": "Ilustracao didatica infantil de Julio Cesar vestindo túnica nobre e capa romana, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de Júlio César",
            "image_url": "/static/img/quiz/historia3/hist3_theo_001.png"
        },
        {
            "id": "HIST3_THEO_002",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual importante lei social foi aprovada por Júlio César para proteger as pessoas pobres de Roma?",
            "alternativas": ["Proibiu a prática de vender pessoas como escravas por causa de dívidas", "Proibiu o uso de água nas cidades", "Obrigou todos a morarem no campo", "Proibiu o ensino da matemática"],
            "resposta": "Proibiu a prática de vender pessoas como escravas por causa de dívidas",
            "explicacao": "Júlio César acabou com a escravidão por dívidas, ajudando os cidadãos romanos mais humildes.",
            "cronica_do_guardiao": "Abolir a escravidão por dívidas foi uma medida justa que trouxe alívio aos cidadãos de Roma.",
            "imagem_prompt": "Ilustracao didatica de Julio Cesar assinando um decreto de protecao aos cidadaos de Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração de Júlio César aprovando leis mais justas",
            "image_url": "/static/img/quiz/historia3/hist3_theo_002.png"
        },
        {
            "id": "HIST3_THEO_003",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual mudança famosa Júlio César fez na contagem do tempo para organizar o ano em 365 dias?",
            "alternativas": ["Criou um novo calendário (Calendário Juliano) semelhante ao que usamos hoje", "Cancelou todos os meses do ano", "Criou um ano com 1000 dias", "Proibiu o uso do relógio de sol"],
            "resposta": "Criou um novo calendário (Calendário Juliano) semelhante ao que usamos hoje",
            "explicacao": "Ele ajustou o calendário solar em 365 dias e 12 meses, servindo de base para o calendário atual.",
            "cronica_do_guardiao": "O calendário Juliano organizou as estações do ano e as colheitas para todo o Império.",
            "imagem_prompt": "Ilustracao didatica de um pergaminho romano com o calendario dos 12 meses, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático do calendário romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_003.png"
        },
        {
            "id": "HIST3_THEO_004",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe as realizações de Júlio César. Além de reformar leis e o calendário, o que mais ele construiu na cidade de Roma?",
            "alternativas": ["Construiu muitos edifícios públicos, melhorou a cunhagem de moedas e tornou os impostos mais justos", "Construiu castelos de gelo no deserto", "Destruiu todos os prédios de pedra", "Proibiu a circulação de moedas"],
            "resposta": "Construiu muitos edifícios públicos, melhorou a cunhagem de moedas e tornou os impostos mais justos",
            "explicacao": "Ele investiu em obras públicas, praças e edifícios que embelezavam e organizavam a capital romana.",
            "cronica_do_guardiao": "Roma ganhou praças, monumentos e mercados sob o governo de Júlio César.",
            "imagem_prompt": "Ilustracao didatica das belas construções de pedra na cidade de Roma Antiga, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho das construções públicas em Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_004.png"
        },
        {
            "id": "HIST3_THEO_005",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Em qual data marcante Júlio César foi apunhalado no Senado Romano por um grupo de conspiradores liderados por Brutus?",
            "alternativas": ["15 de março de 44 a.C.", "7 de setembro de 1822", "1 de janeiro de 1500", "25 de dezembro de 1 d.C."],
            "resposta": "15 de março de 44 a.C.",
            "explicacao": "Em 15 de março de 44 a.C., membros do Senado atacaram Júlio César por medo de seu grande poder político.",
            "cronica_do_guardiao": "A data de 15 de março marcou o fim trágico de um dos maiores governantes da Antiguidade.",
            "imagem_prompt": "Ilustracao didatica escolar do Senado Romano historico em colunas de marmore, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático do Senado Romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_005.png"
        },
        {
            "id": "HIST3_THEO_006",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Júlio César era muito amado pelo povo romano por causa das melhorias que fez na cidade.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "O povo aclamava César por suas leis populares, obras e distribuição de trigo nas crises.",
            "cronica_do_guardiao": "As reformas populares de Júlio César garantiram o carinho e o apoio da população romana.",
            "imagem_prompt": "Ilustracao didatica do povo romano aclamando Julio Cesar em um desfile vitorioso, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho do povo romano aclamando Júlio César",
            "image_url": "/static/img/quiz/historia3/hist3_theo_006.png"
        },
        {
            "id": "HIST3_THEO_007",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quais duas línguas e matérias Júlio César estudou em sua juventude para se tornar um bom orador?",
            "alternativas": ["Latim, grego, literatura, matemática, música e retórica", "Japonês e inglês moderno", "Apenas desenho animado", "Apenas navegação a vela"],
            "resposta": "Latim, grego, literatura, matemática, música e retórica",
            "explicacao": "A educação nobre em Roma incluía idiomas clássicos, ciências e retórica (a arte de discursar em público).",
            "cronica_do_guardiao": "A dedicação aos estudos desde jovem preparou César para liderar com inteligência e eloqüência.",
            "imagem_prompt": "Desenho didatico de um jovem estudante romano lendo rulos de papiro, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de estudante romano com papiros",
            "image_url": "/static/img/quiz/historia3/hist3_theo_007.png"
        },
        {
            "id": "HIST3_THEO_008",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quem foi o jovem herdeiro de Júlio César que se uniu a Marco Antônio para governar Roma após a morte de César?",
            "alternativas": ["Otávio (futuro César Augusto)", "D. Pedro I", "Romulo e Remo", "Alexandre o Grande"],
            "resposta": "Otávio (futuro César Augusto)",
            "explicacao": "Otávio era o jovem sobrinho e herdeiro adotivo de Júlio César que assumiu o comando de Roma.",
            "cronica_do_guardiao": "Otávio herdou o nome e a liderança de César, preparando o caminho para o Império Romano.",
            "imagem_prompt": "Ilustracao didatica do jovem Otavio Augusto assumindo o comando em Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração do jovem Otávio em Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_008.png"
        },
        {
            "id": "HIST3_THEO_009",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência cronológica dos fatos da vida de Júlio César?",
            "alternativas": ["Estudos na juventude -> Conquista da Gália -> Invadiu Roma e aprovou reformas -> Foi apunhalado no Senado em 44 a.C.", "Apunhalado no Senado -> Conquista da Gália -> Nascimento em Roma -> Calendário Juliano", "Reinado de César Augusto -> Nascimento de Cristo -> Morte de Júlio César", "Abertura dos Portos -> Júlio César vira imperador -> Guerra da Gália"],
            "resposta": "Estudos na juventude -> Conquista da Gália -> Invadiu Roma e aprovou reformas -> Foi apunhalado no Senado em 44 a.C.",
            "explicacao": "César estudou, tornou-se general vitorioso na Gália, assumiu o governo em Roma e foi assassinado em 44 a.C.",
            "cronica_do_guardiao": "Uma trajetória histórica marcante que transformou os rumos de Roma para sempre.",
            "imagem_prompt": "Linha do tempo didatica ilustrada com os marcos da vida de Julio Cesar, estilo Arkanos 3 ano",
            "imagem_alt": "Linha do tempo didática de Júlio César",
            "image_url": "/static/img/quiz/historia3/hist3_theo_009.png"
        },
        {
            "id": "HIST3_THEO_010",
            "tema": "Júlio César e as Reformas de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que significa a palavra 'retórica', uma das disciplinas estudadas pelos nobres em Roma?",
            "alternativas": ["A arte de fazer discursos persuasivos e bem argumentados em público", "O treino para nadar nos rios", "A pintura em quadros de madeira", "A fabricação de moedas de prata"],
            "resposta": "A arte de fazer discursos persuasivos e bem argumentados em público",
            "explicacao": "Saber falar bem em público (retórica) era essencial para convencer o povo e os senadores romanos.",
            "cronica_do_guardiao": "A palavra bem dita tinha grande poder nas assembleias da Roma Antiga.",
            "imagem_prompt": "Ilustracao didatica de um orador romano discursando para a multidão na praça publica, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de orador romano discursando",
            "image_url": "/static/img/quiz/historia3/hist3_theo_010.png"
        },

        # =========================================================================
        # EIXO 2: CÉSAR AUGUSTO E A PAX ROMANA (10 Questões)
        # =========================================================================
        {
            "id": "HIST3_THEO_011",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Quem foi considerado o PRIMEIRO IMPERADOR oficial de Roma a partir do ano 27 a.C.?",
            "alternativas": ["César Augusto (Otávio)", "Júlio César", "Marco Antônio", "Brutus"],
            "resposta": "César Augusto (Otávio)",
            "explicacao": "Otávio recebeu o título de 'Augusto' (que significa honrado/sagrado) e tornou-se o primeiro imperador de Roma.",
            "cronica_do_guardiao": "Com César Augusto, Roma deixou de ser uma República e transformou-se no grande Império Romano.",
            "imagem_prompt": "Ilustracao didatica nobre do Imperador Cesar Augusto com coroa de louros e túnica imperial, estilo Arkanos 3 ano",
            "imagem_alt": "Retrato didático do Imperador César Augusto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_011.png"
        },
        {
            "id": "HIST3_THEO_012",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como era chamado o período prolongado de paz, estabilidade e prosperidade vivenciado durante o reinado de César Augusto?",
            "alternativas": ["Pax Romana (Paz Romana)", "Guerra dos Cem Anos", "Bloqueio Continental", "Revolução do Porto"],
            "resposta": "Pax Romana (Paz Romana)",
            "explicacao": "A Pax Romana garantiu segurança nas estradas e mares, permitindo o florescimento do comércio e das artes por todo o império.",
            "cronica_do_guardiao": "Sob a Pax Romana, as cidades puderam crescer em segurança e desenvolver grandes obras.",
            "imagem_prompt": "Ilustracao didatica representando a paz e a prosperidade na cidade de Roma sob a Pax Romana, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático simbolizando a Pax Romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_012.png"
        },
        {
            "id": "HIST3_THEO_013",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual fato de enorme importância histórica mundial aconteceu na cidade de Belém durante o governo do imperador César Augusto?",
            "alternativas": ["O nascimento de Jesus Cristo", "A invenção do navio a vapor", "A descoberta do Brasil", "A criação da imprensa de papel"],
            "resposta": "O nascimento de Jesus Cristo",
            "explicacao": "Jesus Cristo nasceu na Judeia (cidade de Belém), região que estava sob o domínio do Império Romano governado por César Augusto.",
            "cronica_do_guardiao": "No pequeno povoado de Belém sob controle de Roma, nasceu Aquele que mudaria a história da humanidade.",
            "imagem_prompt": "Ilustracao didatica da estrela de Belem brilhando sobre a cidade na época do Imperio Romano, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático da estrela de Belém no período romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_013.png"
        },
        {
            "id": "HIST3_THEO_014",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Como César Augusto organizou a administração do império para garantir que tudo funcionasse bem nas províncias?",
            "alternativas": ["Nomeou de 30 a 40 autoridades de sua confiança como secretários, advogados, chefes do tesouro e graneleiros reais", "Governou sozinho sem ajuda de ninguém", "Mandou fechar todas as estradas", "Entregou o governo para o exército inimigo"],
            "resposta": "Nomeou de 30 a 40 autoridades de sua confiança como secretários, advogados, chefes do tesouro e graneleiros reais",
            "explicacao": "Augusto criou um corpo de funcionários eficientes encarregados de cobrar impostos justos, distribuir trigo e manter a ordem pública.",
            "cronica_do_guardiao": "Uma rede organizada de administradores garantia o abastecimento de trigo e a justiça em cada região de Roma.",
            "imagem_prompt": "Ilustracao didatica de administradores romanos organizando grãos e documentos reais no forum, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração dos administradores do Império Romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_014.png"
        },
        {
            "id": "HIST3_THEO_015",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Durante o reinado de César Augusto, o governo de Roma mudou da forma de República para a forma de Império.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Com a centralização do poder nas mãos do imperador Augusto, Roma passou oficialmente do período Republicano para o Imperial.",
            "cronica_do_guardiao": "Uma transição marcante onde o imperador passou a ter controle sobre o exército e o tesouro real.",
            "imagem_prompt": "Esquema didatico mostrando a mudanca de Republica Romana para Imperio Romano com a coroa de Augusto, estilo Arkanos 3 ano",
            "imagem_alt": "Esquema didático da transição de República para Império",
            "image_url": "/static/img/quiz/historia3/hist3_theo_015.png"
        },
        {
            "id": "HIST3_THEO_016",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Por quantos anos César Augusto governou Roma como imperador, trazendo tantas melhorias que o povo aceitou o seu reinado individual?",
            "alternativas": ["45 anos", "Apenas 2 dias", "1000 anos", "5 meses"],
            "resposta": "45 anos",
            "explicacao": "Augusto governou por 45 anos (de 27 a.C. a 14 d.C.), um dos reinados mais longos e prósperos da história de Roma.",
            "cronica_do_guardiao": "Quase meio século de governo que consolidou as fronteiras e as leis de Roma.",
            "imagem_prompt": "Ilustracao didatica de estatuas de marmore de Cesar Augusto ao longo dos anos, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho de estátua de César Augusto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_016.png"
        },
        {
            "id": "HIST3_THEO_017",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que significa o título 'Augusto', concedido ao imperador pelo Senado Romano?",
            "alternativas": ["Honrado ou Sagrado", "Guerreiro Bravo", "Rei do Ouro", "Marinheiro Solitário"],
            "resposta": "Honrado ou Sagrado",
            "explicacao": "O termo 'Augusto' era um título de grande respeito que significava alguém elevado, honrado e digno de veneração.",
            "cronica_do_guardiao": "Receber o título de Augusto demonstrava a posição suprema do imperador na sociedade romana.",
            "imagem_prompt": "Ilustracao didatica de senadores romanos concedendo o titulo de Augusto a Otavio, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho dos senadores concedendo o título de Augusto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_017.png"
        },
        {
            "id": "HIST3_THEO_018",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o mapa do Império Romano no século I. Como o exército romano sob comando de Augusto garantia a segurança dos cidadãos?",
            "alternativas": ["Protegendo as fronteiras contra invasões e mantendo a ordem nas estradas comerciais", "Proibindo a navegação de barcos", "Obrigando todos a morarem fora das cidades", "Destruindo os templos de pedra"],
            "resposta": "Protegendo as fronteiras contra invasões e mantendo a ordem nas estradas comerciais",
            "explicacao": "O exército profissional mantinha postos de guarda nas fronteiras e patrulhava as estradas para evitar assaltos ao comércio.",
            "cronica_do_guardiao": "Guardas e legiões romanas garantiam a circulação segura de produtos por todo o Mediterrâneo.",
            "imagem_prompt": "Mapa historico didatico infantil do Imperio Romano banhado pelo Mar Mediterraneo, estilo Arkanos 3 ano",
            "imagem_alt": "Mapa didático do Império Romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_018.png"
        },
        {
            "id": "HIST3_THEO_019",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "O que eram os 'graneleiros reais' nomeados por César Augusto?",
            "alternativas": ["Autoridades responsáveis por armazenar e distribuir grãos (como o trigo) para alimentar a população de Roma", "Soldados que cuidavam dos cavalos", "Fabricantes de roupas de lã", "Mestres de música do palácio"],
            "resposta": "Autoridades responsáveis por armazenar e distribuir grãos (como o trigo) para alimentar a população de Roma",
            "explicacao": "Garantir o suprimento diário de trigo e pão era fundamental para evitar a fome e rebeliões na capital imperial.",
            "cronica_do_guardiao": "Os armazéns de grãos cheios garantiam a mesa farta para milhares de famílias em Roma.",
            "imagem_prompt": "Ilustracao didatica de sacos de trigo sendo descarregados nos armazens reais de Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho dos armazéns reais de trigo em Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_019.png"
        },
        {
            "id": "HIST3_THEO_020",
            "tema": "César Augusto e a Pax Romana",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "A Pax Romana ajudou no crescimento do comércio porque as pessoas podiam viajar e negociar com segurança pelas estradas romanas.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Com estradas bem mantidas e sem guerras internas, mercadores viajavam com facilidade vendendo azeite, trigo, tecidos e cerâmicas.",
            "cronica_do_guardiao": "Comerciantes de distantes terras podiam trocar produtos sob a proteção das leis romanas.",
            "imagem_prompt": "Ilustracao didatica de comerciantes viajando felizes por uma via romana pavimentada, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho de comerciantes viajando em estrada romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_020.png"
        },

        # =========================================================================
        # EIXO 3: ENGENHARIA E ESTRUTURA URBANA DE ROMA (10 Questões)
        # =========================================================================
        {
            "id": "HIST3_THEO_021",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual invenção fantástica da engenharia romana trazia água limpa de nascentes distantes através de grandes pontes de arcos até o centro das cidades?",
            "alternativas": ["Aquedutos", "Caravelas", "Piramides", "Moinhos de Vento"],
            "resposta": "Aquedutos",
            "explicacao": "Os aquedutos romanas eram construções geniais que transportavam água potável por quilômetros aproveitando a gravidade.",
            "cronica_do_guardiao": "Pontes de arcos de pedra levavam água pura das montanhas direto para as fontes e banhos da cidade.",
            "imagem_prompt": "Ilustracao didatica de um aqueduto romano com arcos de pedra trazendo agua limpa, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de um aqueduto romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_021.png"
        },
        {
            "id": "HIST3_THEO_022",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Para que serviam as famosos 'Estradas Romanas' (Vias Romanas) pavimentadas com pedras?",
            "alternativas": ["Para ligar Roma a todas as províncias, facilitando o transporte de tropas, mercadorias, mensagens e viajantes", "Apenas para corridas de cavalo em domingos", "Para plantar vegetais nas calçadas", "Para proibir a passagem de pedestres"],
            "resposta": "Para ligar Roma a todas as províncias, facilitando o transporte de tropas, mercadorias, mensagens e viajantes",
            "explicacao": "As estradas bem construídas com camadas de pedras duravam séculos e originaram o famoso ditado 'todos os caminhos levam a Roma'.",
            "cronica_do_guardiao": "Milhares de quilômetros de estradas pavimentadas conectavam o vasto império como veias de pedra.",
            "imagem_prompt": "Ilustracao didatica de uma via romana pavimentada com pedras alinhadas e soldados caminhando, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de uma estrada romana pavimentada",
            "image_url": "/static/img/quiz/historia3/hist3_theo_022.png"
        },
        {
            "id": "HIST3_THEO_023",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe as construções públicas de Roma. O que eram as 'Termas' nas cidades romanas?",
            "alternativas": ["Grandes edifícios de banhos públicos onde as pessoas se lavavam, praticavam exercícios e conversavam", "Fábricas de trigo e pão", "Prisões escuras de madeira", "Garagens de carruagens"],
            "resposta": "Grandes edifícios de banhos públicos onde as pessoas se lavavam, praticavam exercícios e conversavam",
            "explicacao": "As termas eram centros comunitários com piscinas aquecidas, frias e jardins onde os cidadãos relaxavam e conviviam.",
            "cronica_do_guardiao": "Nas termas, os cidadãos romanos cuidavam da saúde do corpo e encontravam os amigos no fim do dia.",
            "imagem_prompt": "Ilustracao didatica de uma terma romana com piscina de agua limpa e colunas de marmore, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático das termas romanas",
            "image_url": "/static/img/quiz/historia3/hist3_theo_023.png"
        },
        {
            "id": "HIST3_THEO_024",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual era o nome do enorme anfiteatro de pedra em Roma usado para grandes espetáculos e jogos de gladiadores?",
            "alternativas": ["Coliseu (Anfiteatro Flávio)", "Parthenon", "Torre de Pisa", "Big Ben"],
            "resposta": "Coliseu (Anfiteatro Flávio)",
            "explicacao": "O Coliseu é o monumento mais famoso de Roma, capaz de receber mais de 50 mil espectadores.",
            "cronica_do_guardiao": "Uma obra-prima da arquitetura antiga que impressiona visitantes até os dias de hoje.",
            "imagem_prompt": "Ilustracao didatica do majestoso Coliseu de Roma sob ceu azul, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático do Coliseu de Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_024.png"
        },
        {
            "id": "HIST3_THEO_025",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que era o 'Fórum Romano' no centro da cidade de Roma?",
            "alternativas": ["A praça principal onde ficavam os edifícios do governo, mercados, tribunais e templos", "Um parque de diversões aquático", "Uma floresta fechada sem casas", "Um navio de transporte"],
            "resposta": "A praça principal onde ficavam os edifícios do governo, mercados, tribunais e templos",
            "explicacao": "O Fórum era o coração político, comercial e religioso onde a vida pública da cidade acontecia.",
            "cronica_do_guardiao": "No Fórum, cidadãos se reuniam para ouvir discursos, fazer compras e acompanhar julgamentos.",
            "imagem_prompt": "Ilustracao didatica do Forum Romano com cidadãos caminhando entre colunas e templos, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração do Fórum Romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_025.png"
        },
        {
            "id": "HIST3_THEO_026",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "A água trazida pelos aquedutos romanos servia para abastecer fontes públicas, banhos urbanos e casas de cidadãos.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "A engenharia dos aquedutos trazia milhões de litros de água fresca diariamente para garantir a higiene e saúde da população.",
            "cronica_do_guardiao": "Água encanada em abundância tornou as cidades romanas muito avançadas para a sua época.",
            "imagem_prompt": "Ilustracao didatica de uma fonte publica romana com agua jorrando para os cidadaos, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho de fonte pública romana abastecida por aqueduto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_026.png"
        },
        {
            "id": "HIST3_THEO_027",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual elemento arquitetônico em formato de curva permitiu aos engenheiros romanos construir aquedutos tão altos e resistentes?",
            "alternativas": ["O Arco de pedra", "A pirâmide pontuda", "A estaca de madeira fina", "O telhado de palha"],
            "resposta": "O Arco de pedra",
            "explicacao": "O arco distribui o peso das pedras para os lados de forma perfeita, permitindo erguer pontes altíssimas sem desabar.",
            "cronica_do_guardiao": "O segredo da força dos aquedutos estava na curva perfeita dos arcos de pedra.",
            "imagem_prompt": "Desenho didatico mostrando o funcionamento de um arco romano de pedra sustentando peso, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático do arco de pedra romano",
            "image_url": "/static/img/quiz/historia3/hist3_theo_027.png"
        },
        {
            "id": "HIST3_THEO_028",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Por que o famoso ditado diz que 'Todos os caminhos levam a Roma'?",
            "alternativas": ["Porque a rede de estradas romanas começava na cidade de Roma e se espalhava para todos os cantos do império", "Porque só existia uma rua no mundo inteiro", "Porque os rios corriam ao contrário", "Porque as estradas eram feitas de ouro"],
            "resposta": "Porque a rede de estradas romanas começava na cidade de Roma e se espalhava para todos os cantos do império",
            "explicacao": "A capital era o ponto central de partida de todas as grandes vias públicas pavimentadas.",
            "cronica_do_guardiao": "Não importava onde você estivesse no império, seguindo a via principal você chegaria a Roma.",
            "imagem_prompt": "Ilustracao didatica de um marco zero de pedra em Roma com caminhos se dividindo, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração didática do marco zero das estradas romanas",
            "image_url": "/static/img/quiz/historia3/hist3_theo_028.png"
        },
        {
            "id": "HIST3_THEO_029",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência de construção de uma cidade romana bem planejada?",
            "alternativas": ["Traçado das estradas -> Construção do Fórum e edifícios -> Erguimento de aquedutos para água -> Abertura de termas e anfiteatros", "Abertura de anfiteatros -> Destruição de estradas -> Falta de água", "Construção de banhos -> Fechamento de portos -> Fim da cidade", "Sem planejamento algum"],
            "resposta": "Traçado das estradas -> Construção do Fórum e edifícios -> Erguimento de aquedutos para água -> Abertura de termas e anfiteatros",
            "explicacao": "Os romanos eram urbanistas exemplares: planejavam a rede viária, o centro administrativo e o saneamento antes de inaugurar os espaços de lazer.",
            "cronica_do_guardiao": "Planejamento e engenharia transformaram pequenas vilas em metrópoles organizadas.",
            "imagem_prompt": "Maquete didatica escolar de uma cidade romana planejada vista de cima, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de maquete de cidade romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_029.png"
        },
        {
            "id": "HIST3_THEO_030",
            "tema": "Engenharia Urbana de Roma",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como era chamado o cimento resistente inventado pelos romanos misturando cinzas vulcânicas e argamassa?",
            "alternativas": ["Concreto Romano (Opus Caementicium)", "Gesso escolar", "Barro seco", "Cola de madeira"],
            "resposta": "Concreto Romano (Opus Caementicium)",
            "explicacao": "O concreto romano endurecia até debaixo d'água, permitindo construir pontes, portos e cúpulas que duram milhares de anos.",
            "cronica_do_guardiao": "A fórmula do concreto romano permitiu erguer monumentos eternos que resistiram ao tempo.",
            "imagem_prompt": "Ilustracao didatica de construtores romanos misturando concreto para erguer monumentos de pedra, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho de construtores romanos preparando concreto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_030.png"
        },

        # =========================================================================
        # EIXO 4: SOCIEDADE, EXÉRCITO E TECNOLOGIA ROMANA (10 Questões)
        # =========================================================================
        {
            "id": "HIST3_THEO_031",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Como eram chamados os nobres e grandes proprietários de terras na sociedade de Roma?",
            "alternativas": ["Patrícios", "Plebeus", "Gladiadores", "Escravizados"],
            "resposta": "Patrícios",
            "explicacao": "Os patrícios formavam a classe alta e nobre de Roma, descendentes dos fundadores da cidade.",
            "cronica_do_guardiao": "Os patrícios ocupavam os cargos do Senado e possuíam as maiores propriedades de terras.",
            "imagem_prompt": "Ilustracao didatica de nobres patricios romanos conversando vestindo togas brancas finas, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de patrícios romanos",
            "image_url": "/static/img/quiz/historia3/hist3_theo_031.png"
        },
        {
            "id": "HIST3_THEO_032",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Como era chamada a maioria da população trabalhadora de Roma composta por camponeses, artesãos e pequenos comerciantes?",
            "alternativas": ["Plebeus", "Patrícios", "Imperadores", "Reis"],
            "resposta": "Plebeus",
            "explicacao": "Os plebeus eram os cidadãos comuns que lutaram ao longo do tempo para conquistar direitos e representação política.",
            "cronica_do_guardiao": "Com seu trabalho e união, os plebeus conquistaram leis escritas e o direito de participar do governo.",
            "imagem_prompt": "Ilustracao didatica de artesãos e feirantes plebeus trabalhando no mercado de Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de plebeus romanos no mercado",
            "image_url": "/static/img/quiz/historia3/hist3_theo_032.png"
        },
        {
            "id": "HIST3_THEO_033",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como eram chamadas as unidades militares organizadas e altamente treinadas do exército de Roma?",
            "alternativas": ["Legiões Romanas (Soldados Legionários)", "Tribos da Mata", "Tropas de Cavalaria Voadora", "Esquadras de Piratas"],
            "resposta": "Legiões Romanas (Soldados Legionários)",
            "explicacao": "As legiões eram o coração do exército romano, conhecidas por sua disciplina, escudos retangulares e táticas de combate.",
            "cronica_do_guardiao": "A disciplina e o treinamento dos legionários garantiram as vitórias militares de Roma por séculos.",
            "imagem_prompt": "Ilustracao didatica de legionarios romanos organizados com escudos vermelhos e armaduras de metal, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de legionários romanos",
            "image_url": "/static/img/quiz/historia3/hist3_theo_033.png"
        },
        {
            "id": "HIST3_THEO_034",
            "tema": "Sociedade e Exército Romano",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe a famosa formação defensiva do exército romano conhecida como 'Testudo' (Tartaruga). Como ela funcionava?",
            "alternativas": ["Os soldados juntavam seus escudos na frente, laterais e no teto, criando uma proteção completa contra flechas", "Os soldados se escondiam dentro de cascos de tartaruga gigantes", "Os soldados nadavam nos rios", "Os soldados andavam muito devagar deitados na grama"],
            "resposta": "Os soldados juntavam seus escudos na frente, laterais e no teto, criando uma proteção completa contra flechas",
            "explicacao": "A formação tartaruga alinhava os escudos como uma blindagem impenetrável contra os ataques de projéteis inimigos.",
            "cronica_do_guardiao": "A união dos escudos formava um escudo coletivo forte capaz de proteger toda a unidade.",
            "imagem_prompt": "Ilustracao didatica da formacao tartaruga dos legionarios romanos com escudos unidos no teto, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático da formação tartaruga romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_034.png"
        },
        {
            "id": "HIST3_THEO_035",
            "tema": "Sociedade e Exército Romano",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "O exército romano possuía tecnologia avançada para a época, incluindo catapultas e pontes pré-fabricadas construídas rapidamente.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Os engenheiros militares romanos eram famosos por erguer pontes sobre grandes rios em poucos dias para a passagem de tropas.",
            "cronica_do_guardiao": "Engenharia e disciplina militar caminhavam juntas nas campanhas das legiões.",
            "imagem_prompt": "Desenho didatico de engenheiros romanos construindo uma ponte de madeira sobre um rio para o exercito, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de engenheiros romanos construindo ponte",
            "image_url": "/static/img/quiz/historia3/hist3_theo_035.png"
        },
        {
            "id": "HIST3_THEO_036",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual era o nome da assembleia de nobres idosos e influentes que aconselhava os governantes em Roma?",
            "alternativas": ["Senado Romano", "Conselho da Vila", "Junta de Feirantes", "Tribunal de Justiça"],
            "resposta": "Senado Romano",
            "explicacao": "O Senado era o órgão político mais tradicional de Roma, composto pelos chefes das principais famílias patrícias.",
            "cronica_do_guardiao": "No Senado eram debatidas as leis, as guerras e o orçamento da cidade de Roma.",
            "imagem_prompt": "Ilustracao didatica dos senadores romanos debatendo em um predio circular de marmore, estilo Arkanos 3 ano",
            "imagem_alt": "Ilustração do Senado Romano reunido",
            "image_url": "/static/img/quiz/historia3/hist3_theo_036.png"
        },
        {
            "id": "HIST3_THEO_037",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como eram chamados os representantes eleitos especificamente pelos plebeus para defender seus direitos no governo romano?",
            "alternativas": ["Tribunos da Plebe", "Generais da Gália", "Reis do Senado", "Feitores do Campo"],
            "resposta": "Tribunos da Plebe",
            "explicacao": "Os Tribunos da Plebe podiam vetar leis que fossem prejudiciais aos cidadãos mais humildes.",
            "cronica_do_guardiao": "Os tribunos tinham a missão especial de garantir justiça para os plebeus.",
            "imagem_prompt": "Ilustracao didatica de um Tribuno da Plebe discursando para o povo no Forum, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático do Tribuno da Plebe",
            "image_url": "/static/img/quiz/historia3/hist3_theo_037.png"
        },
        {
            "id": "HIST3_THEO_038",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual era a língua oficial falada no Império Romano que deu origem a idiomas modernos como o português, espanhol, francês e italiano?",
            "alternativas": ["Latim", "Grego Antigo", "Inglês", "Alemão"],
            "resposta": "Latim",
            "explicacao": "O latim era o idioma oficial de Roma. Com o tempo, ele evoluiu nas províncias dando origem às chamadas línguas neolatinas (como a nossa língua portuguesa!).",
            "cronica_do_guardiao": "A nossa língua portuguesa é filha do antigo latim falado pelos romanos.",
            "imagem_prompt": "Ilustracao didatica de um pergaminho com a evolução das palavras do latim para o portugues, estilo Arkanos 3 ano",
            "imagem_alt": "Infográfico da evolução da língua latina para o português",
            "image_url": "/static/img/quiz/historia3/hist3_theo_038.png"
        },
        {
            "id": "HIST3_THEO_039",
            "tema": "Sociedade e Exército Romano",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Os romanos foram grandes construtores e criaram leis escritas (como a Lei das Doze Tábuas) que inspiram a justiça até hoje.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "O Direito Romano e suas leis registradas em tábuas de bronze foram a base para os sistemas jurídicos de muitos países atuais.",
            "cronica_do_guardiao": "Regras escritas e iguais para todos trouxeram segurança e ordem para a sociedade de Roma.",
            "imagem_prompt": "Ilustracao didatica da Lei das Doze Tábuas gravadas em placas de bronze no Forum Romano, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho da Lei das Doze Tábuas romanas",
            "image_url": "/static/img/quiz/historia3/hist3_theo_039.png"
        },
        {
            "id": "HIST3_THEO_040",
            "tema": "Sociedade e Exército Romano",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "O que significa o lema romano registrado nas bandeiras do exército 'SPQR' (Senatus Populusque Romanus)?",
            "alternativas": ["O Senado e o Povo Romano", "Sociedade Para Qualquer Reino", "Soldados Protegem Qualquer Rei", "Sabedoria Para Quem Recita"],
            "resposta": "O Senado e o Povo Romano",
            "explicacao": "SPQR era a sigla oficial que representava a união do Senado com os cidadãos de Roma.",
            "cronica_do_guardiao": "As iniciais SPQR estavam gravadas em cada estandarte, escudo e edifício oficial da cidade.",
            "imagem_prompt": "Ilustracao didatica de um estandarte romano vermelho com as letras douradas SPQR, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho do estandarte militar com as letras SPQR",
            "image_url": "/static/img/quiz/historia3/hist3_theo_040.png"
        },

        # =========================================================================
        # EIXO 5: REVISÃO ESCOLAR DA TIA THAMY (10 Questões)
        # =========================================================================
        {
            "id": "HIST3_THEO_041",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Na folha de revisão da Cidade Viva Academy, como Roma começou a sua história antes de se tornar uma grande potência mundial?",
            "alternativas": ["Começou como uma pequena comunidade de agricultores e pastores de gado na Itália", "Começou como um castelo de gelo", "Começou como uma frota de navios no ar", "Começou como um grande parque temático"],
            "resposta": "Começou como uma pequena comunidade de agricultores e pastores de gado na Itália",
            "explicacao": "Roma nasceu como uma modesta aldeia de agricultores junto ao rio Tibre antes de crescer e conquistar terras.",
            "cronica_do_guardiao": "Pequenas origens nobres deram início à cidade que viria a governar o mundo antigo.",
            "imagem_prompt": "Ilustracao didatica da pequena aldeia inicial de Roma proxima ao rio Tibre, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático da pequena aldeia que deu origem a Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_041.png"
        },
        {
            "id": "HIST3_THEO_042",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Por que Roma foi reconhecida como uma grande liderança no mundo antigo?",
            "alternativas": ["Porque combinou um exército forte, boas estratégias e a superioridade de sua tecnologia urbana", "Porque não tinha soldados", "Porque ficava escondida embaixo da terra", "Porque vendia sorvetes"],
            "resposta": "Porque combinou um exército forte, boas estratégias e a superioridade de sua tecnologia urbana",
            "explicacao": "A força militar somada ao talento dos engenheiros romanos fez de Roma uma potência incomparável.",
            "cronica_do_guardiao": "Estratégia militar e grandes invenções urbanas garantiram a liderança romana.",
            "imagem_prompt": "Ilustracao didatica simbolizando o poder militar e a engenharia de Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho da força e tecnologia de Roma",
            "image_url": "/static/img/quiz/historia3/hist3_theo_042.png"
        },
        {
            "id": "HIST3_THEO_043",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual das seguintes invenções facilitou a vida dos cidadãos romanos nas cidades?",
            "alternativas": ["Construção de aquedutos para trazer água e estradas pavimentadas para transporte", "Invenção do computador de madeira", "Construção de foguetes de papel", "Proibição do uso de sapatos"],
            "resposta": "Construção de aquedutos para trazer água e estradas pavimentadas para transporte",
            "explicacao": "Água encanada fresca e estradas de pedra foram inovações que transformaram a vida urbana.",
            "cronica_do_guardiao": "Aquedutos e estradas trouxeram conforto e comunicação eficiente para o povo.",
            "imagem_prompt": "Infografico didatico escolar 3 ano mostrando aquedutos e estradas romanas juntas, estilo Arkanos",
            "imagem_alt": "Infográfico de aqueduto e estrada romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_043.png"
        },
        {
            "id": "HIST3_THEO_044",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Na revisão da Tia Thamy, aprendemos que os romanos tinham capacidade de organizar a cidade com construções de melhorias públicas.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Os romanos organizavam praças, mercados, banhos e tribunais pensando no bem-estar dos cidadãos.",
            "cronica_do_guardiao": "Organizar o espaço urbano garantiu a beleza e a funcionalidade das cidades romanas.",
            "imagem_prompt": "Ilustracao didatica de uma cidade romana organizada e cheia de vida, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de cidade romana organizada",
            "image_url": "/static/img/quiz/historia3/hist3_theo_044.png"
        },
        {
            "id": "HIST3_THEO_045",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quem foi o famoso general de quem Otávio herdou o nome de César ao se tornar o primeiro imperador?",
            "alternativas": ["Júlio César", "Marco Antônio", "Brutus", "Pompeu"],
            "resposta": "Júlio César",
            "explicacao": "Otávio era sobrinho e herdeiro adotivo de Júlio César, adotando seu nome ao governar Roma.",
            "cronica_do_guardiao": "O nome de César tornou-se sinônimo do próprio cargo de imperador.",
            "imagem_prompt": "Ilustracao didatica relacionando Julio Cesar e Otavio Augusto como grandes governantes de Roma, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho relacionando Júlio César e Otávio Augusto",
            "image_url": "/static/img/quiz/historia3/hist3_theo_045.png"
        },
        {
            "id": "HIST3_THEO_046",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em qual província dominada por Roma Jesus Cristo nasceu durante o reinado de César Augusto?",
            "alternativas": ["Judeia (na cidade de Belém)", "Na cidade de Paris", "Na ilha do Haiti", "No Brasil"],
            "resposta": "Judeia (na cidade de Belém)",
            "explicacao": "A Judeia fazia parte do mapa de províncias controladas pelo Império Romano na época do nascimento de Cristo.",
            "cronica_do_guardiao": "O contexto histórico de Roma envolve o cenário bíblico do nascimento de Jesus em Belém.",
            "imagem_prompt": "Ilustracao didatica mostrando a cidade antiga de Belem sob a admistracao romana, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático da antiga Belém na época romana",
            "image_url": "/static/img/quiz/historia3/hist3_theo_046.png"
        },
        {
            "id": "HIST3_THEO_047",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quais destas opções lista construções feitas pelos romanos nas cidades?",
            "alternativas": ["Pontes, aquedutos, templos, edifícios públicos e banhos termais", "Apenas pirâmides de madeira", "Casas de palha no meio da lagoa", "Apenas fortes de gelo"],
            "resposta": "Pontes, aquedutos, templos, edifícios públicos e banhos termais",
            "explicacao": "A engenharia romana ergueu monumentos permanentes de pedra e concreto que resistiram aos séculos.",
            "cronica_do_guardiao": "Templos, pontes e termas demonstram o talento dos arquitetos de Roma.",
            "imagem_prompt": "Ilustracao didatica agrupando as construções romanas: pontes, templos e aquedutos, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho agrupando as várias construções romanas",
            "image_url": "/static/img/quiz/historia3/hist3_theo_047.png"
        },
        {
            "id": "HIST3_THEO_048",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o soldado romano equipado. Qual era a função do escudo retangular (Scutum) usado pelo legionário?",
            "alternativas": ["Proteger o corpo inteiro do soldado em combates de perto e na formação de defesa coletiva", "Servir como prancha de surfe no mar", "Servir como mesa para comer pão", "Carregar água das fontes"],
            "resposta": "Proteger o corpo inteiro do soldado em combates de perto e na formação de defesa coletiva",
            "explicacao": "O scutum era um escudo grande feito de madeira curvada revestida de couro e metal, essencial para a defesa do soldado.",
            "cronica_do_guardiao": "O escudo curvado de couro e metal garantia a proteção do legionário no campo de batalha.",
            "imagem_prompt": "Ilustracao didatica de um soldado romano com seu escudo grande retangular vermelho (Scutum), estilo Arkanos 3 ano",
            "imagem_alt": "Desenho didático de legionário com seu escudo Scutum",
            "image_url": "/static/img/quiz/historia3/hist3_theo_048.png"
        },
        {
            "id": "HIST3_THEO_049",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Theo estudou bastante com a Tia Thamy na Cidade Viva Academy e está 100% preparado para tirar nota 10 na prova de História da AV2!",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Com dedicação, revisão e o estudo dos mapas e histórias de Roma, o Theo vai gabaritar a prova com honra!",
            "cronica_do_guardiao": "Avante, jovem Sábio Theo! Teus estudos honram o conhecimento e a sabedoria. Você vai dar um show na AV2!",
            "imagem_prompt": "Ilustracao didatica festiva de um jovem estudante sabio celebrando a vitoria nos estudos com o guardiao Aion, estilo Arkanos 3 ano",
            "imagem_alt": "Desenho comemorativo do estudante sábio Theo com o guardião Aion",
            "image_url": "/static/img/quiz/historia3/hist3_theo_049.png"
        },
        {
            "id": "HIST3_THEO_050",
            "tema": "Revisão Escolar da Tia Thamy",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência da Linha do Tempo da História de Roma estudada por Theo?",
            "alternativas": ["Pequena aldeia de agricultores -> Reinado de Júlio César -> Império de César Augusto e Pax Romana -> Nascimento de Cristo em Belém", "Nascimento de Cristo -> Aldeia inicial -> Conquista da Gália -> Calendário Juliano", "Reinado de César Augusto -> Aldeia inicial -> Júlio César -> Guerra de Troia", "Abertura dos Portos -> Júlio César -> Império de Roma"],
            "resposta": "Pequena aldeia de agricultores -> Reinado de Júlio César -> Império de César Augusto e Pax Romana -> Nascimento de Cristo em Belém",
            "explicacao": "Essa é a grande linha do tempo mestra do 3º Ano: das origens da aldeia ao império de Augusto e o nascimento de Cristo.",
            "cronica_do_guardiao": "Parabéns, Theo! Você dominou toda a jornada da Roma Antiga e está pronto para gabaritar a prova da AV2!",
            "imagem_prompt": "Linha do tempo mestra didatica infantil completa com os 4 grandes marcos da Historia de Roma para o 3 ano, estilo Arkanos",
            "imagem_alt": "Linha do tempo mestra da AV2 de História do 3º Ano para Theo",
            "image_url": "/static/img/quiz/historia3/hist3_theo_050.png"
        }
    ]

    created_count = 0
    skipped_count = 0

    for item in questions_data:
        topic_name = item["tema"]
        topic, _ = QuizTopic.objects.get_or_create(
            name=topic_name, subject=subject, grade=grade, assessment=assessment
        )

        orig_id = item["id"]

        if QuizQuestion.objects.filter(metadata_json__id_original=orig_id).exists():
            skipped_count += 1
            continue

        QuizQuestion.objects.create(
            topic=topic,
            question=item["pergunta"],
            options=item["alternativas"],
            answer=item["resposta"],
            type=item["tipo"],
            difficulty=item.get("dificuldade", "medium"),
            explanation=item["explicacao"],
            cronica_do_guardiao=item["cronica_do_guardiao"],
            has_image=True,
            image_mode="uploaded_asset",
            image_url=item["image_url"],
            image_prompt=item["imagem_prompt"],
            image_alt=item["imagem_alt"],
            source="manual",
            metadata_json={
                "id_original": orig_id,
                "estudante": "Theo",
                "avaliacao": "AV2",
                "serie": "3º ano",
                "disciplina": "História",
                "eixo": topic_name
            }
        )
        created_count += 1

    print(f"Done Theo 3rd Grade! Created: {created_count}, Skipped (existing): {skipped_count}")

if __name__ == "__main__":
    seed_historia3_theo()
