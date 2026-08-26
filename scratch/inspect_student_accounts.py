import os
import sys
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from django.contrib.auth.models import User

users = list(User.objects.values('id', 'username', 'first_name', 'last_name', 'email'))
print(f"Total Django SQLite users: {len(users)}")
for u in users:
    print(u)
