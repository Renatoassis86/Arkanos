import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

MODULES = [
    {
        "id": "01_capa_arkanos",
        "url": "http://localhost:3000/",
        "selector": "main section:first-of-type",
        "num": "01",
        "tag": "PLATAFORMA & MANIFESTO",
        "title": "A Jornada do Saber dos Meus Filhos",
        "subtitle": "Como usei tecnologia para transformar o dever de casa e os estudos em uma grande jornada de virtude e aprendizado.",
        "footer": "arkanos.arkosintelligence.com · Educação Clássica no Dia a Dia"
    },
    {
        "id": "02_artes_liberais",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('As 7 Artes Liberais')",
        "num": "02",
        "tag": "BASE PEDAGÓGICA",
        "title": "Trivium & Quadrivium Aplicados",
        "subtitle": "Gramática, Lógica, Retórica e Ciências: ensinando as crianças a pensar com clareza e autonomia desde cedo.",
        "footer": "Cultivando a Verdade, a Bondade e a Beleza em cada atividade"
    },
    {
        "id": "03_salao_dos_jogos",
        "url": "http://localhost:3000/",
        "selector": "section#jogos",
        "num": "03",
        "tag": "ESTUDO GAMIFICADO",
        "title": "O Salão dos Jogos Formativos",
        "subtitle": "Três ambientes interativos onde o dever de casa e o estudo diário viram desafios práticos com reconhecimento de voz.",
        "footer": "Radix · Spelling Bee · Desafio dos Sábios"
    },
    {
        "id": "04_radix_soletração",
        "url": "http://localhost:3000/radix",
        "selector": "main",
        "num": "04",
        "tag": "PORTUGUÊS & FONÉTICA",
        "title": "Módulo Radix · Concurso de Soletração",
        "subtitle": "298 palavras oficiais por série escolar (3º ao 5º ano), síntese de áudio, frases exemplo e captação de voz sem ruído.",
        "footer": "Treinamento diário de ortografia e vocabulário em Língua Portuguesa"
    },
    {
        "id": "05_spelling_bee",
        "url": "http://localhost:3000/spelling-bee",
        "selector": "main",
        "num": "05",
        "tag": "INGLÊS & PRONÚNCIA",
        "title": "Módulo Spelling Bee · Vocabulário em Inglês",
        "subtitle": "367 palavras em inglês divididas por níveis escolares com pronúncia nativa e soletração letra a letra.",
        "footer": "Aprendizado bilíngue prático e divertido na rotina de casa"
    },
    {
        "id": "06_desafio_sabios",
        "url": "http://localhost:3000/desafio",
        "selector": "main",
        "num": "06",
        "tag": "RACIOCÍNIO & TRI",
        "title": "Módulo Desafio dos Sábios · Quizzes",
        "subtitle": "Avaliação pedagógica pela Teoria de Resposta ao Item (TRI) em História, Ciências e Lógica com a Crônica do Guardião.",
        "footer": "Medição real do conhecimento e evolução constante"
    },
    {
        "id": "07_gamificacao_virtude",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('Engajamento com propósito')",
        "num": "07",
        "tag": "RECONHECIMENTO & MÉRITO",
        "title": "Gamificação da Virtude · Orbes e Arks",
        "subtitle": "Sem mecânicas viciosas: cada vitória celebra o esforço e a constância diária dos meus filhos com títulos de honra.",
        "footer": "Acesse gratuitamente: arkanos.arkosintelligence.com"
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {{ font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0; background-color: #080c16; color: #f8fafc; }}
    .font-cinzel {{ font-family: 'Cinzel', serif; }}
  </style>
</head>
<body class="w-[{w}px] h-[{h}px] p-8 flex flex-col justify-between box-border bg-gradient-to-b from-[#0b1329] via-[#080c16] to-[#04060b]">
  
  <!-- TOPO: BADGE & CABEÇALHO -->
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-black tracking-wider uppercase">
        <span>🏛️ INICIATIVA DE PAI PARA FILHOS</span>
        <span class="text-amber-500">•</span>
        <span>ARKOS INTELLIGENCE</span>
      </div>
      <span class="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black">
        {num} / 07
      </span>
    </div>

    <div class="space-y-1">
      <span class="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">{tag}</span>
      <h1 class="text-2xl font-black text-white leading-tight tracking-tight">{title}</h1>
      <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">{subtitle}</p>
    </div>
  </div>

  <!-- CENTRO: CAPTURA DO SITE -->
  <div class="my-auto rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-slate-950 flex items-center justify-center p-1">
    <img src="{img_path}" class="w-full h-auto max-h-[{img_max_h}px] object-cover rounded-xl" />
  </div>

  <!-- RODAPÉ -->
  <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
    <span class="text-slate-400 font-medium">{footer}</span>
    <span class="text-amber-300 font-black text-[11px] uppercase tracking-wider">Arkanos · Plataforma Educativa</span>
  </div>

</body>
</html>
"""

async def main():
    base_dir = Path(__file__).resolve().parent
    raw_dir = base_dir / "temp_raw_screens"
    raw_dir.mkdir(exist_ok=True)
    
    html_temp_dir = base_dir / "temp_rendered_html"
    html_temp_dir.mkdir(exist_ok=True)

    insta_dir = base_dir / "carrossel_instagram"
    insta_dir.mkdir(exist_ok=True)

    linkedin_dir = base_dir / "carrossel_linkedin"
    linkedin_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # 1. Captura as telas brutas do site
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await ctx.new_page()

        for mod in MODULES:
            print(f"1. Capturando tela do modulo: {mod['id']}...")
            await page.goto(mod["url"], wait_until="networkidle")
            await asyncio.sleep(1)
            
            if "radix" in mod["id"] or "spelling" in mod["id"]:
                btn = page.locator("button:has-text('Iniciar Rodada')")
                if await btn.count() > 0:
                    await btn.click()
                    await asyncio.sleep(1)
                    tut = page.locator("button:has-text('Entendido'), button:has-text('Understood')")
                    if await tut.count() > 0:
                        await tut.first.click()
                        await asyncio.sleep(1)
                        
            raw_path = raw_dir / f"{mod['id']}.png"
            loc = page.locator(mod["selector"])
            if await loc.count() > 0:
                await loc.first.scroll_into_view_if_needed()
                await asyncio.sleep(1)
                await loc.first.screenshot(path=str(raw_path))
            else:
                await page.screenshot(path=str(raw_path))

        # 2. Renderiza os Cards Finais para Instagram (1080x1350) e LinkedIn (1080x1080)
        card_page = await browser.new_page()

        for mod in MODULES:
            raw_img_path = (raw_dir / f"{mod['id']}.png").as_uri()
            
            # --- Instagram 1080x1350 ---
            insta_html_content = HTML_TEMPLATE.format(
                w=1080, h=1350, img_max_h=860,
                num=mod["num"], tag=mod["tag"],
                title=mod["title"], subtitle=mod["subtitle"],
                footer=mod["footer"], img_path=raw_img_path
            )
            insta_html_file = html_temp_dir / f"insta_{mod['id']}.html"
            insta_html_file.write_text(insta_html_content, encoding="utf-8")
            
            await card_page.set_viewport_size({"width": 1080, "height": 1350})
            await card_page.goto(insta_html_file.as_uri(), wait_until="networkidle")
            await asyncio.sleep(0.5)
            
            insta_out_png = insta_dir / f"slide_{mod['num']}_{mod['id']}.png"
            insta_out_jpg = insta_dir / f"slide_{mod['num']}_{mod['id']}.jpg"
            await card_page.screenshot(path=str(insta_out_png))
            
            with Image.open(insta_out_png) as img:
                img.convert("RGB").save(insta_out_jpg, "JPEG", quality=95, optimize=True)
            if insta_out_png.exists(): insta_out_png.unlink()
            print(f"  [OK] Instagram Slide {mod['num']}: {insta_out_jpg.name}")

            # --- LinkedIn 1080x1080 ---
            linkedin_html_content = HTML_TEMPLATE.format(
                w=1080, h=1080, img_max_h=620,
                num=mod["num"], tag=mod["tag"],
                title=mod["title"], subtitle=mod["subtitle"],
                footer=mod["footer"], img_path=raw_img_path
            )
            linkedin_html_file = html_temp_dir / f"linkedin_{mod['id']}.html"
            linkedin_html_file.write_text(linkedin_html_content, encoding="utf-8")
            
            await card_page.set_viewport_size({"width": 1080, "height": 1080})
            await card_page.goto(linkedin_html_file.as_uri(), wait_until="networkidle")
            await asyncio.sleep(0.5)
            
            linkedin_out_png = linkedin_dir / f"slide_{mod['num']}_{mod['id']}.png"
            linkedin_out_jpg = linkedin_dir / f"slide_{mod['num']}_{mod['id']}.jpg"
            await card_page.screenshot(path=str(linkedin_out_png))
            
            with Image.open(linkedin_out_png) as img:
                img.convert("RGB").save(linkedin_out_jpg, "JPEG", quality=95, optimize=True)
            if linkedin_out_png.exists(): linkedin_out_png.unlink()
            print(f"  [OK] LinkedIn Slide {mod['num']}: {linkedin_out_jpg.name}")

        await browser.close()
        print("\n[FINALIZADO COM SUCESSO] Todos os cards dos modulos do site foram gerados em alta definicao!")

if __name__ == "__main__":
    asyncio.run(main())
