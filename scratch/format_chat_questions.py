import json

with open("web-v2/src/data/quiz_questions.json", "r", encoding="utf-8") as f:
    data = json.load(f)

grade3 = [q for q in data if q.get("grade") == "3º ano"]

print(f"Total questions for 3º ano: {len(grade3)}\n")

out = []
for idx, q in enumerate(grade3, 1):
    out.append(f"### {idx}. [{q.get('topic')}]")
    out.append(f"**Pergunta:** {q.get('question')}")
    if q.get("image_url"):
        out.append(f"🖼️ *Imagem da questão:* `{q.get('image_url')}`")
    out.append(f"✅ **Resposta Correta:** {q.get('answer')}")
    
    options = q.get("options", [])
    wrong = [o for o in options if o != q.get("answer")]
    out.append("**Alternativas Incorretas (Distratores de Tamanho Equalizado):**")
    for w_idx, w in enumerate(wrong, 1):
        out.append(f"  - ({chr(65+w_idx)}) {w}")
    
    if q.get("explanation"):
        out.append(f"💡 *Explicação Pedagógica:* {q.get('explanation')}")
    out.append("")

formatted_text = "\n".join(out)

with open("scratch/theo_questions_formatted.md", "w", encoding="utf-8") as f:
    f.write(formatted_text)

print("Formatted questions saved to scratch/theo_questions_formatted.md")
