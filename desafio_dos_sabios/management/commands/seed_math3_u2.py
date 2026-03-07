from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import QuizQuestion, QuizGrade, QuizSubject, QuizAssessment, QuizTopic
import json

class Command(BaseCommand):
    help = 'Seed math questions for 3rd grade Unit 2'

    def handle(self, *args, **options):
        # Setup Hierarchy
        grade, _ = QuizGrade.objects.get_or_create(name='3º ano')
        subject, _ = QuizSubject.objects.get_or_create(name='Matemática')
        assessment, _ = QuizAssessment.objects.get_or_create(
            name='Matemática 3º ano Unidade 2', 
            grade=grade, 
            subject=subject
        )
        
        # We'll use a generic topic if none is specified or group by 'tema' from the JSON
        
        DATA = {
            "banco_perguntas": "Matematica_3ano_unidade2",
            "total_perguntas": 50,
            "perguntas": [
                {"id": 1, "tema": "adição", "pergunta": "Qual é o resultado de 5.641 + 4.324?", "alternativas": ["9.865", "9.965", "9.975", "10.065"], "resposta": "9.965"},
                {"id": 2, "tema": "adição", "pergunta": "Calcule: 7.642 + 1.138", "alternativas": ["8.670", "8.780", "8.880", "8.770"], "resposta": "8.780"},
                {"id": 3, "tema": "adição", "pergunta": "Calcule: 5.637 + 3.287", "alternativas": ["8.824", "8.914", "8.924", "9.014"], "resposta": "8.924"},
                {"id": 4, "tema": "adição", "pergunta": "Calcule: 6.951 + 5.069", "alternativas": ["11.920", "12.020", "12.120", "12.220"], "resposta": "12.020"},
                {"id": 5, "tema": "adição", "pergunta": "Calcule: 8.567 + 1.221", "alternativas": ["9.688", "9.788", "9.888", "9.598"], "resposta": "9.788"},
                {"id": 6, "tema": "adição", "pergunta": "Calcule: 7.234 + 2.587", "alternativas": ["9.721", "9.821", "9.811", "9.711"], "resposta": "9.821"},
                {"id": 7, "tema": "adição", "pergunta": "Calcule: 8.674 + 3.479", "alternativas": ["12.153", "12.053", "12.163", "12.143"], "resposta": "12.153"},
                {"id": 8, "tema": "subtração", "pergunta": "Calcule: 9.000 − 5.806", "alternativas": ["3.194", "3.294", "3.204", "3.094"], "resposta": "3.194"},
                {"id": 9, "tema": "subtração", "pergunta": "Calcule: 7.658 − 2.245", "alternativas": ["5.413", "5.503", "5.403", "5.313"], "resposta": "5.413"},
                {"id": 10, "tema": "subtração", "pergunta": "Calcule: 8.697 − 4.543", "alternativas": ["4.154", "4.144", "4.254", "4.064"], "resposta": "4.154"},
                {"id": 11, "tema": "subtração", "pergunta": "Calcule: 9.673 − 7.382", "alternativas": ["2.291", "2.191", "2.281", "2.301"], "resposta": "2.291"},
                {"id": 12, "tema": "subtração", "pergunta": "Calcule: 4.682 − 1.999", "alternativas": ["2.683", "2.783", "2.693", "2.583"], "resposta": "2.683"},
                {"id": 13, "tema": "problema", "pergunta": "Uma padaria vendeu 867 coxinhas e 1.538 pastéis. Quantos salgadinhos foram vendidos ao todo?", "alternativas": ["2.305", "2.405", "2.315", "2.415"], "resposta": "2.405"},
                {"id": 14, "tema": "problema", "pergunta": "De manhã uma exposição recebeu 2.648 visitantes. À tarde recebeu 3.259. Quantas pessoas a mais visitaram à tarde?", "alternativas": ["611", "701", "621", "511"], "resposta": "611"},
                {"id": 15, "tema": "problema", "pergunta": "Pedro e Paulo distribuíram 3.584 balinhas. Pedro distribuiu 1.752. Quantas Paulo distribuiu?", "alternativas": ["1.832", "1.822", "1.842", "1.812"], "resposta": "1.832"},
                {"id": 16, "tema": "problema", "pergunta": "Maria economizou 1.854 reais e seu marido 2.267 reais. Quanto o marido economizou a mais?", "alternativas": ["413", "423", "403", "433"], "resposta": "413"},
                {"id": 17, "tema": "problema", "pergunta": "A Igreja foi visitada por 2.145 pessoas de avião. De ônibus vieram 4.386 pessoas. Quantas vieram de ônibus a mais?", "alternativas": ["2.241", "2.231", "2.251", "2.221"], "resposta": "2.241"},
                {"id": 18, "tema": "problema", "pergunta": "Ricardo economizou 3.500 reais. Ele economizou 1.500 reais a menos que seu irmão. Quanto o irmão economizou?", "alternativas": ["5.000", "4.000", "4.500", "3.000"], "resposta": "5.000"},
                {"id": 19, "tema": "adição", "pergunta": "Calcule: 5.697 + 2.302", "alternativas": ["7.999", "7.989", "8.009", "7.899"], "resposta": "7.999"},
                {"id": 20, "tema": "adição", "pergunta": "Calcule: 8.065 + 1.273", "alternativas": ["9.338", "9.238", "9.438", "9.328"], "resposta": "9.338"},
                {"id": 21, "tema": "adição", "pergunta": "Calcule: 3.864 + 5.377", "alternativas": ["9.241", "9.131", "9.251", "9.341"], "resposta": "9.241"},
                {"id": 22, "tema": "adição", "pergunta": "Calcule: 4.957 + 5.084", "alternativas": ["10.041", "10.141", "10.051", "9.941"], "resposta": "10.041"},
                {"id": 23, "tema": "adição", "pergunta": "Calcule: 3.824 + 2.176", "alternativas": ["6.000", "5.900", "6.100", "6.010"], "resposta": "6.000"},
                {"id": 24, "tema": "adição", "pergunta": "Calcule: 3.927 + 2.184", "alternativas": ["6.111", "6.211", "6.101", "6.121"], "resposta": "6.111"},
                {"id": 25, "tema": "subtração", "pergunta": "Calcule: 8.032 − 5.170", "alternativas": ["2.862", "2.852", "2.872", "2.962"], "resposta": "2.862"},
                {"id": 26, "tema": "subtração", "pergunta": "Calcule: 7.000 − 5.482", "alternativas": ["1.518", "1.528", "1.418", "1.618"], "resposta": "1.518"},
                {"id": 27, "tema": "subtração", "pergunta": "Calcule: 9.500 − 3.846", "alternativas": ["5.654", "5.644", "5.754", "5.664"], "resposta": "5.654"},
                {"id": 28, "tema": "subtração", "pergunta": "Calcule: 6.813 − 3.267", "alternativas": ["3.546", "3.556", "3.446", "3.646"], "resposta": "3.546"},
                {"id": 29, "tema": "subtração", "pergunta": "Calcule: 9.132 − 4.555", "alternativas": ["4.577", "4.587", "4.667", "4.477"], "resposta": "4.577"},
                {"id": 30, "tema": "subtração", "pergunta": "Calcule: 7.942 − 2.654", "alternativas": ["5.288", "5.298", "5.388", "5.188"], "resposta": "5.288"},
                {"id": 31, "tema": "problema", "pergunta": "Em uma reunião escolar havia 2.065 pessoas. Dessas, 1.048 eram adultos. Quantas eram crianças?", "alternativas": ["1.017", "1.027", "1.107", "1.007"], "resposta": "1.017"},
                {"id": 32, "tema": "problema", "pergunta": "Na escola havia 1.340 alunos. Faltaram 48. Quantos estavam presentes?", "alternativas": ["1.292", "1.302", "1.282", "1.312"], "resposta": "1.292"},
                {"id": 33, "tema": "problema", "pergunta": "Foram distribuídos 3.480 ingressos. 1.395 eram para futebol. Quantos para outros esportes?", "alternativas": ["2.085", "2.075", "2.095", "2.065"], "resposta": "2.085"},
                {"id": 34, "tema": "problema", "pergunta": "Uma TV custa 1.249 reais e outra 1.625 reais. Qual a diferença de preço?", "alternativas": ["376", "386", "366", "396"], "resposta": "376"},
                {"id": 35, "tema": "problema", "pergunta": "João ganha 6.000 reais. Ele gastou 1.452 em um computador e 875 em uma geladeira. Quanto gastou ao todo?", "alternativas": ["2.327", "2.327", "2.237", "2.217"], "resposta": "2.327"},
                {"id": 36, "tema": "problema", "pergunta": "Quanto sobrou do salário de João após as compras?", "alternativas": ["3.673", "3.663", "3.683", "3.653"], "resposta": "3.673"},
                {"id": 37, "tema": "problema", "pergunta": "Em uma escola há 986 meninos e 1.345 meninas. Quantos meninos há a menos?", "alternativas": ["359", "349", "369", "339"], "resposta": "359"},
                {"id": 38, "tema": "problema", "pergunta": "Quantos alunos há na escola ao todo?", "alternativas": ["2.331", "2.341", "2.321", "2.351"], "resposta": "2.331"},
                {"id": 39, "tema": "problema", "pergunta": "Maria juntou 27 latinhas e Carla 32. Quantas juntaram ao todo?", "alternativas": ["59", "58", "60", "57"], "resposta": "59"},
                {"id": 40, "tema": "problema", "pergunta": "Se 25 latinhas foram reaproveitadas, quantas não foram?", "alternativas": ["34", "33", "32", "35"], "resposta": "34"},
                {"id": 41, "tema": "problema", "pergunta": "245 alunos participaram de uma competição. 102 eram meninas. Quantos meninos participaram?", "alternativas": ["143", "133", "153", "123"], "resposta": "143"},
                {"id": 42, "tema": "problema", "pergunta": "Quantos meninos havia a mais que meninas?", "alternativas": ["41", "31", "51", "21"], "resposta": "41"},
                {"id": 43, "tema": "problema", "pergunta": "Filipe tinha 258 figurinhas. Pedro tinha 54 a mais. Quantas Pedro tinha?", "alternativas": ["312", "302", "322", "292"], "resposta": "312"},
                {"id": 44, "tema": "problema", "pergunta": "Quantas figurinhas tinham os dois juntos?", "alternativas": ["570", "560", "580", "550"], "resposta": "570"},
                {"id": 45, "tema": "problema", "pergunta": "Uma granja coletou 2.358 ovos de galinha e 857 ovos de pata a menos. Quantos ovos de pata?", "alternativas": ["1.501", "1.511", "1.491", "1.521"], "resposta": "1.501"},
                {"id": 46, "tema": "problema", "pergunta": "Quantos ovos foram coletados ao todo?", "alternativas": ["3.859", "3.859", "3.869", "3.849"], "resposta": "3.859"},
                {"id": 47, "tema": "problema", "pergunta": "Na competição participaram 6.350 alunos. 2.890 eram meninas. Quantos meninos participaram?", "alternativas": ["3.460", "3.450", "3.470", "3.440"], "resposta": "3.460"},
                {"id": 48, "tema": "problema", "pergunta": "Rosa vendeu 1.075 bilhetes e Joana 860. Quantos venderam juntas?", "alternativas": ["1.935", "1.925", "1.945", "1.955"], "resposta": "1.935"},
                {"id": 49, "tema": "problema", "pergunta": "Se foram vendidos 1.376 bilhetes, quantos não foram vendidos?", "alternativas": ["559", "549", "569", "539"], "resposta": "559"},
                {"id": 50, "tema": "problema", "pergunta": "Um refrigerador custa 1.385 reais. O fogão custa 550 reais a menos. Quanto custa o fogão?", "alternativas": ["835", "845", "825", "855"], "resposta": "835"}
            ]
        }

        created = 0
        for q in DATA["perguntas"]:
            topic, _ = QuizTopic.objects.get_or_create(
                name=q["tema"].capitalize(),
                subject=subject,
                grade=grade,
                assessment=assessment
            )
            
            # Check if exists
            orig_id = f"{DATA['banco_perguntas']}_{q['id']}"
            if QuizQuestion.objects.filter(metadata_json__id_original=orig_id).exists():
                self.stdout.write(f"Questão {orig_id} já existe. Pulando...")
                continue
                
            QuizQuestion.objects.create(
                topic=topic,
                question=q["pergunta"],
                options=q["alternativas"],
                answer=q["resposta"],
                type='multiple_choice',
                difficulty='medium',
                metadata_json={
                    'id_original': orig_id,
                    'unidade': 2
                }
            )
            created += 1
            
        self.stdout.write(self.style.SUCCESS(f'Sucesso! {created} questões de Matemática importadas.'))
