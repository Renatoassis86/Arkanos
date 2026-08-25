import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion, QuizTopic, QuizAssessment, QuizGrade, QuizSubject

def dump_all_questions():
    print("Dumping all questions from SQLite DB to data/quiz_questions.json...")
    
    questions = QuizQuestion.objects.all().select_related('topic', 'topic__subject', 'topic__grade', 'topic__assessment')
    print(f"Found {len(questions)} total questions in SQLite DB.")

    dump_list = []

    for q in questions:
        topic = q.topic
        subject = topic.subject.name if topic and topic.subject else "História"
        grade = topic.grade.name if topic and topic.grade else "5º ano"
        assessment = topic.assessment.name if topic and topic.assessment else "AV2"
        trimestre = getattr(topic.assessment, 'trimestre', 2) if (topic and topic.assessment) else 2

        item = {
            "id": q.id,
            "subject": subject,
            "grade": grade,
            "assessment": assessment,
            "trimestre": trimestre or 2,
            "topic": topic.name if topic else "Geral",
            "type": q.type,
            "difficulty": q.difficulty,
            "question": q.question,
            "options": q.options,
            "answer": q.answer,
            "explanation": q.explanation,
            "cronica_do_guardiao": q.cronica_do_guardiao,
            "has_image": q.has_image,
            "image_mode": q.image_mode,
            "image_url": q.image_url,
            "image_prompt": q.image_prompt,
            "image_alt": q.image_alt,
            "metadata_json": q.metadata_json or {}
        }
        dump_list.append(item)

    out_path = os.path.join("data", "quiz_questions.json")
    os.makedirs("data", exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(dump_list, f, ensure_ascii=False, indent=2)

    print(f"SUCCESS! Exported {len(dump_list)} questions to {out_path}.")

if __name__ == "__main__":
    dump_all_questions()
