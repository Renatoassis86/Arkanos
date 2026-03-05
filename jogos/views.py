import json
from django.views.generic import ListView, DetailView
from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Jogo, PalavraSpellingBee, PerfilEstudante, SessaoJogo, PalavraRadix

def spellingbee_view(request):
    serie = request.GET.get('serie', '2ano')
    
    if request.user.is_authenticated:
        perfil, created = PerfilEstudante.objects.get_or_create(user=request.user, defaults={'serie': serie})
        serie = perfil.serie
    else:
        perfil = None

    palavras_query = PalavraSpellingBee.objects.filter(serie=serie).order_by('?')
    palavras_list = list(palavras_query.values('palavra', 'significado', 'ipa', 'exemplo'))
    
    context = {
        'words_json': json.dumps(palavras_list, cls=DjangoJSONEncoder),
        'user_json': json.dumps({
            'username': request.user.username if request.user.is_authenticated else 'Guest',
            'serie': serie,
            'serie_display': dict(PalavraSpellingBee.SERIE_CHOICES).get(serie),
            'is_authenticated': request.user.is_authenticated
        })
    }
    
    return render(request, "jogos/spellingbee.html", context)

def radix_view(request):
    palavras_query = PalavraRadix.objects.all().order_by('?')
    palavras_list = list(palavras_query.values('palavra', 'significado', 'exemplo', 'dificuldade'))
    
    context = {
        'words_json': json.dumps(palavras_list, cls=DjangoJSONEncoder),
        'user_json': json.dumps({
            'username': request.user.username if request.user.is_authenticated else 'Guest',
            'is_authenticated': request.user.is_authenticated
        })
    }
    return render(request, "jogos/radix.html", context)

def api_quick_auth(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        firstname = data.get('firstname', '').strip()
        lastname = data.get('lastname', '').strip()
        serie = data.get('serie', '2ano')

        if not firstname or not lastname:
            return JsonResponse({'status': 'error', 'message': 'Missing names'}, status=400)

        username = f"{firstname.lower()}_{lastname.lower()}"
        user = User.objects.filter(username=username).first()

        if not user:
            # Create student user
            user = User.objects.create_user(username=username, first_name=firstname, last_name=lastname)
            PerfilEstudante.objects.create(user=user, serie=serie)
        
        login(request, user)
        
        return JsonResponse({
            'status': 'success',
            'username': user.username,
            'serie': user.perfilestudante.serie
        })
    return JsonResponse({'status': 'error'}, status=400)

@login_required
def save_progress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            pontos = data.get('pontos', 0)
            perfil = request.user.perfilestudante
            
            # Ganho de XP simples: 1 ponto = 1 XP
            perfil.xp += pontos
            
            # Sistema de Nível simples: a cada 500 XP sobe um nível
            novo_nivel = (perfil.xp // 500) + 1
            if novo_nivel > perfil.nivel:
                perfil.nivel = novo_nivel
            
            perfil.save()
            
            # Registrar sessão
            SessaoJogo.objects.create(
                estudante=perfil,
                jogo=Jogo.objects.get(slug='spelling-bee'),
                pontuação=pontos
            )
            
            return JsonResponse({
                'status': 'success', 
                'nivel': perfil.nivel, 
                'xp': perfil.xp
            })
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error'}, status=400)

class JogoListView(ListView):
    model = Jogo
    template_name = "jogos/lista.html"
    context_object_name = "jogos"

class JogoDetailView(DetailView):
    model = Jogo

    def get_template_names(self):
        return [f"jogos/{self.object.slug}.html"]
