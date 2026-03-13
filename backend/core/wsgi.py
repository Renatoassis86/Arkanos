import os
import sys

# Append project root to sys.path for Vercel to find apps in root directory
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Adiciona também a pasta 'backend' especificamente para garantir que core seja encontrado
backend_path = os.path.join(project_root, 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.core.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
app = application
