import os
from django.apps import AppConfig

class GameEngineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.game_engine'
    verbose_name = 'Game Engine'
    path = os.path.dirname(__file__)
