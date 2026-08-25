import os
import shutil
from PIL import Image

src_img = r"C:\repositorio\Arkanos\conteudos\5º ano\av 2º ano\WhatsApp Image 2026-08-24 at 22.19.49.jpeg"
pub_dir = r"C:\repositorio\Arkanos\web-v2\public"
img_dir = os.path.join(pub_dir, "img")

os.makedirs(img_dir, exist_ok=True)

# Save as og-image.jpeg and og-image.png for maximum social compatibility (WhatsApp, Facebook, Twitter)
img = Image.open(src_img)
img.convert("RGB").save(os.path.join(pub_dir, "og-image.jpg"), "JPEG", quality=95)
img.convert("RGB").save(os.path.join(img_dir, "og-image.jpg"), "JPEG", quality=95)
img.convert("RGB").save(os.path.join(pub_dir, "og-image.png"), "PNG")
img.convert("RGB").save(os.path.join(img_dir, "og-image.png"), "PNG")

print("Successfully copied and generated OG Preview images in public root and public/img!")
