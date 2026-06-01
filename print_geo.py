import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()
from desafio_dos_sabios.models import QuizQuestion

# Force immediate flushing
for q in QuizQuestion.objects.filter(topic__subject__name='Geografia')[:20]:
    print(f"ID: {q.id} | Type: {q.type} | Q: {q.question[:60]}")
