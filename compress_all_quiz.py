from PIL import Image
import os

folder = 'backend/static/img/quiz_linked'
print(f"Compressing assets in {folder} to satisfy Vercel constraints...")

if os.path.exists(folder):
    for f in os.listdir(folder):
        if f.endswith('.png') or f.endswith('.jpg'):
            p = os.path.join(folder, f)
            try:
                size_before = os.path.getsize(p) / (1024*1024)
                img = Image.open(p)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                # Resize down to standard width
                img.thumbnail((720, 720), Image.Resampling.LANCZOS)
                # Save compressed JPEG 
                img.save(p, 'JPEG', quality=60, optimize=True)
                size_after = os.path.getsize(p) / (1024*1024)
                print(f"Compressed {f}: {size_before:.2f}MB -> {size_after:.2f}MB")
            except Exception as e:
                print(f"Error compressing {f}: {e}")

print("Compression done.")
