with open('d:/repositorio_geral/repositorio_arkanos/templates/desafio_dos_sabios/index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if 'Bem-vindo' in line:
            print(f"{i}: {line.strip()}")
