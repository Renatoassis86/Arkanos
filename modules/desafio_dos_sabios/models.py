from django.db import models
from django.contrib.auth.models import User

class BaseQuizQuestion(models.Model):
    TYPE_CHOICES = [
        ('multiple_choice', 'Múltipla Escolha'),
        ('true_false', 'Verdadeiro ou Falso'),
        ('short_answer', 'Resposta Curta'),
        ('ordering', 'Ordenação'),
    ]

    DIFFICULTY_CHOICES = [
        ('easy', 'Fácil'),
        ('medium', 'Médio'),
        ('hard', 'Difícil'),
    ]

    SOURCE_CHOICES = [
        ('manual', 'Manual'),
        ('ai_generated', 'Gerada por IA'),
        ('teacher_added', 'Adicionada por Professor'),
    ]

    question = models.TextField()
    options = models.JSONField(null=True, blank=True)
    answer = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    journey = models.CharField(max_length=50, default='Logos')
    explanation = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"[{self.subject}] {self.question[:50]}..."

class QuizQuestion(BaseQuizQuestion):
    source = models.CharField(max_length=20, choices=BaseQuizQuestion.SOURCE_CHOICES, default='manual')

class QuizQuestionGenerated(BaseQuizQuestion):
    ai_model = models.CharField(max_length=50, default='gemini-2.0-flash')
    
class QuizQuestionVerified(BaseQuizQuestion):
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

class QuestionGenerationCache(models.Model):
    topic = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=10, choices=BaseQuizQuestion.DIFFICULTY_CHOICES)
    generated_count = models.IntegerField(default=0)
    last_generated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('topic', 'subject', 'difficulty')
