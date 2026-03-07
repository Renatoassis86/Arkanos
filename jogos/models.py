from django.db import models
from django.contrib.auth.models import User

class Jogo(models.Model):
    TIPO_CHOICES = [
        ('spellingbee', 'Spelling Bee'),
        ('radix', 'Radix'),
    ]

    nome = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descricao = models.TextField(blank=True)
    dificuldade = models.CharField(max_length=20, blank=True)
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Jogo"
        verbose_name_plural = "Jogos"

    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"

class PalavraSpellingBee(models.Model):
    SERIE_CHOICES = [
        ('2ano', '2º Ano'),
        ('3ano', '3º Ano'),
        ('4ano', '4º Ano'),
        ('5ano', '5º Ano'),
    ]

    palavra = models.CharField(max_length=100)
    significado = models.TextField()
    ipa = models.CharField(max_length=100, blank=True)
    exemplo = models.TextField(blank=True)
    serie = models.CharField(max_length=10, choices=SERIE_CHOICES, default='2ano')

    def __str__(self):
        return f"{self.palavra} - {self.get_serie_display()}"

class PalavraRadix(models.Model):
    palavra = models.CharField(max_length=100)
    significado = models.TextField(blank=True)
    exemplo = models.TextField(blank=True)
    dificuldade = models.CharField(max_length=20, default='facil')

    def __str__(self):
        return self.palavra

class Conquista(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    icone = models.CharField(max_length=50, help_text="Nome do ícone ou classe CSS")
    pontos_necessarios = models.IntegerField(default=0)
    tipo = models.CharField(max_length=50, choices=[('level', 'Nível'), ('achievement', 'Conquista')])

    def __str__(self):
        return self.nome

class PerfilEstudante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    serie = models.CharField(max_length=10, choices=PalavraSpellingBee.SERIE_CHOICES)
    data_nascimento = models.DateField(null=True, blank=True)
    xp = models.IntegerField(default=0)
    nivel = models.IntegerField(default=1)
    medalhas = models.ManyToManyField(Conquista, blank=True)

    @property
    def total_pontos(self):
        return self.xp # Simplificação para o ranking

    def __str__(self):
        return f"{self.user.username} - Nível {self.nivel}"

class SessaoJogo(models.Model):
    estudante = models.ForeignKey(PerfilEstudante, on_delete=models.CASCADE)
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    pontuação = models.IntegerField(default=0)
    data_hora = models.DateTimeField(auto_now_add=True)
    erros_detalhados = models.JSONField(default=dict, blank=True) # Para feedback didático futuro

    def __str__(self):
        return f"{self.estudante.user.username} em {self.jogo.nome} - {self.data_hora}"

