(() => {
  const pages = [
    ['capa', 'Capa da edição', '01-capa.png'],
    ['equipe', 'Equipe Idibi', '02-equipe.png'],
    ['sumario-editorial', 'Sumário e editorial', '03-sumario-editorial.png'],
    ['editorial', 'Editorial', '04-editorial.png'],
    ['contextualizacao', 'Contextualização e introdução', '05-introducao.png'],
    ['garimpo-1', 'Garimpo e mercúrio', '06-garimpo-1.png?v=2'],
    ['garimpo-2', 'Garimpo e mercúrio', '07-garimpo-2.png'],
    ['esgoto', 'Esgoto e saneamento', '08-esgoto.png'],
    ['esgoto-transformacao', 'Esgoto e transformação do território', '09-esgoto-transformacao.png'],
    ['transformacao-omissao', 'Transformação do território e omissão do Estado', '10-transformacao-omissao.png'],
    ['omissao', 'Omissão do Estado', '11-omissao.png'],
    ['ailton-krenak', 'Ailton Krenak', '12-ailton-krenak.png'],
    ['politicas-1', 'Políticas públicas', '13-politicas-1.png'],
    ['politicas-2', 'Políticas públicas', '14-politicas-2.png'],
    ['politicas-3', 'Políticas públicas', '15-politicas-3.png'],
    ['politicas-4', 'Políticas públicas', '16-politicas-4.png'],
    ['politicas-5', 'Políticas públicas', '17-politicas-5.png'],
    ['conclusao', 'Conclusão', '18-conclusao.png'],
    ['conclusao-referencias', 'Conclusão e referências', '19-conclusao-referencias.png'],
    ['referencias-2', 'Referências', '20-referencias-2.png'],
    ['referencias-3', 'Referências', '21-referencias-3.png'],
    ['referencias-4', 'Referências', '22-referencias-4.png'],
    ['referencias-5', 'Referências', '23-referencias-5.png'],
    ['referencias-6', 'Referências', '24-referencias-6.png'],
    ['referencias-7', 'Referências', '25-referencias-7.png'],
    ['contracapa', 'Contracapa', '26-contracapa.png'],
  ].map(([id, title, image]) => ({ id, title, image: `assets/images/figma-frames/${image}` }));

  const teamMembers = [
    ['Carlos Bellomo', 'assets/images/185-856-imgFoto-340.webp'],
    ['Davi Arakaki', 'assets/images/185-856-imgFoto1-340.webp'],
    ['João Maldonado', 'assets/images/185-856-imgFoto2-340.webp'],
    ['Giulia Manara', 'assets/images/185-856-imgFoto3-340.webp'],
    ['João Prado', 'assets/images/185-856-imgFoto4-340.webp'],
    ['Rafael Passos', 'assets/images/185-856-imgFoto5-340.webp'],
  ];

  const chapterTargets = {
    '01': 'editorial',
    '02': 'contextualizacao',
    '03': 'garimpo-1',
    '04': 'esgoto',
    '05': 'esgoto-transformacao',
    '06': 'omissao',
    '07': 'ailton-krenak',
    '08': 'politicas-1',
    '09': 'conclusao',
    '10': 'conclusao-referencias',
  };
  const chapters = [
    { numero: '01', titulo: 'Editorial', ordem: 1 },
    { numero: '02', titulo: 'Contextualização e introdução', ordem: 2 },
    { numero: '03', titulo: 'Garimpo e mercúrio', ordem: 3 },
    { numero: '04', titulo: 'Esgoto e saneamento', ordem: 4 },
    { numero: '05', titulo: 'Transformação do território', ordem: 5 },
    { numero: '06', titulo: 'Omissão do Estado', ordem: 6 },
    { numero: '07', titulo: 'Ailton Krenak', ordem: 7 },
    { numero: '08', titulo: 'Políticas públicas', ordem: 8 },
    { numero: '09', titulo: 'Conclusão', ordem: 9 },
    { numero: '10', titulo: 'Referências', ordem: 10 },
  ];
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
  // Áreas dos gráficos nas pranchas de 1440 × 1024; os SVGs mantêm os dados originais.
  const chartRegions = {
    'garimpo-2': [
      ['07-peixes.svg', 735, 22, 464, 308, 'Peixes acima do limite da OMS por tipo de alimentação'],
      ['07-yanomami.svg', 967, 357, 464, 325, 'Mercúrio no cabelo de 287 Yanomami'],
    ],
    'esgoto-transformacao': [
      ['09-investimento.svg', 292, 49, 386, 249, 'Investimento em saneamento no Norte'],
      ['09-coleta.svg', 292, 323, 386, 246, 'População com coleta de esgoto'],
    ],
    'omissao': [
      ['11-barcarena.svg', 760, 531, 645, 403, 'Linha do tempo de Barcarena'],
    ],
    'politicas-2': [
      ['14-cfem.svg', 66, 362, 588, 250, 'Distribuição da CFEM'],
      ['14-lacuna.svg', 854, 417, 473, 298, 'Compensação e lacuna de investimento'],
    ],
    'politicas-3': [
      ['15-ouro.svg', 42, 173, 619, 309, 'Fluxo do controle do ouro'],
    ],
    'politicas-4': [
      ['16-comites.svg', 720, 724, 720, 300, 'Terras em bacias com comitê'],
    ],
    'politicas-5': [
      ['17-matriz.svg', 754, 200, 658, 297, 'Propostas relacionadas aos casos'],
    ],
  };

  window.IDIBI_FIGMA_READER = {
    render() {
      const magazine = document.querySelector('#magazine');
      if (!magazine) return;
      const coverMarkup = () => (
        '<div class="figma-frame figma-frame--cover" role="group" aria-label="Capa da edição">' +
        '<div class="figma-cover__water" aria-hidden="true">' +
        '<img src="assets/images/figma-original-1711b671-5212-4fd7-807f-985a9c93345b.jpg" alt="" decoding="async" fetchpriority="high">' +
        '</div>' +
        '<div class="figma-cover__composition">' +
        '<button class="figma-cover__lockup" id="cover-start" type="button" aria-label="Começar a leitura: Equipe Idibi">' +
        '<img src="assets/images/idibi-logo.svg" alt="">' +
        '<span aria-hidden="true">idibi</span>' +
        '</button>' +
        '<p class="figma-cover__edition">EDIÇÃO 01 · EQUIPE IDIBI</p>' +
        '</div>' +
        '</div>'
      );
      const backCoverMarkup = () => (
        '<div class="figma-frame figma-frame--video-back-cover" role="group" aria-label="Contracapa com o vídeo Ingles">' +
        '<iframe title="Vídeo Ingles — Idibi" data-video-src="https://www.youtube-nocookie.com/embed/tTx8CzLqfEw?controls=0&amp;playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
        '<div class="figma-video-footer-zone" aria-hidden="true"></div>' +
        '</div>'
      );
      const teamMarkup = () => (
        '<div class="figma-frame figma-frame--team" role="group" aria-label="Equipe Idibi">' +
        '<div class="figma-team__water" aria-hidden="true">' +
        '<img src="assets/images/185-856-imgAguinha-1662.webp" alt="" decoding="async">' +
        '</div>' +
        '<div class="figma-team__left-panel" aria-hidden="true"></div>' +
        '<img class="figma-team__landscape" src="assets/images/185-856-imgImage5-600.webp" alt="Vista aérea dos rios e da floresta amazônica" width="600" height="400" decoding="async">' +
        '<div class="figma-team__image-shade" aria-hidden="true"></div>' +
        '<div class="figma-team__divider" aria-hidden="true"></div>' +
        '<h1 class="figma-team__title">Rios que adoecem<br>Mercúrio, esgoto e<br>desigualdade na<br>Amazônia.</h1>' +
        '<p class="figma-team__question">A Amazônia guarda a maior reserva de água doce do Brasil. Mas como é a vida na beira dos rios?</p>' +
        '<p class="figma-team__label">Equipe Idibi</p>' +
        '<ul class="figma-team__grid" aria-label="Integrantes da equipe">' +
        teamMembers.map(([name, image], index) => (
          '<li class="figma-team__member" style="--member-index:' + index + '">' +
          '<button class="figma-team__portrait" type="button" data-team-photo="' + index + '" aria-label="Ampliar retrato de ' + escapeHtml(name) + '">' +
          '<img src="' + image + '" alt="" width="170" height="170" draggable="false" decoding="async">' +
          '</button>' +
          '<span>' + escapeHtml(name) + '</span>' +
          '</li>'
        )).join('') +
        '</ul>' +
        '<p class="figma-team__credit">Instituto J&amp;F – Escola de Tecnologia · 2026</p>' +
        '</div>'
      );
      const summaryItem = (chapter) => (
        '<li style="--item-index:' + (chapter.ordem - 1) + '">' +
        '<button class="figma-summary__item" type="button" data-target-scene="' + chapterTargets[chapter.numero] + '" aria-label="Abrir ' + escapeHtml(chapter.titulo) + '">' +
        '<span class="figma-summary__number">' + escapeHtml(chapter.numero) + '</span>' +
        '<i aria-hidden="true"></i>' +
        '<span class="figma-summary__name">' + escapeHtml(chapter.titulo) + '</span>' +
        '<span class="figma-summary__arrow" aria-hidden="true">↗</span>' +
        '</button>' +
        '</li>'
      );
      const summaryMarkup = () => (
        '<div class="figma-frame figma-frame--editorial" role="group" aria-label="Sumário e início do editorial">' +
        '<section class="figma-summary__panel" aria-labelledby="sumario-title">' +
        '<h1 class="figma-summary__title" id="sumario-title">Sumário</h1>' +
        '<div class="figma-summary__columns">' +
        '<ol class="figma-summary__list">' + chapters.slice(0, 5).map(summaryItem).join('') + '</ol>' +
        '<ol class="figma-summary__list">' + chapters.slice(5).map(summaryItem).join('') + '</ol>' +
        '</div>' +
        '<p class="figma-editorial__institution">Instituto J&amp;F – Escola de Tecnologia · 2026</p>' +
        '</section>' +
        '<section class="figma-editorial__panel" aria-labelledby="editorial-title">' +
        '<div class="figma-editorial__water" aria-hidden="true"><img src="assets/images/185-856-imgAguinha-1662.webp" alt=""></div>' +
        '<h2 class="figma-editorial__title" id="editorial-title">Editorial</h2>' +
        '<div class="figma-editorial__columns">' +
        '<div class="figma-editorial__column">' +
        '<p class="figma-editorial__dropcap">A Constituição Federal de 1988 assegura a todos o direito a um meio ambiente ecologicamente equilibrado, mas, nos rios da Amazônia, essa garantia ainda está distante da realidade.</p>' +
        '<p>O mercúrio utilizado no garimpo e o esgoto lançado sem tratamento contaminam a água da qual dependem a alimentação, a renda e a saúde de milhões de pessoas. Esse cenário se agrava porque a exploração econômica predatória dos recursos naturais gera lucro para poucos e deixa a poluição para todos, e porque a atuação pública é insuficiente para controlar prevenir e punir a contaminação. Nesse contexto, o rio, que deveria sustentar a vida na região, converte-se em fonte de risco.</p>' +
        '</div>' +
        '<div class="figma-editorial__column">' +
        '<p>Em primeiro lugar, atividades como o garimpo e a mineração obtêm ganhos expressivos com a extração de riquezas amazônicas sem arcar com o custo de seus danos. A análise de Henri Acselrad sobre a injustiça ambiental mostra que os benefícios de certas atividades ficam concentrados em poucas mãos, enquanto os prejuízos recaem sobre os territórios e os grupos menos protegidos.</p>' +
        '<p>É o que ocorre na região: o ouro é vendido e rende lucro a quem o extrai, mas o mercúrio empregado para separá-lo é despejado nos rios, contamina os peixes e permanece na água por muito tempo. Assim, o dinheiro obtido com a atividade não permanece</p>' +
        '</div>' +
        '</div>' +
        '<p class="figma-editorial__folio">01 <span>•</span> Editorial</p>' +
        '</section>' +
        '<div class="figma-editorial__watermark" aria-hidden="true"><img src="assets/images/idibi-logo.svg" alt=""><span>idibi</span></div>' +
        '<div class="figma-editorial__divider" aria-hidden="true"></div>' +
        '</div>'
      );
      const scenesMarkup = pages.map((page, index) => {
        const title = escapeHtml(page.title);
        const frame = index === 0
          ? coverMarkup()
          : index === pages.length - 1
            ? backCoverMarkup()
          : index === 1
            ? teamMarkup()
            : index === 2
              ? summaryMarkup()
              : '<figure class="figma-frame">' +
            '<img class="figma-export" data-src="' + (chartRegions[page.id] ? page.image.replace('figma-frames/', 'code-charts/') : page.image) + '" alt="' + title + ' — página da revista Idibi" draggable="false" loading="lazy" decoding="async">' +
            (chartRegions[page.id] || []).map(([file, x, y, w, h, label]) =>
              '<img class="figma-chart-vector" src="assets/images/code-charts/' + file + '" alt="' + label + '" style="left:' + (x / 1440 * 100).toFixed(4) + '%;top:' + (y / 1024 * 100).toFixed(4) + '%;width:' + (w / 1440 * 100).toFixed(4) + '%;height:' + (h / 1024 * 100).toFixed(4) + '%" draggable="false">'
            ).join('') +
            '</figure>';
        const kind = index === 0 ? ' is-cover' : index === pages.length - 1 ? ' is-back-cover' : ' is-interior';
        return '<section class="figma-scene' + kind + (index === 0 ? ' is-active' : '') +
          '" id="' + page.id + '" data-scene data-title="' + title + '" aria-label="' + title +
          '" aria-hidden="' + (index === 0 ? 'false' : 'true') + '"><div class="figma-page-scroll"><div class="figma-page-zoom">' + frame + '</div></div></section>';
      }).join('');
      magazine.innerHTML = scenesMarkup;
      document.body.classList.add('figma-edition');
      const scenes = [...magazine.querySelectorAll('.figma-scene')];
      const sceneIndex = new Map(scenes.map((scene, index) => [scene.id, index]));
      // A conclusão e as referências ocupam dois fólios na mesma tela.
      const pageSlots = scenes.flatMap((_, index) => index === 18 ? [index, index] : [index]);
      const range = document.querySelector('#page-range');
      const count = document.querySelector('#page-count');
      const previous = document.querySelector('#previous-page');
      const next = document.querySelector('#next-page');
      const location = document.querySelector('#reader-location');
      const drawer = document.querySelector('#index-drawer');
      const drawerScrim = document.querySelector('#drawer-scrim');
      const indexTrigger = document.querySelector('#index-trigger');
      const lightbox = document.querySelector('#lightbox');
      const lightboxImage = document.querySelector('#lightbox-image');
      const lightboxCaption = document.querySelector('#lightbox-caption');
      const lightboxCount = document.querySelector('#lightbox-count');

      let activeScene = 0;
      let activeSlot = 0;
      let transitionTimer = 0;
      let drawerTimer = 0;
      let activeTeamPhoto = 0;
      let readerZoom = 1;
      let activeUtterance = null;
      let speechToken = 0;
      let chartReplay = 0;
      const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const waterTurnPages = new Set(['garimpo-1', 'esgoto-transformacao', 'politicas-4', 'conclusao-referencias']);
      const voiceButton = document.querySelector('#voice-toggle');
      const zoomOut = document.querySelector('#zoom-out');
      const zoomIn = document.querySelector('#zoom-in');
      const zoomReset = document.querySelector('#zoom-reset');
      range.min = '0';
      range.max = String(pageSlots.length - 1);
      range.value = '0';

      const slotsForScene = (index) => pageSlots.reduce((slots, value, slot) => {
        if (value === index) slots.push(slot);
        return slots;
      }, []);
      const ensureSceneImage = (index) => {
        const image = scenes[index]?.querySelector('.figma-export[data-src]');
        if (!image) return;
        image.loading = 'eager';
        image.src = image.dataset.src;
        image.parentElement.style.setProperty('--frame-image', `url("${image.dataset.src}")`);
        image.removeAttribute('data-src');
      };
      const ensureBackCoverVideo = (index) => {
        const frame = scenes[index]?.querySelector('iframe[data-video-src]');
        if (frame && !frame.hasAttribute('src')) frame.src = frame.dataset.videoSrc;
      };
      const replayChartMotion = (index) => {
        if (!motionAllowed) return;
        scenes[index]?.querySelectorAll('.figma-chart-vector').forEach((chart) => {
          const source = chart.dataset.chartSource || chart.getAttribute('src').split('?')[0];
          chart.dataset.chartSource = source;
          // O fluxograma é estático; apenas gráficos e linha do tempo se animam.
          if (source.endsWith('/15-ouro.svg')) return;
          chart.src = `${source}?motion=${++chartReplay}`;
        });
      };
      const stopNarration = () => {
        speechToken += 1;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        activeUtterance = null;
        voiceButton.setAttribute('aria-pressed', 'false');
        voiceButton.setAttribute('aria-label', 'Ouvir página');
        voiceButton.title = 'Ouvir página';
      };
      const setZoom = (value) => {
        readerZoom = Math.max(.6, Math.min(2.5, Math.round(value * 10) / 10));
        document.body.style.setProperty('--reader-zoom', String(readerZoom));
        zoomReset.textContent = `${Math.round(readerZoom * 100)}%`;
        zoomOut.disabled = readerZoom <= .6;
        zoomIn.disabled = readerZoom >= 2.5;
      };
      zoomOut.addEventListener('click', () => setZoom(readerZoom - .2));
      zoomIn.addEventListener('click', () => setZoom(readerZoom + .2));
      zoomReset.addEventListener('click', () => setZoom(1));
      setZoom(1);
      if (!('speechSynthesis' in window)) {
        voiceButton.disabled = true;
        voiceButton.title = 'Leitura em voz alta indisponível neste navegador';
      } else {
        document.addEventListener('visibilitychange', () => { if (document.hidden) stopNarration(); });
        voiceButton.addEventListener('click', () => {
          if (voiceButton.getAttribute('aria-pressed') === 'true') {
            stopNarration();
            return;
          }
          stopNarration();
          const scene = scenes[activeScene];
          const transcript = scene.querySelector('.figma-export')
            ? window.IDIBI_PAGE_NARRATION?.[scene.id]
            : scene.innerText;
          const text = `${scene.dataset.title}. ${transcript || scene.dataset.title}`.replace(/\s+/g, ' ').trim();
          const words = text.split(' ');
          const chunks = [];
          let chunk = '';
          for (const word of words) {
            if (chunk.length + word.length > 180 && chunk) {
              chunks.push(chunk);
              chunk = '';
            }
            chunk += (chunk ? ' ' : '') + word;
          }
          if (chunk) chunks.push(chunk);
          const token = speechToken;
          const voices = window.speechSynthesis.getVoices();
          const portugueseVoice = voices.find((voice) => voice.lang.toLowerCase() === 'pt-br') || voices.find((voice) => voice.lang.toLowerCase().startsWith('pt'));
          let nextChunk = 0;
          const speakNext = () => {
            if (token !== speechToken) return;
            if (nextChunk >= chunks.length) {
              stopNarration();
              return;
            }
            activeUtterance = new SpeechSynthesisUtterance(chunks[nextChunk++]);
            activeUtterance.lang = 'pt-BR';
            activeUtterance.rate = .95;
            if (portugueseVoice) activeUtterance.voice = portugueseVoice;
            activeUtterance.onend = speakNext;
            activeUtterance.onerror = stopNarration;
            window.speechSynthesis.speak(activeUtterance);
          };
          voiceButton.setAttribute('aria-pressed', 'true');
          voiceButton.setAttribute('aria-label', 'Parar leitura');
          voiceButton.title = 'Parar leitura';
          speakNext();
        });
      }
      const fullscreenButton = document.querySelector('#reader-fullscreen');
      fullscreenButton.addEventListener('click', async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await document.documentElement.requestFullscreen();
        } catch (_) { /* O navegador pode bloquear tela cheia. */ }
      });
      document.addEventListener('fullscreenchange', () => {
        fullscreenButton.setAttribute('aria-label', document.fullscreenElement ? 'Sair da tela cheia' : 'Entrar em tela cheia');
      });
      const updateControls = () => {
        const isCover = activeScene === 0 || activeScene === scenes.length - 1;
        document.body.classList.toggle('is-on-cover', isCover);
        if (!isCover) document.body.classList.remove('is-cover-footer-visible');
        const slots = slotsForScene(activeScene);
        const start = slots[0] + 1;
        const end = slots[slots.length - 1] + 1;
        count.innerHTML = `${String(start).padStart(2, '0')}${end > start ? `–${String(end).padStart(2, '0')}` : ''} <i>/</i> ${pageSlots.length}`;
        range.value = String(activeSlot);
        range.style.setProperty('--progress', `${(activeSlot / (pageSlots.length - 1)) * 100}%`);
        previous.disabled = activeSlot === 0;
        next.disabled = activeSlot === pageSlots.length - 1;
        location.textContent = scenes[activeScene].dataset.title;
        document.querySelectorAll('#drawer-links a[data-target]').forEach((link) => {
          if (link.dataset.target === scenes[activeScene].id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      };

      const showScene = (index, direction) => {
        if (index === activeScene) return;
        stopNarration();
        ensureSceneImage(index);
        ensureBackCoverVideo(index);
        replayChartMotion(index);
        const outgoing = scenes[activeScene];
        const incoming = scenes[index];
        window.clearTimeout(transitionTimer);
        magazine.querySelector('.cover-water-transition')?.remove();
        scenes.forEach((scene) => scene.classList.remove('cover-water-out', 'cover-water-in'));
        scenes.forEach((scene) => {
          if (scene !== outgoing && scene !== incoming) {
            scene.querySelectorAll('.figma-turn-leaf, .figma-turn-back').forEach((element) => element.remove());
            scene.classList.remove('is-active', 'is-leaving', 'leave-next', 'leave-previous', 'is-entering', 'enter-next', 'enter-previous', 'is-turned-next', 'is-turned-previous', 'turn-water', 'turn-middle');
          }
        });
        // A page can be revisited before its previous turn cleanup timer fires.
        // Remove its old turned leaf before cloning it as the incoming page's back.
        incoming.querySelectorAll('.figma-turn-leaf, .figma-turn-back').forEach((element) => element.remove());
        const coverWater = motionAllowed && outgoing.id === 'capa' && direction === 'next';
        const waterTurn = motionAllowed && !coverWater && waterTurnPages.has(incoming.id);
        const middleTurn = motionAllowed && !coverWater && createTurningHalf(outgoing, incoming, direction);
        outgoing.classList.remove('enter-next', 'enter-previous', 'is-entering');
        outgoing.classList.remove('turn-water', 'turn-middle');
        outgoing.classList.add('is-leaving', `leave-${direction}`);
        if (waterTurn) outgoing.classList.add('turn-water');
        if (middleTurn) outgoing.classList.add('turn-middle');
        outgoing.setAttribute('aria-hidden', 'true');
        incoming.classList.remove('is-leaving', 'leave-next', 'leave-previous', 'is-turned-next', 'is-turned-previous', 'turn-water', 'turn-middle');
        incoming.classList.add('is-active', 'is-entering', `enter-${direction}`);
        incoming.setAttribute('aria-hidden', 'false');
        if (coverWater) {
          outgoing.classList.add('cover-water-out');
          incoming.classList.add('cover-water-in');
          const wash = document.createElement('div');
          wash.className = 'cover-water-transition';
          wash.setAttribute('aria-hidden', 'true');
          wash.innerHTML = '<svg class="cover-water-wave cover-water-wave--mist" viewBox="0 0 1600 1200" preserveAspectRatio="none"><path fill="#b9ecff" d="M0 100 C240 -80 410 200 720 80 S1210 -80 1600 100 V1200 H0Z"/></svg>' +
            '<svg class="cover-water-wave cover-water-wave--body" viewBox="0 0 1600 1200" preserveAspectRatio="none"><defs><linearGradient id="idibi-opening-water" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#e4f8ff"/><stop offset=".16" stop-color="#b9ecff"/><stop offset=".6" stop-color="#64c1d5"/><stop offset="1" stop-color="#176779"/></linearGradient></defs><path fill="url(#idibi-opening-water)" d="M0 115 C300 230 360 -80 760 85 S1250 230 1600 60 V1200 H0Z"/><path fill="none" stroke="#fff2f2" stroke-opacity=".7" stroke-width="2" d="M0 115 C300 230 360 -80 760 85 S1250 230 1600 60"/></svg>' +
            '<svg class="cover-water-wave cover-water-wave--foam" viewBox="0 0 1600 1200" preserveAspectRatio="none"><path fill="#e5f8ff" fill-opacity=".3" d="M0 130 C340 -50 470 200 850 75 S1360 -40 1600 150 V1200 H0Z"/></svg><div class="cover-water-caustics"></div>';
          magazine.append(wash);
        }
        activeScene = index;
        ensureSceneImage(index - 1);
        ensureSceneImage(index + 1);
        requestAnimationFrame(() => requestAnimationFrame(() => incoming.classList.remove('is-entering')));
        transitionTimer = window.setTimeout(() => {
          outgoing.classList.add(`is-turned-${direction}`);
          outgoing.querySelector('.figma-turn-leaf')?.remove();
          outgoing.querySelector('.figma-turn-back')?.remove();
          outgoing.classList.remove('is-active', 'is-leaving', 'leave-next', 'leave-previous', 'turn-water', 'turn-middle');
          incoming.classList.remove('is-entering', 'enter-next', 'enter-previous');
          outgoing.classList.remove('cover-water-out');
          incoming.classList.remove('cover-water-in');
          magazine.querySelector('.cover-water-transition')?.remove();
          outgoing.querySelector('iframe[data-video-src]')?.removeAttribute('src');
        }, motionAllowed ? (coverWater ? 1800 : waterTurn ? 1160 : 1040) : 0);
      };

      const goToSlot = (slot) => {
        const requestedSlot = Number(slot);
        if (!Number.isFinite(requestedSlot)) return;
        const safeSlot = Math.max(0, Math.min(pageSlots.length - 1, requestedSlot));
        const targetScene = pageSlots[safeSlot];
        const direction = safeSlot >= activeSlot ? 'next' : 'previous';
        activeSlot = safeSlot;
        showScene(targetScene, direction);
        updateControls();
      };
      const goToScene = (id) => {
        const index = sceneIndex.get(id);
        if (index === undefined) return;
        const slots = slotsForScene(index);
        goToSlot(slots[0]);
      };

      const createTurningHalf = (scene, nextScene, direction) => {
        const frame = scene.querySelector('.figma-page-zoom > .figma-frame');
        const nextFrame = nextScene.querySelector('.figma-page-zoom > .figma-frame');
        if (!frame || frame.querySelector('iframe')) return false;
        frame.parentElement.querySelector('.figma-turn-leaf')?.remove();
        frame.parentElement.querySelector('.figma-turn-back')?.remove();
        const leaf = frame.cloneNode(true);
        leaf.classList.add('figma-turn-leaf');
        const rasterLeaf = Boolean(frame.querySelector(':scope > .figma-export'));
        if (rasterLeaf) {
          leaf.classList.add('figma-turn-leaf--raster');
          leaf.style.setProperty('width', 'calc(var(--page-width)*.5)', 'important');
          leaf.style.setProperty('left', direction === 'next' ? '50%' : '0%', 'important');
          leaf.style.setProperty('clip-path', 'none', 'important');
          leaf.style.setProperty('isolation', 'auto', 'important');
          leaf.style.setProperty('transform-origin', direction === 'next' ? '0% 50%' : '100% 50%', 'important');
        }
        leaf.setAttribute('aria-hidden', 'true');
        leaf.inert = true;
        leaf.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
        leaf.querySelectorAll('button,a,input,select,textarea,[tabindex]').forEach((element) => element.setAttribute('tabindex', '-1'));
        const back = document.createElement('div');
        back.className = `figma-turn-back figma-turn-back--${direction}${rasterLeaf ? ' figma-turn-back--raster' : ''}`;
        back.setAttribute('aria-hidden', 'true');
        back.inert = true;
        if (nextFrame) {
          const backArt = nextFrame.cloneNode(true);
          backArt.classList.add('figma-turn-back__art');
          backArt.setAttribute('aria-hidden', 'true');
          backArt.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
          backArt.querySelectorAll('iframe').forEach((element) => element.remove());
          back.append(backArt);
        }
        leaf.append(back);
        frame.parentElement.append(leaf);
        return true;
      };

      // Um reflexo aquático acompanha o mouse, com ondulações leves ao tocar
      // na página. O arraste horizontal também vira o fólio, como numa revista.
      const waterCursor = document.createElement('div');
      waterCursor.className = 'reader-water-cursor';
      waterCursor.setAttribute('aria-hidden', 'true');
      magazine.append(waterCursor);
      let waterCursorTimer = 0;
      let pageDrag = null;
      const showWaterRipple = (x, y) => {
        const ripple = document.createElement('span');
        ripple.className = 'reader-water-ripple';
        ripple.style.setProperty('--ripple-x', `${x}px`);
        ripple.style.setProperty('--ripple-y', `${y}px`);
        magazine.append(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      };
      magazine.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse' || !event.target.closest?.('.figma-page-scroll')) return;
        waterCursor.style.setProperty('--water-x', `${event.clientX}px`);
        waterCursor.style.setProperty('--water-y', `${event.clientY}px`);
        waterCursor.classList.add('is-visible');
        window.clearTimeout(waterCursorTimer);
        waterCursorTimer = window.setTimeout(() => waterCursor.classList.remove('is-visible'), 520);
      }, { passive: true });
      magazine.addEventListener('pointerleave', () => waterCursor.classList.remove('is-visible'));
      magazine.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || !event.target.closest?.('.figma-page-scroll')) return;
        if (event.target.closest('button,a,input,[contenteditable="true"]')) return;
        showWaterRipple(event.clientX, event.clientY);
        if (readerZoom <= 1.05) pageDrag = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
      });
      document.addEventListener('pointerup', (event) => {
        if (!pageDrag || event.pointerId !== pageDrag.pointerId) return;
        const deltaX = event.clientX - pageDrag.x;
        const deltaY = event.clientY - pageDrag.y;
        pageDrag = null;
        if (Math.abs(deltaX) < 76 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
        goToSlot(activeSlot + (deltaX < 0 ? 1 : -1));
      });
      document.addEventListener('pointercancel', () => { pageDrag = null; });

      // Nas duas capas, revelar os controles quando o ponteiro se aproxima da borda inferior.
      document.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch' || (activeScene !== 0 && activeScene !== scenes.length - 1)) return;
        const nearBottom = event.clientY >= window.innerHeight - 130;
        const overFooter = event.target instanceof Element && Boolean(event.target.closest('.reader-footer'));
        document.body.classList.toggle('is-cover-footer-visible', nearBottom || overFooter);
      }, { passive: true });
      const videoFooterZone = scenes[scenes.length - 1].querySelector('.figma-video-footer-zone');
      videoFooterZone.addEventListener('pointerleave', (event) => {
        if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest('.reader-footer')) {
          document.body.classList.remove('is-cover-footer-visible');
        }
      });
      document.querySelector('.reader-footer').addEventListener('pointerleave', (event) => {
        if (activeScene === scenes.length - 1 && (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest('.figma-video-footer-zone'))) {
          document.body.classList.remove('is-cover-footer-visible');
        }
      });

      // Bind the reader controls before building optional index content so a
      // missing chapter entry can never leave the next/previous buttons inert.
      previous.addEventListener('click', () => goToSlot(activeSlot - 1));
      next.addEventListener('click', () => goToSlot(activeSlot + 1));
      range.addEventListener('input', () => goToSlot(range.value));
      window.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || lightbox.open) return;
        if (event.target instanceof Element && event.target.closest('input,textarea,select,button,[contenteditable="true"]')) return;
        if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); goToSlot(activeSlot + 1); }
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goToSlot(activeSlot - 1); }
        if (event.key === 'Home') goToSlot(0);
        if (event.key === 'End') goToSlot(pageSlots.length - 1);
        if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(readerZoom + .2); }
        if (event.key === '-') { event.preventDefault(); setZoom(readerZoom - .2); }
        if (event.key === '0') { event.preventDefault(); setZoom(1); }
      });

      document.querySelector('#drawer-links').innerHTML = chapters.map((chapter) => {
        const target = chapterTargets[chapter.numero];
        if (!target) return '';
        const delay = Math.max(0, Number(chapter.ordem) || 0) * 24;
        return `<li style="--chapter-delay:${delay}ms"><a href="#${target}" data-target="${target}"><span>${escapeHtml(chapter.numero)}</span><strong>${escapeHtml(chapter.titulo)}</strong><span aria-hidden="true">↗</span></a></li>`;
      }).join('');
      document.querySelector('#drawer-summary').href = '#sumario-editorial';

      const closeIndex = () => {
        if (drawer.hidden) return;
        drawer.classList.remove('is-open');
        drawerScrim.classList.remove('is-open');
        indexTrigger.setAttribute('aria-expanded', 'false');
        indexTrigger.setAttribute('aria-label', 'Abrir índice');
        window.clearTimeout(drawerTimer);
        drawerTimer = window.setTimeout(() => {
          drawer.hidden = true;
          drawerScrim.hidden = true;
        }, motionAllowed ? 420 : 0);
      };
      const openIndex = () => {
        window.clearTimeout(drawerTimer);
        drawer.hidden = false;
        drawerScrim.hidden = false;
        requestAnimationFrame(() => {
          drawer.classList.add('is-open');
          drawerScrim.classList.add('is-open');
        });
        indexTrigger.setAttribute('aria-expanded', 'true');
        indexTrigger.setAttribute('aria-label', 'Fechar índice');
      };
      indexTrigger.addEventListener('click', () => drawer.hidden ? openIndex() : closeIndex());
      document.querySelector('#close-index').addEventListener('click', closeIndex);
      drawerScrim.addEventListener('click', closeIndex);
      drawer.addEventListener('click', (event) => {
        const link = event.target.closest('a[data-target]');
        if (!link) return;
        event.preventDefault();
        goToScene(link.dataset.target);
        closeIndex();
      });
      document.querySelector('#drawer-summary').addEventListener('click', (event) => {
        event.preventDefault();
        goToScene('sumario-editorial');
        closeIndex();
      });
      document.querySelector('#cover-start')?.addEventListener('click', () => goToScene('equipe'));

      document.querySelector('#continue-reading')?.addEventListener('click', () => goToScene('equipe'));

      const openTeamPhoto = (index) => {
        activeTeamPhoto = (index + teamMembers.length) % teamMembers.length;
        const [name, image] = teamMembers[activeTeamPhoto];
        lightboxImage.src = image;
        lightboxImage.alt = `Retrato de ${name}`;
        lightboxCaption.textContent = `${name} · Equipe Idibi`;
        lightboxCount.textContent = `${String(activeTeamPhoto + 1).padStart(2, '0')} / ${String(teamMembers.length).padStart(2, '0')}`;
        if (!lightbox.open) lightbox.showModal();
      };
      magazine.addEventListener('click', (event) => {
        const chapterLink = event.target.closest('[data-target-scene]');
        if (chapterLink) {
          goToScene(chapterLink.dataset.targetScene);
          return;
        }
        const portrait = event.target.closest('[data-team-photo]');
        if (portrait) openTeamPhoto(Number(portrait.dataset.teamPhoto));
      });
      const stepLightbox = (direction) => {
        openTeamPhoto(activeTeamPhoto + direction);
      };
      document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
      document.querySelector('#lightbox-previous').addEventListener('click', () => stepLightbox(-1));
      document.querySelector('#lightbox-next').addEventListener('click', () => stepLightbox(1));
      lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

      let touchStart = null;
      magazine.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1 || event.target.closest('button,a,input,dialog')) return;
        touchStart = [event.touches[0].clientX, event.touches[0].clientY];
      }, { passive: true });
      magazine.addEventListener('touchend', (event) => {
        if (!touchStart || event.changedTouches.length !== 1) return;
        if (readerZoom > 1) { touchStart = null; return; }
        const dx = event.changedTouches[0].clientX - touchStart[0];
        const dy = event.changedTouches[0].clientY - touchStart[1];
        touchStart = null;
        if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.25) goToSlot(activeSlot + (dx < 0 ? 1 : -1));
      }, { passive: true });
      updateControls();
    },
  };
})();

window.IDIBI_FIGMA_READER.render();
