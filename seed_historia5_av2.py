import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

def seed_historia5():
    print("Seeding 50 History AV2 (5º Ano) questions for Desafio dos Sábios...")

    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    subject, _ = QuizSubject.objects.get_or_create(name="História")
    assessment, _ = QuizAssessment.objects.get_or_create(
        name="AV2", grade=grade, subject=subject
    )

    questions_data = [
        # =========================================================================
        # EIXO 1: A ÉPOCA EM QUE A AMÉRICA QUIS SER LIVRE (6 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_001",
            "tema": "A América Quer Liberdade",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Entre 1780 e 1825, a maioria das colônias da América lutou para se libertar de quais países?",
            "alternativas": ["Países da Ásia", "Países da Europa (as metrópoles)", "Países da África", "Império Inca"],
            "resposta": "Países da Europa (as metrópoles)",
            "explicacao": "As colônias americanas eram dominadas por metrópoles europeias como Espanha, Portugal e França, que controlavam o comércio e cobravam altos impostos.",
            "cronica_do_guardiao": "O desejo de liberdade espalhou-se pelo continente americano como uma chama. As metrópoles europeias tentavam segurar o poder, mas o momento da transformação havia chegado.",
            "imagem_prompt": "Ilustração educativa para 5 ano de um mapa estilizado do oceano Atlantico conectando a Europa a America, estilo vetor limpo didatico, cores quentes, azul escuro e dourado",
            "imagem_alt": "Mapa ilustrativo mostrando as rotas entre a Europa e as colônias americanas",
            "image_url": "/static/img/quiz/historia5/hist5_av2_001.png"
        },
        {
            "id": "HIST5_AV2_002",
            "tema": "A América Quer Liberdade",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o esquema do 'Barril de Pólvora' da independência. O que a 'pólvora' representa no estopim das revoltas?",
            "alternativas": ["As ideias iluministas da França", "A exploração e os impostos abusivos das metrópoles", "A Revolução Industrial inglesa", "A vinda da Família Real"],
            "resposta": "A exploração e os impostos abusivos das metrópoles",
            "explicacao": "A exploração e os impostos pesados eram a 'pólvora' acumulada. As ideias de liberdade (Iluminismo) foram o fósforo e as revoluções nos EUA/França a faísca.",
            "cronica_do_guardiao": "O descontentamento popular era o combustível. Quando os impostos ficaram insuportáveis, qualquer faísca de liberdade era suficiente para deflagrar a revolução.",
            "imagem_prompt": "Diagrama educativo em estilo infografico 5 ano mostrando um barril com as palavras Exploracao e Impostos, com estopim aceso, estilo escolar Arkanos",
            "imagem_alt": "Esquema didático do barril de pólvora simbolizando a exploração colonial",
            "image_url": "/static/img/quiz/historia5/hist5_av2_002.png"
        },
        {
            "id": "HIST5_AV2_003",
            "tema": "A América Quer Liberdade",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quais duas grandes revoluções no século XVIII inspiraram os povos da América a buscarem sua própria independência?",
            "alternativas": ["Revolução Chinesa e Revolução Russa", "Independência dos EUA (1776) e Revolução Francesa (1789)", "Guerra dos Cem Anos e Revolução do Porto", "Insurreição Pernambucana e Guerra de Troia"],
            "resposta": "Independência dos EUA (1776) e Revolução Francesa (1789)",
            "explicacao": "A Independência dos Estados Unidos e a Revolução Francesa mostraram ao mundo que era possível derrubar governos autoritários e criar nações livres.",
            "cronica_do_guardiao": "Notícias de liberdade viajavam em navios através dos mares. Os ideais de igualdade e fraternidade ecoaram nos corações dos patriotas americanos.",
            "imagem_prompt": "Ilustracao didatica escolar de pergaminhos historicos com a Declaracao de Independencia dos EUA e a bandeira da Revolucao Francesa, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração dos documentos inspiradores da liberdade americana",
            "image_url": "/static/img/quiz/historia5/hist5_av2_003.png"
        },
        {
            "id": "HIST5_AV2_004",
            "tema": "A América Quer Liberdade",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "No sistema colonial, o 'Pacto Colonial' permitia que o Brasil comprasse e vendesse mercadorias livremente com qualquer país do mundo.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "O Pacto Colonial (monopólio) obrigava a colônia a comerciar exclusivamente com a sua metrópole (Portugal).",
            "cronica_do_guardiao": "O monopólio comercial impedia o crescimento das colônias. Tudo tinha que passar pelos navios portugueses, gerando grande insatisfação.",
            "imagem_prompt": "Desenho didatico de um navio mercantil colonial portugues carregando mercadorias com cadeado simbolizando o monopolio comercial, estilo Arkanos",
            "imagem_alt": "Desenho de navio colonial simbolizando o monopólio comercial",
            "image_url": "/static/img/quiz/historia5/hist5_av2_004.png"
        },
        {
            "id": "HIST5_AV2_005",
            "tema": "A América Quer Liberdade",
            "tipo": "diagram_analysis",
            "dificuldade": "medium",
            "pergunta": "No mapa das Américas do século XVIII, como eram divididas as terras continentais entre os impérios europeus?",
            "alternativas": ["América Espanhola (maior parte), América Portuguesa (Brasil) e colônias Francesas/Inglesas", "América toda pertencia à França", "O Brasil ocupava todo o continente sul-americano", "Apenas a Inglaterra colonizou a América do Sul"],
            "resposta": "América Espanhola (maior parte), América Portuguesa (Brasil) e colônias Francesas/Inglesas",
            "explicacao": "A América do Sul e Central era predominantemente espanhola, enquanto o Brasil pertencia a Portugal e ilhas do Caribe/América do Norte eram disputadas por França e Inglaterra.",
            "cronica_do_guardiao": "O vasto mapa americano era recortado por fronteiras traçadas por reis distantes na Europa.",
            "imagem_prompt": "Mapa historico educativo colorido da America no seculo 18 dividida em colonias espanholas, portuguesas e francesas, estilo didatico infantil limpo",
            "imagem_alt": "Mapa das divisões coloniais na América do século XVIII",
            "image_url": "/static/img/quiz/historia5/hist5_av2_005.png"
        },
        {
            "id": "HIST5_AV2_006",
            "tema": "A América Quer Liberdade",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual era o principal grupo social nascido na América Espanhola que liderou as lutas por independência devido ao descontentamento com os privilégios dos espanhóis nativos?",
            "alternativas": ["Os Peninsulares (ou Chapetones)", "Os Criollos", "Os Indígenas da Mita", "Os Escravizados de São Domingos"],
            "resposta": "Os Criollos",
            "explicacao": "Os Criollos eram filhos de espanhóis nascidos na América. Embora fossem ricos, não podiam ocupar os altos cargos do governo colonial, que pertenciam exclusivamente aos Peninsulares.",
            "cronica_do_guardiao": "Os Criollos estudavam na Europa e traziam ideias iluministas. Eles tinham riqueza local, mas queriam o poder político que lhes era negado.",
            "imagem_prompt": "Ilustracao didatica de um jovem patriota criollo vestindo trajes elegantes do seculo 19 estudando mapas da America, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de um jovem patriota criollo estudando mapas",
            "image_url": "/static/img/quiz/historia5/hist5_av2_006.png"
        },

        # =========================================================================
        # EIXO 2: A INDEPENDÊNCIA DO HAITI (7 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_007",
            "tema": "A Independência do Haiti",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Antes da independência em 1804, a ilha do Haiti era uma colônia francesa rica conhecida pelo nome de:",
            "alternativas": ["São Domingos (Saint-Domingue)", "Porto Rico", "Cuba", "Pernambuco"],
            "resposta": "São Domingos (Saint-Domingue)",
            "explicacao": "A colônia chamava-se São Domingos e era a maior produtora de açúcar e café do Caribe, mantida pelo trabalho escravo.",
            "cronica_do_guardiao": "São Domingos era a joia da coroa francesa no Caribe, alimentada por um sistema severo de plantation e trabalho forçado.",
            "imagem_prompt": "Ilustracao historica didatica das plantacoes de cana-de-acucar na ilha tropical de Sao Domingos no seculo 18, estilo Arkanos 5 ano",
            "imagem_alt": "Plantacões de cana-de-açúcar na antiga São Domingos",
            "image_url": "/static/img/quiz/historia5/hist5_av2_007.png"
        },
        {
            "id": "HIST5_AV2_008",
            "tema": "A Independência do Haiti",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Quem foi o brilhante líder ex-escravizado e estrategista militar que comandou o início da Revolução do Haiti em 1791?",
            "alternativas": ["Toussaint Louverture", "Simón Bolívar", "D. Pedro I", "Túpac Amaru II"],
            "resposta": "Toussaint Louverture",
            "explicacao": "Toussaint Louverture organizou os escravizados em um exército disciplinado que derrotou tropas francesas, espanholas e britânicas.",
            "cronica_do_guardiao": "Conhecido como o 'Napoleão Negro', Toussaint usou sua inteligência militar e visão política para liderar seu povo rumo à liberdade.",
            "imagem_prompt": "Retrato didatico nobre de Toussaint Louverture em uniforme militar historico com chapeu bicornio, estilo vetor Arkanos 5 ano",
            "imagem_alt": "Retrato militar do líder Toussaint Louverture",
            "image_url": "/static/img/quiz/historia5/hist5_av2_008.png"
        },
        {
            "id": "HIST5_AV2_009",
            "tema": "A Independência do Haiti",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Após a prisão de Toussaint Louverture, qual general concluiu a guerra e proclamou a independência do Haiti em 1804?",
            "alternativas": ["Jean-Jacques Dessalines", "José de San Martín", "Frei Caneca", "Napoleão Bonaparte"],
            "resposta": "Jean-Jacques Dessalines",
            "explicacao": "Dessalines liderou as forças finais contra as tropas enviadas por Napoleão e declarou o nascimento do Haiti em 1 de janeiro de 1804.",
            "cronica_do_guardiao": "Dessalines proclamou a independência e escolheu o nome 'Haiti', resgatando a palavra indígena original da ilha que significa 'terra de montanhas'.",
            "imagem_prompt": "Ilustracao historica didatica do general Jean-Jacques Dessalines proclamando a independencia do Haiti em 1804, estilo Arkanos",
            "imagem_alt": "Jean-Jacques Dessalines na proclamação da independência do Haiti",
            "image_url": "/static/img/quiz/historia5/hist5_av2_009.png"
        },
        {
            "id": "HIST5_AV2_010",
            "tema": "A Independência do Haiti",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o pódio das três conquistas históricas do Haiti. Qual destas afirmacões faz parte do 'Pódio Três Vezes Campeão' do Haiti?",
            "alternativas": ["Foi a única revolta de escravizados vitoriosa, a 1ª república negra das Américas e o 1º país a abolir a escravidão na região", "Foi a primeira colônia a virar uma monarquia com reis europeus", "Foi o único país que continuou sendo colônia da Espanha", "Foi a revolta liderada pelo príncipe regente português"],
            "resposta": "Foi a única revolta de escravizados vitoriosa, a 1ª república negra das Américas e o 1º país a abolir a escravidão na região",
            "explicacao": "O Haiti alcançou um feito triplo inédito no mundo: venceu com escravizados, fundou a primeira república negra das Américas e aboliu a escravidão imediatamente.",
            "cronica_do_guardiao": "Um feito heroico que entrou para a história universal: a vitória da liberdade sobre a opressão da escravidão.",
            "imagem_prompt": "Infografico didatico escolar 5 ano mostrando um podio com as 3 vitorias historicas do Haiti, bandeira do Haiti no topo, estilo Arkanos",
            "imagem_alt": "Infográfico das três conquistas históricas do Haiti",
            "image_url": "/static/img/quiz/historia5/hist5_av2_010.png"
        },
        {
            "id": "HIST5_AV2_011",
            "tema": "A Independência do Haiti",
            "tipo": "true_false",
            "dificuldade": "medium",
            "pergunta": "Após a independência do Haiti em 1804, os donos de escravizados no Brasil e em outros países ficaram calmos e apoiaram o novo governo haitiano.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "Os donos de escravizados de outros países ficaram apavorados com o 'haitianismo' (medo de que os escravizados locais seguissem o exemplo e se revoltassem).",
            "cronica_do_guardiao": "O 'medo do haitianismo' fez com que as elites coloniais reforçassem a vigilância e tentassem isolar o Haiti internacionalmente.",
            "imagem_prompt": "Ilustracao didatica de senhores de engenho reunidos apreensivos lendo jornais sobre a revolta no Haiti, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho mostrando a apreensão das elites coloniais com o exemplo haitiano",
            "image_url": "/static/img/quiz/historia5/hist5_av2_011.png"
        },
        {
            "id": "HIST5_AV2_012",
            "tema": "A Independência do Haiti",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual a sequência cronológica correta dos fatos da Revolução do Haiti?",
            "alternativas": ["Início da revolta dos escravizados (1791) -> Prisão de Toussaint -> Declaração de Independência por Dessalines (1804)", "Declaração de Independência (1804) -> Chegada de Toussaint -> Início da revolta (1791)", "Prisão de Dessalines -> Chegada da Família Real -> Independência do Haiti", "Grito do Ipiranga -> Revolta de Toussaint -> Fim da escravidão"],
            "resposta": "Início da revolta dos escravizados (1791) -> Prisão de Toussaint -> Declaração de Independência por Dessalines (1804)",
            "explicacao": "A revolta começou em 1791, Toussaint liderou por anos até ser capturado pelos franceses em 1802, e Dessalines concluiu a luta em 1804.",
            "cronica_do_guardiao": "Treze anos de batalhas árduas separaram o estopim de 1791 da proclamação da república em 1804.",
            "imagem_prompt": "Linha do tempo historica didatica ilustrada com os anos 1791, 1802 e 1804 destacando os eventos do Haiti, estilo escolar Arkanos",
            "imagem_alt": "Linha do tempo da Revolução do Haiti",
            "image_url": "/static/img/quiz/historia5/hist5_av2_012.png"
        },
        {
            "id": "HIST5_AV2_013",
            "tema": "A Independência do Haiti",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "O que a palavra original 'Haiti' (de origem indígena Taíno) significa?",
            "alternativas": ["Terra de montanhas", "Ilha do açúcar", "Vale dos rios", "Praia do sol"],
            "resposta": "Terra de montanhas",
            "explicacao": "Os libertadores rejeitaram o nome colonial 'São Domingos' e batizaram o país como Haiti, que significa 'terra de montanhas' no idioma nativo Taíno.",
            "cronica_do_guardiao": "Renomear a ilha para Haiti foi um ato de respeito aos povos originais e de ruptura definitiva com o passado colonial.",
            "imagem_prompt": "Ilustracao didatica das belas montanhas tropicais do Haiti com o nome ancestral destacado em letras douradas didaticas, estilo Arkanos",
            "imagem_alt": "Montanhas do Haiti simbolizando o nome nativo da ilha",
            "image_url": "/static/img/quiz/historia5/hist5_av2_013.png"
        },

        # =========================================================================
        # EIXO 3: TÚPAC AMARU II NO PERU (6 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_014",
            "tema": "Túpac Amaru II",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em 1780, em qual país da América do Sul ocorreu a grande revolta indígena liderada por Túpac Amaru II?",
            "alternativas": ["Peru", "Brasil", "Haiti", "Argentina"],
            "resposta": "Peru",
            "explicacao": "Túpac Amaru II liderou a grande revolta indígena no Peru em 1780, antes mesmo da Revolução do Haiti e da vinda da Família Real.",
            "cronica_do_guardiao": "Nas montanhas dos Andes peruanos, ecoou o clamor dos povos originários contra a injustiça da exploração colonial.",
            "imagem_prompt": "Mapa historico didatico da America do Sul destacando a regiao dos Andes no Peru com o simbolo de Tupac Amaru, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa destacando a região da revolta de Túpac Amaru no Peru",
            "image_url": "/static/img/quiz/historia5/hist5_av2_014.png"
        },
        {
            "id": "HIST5_AV2_015",
            "tema": "Túpac Amaru II",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "De qual antiga civilização pré-colombiana Túpac Amaru II afirmava ser descendente direto?",
            "alternativas": ["Imperadores Incas", "Guerreiros Astecas", "Astrônomos Maias", "Índios Tupinambás"],
            "resposta": "Imperadores Incas",
            "explicacao": "Túpac Amaru II (seu nome de nascimento era José Gabriel Condorcanqui) era descendente do último imperador inca, Túpac Amaru I.",
            "cronica_do_guardiao": "O sangue dos nobres imperadores incas corria em suas veias, dando-lhe liderança e respeito perante a população indígena.",
            "imagem_prompt": "Ilustracao didatica nobre do lider inca Tupac Amaru II com trajes tradicionais andinos e medalhao do sol, estilo vetor Arkanos 5 ano",
            "imagem_alt": "Ilustração do líder indígena inca Túpac Amaru II",
            "image_url": "/static/img/quiz/historia5/hist5_av2_015.png"
        },
        {
            "id": "HIST5_AV2_016",
            "tema": "Túpac Amaru II",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Contra qual sistema de trabalho forçado e perigoso nas minas espanholas os indígenas liderados por Túpac Amaru se revoltaram?",
            "alternativas": ["A Mita", "A Abertura dos Portos", "O Bloqueio Continental", "O Dia do Fico"],
            "resposta": "A Mita",
            "explicacao": "A Mita era o trabalho forçado obrigatório imposto aos indígenas nas minas de prata e ouro, onde muitos morriam devido às péssimas condições.",
            "cronica_do_guardiao": "Trabalhar nas profundezas escuras das minas de Potosí destruía famílias inteiras. A abolição da mita era a principal reivindicação de Túpac Amaru.",
            "imagem_prompt": "Desenho didatico escolar de indigenas trabalhando dentro de uma mina colonial sob o sistema de mita, estilo didatico Arkanos",
            "imagem_alt": "Desenho retratando a exploração indígena na mita",
            "image_url": "/static/img/quiz/historia5/hist5_av2_016.png"
        },
        {
            "id": "HIST5_AV2_017",
            "tema": "Túpac Amaru II",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Embora a revolta de Túpac Amaru em 1780 tenha sido derrotada pelas forças espanholas, qual foi o seu grande significado histórico?",
            "alternativas": ["Virou a primeira fagulha e um símbolo imortal de resistência indígena na América", "Fez o Peru virar uma colônia de Portugal", "Acabou com todas as guerras na Europa", "Trouxe Napoleão para a América"],
            "resposta": "Virou a primeira fagulha e um símbolo imortal de resistência indígena na América",
            "explicacao": "Embora tenha sido executado, Túpac Amaru 'perdeu a batalha, mas venceu a memória', tornando-se a primeira fagulha da independência americana.",
            "cronica_do_guardiao": "Os espanhóis tentaram apagar sua memória com violência, mas seu nome tornou-se uma lenda de coragem que inspirou gerações futuras.",
            "imagem_prompt": "Ilustracao didatica simbolica de uma chama acesa sobre os Andes representando o legado imortal de resistencia de Tupac Amaru, estilo Arkanos",
            "imagem_alt": "Símbolo da chama da resistência de Túpac Amaru",
            "image_url": "/static/img/quiz/historia5/hist5_av2_017.png"
        },
        {
            "id": "HIST5_AV2_018",
            "tema": "Túpac Amaru II",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Na linha do tempo das independências da América, a Revolta de Túpac Amaru (1780) aconteceu DEPOIS da Independência do Brasil (1822).",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "A revolta de Túpac Amaru ocorreu em 1780, sendo a primeira fagulha — bem antes do Haiti (1804) e do Brasil (1822).",
            "cronica_do_guardiao": "Na cronologia da liberdade americana, Túpac Amaru vem na linha de frente, mais de 40 anos antes do Grito do Ipiranga.",
            "imagem_prompt": "Linha do tempo didatica mostrando 1780 (Tupac Amaru) no inicio e 1822 (Brasil) no final, estilo infantil claro Arkanos",
            "imagem_alt": "Linha do tempo destacando 1780 antes de 1822",
            "image_url": "/static/img/quiz/historia5/hist5_av2_018.png"
        },
        {
            "id": "HIST5_AV2_019",
            "tema": "Túpac Amaru II",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Além da mita nas minas, qual outro abuso econômico cobrado pelos espanhóis motivou o levante dos povos indígenas?",
            "alternativas": ["Impostos pesados e tributos abusivos sobre a população local", "O pagamento de salário em barras de ouro", "A doação de terras férteis aos indígenas", "O fim da cobrança de pedágios"],
            "resposta": "Impostos pesados e tributos abusivos sobre a população local",
            "explicacao": "Os governadores espanhóis (corregidores) cobravam impostos altíssimos e forçavam os indígenas a comprar produtos trazidos da Europa por preços absurdos.",
            "cronica_do_guardiao": "A cobrança impiedosa de tributos sufocava os povoados andinos, levando a população ao limite da resistência.",
            "imagem_prompt": "Desenho didatico de cobradores de impostos espanhois exigindo moedas de camponeses indigenas, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho representando a cobrança de impostos abusivos",
            "image_url": "/static/img/quiz/historia5/hist5_av2_019.png"
        },

        # =========================================================================
        # EIXO 4: AS GUERRAS DE INDEPENDÊNCIA NA AMÉRICA ESPANHOLA (7 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_020",
            "tema": "Independência da América Espanhola",
            "tipo": "map_analysis",
            "dificuldade": "medium",
            "pergunta": "Observe o mapa da América do Sul e o macete 'Bolívar desce, San Martín sobe'. Onde os dois generais libertadores se encontraram no final das campanhas?",
            "alternativas": ["No Peru", "No Brasil (Rio de Janeiro)", "No Haiti", "Em Portugal"],
            "resposta": "No Peru",
            "explicacao": "Simón Bolívar veio libertando os países do norte e desceu; José de San Martín libertou os do sul e subiu. Eles se encontraram no Peru para consolidar a liberdade sul-americana.",
            "cronica_do_guardiao": "Em Guayaquil e no Peru, os dois colossos da liberdade americana uniram suas forças para erradicar o domínio espanhol do continente.",
            "imagem_prompt": "Mapa historico didatico da America do Sul com setas mostrando Bolivar descendo pelo norte e San Martin subindo pelo sul ate o Peru, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa das rotas de libertação de Bolívar e San Martín",
            "image_url": "/static/img/quiz/historia5/hist5_av2_020.png"
        },
        {
            "id": "HIST5_AV2_021",
            "tema": "Independência da América Espanhola",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual grande líder militar libertou os países do NORTE da América do Sul (como Venezuela, Colômbia e Equador)?",
            "alternativas": ["Simón Bolívar", "José de San Martín", "D. Pedro II", "Toussaint Louverture"],
            "resposta": "Simón Bolívar",
            "explicacao": "Simón Bolívar, conhecido como 'O Libertador', liderou as campanhas militares no norte da América do Sul.",
            "cronica_do_guardiao": "Bolívar sonhava com uma América Latina unida e forte (a Grã-Colômbia), capaz de resistir a qualquer ameaça imperialista.",
            "imagem_prompt": "Retrato historico didatico do general Simon Bolivar em traje militar de gala com espada e mapa da America, estilo Arkanos 5 ano",
            "imagem_alt": "Retrato militar do general Simón Bolívar",
            "image_url": "/static/img/quiz/historia5/hist5_av2_021.png"
        },
        {
            "id": "HIST5_AV2_022",
            "tema": "Independência da América Espanhola",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual general argentino liderou os exércitos de libertação vindo do SUL, atravessando a Cordilheira dos Andes para libertar o Chile e o Peru?",
            "alternativas": ["José de San Martín", "Simón Bolívar", "Napoleão Bonaparte", "D. João VI"],
            "resposta": "José de San Martín",
            "explicacao": "José de San Martín organizou o Exército dos Andes na Argentina, atravessou as montanhas geladas e libertou o Chile e o Peru.",
            "cronica_do_guardiao": "A travessia dos Andes por San Martín é considerada uma das maiores façanhas táticas da história militar da América.",
            "imagem_prompt": "Ilustracao didatica do general San Martin liderando tropas a cavalo atravessando a Cordilheira dos Andes com neve, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração de San Martín atravessando os Andes",
            "image_url": "/static/img/quiz/historia5/hist5_av2_022.png"
        },
        {
            "id": "HIST5_AV2_023",
            "tema": "Independência da América Espanhola",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Qual evento ocorrido na Europa em 1808 serviu como estopim perfeito para os Criollos iniciarem as guerras de independência na América Espanhola?",
            "alternativas": ["A invasão da Espanha pelas tropas de Napoleão Bonaparte e a prisão do rei espanhol", "A criação da União Europeia", "A descoberta do ouro no Brasil", "A queda do Império Romano"],
            "resposta": "A invasão da Espanha pelas tropas de Napoleão Bonaparte e a prisão do rei espanhol",
            "explicacao": "Quando Napoleão prendeu o rei da Espanha (Fernando VII), as colônias ficaram sem autoridade real e os Criollos assumiram o governo local em Juntas Governativas.",
            "cronica_do_guardiao": "Com a Espanha ocupada pelas tropas francesas, os colonos americanos provaram o sabor de se governar sozinhos e decidiram não devolver mais o poder.",
            "imagem_prompt": "Ilustracao didatica das tropas de Napoleao invadindo a Espanha em 1808 e a criacao das Juntas Governativas na America, estilo Arkanos",
            "imagem_alt": "Desenho mostrando a crise na Espanha com a invasão de Napoleão",
            "image_url": "/static/img/quiz/historia5/hist5_av2_023.png"
        },
        {
            "id": "HIST5_AV2_024",
            "tema": "Independência da América Espanhola",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Diferente do Brasil, que permaneceu como um único grande país sob uma monarquia, como ficou a América Espanhola após a independência?",
            "alternativas": ["Fragmentou-se em vários países republicanos independentes (como Argentina, Chile, Colômbia, Peru, etc.)", "Virou um único império governado por Simón Bolívar", "Foi devolvida para a França", "Tornou-se parte dos Estados Unidos"],
            "resposta": "Fragmentou-se em vários países republicanos independentes (como Argentina, Chile, Colômbia, Peru, etc.)",
            "explicacao": "A América Espanhola dividiu-se em diversas repúblicas autônomas devido aos interesses regionais das elites Criollas locais.",
            "cronica_do_guardiao": "Embora Bolívar sonhasse com a união de toda a América do Sul, a divisão regional prevaleceu, dando origem ao mapa de repúblicas que conhecemos hoje.",
            "imagem_prompt": "Mapa historico didatico da America do Sul mostrando a divisao em varias republicas independentes coloridas, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa da divisão da América Espanhola em vários países",
            "image_url": "/static/img/quiz/historia5/hist5_av2_024.png"
        },
        {
            "id": "HIST5_AV2_025",
            "tema": "Independência da América Espanhola",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Os Peninsulares (espanhóis nascidos na Europa) apoiaram entusiasmadamente as campanhas de independência lideradas por Bolívar e San Martín.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "Os Peninsulares queriam manter a colônia e os seus privilégios ligados à coroa espanhola; foram os Criollos que lideraram a independência.",
            "cronica_do_guardiao": "Peninsulares e Criollos entraram em confronto direto pelo controle político da América.",
            "imagem_prompt": "Desenho didatico contrastando os nobres peninsulares leais ao rei e os patriotas criollos rebeldes, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho mostrando o contraste entre Peninsulares e Criollos",
            "image_url": "/static/img/quiz/historia5/hist5_av2_025.png"
        },
        {
            "id": "HIST5_AV2_026",
            "tema": "Independência da América Espanhola",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual foi o modelo político adotado pela quase totalidade dos novos países libertados na América Espanhola?",
            "alternativas": ["República Presidencialista", "Monarquia Absolutista", "Império Hereditário", "Ducado Feudal"],
            "resposta": "República Presidencialista",
            "explicacao": "Inspirados nos EUA e na França, as antigas colônias espanholas aboliram a monarquia e adotaram o sistema republicano.",
            "cronica_do_guardiao": "As novas nações sul-americanas hastearam bandeiras republicanas, jurando constituições que garantiam a soberania do povo.",
            "imagem_prompt": "Ilustracao didatica de cidadãos celebrando a criacao de uma republica sul-americana com bandeira e escudo constitucional, estilo Arkanos",
            "imagem_alt": "Ilustração celebrando a fundação da república",
            "image_url": "/static/img/quiz/historia5/hist5_av2_026.png"
        },

        # =========================================================================
        # EIXO 5: A VINDA DE D. JOÃO VI PARA O BRASIL (7 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_027",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Por qual motivo principal a Família Real portuguesa e toda a sua corte fugiram para o Brasil em 1807/1808?",
            "alternativas": ["Porque o exército de Napoleão Bonaparte ia invadir Portugal por desobedecer ao Bloqueio Continental", "Para fazer turismo nas praias do Rio de Janeiro", "Porque Portugal foi comprado pela Espanha", "Para procurar ouro em Minas Gerais"],
            "resposta": "Porque o exército de Napoleão Bonaparte ia invadir Portugal por desobedecer ao Bloqueio Continental",
            "explicacao": "Portugal desobedeceu ao Bloqueio Continental impostos por Napoleão para não romper o comércio com a Inglaterra. Com a invasão iminente, a corte fugiu de navio para o Brasil.",
            "cronica_do_guardiao": "Em uma operação gigantesca e inédita na história, mais de 10 mil pessoas embarcaram em navios trazendo a capital do império para os trópicos.",
            "imagem_prompt": "Ilustracao historica didatica da esquadra naval portuguesa partindo de Lisboa com a familia real a bordo fugindo de Napoleao em 1807, estilo Arkanos 5 ano",
            "imagem_alt": "Partida da Família Real portuguesa de Lisboa em 1807",
            "image_url": "/static/img/quiz/historia5/hist5_av2_027.png"
        },
        {
            "id": "HIST5_AV2_028",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Qual foi a primeira grande medida econômica adotada por D. João assim que pisou no Brasil em 1808?",
            "alternativas": ["Abertura dos Portos às Nações Amigas (fim do monopólio colonial)", "Proibição do comércio de café", "Fechamento de todas as escolas e bancos", "Declaração de guerra à Inglaterra"],
            "resposta": "Abertura dos Portos às Nações Amigas (fim do monopólio colonial)",
            "explicacao": "A Abertura dos Portos pôs fim ao Pacto Colonial: o Brasil pôde negociar diretamente com outros países (especialmente a Inglaterra).",
            "cronica_do_guardiao": "Com uma assinatura, D. João rompeu séculos de monopólio. Os portos brasileiros abriram-se para o comércio internacional.",
            "imagem_prompt": "Ilustracao didatica dos portos do Rio de Janeiro cheios de navios mercantes internacionais em 1808 com D. Joao assinando o decreto, estilo Arkanos",
            "imagem_alt": "Ilustração da Abertura dos Portos no Brasil em 1808",
            "image_url": "/static/img/quiz/historia5/hist5_av2_028.png"
        },
        {
            "id": "HIST5_AV2_029",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Com a chegada da corte portuguesa em 1808, qual cidade tornou-se a nova capital oficial de todo o Império Português?",
            "alternativas": ["Rio de Janeiro", "Recife", "Salvador", "Lisboa"],
            "resposta": "Rio de Janeiro",
            "explicacao": "O Rio de Janeiro transformou-se na sede do império, recebendo órgãos públicos, palácios, ruas pavimentadas e iluminação pública.",
            "cronica_do_guardiao": "O Rio de Janeiro deixou de ser uma vila colonial para se transformar no coração político da coroa portuguesa.",
            "imagem_prompt": "Ilustracao didatica da cidade do Rio de Janeiro em 1808 com palacios e a chegada da comitiva real, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho do Rio de Janeiro como capital do Império Português",
            "image_url": "/static/img/quiz/historia5/hist5_av2_029.png"
        },
        {
            "id": "HIST5_AV2_030",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "D. João fundou várias instituições importantes no Brasil. Qual destas opções lista criações da época joanina (1808-1815)?",
            "alternativas": ["Banco do Brasil, Imprensa Régia e Jardim Botânico", "Tribunal da Inquisição e Feudalismo", "Usina Nuclear e Metrô", "Petrobras e Companhia das Índias"],
            "resposta": "Banco do Brasil, Imprensa Régia e Jardim Botânico",
            "explicacao": "D. João criou o Banco do Brasil, a Imprensa Régia (para rodar os primeiros jornais e livros do país), o Jardim Botânico e escolas de medicina.",
            "cronica_do_guardiao": "Pela primeira vez, livros e jornais podiam ser impressos em solo brasileiro, promovendo a cultura e a economia nacional.",
            "imagem_prompt": "Desenho didatico mostrando o predio historico do Banco do Brasil, a Imprensa Regia e mudas do Jardim Botanico em 1808, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração das realizações culturais e econômicas de D. João",
            "image_url": "/static/img/quiz/historia5/hist5_av2_030.png"
        },
        {
            "id": "HIST5_AV2_031",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Em 1815, qual importante decreto político de D. João mudou a categoria do Brasil, fazendo com que ele deixasse oficialmente de ser colônia?",
            "alternativas": ["Elevação do Brasil a Reino Unido a Portugal e Algarves", "Tratado de Tordesilhas", "Lei Áurea", "Constituição de 1824"],
            "resposta": "Elevação do Brasil a Reino Unido a Portugal e Algarves",
            "explicacao": "Ao ser elevado a Reino Unido em 1815, o Brasil passou a ter o mesmo nível político de Portugal, deixando de ser officially uma colônia.",
            "cronica_do_guardiao": "Subir de categoria para Reino Unido encheu os brasileiros de orgulho. Voltar a ser colônia depois disso era algo inaceitável.",
            "imagem_prompt": "Ilustracao didatica do escudo de armas do Reino Unido de Portugal Brasil e Algarves de 1815 com a coroa real, estilo Arkanos 5 ano",
            "imagem_alt": "Escudo do Reino Unido de Portugal, Brasil e Algarves",
            "image_url": "/static/img/quiz/historia5/hist5_av2_031.png"
        },
        {
            "id": "HIST5_AV2_032",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "O 'Bloqueio Continental' decreta que Napoleão proibiu todos os países europeus de fazerem comércio com a Inglaterra.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Verdadeiro",
            "explicacao": "Napoleão queria sufocar a economia britânica proibindo a Europa de comerciar com os ingleses.",
            "cronica_do_guardiao": "O Bloqueio Continental colocou Portugal em uma encruzilhada geopolítica que culminou na transferência da corte para o Brasil.",
            "imagem_prompt": "Infografico didatico do mapa da Europa com o Bloqueio Continental de Napoleao isolando a ilha da Inglaterra, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa infográfico do Bloqueio Continental europeu",
            "image_url": "/static/img/quiz/historia5/hist5_av2_032.png"
        },
        {
            "id": "HIST5_AV2_033",
            "tema": "A Vinda de D. João ao Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Por que dizemos no macete que '1808 preparou a independência de 1822'?",
            "alternativas": ["Porque ao abrir os portos e virar Reino Unido, o Brasil provou a liberdade e não aceitaria mais voltar a ser colônia", "Porque D. João veio para proclamar a República", "Porque Napoleão virou imperador do Brasil", "Porque o Rio de Janeiro foi destruído pela guerra"],
            "resposta": "Porque ao abrir os portos e virar Reino Unido, o Brasil provou a liberdade e não aceitaria mais voltar a ser colônia",
            "explicacao": "As transformações de 1808 deram autonomia econômica e política ao Brasil. Uma vez que o povo provou a liberdade, qualquer tentativa de recolonização geraria a independência.",
            "cronica_do_guardiao": "1808 foi o ponto de não retorno. O Brasil abriu as asas e não caberia mais dentro do antigo molde colonial.",
            "imagem_prompt": "Ilustracao didatica conectando uma peca de domino marcada 1808 empurrando a peca de 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração do efeito dominó ligando 1808 a 1822",
            "image_url": "/static/img/quiz/historia5/hist5_av2_033.png"
        },

        # =========================================================================
        # EIXO 6: A INSURREIÇÃO PERNAMBUCANA DE 1817 (5 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_034",
            "tema": "Insurreição Pernambucana de 1817",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em 1817, estourou uma grande revolta na província de Pernambuco. Qual das opções lista causas do descontentamento popular?",
            "alternativas": ["Impostos altos para sustentar a corte no Rio de Janeiro, crise no açúcar e secas no Nordeste", "Falta de navios em Portugal", "Excesso de chuvas e geadas", "Aumento do preço do chá em Londres"],
            "resposta": "Impostos altos para sustentar a corte no Rio de Janeiro, crise no açúcar e secas no Nordeste",
            "explicacao": "O povo pernambucano pagava altos impostos para financiar a vida luxuosa da corte no Rio de Janeiro enquanto sofria com crises econômicas e secas.",
            "cronica_do_guardiao": "A conta da festa da corte no Rio de Janeiro chegou para o Nordeste na forma de impostos abusivos, deflagrando a revolta.",
            "imagem_prompt": "Ilustracao didatica dos revoltosos pernambucanos protestando em Recife em 1817 contra os impostos da corte, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho dos protestos em Recife durante a Insurreição de 1817",
            "image_url": "/static/img/quiz/historia5/hist5_av2_034.png"
        },
        {
            "id": "HIST5_AV2_035",
            "tema": "Insurreição Pernambucana de 1817",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Ao tomarem o poder em Recife em 1817, os líderes da revolta proclamaram qual forma de governo provisório?",
            "alternativas": ["Uma República com governo próprio e liberdade de imprensa", "Uma nova Monarquia absolutista", "Um novo reino unido com a França", "Um ducado governado por Napoleão"],
            "resposta": "Uma República com governo próprio e liberdade de imprensa",
            "explicacao": "Os rebeldes expulsaram o governador português e criaram uma República Provissória inspirada nos ideais iluministas.",
            "cronica_do_guardiao": "Durante mais de dois meses, a bandeira republicana tremulou em Recife, tornando-se o primeiro governo republicano em solo brasileiro.",
            "imagem_prompt": "Ilustracao didatica da bandeira da Revolucao de 1817 sendo hasteada em Recife com comemoracao republicana, estilo Arkanos 5 ano",
            "imagem_alt": "Hasteamento da bandeira republicana em Pernambuco em 1817",
            "image_url": "/static/img/quiz/historia5/hist5_av2_035.png"
        },
        {
            "id": "HIST5_AV2_036",
            "tema": "Insurreição Pernambucana de 1817",
            "tipo": "diagram_analysis",
            "pergunta": "Quais províncias vizinhas apoiaram a Insurreição Pernambucana de 1817?",
            "alternativas": ["Paraíba, Rio Grande do Norte e Ceará", "São Paulo, Minas Gerais e Rio de Janeiro", "Amazonas e Pará", "Rio Grande do Sul e Santa Catarina"],
            "resposta": "Paraíba, Rio Grande do Norte e Ceará",
            "explicacao": "A revolta espalhou-se rapidamente pelo Nordeste, recebendo apoio direto das províncias da Paraíba, Rio Grande do Norte e Ceará.",
            "cronica_do_guardiao": "O ideal de liberdade unir as províncias nordestinas em uma causa comum contra a exploração colonial da coroa.",
            "imagem_prompt": "Mapa historico didatico do Nordeste destacando as provincias de Pernambuco Paraiba RN e Ceara unidas em 1817, estilo Arkanos 5 ano",
            "imagem_alt": "Mapa das províncias nordestinas participantes da Revolução de 1817",
            "image_url": "/static/img/quiz/historia5/hist5_av2_036.png"
        },
        {
            "id": "HIST5_AV2_037",
            "tema": "Insurreição Pernambucana de 1817",
            "tipo": "true_false",
            "dificuldade": "medium",
            "pergunta": "A Insurreição Pernambucana venceu o exército do rei D. João VI e Pernambuco ficou independente do Brasil para sempre.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "A coroa reagiu com extrema violência: em pouco mais de dois meses a revolta foi derrotada e seus líderes duramente punidos.",
            "cronica_do_guardiao": "Apesar da forte repressão militar enviada por D. João VI, a chama da liberdade de 1817 continuou acesa na memória nordestina.",
            "imagem_prompt": "Ilustracao didatica de tropas reais reprimindo a revolta de 1817 com os lideres mantendo a coragem, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração da repressão militar à Insurreição Pernambucana",
            "image_url": "/static/img/quiz/historia5/hist5_av2_037.png"
        },
        {
            "id": "HIST5_AV2_038",
            "tema": "Insurreição Pernambucana de 1817",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual foi o papel de lideranças religiosas (como o Frei Caneca e outros padres) na Insurreição Pernambucana de 1817?",
            "alternativas": ["Atuaram ativamente na propagação de ideias iluministas e na liderança da revolta (Ficou conhecida como 'Revolução dos Padres')", "Apoiaram a vinda de navios de guerra de Portugal", "Proibiram o povo de ler jornais", "Fugiram para a Europa com a corte"],
            "resposta": "Atuaram ativamente na propagação de ideias iluministas e na liderança da revolta (Ficou conhecida como 'Revolução dos Padres')",
            "explicacao": "Muitos sacerdotes instruídos do Seminário de Olinda lideraram o movimento, razão pela qual a revolta também é chamada de 'Revolução dos Padres'.",
            "cronica_do_guardiao": "Padres e intelectuais pernambucanos usavam a palavra para defender os direitos humanos e a independência do povo.",
            "imagem_prompt": "Desenho didatico do Frei Caneca e padres de Olinda discursando com o povo sobre liberdade em 1817, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho do Frei Caneca e padres na liderança da revolução",
            "image_url": "/static/img/quiz/historia5/hist5_av2_038.png"
        },

        # =========================================================================
        # EIXO 7: A REVOLUÇÃO DO PORTO DE 1820 (5 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_039",
            "tema": "Revolução do Porto de 1820",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em 1820, na cidade portuguesa do Porto, estourou uma revolução. O que os revolucionários portugueses exigiam?",
            "alternativas": ["O retorno imediato de D. João VI para Lisboa e a recolonização do Brasil", "A independência total do Brasil e fim de Portugal", "A coroação de Napoleão em Lisboa", "A transformação do Brasil em uma república"],
            "resposta": "O retorno imediato de D. João VI para Lisboa e a recolonização do Brasil",
            "explicacao": "Portugal estava em crise e sentia-se abandonado pelo rei. As Cortes exigiram a volta do rei e a perda da autonomia do Brasil (recolonização).",
            "cronica_do_guardiao": "A Revolução do Porto criou o paradoxo 'Liberal lá, colonial cá': queria liberdade para Portugal, mas queria o Brasil submisso novamente.",
            "imagem_prompt": "Ilustracao didatica das Cortes de Lisboa reunidas em 1820 exigindo o retorno do Rei e a submissao do Brasil, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração da reunião das Cortes Portuguesas na Revolução do Porto",
            "image_url": "/static/img/quiz/historia5/hist5_av2_039.png"
        },
        {
            "id": "HIST5_AV2_040",
            "tema": "Revolução do Porto de 1820",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "O que significa a expressão do macete 'Liberal lá, colonial cá' referente à Revolução do Porto?",
            "alternativas": ["Queria direitos e constituição para Portugal, mas queria tirar a liberdade e recolonizar o Brasil", "Queria libertar o Brasil e escravizar Portugal", "Queria proibir o comércio com a Inglaterra", "Queria transformar todos em reis"],
            "resposta": "Queria direitos e constituição para Portugal, mas queria tirar a liberdade e recolonizar o Brasil",
            "explicacao": "A contradição da Revolução do Porto: exigiam direitos liberais para os portugueses da Europa, mas queriam rebaixar o Brasil ao antigo estatuto de colônia.",
            "cronica_do_guardiao": "Essa tentativa de fazer o Brasil andar para trás empurrou definitivamente os brasileiros rumo à separação total.",
            "imagem_prompt": "Infografico didatico escolar dividindo dois lados: Portugal com Constituicao e Brasil com correntes de recolonizacao, estilo Arkanos",
            "imagem_alt": "Infográfico ilustrando a contradição 'Liberal lá, colonial cá'",
            "image_url": "/static/img/quiz/historia5/hist5_av2_040.png"
        },
        {
            "id": "HIST5_AV2_041",
            "tema": "Revolução do Porto de 1820",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Pressionado pelas Cortes portuguesas, D. João VI retornou a Portugal em 1821, mas deixou quem governando o Brasil como Príncipe Regente?",
            "alternativas": ["Seu filho, D. Pedro (futuro D. Pedro I)", "O general Simón Bolívar", "O Frei Caneca", "Napoleão Bonaparte"],
            "resposta": "Seu filho, D. Pedro (futuro D. Pedro I)",
            "explicacao": "D. João regressou a Lisboa em 1821, deixando seu jovem filho D. Pedro no Rio de Janeiro como regente.",
            "cronica_do_guardiao": "Antes de embarcar, D. João teria dito ao filho: 'Pedro, se o Brasil se separar, que seja para ti, antes que algum aventureiro lance mão dele'.",
            "imagem_prompt": "Ilustracao didatica de D. Joao VI se despedindo de seu filho D. Pedro no porto do Rio de Janeiro em 1821, estilo Arkanos 5 ano",
            "imagem_alt": "Despedida de D. João VI e D. Pedro no Rio de Janeiro",
            "image_url": "/static/img/quiz/historia5/hist5_av2_041.png"
        },
        {
            "id": "HIST5_AV2_042",
            "tema": "Revolução do Porto de 1820",
            "tipo": "true_false",
            "dificuldade": "easy",
            "pergunta": "Os comerciantes e brasileiros aceitaram pacificamente a ordem das Cortes de Lisboa para fechar os portos e voltar a ser colônia.",
            "alternativas": ["Verdadeiro", "Falso"],
            "resposta": "Falso",
            "explicacao": "Os brasileiros reagiram com indignação! Haviam experimentado o progresso econômico e uniram-se ao redor de D. Pedro para impedir a recolonização.",
            "cronica_do_guardiao": "A ameaça de recolonização uniu diferentes grupos brasileiros em defesa das conquistas alcançadas desde 1808.",
            "imagem_prompt": "Desenho didatico de patriotas brasileiros reunidos protestando contra as ordens de Lisboa em 1821, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho de patriotas indignados com as ordens das Cortes Portuguesas",
            "image_url": "/static/img/quiz/historia5/hist5_av2_042.png"
        },
        {
            "id": "HIST5_AV2_043",
            "tema": "Revolução do Porto de 1820",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual foi a grande consequência involuntária da pressão das Cortes de Lisboa sobre o Brasil?",
            "alternativas": ["Apressou o processo de independência do Brasil sob a liderança de D. Pedro", "Fez o Brasil virar uma província espanhola", "Acabou com o império de Napoleão", "Provocou a destruição das capitais"],
            "resposta": "Apressou o processo de independência do Brasil sob a liderança de D. Pedro",
            "explicacao": "Ao tentar forçar a barra para recolonizar o Brasil, Portugal conseguiu o efeito oposto: empurrou os brasileiros para a independência definitiva.",
            "cronica_do_guardiao": "A intransigência das Cortes de Lisboa acelerou a marcha da história, tornando a independência inevitável em 1822.",
            "imagem_prompt": "Ilustracao didatica mostrando ordens de Lisboa chegando de navio e acelerando o relogio da independencia no Brasil, estilo Arkanos",
            "imagem_alt": "Ilustração das ordens de Lisboa acelerando a independência",
            "image_url": "/static/img/quiz/historia5/hist5_av2_043.png"
        },

        # =========================================================================
        # EIXO 8: A INDEPENDÊNCIA DO BRASIL EM 1822 (7 Questões)
        # =========================================================================
        {
            "id": "HIST5_AV2_044",
            "tema": "Independência do Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em 9 de janeiro de 1822, D. Pedro desobedeceu às ordens de Lisboa para voltar a Portugal e declarou que ficaria no Brasil. Esse dia ficou conhecido como:",
            "alternativas": ["O Dia do Fico", "O Grito do Ipiranga", "A Abertura dos Portos", "A Insurreição"],
            "resposta": "O Dia do Fico",
            "explicacao": "No Dia do Fico (9/1/1822), D. Pedro pronunciou a célebre frase: 'Se é para o bem de todos e felicidade geral da Nação, diga ao povo que fico!'.",
            "cronica_do_guardiao": "O Dia do Fico foi o primeiro grande rompimento político formal entre D. Pedro e a coroa de Lisboa.",
            "imagem_prompt": "Ilustracao didatica de D. Pedro na sacada do palacio acenando para o povo no Dia do Fico em 9 de janeiro de 1822, estilo Arkanos 5 ano",
            "imagem_alt": "D. Pedro na sacada do palácio no Dia do Fico",
            "image_url": "/static/img/quiz/historia5/hist5_av2_044.png"
        },
        {
            "id": "HIST5_AV2_045",
            "tema": "Independência do Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Quem foi a figura intelectual e política fundamental que atuou como principal conselheiro de D. Pedro, recebendo o título de 'Patriarca da Independência'?",
            "alternativas": ["José Bonifácio de Andrada e Silva", "Frei Caneca", "Túpac Amaru II", "Simón Bolívar"],
            "resposta": "José Bonifácio de Andrada e Silva",
            "explicacao": "José Bonifácio orientou os passos de D. Pedro e organizou a articulação política entre as províncias para a independência.",
            "cronica_do_guardiao": "Cientista e estadista de mente brilhante, José Bonifácio arquitetou a transição política do Brasil com sabedoria.",
            "imagem_prompt": "Retrato didatico nobre de Jose Bonifacio de Andrada e Silva o Patriarca da Independencia com documentos de estado, estilo Arkanos",
            "imagem_alt": "Retrato do Patriarca da Independência José Bonifácio",
            "image_url": "/static/img/quiz/historia5/hist5_av2_045.png"
        },
        {
            "id": "HIST5_AV2_046",
            "tema": "Independência do Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "easy",
            "pergunta": "Em qual data histórica e local D. Pedro proclamou oficialmente a independência do Brasil com o brado 'Independência ou Morte!'?",
            "alternativas": ["7 de setembro de 1822, às margens do riacho Ipiranga (São Paulo)", "9 de janeiro de 1822, no Recife", "1 de janeiro de 1804, no Haiti", "15 de novembro de 1889, no Rio de Janeiro"],
            "resposta": "7 de setembro de 1822, às margens do riacho Ipiranga (São Paulo)",
            "explicacao": "Em 7 de setembro de 1822, junto ao riacho Ipiranga em São Paulo, D. Pedro rompeu definitivamente os laços com Portugal.",
            "cronica_do_guardiao": "Às margens do Ipiranga, com a espada erguida, D. Pedro selou o destino de uma nova nação soberana.",
            "imagem_prompt": "Ilustracao historica didatica de D. Pedro erguendo a espada as margens do riacho Ipiranga proclamando a independencia em 1822, estilo Arkanos 5 ano",
            "imagem_alt": "D. Pedro proclamando a independência às margens do Ipiranga",
            "image_url": "/static/img/quiz/historia5/hist5_av2_046.png"
        },
        {
            "id": "HIST5_AV2_047",
            "tema": "Independência do Brasil",
            "tipo": "visual_interpretation",
            "dificuldade": "medium",
            "pergunta": "Observe o macete 'Fico em janeiro, grito em setembro'. Qual a ordem correta das duas datas marcantes de 1822?",
            "alternativas": ["9 de janeiro (Dia do Fico) -> 7 de setembro (Grito do Ipiranga)", "7 de setembro (Grito do Ipiranga) -> 9 de janeiro (Dia do Fico)", "1808 (Chegada da Família Real) -> 1804 (Haiti)", "1817 (Revolução) -> 1780 (Túpac)"],
            "resposta": "9 de janeiro (Dia do Fico) -> 7 de setembro (Grito do Ipiranga)",
            "explicacao": "Em 9/1 D. Pedro decidiu ficar no Brasil e em 7/9 ele proclamou a independência definitiva.",
            "cronica_do_guardiao": "Janeiro preparou o caminho e setembro consumou a vitória política da independência brasileira.",
            "imagem_prompt": "Infografico didatico do calendario de 1822 destacando as duas datas: 9 de janeiro e 7 de setembro, estilo Arkanos 5 ano",
            "imagem_alt": "Calendário de 1822 destacando o Dia do Fico e o 7 de Setembro",
            "image_url": "/static/img/quiz/historia5/hist5_av2_047.png"
        },
        {
            "id": "HIST5_AV2_048",
            "tema": "Independência do Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "hard",
            "pergunta": "Qual destas opções apresenta um importante CONTRASTE entre a independência do Haiti e a independência do Brasil?",
            "alternativas": ["No Haiti a luta foi feita pelos escravizados e a escravidão acabou na hora; no Brasil foi decidida pelo príncipe com os mais ricos e a escravidão continuou por décadas", "O Haiti virou monarquia e o Brasil virou república", "O Brasil dividiu-se em 20 países e o Haiti ficou gigante", "As duas foram lideradas por Napoleão Bonaparte"],
            "resposta": "No Haiti a luta foi feita pelos escravizados e a escravidão acabou na hora; no Brasil foi decidida pelo príncipe com os mais ricos e a escravidão continuou por décadas",
            "explicacao": "É a comparação de ouro do capítulo: no Haiti foi uma revolução popular anti-escravista 'vinda de baixo'. No Brasil foi uma decisão 'vinda de cima' liderada pelo príncipe, mantendo a estrutura social e a escravidão.",
            "cronica_do_guardiao": "Esse contraste revela como a independência do Brasil garantiu a unidade territorial e a monarquia, mas deixou pendente a libertação dos escravizados.",
            "imagem_prompt": "Infografico didatico comparativo de ouro entre a independencia do Haiti e a do Brasil, estilo Arkanos 5 ano",
            "imagem_alt": "Quadro comparativo entre as independências do Haiti e do Brasil",
            "image_url": "/static/img/quiz/historia5/hist5_av2_048.png"
        },
        {
            "id": "HIST5_AV2_049",
            "tema": "Independência do Brasil",
            "tipo": "multiple_choice",
            "dificuldade": "medium",
            "pergunta": "Ao contrário do restante da América Latina que adotou a República, qual forma de governo o Brasil adotou após 1822 ao coroar D. Pedro I?",
            "alternativas": ["Monarquia (Império)", "República Presidencialista", "Ditadura Militar", "Comunado de Aldeias"],
            "resposta": "Monarquia (Império)",
            "explicacao": "O Brasil foi a única grande nação das Américas a manter-se como uma Monarquia (Império) após a independência.",
            "cronica_do_guardiao": "D. Pedro foi sagrado e coroado o primeiro Imperador do Brasil, mantendo o país unido sob a coroa imperial.",
            "imagem_prompt": "Ilustracao didatica da coroacao de D. Pedro I como Imperador do Brasil no Rio de Janeiro em 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Coroação de D. Pedro I como Imperador do Brasil",
            "image_url": "/static/img/quiz/historia5/hist5_av2_049.png"
        },
        {
            "id": "HIST5_AV2_050",
            "tema": "Independência do Brasil",
            "tipo": "ordering",
            "dificuldade": "hard",
            "pergunta": "Qual é a sequência cronológica perfeita da Linha do Tempo da História da América e do Brasil estudada na AV2?",
            "alternativas": ["1780 (Túpac Amaru) -> 1804 (Haiti) -> 1808 (Família Real no Brasil) -> 1817 (Insurreição Pernambucana) -> 1822 (Independência do Brasil)", "1822 (Brasil) -> 1808 (Família Real) -> 1780 (Túpac Amaru) -> 1804 (Haiti)", "1804 (Haiti) -> 1822 (Brasil) -> 1780 (Túpac Amaru) -> 1817 (Pernambuco)", "1808 (Família Real) -> 1780 (Túpac Amaru) -> 1822 (Brasil) -> 1804 (Haiti)"],
            "resposta": "1780 (Túpac Amaru) -> 1804 (Haiti) -> 1808 (Família Real no Brasil) -> 1817 (Insurreição Pernambucana) -> 1822 (Independência do Brasil)",
            "explicacao": "Essa é a grande linha do tempo mestra do 2º trimestre: 1780 (Peru) -> 1804 (Haiti) -> 1808 (Chegada de D. João) -> 1817 (Recife) -> 1822 (Grito do Ipiranga).",
            "cronica_do_guardiao": "Parabéns, jovem Sábio! Você dominou toda a jornada histórica do 2º Trimestre e está 100% preparado para gabaritar a prova de História!",
            "imagem_prompt": "Linha do tempo mestra didatica completa e ilustrada com os 5 grandes marcos historicos de 1780 a 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Linha do tempo mestra da AV2 de História do 5º Ano",
            "image_url": "/static/img/quiz/historia5/hist5_av2_050.png"
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

        # Evita duplicatas
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
                "avaliacao": "AV2",
                "serie": "5º ano",
                "disciplina": "História",
                "eixo": topic_name
            }
        )
        created_count += 1

    print(f"Done! Created: {created_count}, Skipped (existing): {skipped_count}")

if __name__ == "__main__":
    seed_historia5()
