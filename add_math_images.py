from desafio_dos_sabios.models import QuizQuestion

qs = [q for q in QuizQuestion.objects.filter(topic__subject__name='Matemática') if any(op in q.question for op in ['+', '-', 'x', '*', '/'])]
print(f"Found {len(qs)} math questions with operators.")

count = 0
for q in qs:
    q.has_image = True
    q.image_mode = 'uploaded_asset'
    q.image_url = '/static/img/quiz/mat_qvl_base.png'
    q.save()
    count += 1

print(f"Successfully updated {count} questions with QVL image.")
