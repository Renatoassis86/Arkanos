import os
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

async def main():
    base_dir = Path(__file__).resolve().parent
    html_path = (base_dir / "index.html").as_uri()
    
    output_dir = base_dir / "cards_jpeg"
    output_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1920, "height": 2600}, device_scale_factor=2)
        await page.goto(html_path, wait_until="networkidle")
        await asyncio.sleep(2)

        targets = [
            ("story-1", "story_1_dever_de_casa", 1080, 1920),
            ("story-2", "story_2_soletra_radix", 1080, 1920),
            ("story-3", "story_3_spelling_quiz", 1080, 1920),
            ("story-4", "story_4_link_gratis", 1080, 1920),
            ("feed-1", "linkedin_1_tecnologia_educacao", 1080, 1080),
            ("feed-2", "linkedin_2_verdade_bondade_beleza", 1080, 1080),
        ]

        for elem_id, name, target_w, target_h in targets:
            loc = page.locator(f"#{elem_id}")
            png_path = output_dir / f"{name}.png"
            jpg_path = output_dir / f"{name}.jpg"
            
            await loc.screenshot(path=str(png_path))
            
            with Image.open(png_path) as img:
                rgb_img = img.convert("RGB")
                resized = rgb_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
                resized.save(jpg_path, "JPEG", quality=95, optimize=True)
            
            if png_path.exists():
                png_path.unlink()
                
            print(f"[OK] Gerado: {jpg_path.name} ({target_w}x{target_h})")

        await browser.close()
        print("\nSucesso: Todos os cards JPEG foram gerados!")

if __name__ == "__main__":
    asyncio.run(main())
