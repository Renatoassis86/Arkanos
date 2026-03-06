from django.db import models
from django.contrib.auth.models import User

class StoryProject(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('ready_to_close', 'Ready to Close'),
        ('published_internal', 'Published Internal'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ark_projects')
    title = models.CharField(max_length=255, blank=True, null=True)
    age_group = models.CharField(max_length=50) # eg: "7-9 anos"
    genre = models.CharField(max_length=100, blank=True, null=True)
    theme = models.CharField(max_length=100, blank=True, null=True)
    worldview_mode = models.CharField(max_length=50, default='christian')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='draft')
    current_page_count = models.IntegerField(default=0)
    target_page_range = models.CharField(max_length=50, blank=True, null=True) # eg: "30-60"
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title or 'Projeto sem titulo'} - {self.user.username}"

class StorySession(models.Model):
    project = models.ForeignKey(StoryProject, on_delete=models.CASCADE, related_name='sessions')
    user_input = models.TextField(blank=True, null=True)
    ark_questions = models.TextField(blank=True, null=True) # JSON or Text
    generated_text = models.TextField(blank=True, null=True)
    illustration_prompt = models.TextField(blank=True, null=True)
    illustration_asset_id = models.CharField(max_length=255, blank=True, null=True)
    page_range_start = models.IntegerField(default=0)
    page_range_end = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)

class StoryCharacter(models.Model):
    project = models.ForeignKey(StoryProject, on_delete=models.CASCADE, related_name='characters')
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    visual_traits = models.TextField(blank=True, null=True)
    moral_arc = models.TextField(blank=True, null=True) # JSON or Text describing the character's moral journey
    
    created_at = models.DateTimeField(auto_now_add=True)

class StoryAsset(models.Model):
    ASSET_TYPES = [
        ('cover', 'Cover'),
        ('scene', 'Scene'),
        ('reference_upload', 'Reference Upload'),
        ('character_sheet', 'Character Sheet'),
    ]

    project = models.ForeignKey(StoryProject, on_delete=models.CASCADE, related_name='assets')
    type = models.CharField(max_length=50, choices=ASSET_TYPES)
    file_url = models.URLField(max_length=500) # Stored in Supabase
    prompt_used = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

class StoryExport(models.Model):
    EXPORT_TYPES = [
        ('pdf', 'PDF'),
        ('ebook', 'eBook'),
    ]

    project = models.ForeignKey(StoryProject, on_delete=models.CASCADE, related_name='exports')
    export_type = models.CharField(max_length=50, choices=EXPORT_TYPES)
    file_url = models.URLField(max_length=500)
    
    created_at = models.DateTimeField(auto_now_add=True)

class StoryCatalog(models.Model):
    project = models.OneToOneField(StoryProject, on_delete=models.CASCADE, related_name='catalog_info')
    internal_book_code = models.CharField(max_length=100, unique=True)
    isbn_status = models.CharField(max_length=50, default='pendente')
    catalog_record_json = models.JSONField(blank=True, null=True) # Stores Ficha Catalográfica details
    
    created_at = models.DateTimeField(auto_now_add=True)
