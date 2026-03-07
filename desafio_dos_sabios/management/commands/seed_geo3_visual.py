"""
Management command: seed_geo3_visual
Importa 20 questões visuais de Geografia – 3º ano – AV1 – 1º trimestre.

Uso:
    python manage.py seed_geo3_visual
    python manage.py seed_geo3_visual --dry-run
"""
from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

PAYLOAD = {
    "serie": "3º ano",
    "disciplina": "Geografia",
    "avaliacao": "AV1",
    "questions": [
        {
            "id": "GEO3_VISUAL_001",
            "ano": 3,
            "tema": "Continentes",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa-múndi e identifique o continente destacado.",
            "alternativas": ["Ásia", "Europa", "África", "Oceania"],
            "resposta_correta": 0,
            "explicacao": "O continente destacado é a Ásia.",
            "cronica_do_guardiao": "A Ásia é o maior continente da Terra e abriga algumas das civilizações mais antigas do mundo. Muitos povos, línguas e tradições nasceram ali, tornando esse continente muito importante para a história humana.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil educativo com todos os continentes coloridos e apenas a Asia destacada em amarelo forte, nomes legiveis, estilo escolar, fundo claro",
                "alt": "Mapa-mundi com a Asia destacada"
            }
        },
        {
            "id": "GEO3_VISUAL_002",
            "ano": 3,
            "tema": "Continentes",
            "tipo": "map_analysis",
            "pergunta": "No mapa, qual continente está destacado abaixo da Europa?",
            "alternativas": ["Ásia", "África", "Oceania", "Antártida"],
            "resposta_correta": 1,
            "explicacao": "O continente destacado é a África.",
            "cronica_do_guardiao": "A África fica ao sul da Europa e foi berço de povos muito antigos. Estudar continentes ajuda a criança a enxergar melhor a ordem do mundo e a posição dos lugares no mapa.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil educativo com a Africa destacada em laranja, Europa visivel acima, nomes simples, fundo branco, estilo didatico",
                "alt": "Mapa-mundi com a Africa destacada"
            }
        },
        {
            "id": "GEO3_VISUAL_003",
            "ano": 3,
            "tema": "Continentes",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa e marque o continente gelado do extremo sul.",
            "alternativas": ["Antártida", "Oceania", "Ásia", "África"],
            "resposta_correta": 0,
            "explicacao": "O continente do extremo sul é a Antártida.",
            "cronica_do_guardiao": "A Antártida é o continente mais frio do planeta. Mesmo sendo um lugar muito distante, ela tem grande valor para pesquisas sobre clima, gelo e mudanças naturais da Terra.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil com a Antartida destacada em azul claro, gelo visivel, estilo escolar, continentes simples e coloridos",
                "alt": "Mapa-mundi com a Antartida destacada"
            }
        },
        {
            "id": "GEO3_VISUAL_004",
            "ano": 3,
            "tema": "Continentes",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa. Qual continente destacado fica a oeste da África?",
            "alternativas": ["Europa", "América do Sul", "Ásia", "Oceania"],
            "resposta_correta": 1,
            "explicacao": "O continente destacado é a América do Sul.",
            "cronica_do_guardiao": "A América do Sul é o continente onde fica o Brasil. Aprender sua posição em relação aos outros continentes ajuda a desenvolver localização e leitura cartográfica.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil educativo com a America do Sul destacada em verde, Africa visivel ao lado leste, estilo limpo escolar",
                "alt": "Mapa-mundi com a America do Sul destacada"
            }
        },
        {
            "id": "GEO3_VISUAL_005",
            "ano": 3,
            "tema": "Oceanos",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa com oceanos nomeados. Qual oceano está destacado entre a América e a Europa?",
            "alternativas": ["Pacífico", "Atlântico", "Índico", "Ártico"],
            "resposta_correta": 1,
            "explicacao": "O oceano destacado é o Atlântico.",
            "cronica_do_guardiao": "O Atlântico foi muito importante nas grandes navegações e na história do Brasil. Por ele passaram navios, exploradores e muitas transformações do mundo moderno.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil com oceanos, oceano Atlantico destacado em azul mais escuro entre America e Europa, nomes grandes e legiveis",
                "alt": "Mapa-mundi com o oceano Atlantico destacado"
            }
        },
        {
            "id": "GEO3_VISUAL_006",
            "ano": 3,
            "tema": "Oceanos",
            "tipo": "map_analysis",
            "pergunta": "Qual oceano destacado aparece a oeste da América do Sul?",
            "alternativas": ["Atlântico", "Índico", "Pacífico", "Ártico"],
            "resposta_correta": 2,
            "explicacao": "O oceano a oeste da América do Sul é o Pacífico.",
            "cronica_do_guardiao": "O Pacífico é o maior oceano da Terra. Seu tamanho mostra como o planeta é vasto e como os mares sempre tiveram grande importância para a história humana.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da America do Sul com o oceano Pacifico destacado a oeste, estilo infantil educativo, legenda simples",
                "alt": "Mapa da America do Sul com o oceano Pacifico destacado"
            }
        },
        {
            "id": "GEO3_VISUAL_007",
            "ano": 3,
            "tema": "Oceanos",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa. Qual oceano destacado fica entre a África, a Ásia e a Oceania?",
            "alternativas": ["Índico", "Atlântico", "Pacífico", "Antártico"],
            "resposta_correta": 0,
            "explicacao": "O oceano destacado é o Índico.",
            "cronica_do_guardiao": "O oceano Índico foi uma rota de comércio muito importante entre povos asiáticos, africanos e árabes. A Geografia ajuda a explicar por que esses encontros aconteceram.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi infantil com o oceano Indico destacado, Africa a oeste, Asia ao norte e Oceania a leste, estilo didatico claro",
                "alt": "Mapa-mundi com o oceano Indico destacado"
            }
        },
        {
            "id": "GEO3_VISUAL_008",
            "ano": 3,
            "tema": "Pontos Cardeais",
            "tipo": "diagram_analysis",
            "pergunta": "Observe a rosa dos ventos. Qual direção está na parte superior?",
            "alternativas": ["Sul", "Norte", "Leste", "Oeste"],
            "resposta_correta": 1,
            "explicacao": "Na rosa dos ventos, o Norte fica na parte superior.",
            "cronica_do_guardiao": "A rosa dos ventos é uma ferramenta tradicional da cartografia. Ela ensina direção e organização espacial, algo muito importante para mapas, viagens e orientação.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Rosa dos ventos infantil educativa com Norte no topo, Sul embaixo, Leste a direita e Oeste a esquerda, estilo didatico, fundo claro",
                "alt": "Rosa dos ventos com Norte na parte superior"
            }
        },
        {
            "id": "GEO3_VISUAL_009",
            "ano": 3,
            "tema": "Pontos Cardeais",
            "tipo": "diagram_analysis",
            "pergunta": "Na rosa dos ventos, qual direção aparece à direita?",
            "alternativas": ["Oeste", "Sul", "Leste", "Norte"],
            "resposta_correta": 2,
            "explicacao": "Na rosa dos ventos, à direita fica o Leste.",
            "cronica_do_guardiao": "Em muitos mapas, o Leste aparece à direita. Isso ajuda a criança a criar uma referência visual estável para se localizar no espaço.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Rosa dos ventos simples e colorida, com foco no Leste a direita, letras grandes N S L O, estilo infantil escolar",
                "alt": "Rosa dos ventos destacando o Leste à direita"
            }
        },
        {
            "id": "GEO3_VISUAL_010",
            "ano": 3,
            "tema": "Pontos Cardeais",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a imagem do nascer do sol. Em qual direção o Sol nasce?",
            "alternativas": ["Norte", "Sul", "Leste", "Oeste"],
            "resposta_correta": 2,
            "explicacao": "O Sol nasce no Leste.",
            "cronica_do_guardiao": "Por muitos séculos, observar o sol foi uma forma de orientação para viajantes e agricultores. A criação oferece sinais que ajudam a vida humana a se organizar.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Ilustracao educativa infantil do sol nascendo no horizonte com seta indicando Leste, paisagem simples, estilo escolar",
                "alt": "Ilustracao do sol nascendo no Leste"
            }
        },
        {
            "id": "GEO3_VISUAL_011",
            "ano": 3,
            "tema": "Pontos Cardeais",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a imagem do pôr do sol. Em qual direção o Sol se põe?",
            "alternativas": ["Leste", "Oeste", "Norte", "Sul"],
            "resposta_correta": 1,
            "explicacao": "O Sol se põe no Oeste.",
            "cronica_do_guardiao": "O pôr do sol marca o encerramento do dia e foi observado por muitos povos para organizar o tempo e o trabalho.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Ilustracao educativa infantil do sol se pondo no horizonte com seta indicando Oeste, cores quentes, estilo didatico",
                "alt": "Ilustracao do sol se pondo no Oeste"
            }
        },
        {
            "id": "GEO3_VISUAL_012",
            "ano": 3,
            "tema": "Pontos Cardeais",
            "tipo": "diagram_analysis",
            "pergunta": "Observe a bússola ilustrada. Para que ela serve?",
            "alternativas": ["Medir calor", "Encontrar direções", "Medir peso", "Cortar papel"],
            "resposta_correta": 1,
            "explicacao": "A bússola serve para encontrar direções.",
            "cronica_do_guardiao": "A bússola foi uma invenção muito importante para as navegações. Ela ajudou povos a cruzar mares e descobrir caminhos com mais segurança.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Bussola infantil educativa com agulha apontando norte, estilo escolar, fundo branco, grande e legivel",
                "alt": "Bússola simples para orientação"
            }
        },
        {
            "id": "GEO3_VISUAL_013",
            "ano": 3,
            "tema": "Ásia",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa. O continente destacado é:",
            "alternativas": ["Europa", "África", "Ásia", "América do Norte"],
            "resposta_correta": 2,
            "explicacao": "O continente destacado é a Ásia.",
            "cronica_do_guardiao": "A Ásia é o maior continente da Terra e também o mais populoso. Muitas culturas importantes surgiram ali.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa-mundi educativo com a Asia destacada e os demais continentes em tons suaves, estilo escolar",
                "alt": "Mapa-mundi destacando a Ásia"
            }
        },
        {
            "id": "GEO3_VISUAL_014",
            "ano": 3,
            "tema": "Ásia",
            "tipo": "map_analysis",
            "pergunta": "Observe o mapa com o Japão marcado. Em qual continente ele fica?",
            "alternativas": ["Europa", "Ásia", "Oceania", "África"],
            "resposta_correta": 1,
            "explicacao": "O Japão fica na Ásia.",
            "cronica_do_guardiao": "O Japão é conhecido como Terra do Sol Nascente. Esse país ajuda muitas crianças a reconhecerem a Ásia no mapa.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Mapa da Asia oriental infantil com o Japao destacado em vermelho, estilo didatico escolar, mar e paises vizinhos simples",
                "alt": "Mapa da Ásia com o Japão destacado"
            }
        },
        {
            "id": "GEO3_VISUAL_015",
            "ano": 3,
            "tema": "Ásia",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a imagem com um templo oriental e a bandeira do Japão. Esse país pertence a qual continente?",
            "alternativas": ["América", "África", "Ásia", "Europa"],
            "resposta_correta": 2,
            "explicacao": "O Japão pertence à Ásia.",
            "cronica_do_guardiao": "Imagens culturais ajudam a associar lugares, povos e tradições. Geografia também é aprender a reconhecer o mundo por seus sinais visíveis.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Ilustracao infantil educativa com bandeira do Japao, templo japones ao fundo e legenda simples, estilo escolar",
                "alt": "Imagem representativa do Japão"
            }
        },
        {
            "id": "GEO3_VISUAL_016",
            "ano": 3,
            "tema": "Linhas Imaginárias",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o globo com uma linha horizontal no centro. Essa linha representa:",
            "alternativas": ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Câncer", "Linha do horizonte"],
            "resposta_correta": 1,
            "explicacao": "A linha horizontal central representa a Linha do Equador.",
            "cronica_do_guardiao": "A Linha do Equador divide a Terra em hemisfério Norte e Sul. É uma das referências geográficas mais importantes do planeta.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo terrestre educativo infantil com linha do Equador destacada em vermelho no centro, hemisferios norte e sul indicados, estilo escolar claro",
                "alt": "Globo terrestre com a Linha do Equador destacada"
            }
        },
        {
            "id": "GEO3_VISUAL_017",
            "ano": 3,
            "tema": "Linhas Imaginárias",
            "tipo": "diagram_analysis",
            "pergunta": "Observe o globo com uma linha vertical central. Essa linha representa:",
            "alternativas": ["Linha do Equador", "Meridiano de Greenwich", "Trópico de Capricórnio", "Linha internacional de data"],
            "resposta_correta": 1,
            "explicacao": "A linha vertical central representa o Meridiano de Greenwich.",
            "cronica_do_guardiao": "O Meridiano de Greenwich se tornou uma referência mundial de localização e também de organização do tempo.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo terrestre educativo infantil com Meridiano de Greenwich destacado em azul vertical, hemisferios leste e oeste visiveis, estilo didatico",
                "alt": "Globo com o Meridiano de Greenwich destacado"
            }
        },
        {
            "id": "GEO3_VISUAL_018",
            "ano": 3,
            "tema": "Linhas Imaginárias",
            "tipo": "diagram_analysis",
            "pergunta": "A linha destacada no centro do globo divide a Terra em quais hemisférios?",
            "alternativas": ["Leste e Oeste", "Norte e Sul", "Europa e Ásia", "Atlântico e Pacífico"],
            "resposta_correta": 1,
            "explicacao": "A linha destacada divide a Terra em Norte e Sul.",
            "cronica_do_guardiao": "Os hemisférios são partes do planeta usadas para facilitar a localização. Essa divisão ajuda a pensar a Terra com clareza e ordem.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo educativo com Linha do Equador destacada e labels Hemisferio Norte e Hemisferio Sul, estilo escolar infantil",
                "alt": "Globo com hemisfério Norte e Sul"
            }
        },
        {
            "id": "GEO3_VISUAL_019",
            "ano": 3,
            "tema": "Linhas Imaginárias",
            "tipo": "diagram_analysis",
            "pergunta": "A linha vertical destacada no globo divide a Terra em quais hemisférios?",
            "alternativas": ["Norte e Sul", "Leste e Oeste", "Quente e frio", "Superior e inferior"],
            "resposta_correta": 1,
            "explicacao": "A linha vertical destacada divide a Terra em Leste e Oeste.",
            "cronica_do_guardiao": "Leste e Oeste são divisões muito úteis para localizar países e continentes no globo terrestre.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Globo educativo com Meridiano de Greenwich destacado e labels Hemisferio Leste e Hemisferio Oeste, estilo didatico infantil",
                "alt": "Globo com hemisfério Leste e Oeste"
            }
        },
        {
            "id": "GEO3_VISUAL_020",
            "ano": 3,
            "tema": "Revisão Geral",
            "tipo": "visual_interpretation",
            "pergunta": "Observe a prancha com mapa-múndi, rosa dos ventos, globo com Equador e desenho do Japão. Esses elementos pertencem ao estudo de:",
            "alternativas": ["Matemática", "Geografia", "Ciências", "História"],
            "resposta_correta": 1,
            "explicacao": "Esses elementos pertencem ao estudo da Geografia.",
            "cronica_do_guardiao": "A Geografia ensina a localizar, comparar e interpretar o mundo criado. Ela une mapas, lugares, continentes, climas, povos e orientação em um grande quadro de sentido.",
            "imagem": {
                "modo": "gerar_no_antigravity",
                "prompt": "Prancha educativa infantil com mini mapa-mundi, rosa dos ventos, globo com linha do Equador e bandeira do Japao, estilo escolar organizado",
                "alt": "Prancha visual com elementos de Geografia"
            }
        },
    ]
}

TYPE_MAP = {
    'multiple_choice':       'multiple_choice',
    'image_multiple_choice': 'image_multiple_choice',
    'map_analysis':          'map_analysis',
    'diagram_analysis':      'diagram_analysis',
    'visual_interpretation': 'visual_interpretation',
    'true_false':            'true_false',
    'short_answer':          'short_answer',
    'ordering':              'ordering',
}


class Command(BaseCommand):
    help = "Seed visual Geography questions – 3rd grade – AV1 – 1st trimester (20 questions)"

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Show what would be created without saving')

    def handle(self, *args, **options):
        dry_run = options.get('dry_run', False)

        serie      = PAYLOAD["serie"]
        disciplina = PAYLOAD["disciplina"]
        avaliacao  = PAYLOAD["avaliacao"]

        self.stdout.write(self.style.MIGRATE_HEADING(
            f"\n→ {serie} – {disciplina} – {avaliacao}"
        ))

        # Ensure base hierarchy exists
        grade,   _ = QuizGrade.objects.get_or_create(name=f"{serie}")
        subject, _ = QuizSubject.objects.get_or_create(name=disciplina)

        created = 0
        skipped = 0

        for item in PAYLOAD["questions"]:
            assessment, _ = QuizAssessment.objects.get_or_create(
                name=avaliacao, grade=grade, subject=subject
            )
            topic, _ = QuizTopic.objects.get_or_create(
                name=item["tema"], subject=subject, grade=grade, assessment=assessment
            )

            # Check duplicate by id_original
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
                    image_url           = None,          # preenchido após geração
                    image_prompt        = img.get("prompt"),
                    image_alt           = img.get("alt"),
                    source              = "manual",
                    metadata_json       = {
                        "id_original": item["id"],
                        "serie":       serie,
                        "avaliacao":   avaliacao,
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
