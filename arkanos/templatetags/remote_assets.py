from django import template
from django.conf import settings
import os

register = template.Library()

@register.simple_tag
def remote_video(path):
    """
    Retorna a URL do vídeo no Supabase Storage.
    Garante que vídeos pesados nunca saturem o limite da Vercel.
    """
    # Se estivermos rodando localmente (sem a variável VERCEL), usamos o estático local
    if "VERCEL" not in os.environ:
        return f"{settings.STATIC_URL}{path}"
    
    # Em produção na Vercel, usamos SEMPRE o Supabase para vídeos
    supabase_storage_url = "https://vdfbvvkqabavclxnpaxs.supabase.co/storage/v1/object/public/assets/"
    return f"{supabase_storage_url}{path}"
