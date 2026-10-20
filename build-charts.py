"""Reconstrói em SVG os sete gráficos quantitativos exportados do Figma.

Os números, categorias e créditos vêm das pranchas originais. A imagem de
fundo derivada só remove os pixels desses gráficos; o restante é preservado.
"""
from pathlib import Path
from html import escape
from base64 import b64encode
from PIL import Image, ImageDraw

ROOT = Path(__file__).parent
FRAMES = ROOT / 'assets/images/figma-frames'
OUT = ROOT / 'assets/images/code-charts'
OUT.mkdir(parents=True, exist_ok=True)
WINE = '#661414'
INK = '#1b0404'
ICE = '#b9ecff'
BLUE = '#00274e'
TEAL = '#237f82'
MIST = '#b9c4c9'
PAPER = '#fff2f2'
FONT = b64encode((ROOT / 'assets/fonts/dm-sans-latin.woff2').read_bytes()).decode('ascii')
MOTION_STYLES = '''
.grow-x{transform-box:fill-box;transform-origin:left center;animation:grow-x .85s cubic-bezier(.2,.7,.2,1) both}
.grow-y{transform-box:fill-box;transform-origin:center bottom;animation:grow-y .85s cubic-bezier(.2,.7,.2,1) both}
.point-in{transform-box:fill-box;transform-origin:center;animation:point-in .4s cubic-bezier(.2,.8,.2,1.25) both}
.draw-line{stroke-dasharray:526;animation:draw-line 1.1s ease-out both}
@keyframes grow-x{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes grow-y{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes point-in{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}
@keyframes draw-line{from{stroke-dashoffset:526}to{stroke-dashoffset:0}}
@media(prefers-reduced-motion:reduce){.grow-x,.grow-y,.point-in,.draw-line{animation:none!important;stroke-dashoffset:0!important}}
'''


def svg(name, width, height, title, content, description=''):
    motion = MOTION_STYLES if name != '15-ouro.svg' else ''
    document = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>
<style>@font-face{{font-family:'Magazine DM Sans';src:url(data:font/woff2;base64,{FONT}) format('woff2')}}{motion}</style>
<rect width="{width}" height="{height}" fill="#fff"/>
<g font-family="Magazine DM Sans,Arial,sans-serif" fill="{INK}">{content}</g></svg>'''
    (OUT / name).write_text(document, encoding='utf-8')


def line(x, y, value, size=15, weight=400, color=INK, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}">{escape(value)}</text>'


def multiline(x, y, rows, size=12, weight=400, color=INK, step=None, anchor='start'):
    step = step or size * 1.2
    return ''.join(line(x, y + i * step, row, size, weight, color, anchor) for i, row in enumerate(rows))


def rect(x, y, w, h, fill, rx=0, motion='', delay=0):
    effect = f' class="{motion}" style="animation-delay:{delay}ms"' if motion else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{effect}/>'


# Página 07: peixes acima do limite da OMS.
c = line(12, 24, 'Peixes acima do limite da OMS, por tipo de alimentação', 14, 700, WINE)
c += line(12, 43, 'Amapá, 428 peixes de cinco rios (coleta de 2017 a 2018)', 10, 400, '#5d7175')
for i, (label, value, color) in enumerate([('Carnívoros', 77.6, WINE), ('Onívoros', 20, TEAL), ('Herbívoros', 2.4, ICE)]):
    y = 84 + i * 63
    c += line(72, y + 16, label, 12, 500, INK, 'end')
    c += rect(80, y, round(value * 3.55), 32, color, 2, 'grow-x', i * 130)
    c += line(88 + round(value * 3.55), y + 21, f'{str(value).replace(".", ",")}%', 13, 700, WINE)
c += line(12, 288, 'Fonte: Fiocruz e parceiros, reportagem do Conexão Planeta (2020).', 8, 400, '#5d7175')
c += line(12, 300, 'Total: 28,7% dos peixes acima do limite.', 8, 400, '#5d7175')
svg('07-peixes.svg', 464, 308, 'Peixes acima do limite da OMS, por tipo de alimentação', c, 'Carnívoros: 77,6%; onívoros: 20%; herbívoros: 2,4%.')

# Página 07: quadro de 100 quadrículas, com os mesmos percentuais.
c = line(12, 24, 'Mercúrio no cabelo de 287 Yanomami (2022)', 16, 700, WINE)
c += line(12, 43, 'Cada quadrado representa 1% das pessoas analisadas', 10, 400, '#5d7175')
for i in range(100):
    col, row = i % 10, i // 10
    color = WINE if i < 11 else TEAL if i < 84 else MIST
    c += rect(14 + col * 21, 61 + row * 21, 18, 18, color, 1, 'point-in', row * 55 + col * 18)
for i, (label, color) in enumerate([('Acima de 6 µg/g: 11%', WINE), ('Entre 2 e 6 µg/g: 73%', TEAL), ('Abaixo de 2 µg/g: 16%', MIST)]):
    y = 91 + i * 52
    c += rect(241, y - 12, 14, 14, color, 1) + line(263, y, label, 12, 500)
c += line(241, 254, 'Total acima de 2 µg/g: 84%', 11, 700, WINE)
c += line(12, 302, 'Fonte: Fiocruz (2024). Percentuais da contagem das quadrículas', 8, 400, '#5d7175')
c += line(12, 314, 'do painel original (10,8% na divulgação).', 8, 400, '#5d7175')
svg('07-yanomami.svg', 464, 325, 'Mercúrio no cabelo de 287 Yanomami (2022)', c, '11% acima de 6 microgramas por grama; 73% entre 2 e 6; 16% abaixo de 2. Total acima de 2: 84%.')


def two_bars(name, title, subtitle, values, labels, shown, source, colors, limit, height=249):
    content = line(12, 24, title, 11, 700, WINE)
    content += line(12, 42, subtitle, 9, 400, '#5d7175')
    content += '<path d="M35 206H367" stroke="#bdc9cb" stroke-width="1"/>'
    for x, value, label, display, color in zip((80, 272), values, labels, shown, colors):
        bar_h = round(value / limit * 128)
        content += rect(x, 206 - bar_h, 90, bar_h, color, 2, 'grow-y', 140 if x == 272 else 0)
        content += line(x + 45, 199 - bar_h, display, 12, 700, WINE, 'middle')
        content += line(x + 45, 224, label, 10, 500, INK, 'middle')
    content += line(12, 243, source, 7, 400, '#5d7175')
    svg(name, 386, height, title, content, f'{labels[0]}: {shown[0]}; {labels[1]}: {shown[1]}.')


two_bars('09-investimento.svg', 'Investimento em saneamento no Norte, 2024, por habitante',
         'Valor necessário × valor investido (R$)', [223.82, 66.52],
         ['Necessário', 'Investido'], ['R$ 223,82', 'R$ 66,52'],
         'Fonte: Instituto Trata Brasil (2025). Investido: menos de 30% do necessário.',
         [MIST, WINE], 223.82)
two_bars('09-coleta.svg', 'População com coleta de esgoto, 2024',
         'Percentual da população atendida pela coleta de esgoto', [16.6, 80.8],
         ['Região Norte', 'Região Sudeste'], ['16,6%', '80,8%'],
         'Fonte: Instituto Trata Brasil (2026), dados do SINISA (ano-base 2024).',
         [WINE, TEAL], 80.8, 246)

# Página 14: distribuição da CFEM.
c = line(14, 27, 'Dois municípios ficam com um terço da CFEM', 20, 700, WINE)
c += line(14, 49, 'CFEM distribuída aos municípios produtores do país em outubro de 2025 (R$ 403,8 milhões)', 10, 400, '#5d7175')
c += line(133, 85, '33,6% do total', 14, 700, WINE, 'middle')
c += '<path d="M17 103V97H259V103" fill="none" stroke="#546b70" stroke-width="1.5"/>'
c += rect(16, 113, 98, 75, WINE, motion='grow-x') + rect(114, 113, 98, 75, '#9d3838', motion='grow-x', delay=160) + rect(212, 113, 360, 75, MIST, motion='grow-x', delay=320)
c += multiline(65, 143, ['Canaã dos', 'Carajás', 'R$ 69,8 mi'], 12, 600, '#fff', 15, 'middle')
c += multiline(163, 143, ['Parauapebas', 'R$ 66,0 mi'], 12, 600, '#fff', 15, 'middle')
c += multiline(392, 143, ['Todos os demais municípios produtores', 'R$ 268,0 mi (66,4%)'], 12, 600, INK, 15, 'middle')
c += line(14, 232, 'Fonte: Brasil 61 (2025); cálculo do grupo.', 9, 400, '#5d7175')
svg('14-cfem.svg', 588, 250, 'Dois municípios ficam com um terço da CFEM', c,
    'Outubro de 2025: Canaã dos Carajás R$ 69,8 milhões; Parauapebas R$ 66,0 milhões; todos os demais R$ 268,0 milhões, 66,4%. Total R$ 403,8 milhões.')

# Página 14: comparação da lacuna de saneamento com a compensação.
c = line(14, 26, 'A compensação cobre só um terço da lacuna', 18, 700, WINE)
c += line(14, 46, 'Dinheiro por ano, em bilhões de reais (ordem de grandeza)', 10, 400, '#5d7175')
c += '<path d="M20 198H453" stroke="#bdc9cb" stroke-width="1"/>'
c += rect(52, 78, 120, 120, WINE, 2, 'grow-y') + rect(253, 158, 120, 40, TEAL, 2, 'grow-y', 180)
c += line(112, 70, 'R$ 2,7 bi', 16, 700, WINE, 'middle') + line(313, 150, 'R$ 0,9 bi', 16, 700, WINE, 'middle')
c += '<path d="M172 158H253" stroke="#546b70" stroke-dasharray="4 4"/>'
c += multiline(112, 215, ['Lacuna de investimento', 'em saneamento no Norte'], 10, 500, INK, 13, 'middle')
c += multiline(313, 215, ['15% da CFEM que vai', 'aos municípios do país'], 10, 500, INK, 13, 'middle')
c += multiline(434, 137, ['cobre', 'cerca de', 'um terço'], 10, 700, WINE, 12, 'middle')
c += line(14, 269, 'Lacuna: (R$ 223,82 − R$ 66,52) × cerca de 17 milhões de moradores do Norte.', 8, 400, '#5d7175')
c += line(14, 281, 'CFEM: 15% de R$ 5,92 bilhões repassados aos municípios em 2025.', 8, 400, '#5d7175')
c += line(14, 293, 'Fontes: Trata Brasil (2025); Agência INFRA (2026a); cálculo do grupo.', 8, 400, '#5d7175')
svg('14-lacuna.svg', 473, 298, 'A compensação cobre só um terço da lacuna', c,
    'Lacuna de investimento em saneamento no Norte: R$ 2,7 bilhões por ano. 15% da CFEM destinada aos municípios: R$ 0,9 bilhão.')

# Página 17: matriz de ligação entre quatro casos e cinco propostas.
c = line(14, 31, 'Quais propostas atendem a quais casos', 21, 700, WINE)
headers = [['1', 'Licenciamento', 'independente'], ['2', 'Compensação', 'pela água'], ['3', 'Controle', 'do ouro'], ['4', 'Mercúrio', 'numa lei'], ['5', 'Participação', 'com consulta']]
for i, lines in enumerate(headers):
    c += multiline(225 + i * 86, 78, lines, 10, 700, WINE, 13, 'middle')
rows = [['Garimpo', '(Yanomami e Tapajós)'], ['Belo Monte e Xingu'], ['Barcarena'], ['Saneamento', '(Belém e Altamira)']]
on = [{1, 2, 3, 4}, {0, 1, 4}, {0, 4}, {1}]
for row, words in enumerate(rows):
    y = 130 + row * 41
    c += '<path d="M5 %sH650" stroke="#e6eced"/>' % (y + 22)
    c += multiline(7, y - (7 if len(words) > 1 else 0), words, 11, 500, INK, 13)
    for col in range(5):
        color = TEAL if col in on[row] else MIST
        radius = 10 if col in on[row] else 5
        c += f'<circle cx="{225 + col * 86}" cy="{y}" r="{radius}" fill="{color}" class="point-in" style="animation-delay:{row * 120 + col * 70}ms"/>'
svg('17-matriz.svg', 658, 297, 'Quais propostas atendem a quais casos', c,
    'Colunas: licenciamento independente, compensação pela água, controle do ouro, mercúrio numa lei, participação com consulta. Linhas: garimpo, Belo Monte e Xingu, Barcarena, saneamento.')

# Página 11: sequência de Barcarena, com os cinco marcos e fontes originais.
c = line(18, 31, 'Linha do tempo de Barcarena (PA)', 22, 700, WINE)
c += line(18, 51, 'Do polo industrial planejado pelo Estado à condenação, quinze anos depois', 11, 400, '#5d7175')
c += '<path d="M65 207H591" stroke="#b9c4c9" stroke-width="4" class="draw-line"/>'
events = [
    (85, '1981', ['Albrás/Alunorte', 'entra no Programa', 'Grande Carajás'], TEAL, True),
    (205, '2009', ['Transbordamento de', 'rejeitos atinge o', 'rio Murucupi;', 'imprensa nega a', 'poluição'], WINE, False),
    (326, '2010–2011', ['Hydro compra os', 'ativos de alumínio', 'da Vale e passa a', 'deter 91% da', 'Alunorte'], TEAL, True),
    (446, '2018', ['Novo vazamento', 'relatado; o Instituto', 'Evandro Chagas', 'encontra contaminação'], WINE, False),
    (566, '2024', ['Condenação pelo caso', 'de 2009, com recurso', 'da empresa'], TEAL, True),
]
for index, (x, year, description, color, above) in enumerate(events):
    c += f'<circle cx="{x}" cy="207" r="9" fill="{color}" stroke="#fff" stroke-width="3" class="point-in" style="animation-delay:{540 + index * 125}ms"/>'
    if above:
        c += f'<path d="M{x} 190V176" stroke="{color}" stroke-width="2"/>'
        c += line(x, 165, year, 16, 700, color, 'middle')
        c += multiline(x, 91, description, 10, 400, INK, 13, 'middle')
    else:
        c += f'<path d="M{x} 223V237" stroke="{color}" stroke-width="2"/>'
        c += line(x, 260, year, 16, 700, color, 'middle')
        c += multiline(x, 280, description, 10, 400, INK, 13, 'middle')
c += line(18, 382, 'Fontes: Nahum (2011); Hydro (2010, 2011, 2024); Câmara dos Deputados (2018); G1 Pará (2018).', 8, 400, '#5d7175')
svg('11-barcarena.svg', 645, 403, 'Linha do tempo de Barcarena (PA)', c,
    '1981: Albrás e Alunorte no Programa Grande Carajás. 2009: transbordamento de rejeitos. 2010 a 2011: Hydro compra ativos da Vale. 2018: novo vazamento. 2024: condenação pelo caso de 2009.')

# Página 15: fluxo do ouro; o texto da proposta permanece integral.
c = line(15, 31, 'Onde fica o controle do ouro', 21, 700, WINE)
c += line(15, 53, 'A proposta soma ao controle na balsa um bloqueio na primeira venda', 11, 400, '#5d7175')
c += multiline(84, 91, ['Hoje: vistoria em campo,', 'limitada pela falta de fiscais'], 10, 400, '#5d7175', 13, 'middle')
c += multiline(312, 91, ['Hoje: a nota fiscal prova a operação,', 'não a origem do ouro'], 10, 400, '#5d7175', 13, 'middle')
for x, title in [(16, ['Garimpo', '(balsa e mina)']), (238, ['Primeira compra', '(distribuidora)']), (462, ['Refino e', 'exportação'])]:
    c += f'<rect x="{x}" y="122" width="139" height="55" rx="6" fill="#fff" stroke="{TEAL}" stroke-width="2"/>'
    c += multiline(x + 69.5, 145, title, 13, 700, WINE, 16, 'middle')
c += '<path d="M159 149H232M381 149H456" stroke="#36575e" stroke-width="2"/>'
c += '<path d="M229 145L236 149L229 153M453 145L460 149L453 153" fill="#36575e"/>'
c += rect(219, 117, 7, 65, WINE)
c += f'<rect x="58" y="217" width="510" height="72" rx="7" fill="#fff" stroke="{WINE}" stroke-width="2"/>'
c += '<path d="M223 182V217" stroke="' + WINE + '" stroke-width="2"/>'
c += line(313, 237, 'Proposta: cruzar os dados antes da primeira venda', 13, 700, WINE, 'middle')
c += line(313, 257, 'alerta de satélite + título de lavra + produção declarada + nota fiscal', 11, 400, INK, 'middle')
c += line(313, 274, 'Se não baterem, a primeira venda fica bloqueada e abre-se a vistoria.', 11, 400, INK, 'middle')
svg('15-ouro.svg', 619, 309, 'Onde fica o controle do ouro', c,
    'Garimpo, primeira compra e refino e exportação. A proposta cruza alerta de satélite, título de lavra, produção declarada e nota fiscal antes da primeira venda.')

# Página 16: participação em comitês de bacia.
c = line(24, 36, 'Poucos territórios estão em bacias com comitê', 22, 700, WINE)
c += line(24, 58, 'Parcela estimada de terras indígenas e áreas quilombolas em bacias com comitê (Brasil)', 11, 400, '#5d7175')
c += line(700, 100, '100% = todas', 11, 400, '#5d7175', 'end')
for y, category, percent, value, color in [(125, 'Terras indígenas', 14, '14%', TEAL), (202, 'Áreas quilombolas', .9, '0,9%', WINE)]:
    c += line(24, y, category, 14, 500)
    c += rect(24, y + 14, 676, 25, '#e4eaeb')
    c += rect(24, y + 14, max(7, round(676 * percent / 100)), 25, color, motion='grow-x', delay=120 if y == 202 else 0)
    c += line(24 + max(7, round(676 * percent / 100)) + 12, y + 34, value, 19, 700, WINE)
c += line(24, 289, 'Fonte: Silva e Costa (2025).', 10, 400, '#5d7175')
svg('16-comites.svg', 720, 300, 'Poucos territórios estão em bacias com comitê', c,
    'Terras indígenas: 14%; áreas quilombolas: 0,9%; 100% representa todas as terras ou áreas.')

# Remover os gráficos rasterizados das pranchas derivadas sem tocar nos originais.
regions = {
    '07-garimpo-2.png': [(735, 22, 1199, 330), (967, 357, 1431, 682)],
    '09-esgoto-transformacao.png': [(292, 49, 678, 298), (292, 323, 678, 569)],
    '11-omissao.png': [(760, 531, 1405, 934)],
    '14-politicas-2.png': [(66, 362, 654, 612), (854, 417, 1327, 715)],
    '15-politicas-3.png': [(42, 173, 661, 482)],
    '16-politicas-4.png': [(720, 724, 1440, 1024)],
    '17-politicas-5.png': [(754, 200, 1412, 497)],
}
for filename, areas in regions.items():
    picture = Image.open(FRAMES / filename).convert('RGB')
    draw = ImageDraw.Draw(picture)
    color = BLUE if filename.startswith('17') else PAPER
    for index, area in enumerate(areas):
        if filename.startswith('14') and index == 1:
            color = BLUE
        draw.rectangle(area, fill=color)
    picture.save(OUT / filename, optimize=True)
