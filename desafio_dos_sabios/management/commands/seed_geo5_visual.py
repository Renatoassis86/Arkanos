"""
Management command: seed_geo5_visual
Importa 31 questões visuais de Geografia – 5º ano – AV1 – 1º trimestre.

Uso:
    python manage.py seed_geo5_visual
    python manage.py seed_geo5_visual --dry-run
"""
from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

PAYLOAD = {
    "serie": "5º ano",
    "disciplina": "Geografia",
    "avaliacao": "AV1",
    "questions": [
        {
            "id": "GEO5_VISUAL_001",
            "ano": 5,
            "tema": "Continentes",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa-múndi e identifique o continente destacado.",
            "alternativas": ["África", "Ásia", "Europa", "Oceania"],
            "resposta_correta": 1,
            "explicacao": "O continente destacado é a Ásia.",
            "cronica_do_guardiao": "A Ásia é o maior continente do mundo e abriga algumas das civilizações mais antigas da humanidade. Seu estudo ajuda a entender a diversidade cultural e a extensão da Terra habitada.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi educativo do 5 ano com a Asia destacada em amarelo, nomes legiveis, estilo didatico escolar, fundo claro",
                "alt": "Mapa-mundi com a Ásia destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_002",
            "ano": 5,
            "tema": "Pontos Cardeais",
            "tipo": "diagram_analysis",
            "pergunta": "Na rosa dos ventos ilustrada, qual ponto cardeal está na parte superior?",
            "alternativas": ["Sul", "Norte", "Leste", "Oeste"],
            "resposta_correta": 1,
            "explicacao": "Na rosa dos ventos, a parte superior indica o Norte.",
            "cronica_do_guardiao": "A rosa dos ventos é um dos símbolos mais conhecidos da cartografia. Ela foi muito usada por navegadores, exploradores e estudiosos do espaço geográfico.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Rosa dos ventos educativa mais detalhada para 5 ano com pontos cardeais e colaterais, Norte no topo, estilo didatico limpo",
                "alt": "Rosa dos ventos com Norte no topo",
            },
        },
        {
            "id": "GEO5_VISUAL_003",
            "ano": 5,
            "tema": "Pontos Colaterais",
            "tipo": "diagram_analysis",
            "pergunta": "Observe a rosa dos ventos. Qual ponto colateral fica entre Norte e Leste?",
            "alternativas": ["Noroeste", "Nordeste", "Sudeste", "Sudoeste"],
            "resposta_correta": 1,
            "explicacao": "Entre Norte e Leste fica Nordeste.",
            "cronica_do_guardiao": "Os pontos colaterais ajudam a orientar com mais precisão. Eles mostram como o conhecimento pode ser refinado e tornar a observação do mundo mais exata.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Rosa dos ventos com foco no Nordeste entre Norte e Leste, estilo infantil escolar, letras grandes",
                "alt": "Rosa dos ventos destacando o Nordeste",
            },
        },
        {
            "id": "GEO5_VISUAL_004",
            "ano": 5,
            "tema": "Pontos Colaterais",
            "tipo": "diagram_analysis",
            "pergunta": "Qual ponto colateral está entre Sul e Oeste?",
            "alternativas": ["Nordeste", "Noroeste", "Sudoeste", "Sudeste"],
            "resposta_correta": 2,
            "explicacao": "Entre Sul e Oeste fica Sudoeste.",
            "cronica_do_guardiao": "A leitura correta da rosa dos ventos fortalece a localização e prepara a criança para interpretar mapas mais complexos.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Rosa dos ventos didatica com destaque no Sudoeste entre Sul e Oeste, estilo claro escolar",
                "alt": "Rosa dos ventos destacando o Sudoeste",
            },
        },
        {
            "id": "GEO5_VISUAL_005",
            "ano": 5,
            "tema": "Hemisférios",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o globo com uma linha horizontal destacada. Essa linha representa:",
            "alternativas": ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Câncer", "Linha internacional de data"],
            "resposta_correta": 1,
            "explicacao": "A linha horizontal central representa a Linha do Equador.",
            "cronica_do_guardiao": "A Linha do Equador é uma referência central da Geografia. Ela divide a Terra em hemisfério Norte e Sul e ajuda a organizar estudos sobre clima e localização.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo terrestre escolar com Linha do Equador destacada em vermelho no centro, hemisferio Norte e Sul visiveis, estilo didatico 5 ano",
                "alt": "Globo com a Linha do Equador destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_006",
            "ano": 5,
            "tema": "Hemisférios",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o globo com uma linha vertical central destacada. Ela representa:",
            "alternativas": ["Linha do Equador", "Meridiano de Greenwich", "Trópico de Capricórnio", "Círculo Polar Ártico"],
            "resposta_correta": 1,
            "explicacao": "A linha vertical destacada representa o Meridiano de Greenwich.",
            "cronica_do_guardiao": "O Meridiano de Greenwich divide a Terra em hemisfério Leste e Oeste e também serve de base para os fusos horários.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo escolar com Meridiano de Greenwich em azul vertical destacado, hemisferio Leste e Oeste, fundo claro",
                "alt": "Globo com o Meridiano de Greenwich destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_007",
            "ano": 5,
            "tema": "Hemisférios",
            "tipo": "diagram_analysis",
            "pergunta": "A linha destacada no centro do globo divide a Terra em quais hemisférios?",
            "alternativas": ["Leste e Oeste", "Norte e Sul", "Europa e Ásia", "Norte e Leste"],
            "resposta_correta": 1,
            "explicacao": "A Linha do Equador divide a Terra em hemisfério Norte e hemisfério Sul.",
            "cronica_do_guardiao": "Os hemisférios são divisões úteis para o estudo do planeta. Eles ajudam a criança a se localizar e a interpretar globos e mapas.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo educativo com Linha do Equador e nomes Hemisferio Norte e Hemisferio Sul, estilo didatico",
                "alt": "Globo com hemisfério Norte e Sul",
            },
        },
        {
            "id": "GEO5_VISUAL_008",
            "ano": 5,
            "tema": "Hemisférios",
            "tipo": "diagram_analysis",
            "pergunta": "A linha vertical destacada divide a Terra em quais hemisférios?",
            "alternativas": ["Norte e Sul", "Leste e Oeste", "África e Europa", "América e Oceania"],
            "resposta_correta": 1,
            "explicacao": "O Meridiano de Greenwich divide a Terra em Leste e Oeste.",
            "cronica_do_guardiao": "Essa divisão mostra como a Geografia usa referências imaginárias para organizar o espaço do mundo real.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo educativo com Meridiano de Greenwich e nomes Hemisferio Leste e Hemisferio Oeste, estilo escolar 5 ano",
                "alt": "Globo com hemisfério Leste e Oeste",
            },
        },
        {
            "id": "GEO5_VISUAL_009",
            "ano": 5,
            "tema": "Argentina",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa da América do Sul. Qual país destacado é a Argentina?",
            "alternativas": ["Chile", "Argentina", "Uruguai", "Paraguai"],
            "resposta_correta": 1,
            "explicacao": "O país destacado é a Argentina.",
            "cronica_do_guardiao": "A Argentina é um dos maiores países da América do Sul e teve grande importância histórica na região do Prata.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa politico infantil da America do Sul com a Argentina destacada em amarelo, nomes legiveis, estilo didatico",
                "alt": "Mapa da América do Sul com a Argentina destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_010",
            "ano": 5,
            "tema": "Argentina",
            "tipo": "map_analysis",
            "pergunta": "No mapa, qual capital está marcada na Argentina?",
            "alternativas": ["Santiago", "Buenos Aires", "Montevidéu", "Assunção"],
            "resposta_correta": 1,
            "explicacao": "A capital marcada na Argentina é Buenos Aires.",
            "cronica_do_guardiao": "Buenos Aires foi uma cidade importante para o comércio e para a formação histórica da América do Sul. Estudar capitais ajuda a unir Geografia e História.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da Argentina infantil com Buenos Aires marcada com estrela e legenda simples, estilo escolar",
                "alt": "Mapa da Argentina com Buenos Aires marcada",
            },
        },
        {
            "id": "GEO5_VISUAL_011",
            "ano": 5,
            "tema": "Chile",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa da América do Sul. Qual país longo e estreito destacado é o Chile?",
            "alternativas": ["Peru", "Argentina", "Chile", "Bolívia"],
            "resposta_correta": 2,
            "explicacao": "O país destacado é o Chile.",
            "cronica_do_guardiao": "O Chile chama atenção por seu formato comprido e estreito ao longo da costa do Pacífico. Isso influencia seu clima, paisagem e modo de ocupação do território.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa politico da America do Sul com o Chile destacado em vermelho ao longo da costa oeste, estilo didatico escolar",
                "alt": "Mapa da América do Sul com o Chile destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_012",
            "ano": 5,
            "tema": "Chile",
            "tipo": "map_analysis",
            "pergunta": "No mapa do Chile, qual capital está assinalada?",
            "alternativas": ["Lima", "Santiago", "Quito", "La Paz"],
            "resposta_correta": 1,
            "explicacao": "A capital assinalada é Santiago.",
            "cronica_do_guardiao": "Santiago está próxima da Cordilheira dos Andes, mostrando como relevo e cidades muitas vezes se relacionam profundamente.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa do Chile com Santiago marcada por estrela, Cordilheira dos Andes indicada ao leste, estilo escolar",
                "alt": "Mapa do Chile com Santiago marcada",
            },
        },
        {
            "id": "GEO5_VISUAL_013",
            "ano": 5,
            "tema": "Territórios",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa do Atlântico Sul. As ilhas destacadas correspondem a quais territórios estudados?",
            "alternativas": ["Ilhas Canárias", "Ilhas Malvinas", "Ilha de Páscoa", "Fernando de Noronha"],
            "resposta_correta": 1,
            "explicacao": "As ilhas destacadas correspondem às Ilhas Malvinas.",
            "cronica_do_guardiao": "As Ilhas Malvinas mostram como territórios podem carregar disputas históricas e políticas. Em Geografia, mapa e história caminham juntos.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa simples do Atlantico Sul com a costa da Argentina e as Ilhas Malvinas destacadas, estilo didatico infantil",
                "alt": "Mapa com as Ilhas Malvinas destacadas",
            },
        },
        {
            "id": "GEO5_VISUAL_014",
            "ano": 5,
            "tema": "Territórios",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a imagem com fronteiras e bandeiras. O conceito representado é o de:",
            "alternativas": ["Clima", "Território", "Vegetação", "Relevo"],
            "resposta_correta": 1,
            "explicacao": "A imagem representa a ideia de território.",
            "cronica_do_guardiao": "Território não é apenas terra. Ele envolve governo, limites, autoridade e organização política. É uma noção central para compreender as nações.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Ilustracao educativa com mapa dividido por fronteiras, bandeiras e linha de limite politico, conceito de territorio, estilo escolar",
                "alt": "Imagem representando território e fronteiras",
            },
        },
        {
            "id": "GEO5_VISUAL_015",
            "ano": 5,
            "tema": "Planeta Terra",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o esquema da Terra em corte. Qual camada está na parte mais externa?",
            "alternativas": ["Núcleo", "Manto", "Crosta", "Magma"],
            "resposta_correta": 2,
            "explicacao": "A camada mais externa da Terra é a crosta.",
            "cronica_do_guardiao": "É na crosta terrestre que vivemos. Apesar disso, ela é apenas uma pequena fração da estrutura total do planeta, o que revela a profundidade e complexidade da Terra.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama educativo infantil das camadas internas da Terra com crosta, manto e nucleo, crosta destacada, estilo escolar claro",
                "alt": "Diagrama das camadas da Terra com a crosta destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_016",
            "ano": 5,
            "tema": "Planeta Terra",
            "tipo": "diagram_analysis",
            "pergunta": "No esquema das camadas da Terra, qual parte aparece entre a crosta e o núcleo?",
            "alternativas": ["Atmosfera", "Manto", "Hidrosfera", "Troposfera"],
            "resposta_correta": 1,
            "explicacao": "Entre a crosta e o núcleo está o manto.",
            "cronica_do_guardiao": "O manto terrestre é muito quente e ajuda a explicar fenômenos como vulcões e movimentos da crosta. Um simples diagrama pode abrir a porta para muitos estudos da natureza.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama em corte da Terra com manto destacado em laranja entre crosta e nucleo, estilo didatico",
                "alt": "Diagrama da Terra com o manto destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_017",
            "ano": 5,
            "tema": "Planeta Terra",
            "tipo": "diagram_analysis",
            "pergunta": "No diagrama, o centro mais interno da Terra corresponde a:",
            "alternativas": ["Crosta", "Manto", "Núcleo", "Atmosfera"],
            "resposta_correta": 2,
            "explicacao": "O centro mais interno corresponde ao núcleo.",
            "cronica_do_guardiao": "Mesmo sem ver diretamente o interior da Terra, os cientistas conseguem estudá-lo com métodos cuidadosos, mostrando que o saber exige observação e disciplina.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama da Terra em corte com nucleo interno destacado em vermelho no centro, estilo escolar infantil",
                "alt": "Diagrama da Terra com o núcleo destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_018",
            "ano": 5,
            "tema": "Rotação",
            "tipo": "diagram_analysis",
            "pergunta": "Observe a Terra girando em torno de si mesma. Esse movimento se chama:",
            "alternativas": ["Translação", "Rotação", "Inclinação", "Precessão"],
            "resposta_correta": 1,
            "explicacao": "O giro da Terra em torno de si mesma se chama rotação.",
            "cronica_do_guardiao": "A rotação da Terra leva cerca de 24 horas e produz o dia e a noite. Esse movimento regular é uma das bases da organização do tempo humano.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama educativo mostrando a Terra girando em torno do proprio eixo com seta circular, dia e noite, estilo escolar",
                "alt": "Diagrama da rotação da Terra",
            },
        },
        {
            "id": "GEO5_VISUAL_019",
            "ano": 5,
            "tema": "Translação",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o esquema da Terra ao redor do Sol. Esse movimento se chama:",
            "alternativas": ["Rotação", "Translação", "Inclinação", "Vibração"],
            "resposta_correta": 1,
            "explicacao": "O movimento da Terra ao redor do Sol se chama translação.",
            "cronica_do_guardiao": "A translação dura cerca de 365 dias e está ligada ao ano e às estações. Ela mostra como os movimentos do planeta influenciam a vida humana.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama educativo infantil mostrando a Terra orbitando o Sol com seta indicando translacao, estilo claro didatico",
                "alt": "Diagrama da translação da Terra ao redor do Sol",
            },
        },
        {
            "id": "GEO5_VISUAL_020",
            "ano": 5,
            "tema": "Rotação e Translação",
            "tipo": "diagram_analysis",
            "pergunta": "Observe os dois esquemas lado a lado. Qual deles mostra o movimento responsável pelo dia e pela noite?",
            "alternativas": [
                "O que mostra a Terra ao redor do Sol",
                "O que mostra a Terra girando em si mesma",
                "Os dois igualmente",
                "Nenhum dos dois",
            ],
            "resposta_correta": 1,
            "explicacao": "O movimento responsável pelo dia e pela noite é o giro da Terra em torno de si mesma.",
            "cronica_do_guardiao": "Comparar dois esquemas ajuda a criança a distinguir conceitos parecidos. A boa educação também ensina a perceber diferenças importantes.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Prancha educativa com dois diagramas lado a lado: rotacao da Terra e translacao ao redor do Sol, estilo escolar comparativo",
                "alt": "Comparação entre rotação e translação",
            },
        },
        {
            "id": "GEO5_VISUAL_021",
            "ano": 5,
            "tema": "Atmosfera",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o esquema em camadas ao redor da Terra. O conjunto dessas camadas é chamado de:",
            "alternativas": ["Crosta", "Manto", "Atmosfera", "Núcleo"],
            "resposta_correta": 2,
            "explicacao": "O conjunto de camadas ao redor da Terra é a atmosfera.",
            "cronica_do_guardiao": "A atmosfera protege a vida na Terra e ajuda a manter condições adequadas para respiração, temperatura e clima. Algo invisível pode ser decisivo para a existência.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama educativo da Terra com camadas atmosfericas ao redor, visual simples e colorido, estilo didatico 5 ano",
                "alt": "Diagrama da atmosfera em torno da Terra",
            },
        },
        {
            "id": "GEO5_VISUAL_022",
            "ano": 5,
            "tema": "Atmosfera",
            "tipo": "diagram_analysis",
            "pergunta": "Na imagem das camadas da atmosfera, qual é a camada mais próxima da superfície da Terra?",
            "alternativas": ["Mesosfera", "Exosfera", "Troposfera", "Termosfera"],
            "resposta_correta": 2,
            "explicacao": "A camada mais próxima da Terra é a troposfera.",
            "cronica_do_guardiao": "É na troposfera que acontecem muitos fenômenos do tempo, como chuva, nuvens e ventos. O céu que vemos todos os dias está ligado a essa camada.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Diagrama infantil das camadas da atmosfera com troposfera destacada em azul perto da superficie, estilo escolar",
                "alt": "Diagrama da atmosfera com a troposfera destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_023",
            "ano": 5,
            "tema": "Bolívia",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa da América do Sul. Qual país destacado não possui saída para o mar?",
            "alternativas": ["Chile", "Bolívia", "Uruguai", "Argentina"],
            "resposta_correta": 1,
            "explicacao": "O país destacado sem saída para o mar é a Bolívia.",
            "cronica_do_guardiao": "A falta de litoral influencia a vida econômica e política de um país. No caso da Bolívia, isso tem grande importância histórica.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com a Bolivia destacada em roxo e sem litoral destacado visualmente, estilo didatico",
                "alt": "Mapa da América do Sul com a Bolívia destacada",
            },
        },
        {
            "id": "GEO5_VISUAL_024",
            "ano": 5,
            "tema": "Bolívia",
            "tipo": "map_analysis",
            "pergunta": "No mapa da Bolívia, qual capital está marcada?",
            "alternativas": ["La Paz", "Assunção", "Montevidéu", "Santiago"],
            "resposta_correta": 0,
            "explicacao": "A capital marcada é La Paz.",
            "cronica_do_guardiao": "La Paz é uma cidade conhecida por sua altitude elevada. Isso mostra como relevo e ocupação humana podem estar profundamente ligados.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da Bolivia com La Paz marcada por estrela, montanhas sugeridas ao fundo, estilo escolar",
                "alt": "Mapa da Bolívia com La Paz marcada",
            },
        },
        {
            "id": "GEO5_VISUAL_025",
            "ano": 5,
            "tema": "Uruguai",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa. Qual pequeno país ao sul do Brasil está destacado?",
            "alternativas": ["Uruguai", "Paraguai", "Chile", "Peru"],
            "resposta_correta": 0,
            "explicacao": "O país destacado é o Uruguai.",
            "cronica_do_guardiao": "O Uruguai fica ao sul do Brasil e faz fronteira com o Rio Grande do Sul. Regiões de fronteira costumam partilhar costumes e relações históricas.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com o Uruguai destacado ao sul do Brasil, estilo infantil escolar",
                "alt": "Mapa da América do Sul com o Uruguai destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_026",
            "ano": 5,
            "tema": "Uruguai",
            "tipo": "map_analysis",
            "pergunta": "No mapa do Uruguai, qual capital aparece assinalada?",
            "alternativas": ["Buenos Aires", "Montevidéu", "Assunção", "Lima"],
            "resposta_correta": 1,
            "explicacao": "A capital assinalada é Montevidéu.",
            "cronica_do_guardiao": "Montevidéu foi um ponto importante na história da região do Prata. Capitais frequentemente se tornam centros de decisão e cultura.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa do Uruguai com Montevideu marcada por estrela, rio e costa visiveis, estilo didatico",
                "alt": "Mapa do Uruguai com Montevidéu marcada",
            },
        },
        {
            "id": "GEO5_VISUAL_027",
            "ano": 5,
            "tema": "Paraguai",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa. Qual país destacado faz fronteira com o Paraná e aparece sem litoral?",
            "alternativas": ["Paraguai", "Uruguai", "Chile", "Equador"],
            "resposta_correta": 0,
            "explicacao": "O país destacado é o Paraguai.",
            "cronica_do_guardiao": "O Paraguai ocupa posição importante no centro da América do Sul e sua localização ajuda a entender relações regionais e hidrografia.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com o Paraguai destacado em verde escuro, fronteira com Brasil visivel, estilo escolar",
                "alt": "Mapa da América do Sul com o Paraguai destacado",
            },
        },
        {
            "id": "GEO5_VISUAL_028",
            "ano": 5,
            "tema": "Paraguai",
            "tipo": "map_analysis",
            "pergunta": "No mapa do Paraguai, qual capital está marcada?",
            "alternativas": ["Assunção", "Montevidéu", "La Paz", "Santiago"],
            "resposta_correta": 0,
            "explicacao": "A capital marcada é Assunção.",
            "cronica_do_guardiao": "Assunção é uma das cidades antigas da América do Sul. Sua história está ligada à formação política da região platina.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa do Paraguai com Assuncao marcada por estrela, rios indicados de forma simples, estilo didatico escolar",
                "alt": "Mapa do Paraguai com Assunção marcada",
            },
        },
        {
            "id": "GEO5_VISUAL_029",
            "ano": 5,
            "tema": "América do Sul",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa da América do Sul. Qual oceano aparece a leste do continente?",
            "alternativas": ["Pacífico", "Atlântico", "Índico", "Ártico"],
            "resposta_correta": 1,
            "explicacao": "A leste da América do Sul está o Atlântico.",
            "cronica_do_guardiao": "A posição dos oceanos em relação aos continentes influencia clima, comércio e história. O Atlântico teve papel enorme na história do Brasil e das Américas.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com o oceano Atlantico destacado a leste e o Pacifico a oeste, estilo escolar claro",
                "alt": "Mapa da América do Sul com o oceano Atlântico a leste",
            },
        },
        {
            "id": "GEO5_VISUAL_030",
            "ano": 5,
            "tema": "América do Sul",
            "tipo": "map_analysis",
            "pergunta": "Qual oceano aparece a oeste da América do Sul no mapa?",
            "alternativas": ["Atlântico", "Pacífico", "Ártico", "Índico"],
            "resposta_correta": 1,
            "explicacao": "A oeste da América do Sul está o Pacífico.",
            "cronica_do_guardiao": "O Pacífico é o maior oceano do planeta e banha a costa oeste da América do Sul, incluindo o Chile.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com o oceano Pacifico destacado a oeste, estilo didatico infantil",
                "alt": "Mapa da América do Sul com o oceano Pacífico a oeste",
            },
        },
        {
            "id": "GEO5_VISUAL_031",
            "ano": 5,
            "tema": "Revisão Geral",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a prancha com mapa da América do Sul, rosa dos ventos, globo com hemisférios e diagrama da Terra. Esses elementos pertencem ao estudo de:",
            "alternativas": ["Matemática", "Geografia", "Ciências", "História"],
            "resposta_correta": 1,
            "explicacao": "Esses elementos pertencem ao estudo da Geografia.",
            "cronica_do_guardiao": "A Geografia reúne mapas, orientação, países, território, planeta Terra e atmosfera. É uma disciplina que ajuda a situar o homem no mundo real.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Prancha educativa organizada com mapa da America do Sul, rosa dos ventos, globo com hemisferios, diagrama da Terra e da atmosfera, estilo escolar",
                "alt": "Prancha visual com conteúdos de Geografia do 5º ano",
            },
        },
    ],
}

TYPE_MAP = {
    "multiple_choice":       "multiple_choice",
    "image_multiple_choice": "image_multiple_choice",
    "map_analysis":          "map_analysis",
    "diagram_analysis":      "diagram_analysis",
    "visual_interpretation": "visual_interpretation",
    "true_false":            "true_false",
    "short_answer":          "short_answer",
    "ordering":              "ordering",
}


class Command(BaseCommand):
    help = "Seed visual Geography questions – 5th grade – AV1 – 1st trimester (31 questions)"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true", help="Show what would be created without saving")

    def handle(self, *args, **options):
        dry_run  = options.get("dry_run", False)
        serie    = PAYLOAD["serie"]
        discipl  = PAYLOAD["disciplina"]
        aval     = PAYLOAD["avaliacao"]

        self.stdout.write(self.style.MIGRATE_HEADING(f"\n→ {serie} – {discipl} – {aval}"))

        grade,   _ = QuizGrade.objects.get_or_create(name=serie)
        subject, _ = QuizSubject.objects.get_or_create(name=discipl)

        created = skipped = 0

        for item in PAYLOAD["questions"]:
            assessment, _ = QuizAssessment.objects.get_or_create(
                name=aval, grade=grade, subject=subject
            )
            topic, _ = QuizTopic.objects.get_or_create(
                name=item["tema"], subject=subject, grade=grade, assessment=assessment
            )

            if QuizQuestion.objects.filter(
                metadata_json__id_original=item["id"]
            ).exists():
                self.stdout.write(f"  ⏭  Skip  {item['id']}  (já existe)")
                skipped += 1
                continue

            img        = item.get("imagem", {})
            has_image  = bool(img and img.get("modo", "none") != "none")
            image_mode = "generated_asset" if has_image else "none"

            alternativas = item["alternativas"]
            answer       = alternativas[item["resposta_correta"]]
            q_type       = TYPE_MAP.get(item["tipo"], "multiple_choice")

            self.stdout.write(
                f"  {'[DRY-RUN] ' if dry_run else ''}✓  {item['id']}  –  {item['tema']}"
            )

            if not dry_run:
                QuizQuestion.objects.create(
                    topic               = topic,
                    question            = item["pergunta"],
                    options             = alternativas,
                    answer              = answer,
                    type                = q_type,
                    difficulty          = "medium",
                    explanation         = item.get("explicacao", ""),
                    cronica_do_guardiao = item.get("cronica_do_guardiao", ""),
                    has_image           = has_image,
                    image_mode          = image_mode,
                    image_url           = None,
                    image_prompt        = img.get("prompt"),
                    image_alt           = img.get("alt"),
                    source              = "manual",
                    metadata_json       = {
                        "id_original": item["id"],
                        "serie":       serie,
                        "avaliacao":   aval,
                        "raw_tipo":    item["tipo"],
                    },
                )
                created += 1

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS(
            f"✅ Concluído!  Criadas: {created}  |  Ignoradas: {skipped}"
        ))
        if dry_run:
            self.stdout.write(self.style.WARNING("(Dry-run – nada foi salvo)"))
