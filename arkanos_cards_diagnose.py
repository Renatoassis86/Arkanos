import os, sys, json, argparse, hashlib
from pathlib import Path
from datetime import datetime

EXPECTED_DIRS = [
    "data",
    "assets",
    "fonts",
    "out",
    "out/cards",
    "out/meta",
]

EXPECTED_FILES = [
    "data/orbes.json",   # catálogo dos orbes
    "assets/logo.png",   # logo que vai no card
]

ALLOWED_RARITIES = {"Comum", "Rara", "Épica", "Lendária"}

WIN_FALLBACK_LOGO = r"D:\repositorio_geral\repositorio_arkanos\static\img\icones\logo.png"

def sizeof_fmt(num, suffix="B"):
    for unit in ["","K","M","G","T","P"]:
        if abs(num) < 1024.0:
            return f"{num:3.1f}{unit}{suffix}"
        num /= 1024.0
    return f"{num:.1f}Y{suffix}"

def tree(path: Path, max_depth=4, prefix=""):
    """Imprime a árvore de diretórios até max_depth."""
    if max_depth < 0 or not path.exists():
        return
    entries = sorted(path.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    for i, p in enumerate(entries):
        connector = "└── " if i == len(entries)-1 else "├── "
        if p.is_dir():
            print(prefix + connector + f"[{p.name}]")
            tree(p, max_depth-1, prefix + ("    " if i == len(entries)-1 else "│   "))
        else:
            try:
                size = sizeof_fmt(p.stat().st_size)
            except Exception:
                size = "?"
            print(prefix + connector + f"{p.name}  ({size})")

def sha256sum(path: Path) -> str:
    try:
        h = hashlib.sha256()
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(65536), b""):
                h.update(chunk)
        return h.hexdigest()[:16]
    except Exception:
        return "—"

def validate_orbes_json(p: Path):
    errors = []
    warnings = []
    data = None
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        errors.append(f"Não foi possível ler JSON: {e}")
        return errors, warnings, None

    if not isinstance(data, list):
        errors.append("O arquivo deve conter uma LISTA de orbes.")
        return errors, warnings, None

    if len(data) == 0:
        warnings.append("Lista de orbes vazia.")
        return errors, warnings, data

    slugs = set()
    for idx, item in enumerate(data, 1):
        ctx = f"(item {idx})"
        if not isinstance(item, dict):
            errors.append(f"{ctx} não é um objeto.")
            continue

        required = ["slug","titulo","grupo","pontos","raridade","cores","simbolo","descricao"]
        for k in required:
            if k not in item:
                errors.append(f"{ctx} falta o campo obrigatório: {k}")
        if "slug" in item:
            if not item["slug"] or not isinstance(item["slug"], str):
                errors.append(f"{ctx} slug vazio ou inválido.")
            elif item["slug"] in slugs:
                errors.append(f"{ctx} slug duplicado: {item['slug']}")
            else:
                slugs.add(item["slug"])
        if "pontos" in item:
            try:
                if int(item["pontos"]) <= 0:
                    errors.append(f"{ctx} pontos deve ser > 0.")
            except Exception:
                errors.append(f"{ctx} pontos não é inteiro válido.")
        if "raridade" in item and item["raridade"] not in ALLOWED_RARITIES:
            warnings.append(f"{ctx} raridade '{item['raridade']}' fora do conjunto {sorted(ALLOWED_RARITIES)}")
        if "cores" in item:
            if not isinstance(item["cores"], list) or len(item["cores"]) < 2:
                warnings.append(f"{ctx} 'cores' deve ser lista com pelo menos 2 cores hex.")
    return errors, warnings, data

def main():
    ap = argparse.ArgumentParser(description="Diagnóstico do projeto de cards Arkanos")
    ap.add_argument("--root", default=".", help="Raiz do projeto (pasta onde estão data/, assets/, fonts/ etc.)")
    ap.add_argument("--depth", type=int, default=4, help="Profundidade da árvore a imprimir")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    print(f"📁 Raiz: {root}")
    print(f"🕒 Agora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("")

    if not root.exists():
        print("❌ Raiz não existe.")
        sys.exit(1)

    # 1) Árvore
    print("== ÁRVORE DE DIRETÓRIOS ==")
    tree(root, max_depth=args.depth)
    print("")

    # 2) Pastas esperadas
    print("== PASTAS ESPERADAS ==")
    ok_dirs, miss_dirs = [], []
    for d in EXPECTED_DIRS:
        p = root / d
        if p.exists() and p.is_dir():
            ok_dirs.append(d)
        else:
            miss_dirs.append(d)
    if ok_dirs:
        print("✅ Encontradas:", ", ".join(ok_dirs))
    if miss_dirs:
        print("⚠️ Faltando:", ", ".join(miss_dirs))
    print("")

    # 3) Arquivos esperados
    print("== ARQUIVOS ESSENCIAIS ==")
    logo_ok = False
    for f in EXPECTED_FILES:
        p = root / f
        if p.exists() and p.is_file():
            h = sha256sum(p)
            print(f"✅ {f} (sha256: {h})")
            if f.endswith("logo.png"):
                logo_ok = True
        else:
            print(f"⚠️ Não encontrado: {f}")
    # fallback logo no caminho do Windows que você citou
    if not logo_ok and Path(WIN_FALLBACK_LOGO).exists():
        print(f"ℹ️ Usando logo fallback: {WIN_FALLBACK_LOGO} (sha256: {sha256sum(Path(WIN_FALLBACK_LOGO))})")
        logo_ok = True
    if not logo_ok:
        print("❌ Logo não encontrada nem na pasta do projeto nem no caminho padrão informado.")
    print("")

    # 4) API Key
    print("== AMBIENTE ==")
    api = os.getenv("OPENAI_API_KEY")
    if api and len(api) > 12:
        print("✅ OPENAI_API_KEY detectada (prefixo):", api[:6]+"…"+api[-4:])
    else:
        print("⚠️ OPENAI_API_KEY NÃO encontrada. No Windows use:")
        print('   setx OPENAI_API_KEY "SUA_CHAVE_AQUI"')
        print("   (feche e reabra o terminal depois)")
    print("")

    # 5) Validar orbes.json
    print("== VALIDAÇÃO DO CATALOGO (data/orbes.json) ==")
    orbes_path = root / "data" / "orbes.json"
    if orbes_path.exists():
        errs, warns, data = validate_orbes_json(orbes_path)
        if warns:
            for w in warns:
                print("⚠️", w)
        if errs:
            for e in errs:
                print("❌", e)
        else:
            print(f"✅ Catálogo lido com {len(data)} orbes.")
            # resumo por grupo e raridade
            from collections import Counter
            c_group = Counter([o["grupo"] for o in data])
            c_rar = Counter([o["raridade"] for o in data])
            print("   • Por grupo:", dict(c_group))
            print("   • Por raridade:", dict(c_rar))
    else:
        print("❌ data/orbes.json não encontrado.")
    print("")

    # 6) Recomendações para a revelação (gamificação)
    print("== RECOMENDAÇÕES PARA REVELAÇÃO DE CARTAS ==")
    print("• Garanta que o backend registre metas atingidas (ex.: pontos cumulativos, badges, fases).")
    print("• Quando a meta é atingida, o frontend dispara a animação de revelação (CSS/WebGL/Lottie).")
    print("• A carta a exibir deve ser lida do catálogo (orbes.json) por SLUG, não por texto livre.")
    print("• O arquivo de imagem final do card deve estar em: out/cards/<slug>.png (ou .webp).")
    print("• Metadados (pontos, raridade, grupo) podem ser lidos de out/meta/<slug>.json para render no app.")
    print("")

    print("== CONCLUSÃO ==")
    print("Se quiser, rode também o gerador de cartas depois do diagnóstico.")
    print("Assim que você me enviar a SAÍDA deste diagnóstico, eu valido se a pasta de imagens está correta e o que ajustar.")
    print("")
    print("Dica: se quiser que eu gere um 'checklist de build' (ex.: script para criar as pastas que faltam), eu preparo na sequência.")
    
if __name__ == "__main__":
    main()
