import os
import json
import asyncio
import re
import edge_tts

def norm(s: str) -> str:
    return re.sub(r'[^a-z0-9]', '', s.lower().strip())

PT_SPELL_MAP = {
    'a': 'a', 'á': 'á', 'à': 'à', 'ã': 'ã', 'â': 'â',
    'b': 'bê', 'c': 'cê', 'ç': 'cê-cedilha', 'd': 'dê',
    'e': 'e', 'é': 'é', 'ê': 'ê',
    'f': 'efe', 'g': 'gê', 'h': 'agá',
    'i': 'i', 'í': 'í',
    'j': 'jota', 'k': 'cá', 'l': 'ele', 'm': 'eme', 'n': 'ene',
    'o': 'o', 'ó': 'ó', 'ô': 'ô', 'õ': 'õ',
    'p': 'pê', 'q': 'quê', 'r': 'erre', 's': 'esse', 't': 'tê',
    'u': 'u', 'ú': 'ú', 'v': 'vê', 'w': 'dábliu', 'x': 'xis', 'y': 'ípsilon', 'z': 'zê'
}

def format_pt_spelling(word: str) -> str:
    letters = [PT_SPELL_MAP.get(ch, ch) for ch in word.lower() if ch.strip()]
    spelled_str = ". ".join(letters) + "."
    return f"A grafia correta da palavra é {word}. {spelled_str} {word}."

def format_en_spelling(word: str) -> str:
    letters = [ch for ch in word.lower() if ch.strip()]
    spelled_str = ". ".join(letters) + "."
    return f"The correct spelling of {word} is. {spelled_str} {word}."

async def generate_audio_file(text: str, voice: str, filepath: str, rate: str = "-5%"):
    if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
        return  # Skip already generated
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        communicate = edge_tts.Communicate(text, voice, rate=rate)
        await communicate.save(filepath)
    except Exception as e:
        print(f"Error generating {filepath}: {e}")

async def main():
    print("=== STARTING STUDIO NEURAL AUDIO GENERATION FOR RADIX & SPELLING BEE ===")

    # Load PT-BR words (Radix)
    pt_words = []
    with open("web-v2/data/radix_3ano.json", "r", encoding="utf-8") as f:
        pt_words.extend(json.load(f))
    with open("web-v2/data/radix_5ano.json", "r", encoding="utf-8") as f:
        pt_words.extend(json.load(f))

    # Load EN-US words (Spelling Bee)
    en_words = []
    with open("web-v2/data/spelling_by_serie.json", "r", encoding="utf-8") as f:
        data_en = json.load(f)
        for cat, items in data_en.items():
            en_words.extend(items)

    print(f"Total PT-BR words to process: {len(pt_words)}")
    print(f"Total EN-US words to process: {len(en_words)}")

    base_dir = "web-v2/public/audio/spelling"

    # 1. Process PT-BR
    sem = asyncio.Semaphore(10)

    async def task_pt(w):
        async with sem:
            palavra = w["palavra"]
            key = norm(palavra)
            if not key:
                return
            
            # Word audio
            await generate_audio_file(palavra, "pt-BR-FranciscaNeural", f"{base_dir}/pt/words/{key}.mp3")
            
            # Meaning
            if w.get("significado"):
                await generate_audio_file(f"Significado de {palavra}: {w['significado']}", "pt-BR-FranciscaNeural", f"{base_dir}/pt/meanings/{key}.mp3")
            
            # Sentence
            if w.get("exemplo"):
                await generate_audio_file(f"Exemplo: {w['exemplo']}", "pt-BR-FranciscaNeural", f"{base_dir}/pt/sentences/{key}.mp3")
            
            # Spell out
            spell_text = format_pt_spelling(palavra)
            await generate_audio_file(spell_text, "pt-BR-FranciscaNeural", f"{base_dir}/pt/spells/{key}.mp3", rate="-8%")

    print("Generating PT-BR Neural Audio...")
    await asyncio.gather(*(task_pt(w) for w in pt_words))

    # 2. Process EN-US
    async def task_en(w):
        async with sem:
            palavra = w["palavra"]
            key = norm(palavra)
            if not key:
                return
            
            # Word audio
            await generate_audio_file(palavra, "en-US-JennyNeural", f"{base_dir}/en/words/{key}.mp3")
            
            # Meaning
            if w.get("significado"):
                await generate_audio_file(f"Definition of {palavra}: {w['significado']}", "en-US-JennyNeural", f"{base_dir}/en/meanings/{key}.mp3")
            
            # Sentence
            if w.get("exemplo"):
                await generate_audio_file(f"Example: {w['exemplo']}", "en-US-JennyNeural", f"{base_dir}/en/sentences/{key}.mp3")
            
            # Spell out
            spell_text = format_en_spelling(palavra)
            await generate_audio_file(spell_text, "en-US-JennyNeural", f"{base_dir}/en/spells/{key}.mp3", rate="-8%")

    print("Generating EN-US Neural Audio...")
    await asyncio.gather(*(task_en(w) for w in en_words))

    print("=== COMPLETED STUDIO NEURAL AUDIO GENERATION FOR ALL WORDS! ===")

if __name__ == "__main__":
    asyncio.run(main())
