import os
import sys
import json
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def clean_and_export():
    print("=== EXPORTING EXCLUSIVELY CURRICULUM QUESTIONS FOR BENJAMIM & THEO ===")
    
    questions = QuizQuestion.objects.all().select_related('topic', 'topic__subject', 'topic__grade', 'topic__assessment')
    print(f"Total SQLite questions: {len(questions)}")

    valid_list = []

    for q in questions:
        topic = q.topic
        subject = topic.subject.name if topic and topic.subject else "História"
        grade = topic.grade.name if topic and topic.grade else "5º ano"
        assessment = topic.assessment.name if topic and topic.assessment else "AV2"
        trimestre = getattr(topic.assessment, 'trimestre', 2) or 2

        topic_name = topic.name if topic else "Geral"

        # Exclude legacy/unrelated Greek/Peloponnesian war questions
        if "Peloponeso" in topic_name or "Minoica" in topic_name or "Creta" in topic_name:
            print(f"  [EXCLUDED LEGACY] {q.id}: {topic_name}")
            continue

        item = {
            "id": q.id,
            "subject": subject,
            "grade": grade,
            "assessment": assessment,
            "trimestre": trimestre,
            "topic": topic_name,
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
        valid_list.append(item)

    print(f"\nTotal curriculum questions retained: {len(valid_list)}")

    # Write to both JSON locations
    paths = [
        os.path.join("data", "quiz_questions.json"),
        os.path.join("web-v2", "src", "data", "quiz_questions.json")
    ]

    for p in paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(valid_list, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(valid_list)} questions to {p}")

if __name__ == "__main__":
    clean_and_export()
