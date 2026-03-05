from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve as media_serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(("arkanos.urls", "arkanos"), namespace="arkanos")),
    path("jogos/", include(("jogos.urls", "jogos"), namespace="jogos")),  # OK
    path("api/game-engine/", include("core.game_engine.urls")),
    path("desafio-dos-sabios/", include("modules.desafio_dos_sabios.urls")),
]

if settings.DEBUG and getattr(settings, "MEDIA_ROOT", None):
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", media_serve, {"document_root": settings.MEDIA_ROOT}),
    ]
