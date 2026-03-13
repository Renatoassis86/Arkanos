import os
import shutil
from pathlib import Path

brain_dir = Path(r'C:\Users\renato\.gemini\antigravity\brain\173e1292-9a06-4b0d-8eed-3f1013f02c4f')
dest_dir = Path(r'd:\repositorio_geral\repositorio_arkanos\backend\static\img\quiz')

dest_dir.mkdir(parents=True, exist_ok=True)

patterns = [
    'geo_japao_asia', 'geo_asia_mundi', 'geo_africa_mundi', 'geo_america_sul_mundi',
    'geo_bussola', 'geo_globo_equador', 'geo_globo_meridiano', 'geo_sol_nascendo',
    'geo_sol_poente', 'geo_antartica_mundi'
]

for pattern in patterns:
    files = list(brain_dir.glob(f'{pattern}_*.png'))
    if files:
        # Sort by mtime to get the latest one if multiples exist
        files.sort(key=lambda x: x.stat().st_mtime, reverse=True)
        latest_file = files[0]
        dest_file = dest_dir / f'{pattern}.png'
        shutil.copy2(latest_file, dest_file)
        print(f'Copied {latest_file.name} to {dest_file}')
    else:
        print(f'Pattern {pattern} not found in brain.')
