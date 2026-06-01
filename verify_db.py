import os, django
from dotenv import load_dotenv

# Load explicitly from backend/.env
load_dotenv('backend/.env')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

count = QuizQuestion.objects.filter(has_image=True).count()
engine_type = QuizQuestion.objects.first()._state.db if QuizQuestion.objects.exists() else 'none'

print(f"Total question images Linked: {count}")
print(f"Running on DB: {django.conf.settings.DATABASES['default']['ENGINE']}")
if 'sqlite' in django.conf.settings.DATABASES['default']['ENGINE']:
    print("Warning: Currently using Sqlite, NOT Postgres Live!")
