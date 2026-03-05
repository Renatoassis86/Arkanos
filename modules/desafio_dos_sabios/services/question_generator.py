import json
from ..models import QuizQuestionGenerated, QuestionGenerationCache
from django.utils import timezone

class QuestionGenerator:
    """
    Service to generate pedagogical questions using AI.
    In a real scenario, this would call an LLM API.
    """

    def __init__(self, model_name='gemini-2.0-flash'):
        self.model_name = model_name

    def generate_questions(self, topic, subject, difficulty, quantity=5):
        # Limits
        quantity = min(quantity, 20)
        
        cache, _ = QuestionGenerationCache.objects.get_or_create(
            topic=topic, subject=subject, difficulty=difficulty
        )
        
        # Simple reset logic: if last generation was yesterday, reset count
        if cache.last_generated_at.date() < timezone.now().date():
            cache.generated_count = 0
            cache.save()

        if cache.generated_count >= 100:
            print(f"Daily limit reached for {topic} - {subject}")
            return []

        # AI Prompt Simulation
        mocked_response = self._mock_ai_generate(topic, subject, difficulty, quantity)
        
        generated_questions = []
        for q_data in mocked_response:
            q = QuizQuestionGenerated.objects.create(
                subject=subject,
                topic=topic,
                difficulty=difficulty,
                type=q_data['type'],
                question=q_data['question'],
                options=q_data.get('options'),
                answer=str(q_data['answer']),
                explanation=q_data.get('explanation', ''),
                ai_model=self.model_name
            )
            generated_questions.append(q)
            
        # Update Cache count
        cache.generated_count += len(generated_questions)
        cache.save()
        
        return generated_questions

    def _mock_ai_generate(self, topic, subject, difficulty, quantity):
        # This is a placeholder for the actual AI call
        return [
            {
                "type": "multiple_choice",
                "question": f"Qual a principal característica de {topic}?",
                "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
                "answer": "Opção A",
                "explanation": f"Explicação detalhada sobre {topic}."
            }
        ] * quantity
