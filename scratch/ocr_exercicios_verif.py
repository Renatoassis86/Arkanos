import os
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

files = [
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\perguntas_exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio1.jpeg"
]

out = []
for p in files:
    if os.path.exists(p):
        img = Image.open(p)
        text = pytesseract.image_to_string(img, lang='por')
        out.append(f"=== FILE: {p} ===\n{text}\n")
    else:
        out.append(f"=== FILE NOT FOUND: {p} ===\n")

full_text = "\n".join(out)
print(full_text)

os.makedirs("scratch", exist_ok=True)
with open("scratch/exercicios_extracted_verif.txt", "w", encoding="utf-8") as f:
    f.write(full_text)
