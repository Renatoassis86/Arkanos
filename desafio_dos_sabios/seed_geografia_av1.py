import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizSubject, QuizTopic, QuizQuestion, QuizGrade, QuizAssessment

def seed_geografia_av1():
    # 1. Ensure Subject, Grade, and Assessment exist
    subject, _ = QuizSubject.objects.get_or_create(name="Geografia")
    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    assessment, _ = QuizAssessment.objects.get_or_create(
        name="AV1 - 1º trimestre (2026)",
        grade=grade,
        subject=subject
    )
    
    questions_data = [
        {
          "topic": "Continentes",
          "question": "Quantos continentes existem na divisão mais comum estudada (América do Norte e do Sul separadas)?",
          "options": ["5", "6", "7", "8"],
          "answer": "C",
          "explanation": "A divisão mais comum considera 7 continentes."
        },
        {
          "topic": "Continentes",
          "question": "Qual opção apresenta apenas continentes?",
          "options": ["Brasil, Chile, Paraguai", "Europa, África, Ásia", "Amazonas, Nilo, Paraná", "Atlântico, Índico, Pacífico"],
          "answer": "B",
          "explanation": "Europa, África e Ásia são continentes."
        },
        {
          "topic": "Continentes",
          "question": "Qual continente fica no extremo sul do planeta Terra?",
          "options": ["Europa", "África", "Antártida", "Oceania"],
          "answer": "C",
          "explanation": "A Antártida fica no extremo sul."
        },
        {
          "topic": "Continentes",
          "question": "Qual é o maior continente do planeta?",
          "options": ["Europa", "África", "Ásia", "Oceania"],
          "answer": "C",
          "explanation": "A Ásia é o maior continente."
        },
        {
          "topic": "Continentes",
          "question": "Qual continente está a oeste da Ásia e ao norte da África?",
          "options": ["Europa", "Antártida", "Oceania", "América do Sul"],
          "answer": "A",
          "explanation": "Europa fica a oeste da Ásia e ao norte da África."
        },
        {
          "topic": "Oceanos",
          "question": "Quantos oceanos existem na Terra?",
          "options": ["3", "4", "5", "6"],
          "answer": "C",
          "explanation": "São 5: Pacífico, Atlântico, Índico, Ártico e Antártico."
        },
        {
          "topic": "Oceanos",
          "question": "Qual é o maior oceano do planeta?",
          "options": ["Atlântico", "Pacífico", "Índico", "Ártico"],
          "answer": "B",
          "explanation": "O Pacífico é o maior."
        },
        {
          "topic": "Oceanos",
          "question": "Qual oceano separa a América da Europa e da África?",
          "options": ["Índico", "Pacífico", "Atlântico", "Antártico"],
          "answer": "C",
          "explanation": "O Atlântico fica entre América e Europa/África."
        },
        {
          "topic": "Oceanos",
          "question": "Qual oceano banha a costa oeste da América do Sul?",
          "options": ["Atlântico", "Pacífico", "Índico", "Ártico"],
          "answer": "B",
          "explanation": "A costa oeste da América do Sul é banhada pelo Pacífico."
        },
        {
          "topic": "Oceanos",
          "question": "Qual oceano fica principalmente entre a África e a Austrália/Oceania?",
          "options": ["Índico", "Atlântico", "Pacífico", "Ártico"],
          "answer": "A",
          "explanation": "O Índico fica entre África e Austrália (principalmente)."
        },
        {
          "topic": "Pontos cardeais",
          "question": "Quais são os quatro pontos cardeais?",
          "options": ["Norte, Sul, Leste e Oeste", "Norte, Nordeste, Sul e Sudeste", "Noroeste, Nordeste, Sudoeste e Sudeste", "Leste, Oeste, Nordeste e Sudoeste"],
          "answer": "A",
          "explanation": "Cardeais: N, S, L e O."
        },
        {
          "topic": "Pontos cardeais",
          "question": "Em qual ponto cardeal o Sol nasce?",
          "options": ["Norte", "Sul", "Leste", "Oeste"],
          "answer": "C",
          "explanation": "Diz-se que o Sol nasce no Leste."
        },
        {
          "topic": "Pontos cardeais",
          "question": "Em qual ponto cardeal o Sol se põe?",
          "options": ["Leste", "Oeste", "Norte", "Sul"],
          "answer": "B",
          "explanation": "Diz-se que o Sol se põe no Oeste."
        },
        {
          "topic": "Pontos colaterais",
          "question": "Qual ponto colateral fica entre Norte e Leste?",
          "options": ["Noroeste", "Nordeste", "Sudeste", "Sudoeste"],
          "answer": "B",
          "explanation": "Entre Norte e Leste fica o Nordeste."
        },
        {
          "topic": "Pontos colaterais",
          "question": "Qual ponto colateral fica entre Sul e Oeste?",
          "options": ["Nordeste", "Sudeste", "Sudoeste", "Noroeste"],
          "answer": "C",
          "explanation": "Entre Sul e Oeste fica o Sudoeste."
        },
        {
          "topic": "Rosa dos ventos",
          "question": "Qual instrumento/representação é usado no mapa para indicar direções (N, S, L, O)?",
          "options": ["Escala", "Legenda", "Rosa dos ventos", "Título"],
          "answer": "C",
          "explanation": "A rosa dos ventos indica direções."
        },
        {
          "topic": "Hemisférios e linhas imaginárias",
          "question": "O que é um hemisfério?",
          "options": ["Um continente", "Metade da Terra", "Um país", "Uma ilha"],
          "answer": "B",
          "explanation": "Hemisfério é uma das metades da Terra."
        },
        {
          "topic": "Hemisférios e linhas imaginárias",
          "question": "Qual linha imaginária divide a Terra em hemisfério Norte e hemisfério Sul?",
          "options": ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Capricórnio", "Trópico de Câncer"],
          "answer": "B",
          "explanation": "A Linha do Equador divide Norte e Sul."
        },
        {
          "topic": "Hemisférios e linhas imaginárias",
          "question": "Qual linha imaginária divide a Terra em hemisfério Ocidental e hemisfério Oriental?",
          "options": ["Meridiano de Greenwich", "Linha do Equador", "Círculo Polar Ártico", "Trópico de Câncer"],
          "answer": "A",
          "explanation": "O Meridiano de Greenwich divide Ocidental e Oriental."
        },
        {
          "topic": "Hemisférios e linhas imaginárias",
          "question": "Qual par de hemisférios é formado quando usamos a Linha do Equador?",
          "options": ["Oriental e Ocidental", "Norte e Sul", "Leste e Oeste", "Central e Periférico"],
          "answer": "B",
          "explanation": "Equador separa Norte e Sul."
        },
        {
          "topic": "Planeta Terra",
          "question": "Qual posição a Terra ocupa em relação ao Sol (ordem dos planetas)?",
          "options": ["1º planeta", "2º planeta", "3º planeta", "4º planeta"],
          "answer": "C",
          "explanation": "A Terra é o 3º planeta a partir do Sol."
        },
        {
          "topic": "Movimentos da Terra",
          "question": "Qual movimento da Terra é responsável pelo dia e pela noite?",
          "options": ["Translação", "Rotação", "Inclinação", "Deriva continental"],
          "answer": "B",
          "explanation": "Rotação é o giro em torno do próprio eixo."
        },
        {
          "topic": "Movimentos da Terra",
          "question": "Qual movimento da Terra é a volta ao redor do Sol?",
          "options": ["Rotação", "Translação", "Vibração", "Convecção"],
          "answer": "B",
          "explanation": "Translação é a volta ao redor do Sol."
        },
        {
          "topic": "Movimentos da Terra",
          "question": "Aproximadamente, quanto tempo a Terra leva para completar uma volta ao redor do Sol?",
          "options": ["30 dias", "180 dias", "365 dias", "1000 dias"],
          "answer": "C",
          "explanation": "A translação dura cerca de 365 dias."
        },
        {
          "topic": "Estações do ano",
          "question": "As estações do ano acontecem principalmente por causa de:",
          "options": ["Da distância fixa do Sol", "Da inclinação do eixo da Terra", "Do tamanho dos continentes", "Da rotação mais rápida no verão"],
          "answer": "B",
          "explanation": "A inclinação do eixo terrestre influencia as estações."
        },
        {
          "topic": "Camadas internas da Terra",
          "question": "Qual é a camada mais externa da Terra (onde vivemos)?",
          "options": ["Núcleo", "Manto", "Crosta", "Magma"],
          "answer": "C",
          "explanation": "Vivemos na crosta terrestre."
        },
        {
          "topic": "Camadas internas da Terra",
          "question": "Qual camada fica abaixo da crosta terrestre?",
          "options": ["Manto", "Núcleo interno", "Atmosfera", "Hidrosfera"],
          "answer": "A",
          "explanation": "O manto fica abaixo da crosta."
        },
        {
          "topic": "Camadas internas da Terra",
          "question": "O núcleo da Terra se divide em:",
          "options": ["Núcleo leste e oeste", "Núcleo superior e inferior", "Núcleo externo e interno", "Núcleo quente e frio"],
          "answer": "C",
          "explanation": "Núcleo externo e núcleo interno."
        },
        {
          "topic": "Camadas internas da Terra",
          "question": "Em muitos materiais didáticos, o manto pode ser dividido em:",
          "options": ["Manto superior e manto inferior", "Manto quente e manto frio", "Manto leste e manto oeste", "Manto seco e manto úmido"],
          "answer": "A",
          "explanation": "Divisão comum: manto superior e inferior."
        },
        {
          "topic": "Atmosfera",
          "question": "A atmosfera é:",
          "options": ["Uma camada de rochas", "Uma camada de água", "Uma camada de gases ao redor da Terra", "Uma camada de gelo permanente"],
          "answer": "C",
          "explanation": "Atmosfera é a camada de gases que envolve a Terra."
        },
        {
          "topic": "Atmosfera",
          "question": "Dois gases muito importantes na composição da atmosfera são:",
          "options": ["Ouro e prata", "Nitrogênio e oxigênio", "Ferro e cobre", "Hidrogênio e chumbo"],
          "answer": "B",
          "explanation": "Nitrogênio e oxigênio são os principais."
        },
        {
          "topic": "Atmosfera",
          "question": "Qual camada da atmosfera é a mais próxima do solo?",
          "options": ["Troposfera", "Estratosfera", "Mesosfera", "Exosfera"],
          "answer": "A",
          "explanation": "Troposfera é a camada mais próxima."
        },
        {
          "topic": "Atmosfera",
          "question": "Qual sequência apresenta apenas camadas da atmosfera citadas em muitos livros didáticos?",
          "options": ["Crosta, Manto, Núcleo", "Troposfera, Estratosfera, Mesosfera", "Pacífico, Atlântico, Índico", "Equador, Greenwich, Capricórnio"],
          "answer": "B",
          "explanation": "Troposfera, estratosfera e mesosfera são camadas atmosféricas."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "A Região Sul do Brasil é formada por quais estados?",
          "options": ["SP, RJ e MG", "PR, SC e RS", "BA, SE e AL", "GO, MT e MS"],
          "answer": "B",
          "explanation": "Sul: Paraná, Santa Catarina e Rio Grande do Sul."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual é a capital do Paraná (PR)?",
          "options": ["Curitiba", "Florianópolis", "Porto Alegre", "São Paulo"],
          "answer": "A",
          "explanation": "Curitiba é a capital do Paraná."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual é a capital de Santa Catarina (SC)?",
          "options": ["Curitiba", "Florianópolis", "Porto Alegre", "Joinville"],
          "answer": "B",
          "explanation": "Florianópolis é a capital de Santa Catarina."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual é a capital do Rio Grande do Sul (RS)?",
          "options": ["Caxias do Sul", "Pelotas", "Porto Alegre", "Gramado"],
          "answer": "C",
          "explanation": "Porto Alegre é a capital do RS."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual oceano banha a costa leste da Região Sul do Brasil?",
          "options": ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
          "answer": "A",
          "explanation": "A costa leste do Brasil é banhada pelo Atlântico."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Quais países fazem fronteira com a Região Sul do Brasil?",
          "options": ["Portugal e Espanha", "Uruguai, Argentina e Paraguai", "Chile e Peru", "Bolívia e Equador"],
          "answer": "B",
          "explanation": "A Região Sul faz fronteira com Uruguai, Argentina e Paraguai."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "A Região Sul faz fronteira ao norte principalmente com:",
          "options": ["São Paulo e Mato Grosso do Sul", "Bahia e Sergipe", "Pará e Amazonas", "Piauí e Maranhão"],
          "answer": "A",
          "explanation": "No norte da região Sul ficam SP e MS (dependendo do estado)."
        },
        {
          "topic": "América do Sul - Capitais",
          "question": "Qual é a capital da Argentina?",
          "options": ["Santiago", "Buenos Aires", "Montevidéu", "Assunção"],
          "answer": "B",
          "explanation": "Buenos Aires é a capital da Argentina."
        },
        {
          "topic": "América do Sul - Capitais",
          "question": "Qual é a capital do Chile?",
          "options": ["Santiago", "La Paz", "Lima", "Quito"],
          "answer": "A",
          "explanation": "Santiago é a capital do Chile."
        },
        {
          "topic": "América do Sul - Capitais",
          "question": "Qual é a capital do Uruguai?",
          "options": ["Assunção", "Montevidéu", "Buenos Aires", "Caracas"],
          "answer": "B",
          "explanation": "Montevidéu é a capital do Uruguai."
        },
        {
          "topic": "América do Sul - Capitais",
          "question": "Qual é a capital do Paraguai?",
          "options": ["Assunção", "La Paz", "Bogotá", "Santiago"],
          "answer": "A",
          "explanation": "Assunção é a capital do Paraguai."
        },
        {
          "topic": "América do Sul - Capitais",
          "question": "A Bolívia é conhecida (em muitos conteúdos escolares) por ter duas capitais. Quais são elas?",
          "options": ["La Paz e Sucre", "Lima e Cusco", "Santiago e Valparaíso", "Bogotá e Medellín"],
          "answer": "A",
          "explanation": "La Paz (sede de governo) e Sucre (capital constitucional)."
        },
        {
          "topic": "América do Sul - Relevo",
          "question": "Qual é a maior montanha do Ocidente citada no conteúdo (nos Andes, na Argentina)?",
          "options": ["Everest", "Aconcágua", "Kilimanjaro", "Mont Blanc"],
          "answer": "B",
          "explanation": "Aconcágua é citada como a maior do Ocidente."
        },
        {
          "topic": "América do Sul - Relevo",
          "question": "Qual cordilheira separa a Argentina do Chile?",
          "options": ["Himalaia", "Andes", "Alpes", "Montanhas Rochosas"],
          "answer": "B",
          "explanation": "A Cordilheira dos Andes separa os dois países."
        },
        {
          "topic": "América do Sul - Características",
          "question": "Qual país tem formato alongado e é conhecido por ser bem estreito em vários trechos (pouco mais de 160 km em um ponto, no conteúdo)?",
          "options": ["Chile", "Brasil", "Argentina", "Bolívia"],
          "answer": "A",
          "explanation": "O Chile é citado como estreito e alongado."
        },
        {
          "topic": "América do Sul - Clima/Desertos",
          "question": "Qual deserto é citado como um dos mais secos do mundo, localizado no norte do Chile?",
          "options": ["Saara", "Atacama", "Gobi", "Kalahari"],
          "answer": "B",
          "explanation": "O deserto do Atacama fica no norte do Chile."
        },
        {
          "topic": "América do Sul - Oceano",
          "question": "Qual oceano está a oeste do Chile?",
          "options": ["Atlântico", "Pacífico", "Índico", "Ártico"],
          "answer": "B",
          "explanation": "A oeste do Chile fica o Oceano Pacífico."
        },
        {
          "topic": "América do Sul - Lugares",
          "question": "Qual cabo é localizado no extremo sul da América do Sul?",
          "options": ["Cabo da Boa Esperança", "Cabo Horn", "Cabo Canaveral", "Cabo Frio"],
          "answer": "B",
          "explanation": "Cabo Horn (Cabo Hornos) é o ponto mais ao sul."
        },
        {
          "topic": "Ilhas e territórios",
          "question": "As Ilhas Malvinas ficam em qual oceano, segundo o conteúdo?",
          "options": ["Pacífico", "Atlântico", "Índico", "Ártico"],
          "answer": "B",
          "explanation": "As Malvinas ficam no Oceano Atlântico."
        },
        {
          "topic": "Ilhas e territórios",
          "question": "As Ilhas Malvinas são classificadas no conteúdo como:",
          "options": ["Territórios Britânicos Ultramarinos", "Estados brasileiros", "Províncias argentinas", "Territórios franceses"],
          "answer": "A",
          "explanation": "O texto cita Territórios Britânicos Ultramarinos."
        },
        {
          "topic": "Ilhas e territórios",
          "question": "Qual país é responsável pela defesa das Malvinas no texto?",
          "options": ["Argentina", "Reino Unido", "Chile", "Uruguai"],
          "answer": "B",
          "explanation": "O texto cita o Reino Unido."
        },
        {
          "topic": "Hidrografia",
          "question": "Qual lago passa pela Bolívia e pelo Peru, citado no conteúdo?",
          "options": ["Lago Titicaca", "Lago Vitória", "Lago Baikal", "Lago Superior"],
          "answer": "A",
          "explanation": "O Lago Titicaca aparece no material."
        },
        {
          "topic": "Hidrografia",
          "question": "O Rio da Prata é associado, em conteúdos escolares, principalmente aos rios:",
          "options": ["Nilo e Congo", "Paraná e Uruguai", "Amazonas e Tocantins", "Danúbio e Reno"],
          "answer": "B",
          "explanation": "É formado principalmente pelos rios Paraná e Uruguai."
        },
        {
          "topic": "Cartografia - elementos do mapa",
          "question": "Para que serve a legenda de um mapa?",
          "options": ["Para mostrar o norte", "Para explicar símbolos e cores do mapa", "Para mostrar o tamanho real do país", "Para indicar o nome do autor do mapa"],
          "answer": "B",
          "explanation": "Legenda explica símbolos e cores."
        },
        {
          "topic": "Cartografia - elementos do mapa",
          "question": "A escala em um mapa serve para:",
          "options": ["Mostrar direções", "Mostrar a distância representada no mapa", "Mostrar o clima", "Mostrar o idioma do país"],
          "answer": "B",
          "explanation": "Escala representa distâncias proporcionais."
        },
        {
          "topic": "Geografia do Brasil - Região Sul",
          "question": "Qual capital corresponde ao estado do Paraná (PR)?",
          "options": ["Porto Alegre", "Curitiba", "Florianópolis", "Chapecó"],
          "answer": "B",
          "explanation": "PR → Curitiba."
        },
        {
          "topic": "Geografia do Brasil - Região Sul",
          "question": "Qual capital corresponde ao estado de Santa Catarina (SC)?",
          "options": ["Joinville", "Blumenau", "Florianópolis", "Criciúma"],
          "answer": "C",
          "explanation": "SC → Florianópolis."
        },
        {
          "topic": "Geografia do Brasil - Região Sul",
          "question": "Qual capital corresponde ao estado do Rio Grande do Sul (RS)?",
          "options": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria"],
          "answer": "A",
          "explanation": "RS → Porto Alegre."
        },
        {
          "topic": "Continentes e oceanos (revisão)",
          "question": "Qual alternativa tem APENAS oceanos?",
          "options": ["Atlântico, Pacífico, Índico", "Europa, África, Ásia", "Brasil, Chile, Bolívia", "Equador, Greenwich, Capricórnio"],
          "answer": "A",
          "explanation": "Atlântico, Pacífico e Índico são oceanos."
        },
        {
          "topic": "Hemisférios terrestres",
          "question": "O hemisfério Ocidental é o lado do planeta a:",
          "options": ["Leste de Greenwich", "Oeste de Greenwich", "Norte do Equador", "Sul do Equador"],
          "answer": "B",
          "explanation": "Ocidental fica a oeste do Meridiano de Greenwich."
        },
        {
          "topic": "Hemisférios terrestres",
          "question": "O hemisfério Oriental é o lado do planeta a:",
          "options": ["Oeste de Greenwich", "Leste de Greenwich", "Norte do Equador", "Sul do Equador"],
          "answer": "B",
          "explanation": "Oriental fica a leste do Meridiano de Greenwich."
        },
        {
          "topic": "Hemisférios terrestres",
          "question": "O que significa 'hemisfério'?",
          "options": ["Uma ilha famosa", "Metade da Terra", "Uma cadeia de montanhas", "Um tipo de oceano"],
          "answer": "B",
          "explanation": "Hemisfério = metade da esfera terrestre."
        },
        {
          "topic": "Hemisférios terrestres",
          "question": "O que é o 'Primeiro Meridiano' citado no conteúdo?",
          "options": ["Uma linha que divide Norte e Sul", "Uma linha que divide Ocidental e Oriental", "Uma linha que divide oceanos", "Uma linha que divide continentes"],
          "answer": "B",
          "explanation": "Primeiro Meridiano (Greenwich) divide Ocidental e Oriental."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual país fica ao sul do Brasil e faz fronteira com o Rio Grande do Sul?",
          "options": ["Chile", "Uruguai", "Peru", "Colômbia"],
          "answer": "B",
          "explanation": "O Uruguai faz fronteira com o RS."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "Qual país faz fronteira com o Paraná (PR) na Região Sul?",
          "options": ["Equador", "Paraguai", "Venezuela", "Guiana"],
          "answer": "B",
          "explanation": "O Paraná faz fronteira com o Paraguai."
        },
        {
          "topic": "Argentina",
          "question": "Em mapas escolares, a cordilheira que aparece ao longo do lado oeste da Argentina é:",
          "options": ["Andes", "Alpes", "Urais", "Rochosas"],
          "answer": "A",
          "explanation": "A Cordilheira dos Andes acompanha a fronteira oeste."
        },
        {
          "topic": "Chile",
          "question": "O Chile é descrito como um pedaço de terra situado ao longo da:",
          "options": ["costa leste da América do Sul", "costa oeste da América do Sul", "costa sul da Europa", "costa norte da África"],
          "answer": "B",
          "explanation": "Chile fica ao longo da costa oeste da América do Sul."
        },
        {
          "topic": "Ilhas e territórios",
          "question": "Qual ilha é parte do Chile desde 1888 e famosa por suas estátuas Moai?",
          "options": ["Ilha de Páscoa", "Ilha de Chiloé", "Ilha Grande", "Ilha de Fernando de Noronha"],
          "answer": "A",
          "explanation": "A Ilha de Páscoa pertence ao Chile e possui os Moai."
        },
        {
          "topic": "Ilhas e territórios",
          "question": "Como se chamam as estátuas gigantes da Ilha de Páscoa?",
          "options": ["Moai", "Totens", "Colossos", "Pilares"],
          "answer": "A",
          "explanation": "As estátuas são os famosos Moai."
        },
        {
          "topic": "Bolívia",
          "question": "Qual país é citado como 'sem litoral' (sem saída para o mar)?",
          "options": ["Chile", "Bolívia", "Uruguai", "Argentina"],
          "answer": "B",
          "explanation": "A Bolívia não possui saída para o oceano."
        },
        {
          "topic": "Rosa dos ventos",
          "question": "Qual item do mapa explica símbolos como aeroporto, porto e cidade?",
          "options": ["Título", "Legenda", "Escala", "Rosa dos ventos"],
          "answer": "B",
          "explanation": "A legenda traduz os símbolos do mapa."
        },
        {
          "topic": "Rosa dos ventos",
          "question": "No mapa, a seta com a letra 'N' indica:",
          "options": ["Oeste", "Norte", "Sul", "Leste"],
          "answer": "B",
          "explanation": "A letra N indica a direção Norte."
        },
        {
          "topic": "Região Sul do Brasil",
          "question": "A Região Sul cita grande influência europeia, principalmente de origem:",
          "options": ["Italiana e germânica", "Japonesa e chinesa", "Egípcia e persa", "Indígena e polinésia"],
          "answer": "A",
          "explanation": "Forte presença de descendentes de italianos e alemães."
        },
        {
          "topic": "Camadas da Terra",
          "question": "Qual alternativa mostra a ordem correta de fora para dentro das camadas internas?",
          "options": ["Crosta → Manto → Núcleo", "Núcleo → Manto → Crosta", "Manto → Crosta → Núcleo", "Atmosfera → Crosta → Oceano"],
          "answer": "A",
          "explanation": "Crosta (superfície), Manto (intermediária), Núcleo (centro)."
        },
        {
          "topic": "Camadas da atmosfera",
          "question": "Qual das opções NÃO é uma camada da atmosfera?",
          "options": ["Troposfera", "Estratosfera", "Crosta", "Mesosfera"],
          "answer": "C",
          "explanation": "Crosta é uma camada sólida da Terra, não do ar."
        },
        {
          "topic": "Movimento de rotação",
          "question": "A rotação é o movimento da Terra ao redor:",
          "options": ["do Sol", "da Lua", "do próprio eixo", "das nuvens"],
          "answer": "C",
          "explanation": "Rotação: em torno do próprio eixo (causa dia/noite)."
        },
        {
          "topic": "Movimento de translação",
          "question": "A translação é o movimento da Terra ao redor:",
          "options": ["do próprio eixo", "do Sol", "do Equador", "do Meridiano de Greenwich"],
          "answer": "B",
          "explanation": "Translação: órbita ao redor do Sol."
        }
    ]

    letter_map = {"A": 0, "B": 1, "C": 2, "D": 3}
    
    count = 0
    for q in questions_data:
        # Get or Create Topic linked to Grade and Assessment
        topic, _ = QuizTopic.objects.get_or_create(
            subject=subject, 
            grade=grade,
            assessment=assessment,
            name=q['topic']
        )
        
        # Map answer letter to option text
        ans_idx = letter_map.get(q['answer'])
        ans_text = q['options'][ans_idx]
        
        # Create Question
        QuizQuestion.objects.create(
            topic=topic,
            difficulty="easy",
            type="multiple_choice",
            question=q['question'],
            options=q['options'],
            answer=ans_text,
            explanation=q['explanation']
        )
        count += 1
    
    print(f"Sucesso! {count} questões de Geografia (AV1) foram semeadas.")

if __name__ == "__main__":
    seed_geografia_av1()
