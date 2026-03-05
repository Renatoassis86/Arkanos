# arkanos/urls.py
from django.urls import path
from . import views

app_name = "arkanos"

urlpatterns = [
    # home
    path("", views.index, name="home"),
    path("index/", views.index, name="index"),

    # institucionais / navegação
    path("sobre/", views.sobre, name="sobre"),
    path("programas/", views.programas, name="programas"),
    path("jornada/", views.jornada, name="jornada"),
    path("rankings/", views.rankings, name="rankings"),
    path("familia/", views.familia, name="familia"),
    path("avatar/", views.avatar, name="avatar"),

    # jogos
    path("jogos/", views.jogos_index, name="jogos"),
    path("jogos/gramatica/", views.jogos_gramatica, name="jogos_gramatica"),
    path("jogos/logica/", views.jogos_logica, name="jogos_logica"),
    path("jogos/retorica/", views.jogos_retorica, name="jogos_retorica"),

    # conversão/CTA e auth
    path("demo/", views.demo, name="demo"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("cadastro/", views.cadastro_view, name="cadastro"),

    # alias de compatibilidade para templates antigos
    path("demonstracao/", views.demo, name="arkanos_demo"),
]
