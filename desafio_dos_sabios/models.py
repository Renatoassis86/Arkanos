from django.db import models
from django.contrib.auth.models import User

class QuizSubject(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'quiz_subjects'

    def __str__(self):
        return self.name

class QuizGrade(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'quiz_grades'

    def __str__(self):
        return self.name

class QuizAssessment(models.Model):
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(QuizGrade, on_delete=models.CASCADE, related_name='assessments')
    subject = models.ForeignKey(QuizSubject, on_delete=models.CASCADE, related_name='assessments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'quiz_assessments'
        unique_together = ('name', 'grade', 'subject')

    def __str__(self):
        return f"{self.name} ({self.grade.name} - {self.subject.name})"

class QuizTopic(models.Model):
    subject = models.ForeignKey(QuizSubject, on_delete=models.CASCADE, related_name='topics')
    grade = models.ForeignKey(QuizGrade, on_delete=models.SET_NULL, null=True, blank=True, related_name='topics')
    assessment = models.ForeignKey(QuizAssessment, on_delete=models.SET_NULL, null=True, blank=True, related_name='topics')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'quiz_topics'
        unique_together = ('subject', 'grade', 'assessment', 'name')

    def __str__(self):
        return f"{self.subject.name} - {self.name}"

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

    topic = models.ForeignKey(QuizTopic, on_delete=models.CASCADE, related_name="%(class)s_questions")
    question = models.TextField()
    options = models.JSONField(null=True, blank=True)
    answer = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    
    # Metadata
    journey = models.CharField(max_length=50, default='Logos')
    explanation = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    image = models.TextField(blank=True, null=True, help_text="URL ou base64 da imagem de suporte")
    
    class Meta:
        abstract = True

    def __str__(self):
        return f"[{self.topic.subject.name} | {self.topic.name}] {self.question[:50]}..."

class QuizQuestion(BaseQuizQuestion):
    source = models.CharField(max_length=20, choices=BaseQuizQuestion.SOURCE_CHOICES, default='manual')

    class Meta:
        db_table = 'quiz_questions'

class QuizQuestionGenerated(BaseQuizQuestion):
    ai_model = models.CharField(max_length=50, default='gemini-2.0-flash')

    class Meta:
        db_table = 'quiz_questions_generated'
    
class QuizQuestionVerified(BaseQuizQuestion):
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'quiz_questions_verified'

class QuestionGenerationCache(models.Model):
    topic = models.ForeignKey(QuizTopic, on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=10, choices=BaseQuizQuestion.DIFFICULTY_CHOICES)
    generated_count = models.IntegerField(default=0)
    last_generated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('topic', 'difficulty')
