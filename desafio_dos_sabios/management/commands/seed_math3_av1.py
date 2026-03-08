from django.core.management.base import BaseCommand
from desafio_dos_sabios.models import QuizQuestion, QuizGrade, QuizSubject, QuizAssessment, QuizTopic
import json
import os

class Command(BaseCommand):
    help = 'Seed math questions for 3rd grade AV1 with improved premium visual prompts'

    def handle(self, *args, **options):
        # Path to the JSON file
        json_path = r'c:\Users\renato\Downloads\banco_matematica_3ano_300_arkanos (1).json'
        
        if not os.path.exists(json_path):
            self.stdout.write(self.style.ERROR(f'Arquivo não encontrado: {json_path}'))
            return

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Arkanos Visual Pattern
        VISUAL_PATTERN = ", Estilo Arkanos: Ilustração educativa premium, cores vibrantes e harmônicas, traço limpo e lúdico, fundo claro, estético e adequado para crianças de 8-9 anos."

        # Setup Hierarchy
        grade, _ = QuizGrade.objects.get_or_create(name='3º ano')
        subject, _ = QuizSubject.objects.get_or_create(name='Matemática')
        
        # Assessment naming pattern
        assessment_name = 'MATEMÁTICA AV1 - 1º TRIMESTRE (3º ANO)'
        assessment, _ = QuizAssessment.objects.get_or_create(
            name=assessment_name, 
            grade=grade, 
            subject=subject
        )
        
        questions = data.get('questions', [])
        created = 0
        updated = 0
        skipped = 0

        TYPE_MAP = {
            'multipla_escolha': 'multiple_choice',
            'verdadeiro_falso': 'true_false',
            'comparacao': 'multiple_choice',
            'problema': 'multiple_choice',
            'sistema_decimal': 'multiple_choice',
            'abaco': 'multiple_choice'
        }

        DIF_MAP = {
            'fácil': 'easy',
            'médio': 'medium',
            'difícil': 'hard'
        }

        for q in questions:
            tema_name = q.get('tema', 'Geral').capitalize()
            topic, _ = QuizTopic.objects.get_or_create(
                name=tema_name,
                subject=subject,
                grade=grade,
                assessment=assessment
            )
            
            orig_id = q.get('id')
            raw_type = q.get('tipo', 'multipla_escolha')
            q_type = TYPE_MAP.get(raw_type, 'multiple_choice')
            
            # Extract and improve visual info
            visual = q.get('recurso_visual', {})
            has_image = visual.get('tipo') != 'nenhum'
            base_prompt = visual.get('image_prompt')
            image_prompt = (base_prompt + VISUAL_PATTERN) if (has_image and base_prompt) else base_prompt
            layout_hint = visual.get('layout_hint')
            
            cronica = q.get('explicacao', '') 
            difficulty = DIF_MAP.get(q.get('dificuldade', 'médio'), 'medium')

            metadata = {
                'id_original': orig_id,
                'tema': q.get('tema'),
                'raw_tipo': raw_type,
                'unidade': 1
            }

            existing_q = QuizQuestion.objects.filter(metadata_json__id_original=orig_id).first()
            
            if existing_q:
                # Update with improved prompts
                existing_q.has_image = has_image
                existing_q.image_mode = 'generated_asset' if has_image else 'none'
                existing_q.image_prompt = image_prompt
                existing_q.image_alt = f"Representação visual para a questão de matemática {orig_id}" if has_image else None
                existing_q.cronica_do_guardiao = cronica
                existing_q.difficulty = difficulty
                existing_q.save()
                updated += 1
            else:
                QuizQuestion.objects.create(
                    topic=topic,
                    question=q.get('enunciado'),
                    options=q.get('alternativas'),
                    answer=q.get('resposta_correta'),
                    type=q_type,
                    difficulty=difficulty,
                    explanation=q.get('explicacao', ''),
                    cronica_do_guardiao=cronica,
                    has_image=has_image,
                    image_mode='generated_asset' if has_image else 'none',
                    image_prompt=image_prompt,
                    image_alt=f"Representação visual para a questão de matemática {orig_id}" if has_image else None,
                    metadata_json=metadata
                )
                created += 1
            
        self.stdout.write(self.style.SUCCESS(f'Importação concluída: {created} novas, {updated} prompts atualizados para o padrão Arkanos.'))
