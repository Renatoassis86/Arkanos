import os
from PIL import Image

files = [
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\perguntas_exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio.jpeg",
    r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\Exercicio1.jpeg"
]

out_dir = r"C:\Users\Usuario\.gemini\antigravity-ide\brain\92a7623c-6e40-479e-acff-2dd8279582f3\scratch"
os.makedirs(out_dir, exist_ok=True)

for i, p in enumerate(files):
    img = Image.open(p)
    dst = os.path.join(out_dir, f"sheet_img_{i+1}.png")
    img.save(dst)
    print(f"Saved {dst}")
