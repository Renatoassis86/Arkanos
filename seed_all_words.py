import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from jogos.models import PalavraSpellingBee, PalavraRadix, Jogo

def seed_spelling_bee():
    print("Seeding Spelling Bee words from JS files...")
    
    base_path = 'static/spellingbee/palavras/'
    files = {
        '2ano': 'palavras_2ano.js',
        '4ano': 'palavras_4ano.js'
    }

    total_added = 0
    for serie, filename in files.items():
        path = os.path.join(base_path, filename)
        if not os.path.exists(path):
            print(f"Warning: {path} not found.")
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Simple JS list of objects to Python parser
            # Expecting: { word: "...", meaning: "...", frase: "..." }
            import re
            pattern = re.compile(r'\{\s*word:\s*"([^"]+)",\s*meaning:\s*"([^"]+)",\s*frase:\s*"([^"]+)"\s*\}')
            matches = pattern.findall(content)
            
            for word, meaning, frase in matches:
                PalavraSpellingBee.objects.get_or_create(
                    palavra=word,
                    serie=serie,
                    defaults={
                        'significado': meaning,
                        'exemplo': frase,
                        'ipa': f"UK [ {word} ]" # Placeholder IPA if not provided
                    }
                )
                total_added += 1
    
    print(f"Total Spelling Bee words imported: {total_added}")

def seed_radix():
    print("Seeding Radix words (Portuguese)...")
    radix_words = [
        ("sabedoria", "Qualidade de quem tem conhecimento, erudição.", "A sabedoria é o objetivo do sábio.", "medio"),
        ("virtude", "Disposição constante de praticar o bem.", "A coragem é uma virtude cardeal.", "medio"),
        ("gramática", "Conjunto de regras que determinam o uso correto de uma língua.", "A gramática é a primeira arte do Trivium.", "dificil"),
        ("lógica", "Arte de raciocinar corretamente.", "A lógica nos ajuda a identificar falácias.", "dificil"),
        ("retórica", "Arte do bem falar e da persuasão.", "A retórica coroa o aprendizado clássico.", "dificil"),
        ("família", "Grupo de pessoas unidas por laços de sangue ou afeto.", "A família é a base da sociedade.", "facil"),
        ("escola", "Instituição destinada ao ensino.", "A escola Arkanos preza pela virtude.", "facil"),
        ("igreja", "Comunidade de fiéis cristãos.", "A igreja é o corpo de Cristo.", "facil"),
        ("estudo", "Atividade dedicada ao aprendizado.", "O estudo constante leva à excelência.", "facil"),
        ("livro", "Obra impressa ou manuscrita em folhas de papel.", "O livro é um tesouro de conhecimento.", "facil"),
        ("honra", "Sentimento de dignidade própria.", "Dê honra a quem tem honra.", "medio"),
        ("coragem", "Firmeza de espírito diante do perigo.", "A coragem é necessária para a verdade.", "medio"),
        ("justiça", "Princípio moral que inclina a dar a cada um o que lhe pertence.", "A justiça deve ser buscada por todos.", "medio"),
        ("temperança", "Moderação nos apetites e paixões.", "A temperança equilibra a alma.", "dificil"),
        ("prudência", "Virtude que faz prever e evitar erros.", "A prudência guia nossas decisões.", "dificil"),
        ("verdade", "Conformidade com os fatos ou a realidade.", "A verdade vos libertará.", "facil"),
        ("beleza", "Qualidade do que é belo.", "A beleza aponta para o Criador.", "facil"),
        ("bondade", "Qualidade de quem é bom.", "A bondade de Deus é infinita.", "facil"),
        ("mestre", "Aquele que ensina ou dirige.", "O mestre compartilha sua jornada.", "facil"),
        ("discípulo", "Aquele que segue os ensinamentos de outrem.", "O bom discípulo supera o mestre.", "facil"),
        ("universo", "Tudo o que existe fisicamente.", "O universo é vasto e ordenado.", "medio"),
        ("planeta", "Corpo celeste que gira em torno de uma estrela.", "A Terra é o nosso planeta.", "facil"),
        ("estrela", "Astro que emite luz própria.", "O sol é uma estrela.", "facil"),
        ("criança", "Ser humano na fase da infância.", "Toda criança gosta de brincar.", "facil"),
        ("alegria", "Sentimento de contentamento.", "A alegria do Senhor é a nossa força.", "facil"),
        ("amizade", "Sentimento de afeição entre pessoas.", "Uma boa amizade vale ouro.", "facil"),
        ("história", "Conjunto de eventos do passado.", "Nossa história define quem somos.", "medio"),
        ("futuro", "Tempo que ainda está por vir.", "O futuro pertence a Deus.", "facil"),
        ("conhecimento", "Ato de conhecer e compreender.", "Busque o conhecimento como quem busca tesouros.", "dificil"),
        ("esperança", "Sentimento de que algo desejado vai acontecer.", "A esperança renova as forças.", "facil"),
        ("paciência", "Capacidade de esperar com calma.", "A paciência é amarga, mas seu fruto é doce.", "medio"),
        ("generosidade", "Qualidade de quem gosta de dar e partilhar.", "Ser generoso faz bem à alma.", "medio"),
        ("respeito", "Sentimento de consideração por alguém.", "Respeito é a base da convivência.", "facil"),
        ("humildade", "Qualidade de quem conhece suas limitações.", "A humildade precede a honra.", "medio"),
        ("gratidão", "Sentimento de quem quer agradecer.", "A gratidão abre portas.", "facil"),
        ("perseverança", "Qualidade de quem não desiste.", "A perseverança leva à vitória.", "dificil"),
        ("inteligência", "Capacidade de compreender e resolver problemas.", "Use sua inteligência para o bem.", "medio"),
        ("criatividade", "Capacidade de criar e inovar.", "A criatividade é um dom divino.", "medio"),
        ("diálogo", "Conversa entre duas ou mais pessoas.", "O diálogo resolve conflitos.", "facil"),
        ("comunicação", "Ato de transmitir informações.", "Uma boa comunicação é fundamental.", "medio"),
        ("língua", "Sistema de signos usado para comunicação.", "A língua portuguesa é rica e bela.", "facil"),
        ("alfabeto", "Conjunto de letras de um idioma.", "O alfabeto é a base da escrita.", "facil"),
        ("leitura", "Ato de ler e interpretar textos.", "A leitura amplia horizontes.", "facil"),
        ("escrita", "Ato de representar sons por símbolos.", "A escrita imortaliza pensamentos.", "facil"),
        ("poesia", "Arte de compor versos.", "A poesia expressa a alma.", "facil"),
        ("música", "Arte de combinar sons.", "A música eleva o espírito.", "facil"),
        ("ciência", "Estudo sistemático do mundo natural.", "A ciência busca entender as leis de Deus.", "medio"),
        ("matemática", "Ciência que estuda quantidades e formas.", "A matemática é a linguagem do universo.", "medio"),
        ("natureza", "Mundo físico e seus seres vivos.", "A natureza reflete a glória divina.", "facil"),
        ("animal", "Ser vivo que se move e sente.", "O leão é um animal majestoso.", "facil"),
    ]
    
    for p, s, e, d in radix_words:
        PalavraRadix.objects.get_or_create(palavra=p, defaults={'significado': s, 'exemplo': e, 'dificuldade': d})

if __name__ == "__main__":
    seed_spelling_bee()
    seed_radix()
    print("Database seeded with full word banks.")
