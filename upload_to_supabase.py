import os
import httpx
from dotenv import load_dotenv

# Carrega as chaves do .env na pasta backend
load_dotenv('backend/.env')

SUPABASE_URL = os.getenv("SUPABASE_URL")
SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = "assets"

if not SUPABASE_URL or not SERVICE_ROLE_KEY:
    print("Erro: SUPABASE_URL ou SERVICE_ROLE_KEY não encontrados no .env")
    exit(1)

# Mapeamento: Arquivo Local -> Caminho no Supabase Storage
mapping = {
    "backend/static/videos/hero.mp4": "videos/hero.mp4",
    "backend/static/videos/lyra-1080p.mp4": "videos/lyra-1080p.mp4",
    "backend/static/videos/kael-1080p.mp4": "videos/kael-1080p.mp4",
    "backend/static/videos/aion-1080p.mp4": "videos/aion-1080p.mp4",
    "static/img/outros/vid1.mp4": "img/outros/vid1.mp4",
    "static/img/outros/vid2.mp4": "img/outros/vid2.mp4",
    "static/img/outros/vid3.mp4": "img/outros/vid3.mp4",
    "static/img/outros/vid4.mp4": "img/outros/vid4.mp4",
    "static/img/outros/vid5.mp4": "img/outros/vid5.mp4",
}

def upload_file(local_path, remote_path):
    if not os.path.exists(local_path):
        print(f"Aviso: Arquivo {local_path} não encontrado. Pulando...")
        return

    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{remote_path}"
    headers = {
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "x-upsert": "true"
    }

    with open(local_path, "rb") as f:
        print(f"Enviando {local_path} para {remote_path}...")
        response = httpx.post(url, headers=headers, content=f, timeout=None)
        
        if response.status_code == 200:
            print(f"Sucesso: {remote_path} enviado.")
        else:
            print(f"Erro ao enviar {remote_path}: {response.status_code} - {response.text}")

for local, remote in mapping.items():
    upload_file(local, remote)

print("Processo concluído.")
