import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont

# Dados de cada módulo do site
MODULES = [
    {
        "id": "hero",
        "url": "http://localhost:3000/",
        "selector": "main section:first-of-type",
        "module_num": "01",
        "module_title": "MANUAL & PLATAFORMA ARKANOS",
        "highlight": "Cada estudante é único, sua jornada de saber também",
        "description": "Desenvolvi a plataforma para dar propósito e estrutura à rotina diária de estudos dos meus filhos."
    },
    {
        "id": "trivium",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('As 7 Artes Liberais')",
        "module_num": "02",
        "module_title": "AS 7 ARTES LIBERAIS (TRIVIUM & QUADRIVIUM)",
        "highlight": "Gramática, Lógica, Retórica e Ciências",
        "description": "Resgate da Educação Clássica adaptada para o dia a dia, ensinando a pensar com clareza."
    },
    {
        "id": "jogos",
        "url": "http://localhost:3000/",
        "selector": "section#jogos",
        "module_num": "03",
        "module_title": "SALÃO DOS JOGOS FORMATIVOS",
        "highlight": "Radix, Spelling Bee & Desafio dos Sábios",
        "description": "Três ambientes interativos onde o dever de casa vira missão com áudio e desafios diários."
    },
    {
        "id": "radix",
        "url": "http://localhost:3000/radix",
        "selector": "main",
        "module_num": "04",
        "module_title": "MÓDULO RADIX · SOLETRAÇÃO EM PORTUGUÊS",
        "highlight": "298 palavras oficiais por série escolar (3º ao 5º ano)",
        "description": "Reconhecimento de voz fonético calibrado letra a letra, com repetição pura, significado e frases."
    },
    {
        "id": "spelling",
        "url": "http://localhost:3000/spelling-bee",
        "selector": "main",
        "module_num": "05",
        "module_title": "MÓDULO SPELLING BEE · INGLÊS",
        "highlight": "367 palavras em inglês com fonética e áudio",
        "description": "Treinamento diário de pronúncia e soletração em inglês com inteligência artificial e feedback imediato."
    },
    {
        "id": "desafio",
        "url": "http://localhost:3000/desafio",
        "selector": "main",
        "module_num": "06",
        "module_title": "DESAFIO DOS SÁBIOS · QUIZZES FORMATIVOS",
        "highlight": "Avaliação pedagógica por Teoria de Resposta ao Item (TRI)",
        "description": "Perguntas interdisciplinares que medem a habilidade real e estimulam a curiosidade saudável."
    },
    {
        "id": "gamificacao",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('Engajamento com propósito')",
        "module_num": "07",
        "module_title": "GAMIFICAÇÃO DA VIRTUDE · ORBES & ARKS",
        "highlight": "Pontuação pelo maior mérito e constância",
        "description": "Sem vícios: o progresso dos meus filhos é recompensado com orbes, medalhas e títulos formativos."
    }
]

def build_slide(screenshot_path, mod, out_path, target_w, target_h):
    # Cria tela de fundo no tom nobre do Arkanos (#0b0f19 e degradê sutil)
    canvas = Image.new("RGB", (target_w, target_h), (11, 15, 25))
    draw = ImageDraw.Draw(canvas)

    # 1. Faixa Superior (Header)
    header_h = 160 if target_h == 1350 else 140
    # Degradê / Card no topo
    draw.rectangle([(20, 20), (target_w - 20, header_h)], fill=(23, 37, 84), outline=(59, 130, 246), width=2)
    
    # Textos do Header
    badge_text = "🏛️ INICIATIVA PARA A EDUCAÇÃO DOS MEUS FILHOS • ARKOS INTELLIGENCE"
    title_text = f"MÓDULO {mod['module_num']} · {mod['module_title']}"
    
    # 2. Faixa Inferior (Footer)
    footer_h = 140 if target_h == 1350 else 120
    footer_top = target_h - footer_h - 20
    draw.rectangle([(20, footer_top), (target_w - 20, target_h - 20)], fill=(15, 23, 42), outline=(59, 130, 246), width=2)

    # 3. Inserção da Captura Real do Site no Centro
    with Image.open(screenshot_path) as src:
        src = src.convert("RGB")
        avail_w = target_w - 40
        avail_h = footer_top - header_h - 30
        
        # Redimensiona a captura para caber mantendo proporção
        aspect = src.width / src.height
        w = avail_w
        h = int(w / aspect)
        if h > avail_h:
            h = avail_h
            w = int(h * aspect)
            
        screenshot_resized = src.resize((w, h), Image.Resampling.LANCZOS)
        pos_x = (target_w - w) // 2
        pos_y = header_h + 20 + (avail_h - h) // 2
        
        # Borda na captura
        draw.rectangle([(pos_x - 3, pos_y - 3), (pos_x + w + 3, pos_y + h + 3)], outline=(100, 116, 139), width=2)
        canvas.paste(screenshot_resized, (pos_x, pos_y))

    # Salva imagem em JPEG de alta qualidade
    canvas.save(out_path, "JPEG", quality=95, optimize=True)

async def main():
    base_dir = Path(__file__).resolve().parent
    temp_dir = base_dir / "raw_modules"
    temp_dir.mkdir(exist_ok=True)

    insta_dir = base_dir / "carrossel_instagram"
    insta_dir.mkdir(exist_ok=True)

    linkedin_dir = base_dir / "carrossel_linkedin"
    linkedin_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        for mod in MODULES:
            print(f"Capturando modulo {mod['module_num']}: {mod['module_title']}...")
            await page.goto(mod["url"], wait_until="networkidle")
            await asyncio.sleep(1.5)
            
            raw_path = temp_dir / f"{mod['id']}.png"
            
            # Se for Radix ou Spelling, aciona para mostrar em jogo
            if mod["id"] in ["radix", "spelling"]:
                btn = page.locator("button:has-text('Iniciar Rodada')")
                if await btn.count() > 0:
                    await btn.click()
                    await asyncio.sleep(1)
                    tut = page.locator("button:has-text('Entendido'), button:has-text('Understood')")
                    if await tut.count() > 0:
                        await tut.first.click()
                        await asyncio.sleep(1)
            
            loc = page.locator(mod["selector"])
            if await loc.count() > 0:
                await loc.first.scroll_into_view_if_needed()
                await asyncio.sleep(1)
                await loc.first.screenshot(path=str(raw_path))
            else:
                await page.screenshot(path=str(raw_path))

            # Gera Slide do Instagram (1080x1350 - 4:5 Retrato)
            insta_slide = insta_dir / f"slide_{mod['module_num']}_{mod['id']}.jpg"
            build_slide(raw_path, mod, insta_slide, 1080, 1350)
            
            # Gera Slide do LinkedIn (1080x1080 - 1:1 Quadrado)
            linkedin_slide = linkedin_dir / f"slide_{mod['module_num']}_{mod['id']}.jpg"
            build_slide(raw_path, mod, linkedin_slide, 1080, 1080)
            
            print(f"  [OK] Gerado Slide {mod['module_num']} para Instagram e LinkedIn!")

        await browser.close()
        print("\n[SUCESSO COMPLETO] Todos os cards com os modulos REAIS do site foram gerados!")

if __name__ == "__main__":
    asyncio.run(main())
