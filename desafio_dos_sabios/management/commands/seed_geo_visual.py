"""
Management command: seed_geografia_visual

Importa questões de Geografia com suporte visual (mapas, diagramas, imagens)
para o 3º ano e 5º ano - AV1.

Uso:
    python manage.py seed_geografia_visual
    python manage.py seed_geografia_visual --ano 3
    python manage.py seed_geografia_visual --ano 5 --dry-run
"""
from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)


# ─────────────────────────────────────────────────────────────
# DATA: 3º ANO – GEOGRAFIA – AV1
# ─────────────────────────────────────────────────────────────
GEO_3ANO = [
    {
        "id": "GEO3_AV1_001",
        "tema": "Continentes e Oceanos",
        "tipo": "map_analysis",
        "pergunta": "Observe o mapa-múndi. Quantos continentes existem no planeta Terra?",
        "alternativas": ["5", "6", "7", "8"],
        "resposta_correta": 2,
        "explicacao": "A Terra possui 7 continentes: África, América do Norte, América do Sul, Antártida, Ásia, Europa e Oceania.",
        "cronica_do_guardiao": (
            "Por séculos, os exploradores desenhavam mapas incompletos do mundo. "
            "Foi apenas com as grandes navegações dos séculos XV e XVI que os continentes "
            "foram sendo mapeados com maior precisão. A Antártida, o continente mais gelado, "
            "só foi descoberta em 1820 — imagine viver num mundo onde metade do planeta "
            "ainda era um mistério!"
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Mapa-múndi infantil e educativo mostrando os 7 continentes coloridos em cores diferentes, estilo didático escolar, alta legibilidade, fundo claro, legendas em português",
            "alt": "Mapa-múndi com os 7 continentes coloridos"
        }
    },
    {
        "id": "GEO3_AV1_002",
        "tema": "Continentes e Oceanos",
        "tipo": "map_analysis",
        "pergunta": "Observe o mapa. Quantos oceanos existem na Terra?",
        "alternativas": ["3", "4", "5", "6"],
        "resposta_correta": 2,
        "explicacao": "Existem 5 oceanos: Pacífico, Atlântico, Índico, Glacial Ártico e Glacial Antártico.",
        "cronica_do_guardiao": (
            "O Oceano Pacífico é tão grande que cabe todos os continentes dentro dele! "
            "Quando Fernão de Magalhães o atravessou pela primeira vez em 1520, ele achou "
            "que seria uma viagem curta — e ficou meses no mar sem ver terra. 'Pacífico' "
            "significa 'calmo' em latim, mas os marinheiros logo descobriram que ele podia "
            "ser muito perigoso."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Mapa-múndi educativo mostrando os 5 oceanos em tons de azul diferentes, com nomes dos oceanos visíveis, estilo infantil didático, fundo branco",
            "alt": "Mapa-múndi com os 5 oceanos destacados"
        }
    },
    {
        "id": "GEO3_AV1_003",
        "tema": "Pontos Cardeais",
        "tipo": "diagram_analysis",
        "pergunta": "Observe a rosa dos ventos. Qual ponto cardeal está sempre em direção ao nascer do Sol?",
        "alternativas": ["Norte", "Sul", "Leste", "Oeste"],
        "resposta_correta": 2,
        "explicacao": "O Sol nasce sempre no Leste (também chamado de Este ou Oriente).",
        "cronica_do_guardiao": (
            "Antes das bússolas, os navegantes usavam o Sol e as estrelas para se orientar. "
            "Em muitas línguas, a palavra 'oriente' — que vem do latim 'orientem', "
            "significando 'nascente' — indica o Leste, onde o Sol aparece. Hoje a palavra "
            "'Oriente Médio' ainda carrega esse sentido: terras ao leste da Europa."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Rosa dos ventos educativa infantil com os 4 pontos cardeais (Norte, Sul, Leste, Oeste) claramente identificados, estilo didático colorido, fundo branco",
            "alt": "Rosa dos ventos com pontos cardeais"
        }
    },
    {
        "id": "GEO3_AV1_004",
        "tema": "Pontos Cardeais",
        "tipo": "visual_interpretation",
        "pergunta": "Observe a imagem do nascer do Sol. Um garoto está de frente para o Sol nascendo. Qual é a direção que está às suas costas?",
        "alternativas": ["Norte", "Sul", "Leste", "Oeste"],
        "resposta_correta": 3,
        "explicacao": "Se o Sol nasce a Leste e o garoto está olhando para o Leste, então às suas costas está o Oeste.",
        "cronica_do_guardiao": (
            "Os pontos cardeais foram essenciais para a agricultura das civilizações antigas. "
            "Os egípcios construíam seus templos voltados para o nascente — o Leste — "
            "para que o Sol iluminasse os altares ao amanhecer. Essa orientação era sagrada "
            "e mostrava como a geografia e a espiritualidade sempre estiveram ligadas."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Ilustração infantil educativa de uma criança de costas olhando para o sol nascendo no horizonte, setas indicando Leste (frente) e Oeste (costas), estilo didático colorido",
            "alt": "Criança olhando para o nascer do sol no Leste"
        }
    },
    {
        "id": "GEO3_AV1_005",
        "tema": "Ásia",
        "tipo": "map_analysis",
        "pergunta": "Observe o mapa com continentes coloridos. Qual é o maior continente do planeta?",
        "alternativas": ["África", "América do Sul", "Ásia", "Europa"],
        "resposta_correta": 2,
        "explicacao": "A Ásia é o maior continente da Terra, tanto em área quanto em população.",
        "cronica_do_guardiao": (
            "A Ásia é o berço de algumas das mais antigas civilizações humanas. "
            "A Mesopotâmia (atual Iraque), o Vale do Indo (atual Paquistão) e a China "
            "antiga desenvolveram a escrita, as primeiras cidades e sistemas de governo "
            "há mais de 5.000 anos. A Grande Muralha da China é tão comprida que "
            "levaria meses para ser percorrida a pé!"
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Mapa-múndi infantil educativo com destaque apenas para o continente asiático em cor laranja viva, demais continentes em cinza claro, estilo didático escolar, fundo branco",
            "alt": "Mapa-múndi com a Ásia destacada em laranja"
        }
    },
    {
        "id": "GEO3_AV1_006",
        "tema": "Linhas Imaginárias",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o globo terrestre com as linhas imaginárias. Qual linha divide a Terra em Hemisfério Norte e Hemisfério Sul?",
        "alternativas": ["Meridiano de Greenwich", "Trópico de Câncer", "Linha do Equador", "Círculo Polar Ártico"],
        "resposta_correta": 2,
        "explicacao": "A Linha do Equador (0° de latitude) divide a Terra em Hemisfério Norte e Hemisfério Sul.",
        "cronica_do_guardiao": (
            "A Linha do Equador não existe fisicamente, mas tem efeitos reais no clima! "
            "As regiões próximas ao Equador recebem o Sol quase diretamente o ano todo, "
            "criando climas quentes e úmidos. O Brasil é um dos poucos países do mundo "
            "que a Linha do Equador atravessa — e por isso parte do nosso país tem "
            "floresta amazônica densa e outro parte tem o Pantanal."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama de globo terrestre educativo infantil mostrando a Linha do Equador destacada em vermelho, hemisférios Norte e Sul identificados, estilo didático escolar colorido",
            "alt": "Globo terrestre com Linha do Equador destacada"
        }
    },
    {
        "id": "GEO3_AV1_007",
        "tema": "Linhas Imaginárias",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o globo. Qual linha imaginárias divide a Terra em Hemisfério Leste e Hemisfério Oeste?",
        "alternativas": ["Linha do Equador", "Meridiano de Greenwich", "Trópico de Capricórnio", "Círculo Polar"],
        "resposta_correta": 1,
        "explicacao": "O Meridiano de Greenwich (0° de longitude) divide a Terra em Hemisfério Leste e Hemisfério Oeste.",
        "cronica_do_guardiao": (
            "Em 1884, representantes de 25 países se reuniram em Washington e decidiram "
            "que o Meridiano de Greenwich, que passa pelo Observatório Real em Londres, "
            "seria o ponto zero do mundo. Antes disso, cada país usava seu próprio meridiano "
            "central! Imagine a bagunça nos mapas e nos relógios. A decisão foi um grande "
            "passo para a cooperação internacional."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama de globo terrestre educativo infantil mostrando o Meridiano de Greenwich destacado em azul, hemisférios Leste e Oeste identificados, estilo didático escolar colorido",
            "alt": "Globo terrestre com Meridiano de Greenwich destacado"
        }
    },
]


# ─────────────────────────────────────────────────────────────
# DATA: 5º ANO – GEOGRAFIA – AV1
# ─────────────────────────────────────────────────────────────
GEO_5ANO = [
    {
        "id": "GEO5_AV1_001",
        "tema": "Hemisférios Terrestres",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o diagrama do globo terrestre. O Brasil está localizado principalmente em qual hemisfério em relação à Linha do Equador?",
        "alternativas": ["Hemisfério Norte", "Hemisfério Sul", "Igualmente nos dois", "Hemisfério Leste"],
        "resposta_correta": 1,
        "explicacao": "A maior parte do território brasileiro está no Hemisfério Sul, abaixo da Linha do Equador.",
        "cronica_do_guardiao": (
            "O Brasil é um dos maiores países em extensão territorial do mundo — o 5º maior! "
            "Por estar principalmente no Hemisfério Sul, nossas estações do ano são inversas "
            "às da Europa e América do Norte. Quando aqui é verão (dezembro), lá é inverno. "
            "Isso confunde muitos visitantes que chegam para o Natal e encontram calor intenso!"
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama de globo terrestre educativo mostrando o Brasil destacado em verde, com Linha do Equador visível em vermelho, Hemisfério Sul identificado, estilo didático infantil",
            "alt": "Globo com o Brasil destacado no Hemisfério Sul"
        }
    },
    {
        "id": "GEO5_AV1_002",
        "tema": "Rotação e Translação",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o diagrama. Qual movimento da Terra causa a alternância entre o dia e a noite?",
        "alternativas": ["Translação", "Rotação", "Precessão", "Nutação"],
        "resposta_correta": 1,
        "explicacao": "É a Rotação — movimento da Terra em torno do próprio eixo — que causa o dia e a noite. Dura aproximadamente 24 horas.",
        "cronica_do_guardiao": (
            "Por muito tempo, as pessoas acreditavam que era o Sol que girava ao redor da Terra. "
            "Foi Nicolau Copérnico, no século XVI, quem defendeu que a Terra girava em torno do Sol. "
            "Galileu Galilei foi perseguido pela Igreja por apoiar essa ideia! Hoje sabemos que "
            "a Terra completa uma rotação a cada 24 horas, mas na verdade são 23h 56min e 4 segundos — "
            "por isso temos anos bissextos para corrigir esse pequeno erro acumulado."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama educativo infantil mostrando a Terra girando em torno do próprio eixo (rotação), com seta circular indicando o movimento, lado iluminado (dia) e lado escuro (noite) visíveis, estilo didático escolar",
            "alt": "Diagrama da rotação da Terra causando dia e noite"
        }
    },
    {
        "id": "GEO5_AV1_003",
        "tema": "Rotação e Translação",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o diagrama do Sistema Solar. Qual movimento da Terra causa as estações do ano?",
        "alternativas": ["Rotação", "Translação", "Movimento das marés", "Inclinação isolada"],
        "resposta_correta": 1,
        "explicacao": "É a Translação — o movimento da Terra ao redor do Sol — combinado com a inclinação do eixo terrestre que causa as 4 estações do ano. Dura aproximadamente 365 dias.",
        "cronica_do_guardiao": (
            "As estações do ano fascinavam os povos antigos. Os astecas, egípcios e gregos "
            "construíram monumentos alinhados com os solstícios e equinócios — os momentos "
            "que marcam o início das estações. Stonehenge, na Inglaterra, e o Templo de Karnak, "
            "no Egito, são exemplos de como a astronomia e a arquitetura se uniram para "
            "marcar o calendário das colheitas e festividades religiosas."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama educativo infantil mostrando a Terra em translação ao redor do Sol, com as 4 estações do ano identificadas nas posições da órbita, estilo didático colorido escolar",
            "alt": "Diagrama da translação da Terra e as 4 estações do ano"
        }
    },
    {
        "id": "GEO5_AV1_004",
        "tema": "Camadas Internas da Terra",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o corte transversal da Terra. Qual é a camada mais externa do planeta?",
        "alternativas": ["Núcleo", "Manto", "Crosta", "Astenosfera"],
        "resposta_correta": 2,
        "explicacao": "A Crosta é a camada mais externa da Terra, onde vivemos. É relativamente fina comparada ao Manto e ao Núcleo.",
        "cronica_do_guardiao": (
            "A Crosta terrestre parece sólida e estável, mas ela está constantemente se movendo! "
            "É dividida em placas tectônicas que flutuam sobre o Manto derretido. Esses movimentos "
            "lentos — alguns centímetros por ano — causam terremotos, formam montanhas e abrem oceanos. "
            "Os Himalaias, a maior cadeia de montanhas do mundo, ainda crescem alguns milímetros por ano "
            "por causa da colisão entre as placas da Índia e da Eurásia."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama educativo infantil mostrando o corte transversal da Terra com as camadas (Crosta, Manto, Núcleo externo, Núcleo interno) coloridas e identificadas, estilo didático escolar colorido",
            "alt": "Corte transversal das camadas internas da Terra"
        }
    },
    {
        "id": "GEO5_AV1_005",
        "tema": "Camadas Atmosféricas",
        "tipo": "diagram_analysis",
        "pergunta": "Observe o diagrama das camadas da atmosfera. Em qual camada ocorrem os fenômenos climáticos como chuva, nuvens e vento?",
        "alternativas": ["Estratosfera", "Mesosfera", "Termosfera", "Troposfera"],
        "resposta_correta": 3,
        "explicacao": "A Troposfera é a camada mais próxima da Terra, onde ocorrem todos os fenômenos climáticos: chuva, vento, nuvens e tempestades.",
        "cronica_do_guardiao": (
            "A Troposfera vai do solo até cerca de 12 km de altitude — é onde voam os aviões comerciais! "
            "Logo acima está a Estratosfera, que contém a camada de ozônio, um escudo natural que nos "
            "protege da radiação ultravioleta do Sol. Na década de 1980, cientistas descobriram um buraco "
            "nessa camada causado por produtos químicos humanos. Graças a acordos internacionais, "
            "esse buraco está lentamente se recuperando — uma das maiores vitórias ambientais da história."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Diagrama educativo infantil mostrando as camadas da atmosfera terrestre (Troposfera, Estratosfera, Mesosfera, Termosfera, Exosfera) com altitudes indicadas, avião na Troposfera, estilo didático colorido",
            "alt": "Diagrama das camadas da atmosfera terrestre"
        }
    },
    {
        "id": "GEO5_AV1_006",
        "tema": "Pontos Cardeais e Colaterais",
        "tipo": "diagram_analysis",
        "pergunta": "Observe a rosa dos ventos completa. Qual é o ponto colateral entre Norte e Leste?",
        "alternativas": ["Noroeste", "Sudeste", "Nordeste", "Sudoeste"],
        "resposta_correta": 2,
        "explicacao": "Nordeste (NE) é o ponto colateral localizado entre o Norte e o Leste na rosa dos ventos.",
        "cronica_do_guardiao": (
            "A rosa dos ventos foi desenvolvida pelos marinheiros medievais para navegar com mais precisão. "
            "A palavra 'Nordeste' deu nome a uma região inteira do Brasil — uma das mais culturalmente "
            "ricas do país. O vento que sopra do Nordeste para o Sudeste nas costas brasileiras foi "
            "fundamental para os navegadores portugueses chegarem ao Brasil em 1500. "
            "Pedro Álvares Cabral aproveitou exatamente esses ventos em sua viagem histórica."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Rosa dos ventos educativa completa com os 4 pontos cardeais e 4 pontos colaterais (NE, SE, SO, NO) claramente identificados com cores diferentes, estilo didático infantil colorido",
            "alt": "Rosa dos ventos com pontos cardeais e colaterais"
        }
    },
    {
        "id": "GEO5_AV1_007",
        "tema": "Argentina e Chile",
        "tipo": "map_analysis",
        "pergunta": "Observe o mapa da América do Sul. Qual país faz fronteira com o Brasil ao sul e tem Buenos Aires como capital?",
        "alternativas": ["Chile", "Uruguai", "Argentina", "Paraguai"],
        "resposta_correta": 2,
        "explicacao": "A Argentina faz fronteira com o Brasil ao sul e sudoeste, e sua capital é Buenos Aires.",
        "cronica_do_guardiao": (
            "A Argentina é o segundo maior país da América do Sul e tem uma das regiões mais "
            "férteis do mundo: a Pampa. Essa vasta planície é tão produtiva que a Argentina "
            "é um dos maiores exportadores de soja e carne bovina do planeta. Buenos Aires, "
            "sua capital, é chamada de 'Paris da América do Sul' pela sua arquitetura europeia "
            "e sua vibrante vida cultural — especialmente o tango, dança que nasceu lá!"
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Mapa educativo infantil da América do Sul com a Argentina destacada em cor azul-celeste, países vizinhos em cinza, fronteiras e capital Buenos Aires identificada, estilo didático escolar",
            "alt": "Mapa da América do Sul com a Argentina destacada"
        }
    },
    {
        "id": "GEO5_AV1_008",
        "tema": "Bolívia, Uruguai e Paraguai",
        "tipo": "map_analysis",
        "pergunta": "Observe o mapa. Qual desses países não tem saída para o mar (é um país sem litoral)?",
        "alternativas": ["Uruguai", "Argentina", "Bolívia", "Chile"],
        "resposta_correta": 2,
        "explicacao": "A Bolívia é um país mediterrâneo (sem litoral) da América do Sul. Perdeu seu acesso ao mar para o Chile durante a Guerra do Pacífico (1879-1884).",
        "cronica_do_guardiao": (
            "A Bolívia já teve acesso ao Oceano Pacífico, mas perdeu seu litoral para o Chile "
            "durante a Guerra do Pacífico no século XIX. Desde então, o país luta diplomaticamente "
            "para recuperar uma saída para o mar. Curiosamente, a Bolívia mantém uma 'Marinha' "
            "— uma força naval que opera nos rios e no Lago Titicaca, o lago navegável mais alto "
            "do mundo, a 3.800 metros de altitude. É um símbolo de esperança e identidade nacional."
        ),
        "imagem": {
            "modo": "gerar_no_antigravity",
            "prompt": "Mapa educativo infantil da América do Sul com Bolívia, Uruguai e Paraguai destacados em cores diferentes, sem litoral identificado para a Bolívia, estilo didático escolar colorido",
            "alt": "Mapa mostrando Bolívia, Uruguai e Paraguai na América do Sul"
        }
    },
]


class Command(BaseCommand):
    help = "Seed visual Geography questions (maps, diagrams, images) for 3rd and 5th grade – AV1"

    def add_arguments(self, parser):
        parser.add_argument('--ano', type=int, choices=[3, 5], help='Seed only a specific year (3 or 5)')
        parser.add_argument('--dry-run', action='store_true', help='Show what would be created without saving')

    def handle(self, *args, **options):
        ano_filter = options.get('ano')
        dry_run    = options.get('dry_run', False)

        datasets = []
        if not ano_filter or ano_filter == 3:
            datasets.append((3, GEO_3ANO))
        if not ano_filter or ano_filter == 5:
            datasets.append((5, GEO_5ANO))

        TYPE_MAP = {
            'multiple_choice':       'multiple_choice',
            'image_multiple_choice': 'image_multiple_choice',
            'map_analysis':          'map_analysis',
            'diagram_analysis':      'diagram_analysis',
            'visual_interpretation': 'visual_interpretation',
        }

        total_created = 0
        total_skipped = 0

        for ano, questions in datasets:
            self.stdout.write(self.style.MIGRATE_HEADING(f"\n→ {ano}º ano – Geografia – AV1"))

            grade,   _ = QuizGrade.objects.get_or_create(name=f"{ano}º ano")
            subject, _ = QuizSubject.objects.get_or_create(name="Geografia")

            for item in questions:
                assessment, _ = QuizAssessment.objects.get_or_create(
                    name="AV1", grade=grade, subject=subject
                )
                topic, _ = QuizTopic.objects.get_or_create(
                    name=item["tema"], subject=subject, grade=grade, assessment=assessment
                )

                img = item.get("imagem", {})
                image_prompt = img.get("prompt")
                image_alt    = img.get("alt")
                has_image    = bool(img and img.get("modo") != "none")

                alternativas = item["alternativas"]
                answer = alternativas[item["resposta_correta"]]
                q_type = TYPE_MAP.get(item["tipo"], "multiple_choice")

                exists = QuizQuestion.objects.filter(
                    topic=topic,
                    metadata_json__id_original=item["id"]
                ).exists()

                if exists:
                    self.stdout.write(f"  ⏭ Skipping {item['id']} (already exists)")
                    total_skipped += 1
                    continue

                self.stdout.write(f"  {'[DRY-RUN] ' if dry_run else ''}✓ {item['id']} – {item['tema']}")

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
                        image_mode          = "generated_asset" if has_image else "none",
                        image_prompt        = image_prompt,
                        image_alt           = image_alt,
                        image_url           = None,  # será preenchido após geração
                        source              = "manual",
                        metadata_json       = {
                            "id_original": item["id"],
                            "avaliacao":   "AV1",
                            "raw_tipo":    item["tipo"],
                        },
                    )
                    total_created += 1

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS(
            f"✅ Done! Created: {total_created}  |  Skipped: {total_skipped}"
        ))
        if dry_run:
            self.stdout.write(self.style.WARNING("(Dry-run mode — nothing was saved)"))
