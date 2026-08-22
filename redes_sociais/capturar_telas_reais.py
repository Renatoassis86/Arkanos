import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

def convert_to_jpeg(png_path, jpg_path):
    with Image.open(png_path) as img:
        rgb = img.convert("RGB")
        rgb.save(jpg_path, "JPEG", quality=95, optimize=True)

async def main():
    base_dir = Path(__file__).resolve().parent
    out_dir = base_dir / "prints_oficiais"
    out_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # 1. Capturas em Formato Desktop / Tablet HD (1440x900)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        print("1. Capturando Pagina Principal (Hero)...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await asyncio.sleep(1.5)
        
        # Hero
        hero_png = out_dir / "01_tela_principal_hero.png"
        hero_jpg = out_dir / "01_tela_principal_hero.jpg"
        await page.locator("main section").first.screenshot(path=str(hero_png))
        convert_to_jpeg(hero_png, hero_jpg)
        if hero_png.exists(): hero_png.unlink()
        print("  [OK] 01_tela_principal_hero.jpg")

        # Seção Os Jogos na Landing
        print("2. Capturando Secao Os Jogos (Landing)...")
        jogos_png = out_dir / "02_secao_jogos_landing.png"
        jogos_jpg = out_dir / "02_secao_jogos_landing.jpg"
        await page.locator("#jogos").screenshot(path=str(jogos_png))
        convert_to_jpeg(jogos_png, jogos_jpg)
        if jogos_png.exists(): jogos_png.unlink()
        print("  [OK] 02_secao_jogos_landing.jpg")

        # 3. Jogo Radix (Tela de Início / Séries)
        print("3. Capturando Radix - Tela Inicial e Selecao de Series...")
        await page.goto("http://localhost:3000/radix", wait_until="networkidle")
        await asyncio.sleep(1.5)
        radix_intro_png = out_dir / "03_radix_inicio_series.png"
        radix_intro_jpg = out_dir / "03_radix_inicio_series.jpg"
        await page.screenshot(path=str(radix_intro_png))
        convert_to_jpeg(radix_intro_png, radix_intro_jpg)
        if radix_intro_png.exists(): radix_intro_png.unlink()
        print("  [OK] 03_radix_inicio_series.jpg")

        # 4. Jogo Radix - Em Jogo (Soletração Ativa)
        print("4. Capturando Radix - Em Jogo (Soletração)...")
        iniciar_btn = page.locator("button:has-text('Iniciar Rodada')")
        if await iniciar_btn.count() > 0:
            await iniciar_btn.click()
            await asyncio.sleep(1.5)
            
            tutorial_btn = page.locator("button:has-text('Entendido')")
            if await tutorial_btn.count() > 0:
                await tutorial_btn.click()
                await asyncio.sleep(1.5)
                
            radix_game_png = out_dir / "04_radix_soletração_em_jogo.png"
            radix_game_jpg = out_dir / "04_radix_soletração_em_jogo.jpg"
            await page.screenshot(path=str(radix_game_png))
            convert_to_jpeg(radix_game_png, radix_game_jpg)
            if radix_game_png.exists(): radix_game_png.unlink()
            print("  [OK] 04_radix_soletração_em_jogo.jpg")

        # 5. Jogo Spelling Bee (Tela Inicial)
        print("5. Capturando Spelling Bee - Tela Inicial...")
        await page.goto("http://localhost:3000/spelling-bee", wait_until="networkidle")
        await asyncio.sleep(1.5)
        spelling_intro_png = out_dir / "05_spelling_bee_inicio.png"
        spelling_intro_jpg = out_dir / "05_spelling_bee_inicio.jpg"
        await page.screenshot(path=str(spelling_intro_png))
        convert_to_jpeg(spelling_intro_png, spelling_intro_jpg)
        if spelling_intro_png.exists(): spelling_intro_png.unlink()
        print("  [OK] 05_spelling_bee_inicio.jpg")

        # 6. Jogo Spelling Bee - Em Jogo (Soletração Ativa)
        print("6. Capturando Spelling Bee - Em Jogo...")
        iniciar_spelling = page.locator("button:has-text('Iniciar Rodada')")
        if await iniciar_spelling.count() > 0:
            await iniciar_spelling.click()
            await asyncio.sleep(1.5)
            
            tutorial_btn = page.locator("button:has-text('Understood')")
            if await tutorial_btn.count() > 0:
                await tutorial_btn.click()
                await asyncio.sleep(1.5)
                
            spelling_game_png = out_dir / "06_spelling_bee_em_jogo.png"
            spelling_game_jpg = out_dir / "06_spelling_bee_em_jogo.jpg"
            await page.screenshot(path=str(spelling_game_png))
            convert_to_jpeg(spelling_game_png, spelling_game_jpg)
            if spelling_game_png.exists(): spelling_game_png.unlink()
            print("  [OK] 06_spelling_bee_em_jogo.jpg")

        # 7. Desafio dos Sábios (Quiz Pedagógico)
        print("7. Capturando Desafio dos Sabios...")
        await page.goto("http://localhost:3000/desafio", wait_until="networkidle")
        await asyncio.sleep(1.5)
        desafio_png = out_dir / "07_desafio_dos_sabios.png"
        desafio_jpg = out_dir / "07_desafio_dos_sabios.jpg"
        await page.screenshot(path=str(desafio_png))
        convert_to_jpeg(desafio_png, desafio_jpg)
        if desafio_png.exists(): desafio_png.unlink()
        print("  [OK] 07_desafio_dos_sabios.jpg")

        # 8. Universo das 7 Artes Liberais
        print("8. Capturando 7 Artes Liberais...")
        await page.goto("http://localhost:3000/#universo", wait_until="networkidle")
        await asyncio.sleep(1.5)
        universo_png = out_dir / "08_universo_7_artes.png"
        universo_jpg = out_dir / "08_universo_7_artes.jpg"
        universo_elem = page.locator("#universo")
        if await universo_elem.count() > 0:
            await universo_elem.screenshot(path=str(universo_png))
            convert_to_jpeg(universo_png, universo_jpg)
            if universo_png.exists(): universo_png.unlink()
            print("  [OK] 08_universo_7_artes.jpg")

        # 9. Versão Mobile (Smartphone 390x844 iPhone)
        print("9. Capturando Versoes Mobile dos Jogos (Radix & Spelling)...")
        mobile_context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
            is_mobile=True
        )
        m_page = await mobile_context.new_page()
        
        # Radix Mobile
        await m_page.goto("http://localhost:3000/radix", wait_until="networkidle")
        await asyncio.sleep(1)
        m_iniciar = m_page.locator("button:has-text('Iniciar Rodada')")
        if await m_iniciar.count() > 0:
            await m_iniciar.click()
            await asyncio.sleep(1)
            m_tut = m_page.locator("button:has-text('Entendido')")
            if await m_tut.count() > 0:
                await m_tut.click()
                await asyncio.sleep(1)
            
        m_radix_png = out_dir / "09_mobile_radix_soletração.png"
        m_radix_jpg = out_dir / "09_mobile_radix_soletração.jpg"
        await m_page.screenshot(path=str(m_radix_png))
        convert_to_jpeg(m_radix_png, m_radix_jpg)
        if m_radix_png.exists(): m_radix_png.unlink()
        print("  [OK] 09_mobile_radix_soletração.jpg")

        # Spelling Bee Mobile
        await m_page.goto("http://localhost:3000/spelling-bee", wait_until="networkidle")
        await asyncio.sleep(1)
        m_iniciar_sp = m_page.locator("button:has-text('Iniciar Rodada')")
        if await m_iniciar_sp.count() > 0:
            await m_iniciar_sp.click()
            await asyncio.sleep(1)
            m_tut_sp = m_page.locator("button:has-text('Understood')")
            if await m_tut_sp.count() > 0:
                await m_tut_sp.click()
                await asyncio.sleep(1)
                
        m_spell_png = out_dir / "10_mobile_spelling_bee.png"
        m_spell_jpg = out_dir / "10_mobile_spelling_bee.jpg"
        await m_page.screenshot(path=str(m_spell_png))
        convert_to_jpeg(m_spell_png, m_spell_jpg)
        if m_spell_png.exists(): m_spell_png.unlink()
        print("  [OK] 10_mobile_spelling_bee.jpg")

        await browser.close()
        print("\nTodas as capturas REAIS foram concluidas com sucesso!")

if __name__ == "__main__":
    asyncio.run(main())
