import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

def seed_historia5_cap7():
    print("Seeding 50 History Chapter 7 (5º Ano) questions for Desafio dos Sábios...")

    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    subject, _ = QuizSubject.objects.get_or_create(name="História")
    assessment, _ = QuizAssessment.objects.get_or_create(
        name="AV2", grade=grade, subject=subject
    )

    questions_data = [
        # =========================================================================
        # EIXO 1: TRABALHO INDÍGENA E CATEQUESE (7 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_001",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual foi a primeira forma de mão de obra utilizada pelos portugueses para extrair o pau-brasil e iniciar as lavouras no Brasil?",
            "alternativas": ["Mão de obra dos povos indígenas", "Trabalhadores vindos da Ásia", "Escravizados trazidos da Europa", "Imigrantes franceses"],
            "resposta": "Mão de obra dos povos indígenas",
            "explicacao": "Com a chegada dos portugueses, os povos indígenas nativos foram os primeiros a trabalhar na extração de madeira e nas primeiras plantações.",
            "cronica_do_guardiao": "Os nativos conheciam cada trilha e árvore destas terras muito antes dos navios portugueses aportarem na costa.",
            "imagem_prompt": "Ilustracao didatica escolar 5 ano dos indigenas nativos e portugueses na costa do Brasil em 1500, estilo Arkanos",
            "imagem_alt": "Desenho didático dos indígenas e portugueses na costa do Brasil",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_001.png"
        },
        {
            "id": "HIST5_CAP7_002",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual ordem religiosa católica veio ao Brasil com o objetivo de catequizar os indígenas e ensiná-los a fé cristã?",
            "alternativas": ["Os Padres Jesuítas", "Os Cavaleiros Templários", "Os Monges Franciscanos de Lisboa", "Os Soldados Holandeses"],
            "resposta": "Os Padres Jesuítas",
            "explicacao": "Os padres jesuítas dedicaram-se ao ensino da fé católica aos indígenas, procurando transformar costumes nativos em hábitos europeus.",
            "cronica_do_guardiao": "Nas aldeias e missões, os jesuítas criaram escolas e igrejas para ensinar a doutrina católica e a língua portuguesa.",
            "imagem_prompt": "Ilustracao didatica escolar de um padre jesuita ensinando leitura e fe catolica para criancas indigenas em uma aldeia, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de padre jesuíta ensinando crianças indígenas",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_002.png"
        },
        {
            "id": "HIST5_CAP7_003",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe as razões da resistência indígena. Por que a escravização dos indígenas se tornou difícil para os portugueses comparada a outros grupos?",
            "alternativas": ["Porque conheciam profundamente a floresta e o território, facilitando fugas e guerras de resistência", "Porque os indígenas tinham navios de guerra mais rápidos que os portugueses", "Porque não existiam indígenas perto das praias", "Porque os reis da Europa proibiram o comércio"],
            "resposta": "Porque conheciam profundamente a floresta e o território, facilitando fugas e guerras de resistência",
            "explicacao": "Os indígenas conheciam perfeitamente o ambiente natural, permitindo reações com guerras, fugas para áreas de difícil acesso e recusa ao trabalho forçado.",
            "cronica_do_guardiao": "A floresta era o lar dos indígenas. Conhecendo cada esconderijo e rio, eles lutaram bravamente por sua liberdade.",
            "imagem_prompt": "Ilustracao didatica de guerreiros indigenas na densa mata tropical brasileira defendendo seu territorio, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho de indígenas na mata nativa",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_003.png"
        },
        {
            "id": "HIST5_CAP7_004",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual foi o impacto biológico devastador trazido pelos europeus que dizimou populações inteiras de indígenas no Brasil colonial?",
            "alternativas": ["Doenças como varíola, sarampo e gripe, contra as quais os nativos não tinham defesas biológicas", "A falta de água doce nas aldeias", "O calor excessivo do clima tropical", "A introdução do plantio de cana-de-açúcar"],
            "resposta": "Doenças como varíola, sarampo e gripe, contra as quais os nativos não tinham defesas biológicas",
            "explicacao": "Sem anticorpos contra os vírus europeus, surtos de varíola, gripe e sarampo causaram um número imenso de mortes entre as tribos nativas.",
            "cronica_do_guardiao": "Invisíveis aos olhos, os vírus trazidos nas caravelas foram armas letais contra as quais os povos da floresta não podiam se defender.",
            "imagem_prompt": "Desenho didatico escolar alertando sobre o impacto das doencas trazidas pelos colonizadores europeus, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático sobre o impacto das epidemias na população indígena",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_004.png"
        },
        {
            "id": "HIST5_CAP7_005",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Em qual ano a Coroa Portuguesa decreta oficialmente a libertação formal de todos os indígenas no Brasil?",
            "alternativas": ["1758", "1500", "1888", "1822"],
            "resposta": "1758",
            "explicacao": "Em 1758, a Coroa portuguesa declarou a libertação oficial dos indígenas, embora a escravização nativa já vinha sendo substituída pela mão de obra africana.",
            "cronica_do_guardiao": "O decreto de 1758 selou o fim oficial da escravidão indígena, consolidando o tráfico transatlântico africano como base do império.",
            "imagem_prompt": "Ilustracao didatica de um documento de lei real com selo de Portugal de 1758 declarando a liberdade indigena, estilo Arkanos",
            "imagem_alt": "Documento da lei de libertação dos indígenas de 1758",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_005.png"
        },
        {
            "id": "HIST5_CAP7_006",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "O escambo praticado no início da colonização era uma troca direta de mercadorias (como pau-brasil por machados e espelhos) sem a utilização de moedas.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "O escambo consistia na troca de trabalho e madeira por objetos trazidos pelos portugueses como facas, espelhos e tecidos.",
            "cronica_do_guardiao": "Antes do dinheiro existir na colônia, o comércio era feito na base da troca direta de bens entre nativos e europeus.",
            "imagem_prompt": "Ilustracao didatica de escambo entre indigenas trocando madeira por ferramentas de metal com portugueses, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático sobre a prática do escambo",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_006.png"
        },
        {
            "id": "HIST5_CAP7_007",
            "tema": "Trabalho Indígena e Catequese",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como os jesuítas viam os indígenas após a conversão ao catolicismo?",
            "alternativas": ["Como súditos disciplinados que deveriam servir à Coroa através do dever religioso e da obediência", "Como reis e governadores de Portugal", "Como soldados de navios de guerra", "Como proprietários de todos os engenhos"],
            "resposta": "Como súditos disciplinados que deveriam servir à Coroa através do dever religioso e da obediência",
            "explicacao": "Para a igreja e a Coroa, os nativos convertidos deveriam ser integrados à sociedade colonial como trabalhadores obedientes e cristãos.",
            "cronica_do_guardiao": "A fé e a disciplina das missões visavam moldar o trabalho e o comportamento dos nativos sob a autoridade portuguesa.",
            "imagem_prompt": "Ilustracao didatica de uma missao jesuitica com igreja de taipa e indigenas reunidos pacificamente, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de uma missão jesuítica no Brasil colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_007.png"
        },

        # =========================================================================
        # EIXO 2: TRÁFICO TRANSATLÂNTICO E NAVIOS NEGREIROS (8 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_008",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Como eram chamados os navios que transportavam milhares de africanos escravizados em condições desumanas através do Oceano Atlântico para o Brasil?",
            "alternativas": ["Navios Negreiros (ou Tumbeiros)", "Caravelas do Ouro", "Galés de Turismo", "Vapores de Guerra"],
            "resposta": "Navios Negreiros (ou Tumbeiros)",
            "explicacao": "Os navios negreiros eram conhecidos como 'tumbeiros' ou 'túmulos flutuantes' devido às altíssimas taxas de mortalidade durante a travessia marítima.",
            "cronica_do_guardiao": "As viagens no Atlântico eram marcadas pelo sofrimento. Milhares de vidas foram tragadas pela crueldade do comércio escravista.",
            "imagem_prompt": "Ilustracao historica didatica de um navio negreiro em alto mar sob ceu tempestuoso, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático de um navio negreiro no Atlântico",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_008.png"
        },
        {
            "id": "HIST5_CAP7_009",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o relato dos porões dos navios negreiros. Por que a taxa de mortalidade durante a viagem variava entre 5% e 25% dos passageiros?",
            "alternativas": ["Devido à superlotação extrema, falta de ventilação, surtos de doenças, fome e sede nos porões", "Porque os navios afundavam todos os dias em tempestades", "Porque os africanos preferiam nadar até a praia", "Por falta de mapas navegáveis"],
            "resposta": "Devido à superlotação extrema, falta de ventilação, surtos de doenças, fome e sede nos porões",
            "explicacao": "As péssimas condições sanitárias, alimentação racionada e falta de espaço provocavam doenças fatais entre os cativos durante os 30 a 50 dias de viagem.",
            "cronica_do_guardiao": "Nos porões escuros e abafados dos tumbeiros, a dor da separação e as enfermidades ceifavam inúmeras vidas.",
            "imagem_prompt": "Esquema didatico mostrando a maquete de corte interno de um navio negreiro com poroes superlotados, estilo Arkanos 5 ano",
            "imagem_alt": "Corte esquemático do interior de um navio negreiro",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_009.png"
        },
        {
            "id": "HIST5_CAP7_010",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Antes da chegada dos europeus, como funcionava a escravidão entre reinos no continente africano?",
            "alternativas": ["Decorria principalmente de disputas e guerras entre reinos, onde os prisioneiros derrotados se tornavam cativos", "Não existiam guerras nem reinos na África", "Todo o continente africano era governado por um único imperador", "Os cativos eram vendidos para a Ásia de avião"],
            "resposta": "Decorria principalmente de disputas e guerras entre reinos, onde os prisioneiros derrotados se tornavam cativos",
            "explicacao": "Na África existiam diversos reinos e rivalidades políticas. Os prisioneiros de guerra podiam ser submetidos à servidão local.",
            "cronica_do_guardiao": "A África era um continente vasto e plural, repleto de reinos ricos, tradições e culturas milenares.",
            "imagem_prompt": "Ilustracao didatica de um mapa historico do continente africano destacando grandes reinos e cidades antigas, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa didático dos reinos do continente africano",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_010.png"
        },
        {
            "id": "HIST5_CAP7_011",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Por que os colonizadores portugueses consideravam os trabalhadores africanos altamente aptos para o trabalho nos engenhos de açúcar?",
            "alternativas": ["Porque muitos africanos já dominavam técnicas avançadas de agricultura, manejo de gado e metalurgia em seus países de origem", "Porque os africanos não precisavam comer nem beber água", "Porque o açúcar era uma planta nativa da Europa", "Porque a viagem de navio era muito rápida"],
            "resposta": "Porque muitos africanos já dominavam técnicas avançadas de agricultura, manejo de gado e metalurgia em seus países de origem",
            "explicacao": "Muitos povos africanos trazidos possuíam grande conhecimento técnico em fundição de metais, irrigação e lavoura, sendo essenciais para a economia do engenho.",
            "cronica_do_guardiao": "Além de sua força de trabalho, os africanos trouxeram conhecimentos milenares de metalurgia e agricultura que construíram a riqueza da colônia.",
            "imagem_prompt": "Ilustracao didatica de artesãos e agricultores africanos trabalhando com metalurgia e cultivo, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração dos conhecimentos técnicos dos povos africanos",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_011.png"
        },
        {
            "id": "HIST5_CAP7_012",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "O comércio de escravizados africanos no Oceano Atlântico era um negócio extremamente lucrativo para os comerciantes e para a Coroa Portuguesa.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "O tráfico transatlântico movimentava enormes quantias de dinheiro em impostos e lucros para os negociantes de escravizados e para o reino português.",
            "cronica_do_guardiao": "O tráfico de seres humanos transformou-se em uma das atividades mais lucrativas do sistema mercantilista europeu.",
            "imagem_prompt": "Desenho didatico de comerciantes coloniais registrando moedas e documentos de trafico comercial, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho sobre o comércio transatlântico de escravizados",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_012.png"
        },
        {
            "id": "HIST5_CAP7_013",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência cronológica da trajetória de um africano escravizado trazido ao Brasil?",
            "alternativas": ["Captura na África -> Embarque no navio negreiro -> Travessia do Atlântico -> Trabalho forçado no engenho de açúcar", "Trabalho no engenho -> Embarque no navio -> Captura na África -> Abertura dos portos", "Embarque no navio -> Trabalho no engenho -> Libertação em 1758 -> Viagem para a Europa", "Grito do Ipiranga -> Captura na África -> Viagem de navio -> Chegada de D. João"],
            "resposta": "Captura na África -> Embarque no navio negreiro -> Travessia do Atlântico -> Trabalho forçado no engenho de açúcar",
            "explicacao": "A dolorosa trajetória começava com a captura no continente africano, seguida da longa travessia marítima nos tumbeiros e o trabalho nas lavouras do Brasil.",
            "cronica_do_guardiao": "Milhares de milhas oceânicas separavam a terra natal da árdua rotina de trabalho nas fazendas açucareiras.",
            "imagem_prompt": "Linha do tempo didatica ilustrada mostrando as etapas da travessia dos africanos escravizados, estilo Arkanos 5 ano",
            "imagem_alt": "Linha do tempo da trajetória transatlântica",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_013.png"
        },
        {
            "id": "HIST5_CAP7_014",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que acontecia com as famílias e comunidades africanas ao serem embarcadas nos navios negreiros?",
            "alternativas": ["Eram propositalmente separadas para dificultar a comunicação e evitar revoltas organizadas", "Viajavam em cabines de luxo juntas", "Ficavam morando na capital de Portugal", "Recebiam terras para cultivar no Brasil"],
            "resposta": "Eram propositalmente separadas para dificultar a comunicação e evitar revoltas organizadas",
            "explicacao": "Os traficantes separavam membros de uma mesma família e pessoas que falavam o mesmo idioma como estratégia para conter rebeliões.",
            "cronica_do_guardiao": "A separação forçada de famílias e grupos étnicos era uma tentativa cruel de enfraquecer os laços afetivos e comunitários.",
            "imagem_prompt": "Desenho didatico simbolizando a resistencia e uniao de pessoas que recriavam laços de parentesco no Brasil, estilo Arkanos",
            "imagem_alt": "Desenho simbolizando a resistência e laços comunitários",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_014.png"
        },
        {
            "id": "HIST5_CAP7_015",
            "tema": "Tráfico Transatlântico e Navios Negreiros",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual era a duração média da viagem de um navio negreiro saindo da costa da África até portos como o Rio de Janeiro?",
            "alternativas": ["Poderia durar entre 30 e 50 dias no mar", "Apenas 2 horas de viagem", "Mais de 10 anos ininterruptos", "Apenas 1 dia em mar calmo"],
            "resposta": "Poderia durar entre 30 e 50 dias no mar",
            "explicacao": "Mover navios a vela pelo Oceano Atlântico levava mais de um mês, tornando o confinamento e a escassez de suprimentos dramáticos.",
            "cronica_do_guardiao": "Semanas sem fim em alto-mar sob o calor e a tempestade testavam o limite humano nos tumbeiros.",
            "imagem_prompt": "Ilustracao didatica de um mapa com a rota de navegação transatlantica entre a Africa e o Brasil, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa das rotas transatlânticas do tráfico negreiro",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_015.png"
        },

        # =========================================================================
        # EIXO 3: A ESTRUTURA DO ENGENHO DE AÇÚCAR (9 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_016",
            "tema": "A Estrutura do Engenho",
            "tipo": "diagram_analysis",
            "dificuldade": "medium",
            "pergunta": "Quais são os três pilares que definiam a economia das colônias de exploração no Brasil (o 'Tríplice Pilar' açucareiro)?",
            "alternativas": ["Latifúndio (grande propriedade), Escravidão e Monocultura (um só produto)", "Pequena propriedade, trabalho assalariado e policultura", "Fábricas de carros, bancos e navegação a vapor", "Comércio livre, feiras e democracia"],
            "resposta": "Latifúndio (grande propriedade), Escravidão e Monocultura (um só produto)",
            "explicacao": "A grande propriedade produtora (latifúndio), a mão de obra escravizada e o foco no cultivo de um único produto exportável (monocultura) sustentavam a economia colonial.",
            "cronica_do_guardiao": "Estes três elementos moldaram a paisagem rural do Brasil por mais de três séculos.",
            "imagem_prompt": "Infografico didatico escolar 5 ano mostrando os 3 pilares: Latifundio, Escravidao e Monocultura, estilo Arkanos",
            "imagem_alt": "Infográfico do tríplice pilar da economia colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_016.png"
        },
        {
            "id": "HIST5_CAP7_017",
            "tema": "A Estrutura do Engenho",
            "tipo": "visual_interpretation",
            "dificuldade": "easy",
            "pergunta": "Na fazenda do engenho de açúcar, como era chamada a moradia grande e confortável onde residia o Senhor de Engenho e sua família?",
            "alternativas": ["Casa-Grande", "Senzala", "Casa de Purgar", "Moenda"],
            "resposta": "Casa-Grande",
            "explicacao": "A Casa-Grande era o centro de autoridade e moradia do proprietário do engenho, símbolo de poder da sociedade colonial.",
            "cronica_do_guardiao": "Localizada no ponto mais alto da propriedade, a Casa-Grande dominava a vista de toda a fazenda açucareira.",
            "imagem_prompt": "Ilustracao didatica da imponente Casa-Grande colonial brasileira com varandas e jardins, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da Casa-Grande de um engenho",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_017.png"
        },
        {
            "id": "HIST5_CAP7_018",
            "tema": "A Estrutura do Engenho",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Como era chamada a edificação rústica sem divisórias onde dormiam e viviam os trabalhadores escravizados na fazenda?",
            "alternativas": ["Senzala", "Casa-Grande", "Capela Real", "Fornalha"],
            "resposta": "Senzala",
            "explicacao": "A Senzala era o galpão abafado onde os escravizados repousavam após as exaustivas jornadas de trabalho na lavoura e no engenho.",
            "cronica_do_guardiao": "Apesar do sofrimento, na senzala os escravizados mantinham viva sua cultura, cantos, danças e memórias da África.",
            "imagem_prompt": "Ilustracao didatica da senzala ao lado dos canaviais sob a luz do luar, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da senzala colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_018.png"
        },
        {
            "id": "HIST5_CAP7_019",
            "tema": "A Estrutura do Engenho",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual era a função principal da 'Moenda' no processo de fabricação do açúcar?",
            "alternativas": ["Esmagar os colmos da cana-de-açúcar para extrair o seu caldo (garapa)", "Branquear e secar os blocos de açúcar", "Embarcar o açúcar nos navios para a Europa", "Realizar os batizados e missas da comunidade"],
            "resposta": "Esmagar os colmos da cana-de-açúcar para extrair o seu caldo (garapa)",
            "explicacao": "A moenda, movida por força hidráulica, tração animal ou humana, prensava a cana para extrair o suco que seria fervido nas fornalhas.",
            "cronica_do_guardiao": "Engrenagens de madeira pesada giravam dia e noite na moenda para transformar a cana colhida em caldo grosso.",
            "imagem_prompt": "Ilustracao didatica de uma moenda de cana tradicional movida a agua e bois em um engenho colonial, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração da moenda de cana colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_019.png"
        },
        {
            "id": "HIST5_CAP7_020",
            "tema": "A Estrutura do Engenho",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Em qual setor do engenho o caldo de cana era fervido em grandes tachos de cobre até se transformar em um melaço espesso?",
            "alternativas": ["Na Casa das Fornalhas (ou Cozimento)", "Na Capela", "Na Senzala", "No Armazém de Vendas"],
            "resposta": "Na Casa das Fornalhas (ou Cozimento)",
            "explicacao": "Nas fornalhas, o caldo fervia sob calor intenso para evaporar a água e concentrar o melaço de açúcar.",
            "cronica_do_guardiao": "O calor das fornalhas alimentadas a lenha exigia esforço físico extremo dos trabalhadores que mexiam os tachos ferventes.",
            "imagem_prompt": "Ilustracao didatica dos tachos de cobre sobre fornalhas acesas purificando o caldo de cana, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático das fornalhas do engenho",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_020.png"
        },
        {
            "id": "HIST5_CAP7_021",
            "tema": "A Estrutura do Engenho",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Para que servia a 'Casa de Purgar' no complexo do engenho colonial?",
            "alternativas": ["Para resfriar, escorrer o melaço excedente em fôrmas de barro e clarear (branquear) o açúcar em pão de açúcar", "Para moer os grãos de milho", "Para armazenar pólvora para os soldados", "Para fabricar moedas de ouro"],
            "resposta": "Para resfriar, escorrer o melaço excedente em fôrmas de barro e clarear (branquear) o açúcar em pão de açúcar",
            "explicacao": "Na casa de purgar, o melaço repousava em formas cônicas de barro onde a água purgada limpava o açúcar, formando os famosos 'pães de açúcar'.",
            "cronica_do_guardiao": "Semanas de repouso nas formas de barro transformavam o melaço escuro no cobiçado açúcar branco de exportação.",
            "imagem_prompt": "Ilustracao didatica da Casa de Purgar com formas de barro alinhadas para purificacao do acucar, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho da Casa de Purgar e formas de pão de açúcar",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_021.png"
        },
        {
            "id": "HIST5_CAP7_022",
            "tema": "A Estrutura do Engenho",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "A Capela do engenho servia apenas para casamentos do Senhor de Engenho, sendo proibida a entrada de qualquer outra pessoa da fazenda.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "A Capela servia como centro religioso de toda a comunidade da propriedade nos domingos, batizados, casamentos e funerais.",
            "cronica_do_guardiao": "A capela unia a comunidade em momentos de celebração e rituais religiosos no cotidiano colonial.",
            "imagem_prompt": "Ilustracao didatica de uma bonita capela colonial em frente ao terreiro da fazenda, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático de capela em engenho colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_022.png"
        },
        {
            "id": "HIST5_CAP7_023",
            "tema": "A Estrutura do Engenho",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual é a ordem correta das etapas de produção do açúcar no engenho?",
            "alternativas": ["Plantio e colheita da cana -> Moenda (extração do caldo) -> Fornalha (cozimento) -> Casa de Purgar (resfriamento e branqueamento) -> Encaixotamento e transporte", "Casa de Purgar -> Colheita -> Fornalha -> Moenda -> Plantio", "Transporte de navio -> Moenda -> Plantio -> Branqueamento -> Cozimento", "Fornalha -> Branqueamento -> Colheita -> Moenda -> Descarte"],
            "resposta": "Plantio e colheita da cana -> Moenda (extração do caldo) -> Fornalha (cozimento) -> Casa de Purgar (resfriamento e branqueamento) -> Encaixotamento e transporte",
            "explicacao": "O ciclo açucareiro seguia uma rigorosa ordem operacional: desde o cultivo nos campos até o beneficiamento final nas oficinas do engenho.",
            "cronica_do_guardiao": "Um ciclo fabril complexo que exigia coordenação precisa entre o campo e a fábrica colonial.",
            "imagem_prompt": "Fluxograma didatico escolar ilustrado mostrando as 5 etapas da producao de acucar no engenho, estilo Arkanos 5 ano",
            "imagem_alt": "Fluxograma das etapas de produção do açúcar",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_023.png"
        },
        {
            "id": "HIST5_CAP7_024",
            "tema": "A Estrutura do Engenho",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como era chamado o bloco sólido e cônico de açúcar endurecido resultante do processo da Casa de Purgar?",
            "alternativas": ["Pão de Açúcar", "Barra de Ouro", "Tacho de Cobre", "Lingote de Prata"],
            "resposta": "Pão de Açúcar",
            "explicacao": "O açúcar solidificado nas fôrmas saía no formato de um cone arredondado no topo, apelidado de 'pão de açúcar'.",
            "cronica_do_guardiao": "O formato característico do 'pão de açúcar' deu nome inclusive ao famoso morro na Baía de Guanabara no Rio de Janeiro.",
            "imagem_prompt": "Ilustracao didatica de um bloco solido de acucar no formato tradicional de pão de açucar colonial, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de um pão de açúcar colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_024.png"
        },

        # =========================================================================
        # EIXO 4: GEOGRAFIA E CONDIÇÕES NATURAIS DO AÇÚCAR (6 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_025",
            "tema": "Geografia do Açúcar",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Quais duas capitanias do Nordeste brasileiro se tornaram os maiores e mais prósperos centros produtores de açúcar do Brasil colonial?",
            "alternativas": ["Pernambuco e Bahia", "São Paulo e Rio de Janeiro", "Minas Gerais e Goiás", "Amazonas e Pará"],
            "resposta": "Pernambuco e Bahia",
            "explicacao": "Pernambuco e Bahia reuniam as melhores condições de solo, clima e localização geográfica para liderar a produção de açúcar.",
            "cronica_do_guardiao": "O litoral do Nordeste transformou-se no grande polo açucareiro do Império Português.",
            "imagem_prompt": "Mapa historico didatico da costa nordestina destacando as capitanias de Pernambuco e Bahia em 1600, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa destacando as capitanias de Pernambuco e Bahia",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_025.png"
        },
        {
            "id": "HIST5_CAP7_026",
            "tema": "Geografia do Açúcar",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como é chamado o solo escuro, argiloso e extremamente fértil característico da Zona da Mata nordestina que favorecia o cultivo da cana?",
            "alternativas": ["Solo de Massapê", "Terra Roxa", "Areia de Duna", "Cascalho de Mina"],
            "resposta": "Solo de Massapê",
            "explicacao": "O solo de massapê é rico em nutrientes e retém a umidade ideal para o rápido crescimento dos canaviais.",
            "cronica_do_guardiao": "A terra preta e pegajosa do massapê garantia colheitas fartas de cana ano após ano.",
            "imagem_prompt": "Ilustracao didatica escolar mostrando o solo fértil de massapê com brotos de cana-de-açucar crescendo, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático do solo de massapê",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_026.png"
        },
        {
            "id": "HIST5_CAP7_027",
            "tema": "Geografia do Açúcar",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual tipo de clima predominava no litoral do Nordeste favorecendo o desenvolvimento das plantações de cana?",
            "alternativas": ["Clima tropical, quente e úmido com chuvas regulares", "Clima polar gelado com neve", "Clima desértico sem nenhuma chuva", "Clima temperado com geadas rigorosas"],
            "resposta": "Clima tropical, quente e úmido com chuvas regulares",
            "explicacao": "A combinação de altas temperaturas e chuvas abundantes no litoral fornecia o ambiente perfeito para a cultura canavieira.",
            "cronica_do_guardiao": "Sol radiante e chuvas tropicais faziam os canaviais cobrirem as colinas litorâneas do Nordeste.",
            "imagem_prompt": "Ilustracao didatica de um canavial sob sol e chuva tropical na costa brasileira, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático do clima tropical nas plantações",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_027.png"
        },
        {
            "id": "HIST5_CAP7_028",
            "tema": "Geografia do Açúcar",
            "tipo": "map_analysis",
            "dificuldade": "medium",
            "pergunta": "Por que a localização geográfica das capitanias do Nordeste facilitava o comércio de açúcar com a Europa?",
            "alternativas": ["Porque eram as capitanias mais próximas do continente europeu, barateando e encurtando as viagens de navio", "Porque ficavam ao lado da Ásia", "Porque não precisavam usar navios para transportar o açúcar", "Porque a Europa ficava dentro do Brasil"],
            "resposta": "Porque eram as capitanias mais próximas do continente europeu, barateando e encurtando as viagens de navio",
            "explicacao": "A proximidade do Nordeste com o oceano Atlântico Norte reduzia o tempo de navegação em comparação com o sul da colônia.",
            "cronica_do_guardiao": "As caravelas carregadas de caixas de açúcar zarpavam de Recife e Salvador direto rumo aos portos da Europa.",
            "imagem_prompt": "Mapa historico didatico das rotas maritimas no Atlantico ligando o Nordeste do Brasil a Portugal e Europa, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa das rotas comerciais entre o Nordeste e a Europa",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_028.png"
        },
        {
            "id": "HIST5_CAP7_029",
            "tema": "Geografia do Açúcar",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "O açúcar era um produto de baixo valor na Europa no século XVI, sendo usado apenas como ração para animais.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "O açúcar era apelidado de 'ouro branco', considerado um artigo de luxo raríssimo e muito valioso nas mesas da nobreza europeia.",
            "cronica_do_guardiao": "Conhecido como o 'ouro branco', poucas gramas de açúcar valiam fortunas nos mercados europeus da época.",
            "imagem_prompt": "Ilustracao didatica de nobres europeus em um banquete apreciando doces finos com açucar colonial, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho de nobres europeus consumindo açúcar",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_029.png"
        },
        {
            "id": "HIST5_CAP7_030",
            "tema": "Geografia do Açúcar",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Além de lucrar com a venda do açúcar, qual outro grande objetivo motivou a Coroa Portuguesa a incentivar o plantio de cana em larga escala no Brasil?",
            "alternativas": ["Garantir o povoamento e a ocupação das terras brasileiras para proteger o território contra invasões estrangeiras", "Transformar o Brasil em uma reserva florestal", "Construir cidades de neve no interior", "Vender todas as terras para a Espanha"],
            "resposta": "Garantir o povoamento e a ocupação das terras brasileiras para proteger o território contra invasões estrangeiras",
            "explicacao": "A ocupação com engenhos fixava colonos no território, garantindo a posse da terra contra invasões de franceses e ingleses.",
            "cronica_do_guardiao": "Fixar raízes e povoar a costa era a única maneira de Portugal manter a posse das vastas terras brasileiras.",
            "imagem_prompt": "Ilustracao didatica de um forte costeiro português protegendo a vila e os engenhos contra navios estrangeiros, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de forte de defesa colonial no litoral",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_030.png"
        },

        # =========================================================================
        # EIXO 5: SOCIEDADE AÇUCAREIRA E TRABALHO (10 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_031",
            "tema": "Sociedade Açucareira",
            "tipo": "diagram_analysis",
            "dificuldade": "easy",
            "pergunta": "Quem ocupava o topo absoluto da pirâmide social e detinha o maior poder econômico e político no Brasil colonial?",
            "alternativas": ["Os Senhores de Engenho", "Os Trabalhadores Escravizados", "Os Jesuítas das Missões", "Os Feitores do Campo"],
            "resposta": "Os Senhores de Engenho",
            "explicacao": "Os senhores de engenho eram os grandes proprietários de terras e escravos, comandando a vida econômica e política da sociedade colonial.",
            "cronica_do_guardiao": "Com autoridade absoluta sobre a fazenda, o Senhor de Engenho era a figura central do patriarcalismo colonial.",
            "imagem_prompt": "Piramide social didatica da sociedade açucareira com o Senhor de Engenho no topo e escravizados na base, estilo Arkanos 5 ano",
            "imagem_alt": "Pirâmide social da economia açucareira",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_031.png"
        },
        {
            "id": "HIST5_CAP7_032",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual era o papel da figura do 'Feitor' no cotidiano do engenho colonial?",
            "alternativas": ["Vigiar os trabalhadores escravizados e aplicar punições severas para manter a produção e conter desobediências", "Ensinar música e pintura nas escolas", "Vender o açúcar na Europa", "Cozinhar os doces na Casa-Grande"],
            "resposta": "Vigiar os trabalhadores escravizados e aplicar punições severas para manter a produção e conter desobediências",
            "explicacao": "O feitor era o funcionário contratado pelo senhor para supervisionar o trabalho no campo e no engenho, agindo com extrema rigidez.",
            "cronica_do_guardiao": "A presença do feitor garantia o controle imposto pelos proprietários sobre o ritmo exaustivo de trabalho.",
            "imagem_prompt": "Ilustracao didatica do feitor supervisionando o trabalho nos canaviais, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático do feitor na lavoura",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_032.png"
        },
        {
            "id": "HIST5_CAP7_033",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como eram chamados os escravizados que trabalhavam diretamente no interior da Casa-Grande como amas de leite, cozinheiras e serventes?",
            "alternativas": ["Escravos Domésticos", "Escravos de Ganho", "Feitores do Campo", "Mestres do Açúcar"],
            "resposta": "Escravos Domésticos",
            "explicacao": "Os escravos domésticos serviam à família do senhor na Casa-Grande, realizando tarefas como cozinhar, limpar e cuidar das crianças.",
            "cronica_do_guardiao": "No interior da Casa-Grande, os escravos domésticos viviam em permanente contato próximo com a família do proprietário.",
            "imagem_prompt": "Ilustracao didatica de uma ama de leite e escravos domesticos servindo na Casa-Grande colonial, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho de escravos domésticos na Casa-Grande",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_033.png"
        },
        {
            "id": "HIST5_CAP7_034",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quais eram os grupos sociais livres que existiam na sociedade açucareira além dos senhores de engenho?",
            "alternativas": ["Trabalhadores livres como lavradores sem terra, feitores, artesãos, mestres do açúcar e padres", "Apenas imperadores e reis", "Apenas escravizados vindos da Ásia", "Apenas comerciantes ingleses"],
            "resposta": "Trabalhadores livres como lavradores sem terra, feitores, artesãos, mestres do açúcar e padres",
            "explicacao": "Entre o topo e a base escrava existia uma camada intermediária de trabalhadores livres que prestavam serviços especializados no engenho.",
            "cronica_do_guardiao": "Artesãos, carpinteiros e mestres do açúcar garantiam a manutenção das instalações e o refino do produto.",
            "imagem_prompt": "Ilustracao didatica de trabalhadores livres como o mestre do acucar e o carpinteiro em um engenho colonial, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração dos trabalhadores livres no engenho",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_034.png"
        },
        {
            "id": "HIST5_CAP7_035",
            "tema": "Sociedade Açucareira",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "No sistema escravista, as pessoas escravizadas possuíam direitos trabalhistas como salário mínimo, férias e jornada garantida de 8 horas.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "Os escravizados eram reduzidos juridicamente à condição de mercadorias e propriedades, sem qualquer direito à segurança ou salário.",
            "cronica_do_guardiao": "A ausência de direitos e a violência institucional marcaram a dura realidade do sistema escravista colonial.",
            "imagem_prompt": "Desenho didatico escolar enfatizando o contraste entre a privacao de direitos no passado e as leis atuais, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático sobre a ausência de direitos no período colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_035.png"
        },
        {
            "id": "HIST5_CAP7_036",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Quais eram algumas das formas brutais de castigos físicos praticadas contra os escravizados que desobedeciam ou tentavam fugir?",
            "alternativas": ["Uso de chicotes de couro, correntes de ferro, tronco e marcas feitas com ferro quente", "Pagamento de multas em moedas de prata", "Suspensão do uso de internet", "Transferência de férias para o inverno"],
            "resposta": "Uso de chicotes de couro, correntes de ferro, tronco e marcas feitas com ferro quente",
            "explicacao": "Os castigos corporais eram violentos e públicos, usados pelos senhores e feitores para tentar incutir medo e conter revoltas.",
            "cronica_do_guardiao": "A brutalidade das punições evidencia a severidade do regime de dominação mantido nas fazendas.",
            "imagem_prompt": "Ilustracao didatica escolar adaptada para 5 ano representando instrumentos de contenção colonial no museu historico, estilo Arkanos",
            "imagem_alt": "Desenho didático sobre instrumentos de contenção do período colonial",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_036.png"
        },
        {
            "id": "HIST5_CAP7_037",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que era o 'Mestre do Açúcar' na estrutura de trabalho do engenho?",
            "alternativas": ["O especialista técnico responsável por determinar o ponto exato de cozimento e purificação do caldo de cana", "O padre que celebrava as missas", "O marinheiro que pilotava o navio negreiro", "O Rei de Portugal"],
            "resposta": "O especialista técnico responsável por determinar o ponto exato de cozimento e purificação do caldo de cana",
            "explicacao": "O mestre do açúcar era um profissional altamente valorizado, pois seu conhecimento garantia a qualidade do produto exportado.",
            "cronica_do_guardiao": "Olhar, provar e sentir a consistência do melaço fervente exigia anos de prática do mestre do açúcar.",
            "imagem_prompt": "Ilustracao didatica de um mestre do acucar examinando a qualidade do melaço no tacho de cobre, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração do mestre do açúcar trabalhando",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_037.png"
        },
        {
            "id": "HIST5_CAP7_038",
            "tema": "Sociedade Açucareira",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe as obras do artista Jean-Baptiste Debret sobre a colônia. O que as pinturas de época revelam sobre o transporte do açúcar até os portos?",
            "alternativas": ["Que todo o transporte pesado de caixas de açúcar até os navios era feito no lombo e ombros dos escravizados", "Que o transporte era feito por trens de alta velocidade", "Que os senhores de engenho carregavam as caixas sozinhos", "Que os açúcares iam voando por balões"],
            "resposta": "Que todo o transporte pesado de caixas de açúcar até os navios era feito no lombo e ombros dos escravizados",
            "explicacao": "As gravuras de Debret registram escravizados carregando pesadas caixas e sacos de açúcar dos engenhos até as embarcações nos portos.",
            "cronica_do_guardiao": "As artes da época eternizaram o esforço físico que movimentava a economia do Brasil colonial.",
            "imagem_prompt": "Ilustracao didatica inspirada em Debret mostrando escravizados transportando caixas de acucar ate o porto, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho inspirado em Debret mostrando o transporte de açúcar",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_038.png"
        },
        {
            "id": "HIST5_CAP7_039",
            "tema": "Sociedade Açucareira",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "A sociedade açucareira era estamental e patriarcal, ou seja, era muito difícil uma pessoa mudar de posição social e o Senhor de Engenho mandava na família e na fazenda.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "A mobilidade social era quase nula e o poder patriarcal centralizava toda a autoridade na figura do grande proprietário de terras.",
            "cronica_do_guardiao": "Uma estrutura social rígida onde a origem de nascimento e a posse de terras definiam o destino de cada indivíduo.",
            "imagem_prompt": "Ilustracao didatica representando a hierarquia social colonial patriarcal, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração didática da hierarquia social patriarcal",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_039.png"
        },
        {
            "id": "HIST5_CAP7_040",
            "tema": "Sociedade Açucareira",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Além dos engenhos reais completos (que possuíam moendas movidas a água), como eram chamados os engenhos menores movidos por tração animal (bois)?",
            "alternativas": ["Engenhos Engrenados (ou Engenhocas)", "Engenhos de Vento", "Fábricas de Ouro", "Usinas Elétricas"],
            "resposta": "Engenhos Engrenados (ou Engenhocas)",
            "explicacao": "Engenhos menores com moendas movidas a bois eram chamados de engenhocas ou engenhos traquitanas, produzindo menor quantidade de açúcar.",
            "cronica_do_guardiao": "Pequenos produtores utilizavam a força dos bois para moer a cana em instalações mais simples.",
            "imagem_prompt": "Desenho didatico de uma engenhoca movida a tracao animal com bois girando a moenda, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático de uma engenhoca movida a animais",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_040.png"
        },

        # =========================================================================
        # EIXO 6: RESISTÊNCIA NEGRA E QUILOMBOS (10 Questões)
        # =========================================================================
        {
            "id": "HIST5_CAP7_041",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Como eram chamadas as comunidades livres organizadas no interior das matas por escravizados que fugiam do cativeiro?",
            "alternativas": ["Quilombos (ou Mocambos)", "Capitanias Hereditárias", "Feiras Livres", "Missões Jesuíticas"],
            "resposta": "Quilombos (ou Mocambos)",
            "explicacao": "Os quilombos eram povoados fortificados na mata onde os negros libertos reorganizavam suas vidas em liberdade.",
            "cronica_do_guardiao": "Nas profundezas das matas, os quilombos ergueram-se como fortalezas de esperança e dignidade.",
            "imagem_prompt": "Ilustracao didatica de um quilombo em meio a mata atlântica com palhoças e plantações comunitárias, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático de um quilombo na mata",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_041.png"
        },
        {
            "id": "HIST5_CAP7_042",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual foi o maior e mais famoso quilombo da história do Brasil, localizado na Serra da Barriga (atual estado de Alagoas)?",
            "alternativas": ["Quilombo dos Palmares", "Quilombo do Jabaquara", "Quilombo dos Guararapes", "Quilombo de Olinda"],
            "resposta": "Quilombo dos Palmares",
            "explicacao": "O Quilombo dos Palmares durou quase um século inteiro no século XVII, abrigando mais de 20 mil habitantes.",
            "cronica_do_guardiao": "Palmares foi uma verdadeira república livre criada por homens e mulheres que recusaram a correntes do cativeiro.",
            "imagem_prompt": "Ilustracao didatica da entrada fortificada do Quilombo dos Palmares na Serra da Barriga, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração da entrada do Quilombo dos Palmares",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_042.png"
        },
        {
            "id": "HIST5_CAP7_043",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Who was the legendary leader of Quilombo dos Palmares who became an immortal symbol of resistance against slavery in Brazil?",
            "alternativas": ["Zumbi dos Palmares", "D. Pedro I", "Toussaint Louverture", "Frei Caneca"],
            "resposta": "Zumbi dos Palmares",
            "explicacao": "Zumbi dos Palmares liderou a defesa do quilombo até sua morte em 20 de novembro de 1695, data hoje celebrada como o Dia da Consciência Negra.",
            "cronica_do_guardiao": "O nome de Zumbi ecoa na história como um guerreiro incansável pela liberdade de seu povo.",
            "imagem_prompt": "Retrato historico didatico e nobre do lider guerreiro Zumbi dos Palmares, estilo Arkanos 5 ano",
            "imagem_alt": "Retrato didático de Zumbi dos Palmares",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_043.png"
        },
        {
            "id": "HIST5_CAP7_044",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quem foi a corajosa líder e estrategista militar, esposa de Zumbi, que comandou tropas na defesa de Palmares?",
            "alternativas": ["Dandara dos Palmares", "Princesa Isabel", "Maria Quitéria", "Chica da Silva"],
            "resposta": "Dandara dos Palmares",
            "explicacao": "Dandara foi uma guerreira fundamental na organização militar e na agricultura do Quilombo dos Palmares.",
            "cronica_do_guardiao": "Dandara lutou ao lado de Zumbi com bravura inabalável em defesa da liberdade do povo quilombola.",
            "imagem_prompt": "Ilustracao didatica da guerreira Dandara dos Palmares liderando a defesa do povoado, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da guerreira Dandara dos Palmares",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_044.png"
        },
        {
            "id": "HIST5_CAP7_045",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Além das fugas e quilombos, quais outras formas de resistência cotidiana eram praticadas pelos africanos escravizados?",
            "alternativas": ["Quebra intencional de ferramentas, diminuição do ritmo de trabalho, preservação das danças, religiosas e cantos", "Compra de navios negreiros pelos escravizados", "Construção de palácios na Europa", "Mudança voluntária para Portugal"],
            "resposta": "Quebra intencional de ferramentas, diminuição do ritmo de trabalho, preservação das danças, religiosas e cantos",
            "explicacao": "A resistência ocorria diariamente através de pequenas sabotagens, desaceleração do trabalho e manutenção secreta de suas tradições culturais.",
            "cronica_do_guardiao": "Manter viva a fé, os rituais e a cultura era uma forma poderosa de afirmar a humanidade contra a opressão.",
            "imagem_prompt": "Ilustracao didatica de escravizados reunidos em circulo praticando capoeira e mantendo suas tradicoes, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático mostrando a preservação da cultura afro-brasileira",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_045.png"
        },
        {
            "id": "HIST5_CAP7_046",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual bandeirante paulista foi contratado pelos senhores de engenho e autoridades coloniais para destruir o Quilombo dos Palmares em 1694?",
            "alternativas": ["Domingos Jorge Velho", "Borba Gato", "Fernão Dias", "Anchieta"],
            "resposta": "Domingos Jorge Velho",
            "explicacao": "O bandeirante Domingos Jorge Velho liderou uma grande expedição armada com canhões para cercar e destruir a cerca real de Palmares.",
            "cronica_do_guardiao": "A destruição militar de Palmares exigiu anos de campanhas das tropas coloniais contra a resistência quilombola.",
            "imagem_prompt": "Ilustracao didatica das tropas coloniais cercando as muralhas de madeira de Palmares, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático do cerco ao Quilombo dos Palmares",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_046.png"
        },
        {
            "id": "HIST5_CAP7_047",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Nos quilombos, além de africanos fugitivos, também encontravam abrigo indígenas e pessoas pobres livres que buscavam proteção.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Os quilombos eram sociedades comunitárias abertas que acolhiam nativos perseguidos e pessoas desfavorecidas da colônia.",
            "cronica_do_guardiao": "Espaços de solidariedade onde diferentes povos se uniam em busca de sobrevivência e liberdade.",
            "imagem_prompt": "Ilustracao didatica de indigenas e negros convivendo em harmonia e cultivando a terra no quilombo, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da convivência comunitária no quilombo",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_047.png"
        },
        {
            "id": "HIST5_CAP7_048",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Como funcionava a agricultura dentro do Quilombo dos Palmares?",
            "alternativas": ["Era uma agricultura comunitária policultora (milho, mandioca, feijão, batata), garantindo a fartura alimentícia de seus habitantes", "Plantavam apenas cana-de-açúcar para vender a Portugal", "Não plantavam nada e compravam comida no supermercado", "Importavam alimentos da Europa"],
            "resposta": "Era uma agricultura comunitária policultora (milho, mandioca, feijão, batata), garantindo a fartura alimentícia de seus habitantes",
            "explicacao": "Diferente da monocultura dos engenhos, Palmares produzia variados gêneros alimentícios para sustentabilidade total de sua população.",
            "cronica_do_guardiao": "A diversidade de culturas agrícolas garantiu a independência alimentar de Palmares por quase cem anos.",
            "imagem_prompt": "Ilustracao didatica da colheita de milho e mandioca nas roças comunitárias do quilombo, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da colheita comunitária no quilombo",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_048.png"
        },
        {
            "id": "HIST5_CAP7_049",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Em qual data nacional é celebrado o 'Dia da Consciência Negra' no Brasil em homenagem à memória de Zumbi dos Palmares?",
            "alternativas": ["20 de novembro", "7 de setembro", "15 de novembro", "22 de abril"],
            "resposta": "20 de novembro",
            "explicacao": "O dia 20 de novembro resgata a data da morte de Zumbi em 1695 como marco de reflexão sobre a luta e as contribuições do povo negro no Brasil.",
            "cronica_do_guardiao": "O 20 de novembro é um dia de celebração da cultura, do orgulho e da resistência afro-brasileira.",
            "imagem_prompt": "Ilustracao didatica comemorativa do Dia da Consciencia Negra com simbolos de arte e cultura afro-brasileira, estilo Arkanos 5 ano",
            "imagem_alt": "Cartaz didático do Dia da Consciência Negra",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_049.png"
        },
        {
            "id": "HIST5_CAP7_050",
            "tema": "Resistência Negra e Quilombos",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência cronológica dos principais marcos do Capítulo 7 (Economia Colonial e Escravidão)?",
            "alternativas": ["Uso da mão de obra indígena inicial -> Intensificação do tráfico transatlântico de africanos -> Auge do ciclo do açúcar nos engenhos -> Organização e resistência do Quilombo dos Palmares", "Quilombo dos Palmares -> Chegada dos portugueses -> Libertação dos indígenas em 1758 -> Tráfico negreiro", "Auge do açúcar -> Chegada em 1500 -> Fim da escravidão -> Construção dos tumbeiros", "Coroação de D. Pedro -> Tráfico negreiro -> Trabalho indígena -> Lei Áurea"],
            "resposta": "Uso da mão de obra indígena inicial -> Intensificação do tráfico transatlântico de africanos -> Auge do ciclo do açúcar nos engenhos -> Organização e resistência do Quilombo dos Palmares",
            "explicacao": "A trajetória da economia colonial evoluiu do trabalho nativo inicial para o tráfico africano de massa, estruturando os engenhos e gerando a resistência quilombola.",
            "cronica_do_guardiao": "Parabéns, Sábio! Você completou com maestria todas as 50 questões do Capítulo 7 e dominou a história da economia colonial brasileira!",
            "imagem_prompt": "Linha do tempo mestra didatica ilustrada com os grandes marcos do Capitulo 7 de Historia, estilo Arkanos 5 ano",
            "imagem_alt": "Linha do tempo mestra do Capítulo 7 de História do 5º Ano",
            "image_url": "/static/img/quiz/historia5/hist5_cap7_050.png"
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
                "capitulo": "Capítulo 7",
                "avaliacao": "AV2",
                "serie": "5º ano",
                "disciplina": "História",
                "eixo": topic_name
            }
        )
        created_count += 1

    print(f"Done Chapter 7! Created: {created_count}, Skipped (existing): {skipped_count}")

if __name__ == "__main__":
    seed_historia5_cap7()
