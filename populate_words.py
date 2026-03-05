import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from jogos.models import PalavraSpellingBee, Jogo, Conquista

def populate():
    # Garantir que o jogo existe
    Jogo.objects.get_or_create(
        slug='spelling-bee',
        defaults={
            'nome': 'Spelling Bee',
            'tipo': 'spellingbee',
            'descricao': 'Desafio de soletração clássico Arkanos.',
            'dificuldade': 'Variável'
        }
    )

    # Limpar palavras antigas para evitar duplicatas confusas durante o desenvolvimento
    PalavraSpellingBee.objects.all().delete()

    words = [
        # 2ND YEAR
        ("yellow", "UK /ˈjel.əʊ/ US /ˈjel.oʊ/", "It's a colour.", "The sun is yellow.", "2ano"),
        ("pink", "UK /pɪŋk/ US /pɪŋk/", "It's a colour.", "She is wearing a pink dress.", "2ano"),
        ("green", "UK /ɡriːn/ US /ɡriːn/", "It's a colour.", "The crocodile is green.", "2ano"),
        ("red", "UK /red/ US /red/", "It's a colour.", "I love red apples.", "2ano"),
        ("orange", "UK /ˈɒr.ɪndʒ/ US /ˈɔːr.ɪndʒ/", "It's a colour and a fruit.", "He cut the orange into quarters.", "2ano"),
        ("blue", "UK /bluː/ US /bluː/", "It's a colour.", "The sky is blue.", "2ano"),
        ("purple", "UK /ˈpɜː.pəl/ US /ˈpɝː.pəl/", "It's a colour.", "She's wearing a purple skirt.", "2ano"),
        ("brown", "UK /braʊn/ US /braʊn/", "It's a colour.", "The mountains are brown.", "2ano"),
        ("black", "UK /blæk/ US /blæk/", "It's a colour.", "She has got black hair.", "2ano"),
        ("white", "UK /waɪt/ US /waɪt/", "It's a colour.", "The snow is white.", "2ano"),
        ("bookcase", "UK /ˈbʊk.keɪs/ US /ˈbʊk.keɪs/", "Piece of furniture for books.", "There is a bookcase in my classroom.", "2ano"),
        ("board", "UK /bɔːd/ US /bɔːrd/", "The teacher writes on the board.", "Look at the board.", "2ano"),
        ("desk", "UK /desk/ US /desk/", "A type of table for study.", "The books are on the desk.", "2ano"),
        ("ruler", "UK /ˈruː.lər/ US /ˈruː.lɚ/", "Used for measuring things.", "The ruler is in my bag.", "2ano"),
        
        # 4TH YEAR
        ("January", "UK /ˈdʒæn·ju·ər·i/ US /ˈdʒæn·juˌer·i/", "The first month of the year.", "My class begins in January.", "4ano"),
        ("February", "UK /ˈfeb·ruər·i/ US /ˈfeb·ruˌer·i/", "The second month of the year.", "He was born in February.", "4ano"),
        ("May", "UK /meɪ/", "The fifth month of the year.", "My birthday is in May.", "4ano"),
        ("June", "UK /dʒuːn/", "The sixth month of the year.", "The teacher's birthday is in June.", "4ano"),
        ("quiet", "UK /kwaɪ·ət/", "Making little or no noise.", "Can you be quiet, please?", "4ano"),
        ("loud", "UK /laʊd/", "Making a lot of noise.", "She made a loud noise.", "4ano"),
    ]

    for palavra, ipa, significado, exemplo, serie in words:
        PalavraSpellingBee.objects.get_or_create(
            palavra=palavra,
            serie=serie,
            defaults={
                'significado': significado,
                'ipa': ipa,
                'exemplo': exemplo
            }
        )

    # Conquistas
    Conquista.objects.get_or_create(
        nome="Iniciante Arkano",
        tipo="achievement",
        defaults={'descricao': "Completou sua primeira rodada de soletração.", 'icone': "fa-seedling", 'pontos_necessarios': 0}
    )
    Conquista.objects.get_or_create(
        nome="Mestre das Letras",
        tipo="achievement",
        defaults={'descricao': "Acertou 10 palavras seguidas!", 'icone': "fa-crown", 'pontos_necessarios': 500}
    )

    print(f"Sucesso: {len(words)} palavras e conquistas populadas.")

if __name__ == '__main__':
    populate()
