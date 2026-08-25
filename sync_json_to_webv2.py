import os
import shutil

src = os.path.join("data", "quiz_questions.json")
dst = os.path.join("web-v2", "src", "data", "quiz_questions.json")

os.makedirs(os.path.dirname(dst), exist_ok=True)
shutil.copyfile(src, dst)

print(f"Copied {src} -> {dst} successfully!")
