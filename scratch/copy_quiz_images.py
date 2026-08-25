import os
import shutil

src_dir = r"C:\Users\Usuario\.gemini\antigravity-ide\brain\92a7623c-6e40-479e-acff-2dd8279582f3"
dst_dir = r"c:\repositorio\Arkanos\web-v2\public\img\quiz"

os.makedirs(dst_dir, exist_ok=True)

mapping = {
    "aqueduto_romano_didatico": "aqueduto_romano.jpg",
    "julio_cesar_rubicao": "julio_cesar_rubicao.jpg",
    "roma_potencia_mediterraneo": "roma_potencia_mediterraneo.jpg"
}

for prefix, dst_name in mapping.items():
    files = [f for f in os.listdir(src_dir) if f.startswith(prefix) and f.endswith(".jpg")]
    if files:
        src_path = os.path.join(src_dir, files[0])
        dst_path = os.path.join(dst_dir, dst_name)
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_path} -> {dst_path}")

print("Images copied to public/img/quiz/")
