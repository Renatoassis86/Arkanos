from django.urls import path
from . import views

app_name = 'game_engine'

urlpatterns = [
    path('games/', views.game_list, name='game_list'),
    path('games/session/start/', views.session_start, name='session_start'),
    path('games/session/event/', views.session_event, name='session_event'),
    path('games/session/finish/', views.session_finish, name='session_finish'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('progress/me/', views.progress_me, name='progress_me'),
]
