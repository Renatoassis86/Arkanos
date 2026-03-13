import os
import sys
import django
from pathlib import Path

# Add project root to path
root = Path(__file__).resolve().parent
sys.path.append(str(root))
sys.path.append(str(root / 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
django.setup()

from desafio_dos_sabios.models import QuizQuestion

def audit_images():
    qs = QuizQuestion.objects.filter(has_image=True)
    print(f"Total questions with has_image=True: {qs.count()}")
    
    missing_url = qs.filter(image_url__isnull=True).count()
    print(f"Questions with image_url=None: {missing_url}")
    
    # Check if files exist
    found = 0
    broken = 0
    
    static_root = root / 'backend' / 'static'
    
    for q in qs:
        if not q.image_url:
            continue
            
        # URL usually starts with /static/
        relative_path = q.image_url.replace('/static/', '')
        file_path = static_root / relative_path
        
        if file_path.exists():
            found += 1
        else:
            broken += 1
            print(f"Broken: {q.metadata_json.get('id_original')} - {q.image_url}")
            
    print(f"\nFound: {found}")
    print(f"Broken/Missing files: {broken}")

if __name__ == "__main__":
    audit_images()
