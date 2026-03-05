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
        nome = request.POST.get('nome')
        email = request.POST.get('email')
        password = request.POST.get('password')
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
            
        user = User.objects.create_user(username=username, email=email, password=password, first_name=nome)
        PerfilEstudante.objects.create(user=user, serie=serie)
        
        login(request, user)
        messages.success(request, f"Bem-vindo(a), {nome}! Sua aventura começa agora.")
        return redirect(next_url)
        
    return render(request, "arkanos/auth/cadastro.html", {'next': next_url})

def logout_view(request):
    logout(request)
    return redirect('arkanos:home')

def jogos_index(request): return render(request, "arkanos/jogos/dashboard.html")
def jogos_gramatica(request): return render(request, "arkanos/jogos/gramatica.html")
def jogos_logica(request): return render(request, "arkanos/jogos/logica.html")
def jogos_retorica(request): return render(request, "arkanos/jogos/retorica.html")
