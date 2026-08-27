import json
import os
import re

# Caminhos principais
ROOT_DIR = r"C:\repositorio\Arkanos"
DATA_JSON_PATH = os.path.join(ROOT_DIR, "web-v2", "src", "data", "quiz_questions.json")
GEO_JSON_PATH = os.path.join(ROOT_DIR, "conteudos", "5º ano", "av 2º ano", "GEografia", "banco_questoes_geografia_av2.json")
PUBLIC_GEO_DIR = os.path.join(ROOT_DIR, "web-v2", "public", "geografia")

os.makedirs(PUBLIC_GEO_DIR, exist_ok=True)

def sync_images():
    if not os.path.exists(GEO_JSON_PATH) or not os.path.exists(DATA_JSON_PATH):
        print("Arquivos de dados não encontrados!")
        return

    with open(GEO_JSON_PATH, "r", encoding="utf-8") as f:
        geo_raw = json.load(f)

    with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
        quiz_data = json.load(f)

    imagens_meta = geo_raw.get("imagens", [])
    print(f"Total de definições de imagens registradas no meta: {len(imagens_meta)}")

    # Mapeamento de id da imagem -> lista de IDs de questões
    img_to_questions = {}
    q_to_img_id = {}
    for img_info in imagens_meta:
        img_id = img_info.get("id")
        q_list = img_info.get("questoes_vinculadas", [])
        if img_id and q_list:
            img_to_questions[img_id] = q_list
            for qid in q_list:
                q_to_img_id[qid] = img_id

    # 1. Escanear tanto public/geografia quanto a pasta de conteudos original
    SOURCE_DIR = os.path.join(ROOT_DIR, "conteudos", "5º ano", "av 2º ano", "GEografia")
    
    all_candidate_dirs = [PUBLIC_GEO_DIR]
    if os.path.exists(SOURCE_DIR):
        all_candidate_dirs.append(SOURCE_DIR)

    matched_image_files = {}

    for cdir in all_candidate_dirs:
        files = os.listdir(cdir)
        for fname in files:
            if not fname.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg")):
                continue
            
            src_path = os.path.join(cdir, fname)

            # Tentar extrair padrão como IMG-01, IMG01, img_01, img-1, etc.
            match = re.search(r"IMG[-_]?(\d+)", fname, re.IGNORECASE)
            if match:
                num = int(match.group(1))
                img_key = f"IMG-{num:02d}"
                dest_fname = f"{img_key}{os.path.splitext(fname)[1].lower()}"
                dest_path = os.path.join(PUBLIC_GEO_DIR, dest_fname)
                
                # Copiar para public/geografia se veio da pasta de conteudos
                if src_path != dest_path:
                    import shutil
                    shutil.copy2(src_path, dest_path)

                matched_image_files[img_key] = dest_fname
                continue

            # Se for apenas 1.jpeg, 2.jpg...
            name_no_ext = os.path.splitext(fname)[0]
            if name_no_ext.isdigit():
                num = int(name_no_ext)
                img_key = f"IMG-{num:02d}"
                dest_fname = f"{img_key}{os.path.splitext(fname)[1].lower()}"
                dest_path = os.path.join(PUBLIC_GEO_DIR, dest_fname)
                if src_path != dest_path:
                    import shutil
                    shutil.copy2(src_path, dest_path)
                matched_image_files[img_key] = dest_fname

    print(f"Imagens identificadas e pareadas: {len(matched_image_files)} de {len(imagens_meta)}")

    # Atualizar quiz_questions.json
    linked_count = 0
    for item in quiz_data:
        meta = item.get("metadata_json") or {}
        qid = meta.get("id_original") or item.get("original_id") or item.get("id_quest")
        
        # Se for questão de geografia e tiver vinculo com alguma imagem
        if item.get("subject") == "Geografia" and qid:
            img_id = q_to_img_id.get(str(qid).strip())
            if img_id and img_id in matched_image_files:
                fname = matched_image_files[img_id]
                item["image_url"] = f"/geografia/{fname}"
                item["image"] = f"/geografia/{fname}"
                item["image_alt"] = f"Ilustração/Mapa {img_id} da prova de Geografia"
                item["has_image"] = True
                linked_count += 1

    with open(DATA_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(quiz_data, f, ensure_ascii=False, indent=2)

    print(f"Vinculadas {linked_count} questões com suas respectivas imagens em public/geografia/!")

if __name__ == "__main__":
    sync_images()
