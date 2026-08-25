import os
import easyocr
from PIL import Image

reader = easyocr.Reader(['pt', 'en'])

folder = r"C:\repositorio\Arkanos\conteudos\3º ano"
files = sorted([os.path.join(folder, f) for f in os.listdir(folder) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])

out = []
for p in files:
    fname = os.path.basename(p)
    print(f"Reading {fname}...")
    try:
        results = reader.readtext(p, detail=1)
        out.append(f"=== FILE: {fname} ===")
        for bbox, text, prob in results:
            out.append(f"{text} (conf: {prob:.2f})")
        out.append("\n")
    except Exception as e:
        out.append(f"=== FILE: {fname} ERROR: {e} ===\n")

full_text = "\n".join(out)
print(full_text)

os.makedirs("scratch", exist_ok=True)
with open("scratch/theo_3ano_ocr.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

# Copy images to artifacts scratch for view_file
art_dir = r"C:\Users\Usuario\.gemini\antigravity-ide\brain\92a7623c-6e40-479e-acff-2dd8279582f3\scratch\theo_images"
os.makedirs(art_dir, exist_ok=True)
for p in files:
    img = Image.open(p)
    dst = os.path.join(art_dir, os.path.basename(p))
    img.save(dst)
    print(f"Copied {dst}")
