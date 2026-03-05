from django.urls import path
from . import views

app_name = 'desafio_dos_sabios'

urlpatterns = [
    path('', views.index, name='index'),
    path('api/questions/', views.question_list, name='question_list'),
    path('api/validate/', views.validate_answer, name='validate_answer'),
    path('api/generate/', views.generate_quiz, name='generate_quiz'),
    path('api/subjects/', views.get_subjects, name='get_subjects'),
    path('api/topics/', views.get_topics, name='get_topics'),
    
    # Admin Moderation
    path('admin/perguntas/', views.admin_questions, name='admin_questions'),
    path('admin/perguntas/approve/<int:q_id>/', views.approve_question, name='approve_question'),
    path('admin/perguntas/delete/<int:q_id>/', views.delete_question, name='delete_question'),
    path('admin/perguntas/edit/<str:q_type>/<int:q_id>/', views.edit_question, name='edit_question'),
]
