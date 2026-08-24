import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizQuestion, QuizSubject, QuizGrade, QuizAssessment, QuizTopic
)

def seed_historia5_revisao():
    print("Seeding Exercício de Revisão History (5º Ano - Benjamim) questions...")

    grade, _ = QuizGrade.objects.get_or_create(name="5º ano")
    subject, _ = QuizSubject.objects.get_or_create(name="História")
    assessment, _ = QuizAssessment.objects.get_or_create(
        name="AV2", grade=grade, subject=subject
    )

    topic, _ = QuizTopic.objects.get_or_create(
        name="Exercício de Revisão", subject=subject, grade=grade, assessment=assessment
    )

    questions_data = [
        {
            "id": "HIST5_REV_001",
            "pergunta": "De acordo com a folha de revisão, por que a Inglaterra ajudou a Família Real portuguesa a fugir para o Brasil em 1807?",
            "alternativas": ["Porque a Inglaterra queria manter o comércio com Portugal e derrotar o Bloqueio Continental de Napoleão", "Porque a Inglaterra queria morar no Brasil", "Porque os navios ingleses estavam perdidos no mar", "Porque a França comprou a Inglaterra"],
            "resposta": "Porque a Inglaterra queria manter o comércio com Portugal e derrotar o Bloqueio Continental de Napoleão",
            "explicacao": "A aliança entre Inglaterra e Portugal visava furar o Bloqueio Continental e manter as trocas mercantis vivas.",
            "cronica_do_guardiao": "A escolta naval britânica garantiu a travessia segura da comitiva real portuguesa através do Oceano Atlântico.",
            "imagem_prompt": "Ilustracao didatica de navios ingleses e portugueses navegando juntos no Atlantico em 1807, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático da escolta naval inglesa em 1807",
            "image_url": "/static/img/quiz/historia5/hist5_rev_001.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        },
        {
            "id": "HIST5_REV_002",
            "pergunta": "Qual foi a consequência imediata para o Brasil da medida econômica 'Abertura dos Portos às Nações Amigas' decretada por D. João em 1808?",
            "alternativas": ["Fim do monopólio comercial português (Pacto Colonial) e liberdade de comércio com outros países", "Proibição da venda de açúcar para a Europa", "Fechamento de todos os portos do Brasil", "Criação da primeira ferrovia de trens"],
            "resposta": "Fim do monopólio comercial português (Pacto Colonial) e liberdade de comércio com outros países",
            "explicacao": "A Abertura dos Portos acabou com a obrigação de vender só para Portugal, beneficiando o comércio brasileiro.",
            "cronica_do_guardiao": "Os portos brasileiros encheram-se de navios internacionais, inaugurando uma nova era econômica.",
            "imagem_prompt": "Ilustracao didatica dos portos do Rio de Janeiro abertos para navios mercantes em 1808, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho da Abertura dos Portos em 1808",
            "image_url": "/static/img/quiz/historia5/hist5_rev_002.png",
            "tipo": "multiple_choice",
            "dificuldade": "easy"
        },
        {
            "id": "HIST5_REV_003",
            "pergunta": "Na folha de revisão, qual foi a principal causa do descontentamento que gerou a Insurreição Pernambucana em 1817?",
            "alternativas": ["Os impostos altíssimos cobrados pela Coroa para bancar o luxo da corte no Rio de Janeiro durante uma crise agrícola no Nordeste", "A falta de praias em Pernambuco", "A proibição do plantio de milho", "O excesso de chuva na Europa"],
            "resposta": "Os impostos altíssimos cobrados pela Coroa para bancar o luxo da corte no Rio de Janeiro durante uma crise agrícola no Nordeste",
            "explicacao": "Pernambuco pagava impostos pesados para financiar os gastos da capital enquanto sofria com a seca e a crise do açúcar.",
            "cronica_do_guardiao": "O povo nordestino recusou-se a continuar pagando a conta dos luxos da corte real.",
            "imagem_prompt": "Ilustracao didatica dos revoltosos pernambucanos protestando em Recife em 1817, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho dos protestos da Insurreição Pernambucana de 1817",
            "image_url": "/static/img/quiz/historia5/hist5_rev_003.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        },
        {
            "id": "HIST5_REV_004",
            "pergunta": "Como ficou conhecida a Insurreição Pernambucana de 1817 devido à forte participação dos sacerdotes do Seminário de Olinda na liderança do movimento?",
            "alternativas": ["Revolução dos Padres", "Guerra dos Navegantes", "Revolta dos Imperadores", "Revolução Industrial"],
            "resposta": "Revolução dos Padres",
            "explicacao": "Diversos padres instruídos participaram ativamente da organização da República Provisória de 1817.",
            "cronica_do_guardiao": "Padres como o Frei Caneca usaram a palavra e a fé para defender a liberdade republicana.",
            "imagem_prompt": "Ilustracao didatica do Frei Caneca e sacerdotes liderando a revolucao em 1817, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração do Frei Caneca e padres na Revolução de 1817",
            "image_url": "/static/img/quiz/historia5/hist5_rev_004.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        },
        {
            "id": "HIST5_REV_005",
            "pergunta": "O que as ideias do Iluminismo (nascidas na Europa) defendiam para as colônias da América?",
            "alternativas": ["Liberdade política, igualdade de direitos e o fim do absolutismo dos reis", "A continuação da escravidão obrigatória", "O aumento dos impostos coloniais", "O fechamento de todas as escolas"],
            "resposta": "Liberdade política, igualdade de direitos e o fim do absolutismo dos reis",
            "explicacao": "O Iluminismo inspirou os patriotas americanos a lutarem contra a tirania das metrópoles europeias.",
            "cronica_do_guardiao": "Ideias iluministas acenderam a luz da razão e da igualdade nas mentes dos colonos.",
            "imagem_prompt": "Ilustracao didatica simbolizando a luz do Iluminismo iluminando livros e pergaminhos da liberdade, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático simbolizando as ideias iluministas",
            "image_url": "/static/img/quiz/historia5/hist5_rev_005.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        },
        {
            "id": "HIST5_REV_006",
            "pergunta": "Em 9 de janeiro de 1822, D. Pedro recusou-se a voltar para Portugal após receber uma petição com milhares de assinaturas do povo. Como esse dia é celebrado?",
            "alternativas": ["Dia do Fico", "Grito do Ipiranga", "Dia da Bandeira", "Proclamação da República"],
            "resposta": "Dia do Fico",
            "explicacao": "No Dia do Fico, D. Pedro declarou: 'Se é para o bem de todos e felicidade geral da Nação, diga ao povo que fico!'.",
            "cronica_do_guardiao": "A decisão de D. Pedro de permanecer no Brasil selou o compromisso com a autonomia nacional.",
            "imagem_prompt": "Ilustracao didatica de D. Pedro acenando para o povo no Dia do Fico em 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático de D. Pedro no Dia do Fico",
            "image_url": "/static/img/quiz/historia5/hist5_rev_006.png",
            "tipo": "multiple_choice",
            "dificuldade": "easy"
        },
        {
            "id": "HIST5_REV_007",
            "pergunta": "Qual foi o motivo pelo qual as Cortes de Lisboa em 1820 exigiram o retorno de D. João VI para Portugal?",
            "alternativas": ["Porque Portugal estava em crise econômica e exigia uma nova Constituição e a recolonização do Brasil", "Porque queriam dar de presente a Europa ao Brasil", "Porque o rei tinha esquecido as chaves do palácio", "Porque Napoleão virou rei de Lisboa"],
            "resposta": "Porque Portugal estava em crise econômica e exigia uma nova Constituição e a recolonização do Brasil",
            "explicacao": "A Revolução do Porto de 1820 queria restaurar os privilégios comerciais de Portugal fazendo o Brasil voltar a ser colônia.",
            "cronica_do_guardiao": "A tentativa portuguesa de recolonizar o Brasil acelerou a busca pela independência total.",
            "imagem_prompt": "Ilustracao didatica das Cortes de Lisboa reunidas exigindo o retorno do Rei em 1820, estilo Arkanos 5 ano",
            "imagem_alt": "Ilustração da Revolução do Porto em 1820",
            "image_url": "/static/img/quiz/historia5/hist5_rev_007.png",
            "tipo": "multiple_choice",
            "dificuldade": "hard"
        },
        {
            "id": "HIST5_REV_008",
            "pergunta": "Quem foi a figura histórica conhecida como 'Patriarca da Independência', que atuou como conselheiro político de D. Pedro I?",
            "alternativas": ["José Bonifácio de Andrada e Silva", "Frei Caneca", "Túpac Amaru II", "Toussaint Louverture"],
            "resposta": "José Bonifácio de Andrada e Silva",
            "explicacao": "José Bonifácio foi o arquiteto político da independência, organizando o apoio das províncias ao príncipe D. Pedro.",
            "cronica_do_guardiao": "A sabedoria política de José Bonifácio guiou a fundação do Império do Brasil.",
            "imagem_prompt": "Retrato didatico nobre de Jose Bonifacio o Patriarca da Independencia, estilo Arkanos 5 ano",
            "imagem_alt": "Retrato didático de José Bonifácio",
            "image_url": "/static/img/quiz/historia5/hist5_rev_008.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        },
        {
            "id": "HIST5_REV_009",
            "pergunta": "Qual foi a célebre frase proferida por D. Pedro I às margens do riacho Ipiranga em 7 de setembro de 1822?",
            "alternativas": ["Independência ou Morte!", "Se é para o bem de todos, eu fico!", "Ordem e Progresso!", "Liberdade ainda que tardia!"],
            "resposta": "Independência ou Morte!",
            "explicacao": "O brado 'Independência ou Morte!' marcou o desligamento oficial do Brasil em relação a Portugal.",
            "cronica_do_guardiao": "Com a espada erguida, D. Pedro I proclamou o nascimento do Brasil independente.",
            "imagem_prompt": "Ilustracao didatica de D. Pedro proclamando a independencia no riacho Ipiranga em 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho didático do Grito do Ipiranga",
            "image_url": "/static/img/quiz/historia5/hist5_rev_009.png",
            "tipo": "multiple_choice",
            "dificuldade": "easy"
        },
        {
            "id": "HIST5_REV_010",
            "pergunta": "Qual forma de governo foi adotada no Brasil após a independência em 1822?",
            "alternativas": ["Monarquia Imperial (com D. Pedro I coroado imperador)", "República Presidencialista", "Ditadura Militar", "Reino Feudal"],
            "resposta": "Monarquia Imperial (com D. Pedro I coroado imperador)",
            "explicacao": "Diferente dos vizinhos hispânicos que viraram repúblicas, o Brasil manteve a forma monárquica sob a coroa de D. Pedro I.",
            "cronica_do_guardiao": "O Brasil iniciou sua trajetória independente como o único Império das Américas.",
            "imagem_prompt": "Ilustracao didatica da coroacao de D. Pedro I como Imperador em 1822, estilo Arkanos 5 ano",
            "imagem_alt": "Desenho da coroação de D. Pedro I",
            "image_url": "/static/img/quiz/historia5/hist5_rev_010.png",
            "tipo": "multiple_choice",
            "dificuldade": "medium"
        }
    ]

    created_count = 0
    skipped_count = 0

    for item in questions_data:
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
            difficulty=item["dificuldade"],
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
                "origem": "Exercício de Revisão Escolar",
                "estudante": "Benjamim",
                "avaliacao": "AV2",
                "serie": "5º ano",
                "disciplina": "História",
                "eixo": "Exercício de Revisão"
            }
        )
        created_count += 1

    print(f"Done Benjamim Revision! Created: {created_count}, Skipped (existing): {skipped_count}")

if __name__ == "__main__":
    seed_historia5_revisao()
