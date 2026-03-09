from django.db import models
from django.contrib.auth.models import User
import uuid

class GameDefinition(models.Model):
    JOURNEY_CHOICES = [
        ('Grammatica', 'Grammatica'),
        ('Logos', 'Logos'),
        ('Rhetorica', 'Rhetorica'),
    ]

    key = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    journey = models.CharField(max_length=20, choices=JOURNEY_CHOICES)
    modes = models.JSONField(default=list)  # ex: ["aprendiz", "desafio", "torneio"]
    scoring_rules_key = models.CharField(max_length=50, default='default_rules')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class GameSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_sessions')
    game_definition = models.ForeignKey(GameDefinition, on_delete=models.CASCADE, related_name='sessions')
    mode = models.CharField(max_length=50)
    context = models.JSONField(default=dict)  # disciplina, tema, dificuldade, etc.
    started_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    score = models.IntegerField(default=0)
    xp_earned = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.game_definition.name} ({self.id})"

class GameEvent(models.Model):
    session = models.ForeignKey(GameSession, on_delete=models.CASCADE, related_name='events')
    type = models.CharField(max_length=50)  # ex: "QUESTION_ANSWERED"
    payload = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} in {self.session_id}"

class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='game_progress')
    total_xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Level {self.level}"

class Achievement(models.Model):
    key = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=100)
    rule_key = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.username} unlocked {self.achievement.name}"
