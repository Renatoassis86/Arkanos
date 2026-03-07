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
        ('multiple_choice',       'Múltipla Escolha'),
        ('image_multiple_choice', 'Múltipla Escolha com Imagem'),
        ('map_analysis',          'Análise de Mapa'),
        ('diagram_analysis',      'Análise de Diagrama'),
        ('visual_interpretation', 'Interpretação Visual'),
        ('true_false',            'Verdadeiro ou Falso'),
        ('short_answer',          'Resposta Curta'),
        ('ordering',              'Ordenação'),
    ]

    IMAGE_MODE_CHOICES = [
        ('none',               'Sem imagem'),
        ('uploaded_asset',     'Asset Enviado'),
        ('generated_asset',    'Gerado por IA'),
        ('external_reference', 'Referência Externa'),
    ]

    DIFFICULTY_CHOICES = [
        ('easy',   'Fácil'),
        ('medium', 'Médio'),
        ('hard',   'Difícil'),
    ]

    SOURCE_CHOICES = [
        ('manual',          'Manual'),
        ('ai_generated',    'Gerada por IA'),
        ('teacher_added',   'Adicionada por Professor'),
    ]

    # Core
    topic      = models.ForeignKey(QuizTopic, on_delete=models.CASCADE, related_name="%(class)s_questions")
    question   = models.TextField()
    options    = models.JSONField(null=True, blank=True)
    answer     = models.TextField()
    type       = models.CharField(max_length=30, choices=TYPE_CHOICES, default='multiple_choice')
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')

    # Pedagogical
    journey              = models.CharField(max_length=50, default='Logos')
    explanation          = models.TextField(blank=True)
    cronica_do_guardiao  = models.TextField(
        blank=True,
        help_text="Texto narrativo pós-resposta: fato histórico, curiosidade ou contexto geográfico."
    )
    tags        = models.JSONField(default=list, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    # Image support (visual questions)
    has_image    = models.BooleanField(default=False)
    image_mode   = models.CharField(max_length=25, choices=IMAGE_MODE_CHOICES, default='none')
    image_url    = models.TextField(blank=True, null=True, help_text="URL da imagem após geração/upload")
    image_prompt = models.TextField(blank=True, null=True, help_text="Prompt de geração de imagem via IA")
    image_alt    = models.CharField(max_length=300, blank=True, null=True, help_text="Texto alternativo (acessibilidade)")

    # Legacy (backwards compat)
    image = models.TextField(blank=True, null=True, help_text="Campo legado: URL ou base64")

    # Flexible metadata
    metadata_json = models.JSONField(
        default=dict, blank=True,
        help_text="Dados extras: id_original, tema, referência de mapa, etc."
    )

    class Meta:
        abstract = True

    def __str__(self):
        return f"[{self.topic.subject.name} | {self.topic.name}] {self.question[:60]}"

    @property
    def is_visual(self):
        return self.type in ('image_multiple_choice', 'map_analysis', 'diagram_analysis', 'visual_interpretation')

    def get_image_url(self):
        """Best available image URL for this question."""
        return self.image_url or self.image or None


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
    topic            = models.ForeignKey(QuizTopic, on_delete=models.CASCADE)
    difficulty       = models.CharField(max_length=10, choices=BaseQuizQuestion.DIFFICULTY_CHOICES)
    generated_count  = models.IntegerField(default=0)
    last_generated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('topic', 'difficulty')
