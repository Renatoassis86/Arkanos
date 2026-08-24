import os
import sys
import django

sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizAssessment

def fix_assessments():
    print("Fixing trimestre field on QuizAssessment records...")
    assessments = QuizAssessment.objects.all()
    for a in assessments:
        name_upper = a.name.upper()
        if "AV1" in name_upper or "1" in name_upper:
            a.trimestre = 1
        elif "AV2" in name_upper or "2" in name_upper:
            a.trimestre = 2
        elif "AV3" in name_upper or "3" in name_upper:
            a.trimestre = 3
        else:
            a.trimestre = 2 # Default to 2nd trimester if unspecified

        a.save()
        print(f"Updated Assessment ID {a.id}: {a.name} ({a.grade.name} - {a.subject.name}) -> trimestre = {a.trimestre}")

if __name__ == "__main__":
    fix_assessments()
