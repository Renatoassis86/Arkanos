import json

with open("web-v2/src/data/quiz_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

grade3 = [q for q in questions if q.get("grade") == "3º ano"]
grade5 = [q for q in questions if q.get("grade") == "5º ano"]

print(f"Total questions in web-v2 json: {len(questions)}")
print(f"3º ano questions (Theo): {len(grade3)}")
print(f"5º ano questions (Benjamim): {len(grade5)}")

print("\n--- 3º ANO TOPICS ---")
topics3 = {}
for q in grade3:
    t = q.get("topic", "Sem tópico")
    topics3[t] = topics3.get(t, 0) + 1
for t, count in topics3.items():
    print(f"- {t}: {count} questões")

print("\n--- SAMPLE 3º ANO QUESTIONS ---")
for q in grade3[:5]:
    print(f"[{q['topic']}] Q: {q['question']}")
    print(f"  A (Correta): {q['answer']}")
