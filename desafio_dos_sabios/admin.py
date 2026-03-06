from django.contrib import admin
from .models import QuizSubject, QuizGrade, QuizAssessment, QuizTopic, QuizQuestion, QuizQuestionGenerated, QuizQuestionVerified

@admin.register(QuizSubject)
class QuizSubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(QuizGrade)
class QuizGradeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(QuizAssessment)
class QuizAssessmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'grade', 'subject', 'created_at')
    list_filter = ('grade', 'subject')

@admin.register(QuizTopic)
class QuizTopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'grade', 'assessment')
    list_filter = ('subject', 'grade', 'assessment')

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'topic', 'difficulty', 'type')
    list_filter = ('topic__subject', 'topic__grade', 'difficulty')
    search_fields = ('question',)

admin.site.register(QuizQuestionGenerated)
admin.site.register(QuizQuestionVerified)
