import os
import easyocr
from PIL import Image

reader = easyocr.Reader(['pt', 'en'])

folder = r"C:\repositorio\Arkanos\conteudos\3º ano"
target_files = ["44.jpeg", "55.jpeg", "66.jpeg", "WhatsApp Image 2026-08-23 at 19.36.19.jpeg"]

for fname in target_files:
    full_path = os.path.join(folder, fname)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue
    print(f"\n=================== {fname} ===================")
    img = Image.open(full_path)
    print(f"Image size: {img.size}")
    results = reader.readtext(full_path, detail=0)
    print("Text extracted:")
    print("\n".join(results))
