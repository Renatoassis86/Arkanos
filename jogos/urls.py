from django.urls import path
from .views import JogoListView, JogoDetailView, spellingbee_view, save_progress, api_quick_auth, radix_view

app_name = "jogos"

urlpatterns = [
    path("", JogoListView.as_view(), name="jogo_list"),
    path("spellingbee/", spellingbee_view, name="spellingbee"),
    path("spellingbee/auth/", api_quick_auth, name="api_quick_auth"),
    path("radix/", radix_view, name="radix"),
    path("spellingbee/save-progress/", save_progress, name="save_progress"),
    path("<slug:slug>/", JogoDetailView.as_view(), name="jogo_detail"),
]
