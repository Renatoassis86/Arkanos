import os
import json
from openai import OpenAI
from django.conf import settings

class OpenAIService:
    def __init__(self):
        api_key = getattr(settings, 'OPENAI_API_KEY', os.getenv('OPENAI_API_KEY'))
        self.client = OpenAI(api_key=api_key)
        self.model = getattr(settings, 'OPENAI_MODEL', 'gpt-4o')

    def generate_questions_from_context(self, text_context, image_b64_list=None, quantity=5):
        """
        Calls OpenAI to generate questions based on the Arkanos Architect Prompt.
        """
        prompt_path = os.path.join(os.path.dirname(__file__), '..', 'prompts', 'ai_challenge_architect.md')
        
        # Fallback if prompt file isn't in that specific location
        system_prompt = "Você é o Arquiteto Pedagógico da Arkanos. Gere questões em JSON."
        if os.path.exists(prompt_path):
            with open(prompt_path, 'r', encoding='utf-8') as f:
                system_prompt = f.read()

        user_content = [
            {"type": "text", "text": f"Analise o conteúdo abaixo e crie {quantity} desafios no formato JSON solicitado.\n\nCONTEÚDO TEXTUAL:\n{text_context}"}
        ]

        if image_b64_list:
            for img_b64 in image_b64_list:
                user_content.append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}
                })

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_content}
                ],
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            # The prompt asks for an array, but some models might wrap it in a key
            data = json.loads(content)
            if isinstance(data, dict) and 'questions' in data:
                return data['questions']
            if isinstance(data, dict):
                # If it's a dict but not wrapped, maybe it's the first object or we need to find the array
                for key, value in data.items():
                    if isinstance(value, list):
                        return value
            return data if isinstance(data, list) else [data]
        except Exception as e:
            print(f"Error calling OpenAI: {e}")
            return []
