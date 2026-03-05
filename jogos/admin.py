from django.contrib import admin
from .models import Jogo, PalavraSpellingBee

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo', 'dificuldade', 'ativo')
    list_filter = ('tipo', 'dificuldade', 'ativo')
    prepopulated_fields = {"slug": ("nome",)}

@admin.register(PalavraSpellingBee)
class PalavraSpellingBeeAdmin(admin.ModelAdmin):
    list_display = ('palavra', 'serie')
    list_filter = ('serie',)
