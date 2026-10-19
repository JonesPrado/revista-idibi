(() => {
  if (window.IDIBI_FIGMA_READER?.render) {
    window.IDIBI_FIGMA_READER.render();
    return;
  }
  const data = window.IDIBI_DATA;
  if (!data) return;
  const chapters = data.chapters;
  const published = chapters.filter((chapter) => chapter.status === 'publicado');
  const stories = published.filter((chapter) => chapter.template !== 'editorial');
  const asset = (key) => data.assets[key] || '';
  const html = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const waterLayer = (key) => `<div class="water-layer" style="--water-image:url('${asset(key)}')" aria-hidden="true"></div>`;

  const photoFigure = (photo, extra = '') => {
    if (!photo) return '';
    const source = asset(photo.asset);
    const caption = html(photo.caption || '');
    return `<figure class="photo-figure ${extra}" data-photo>
      <div class="photo-window">
        <button class="photo-open" type="button" data-open-image="${source}" data-image-alt="${html(photo.alt)}" data-image-caption="${caption}" aria-label="Ampliar imagem: ${html(photo.alt)}">
          <img src="${source}" alt="${html(photo.alt)}" loading="lazy" style="--object-position:${html(photo.objectPosition || 'center')}">
        </button>
      </div>${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>`;
  };
  const quote = (text, byline = '') => `<figure class="quote-card"><blockquote><span aria-hidden="true">“</span><p>${html(text)}</p>${byline ? `<cite>${html(byline)}</cite>` : ''}</blockquote></figure>`;
  const definition = (item, dark = false) => item ? `<aside class="definition${dark ? ' dark-definition' : ''}"><h3>${html(item.title)}</h3><p>${html(item.text)}</p></aside>` : '';
  const photoButton = (photo, className = '') => {
    const source = asset(photo.asset);
    return `<button class="photo-open ${className}" type="button" data-photo data-open-image="${source}" data-image-alt="${html(photo.alt)}" data-image-caption="${html(photo.caption || '')}" aria-label="Ampliar imagem: ${html(photo.alt)}"><img src="${source}" alt="${html(photo.alt)}" loading="lazy" style="--object-position:${html(photo.objectPosition || 'center')}"></button>`;
  };
  const statPanel = (stats = []) => `<aside class="stat-panel" aria-label="Números da reportagem">${stats.map((item) => `<div><strong>${html(item.value)}</strong><p>${html(item.text)}</p><small>${html(item.source)}</small></div>`).join('')}</aside>`;

  const dataTable = (figure) => `<details class="data-details"><summary>Ver dados em tabela</summary><table><caption>${html(figure.title)}</caption><thead><tr><th scope="col">Categoria</th><th scope="col">Valor</th></tr></thead><tbody>${figure.rows.map((row) => `<tr><th scope="row">${html(row.label)}</th><td>${html(row.display)}</td></tr>`).join('')}</tbody></table></details>`;
  const barFigure = (name) => {
    const figure = data.figures[name];
    if (!figure) return '';
    const max = Math.max(...figure.rows.map((row) => row.value));
    return `<figure class="data-figure" data-figure><header class="figure-head"><p class="figure-kicker">Dados da reportagem</p><h3>${html(figure.title)}</h3><p>${html(figure.subtitle)}</p></header>
      <div class="bar-list">${figure.rows.map((row, index) => `<button class="bar-row" type="button" data-chart-option aria-pressed="false" data-label="${html(row.label)}" data-value="${html(row.display)}" title="Destacar ${html(row.label)}: ${html(row.display)}" style="--bar-delay:${index * 160}ms"><span class="bar-label"><span>${html(row.label)}</span><strong>${html(row.display)}</strong></span><span class="bar-track"><span class="tone-${html(row.color)}" style="--bar:${(row.value / max) * 100}%"></span></span></button>`).join('')}</div>
      <p class="chart-readout" aria-live="polite">Selecione uma faixa para destacar o dado.</p>
      ${figure.total ? `<p class="figure-total">${html(figure.total)}</p>` : ''}<figcaption>${html(figure.source)}</figcaption>${dataTable(figure)}<button class="chart-replay" type="button" data-replay-chart>↻ <span>Rever animação</span></button></figure>`;
  };
  const hairFigure = () => {
    const figure = data.figures.yanomamiHair;
    if (!figure) return '';
    const distribution = [...Array(11).fill('orange'), ...Array(73).fill('teal'), ...Array(16).fill('slate')];
    return `<figure class="data-figure hair-figure" data-figure><header class="figure-head"><p class="figure-kicker">Dados da reportagem</p><h3>${html(figure.title)}</h3><p>${html(figure.subtitle)}</p></header>
      <div class="hair-grid" aria-hidden="true">${distribution.map((tone, index) => `<span class="tone-${tone}" style="--tile-delay:${Math.floor(index / 20) * 70 + (index % 20) * 10}ms"></span>`).join('')}</div>
      <ul class="legend">${figure.rows.map((row) => `<li><button class="legend-toggle" type="button" data-highlight-tone="${html(row.color)}" aria-pressed="false"><i class="tone-${html(row.color)}"></i><span>${html(row.label)}</span><strong>${html(row.display)}</strong></button></li>`).join('')}</ul>
      <p class="figure-total">${html(figure.total)}</p><figcaption>${html(figure.source)}</figcaption>${dataTable(figure)}<button class="chart-replay" type="button" data-replay-chart>↻ <span>Rever animação</span></button></figure>`;
  };
  const forceSequence = (chapter) => `<section class="force-intro"><h3>${html(chapter.forcesLead)}</h3><div class="force-sequence">${chapter.forces.map((force) => `<article class="force-card"><a href="#${html(force.anchor)}">${html(force.label)} <span aria-hidden="true">↗</span></a><p>${html(force.text)}</p></article>`).join('')}</div></section>`;
  const timeline = () => {
    const figure = data.timeline;
    return `<figure class="timeline" data-timeline><header><p class="figure-kicker">Memória do território</p><h3>${html(figure.title)}</h3><p class="timeline-subtitle">${html(figure.subtitle)}</p></header><ol>${figure.events.map((event, index) => `<li class="timeline-node tone-${html(event.tone || 'teal')}" style="--event-index:${index}"><time>${html(event.year)}</time><p>${html(event.text)}</p></li>`).join('')}</ol><figcaption>${html(figure.source)}</figcaption></figure>`;
  };

  const wordCount = (text) => (String(text).match(/\S+/g) || []).length;
  const sentenceParts = (text) => {
    if (typeof Intl.Segmenter === 'function') {
      return [...new Intl.Segmenter('pt-BR', { granularity: 'sentence' }).segment(text)]
        .map((part) => part.segment.trim()).filter(Boolean);
    }
    return [text];
  };
  const paginateText = (paragraphs, budget) => {
    const pages = [];
    let page = [];
    let used = 0;
    const flush = () => {
      if (page.length) pages.push(page);
      page = [];
      used = 0;
    };
    paragraphs.forEach((paragraph) => {
      let piece = '';
      let pieceWords = 0;
      sentenceParts(paragraph).forEach((sentence) => {
        const sentenceWords = wordCount(sentence);
        if (piece && pieceWords + sentenceWords > budget) {
          if (used + pieceWords > budget && page.length) flush();
          page.push(piece);
          used += pieceWords;
          piece = '';
          pieceWords = 0;
        }
        if (page.length && used + sentenceWords > budget) flush();
        piece = piece ? `${piece} ${sentence}` : sentence;
        pieceWords += sentenceWords;
      });
      if (piece) {
        if (page.length && used + pieceWords > budget) flush();
        page.push(piece);
        used += pieceWords;
      }
    });
    flush();
    return pages.length ? pages : [[]];
  };
  const pageProse = (paragraphs, dropcap = false) => `<div class="page-prose">${paragraphs.map((paragraph, index) => `<p${dropcap && index === 0 ? ' class="dropcap"' : ''}>${html(paragraph)}</p>`).join('')}</div>`;
  const pageLayout = (copy, art = '', layout = 'reading-layout') => `<div class="story-page-content ${layout}">${copy ? `<div class="page-copy">${copy}</div>` : ''}${art ? `<aside class="page-art">${art}</aside>` : ''}</div>`;
  const featureLayout = (lead, art, extra = '') => pageLayout(lead, art, `feature-layout ${extra}`);
  const chartLayout = (figure) => pageLayout('', figure, 'chart-layout');
  const storyBudget = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 560) return height <= 560 ? 48 : height <= 700 ? 62 : 76;
    if (width < 900) return height <= 650 ? 90 : 112;
    return height <= 650 ? 126 : height <= 780 ? 154 : 180;
  };

  const makeStoryBodies = (chapter) => {
    const pages = [];
    const photos = chapter.photos || [];
    const addFeature = (lead, art, extra = '') => pages.push(featureLayout(lead, art, extra));
    const addReading = (paragraphs, { lead = '', art = '', budget = storyBudget(), layout = '' } = {}) => {
      const artAllowance = art ? (window.innerWidth < 560 ? 30 : 36) : 0;
      const leadText = lead.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ');
      const textPages = paginateText(paragraphs, Math.max(36, budget - artAllowance - wordCount(leadText)));
      textPages.forEach((textPage, index) => {
        const copy = `${index === 0 ? lead : ''}${pageProse(textPage, pages.length === 0 && index === 0)}`;
        pages.push(pageLayout(copy, index === 0 ? art : '', layout || (art ? 'split-layout' : 'reading-layout')));
      });
    };

    switch (chapter.template) {
      case 'contextualizacao':
        addFeature(`<p class="deck">${html(chapter.deck)}</p>`, photoFigure(chapter.photo, 'lead-photo'), 'opening-layout');
        addReading(chapter.paragraphs);
        pages.push(pageLayout(`<div class="page-lead"><p class="folio">${html(chapter.numero)} · Contexto</p><h3>${html(chapter.forcesLead)}</h3></div>${forceSequence(chapter)}`, '', 'force-layout'));
        addReading(chapter.closing);
        break;
      case 'garimpo':
        addFeature(`<p class="deck">${html(chapter.dek)}</p>`, statPanel(chapter.stats), 'stats-layout');
        addReading(chapter.paragraphs.slice(0, 1), { lead: quote(chapter.quote, 'Júnior Hekurari · liderança Yanomami'), art: photoFigure(photos[1]) });
        addReading(chapter.paragraphs.slice(1, 2));
        pages.push(chartLayout(barFigure('fishMercury')));
        pages.push(chartLayout(hairFigure()));
        addReading(chapter.paragraphs.slice(2, 4), { art: photoFigure(photos[0]) });
        addReading(chapter.paragraphs.slice(4, 6), { art: photoFigure(photos[2]) });
        addReading(chapter.paragraphs.slice(6), { art: definition(chapter.definition) });
        break;
      case 'saneamento':
        addFeature(`<p class="deck">${html(chapter.deck)}</p>${quote(chapter.quote, 'Suane Barreirinhas · líder comunitária')}`, photoFigure(photos[0]), 'opening-layout');
        addReading(chapter.paragraphs.slice(0, 1));
        pages.push(chartLayout(barFigure('investment')));
        pages.push(chartLayout(barFigure('sewageCoverage')));
        addReading(chapter.paragraphs.slice(1, 4), { art: photoFigure(photos[1]) });
        addReading(chapter.paragraphs.slice(4), { art: `<div class="altamira"><p class="inset-label">Altamira · Rio Xingu</p><p>${html(chapter.altamira)}</p>${photoFigure(chapter.map, 'map-photo')}</div>` });
        pages.push(pageLayout('', photoFigure(photos[2]), 'image-layout'));
        break;
      case 'territorio':
        addFeature(`<p class="deck">${html(chapter.dek)}</p>`, photoFigure(photos[0], 'lead-photo'), 'opening-layout');
        addReading(chapter.paragraphs.slice(0, 1));
        addReading(chapter.paragraphs.slice(1, 2), { art: photoFigure(photos[2]) });
        addReading(chapter.paragraphs.slice(2), { art: photoFigure(photos[1]) });
        addReading([chapter.citizenship[0], chapter.citizenship[2]], { lead: `<h3 class="citizenship-title">${html(chapter.citizenship[1])}</h3>`, layout: 'citizenship-layout' });
        break;
      case 'omissao':
        addFeature(`<p class="deck">${html(chapter.deck)}</p>`, photoFigure(photos[0]), 'opening-layout');
        addReading(chapter.paragraphs.slice(0, 1));
        addReading(chapter.paragraphs.slice(1, 2), { art: photoFigure(photos[1]) });
        addReading(chapter.paragraphs.slice(2, 4), { art: definition(chapter.definition, true) });
        addReading(chapter.paragraphs.slice(4));
        pages.push(pageLayout('', timeline(), 'timeline-layout'));
        break;
      default:
        paginateText(chapter.paragraphs || [], storyBudget()).forEach((paragraphs) => addReading(paragraphs));
    }
    return pages;
  };

  const storyPageMarkup = (chapter, body, pageIndex, pageTotal, nextId) => {
    const isDark = chapter.tema === 'deep-wine';
    const water = isDark ? '185-839-imgAguinha' : '185-674-imgAguinha';
    const pageId = pageIndex === 0 ? chapter.id : `${chapter.id}-pagina-${pageIndex + 1}`;
    const headingId = `heading-${pageId}`;
    return `<article class="spread story story-page${isDark ? ' dark' : ''}" id="${html(pageId)}" data-scene data-chapter="${html(chapter.id)}" aria-labelledby="${html(headingId)}">
      ${pageIndex === 0 ? `<span class="chapter-anchor" id="chapter-${html(chapter.id)}" aria-hidden="true"></span>` : ''}
      ${waterLayer(water)}
      <header class="story-head"><p class="folio"><span>${html(chapter.numero)} <i>·</i> ${html(chapter.titulo)}</span><small>${String(pageIndex + 1).padStart(2, '0')} / ${String(pageTotal).padStart(2, '0')}</small></p><h2 class="story-title" id="${html(headingId)}">${html(chapter.titulo)}</h2>${pageIndex === 0 && chapter.sectionHeading ? `<p class="section-heading">${html(chapter.sectionHeading)}</p>` : ''}</header>
      ${body}
      <footer class="story-foot"><span>${html(chapter.numero)} · ${pageIndex + 1} / ${pageTotal}</span><a href="#${html(nextId)}">${pageIndex + 1 === pageTotal ? 'Continuar para o próximo capítulo ↓' : 'Virar página ↓'}</a></footer>
    </article>`;
  };

  const introTeam = [
    ['Carlos Bellomo', '185-856-imgFoto'], ['Davi Arakaki', '185-856-imgFoto1'], ['João Maldonado', '185-856-imgFoto2'],
    ['Giulia Manara', '185-856-imgFoto3'], ['João Prado', '185-856-imgFoto4'], ['Rafael Passos', '185-856-imgFoto5'],
  ];
  const team = document.querySelector('.team-spread');
  team.innerHTML = `
    <div class="team-left"><figure class="team-photo" data-photo>${photoButton({ asset: '185-856-imgImage5', alt: 'Vista aérea de um grande rio amazônico e da floresta ao redor.', caption: '' })}</figure>
      <div><h1 class="team-title">Rios que adoecem. Mercúrio, esgoto e desigualdade na Amazônia.</h1><div class="team-credit"><p>Instituto J&amp;F – Escola de Tecnologia · 2026</p></div></div>
    </div>
    <div class="team-right">${waterLayer('185-856-imgAguinha')}<p class="team-question">A Amazônia guarda a maior reserva de água doce do Brasil. Mas como é a vida na beira dos rios?</p>
      <h2 class="team-label">Equipe Idibi</h2><ul class="team-grid">${introTeam.map(([name, key], index) => `<li style="--team-index:${index}">${photoButton({ asset: key, alt: `Retrato de ${name}, integrante da equipe Idibi.`, caption: '' })}<p>${html(name)}</p></li>`).join('')}</ul>
    </div>`;

  const editorial = chapters.find((chapter) => chapter.id === 'editorial');
  const contents = document.querySelector('.contents-spread');
  contents.innerHTML = `
    <nav class="contents-left" aria-labelledby="contents-title">${waterLayer('185-646-imgAguinha')}
      <header class="contents-head"><p class="folio">Idibi · Edição 01</p><h2 id="contents-title">Sumário</h2></header>
      <ol class="contents-list">${chapters.map((chapter) => chapter.status === 'publicado'
        ? `<li><a href="#${html(chapter.id)}"><span class="number">${html(chapter.numero)}</span><i class="rule" aria-hidden="true"></i><span>${html(chapter.titulo)}</span><b class="arrow" aria-hidden="true">↗</b></a></li>`
        : `<li><span class="pending"><span class="number">${html(chapter.numero)}</span><i class="rule" aria-hidden="true"></i><span>${html(chapter.titulo)}</span><small>em breve</small></span></li>`).join('')}</ol>
      <p class="contents-note">${published.length} capítulos publicados · ${chapters.length - published.length} em desenvolvimento</p>
    </nav>`;

  const editorialPages = paginateText(editorial?.paragraphs || [], storyBudget());
  document.querySelector('#editorial-pages').innerHTML = editorialPages.map((paragraphs, index) => {
    const id = index === 0 ? 'editorial' : `editorial-pagina-${index + 1}`;
    const nextId = index + 1 < editorialPages.length ? `editorial-pagina-${index + 2}` : (stories[0]?.id || 'capa');
    return `<article class="spread editorial-screen${index === 0 ? ' editorial-opening' : ''}" id="${id}" data-scene aria-labelledby="heading-editorial-${index + 1}">
      ${waterLayer('185-646-imgAguinha')}<div class="editorial-screen-inner">
        <header class="editorial-head"><p class="folio">01 · Revista Idibi <small>${String(index + 1).padStart(2, '0')} / ${String(editorialPages.length).padStart(2, '0')}</small></p><h2 id="heading-editorial-${index + 1}">Editorial</h2></header>
        <div class="editorial-copy">${paragraphs.map((paragraph, paragraphIndex) => `<p${index === 0 && paragraphIndex === 0 ? ' class="dropcap"' : ''}>${html(paragraph)}</p>`).join('')}</div>
        <footer class="editorial-foot"><span>01 <i>·</i> Editorial</span><a href="#${html(nextId)}">${index + 1 === editorialPages.length ? 'Próxima seção' : 'Virar página'} <span aria-hidden="true">↗</span></a></footer>
      </div>
    </article>`;
  }).join('');

  const storyPages = stories.flatMap((chapter) => makeStoryBodies(chapter).map((body, index, pages) => ({
    chapter, body, index, total: pages.length,
    id: index === 0 ? chapter.id : `${chapter.id}-pagina-${index + 1}`,
  })));
  document.querySelector('#stories').innerHTML = storyPages.map((page, index) => {
    const nextId = storyPages[index + 1]?.id || 'fim';
    return storyPageMarkup(page.chapter, page.body, page.index, page.total, nextId);
  }).join('');

  document.addEventListener('click', (event) => {
    const replay = event.target.closest('[data-replay-chart]');
    if (replay) {
      const figure = replay.closest('[data-figure]');
      figure.classList.remove('is-visible');
      void figure.offsetWidth;
      requestAnimationFrame(() => figure.classList.add('is-visible'));
      return;
    }

    const option = event.target.closest('[data-chart-option]');
    if (option) {
      const figure = option.closest('[data-figure]');
      const wasSelected = option.getAttribute('aria-pressed') === 'true';
      figure.querySelectorAll('[data-chart-option]').forEach((item) => {
        item.classList.toggle('is-selected', item === option && !wasSelected);
        item.setAttribute('aria-pressed', String(item === option && !wasSelected));
      });
      const readout = figure.querySelector('.chart-readout');
      readout.textContent = wasSelected ? 'Selecione uma faixa para destacar o dado.' : `${option.dataset.label}: ${option.dataset.value}`;
      return;
    }

    const legend = event.target.closest('[data-highlight-tone]');
    if (legend) {
      const figure = legend.closest('[data-figure]');
      const wasSelected = legend.getAttribute('aria-pressed') === 'true';
      figure.removeAttribute('data-highlight');
      figure.querySelectorAll('[data-highlight-tone]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === legend && !wasSelected));
        if (item === legend && !wasSelected) figure.dataset.highlight = item.dataset.highlightTone;
      });
    }
  });

  const back = document.querySelector('.back-cover');
  back.innerHTML = `${waterLayer('56-35-imgAguinha')}<div class="back-content"><div class="back-lockup"><img src="${asset('logo')}" alt=""><span>idibi</span></div><p>Cuidar da água é cuidar<br>de quem vive com ela.</p><small>Edição 01 · 2026</small></div>`;

  const drawerList = document.querySelector('#drawer-links');
  drawerList.innerHTML = chapters.map((chapter) => chapter.status === 'publicado'
    ? `<li><a href="#${html(chapter.id)}"><span>${html(chapter.numero)}</span><strong>${html(chapter.titulo)}</strong><span aria-hidden="true">↗</span></a></li>`
    : `<li><span><span>${html(chapter.numero)}</span><strong>${html(chapter.titulo)}</strong><small>em breve</small></span></li>`).join('');

  const scenes = [...document.querySelectorAll('[data-scene]')];
  // The Figma edition has 28 editorial pages. Longer content is split into
  // multiple reading screens in HTML, so map those screens onto the edition folios.
  const readerPageCount = 28;
  const pageForScene = (index) => Math.round(index * (readerPageCount - 1) / Math.max(1, scenes.length - 1));
  const sceneForPage = (page) => Math.round(page * Math.max(0, scenes.length - 1) / (readerPageCount - 1));
  const range = document.querySelector('#page-range');
  const count = document.querySelector('#page-count');
  const previous = document.querySelector('#previous-page');
  const next = document.querySelector('#next-page');
  const topProgress = document.querySelector('#top-progress-fill');
  const readerLocation = document.querySelector('#reader-location');
  let active = 0;
  let frame = 0;
  const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const goTo = (index) => scenes[Math.max(0, Math.min(scenes.length - 1, index))]?.scrollIntoView({ behavior: motionAllowed ? 'smooth' : 'auto', block: 'start' });
  const updateReader = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const line = window.innerHeight * .5;
      let current = 0;
      scenes.forEach((scene, index) => { if (scene.getBoundingClientRect().top <= line) current = index; });
      const previousActive = active;
      active = current;
      if (motionAllowed && previousActive !== current && scenes[current]?.classList.contains('is-visible')) {
        const page = scenes[current].querySelector('.story-page-content,.editorial-screen-inner,.contents-left,.team-right,.cover-content,.back-content');
        if (page?.animate) {
          const direction = current > previousActive ? 1 : -1;
          page.animate([
            { opacity: 0.42, transform: `translate3d(0,${direction * 20}px,0) scale(.994)`, clipPath: 'inset(0 0 4% 0)' },
            { opacity: 1, transform: 'translate3d(0,0,0) scale(1)', clipPath: 'inset(0 0 0 0)' },
          ], { duration: 720, easing: 'cubic-bezier(.16,1,.3,1)' });
        }
      }
      const currentPage = pageForScene(active);
      const total = readerPageCount - 1;
      range.max = String(total);
      range.value = String(currentPage);
      range.style.setProperty('--progress', `${(currentPage / total) * 100}%`);
      count.innerHTML = `${String(currentPage + 1).padStart(2, '0')} <i>/</i> ${String(readerPageCount).padStart(2, '0')}`;
      const activeScene = scenes[active];
      const activeHeading = activeScene?.querySelector('h1, h2');
      readerLocation.textContent = activeHeading?.textContent.trim() || (activeScene?.id === 'capa' ? 'Capa da edição' : 'Contracapa');
      document.querySelectorAll('#drawer-links a').forEach((link) => {
        if (link.getAttribute('href') === `#${activeScene?.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      previous.disabled = active === 0;
      next.disabled = active === scenes.length - 1;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      topProgress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
    });
  };
  previous.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));
  range.addEventListener('input', () => goTo(sceneForPage(Number(range.value))));
  window.addEventListener('scroll', updateReader, { passive: true });
  window.addEventListener('resize', updateReader);
  updateReader();

  let touchOrigin = null;
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || event.target.closest('button, a, input, dialog')) return;
    touchOrigin = [event.touches[0].clientX, event.touches[0].clientY];
  }, { passive: true });
  document.addEventListener('touchend', (event) => {
    if (!touchOrigin || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchOrigin[0];
    const dy = event.changedTouches[0].clientY - touchOrigin[1];
    touchOrigin = null;
    if (Math.abs(dx) > 88 && Math.abs(dx) > Math.abs(dy) * 1.45) goTo(active + (dx < 0 ? 1 : -1));
  }, { passive: true });

  const indexTrigger = document.querySelector('#index-trigger');
  const drawer = document.querySelector('#index-drawer');
  const scrim = document.querySelector('#drawer-scrim');
  let drawerTimer = 0;
  const openIndex = () => {
    window.clearTimeout(drawerTimer);
    drawer.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
    });
    indexTrigger.setAttribute('aria-expanded', 'true');
  };
  const closeIndex = () => {
    if (drawer.hidden) return;
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    indexTrigger.setAttribute('aria-expanded', 'false');
    window.clearTimeout(drawerTimer);
    drawerTimer = window.setTimeout(() => {
      drawer.hidden = true;
      scrim.hidden = true;
      indexTrigger.focus({ preventScroll: true });
    }, 360);
  };
  indexTrigger.addEventListener('click', () => {
    if (indexTrigger.getAttribute('aria-expanded') === 'true') closeIndex();
    else openIndex();
  });
  document.querySelector('#close-index').addEventListener('click', closeIndex);
  scrim.addEventListener('click', closeIndex);
  drawer.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeIndex();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeIndex();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof Element && event.target.closest('input,textarea,select,button,[contenteditable="true"]')) return;
    if (event.key === 'ArrowRight') goTo(active + 1);
    if (event.key === 'ArrowLeft') goTo(active - 1);
  });

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const lightboxCount = document.querySelector('#lightbox-count');
  const imageTriggers = [...document.querySelectorAll('[data-open-image]')];
  let activeImage = 0;
  const showImage = (index) => {
    activeImage = (index + imageTriggers.length) % imageTriggers.length;
    const trigger = imageTriggers[activeImage];
    lightboxImage.src = trigger.dataset.openImage;
    lightboxImage.alt = trigger.dataset.imageAlt || '';
    lightboxCaption.textContent = trigger.dataset.imageCaption || trigger.dataset.imageAlt || '';
    lightboxCount.textContent = `${String(activeImage + 1).padStart(2, '0')} / ${String(imageTriggers.length).padStart(2, '0')}`;
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-image]');
    if (!trigger) return;
    showImage(imageTriggers.indexOf(trigger));
    if (!lightbox.open) lightbox.showModal();
  });
  document.querySelector('#lightbox-previous').addEventListener('click', () => showImage(activeImage - 1));
  document.querySelector('#lightbox-next').addEventListener('click', () => showImage(activeImage + 1));
  document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      showImage(activeImage + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  const revealItems = [...document.querySelectorAll('.story-content > *, .prose > p, .editorial-copy > p, .contents-list > li, .photo-figure')];
  const revealOrder = new Map();
  revealItems.forEach((element) => {
    element.classList.add('reveal-item');
    const parent = element.parentElement;
    const order = revealOrder.get(parent) || 0;
    revealOrder.set(parent, order + 1);
    element.style.setProperty('--reveal-delay', `${(order % 6) * 55}ms`);
  });
  const animated = new Set([...document.querySelectorAll('[data-scene], [data-figure], [data-timeline]'), ...revealItems]);
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .025 });
    animated.forEach((element) => observer.observe(element));
  } else {
    animated.forEach((element) => element.classList.add('is-visible'));
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    let waterFrame = 0;
    document.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(waterFrame);
      waterFrame = requestAnimationFrame(() => {
        const scene = event.target.closest?.('.spread');
        const water = scene?.querySelector('.water-layer');
        if (!water) return;
        const bounds = scene.getBoundingClientRect();
        water.style.setProperty('--drift-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 14}px`);
        water.style.setProperty('--drift-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 14}px`);
      });
    }, { passive: true });
  }
})();

