import os
import easyocr
from PIL import Image

reader = easyocr.Reader(['pt', 'en'])

files = [
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\perguntas_exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio1.jpeg"
]

out = []
for p in files:
    if os.path.exists(p):
        print(f"Reading {p}...")
        results = reader.readtext(p, detail=1)
        out.append(f"=== FILE: {p} ===")
        for bbox, text, prob in results:
            out.append(f"{text} (conf: {prob:.2f})")
        out.append("\n")

full_text = "\n".join(out)
print(full_text)

os.makedirs("scratch", exist_ok=True)
with open("scratch/exact_ocr_results.txt", "w", encoding="utf-8") as f:
    f.write(full_text)
