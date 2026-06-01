import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

print("Iniciando Vinculação de Fallback (Placeholders)...")

# 1. Geografia leftovers with general terms
updated_geo_orient = QuizQuestion.objects.filter(
    has_image=False, 
    topic__subject__name='Geografia',
    question__icontains='qual'
).update(
    has_image=True,
    image_mode='uploaded_asset',
    image_url='/static/img/quiz/geo_generic_compass_map.png'
)

# 2. General Georafia remaining items
updated_geo_space = QuizQuestion.objects.filter(
    has_image=False, 
    topic__subject__name='Geografia'
).update(
    has_image=True,
    image_mode='uploaded_asset',
    image_url='/static/img/quiz/geo_generic_space_earth.png'
)

# 3. Matemática remaining items
updated_mat = QuizQuestion.objects.filter(
    has_image=False, 
    topic__subject__name='Matemática'
).update(
    has_image=True,
    image_mode='uploaded_asset',
    image_url='/static/img/quiz/mat_generic_numbers_grid.png'
)

print(f"Fallback concluído!\n"
      f"- Geografia (Orientação): {updated_geo_orient} questões\n"
      f"- Geografia (Espaço): {updated_geo_space} questões\n"
      f"- Matemática: {updated_mat} questões")
Count = QuizQuestion.objects.filter(has_image=False).count()
print(f"Questões restantes sem imagem: {Count}")
