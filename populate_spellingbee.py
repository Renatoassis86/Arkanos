import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from jogos.models import PalavraSpellingBee

def populate():
    # Palavras antigas que estavam no HTML
    palavras_2ano = [
        ("apple", "A sweet fruit that is red or green.", "I eat an apple every day."),
        ("arm", "A part of your body between your shoulder and hand.", "She raised her arm to answer."),
        ("baby", "A very young child.", "The baby is sleeping."),
        ("bag", "A container to carry things.", "He packed his school bag."),
        ("ball", "A round object used in games and sports.", "They played with a ball at the park.")
    ]
    
    palavras_4ano = [
        ("about", "On the subject of something.", "We talked about animals."),
        ("above", "At a higher place.", "The bird flew above the trees."),
        ("accident", "Something bad that happens unexpectedly.", "He had a bike accident."),
        ("across", "From one side to the other.", "She walked across the street."),
        ("address", "Where someone lives.", "I wrote my address on the envelope.")
    ]

    total = 0
    # Inserir 2º Ano
    for word, meaning, frase in palavras_2ano:
        PalavraSpellingBee.objects.get_or_create(
            palavra=word,
            defaults={'significado': meaning, 'exemplo': frase, 'serie': '2ano', 'dificuldade': 'facil'}
        )
        total += 1

    # Inserir 4º Ano
    for word, meaning, frase in palavras_4ano:
        PalavraSpellingBee.objects.get_or_create(
            palavra=word,
            defaults={'significado': meaning, 'exemplo': frase, 'serie': '4ano', 'dificuldade': 'medio'}
        )
        total += 1

    print(f"Sucesso! {total} palavras inseridas para teste.")

if __name__ == "__main__":
    populate()
