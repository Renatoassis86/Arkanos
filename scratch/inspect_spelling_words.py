import os
import sys
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import SpellingWord

words_pt = list(SpellingWord.objects.filter(idioma="pt-BR").values())
words_en = list(SpellingWord.objects.filter(idioma="en-US").values())

print(f"Total Portuguese words in DB: {len(words_pt)}")
print(f"Total English words in DB: {len(words_en)}")

if words_pt:
    print("Sample PT word:", words_pt[0])
if words_en:
    print("Sample EN word:", words_en[0])
