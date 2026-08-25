import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import (
    QuizSubject, QuizGrade, QuizAssessment, QuizTopic, QuizQuestion
)

def import_90_questions():
    print("=== IMPORTING ALL 90 QUESTIONS FROM USER JSON FOR THEO (3º ANO - AV2 HISTÓRIA) ===")

    json_path = r"conteudos/3º ano/Banco_Questoes_Av2_3ano_Roma.json"
    with open(json_path, "r", encoding="utf-8") as f:
        user_questions = json.load(f)

    print(f"Loaded {len(user_questions)} questions from {json_path}")

    # Ensure Subject, Grade, Assessment
    subj = QuizSubject.objects.filter(name="História").first() or QuizSubject.objects.create(name="História")
    grade = QuizGrade.objects.filter(name="3º ano").first() or QuizGrade.objects.create(name="3º ano")
    assess = QuizAssessment.objects.filter(name="AV2").first() or QuizAssessment.objects.create(name="AV2", grade=grade, subject=subj)

    # Clean existing 3º ano questions first
    existing_topics = QuizTopic.objects.filter(grade=grade)
    QuizQuestion.objects.filter(topic__in=existing_topics).delete()
    existing_topics.delete()

    created_count = 0
    topic_cache = {}

    difficulty_map = {
        "facil": "easy",
        "medio": "medium",
        "dificil": "hard"
    }

    for q_item in user_questions:
        bloco = q_item.get("bloco") or "Roma Antiga"
        
        if bloco not in topic_cache:
            t_obj = QuizTopic.objects.filter(
                subject=subj, grade=grade, assessment=assess, name=bloco
            ).first()
            if not t_obj:
                t_obj = QuizTopic.objects.create(
                    subject=subj, grade=grade, assessment=assess, name=bloco
                )
            topic_cache[bloco] = t_obj
        else:
            t_obj = topic_cache[bloco]

        enunciado = q_item["enunciado"]
        if q_item.get("texto_base"):
            enunciado = f"{q_item['texto_base']}\n\n{enunciado}"

        alts = q_item["alternativas"]
        correta_key = q_item["correta"]
        ans_text = alts[correta_key]

        # Options list: [ans_text, alt1, alt2, alt3]
        opts = [ans_text] + [val for k, val in alts.items() if k != correta_key]

        diff = difficulty_map.get(q_item.get("nivel"), "medium")

        QuizQuestion.objects.create(
            topic=t_obj,
            question=enunciado,
            options=opts,
            answer=ans_text,
            difficulty=diff,
            explanation=q_item.get("feedback") or ""
        )
        created_count += 1

    print(f"Successfully created {created_count} questions in SQLite for 3º ano!")

    # Export to JSON files
    import clean_and_export_quiz
    clean_and_export_quiz.clean_and_export()

if __name__ == "__main__":
    import_90_questions()
