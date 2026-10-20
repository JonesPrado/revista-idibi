# Idibi — edição digital

Abra `index.html` em um navegador moderno. O site é estático e não precisa de npm ou etapa de compilação.

## Leitor

- A capa e a contracapa ocupam a tela inteira; as páginas internas ficam centralizadas acima do rodapé.
- As 27 posições navegam pelos botões, pelo controle deslizante, pelas setas do teclado ou por gestos horizontais no celular.
- O rodapé oferece zoom, ajuste à tela, leitura em voz alta e tela cheia. Na capa, aparece ao aproximar o mouse da borda inferior; nas demais páginas permanece visível.
- O índice leva direto às seções da edição.
- Os retratos da equipe podem ser ampliados.
- As telas originais exportadas do Figma ficam em `assets/images/figma-frames/`. A capa, a equipe e o sumário com o início do editorial usam composições HTML próprias. A contracapa exibe o vídeo incorporado do YouTube.
- Dez gráficos e infográficos usam SVGs em `assets/images/code-charts/`. As pranchas derivadas nessa pasta removem apenas as áreas rasterizadas substituídas pelos SVGs. Os PNGs originais continuam em `assets/images/figma-frames/`.
- A leitura em voz alta usa o texto HTML nas primeiras páginas e transcrições geradas por OCR para as pranchas em imagem. O OCR pode conter erros em colunas, mapas e créditos.

## Arquivos

- `index.html`: estrutura do leitor.
- `figma-reader.js`: páginas, navegação, índice e ampliador de retratos.
- `page-narration.js`: transcrições para leitura em voz alta das pranchas exportadas.
- `styles.css`: estilos, responsividade e animações.
- `build-charts.py`: gera os SVGs e as pranchas derivadas com os dados e créditos originais.
- `assets/`: telas, imagens, fontes e logo usados pelo leitor.

# Arquivos externos
Figma: https://www.figma.com/design/sYSbkxAEUmBs69qiteykpI/Idibi?node-id=182-70&p=f&t=HsAtuUBMUQLIxlKc-0
Pesquisa: https://docs.google.com/document/d/1KM6kRkaH_4K-6nqZRZnRLMsvXK4HFFYAfWRSQFFIkRQ/edit?tab=t.oy8m1qz2lb6
