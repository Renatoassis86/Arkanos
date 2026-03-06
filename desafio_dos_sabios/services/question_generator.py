from ..models import QuizQuestionGenerated, QuestionGenerationCache, QuizTopic, QuizSubject
from django.utils import timezone
from .openai_service import OpenAIService

class QuestionGenerator:
    """
    Service to generate pedagogical questions using AI.
    """

    def __init__(self):
        self.ai_service = OpenAIService()

    def generate_from_context(self, text_context, image_b64_list=None, quantity=5):
        """
        Gera perguntas baseadas em material bruto (fotos/texto).
        """
        raw_questions = self.ai_service.generate_questions_from_context(text_context, image_b64_list, quantity)
        
        generated_objects = []
        for q_data in raw_questions:
            # 1. Obter ou Criar Disciplina
            subject_name = q_data.get('subject', 'Geral')
            subject, _ = QuizSubject.objects.get_or_create(name=subject_name)
            
            # 2. Obter ou Criar Tópico
            topic_name = q_data.get('topic', 'Diversos')
            topic, _ = QuizTopic.objects.get_or_create(subject=subject, name=topic_name)
            
            # 3. Criar a Pergunta Gerada
            q = QuizQuestionGenerated.objects.create(
                topic=topic,
                difficulty=q_data.get('difficulty', 'medium'),
                type=q_data.get('type', 'multiple_choice'),
                question=q_data.get('question'),
                options=q_data.get('options'),
                answer=str(q_data.get('answer')),
                explanation=q_data.get('explanation', ''),
                ai_model='gpt-4o'
            )
            generated_objects.append(q)
            
        return generated_objects

    def generate_questions(self, topic_id, difficulty, quantity=5):
        quantity = min(quantity, 20)
        try:
            topic = QuizTopic.objects.get(id=topic_id)
        except QuizTopic.DoesNotExist:
            return []

        # We can use the same AI service but with a "topic only" context
        text_context = f"Crie {quantity} perguntas sobre o tópico '{topic.name}' da disciplina '{topic.subject.name}'."
        return self.generate_from_context(text_context, quantity=quantity)
