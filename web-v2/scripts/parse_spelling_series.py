import re
import json

def parse_js_words(filepath, serie):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match { word: "...", meaning: "...", frase: "..." }
    pattern = re.compile(r'\{\s*word:\s*["\']([^"\']+)["\'],\s*meaning:\s*["\']([^"\']+)["\'],\s*frase:\s*["\']([^"\']+)["\']\s*\}')
    matches = pattern.findall(content)
    words = []
    for i, (w, m, fr) in enumerate(matches, 1):
        words.append({
            'id': i,
            'palavra': w.strip(),
            'significado': m.strip(),
            'exemplo': fr.strip(),
            'ipa': f"/{w.strip().lower()}/",
            'serie': serie,
            'dificuldade': 'facil' if len(w) <= 5 else 'medio' if len(w) <= 8 else 'dificil',
            'idioma': 'en-US'
        })
    return words

w2 = parse_js_words('backend/static/spellingbee/palavras/palavras_2ano.js', '2ano')
w4 = parse_js_words('backend/static/spellingbee/palavras/palavras_4ano.js', '4ano')

print(f"Spelling Bee 2º Ano: {len(w2)} palavras")
print(f"Spelling Bee 4º Ano: {len(w4)} palavras")

with open('web-v2/data/spelling_2ano.json', 'w', encoding='utf-8') as f:
    json.dump(w2, f, ensure_ascii=False, indent=2)

with open('web-v2/data/spelling_4ano.json', 'w', encoding='utf-8') as f:
    json.dump(w4, f, ensure_ascii=False, indent=2)

spelling_all = {
    '2ano': w2,
    '3ano': w2[len(w2)//2:] + w4[:len(w4)//2],
    '4ano': w4,
    '5ano': [w for w in w4 if w['dificuldade'] in ('medio', 'dificil')]
}

with open('web-v2/data/spelling_by_serie.json', 'w', encoding='utf-8') as f:
    json.dump(spelling_all, f, ensure_ascii=False, indent=2)

print("Salvo com sucesso em web-v2/data/spelling_by_serie.json!")
