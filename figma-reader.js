(() => {
  const pages = [
    ['capa', 'Capa da edição', '01-capa.png'],
    ['equipe', 'Equipe Idibi', '02-equipe.png'],
    ['sumario-editorial', 'Sumário e editorial', '03-sumario-editorial.png'],
    ['editorial', 'Editorial', '04-editorial.png'],
    ['contextualizacao', 'Contextualização e introdução', '05-introducao.png'],
    ['garimpo-1', 'Garimpo e mercúrio', '06-garimpo-1.png'],
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
    '01': 'sumario-editorial',
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
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));

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
      const teamMarkup = () => (
        '<div class="figma-frame figma-frame--team" role="group" aria-label="Equipe Idibi">' +
        '<div class="figma-team__water" aria-hidden="true">' +
        '<img src="assets/images/185-856-imgAguinha-1662.webp" alt="" decoding="async">' +
        '</div>' +
        '<div class="figma-team__left-panel" aria-hidden="true"></div>' +
        '<img class="figma-team__landscape" src="assets/images/185-856-imgImage5-600.webp" alt="Vista aérea dos rios e da floresta amazônica" width="600" height="400" decoding="async">' +
        '<div class="figma-team__image-shade" aria-hidden="true"></div>' +
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
      const scenesMarkup = pages.map((page, index) => {
        const title = escapeHtml(page.title);
        const frame = index === 0
          ? coverMarkup()
          : index === 1
            ? teamMarkup()
            : '<figure class="figma-frame">' +
            '<img class="figma-export" src="' + page.image + '" alt="' + title + ' — página original da revista Idibi" draggable="false" ' +
            (index < 2 ? 'fetchpriority="high"' : 'loading="lazy"') + '>' +
            '</figure>';
        return '<section class="figma-scene' + (index === 0 ? ' is-active' : '') +
          '" id="' + page.id + '" data-scene data-title="' + title + '" aria-label="' + title +
          '" aria-hidden="' + (index === 0 ? 'false' : 'true') + '">' + frame + '</section>';
      }).join('');
      magazine.innerHTML = scenesMarkup;
      document.body.classList.add('figma-edition');

      const scenes = [...magazine.querySelectorAll('.figma-scene')];
      const sceneIndex = new Map(scenes.map((scene, index) => [scene.id, index]));
      // Duas telas são duplas editoriais com dois fólios; cada tela continua sendo uma só exportação do Figma.
      const pageSlots = scenes.flatMap((_, index) => [2, 18].includes(index) ? [index, index] : [index]);
      const range = document.querySelector('#page-range');
      const count = document.querySelector('#page-count');
      const previous = document.querySelector('#previous-page');
      const next = document.querySelector('#next-page');
      const zoom = document.querySelector('#zoom-page');
      const location = document.querySelector('#reader-location');
      const progress = document.querySelector('#top-progress-fill');
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
      let lightboxMode = 'page';
      let activeTeamPhoto = 0;
      const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      range.min = '0';
      range.max = String(pageSlots.length - 1);
      range.value = '0';

      const slotsForScene = (index) => pageSlots.reduce((slots, value, slot) => {
        if (value === index) slots.push(slot);
        return slots;
      }, []);
      const updateControls = () => {
        const slots = slotsForScene(activeScene);
        const start = slots[0] + 1;
        const end = slots[slots.length - 1] + 1;
        count.innerHTML = `${String(start).padStart(2, '0')}${end > start ? `–${String(end).padStart(2, '0')}` : ''} <i>/</i> 28`;
        range.value = String(activeSlot);
        range.style.setProperty('--progress', `${(activeSlot / (pageSlots.length - 1)) * 100}%`);
        previous.disabled = activeSlot === 0;
        next.disabled = activeSlot === pageSlots.length - 1;
        location.textContent = scenes[activeScene].dataset.title;
        progress.style.transform = `scaleX(${activeSlot / (pageSlots.length - 1)})`;
        document.querySelectorAll('#drawer-links a[data-target]').forEach((link) => {
          if (link.dataset.target === scenes[activeScene].id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
        if (lightbox.open && lightboxMode === 'page') syncLightbox();
      };

      const showScene = (index, direction) => {
        if (index === activeScene) return;
        const outgoing = scenes[activeScene];
        const incoming = scenes[index];
        window.clearTimeout(transitionTimer);
        scenes.forEach((scene) => {
          if (scene !== outgoing && scene !== incoming) scene.classList.remove('is-leaving', 'leave-next', 'leave-previous', 'is-entering', 'enter-next', 'enter-previous');
        });
        outgoing.classList.remove('is-active', 'enter-next', 'enter-previous', 'is-entering');
        outgoing.classList.add('is-leaving', `leave-${direction}`);
        outgoing.setAttribute('aria-hidden', 'true');
        incoming.classList.remove('is-leaving', 'leave-next', 'leave-previous');
        incoming.classList.add('is-active', 'is-entering', `enter-${direction}`);
        incoming.setAttribute('aria-hidden', 'false');
        activeScene = index;
        requestAnimationFrame(() => requestAnimationFrame(() => incoming.classList.remove('is-entering')));
        transitionTimer = window.setTimeout(() => {
          outgoing.classList.remove('is-leaving', 'leave-next', 'leave-previous');
          incoming.classList.remove('is-entering', 'enter-next', 'enter-previous');
        }, motionAllowed ? 820 : 0);
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
      });

      const chapters = window.IDIBI_DATA?.chapters || [];
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
      document.querySelector('.brand').addEventListener('click', (event) => {
        event.preventDefault();
        goToScene('capa');
      });
      document.querySelector('#cover-start')?.addEventListener('click', () => goToScene('equipe'));

      document.querySelector('#continue-reading')?.addEventListener('click', () => goToScene('equipe'));

      const syncLightbox = () => {
        const page = pages[activeScene];
        lightboxImage.src = page.image;
        lightboxImage.alt = `${page.title} — página original da revista Idibi, ampliada`;
        lightboxCaption.textContent = `${page.title} · Tela original do Figma`;
        const slots = slotsForScene(activeScene);
        lightboxCount.textContent = `${String(slots[0] + 1).padStart(2, '0')}${slots.length > 1 ? `–${String(slots.at(-1) + 1).padStart(2, '0')}` : ''} / 28`;
      };
      const openZoom = () => {
        lightboxMode = 'page';
        syncLightbox();
        if (!lightbox.open) lightbox.showModal();
      };
      const openTeamPhoto = (index) => {
        activeTeamPhoto = (index + teamMembers.length) % teamMembers.length;
        const [name, image] = teamMembers[activeTeamPhoto];
        lightboxMode = 'team';
        lightboxImage.src = image;
        lightboxImage.alt = `Retrato de ${name}`;
        lightboxCaption.textContent = `${name} · Equipe Idibi`;
        lightboxCount.textContent = `${String(activeTeamPhoto + 1).padStart(2, '0')} / ${String(teamMembers.length).padStart(2, '0')}`;
        if (!lightbox.open) lightbox.showModal();
      };
      magazine.addEventListener('click', (event) => {
        const portrait = event.target.closest('[data-team-photo]');
        if (portrait) openTeamPhoto(Number(portrait.dataset.teamPhoto));
      });
      const stepLightbox = (direction) => {
        if (lightboxMode === 'team') {
          openTeamPhoto(activeTeamPhoto + direction);
          return;
        }
        goToSlot(activeSlot + direction);
      };
      zoom.addEventListener('click', openZoom);
      document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
      document.querySelector('#lightbox-previous').addEventListener('click', () => stepLightbox(-1));
      document.querySelector('#lightbox-next').addEventListener('click', () => stepLightbox(1));
      lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
      lightbox.addEventListener('close', () => { lightboxMode = 'page'; });

      let touchStart = null;
      magazine.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1 || event.target.closest('button,a,input,dialog')) return;
        touchStart = [event.touches[0].clientX, event.touches[0].clientY];
      }, { passive: true });
      magazine.addEventListener('touchend', (event) => {
        if (!touchStart || event.changedTouches.length !== 1) return;
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
