import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image, ImageFilter, ImageEnhance

def format_slide(src_path, out_path, target_w, target_h):
    with Image.open(src_path) as src:
        src = src.convert("RGB")
        
        # Background blur elegante
        bg = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
        bg = bg.filter(ImageFilter.GaussianBlur(radius=25))
        enhancer = ImageEnhance.Brightness(bg)
        bg = enhancer.enhance(0.4)
        
        # Redimensiona para caber com margem
        pad = 40
        max_w = target_w - (pad * 2)
        max_h = target_h - (pad * 2)
        
        aspect = src.width / src.height
        
        # Calcula largura e altura proporcionais
        w = max_w
        h = int(w / aspect)
        if h > max_h:
            h = max_h
            w = int(h * aspect)
            
        resized = src.resize((w, h), Image.Resampling.LANCZOS)
        pos_x = (target_w - w) // 2
        pos_y = (target_h - h) // 2
        
        bg.paste(resized, (pos_x, pos_y))
        bg.save(out_path, "JPEG", quality=95, optimize=True)

async def main():
    base_dir = Path(__file__).resolve().parent
    temp_dir = base_dir / "temp_screens"
    temp_dir.mkdir(exist_ok=True)

    insta_dir = base_dir / "carrossel_instagram"
    insta_dir.mkdir(exist_ok=True)

    linkedin_dir = base_dir / "carrossel_linkedin"
    linkedin_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # 1. Desktop HD context
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await ctx.new_page()

        # 1. Home / Hero
        print("1. Capturando Tela Inicial (Hero)...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await asyncio.sleep(1)
        hero_raw = temp_dir / "hero.png"
        await page.screenshot(path=str(hero_raw))

        # 2. Scroll para a Seção de Jogos na Home
        print("2. Capturando Secao de Jogos na Landing...")
        await page.evaluate("window.scrollTo(0, 1400)")
        await asyncio.sleep(1)
        jogos_raw = temp_dir / "jogos.png"
        await page.screenshot(path=str(jogos_raw))

        # 3. Radix (Início)
        print("3. Capturando Jogo Radix (Tela de Início)...")
        await page.goto("http://localhost:3000/radix", wait_until="networkidle")
        await asyncio.sleep(1)
        radix_intro_raw = temp_dir / "radix_intro.png"
        await page.screenshot(path=str(radix_intro_raw))

        # 4. Radix (Soletração Ativa)
        print("4. Capturando Radix (Soletração)...")
        btn = page.locator("button:has-text('Iniciar Rodada')")
        if await btn.count() > 0:
            await btn.click()
            await asyncio.sleep(1)
            tut = page.locator("button:has-text('Entendido')")
            if await tut.count() > 0:
                await tut.click()
                await asyncio.sleep(1)
        radix_play_raw = temp_dir / "radix_play.png"
        await page.screenshot(path=str(radix_play_raw))

        # 5. Spelling Bee (Inglês)
        print("5. Capturando Spelling Bee...")
        await page.goto("http://localhost:3000/spelling-bee", wait_until="networkidle")
        await asyncio.sleep(1)
        btn_sp = page.locator("button:has-text('Iniciar Rodada')")
        if await btn_sp.count() > 0:
            await btn_sp.click()
            await asyncio.sleep(1)
            tut_sp = page.locator("button:has-text('Understood')")
            if await tut_sp.count() > 0:
                await tut_sp.click()
                await asyncio.sleep(1)
        spelling_raw = temp_dir / "spelling.png"
        await page.screenshot(path=str(spelling_raw))

        # 6. Desafio dos Sábios (Quiz)
        print("6. Capturando Desafio dos Sabios...")
        await page.goto("http://localhost:3000/desafio", wait_until="networkidle")
        await asyncio.sleep(1)
        desafio_raw = temp_dir / "desafio.png"
        await page.screenshot(path=str(desafio_raw))

        # 7. Filosofia das 7 Artes Liberais
        print("7. Capturando 7 Artes Liberais...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await page.evaluate("window.scrollTo(0, 2400)")
        await asyncio.sleep(1)
        universo_raw = temp_dir / "universo.png"
        await page.screenshot(path=str(universo_raw))

        await browser.close()

    # Formata Carrossel Instagram (1080x1350 - 4:5 Retrato)
    print("\nGerando Carrossel Instagram (1080x1350)...")
    format_slide(hero_raw, insta_dir / "01_capa_arkanos.jpg", 1080, 1350)
    format_slide(jogos_raw, insta_dir / "02_secao_jogos.jpg", 1080, 1350)
    format_slide(radix_intro_raw, insta_dir / "03_radix_series.jpg", 1080, 1350)
    format_slide(radix_play_raw, insta_dir / "04_radix_soletração_voz.jpg", 1080, 1350)
    format_slide(spelling_raw, insta_dir / "05_spelling_bee_ingles.jpg", 1080, 1350)
    format_slide(desafio_raw, insta_dir / "06_desafio_sabios_quiz.jpg", 1080, 1350)
    format_slide(universo_raw, insta_dir / "07_universo_7_artes.jpg", 1080, 1350)

    # Formata Carrossel LinkedIn (1080x1080 - 1:1 Quadrado)
    print("Gerando Carrossel LinkedIn (1080x1080)...")
    format_slide(hero_raw, linkedin_dir / "01_capa_iniciativa.jpg", 1080, 1080)
    format_slide(jogos_raw, linkedin_dir / "02_secao_jogos.jpg", 1080, 1080)
    format_slide(radix_play_raw, linkedin_dir / "03_radix_soletração.jpg", 1080, 1080)
    format_slide(spelling_raw, linkedin_dir / "04_spelling_bee.jpg", 1080, 1080)
    format_slide(desafio_raw, linkedin_dir / "05_desafio_sabios.jpg", 1080, 1080)
    format_slide(universo_raw, linkedin_dir / "06_filosofia_7_artes.jpg", 1080, 1080)

    print("\n[SUCESSO] Todos os carrosséis foram criados com capturas reais do site!")

if __name__ == "__main__":
    asyncio.run(main())
