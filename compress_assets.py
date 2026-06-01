from PIL import Image
import os

paths = [
    'backend/static/img/quiz/geo_generic_space_earth.png',
    'backend/static/img/quiz/geo_generic_compass_map.png',
    'backend/static/img/quiz/mat_generic_numbers_grid.png'
]

print("Compressing fallback assets to satisfy Vercel constraints...")

for p in paths:
    if os.path.exists(p):
        size_before = os.path.getsize(p) / (1024*1024)
        img = Image.open(p)
        # Convert to RGB if loaded as RGBA
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        # Resize to standard max HD width (1280px) index flawless
        img.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        # Save compressed JPEG 
        p_jpg = p.replace('.png', '.jpg')
        img.save(p, 'JPEG', quality=70) # Overwrite PNG with smaller stream
        size_after = os.path.getsize(p) / (1024*1024)
    print(f"Compressed {p}: {size_before:.2f}MB -> {size_after:.2f}MB")

print("Compression done.")
