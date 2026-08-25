import os
from PIL import Image
import pytesseract

# Set tesseract path if on windows
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

folder = r"C:\repositorio\Arkanos\conteudos\3º ano"
files = sorted([f for f in os.listdir(folder) if not f.startswith('.')])

print(f"Total files found in {folder}: {len(files)}")
out = []

for f in files:
    full_path = os.path.join(folder, f)
    print(f"\n--- FILE: {f} (size: {os.path.getsize(full_path)} bytes) ---")
    out.append(f"=== FILE: {f} ===")
    
    if f.lower().endswith(('.jpeg', '.jpg', '.png', '.webp')):
        try:
            img = Image.open(full_path)
            txt = pytesseract.image_to_string(img, lang='por')
            print(f"Extracted Tesseract OCR text ({len(txt)} chars):")
            print(txt[:500])
            out.append(txt)
        except Exception as e:
            print(f"Tesseract failed: {e}, trying default OCR")
            try:
                txt = pytesseract.image_to_string(img)
                out.append(txt)
            except Exception as e2:
                out.append(f"OCR Error: {e2}")
    else:
        try:
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as tf:
                txt = tf.read()
                out.append(txt)
        except Exception as e:
            out.append(f"Read Error: {e}")

full_text = "\n\n".join(out)
with open("scratch/all_3ano_content_extracted.txt", "w", encoding="utf-8") as out_file:
    out_file.write(full_text)

print("\nSaved full extraction to scratch/all_3ano_content_extracted.txt")
