from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def home(request):
    return render(request, 'ark/home.html')

@login_required
def new_story(request):
    return render(request, 'ark/new_story.html')

@login_required
def project_view(request, project_id):
    return render(request, 'ark/project_view.html', {'project_id': project_id})

@login_required
def library(request):
    return render(request, 'ark/library.html')

@login_required
def export_book(request, project_id):
    return render(request, 'ark/export_book.html', {'project_id': project_id})

@login_required
def api_interact(request, project_id):
    return JsonResponse({'status': 'pending', 'message': 'API in construction.'})

@login_required
def api_close_book(request, project_id):
    return JsonResponse({'status': 'pending', 'message': 'Book closing in construction.'})
