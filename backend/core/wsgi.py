import os
import sys
import logging

# Configuração simples de logging para stderr (visível no Vercel)
logging.basicConfig(stream=sys.stderr, level=logging.INFO)
logger = logging.getLogger(__name__)

try:
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

except Exception as e:
    logger.error(f"FALHA NO STARTUP DO DJANGO: {str(e)}")
    import traceback
    logger.error(traceback.format_exc())
    raise e
