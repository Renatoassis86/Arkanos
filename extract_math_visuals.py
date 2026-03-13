import json
import os

json_path = r'c:\Users\renato\Downloads\banco_matematica_3ano_300_arkanos (1).json'
output_path = r'd:\repositorio_geral\repositorio_arkanos\math_visuals.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

visuals = []
for q in data.get('questions', []):
    rv = q.get('recurso_visual', {})
    if rv.get('tipo') != 'nenhum':
        visuals.append({
            'id': q.get('id'),
            'prompt': rv.get('image_prompt')
        })

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(visuals, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(visuals)} visual prompts to {output_path}")
