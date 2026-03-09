"""
WSGI config for core project.
"""
import os
import sys

# Append project root to sys.path for Vercel to find apps in root directory
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.core.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
app = application
