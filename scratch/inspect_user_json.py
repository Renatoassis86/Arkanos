import json

with open(r"conteudos/3º ano/Banco_Questoes_Av2_3ano_Roma.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Total questions in user JSON file: {len(questions)}")
print("Sample question structure:")
print(json.dumps(questions[0], indent=2, ensure_ascii=False))
