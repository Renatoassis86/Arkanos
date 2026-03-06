
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def seed_desafio():
    print("Seeding Desafio dos Sábios with Multiple Choice questions...")
    
    questions = [
        # Civilização Minoica
        {
            'question': 'Qual o nome do lendário rei associado à ilha de Creta e à lenda do Minotauro?',
            'options': ['Agamemnon', 'Minos', 'Penteu', 'Príamo'],
            'answer': 'Minos',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Civilização Minoica',
            'explanation': 'Minos foi o lendário rei de Creta, de onde deriva o nome "Minoica".'
        },
        {
            'question': 'Qual era o principal palácio e centro administrativo dos minoicos em Creta?',
            'options': ['Partenon', 'Cnossos', 'Micenas', 'Tirinto'],
            'answer': 'Cnossos',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Civilização Minoica',
            'explanation': 'O Palácio de Cnossos era o coração da civilização minoica.'
        },
        {
            'question': 'Que tipo de escrita os minoicos utilizavam (e que ainda não foi totalmente decifrada)?',
            'options': ['Hieróglifos Egípcios', 'Linear A', 'Linear B', 'Escrita Cuneiforme'],
            'answer': 'Linear A',
            'type': 'multiple_choice',
            'difficulty': 'hard',
            'subject': 'História',
            'topic': 'Civilização Minoica',
            'explanation': 'A Linear A é a escrita minoica clássica, distinta da Linear B micênica.'
        },

        # Civilização Micênica
        {
            'question': 'Qual cidade-estado dá o nome à civilização que sucedeu a Minoica na Grécia?',
            'options': ['Esparta', 'Atenas', 'Micenas', 'Tebas'],
            'answer': 'Micenas',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Civilização Micênica',
            'explanation': 'Micenas era o centro de poder deste povo guerreiro.'
        },
        {
            'question': 'Segundo os poemas de Homero, qual famosa guerra foi liderada pelos micênicos?',
            'options': ['Guerra do Peloponeso', 'Guerra de Troia', 'Guerras Médicas', 'Guerra Civil Grega'],
            'answer': 'Guerra de Troia',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Civilização Micênica',
            'explanation': 'Agamemnon, rei de Micenas, liderou os gregos contra Troia.'
        },
        {
            'question': 'As "Portas dos Leões" são um marco arquitetônico de qual cidade antiga?',
            'options': ['Babilônia', 'Cartago', 'Micenas', 'Atenas'],
            'answer': 'Micenas',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Civilização Micênica',
            'explanation': 'A Porta dos Leões é o portão principal da cidadela de Micenas.'
        },

        # Civilizações do Egeu
        {
            'question': 'O Mar Egeu situa-se entre quais duas regiões principais na Antiguidade?',
            'options': ['Grécia e Ásia Menor', 'Egito e Líbia', 'Itália e Sicília', 'Espanha e Marrocos'],
            'answer': 'Grécia e Ásia Menor',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Civilizações do Egeu',
            'explanation': 'O Egeu é o mar que conecta a península grega com a atual Turquia.'
        },
        {
            'question': 'Qual metal foi crucial para o desenvolvimento das civilizações egeias antes da Idade do Ferro?',
            'options': ['Ouro', 'Bronze', 'Prata', 'Alumínio'],
            'answer': 'Bronze',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Civilizações do Egeu',
            'explanation': 'Essas culturas floresceram durante a Idade do Bronze.'
        },

        # Fenícios
        {
            'question': 'Qual foi a maior contribuição dos fenícios para o sistema de escrita moderno?',
            'options': ['O Papel', 'Alfabeto Fonético', 'Pena de Ganso', 'Tintura Púrpura'],
            'answer': 'Alfabeto Fonético',
            'type': 'multiple_choice',
            'difficulty': 'easy',
            'subject': 'História',
            'topic': 'Fenícios',
            'explanation': 'Os fenícios criaram um alfabeto baseado em sons, simplificando a escrita.'
        },
        {
            'question': 'Os fenícios ficaram famosos por explorar o mar e comercializar um corante valioso de qual cor?',
            'options': ['Verde Esmeralda', 'Púrpura', 'Azul Marinho', 'Amarelo Ouro'],
            'answer': 'Púrpura',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Fenícios',
            'explanation': 'A púrpura de Tiro era extraída de moluscos e muito valorizada pela nobreza.'
        },
        {
            'question': 'Qual destas cidades era um importante porto fenício na antiga costa do Líbano?',
            'options': ['Alexandria', 'Tiro', 'Esparta', 'Roma'],
            'answer': 'Tiro',
            'type': 'multiple_choice',
            'difficulty': 'medium',
            'subject': 'História',
            'topic': 'Fenícios',
            'explanation': 'Tiro e Sídon eram as principais cidades-estado da Fenícia.'
        }
    ]

    count = 0
    for q_data in questions:
        # Check if question already exists
        if not QuizQuestion.objects.filter(question=q_data['question']).exists():
            QuizQuestion.objects.create(**q_data)
            count += 1
            
    # Also update any existing ones that might be marked wrong or convert some
    print(f"Imported {count} multiple choice questions.")

if __name__ == "__main__":
    seed_desafio()
