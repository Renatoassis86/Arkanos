from django.contrib import admin
from .models import StoryProject, StorySession, StoryCharacter, StoryAsset, StoryExport, StoryCatalog

@admin.register(StoryProject)
class StoryProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'status', 'current_page_count', 'created_at')
    list_filter = ('status', 'worldview_mode', 'age_group')
    search_fields = ('title', 'user__username')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(StorySession)
class StorySessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'page_range_start', 'page_range_end', 'created_at')
    raw_id_fields = ('project',)

@admin.register(StoryCharacter)
class StoryCharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'created_at')
    search_fields = ('name', 'project__title')

@admin.register(StoryAsset)
class StoryAssetAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'type', 'created_at')
    list_filter = ('type',)

@admin.register(StoryExport)
class StoryExportAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'export_type', 'created_at')
    list_filter = ('export_type',)

@admin.register(StoryCatalog)
class StoryCatalogAdmin(admin.ModelAdmin):
    list_display = ('internal_book_code', 'project', 'isbn_status', 'created_at')
    search_fields = ('internal_book_code',)
