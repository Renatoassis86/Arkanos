# backend/core/settings.py
import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# settings.py -> core (0) -> backend (1) -> repositorio_arkanos (2)
BASE_DIR = Path(__file__).resolve().parents[2]

# --- Modo DEV por padrão ---
# Para forçar produção, defina a variável de ambiente DJANGO_DEBUG=False
DEBUG = os.getenv("DJANGO_DEBUG", "True").strip().lower() in ("1", "true", "yes")

# Em DEV: libera localhost/127.0.0.1
# Em PROD: use DJANGO_ALLOWED_HOSTS="seu-dominio.com, www.seu-dominio.com, 10.0.0.5"
_default_hosts = "127.0.0.1,localhost,.vercel.app,.arkanos.quest"
ALLOWED_HOSTS = [h.strip() for h in os.getenv("DJANGO_ALLOWED_HOSTS", _default_hosts).split(",") if h.strip()]

# Segurança CSRF para produção (Vercel/Domínios Customizados)
CSRF_TRUSTED_ORIGINS = [
    "https://*.vercel.app",
    "https://*.arkanos.quest",
    "http://127.0.0.1",
    "http://localhost",
]

# Configuração do Banco de Dados (Supabase/PostgreSQL)
_db_from_env = dj_database_url.config(
    default=os.getenv("DATABASE_URL"),
    conn_max_age=600,
    conn_health_checks=True,
)

if _db_from_env and _db_from_env.get('ENGINE'):
    # Garantir que o nome do banco seja 'postgres' se não vier na URL
    if not _db_from_env.get('NAME'):
        _db_from_env['NAME'] = 'postgres'
    DATABASES = {"default": _db_from_env}
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# Configurações extras do Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# (opcional, mas útil quando acessar por IP da máquina na rede local)
# Ex.: set DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost,192.168.0.23
ROOT_URLCONF = "backend.core.urls"
WSGI_APPLICATION = "backend.core.wsgi.application"

STATIC_URL = "static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "backend" / "static",  # se existir
    BASE_DIR / "core",
    BASE_DIR / "modules",
]
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "arkanos",
    "jogos",            # <-- use o app da raiz
    "core.game_engine",
    "desafio_dos_sabios",
    "ark",
]



# D:\repositorio_geral\repositorio_arkanos\backend\core\settings.py

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            # Diretório global de templates do projeto
            BASE_DIR / "templates",
            # (opcional) Se você mantém templates também sob backend/
            BASE_DIR / "backend" / "templates",
            # (opcional) templates específicos de apps, se você organizou assim:
            BASE_DIR / "backend" / "jogos" / "templates",
            BASE_DIR / "backend" / "core" / "templates",
        ],
        "APP_DIRS": True,  # habilita descoberta automática de templates dentro de cada app
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                # Se você usa variáveis globais de marca/tema, pode adicionar um processor seu aqui
                # "core.context_processors.branding",
            ],
            # Caso você utilize loaders customizados, deixe APP_DIRS=False e defina "loaders" aqui.
            # Exemplo (NÃO necessário no seu caso):
            # "loaders": [
            #     ("django.template.loaders.filesystem.Loader", []),
            #     ("django.template.loaders.app_directories.Loader", []),
            # ],
        },
    }
]

# Chave de desenvolvimento (use variável de ambiente em produção)
SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "dev-secret-key-nao-usar-em-producao-arkanos"
)

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
