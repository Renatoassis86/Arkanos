from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render
import json
from .models import QuizQuestion, QuizQuestionGenerated, QuizQuestionVerified, QuizSubject, QuizTopic, QuizGrade, QuizAssessment
from .services.question_generator import QuestionGenerator

def index(request):
    return render(request, "desafio_dos_sabios/index.html")

def question_list(request):
    assessment_id = request.GET.get('assessment_id')
    topic_id = request.GET.get('topic_id')
    difficulty = request.GET.get('difficulty')
    limit = int(request.GET.get('limit', 1000))

    def get_query(model):
        q = model.objects.filter(type='multiple_choice').select_related('topic__subject')
        
        # 1. Tentativa Ultra-Específica (Avaliação)
        if assessment_id:
            q_specific = q.filter(topic__assessment_id=assessment_id)
            if q_specific.exists():
                return q_specific
            
            # 2. Se falhar, tenta pegar a série (grade) desta avaliação para não deixar o usuário no vácuo
            try:
                assessment = QuizAssessment.objects.get(id=assessment_id)
                q_grade = q.filter(topic__grade=assessment.grade, topic__subject=assessment.subject)
                if q_grade.exists():
                    return q_grade
            except:
                pass

        # 3. Fallback Final (Tópico ou Qualquer coisa coerente)
        if topic_id:
            q = q.filter(topic_id=topic_id)
        
        return q

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

    import random
    random.shuffle(all_qs)
    
    results = []
    for q, source_name in all_qs[:limit]:
        results.append({
            'id': f"{source_name}_{q.id}",
            'question': q.question,
            'options': q.options,
            'type': q.type,
            'difficulty': q.difficulty,
            'subject': q.topic.subject.name,
            'topic': q.topic.name,
            'source': source_name,
            'image': getattr(q, 'image', None)
        })
    
    return JsonResponse(results[:limit], safe=False)

@csrf_exempt
def validate_answer(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        full_id = data.get('questionId')
        user_answer = data.get('userAnswer', '').strip()

        try:
            source, q_id = full_id.split('_')
            model_map = {
                'verified': QuizQuestionVerified,
                'generated': QuizQuestionGenerated,
                'manual': QuizQuestion
            }
            model = model_map.get(source)
            question = model.objects.get(id=q_id)
        except (ValueError, AttributeError, QuizQuestion.DoesNotExist, QuizQuestionGenerated.DoesNotExist, QuizQuestionVerified.DoesNotExist):
            return JsonResponse({'status': 'error', 'message': 'Questão não encontrada'}, status=404)
        
        is_correct = user_answer.lower() == str(question.answer).lower()
        
        return JsonResponse({
            'correct': is_correct,
            'correct_answer': question.answer,
            'explanation': question.explanation
        })
    return JsonResponse({'status': 'error'}, status=400)

def get_subjects(request):
    subjects = QuizSubject.objects.all().order_by('name')
    return JsonResponse([{'id': s.id, 'name': s.name} for s in subjects], safe=False)

def get_grades(request):
    grades = QuizGrade.objects.all().order_by('name')
    return JsonResponse([{'id': g.id, 'name': g.name} for g in grades], safe=False)

def get_assessments(request):
    grade_id = request.GET.get('grade_id')
    subject_id = request.GET.get('subject_id')
    q = QuizAssessment.objects.all()
    if grade_id:
        q = q.filter(grade_id=grade_id)
    if subject_id:
        q = q.filter(subject_id=subject_id)
    return JsonResponse([{'id': a.id, 'name': a.name} for a in q.order_by('name')], safe=False)

def get_topics(request):
    subject_id = request.GET.get('subject_id')
    assessment_id = request.GET.get('assessment_id')
    
    topics = QuizTopic.objects.all()
    if subject_id:
        topics = topics.filter(subject_id=subject_id)
    if assessment_id:
        topics = topics.filter(assessment_id=assessment_id)
        
    return JsonResponse([{'id': t.id, 'name': t.name} for t in topics.order_by('name')], safe=False)

# Outros métodos administrativos podem ser atualizados conforme necessário.
@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def generate_quiz(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        topic_id = data.get('topic_id')
        difficulty = data.get('difficulty', 'medium')
        quantity = min(int(data.get('quantity', 5)), 20)

        try:
            topic = QuizTopic.objects.get(id=topic_id)
            generator = QuestionGenerator()
            generated = generator.generate_questions(topic.id, difficulty, quantity)
            return JsonResponse({'status': 'success', 'count': len(generated)})
        except QuizTopic.DoesNotExist:
             return JsonResponse({'status': 'error', 'message': 'Tópico não encontrado'}, status=404)
             
    return JsonResponse({'status': 'error'}, status=400)

@user_passes_test(lambda u: u.is_staff)
def admin_questions(request):
    generated = QuizQuestionGenerated.objects.all().select_related('topic__subject').order_by('-created_at')
    verified = QuizQuestionVerified.objects.all().select_related('topic__subject').order_by('-created_at')
    manual = QuizQuestion.objects.all().select_related('topic__subject').order_by('-created_at')
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

@csrf_exempt
@user_passes_test(lambda u: u.is_staff)
def generate_from_context(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text_context = data.get('text', '')
        images_b64 = data.get('images', []) 
        quantity = min(int(data.get('quantity', 5)), 15)

        generator = QuestionGenerator()
        generated = generator.generate_from_context(text_context, images_b64, quantity)
        
        return JsonResponse({
            'status': 'success',
            'count': len(generated)
        })
    return JsonResponse({'status': 'error'}, status=400)
