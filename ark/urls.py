from django.urls import path
from . import views

app_name = 'ark'

urlpatterns = [
    path('', views.home, name='home'),
    path('nova-historia/', views.new_story, name='new_story'),
    path('projeto/<int:project_id>/', views.project_view, name='project_view'),
    path('biblioteca/', views.library, name='library'),
    path('exportar/<int:project_id>/', views.export_book, name='export_book'),
    
    # API Endpoints
    path('api/interact/<int:project_id>/', views.api_interact, name='api_interact'),
    path('api/close/<int:project_id>/', views.api_close_book, name='api_close_book'),
]
