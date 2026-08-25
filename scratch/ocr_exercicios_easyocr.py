import os
import easyocr

reader = easyocr.Reader(['pt', 'en'])

files = [
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\perguntas_exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio1.jpeg"
]

out = []
for p in files:
    if os.path.exists(p):
        print(f"Reading {p} with EasyOCR...")
        results = reader.readtext(p, detail=0)
        text = "\n".join(results)
        out.append(f"=== FILE: {p} ===\n{text}\n")
    else:
        out.append(f"=== FILE NOT FOUND: {p} ===\n")

full_text = "\n".join(out)
print(full_text)

os.makedirs("scratch", exist_ok=True)
with open("scratch/exercicios_easyocr.txt", "w", encoding="utf-8") as f:
    f.write(full_text)
