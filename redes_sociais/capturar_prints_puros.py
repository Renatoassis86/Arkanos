import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

def save_image(png_path, out_jpg_path):
    with Image.open(png_path) as img:
        rgb = img.convert("RGB")
        rgb.save(out_jpg_path, "JPEG", quality=95, optimize=True)

async def main():
    base_dir = Path(__file__).resolve().parent
    
    insta_dir = base_dir / "carrossel_instagram"
    insta_dir.mkdir(exist_ok=True)
    
    linkedin_dir = base_dir / "carrossel_linkedin"
    linkedin_dir.mkdir(exist_ok=True)

    temp_png = base_dir / "temp.png"

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # Resolução padrão desktop limpa
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        # 1. TELA PRINCIPAL (HERO)
        print("1. Capturando Tela Principal...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "01_tela_principal.jpg")
        save_image(temp_png, linkedin_dir / "01_tela_principal.jpg")

        # 2. SEÇÃO DOS JOGOS NA LANDING
        print("2. Capturando Secao dos Jogos...")
        await page.evaluate("window.scrollTo(0, 1100)")
        await asyncio.sleep(1)
        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "02_secao_jogos.jpg")
        save_image(temp_png, linkedin_dir / "02_secao_jogos.jpg")

        # 3. SEÇÃO AS 7 ARTES LIBERAIS
        print("3. Capturando 7 Artes Liberais...")
        await page.evaluate("window.scrollTo(0, 2200)")
        await asyncio.sleep(1)
        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "03_artes_liberais.jpg")
        save_image(temp_png, linkedin_dir / "03_artes_liberais.jpg")

        # 4. JOGO RADIX (SOLETRAÇÃO EM PORTUGUÊS)
        print("4. Capturando Jogo Radix...")
        await page.goto("http://localhost:3000/radix", wait_until="networkidle")
        await asyncio.sleep(1)
        
        btn = page.locator("button:has-text('Iniciar Rodada')")
        if await btn.count() > 0:
            await btn.click()
            await asyncio.sleep(1)
            tut = page.locator("button:has-text('Entendido')")
            if await tut.count() > 0:
                await tut.click()
                await asyncio.sleep(1)

        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "04_jogo_radix.jpg")
        save_image(temp_png, linkedin_dir / "04_jogo_radix.jpg")

        # 5. JOGO SPELLING BEE (INGLÊS)
        print("5. Capturando Jogo Spelling Bee...")
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

        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "05_jogo_spelling_bee.jpg")
        save_image(temp_png, linkedin_dir / "05_jogo_spelling_bee.jpg")

        # 6. DESAFIO DOS SÁBIOS (QUIZZES)
        print("6. Capturando Desafio dos Sabios...")
        await page.goto("http://localhost:3000/desafio", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "06_desafio_sabios.jpg")
        save_image(temp_png, linkedin_dir / "06_desafio_sabios.jpg")

        # 7. DASHBOARD / MAPA DA JORNADA
        print("7. Capturando Painel dos Jogos...")
        await page.goto("http://localhost:3000/jogos", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=str(temp_png))
        save_image(temp_png, insta_dir / "07_painel_jogos.jpg")
        save_image(temp_png, linkedin_dir / "07_painel_jogos.jpg")

        if temp_png.exists():
            temp_png.unlink()

        await browser.close()
        print("\n[OK] Capturas puras salvas com sucesso!")

if __name__ == "__main__":
    asyncio.run(main())
