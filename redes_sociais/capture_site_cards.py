import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image, ImageFilter, ImageEnhance

def make_story_card(source_img_path, output_path, title_badge, caption_text):
    """Cria um card 1080x1920 para Stories com a captura exata da tela."""
    with Image.open(source_img_path) as src:
        src = src.convert("RGB")
        target_w, target_h = 1080, 1920
        
        # Fundo: versão borrada e escurecida da própria captura
        bg = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
        bg = bg.filter(ImageFilter.GaussianBlur(radius=35))
        enhancer = ImageEnhance.Brightness(bg)
        bg = enhancer.enhance(0.45)
        
        # Redimensiona a captura para caber no centro do Story (largura de ~960px)
        content_w = 980
        aspect = src.height / src.width
        content_h = int(content_w * aspect)
        
        # Se for muito alta, limita a altura máxima
        if content_h > 1300:
            content_h = 1300
            content_w = int(content_h / aspect)
            
        screenshot_resized = src.resize((content_w, content_h), Image.Resampling.LANCZOS)
        
        # Cola no centro
        pos_x = (target_w - content_w) // 2
        pos_y = (target_h - content_h) // 2
        
        bg.paste(screenshot_resized, (pos_x, pos_y))
        bg.save(output_path, "JPEG", quality=95, optimize=True)

def make_feed_card(source_img_path, output_path):
    """Cria um card 1080x1080 (quadrado) com a captura do site."""
    with Image.open(source_img_path) as src:
        src = src.convert("RGB")
        target_size = 1080
        
        # Fundo desfocado
        bg = src.resize((target_size, target_size), Image.Resampling.LANCZOS)
        bg = bg.filter(ImageFilter.GaussianBlur(radius=25))
        enhancer = ImageEnhance.Brightness(bg)
        bg = enhancer.enhance(0.4)
        
        # Ajusta captura para caber no quadrado
        aspect = src.width / src.height
        if aspect >= 1.0: # Paisagem
            content_w = 1000
            content_h = int(content_w / aspect)
        else: # Retrato
            content_h = 1000
            content_w = int(content_h * aspect)
            
        screenshot_resized = src.resize((content_w, content_h), Image.Resampling.LANCZOS)
        pos_x = (target_size - content_w) // 2
        pos_y = (target_size - content_h) // 2
        
        bg.paste(screenshot_resized, (pos_x, pos_y))
        bg.save(output_path, "JPEG", quality=95, optimize=True)

async def main():
    base_dir = Path(__file__).resolve().parent
    raw_dir = base_dir / "prints_brutos"
    raw_dir.mkdir(exist_ok=True)
    
    out_dir = base_dir / "cards_jpeg"
    out_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        # Browser com resolução desktop para capturas perfeitas
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        # 1. CAPTURA DO HERO (Página Principal)
        print("Capturando Tela 1: Hero Principal...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await asyncio.sleep(1)
        hero_raw = raw_dir / "hero_raw.png"
        hero_elem = page.locator("main section").first
        if await hero_elem.count() > 0:
            await hero_elem.screenshot(path=str(hero_raw))
        else:
            await page.screenshot(path=str(hero_raw))

        # 2. CAPTURA DOS JOGOS (Seção Jogos na Landing)
        print("Capturando Tela 2: Secao Os Jogos...")
        games_raw = raw_dir / "games_raw.png"
        games_elem = page.locator("#jogos")
        if await games_elem.count() > 0:
            await games_elem.screenshot(path=str(games_raw))
        else:
            await page.screenshot(path=str(games_raw))

        # 3. CAPTURA DO RADIX (Tela de Seleção de Série & Início)
        print("Capturando Tela 3: Jogo Radix (Português)...")
        await page.goto("http://localhost:3000/radix", wait_until="networkidle")
        await asyncio.sleep(1)
        radix_raw = raw_dir / "radix_raw.png"
        await page.screenshot(path=str(radix_raw))

        # 4. CAPTURA DO SPELLING BEE (Inglês)
        print("Capturando Tela 4: Spelling Bee (Inglês)...")
        await page.goto("http://localhost:3000/spelling-bee", wait_until="networkidle")
        await asyncio.sleep(1)
        spelling_raw = raw_dir / "spelling_raw.png"
        await page.screenshot(path=str(spelling_raw))

        # 5. CAPTURA DA SEÇÃO DAS 7 ARTES LIBERAIS (Universo/Filosofia)
        print("Capturando Tela 5: 7 Artes Liberais...")
        await page.goto("http://localhost:3000/#universo", wait_until="networkidle")
        await asyncio.sleep(1)
        universo_raw = raw_dir / "universo_raw.png"
        universo_elem = page.locator("#universo")
        if await universo_elem.count() > 0:
            await universo_elem.screenshot(path=str(universo_raw))
        else:
            await page.screenshot(path=str(universo_raw))

        await browser.close()

    print("\nProcessando e gerando cards JPEG finais...")

    # Gera Stories (9:16)
    make_story_card(hero_raw, out_dir / "story_1_pagina_principal.jpg", "Arkanos", "Educação Clássica")
    make_story_card(games_raw, out_dir / "story_2_salao_dos_jogos.jpg", "Os Jogos", "Radix e Spelling")
    make_story_card(radix_raw, out_dir / "story_3_jogo_radix.jpg", "Radix", "Soletração em Português")
    make_story_card(spelling_raw, out_dir / "story_4_spelling_bee.jpg", "Spelling Bee", "Inglês com Fonética")

    # Gera Feed / LinkedIn (1:1)
    make_feed_card(hero_raw, out_dir / "linkedin_1_pagina_principal.jpg")
    make_feed_card(games_raw, out_dir / "linkedin_2_salao_dos_jogos.jpg")
    make_feed_card(radix_raw, out_dir / "linkedin_3_jogo_radix.jpg")
    make_feed_card(universo_raw, out_dir / "linkedin_4_artes_liberais.jpg")

    print(f"\n[SUCESSO] Todos os cards baseados em capturas REAIS do site foram salvos em:\n{out_dir}")

if __name__ == "__main__":
    asyncio.run(main())
