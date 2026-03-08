from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils import timezone
import json
from .models import GameDefinition, GameSession, GameEvent, UserProgress, Achievement, UserAchievement

def game_list(request):
    games = GameDefinition.objects.all().values('key', 'name', 'journey', 'modes')
    return JsonResponse(list(games), safe=False)

@csrf_exempt
@login_required
def session_start(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        game_key = data.get('gameKey')
        mode = data.get('mode', 'aprendiz')
        context = data.get('context', {})

        game_def = GameDefinition.objects.get(key=game_key)
        session = GameSession.objects.create(
            user=request.user,
            game_definition=game_def,
            mode=mode,
            context=context
        )
        return JsonResponse({'sessionId': str(session.id)})
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
@login_required
def session_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('sessionId')
        event_type = data.get('type')
        payload = data.get('payload', {})

        session = GameSession.objects.get(id=session_id, user=request.user)
        GameEvent.objects.create(
            session=session,
            type=event_type,
            payload=payload
        )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
@login_required
def session_finish(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('sessionId')
        final_score = data.get('finalScore', 0)

        session = GameSession.objects.get(id=session_id, user=request.user)
        session.finished_at = timezone.now()
        session.score = final_score
        
        # Simple XP logic: 1:1
        xp_earned = final_score
        session.xp_earned = xp_earned
        session.save()

        # Update User Progress
        progress, created = UserProgress.objects.get_or_create(user=request.user)
        progress.total_xp += xp_earned
        
        # level = floor(totalXp / 200) + 1
        progress.level = (progress.total_xp // 200) + 1
        progress.save()

        # Check Achievements
        unlocked = []
        
        def unlock(key):
            ach = Achievement.objects.filter(key=key).first()
            if ach and not UserAchievement.objects.filter(user=request.user, achievement=ach).exists():
                UserAchievement.objects.create(user=request.user, achievement=ach)
                unlocked.append({'key': ach.key, 'name': ach.name})

        # 1. Primeiro Sangue (primeira partida finalizada)
        unlock('primeiro_sangue')

        # 2. Discípulo de Logos (acumular 500 XP em jogos da jornada Logos)
        if progress.total_xp >= 500:
            unlock('discipulo_logos')

        # 3. Trinca (3 acertos seguidos - checks events)
        # Note: For MVP, we check if the current session had a streak >= 3
        # In a real engine, we'd analyze GameEvents
        events = GameEvent.objects.filter(session=session, type='QUESTION_ANSWERED')
        # ... logic for streak analysis could go here ...

        return JsonResponse({
            'score': session.score,
            'xpEarned': xp_earned,
            'level': progress.level,
            'achievementsUnlocked': unlocked
        })
    return JsonResponse({'status': 'error'}, status=400)

@login_required
def leaderboard(request):
    scope_type = request.GET.get('scopeType', 'global')
    # simplified global ranking for now
    entries = UserProgress.objects.all().order_by('-total_xp')[:10]
    data = []
    for entry in entries:
        data.append({
            'username': entry.user.username,
            'xp': entry.total_xp,
            'level': entry.level
        })
    return JsonResponse(data, safe=False)

@login_required
def progress_me(request):
    progress, created = UserProgress.objects.get_or_create(user=request.user)
    achievements = UserAchievement.objects.filter(user=request.user).values('achievement__key', 'unlocked_at')
    
    return JsonResponse({
        'totalXp': progress.total_xp,
        'level': progress.level,
        'xpToNextLevel': 200 - (progress.total_xp % 200),
        'achievements': list(achievements)
    })
