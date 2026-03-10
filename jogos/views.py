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
    if not palavras_query.exists():
        palavras_query = PalavraSpellingBee.objects.all().order_by('?')
        
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
    mode = request.GET.get('mode', 'digitacao')
    palavras_query = PalavraRadix.objects.all().order_by('?')
    palavras_list = list(palavras_query.values('palavra', 'significado', 'exemplo', 'dificuldade'))
    
    context = {
        'mode': mode,
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
        birthdate = data.get('birthdate', '').strip()
        serie = data.get('serie', '2ano')

        if not firstname or not lastname:
            return JsonResponse({'status': 'error', 'message': 'Nomes obrigatórios'}, status=400)

        # Create a more robust student username
        username = f"estudante_{firstname.lower()}_{lastname.lower()}"
        user = User.objects.filter(username=username).first()

        if not user:
            # Create student user
            user = User.objects.create_user(username=username, first_name=firstname, last_name=lastname)
            PerfilEstudante.objects.create(
                user=user, 
                serie=serie, 
                data_nascimento=birthdate if birthdate else None
            )
        else:
            # Update existing profile grade if they logged in with a different one
            perfil = user.perfilestudante
            perfil.serie = serie
            if birthdate:
                perfil.data_nascimento = birthdate
            perfil.save()
        
        login(request, user)
        
        return JsonResponse({
            'status': 'success',
            'username': f"{user.first_name} {user.last_name}",
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
            
            # Usar os novos métodos do modelo para ganhar XP e subir de nível
            subiu_nivel = perfil.ganha_xp(pontos)
            
            # Registrar sessão
            SessaoJogo.objects.create(
                estudante=perfil,
                jogo=Jogo.objects.filter(slug__icontains='spelling').first() or Jogo.objects.first(),
                pontuação=pontos
            )
            
            return JsonResponse({
                'status': 'success', 
                'nivel': perfil.nivel, 
                'xp': perfil.xp,
                'subiu_nivel': subiu_nivel
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
