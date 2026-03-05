from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render
import json
from .models import QuizQuestion, QuizQuestionGenerated, QuizQuestionVerified
from .services.question_generator import QuestionGenerator

def index(request):
    return render(request, "desafio_dos_sabios/index.html")

def question_list(request):
    subject = request.GET.get('subject')
    topic = request.GET.get('topic')
    difficulty = request.GET.get('difficulty')
    limit = int(request.GET.get('limit', 10))

    def get_query(model):
        q = model.objects.filter(type='multiple_choice')
        if subject: q = q.filter(subject=subject)
        if topic: q = q.filter(topic=topic)
        if difficulty: q = q.filter(difficulty=difficulty)
        return q

    # Prioridade para múltipla escolha por demanda do usuário
    all_qs = []
    sources = [
        (QuizQuestionVerified, 'verified'),
        (QuizQuestion, 'manual'),
        (QuizQuestionGenerated, 'generated')
    ]
    
    for model, source_name in sources:
        qs = get_query(model)
        for q in qs:
            all_qs.append((q, source_name))

    # Ordenar: Multiple Choice primeiro, depois os outros, aleatório dentro de cada grupo
    import random
    random.shuffle(all_qs)
    all_qs.sort(key=lambda x: 0 if x[0].type == 'multiple_choice' else 1)
    
    results = []
    for q, source_name in all_qs[:limit]:
        results.append({
            'id': f"{source_name}_{q.id}",
            'question': q.question,
            'options': q.options,
            'type': q.type,
            'difficulty': q.difficulty,
            'subject': q.subject,
            'topic': q.topic,
            'source': source_name
        })
    
    return JsonResponse(results[:limit], safe=False)

@csrf_exempt
def validate_answer(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        full_id = data.get('questionId') # e.g. "manual_1"
        user_answer = data.get('userAnswer', '').strip()

        try:
            source, q_id = full_id.split('_')
            if source == 'verified':
                question = QuizQuestionVerified.objects.get(id=q_id)
            elif source == 'generated':
                question = QuizQuestionGenerated.objects.get(id=q_id)
            else:
                question = QuizQuestion.objects.get(id=q_id)
        except (ValueError, QuizQuestion.DoesNotExist, QuizQuestionGenerated.DoesNotExist, QuizQuestionVerified.DoesNotExist):
            return JsonResponse({'status': 'error', 'message': 'Questão não encontrada'}, status=404)
        
        # Simple validation
        if question.type == 'true_false':
            is_correct = str(user_answer).lower() == str(question.answer).lower()
        else:
            is_correct = user_answer.lower() == question.answer.lower()
        
        return JsonResponse({
            'correct': is_correct,
            'correct_answer': question.answer,
            'explanation': question.explanation
        })
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def generate_quiz(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        subject = data.get('subject')
        topic = data.get('topic')
        difficulty = data.get('difficulty', 'medium')
        quantity = min(int(data.get('quantity', 5)), 20)

        generator = QuestionGenerator()
        generated = generator.generate_questions(topic, subject, difficulty, quantity)
        
        return JsonResponse({
            'status': 'success',
            'count': len(generated)
        })
    return JsonResponse({'status': 'error'}, status=400)

@user_passes_test(lambda u: u.is_staff)
def admin_questions(request):
    generated = QuizQuestionGenerated.objects.all().order_by('-created_at')
    verified = QuizQuestionVerified.objects.all().order_by('-created_at')
    manual = QuizQuestion.objects.all().order_by('-created_at')
    return render(request, "desafio_dos_sabios/admin_questions.html", {
        'generated': generated,
        'verified': verified,
        'manual': manual
    })

@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def edit_question(request, q_type, q_id):
    model_map = {
        'generated': QuizQuestionGenerated,
        'verified': QuizQuestionVerified,
        'manual': QuizQuestion
    }
    model = model_map.get(q_type)
    if not model:
        return JsonResponse({'status': 'error', 'message': 'Tipo inválido'}, status=400)
    
    question = model.objects.get(id=q_id)
    
    if request.method == 'POST':
        data = json.loads(request.body)
        question.question = data.get('question', question.question)
        question.answer = data.get('answer', question.answer)
        question.explanation = data.get('explanation', question.explanation)
        if 'options' in data:
            question.options = data.get('options')
        question.save()
        return JsonResponse({'status': 'success'})
        
    return render(request, "desafio_dos_sabios/edit_question.html", {
        'q': question,
        'q_type': q_type
    })

@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def approve_question(request, q_id):
    if request.method == 'POST':
        from .services.question_validator import QuestionValidator
        success, result = QuestionValidator.validate_and_approve(q_id, request.user)
        if success:
            QuizQuestionGenerated.objects.filter(id=q_id).delete()
            return JsonResponse({'status': 'success'})
        return JsonResponse({'status': 'error', 'message': result}, status=400)
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def delete_question(request, q_id):
    if request.method == 'POST':
        QuizQuestionGenerated.objects.filter(id=q_id).delete()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

def get_subjects(request):
    from itertools import chain
    s1 = QuizQuestion.objects.filter(type='multiple_choice').values_list('subject', flat=True).distinct()
    s2 = QuizQuestionVerified.objects.filter(type='multiple_choice').values_list('subject', flat=True).distinct()
    s3 = QuizQuestionGenerated.objects.filter(type='multiple_choice').values_list('subject', flat=True).distinct()
    subjects = sorted(list(set(chain(s1, s2, s3))))
    return JsonResponse(subjects, safe=False)

def get_topics(request):
    subject = request.GET.get('subject')
    from itertools import chain
    q_manual = QuizQuestion.objects.filter(type='multiple_choice')
    q_verified = QuizQuestionVerified.objects.filter(type='multiple_choice')
    q_generated = QuizQuestionGenerated.objects.filter(type='multiple_choice')
    
    if subject:
        q_manual = q_manual.filter(subject=subject)
        q_verified = q_verified.filter(subject=subject)
        q_generated = q_generated.filter(subject=subject)
    
    t1 = q_manual.values_list('topic', flat=True).distinct()
    t2 = q_verified.values_list('topic', flat=True).distinct()
    t3 = q_generated.values_list('topic', flat=True).distinct()
    
    topics = sorted(list(set(chain(t1, t2, t3))))
    return JsonResponse(topics, safe=False)
