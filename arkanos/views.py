from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib import messages
from jogos.models import PerfilEstudante

def index(request): return render(request, "arkanos/index.html")
def sobre(request): return render(request, "arkanos/sobre.html")
def jornada(request): return render(request, "arkanos/jornada/index.html")
def rankings(request): return render(request, "arkanos/rankings/index.html")
def avatar(request): return render(request, "arkanos/avatar/index.html")
def familia(request): return render(request, "arkanos/familia.html")
def programas(request): return render(request, "arkanos/programas.html")
def demo(request): return render(request, "arkanos/demo.html")

def login_view(request):
    next_url = request.GET.get('next') or request.POST.get('next') or 'arkanos:jogos'
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = User.objects.filter(email=email).first()
        if user:
            user = authenticate(request, username=user.username, password=password)
            if user:
                login(request, user)
                return redirect(next_url)
        
        messages.error(request, "Credenciais inválidas. Tente novamente.")
    
    return render(request, "arkanos/auth/login.html", {'next': next_url})

def cadastro_view(request):
    next_url = request.GET.get('next') or request.POST.get('next') or 'arkanos:jogos'
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        data_nascimento = request.POST.get('data_nascimento')
        serie = request.POST.get('serie', '2ano')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Este e-mail já está cadastrado.")
            return render(request, "arkanos/auth/cadastro.html", {'next': next_url})
        
        username = email.split('@')[0]
        count = 1
        original_username = username
        while User.objects.filter(username=username).exists():
            username = f"{original_username}{count}"
            count += 1
            
        user = User.objects.create_user(
            username=username, 
            email=email, 
            password=password, 
            first_name=first_name,
            last_name=last_name
        )
        PerfilEstudante.objects.create(
            user=user, 
            serie=serie,
            data_nascimento=data_nascimento
        )
        
        login(request, user)
        messages.success(request, f"Bem-vindo(a), {first_name}! Sua aventura começa agora.")
        return redirect(next_url)
        
    return render(request, "arkanos/auth/cadastro.html", {'next': next_url})

def logout_view(request):
    logout(request)
    return redirect('arkanos:home')

from datetime import date

def jogos_index(request):
    recommended_path = 'gramatica' # Default
    age = None
    
    if request.user.is_authenticated:
        try:
            perfil = request.user.perfilestudante
            if perfil.data_nascimento:
                today = date.today()
                age = today.year - perfil.data_nascimento.year - ((today.month, today.day) < (perfil.data_nascimento.month, perfil.data_nascimento.day))
                
                if age <= 9:
                    recommended_path = 'gramatica'
                elif age <= 12:
                    recommended_path = 'logica'
                else:
                    recommended_path = 'retorica'
        except PerfilEstudante.DoesNotExist:
            pass
            
    return render(request, "arkanos/jogos/dashboard.html", {
        'recommended_path': recommended_path,
        'age': age
    })
def jogos_gramatica(request): return render(request, "arkanos/jogos/gramatica.html")
def jogos_logica(request): return render(request, "arkanos/jogos/logica.html")
def jogos_retorica(request): return render(request, "arkanos/jogos/retorica.html")
