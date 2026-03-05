from rest_framework import serializers
from .models import PalavraSpellingBee

class PalavraSpellingBeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PalavraSpellingBee
        fields = ['palavra', 'exemplo', 'significado']
