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
        "tag": "EDUCAÇÃO PACTUAL & PRESENÇA",
        "title": "A Tecnologia a Serviço da Formação dos Meus Filhos",
        "subtitle": "A tecnologia não é neutra: usei minha vocação profissional para criar uma ferramenta que nos aproxima na rotina de estudos em casa.",
        "footer": "Iniciativa 100% familiar e sem fins comerciais · Presença ativa de pai"
    },
    {
        "id": "02_artes_liberais",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('As 7 Artes Liberais')",
        "num": "02",
        "tag": "TRIVIUM & QUADRIVIUM",
        "title": "Resgatando a Ordem e o Pensamento Claro",
        "subtitle": "Gramática, Lógica e Ciências para amenizar o ruído e a distração moderna, ensinando a amar a Verdade, a Bondade e a Beleza.",
        "footer": "Formação integral da mente e do caráter através das 7 Artes Liberais"
    },
    {
        "id": "03_salao_dos_jogos",
        "url": "http://localhost:3000/",
        "selector": "section#jogos",
        "num": "03",
        "tag": "VOCAÇÃO & DISCIPLINA",
        "title": "O Salão dos Jogos Formativos",
        "subtitle": "Transformando o dever de casa em um ambiente de constância, onde o estudo é celebrado como exercício da vocação.",
        "footer": "Radix · Spelling Bee · Desafio dos Sábios"
    },
    {
        "id": "04_radix_soletração",
        "url": "http://localhost:3000/radix",
        "selector": "main",
        "num": "04",
        "tag": "DOMÍNIO DA LÍNGUA MATERNA",
        "title": "Módulo Radix · Soletração em Português",
        "subtitle": "298 palavras por série com síntese de áudio, significado e frases. Cuidar da palavra é cuidar da capacidade de expressar a verdade.",
        "footer": "Sem distrações ou anúncios · Reconhecimento fonético calibrado"
    },
    {
        "id": "05_spelling_bee",
        "url": "http://localhost:3000/spelling-bee",
        "selector": "main",
        "num": "05",
        "tag": "PREPARO & CULTURA",
        "title": "Módulo Spelling Bee · Inglês com Propósito",
        "subtitle": "367 palavras em inglês estruturadas por níveis para capacitar os filhos a se comunicarem e servirem com excelência.",
        "footer": "Aprendizado bilíngue no ritmo da família"
    },
    {
        "id": "06_desafio_sabios",
        "url": "http://localhost:3000/desafio",
        "selector": "main",
        "num": "06",
        "tag": "SABEDORIA & DISCERNIMENTO",
        "title": "Desafio dos Sábios · Quizzes & TRI",
        "subtitle": "Avaliação pedagógica (TRI) que mede a compreensão real e não apenas a decoreba, estimulando a curiosidade ordenada.",
        "footer": "História, Ciências e Lógica com reflexões formativas"
    },
    {
        "id": "07_gamificacao_virtude",
        "url": "http://localhost:3000/",
        "selector": "section:has-text('Engajamento com propósito')",
        "num": "07",
        "tag": "VIRTUDE, NÃO VÍCIO",
        "title": "Gamificação para Edificar e Servir",
        "subtitle": "Sem mecânicas de retenção viciosas. Cada orbe e conquista reforça a constância, o dever bem feito e o serviço ao próximo.",
        "footer": "Aberto gratuitamente para outras famílias: arkanos.arkosintelligence.com"
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
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-black tracking-wider uppercase">
        <span>🏛️ EDUCAÇÃO PACTUAL & FAMÍLIA</span>
        <span class="text-amber-500">•</span>
        <span>SEM FINS COMERCIAIS</span>
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
    <span class="text-amber-300 font-black text-[11px] uppercase tracking-wider">Arkanos · Paternidade & Propósito</span>
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
        print("\n[CONCLUÍDO COM SUCESSO] Novos cards com ênfase pactual e formativa gerados!")

if __name__ == "__main__":
    asyncio.run(main())
