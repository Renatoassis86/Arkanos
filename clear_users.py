import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from django.contrib.auth.models import User
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def clear_all_users():
    try:
        user_count = User.objects.count()
        if user_count == 0:
            logger.info("Nenhum usuário encontrado para apagar.")
            return

        logger.info(f"Apagando {user_count} usuários...")
        
        # Deletar todos os usuários. O CASCADE cuidará de PerfilEstudante e SessaoJogo.
        User.objects.all().delete()
        
        logger.info("Sucesso! Todos os usuários foram removidos.")
        
    except Exception as e:
        logger.error(f"Erro ao apagar usuários: {str(e)}")

if __name__ == "__main__":
    clear_all_users()
