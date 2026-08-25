import sys
print(sys.executable)

try:
    import easyocr
    print("EasyOCR is available")
except ImportError:
    print("EasyOCR not installed")

try:
    import pytesseract
    print("Pytesseract installed")
except ImportError:
    print("Pytesseract not installed")
