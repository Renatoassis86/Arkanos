from ..models import QuizQuestion, QuizQuestionGenerated, QuizQuestionVerified

class QuestionValidator:
    """
    Validator to check the quality and consistency of AI generated questions.
    """

    @staticmethod
    def validate_and_approve(generated_question_id, user=None):
        try:
            q = QuizQuestionGenerated.objects.get(id=generated_question_id)
        except QuizQuestionGenerated.DoesNotExist:
            return False, "Pergunta não encontrada."

        # 1. Check for duplicates
        if QuizQuestion.objects.filter(question__iexact=q.question).exists() or \
           QuizQuestionVerified.objects.filter(question__iexact=q.question).exists():
            return False, "Pergunta duplicada."

        # 2. Check for empty answer
        if not q.answer:
            return False, "Resposta vazia."

        # 3. Consistency checks
        if q.type == 'multiple_choice' and (not q.options or q.answer not in q.options):
            return False, "A resposta não está entre as opções ou opções estão vazias."

        if q.type == 'true_false' and str(q.answer).lower() not in ['true', 'false', 'verdadeiro', 'falso']:
            # Normalizing true/false might be needed
            pass

        # 4. Quality check (could be more complex)
        if len(q.question) < 10:
            return False, "Pergunta muito curta."

        # Approve: Move to Verified table
        verified = QuizQuestionVerified.objects.create(
            question=q.question,
            options=q.options,
            answer=q.answer,
            type=q.type,
            difficulty=q.difficulty,
            topic=q.topic,
            journey=q.journey,
            explanation=q.explanation,
            tags=q.tags,
            verified_by=user
        )
        
        return True, verified
