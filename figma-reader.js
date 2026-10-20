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
      const editorialContinuationMarkup = () => (
        '<div class="figma-frame figma-frame--editorial-continuation" role="group" aria-label="Editorial — continuação">' +
        '<div class="figma-editorial-continuation__left-image" aria-hidden="true"><img src="assets/images/185-674-imgImage1-200.webp" alt=""></div>' +
        '<div class="figma-editorial-continuation__dark-panel" aria-hidden="true"></div>' +
        '<div class="figma-editorial-continuation__water" aria-hidden="true"><img src="assets/images/185-856-imgAguinha-1662.webp" alt=""></div>' +
        '<img class="figma-editorial-continuation__river" src="assets/images/185-674-imgImage6-992.webp" alt="Vista aérea de um rio amazônico cercado pela floresta" decoding="async">' +
        '<div class="figma-editorial-continuation__column figma-editorial-continuation__column--left">' +
        '<p>na região, ao passo que o custo de tratar a água, recuperar o ambiente e cuidar dos doentes recai sobre os moradores e sobre os cofres públicos. Como poluir custa menos do que preservar, a prática tende a se repetir, e os rios amazônicos continuam a pagar por uma riqueza que não beneficia a maior parte de quem vive neles.</p>' +
        '<p class="figma-editorial-continuation__dropcap">Além disso, essa degradação se prolonga porque o poder público não consegue impedi-la nem corrigi-la. A permanência desse cenário se aproxima da análise de Charles Tilly, segundo a qual desigualdades podem ser reproduzidas pelas próprias rotinas das instituições, que, ao se repetirem, passam a ser vistas como normais.</p>' +
        '</div>' +
        '<div class="figma-editorial-continuation__column figma-editorial-continuation__column--card">' +
        '<p>Na Amazônia, essa lógica aparece em cidades que convivem há décadas com a falta de coleta e tratamento de esgoto, em garimpos ilegais que funcionam em áreas distantes da fiscalização e em processos que demoram a resultar em punição ou reparação.</p>' +
        '<p>Como a omissão se repete, o poluidor passa a contar com a impunidade, e a população se acostuma a usar água de má qualidade. Consequentemente, aumentam as doenças ligadas à água contaminada, que sobrecarregam o sistema de saúde, e diminui a pesca, o que reduz a renda de trabalhadores e ameaça a segurança alimentar de famílias ribeirinhas e periféricas. Dessa maneira, a negligência pública, ao se tornar rotina, mantém a poluição iniciada pela busca de lucro.</p>' +
        '</div>' +
        '<div class="figma-editorial-continuation__column figma-editorial-continuation__column--right-first">' +
        '<p class="figma-editorial-continuation__dropcap">Portanto, é necessário que o problema seja enfrentado em suas duas frentes. Cabe ao Ministério do Meio Ambiente e Mudança do Clima, em parceria com o Ibama e com os governos estaduais, fortalecer a fiscalização e a responsabilização das atividades poluidoras.</p>' +
        '<p>Isso deve ocorrer por meio de monitoramento contínuo da qualidade da água dos principais rios, com divulgação pública dos resultados, e de multas e exigências de reparação proporcionais ao dano, de modo que quem lucra com a exploração também arque com o custo da recuperação ambiental.</p>' +
        '</div>' +
        '<div class="figma-editorial-continuation__column figma-editorial-continuation__column--right-second">' +
        '<p class="figma-editorial-continuation__dropcap">Paralelamente, o Ministério das Cidades, em conjunto com os municípios, deve ampliar a rede de coleta e tratamento de esgoto, destinando recursos federais às cidades amazônicas que cumprirem metas de expansão. Com isso, a contaminação deixará de ser tolerada como algo comum, e os rios da Amazônia poderão, enfim, garantir à população o direito previsto na Constituição.</p>' +
        '</div>' +
        '<p class="figma-editorial-continuation__credit figma-editorial-continuation__credit--tilly">Charles Tilly — Foto: Histories of New School</p>' +
        '<p class="figma-editorial-continuation__credit figma-editorial-continuation__credit--river">Amazônia — Foto: CAF</p>' +
        '<p class="figma-editorial-continuation__folio figma-editorial-continuation__folio--left">01 <span>•</span> Editorial</p>' +
        '<p class="figma-editorial-continuation__folio figma-editorial-continuation__folio--right">01 <span>•</span> Editorial</p>' +
        '<div class="figma-editorial-continuation__divider" aria-hidden="true"></div>' +
        '</div>'
      );
      const contextualizacaoMarkup = () => (
        '<div class="figma-frame figma-frame--contextualizacao" role="group" aria-label="Quem paga a conta da poluição dos rios amazônicos?">' +
        '<div class="figma-contextualizacao__left-panel" aria-hidden="true"></div>' +
        '<div class="figma-contextualizacao__hero"><img src="assets/images/185-697-imgImage7-1024.webp" alt="Mulher Munduruku segurando uma criança nas águas do rio" decoding="async"></div>' +
        '<div class="figma-contextualizacao__water" aria-hidden="true"><img src="assets/images/185-856-imgAguinha-1662.webp" alt=""></div>' +
        '<p class="figma-contextualizacao__photo-credit">Povo Munduruku — Foto: Marcelo Camargo | Agência Brasil</p>' +
        '<h1 class="figma-contextualizacao__title">Quem paga a conta da<br>poluição dos rios<br>amazônicos?</h1>' +
        '<div class="figma-contextualizacao__column figma-contextualizacao__column--left-first">' +
        '<p class="figma-contextualizacao__dropcap">A Amazônia guarda cerca de 80% da água doce do Brasil. Mesmo assim, muitas famílias ali vivem de água contaminada. Por que a poluição dos rios amazônicos continua, se é conhecida, medida e proibida por lei?</p>' +
        '<p>O sociólogo C. Wright Mills propõe, para isso, separar os problemas pessoais, que parecem azar, das questões públicas, que nascem da forma como a sociedade se organiza. Um Yanomami com mercúrio ou uma família com diarreia em Belém parecem casos isolados, mas, repetidos por décadas, viram estrutura.</p>' +
        '</div>' +
        '<div class="figma-contextualizacao__column figma-contextualizacao__column--left-second">' +
        '<p>Três forças degradam os rios. A primeira é a mineração. Em 2022, o bioma da Amazônia tinha 92% da área garimpada do país, e 77% do garimpo da região ficava a até 500 metros de rios ou lagos. Há também rejeitos industriais, como em Barcarena.</p>' +
        '</div>' +
        '<aside class="figma-contextualizacao__callout">A Amazônia guarda a maior reserva de água doce do Brasil. Mas quem vive à beira dos rios convive com mercúrio no peixe, esgoto na porta e rios tomados por lavouras e usinas. Esta reportagem pergunta quem paga essa conta e por que ela continua sendo cobrada das mesmas pessoas.</aside>' +
        '<div class="figma-contextualizacao__column figma-contextualizacao__column--right-first">' +
        '<p class="figma-contextualizacao__dropcap">A segunda é o esgoto. Em 2024, só 16,6% da população do Norte tinha coleta, enquanto no Sudeste era de 80,8%. Pelas contas do grupo, são mais de 14 milhões de pessoas sem o serviço. A terceira é a transformação do território. Onde a floresta vira lavoura, o agrotóxico chega à água. Onde o rio vira usina, falta água para peixes e famílias.</p>' +
        '<p>O Estado não está ausente. Muitas vezes foi ele que planejou, financiou ou licenciou a atividade, e depois fiscalizou pouco e tarde. Para esta reportagem, os rios adoecem por um modelo que trata a Amazônia como fornecedora de matéria-prima e energia para fora dela e só investe onde dá lucro.</p>' +
        '</div>' +
        '<div class="figma-contextualizacao__column figma-contextualizacao__column--right-second">' +
        '<p>Mas parte do lucro fica na região, com financiadores do garimpo, grandes produtores e grupos políticos. A divisão que importa é entre quem decide e lucra e quem vive do rio. E a ideia que Ailton Krenak combate é o rio como recurso, e não como parente.</p>' +
        '<p>Quem vive do rio são indígenas, ribeirinhos, pescadores, quilombolas e moradores das periferias do Norte. Ficam com o dano e quase nada do ganho, e isso é injustiça ambiental. E não formam um bloco, pois há quem apoie o garimpo ou a obra.</p>' +
        '</div>' +
        '<p class="figma-contextualizacao__folio figma-contextualizacao__folio--left">02 <span>•</span> Contextualização &amp; introdução</p>' +
        '<p class="figma-contextualizacao__folio figma-contextualizacao__folio--right">02 <span>•</span> Contextualização &amp; introdução</p>' +
        '<div class="figma-contextualizacao__divider" aria-hidden="true"></div>' +
        '</div>'
      );
      const esgotoMarkup = () => (
        '<div class="figma-frame figma-frame--esgoto" role="group" aria-label="Esgoto e saneamento na Amazônia Legal">' +
        '<div class="figma-esgoto__water" aria-hidden="true"><img src="assets/images/243-854-water.png" alt=""></div>' +
        '<img class="figma-esgoto__portrait" src="assets/images/243-854-suane.png" alt="Suane Barreirinhas, liderança comunitária da Vila da Barca." decoding="async">' +
        '<p class="figma-esgoto__portrait-credit">Suane Barreirinhas — Foto: Amazônia Latitude | Reprodução</p>' +
        '<div class="figma-esgoto__quote-panel" aria-hidden="true"></div>' +
        '<span class="figma-esgoto__quote-mark" aria-hidden="true">“</span>' +
        '<blockquote class="figma-esgoto__quote">O que a gente está denunciando como racismo ambiental é muito mais do que a estação elevatória”</blockquote>' +
        '<p class="figma-esgoto__eye">Na região com mais água do país, a maioria das pessoas não tem coleta de esgoto. A conta chega em forma de doença, e quase sempre para as mesmas famílias.</p>' +
        '<figure class="figma-esgoto__protest"><img src="assets/images/243-854-cop30-protest.png" alt="Povos amazônicos em manifestação durante a COP30, com cartazes em defesa da floresta." decoding="async"><figcaption>Mutirão dos Povos da Amazônia exige protagonismo na COP 30 — Foto: Daleth Oliveira</figcaption></figure>' +
        '<p class="figma-esgoto__middle figma-esgoto__middle--lead"><span class="figma-esgoto__initial">N</span><span>a Vila da Barca, comunidade de</span></p>' +
        '<div class="figma-esgoto__middle figma-esgoto__middle--body"><p>palafitas de Belém vizinha de bairros nobres, começou a ser erguida em 2025, para a COP30, uma estação elevatória que bombeia esgoto de áreas nobres para tratamento a cerca de 8 km dali. “O que a gente está denunciando como racismo ambiental é muito mais do que a estação elevatória”, disse a líder comunitária Suane Barreirinhas. O governo afirma que a vila também será beneficiada, e a Cosanpa diz que levará água às palafitas e estudará se é viável coletar e tratar o esgoto ali.</p><p>Em 2024, mais de 35 mil nortistas foram internados por doenças ligadas à falta de saneamento, e mais de 12 mil tinham até 4 anos. No Atlas Esgotos, da</p></div>' +
        '<div class="figma-esgoto__divider" aria-hidden="true"></div>' +
        '<div class="figma-esgoto__map"><img src="assets/images/243-854-map.png" alt="Mapa da Amazônia Legal, com os estados da região destacados." decoding="async"></div>' +
        '<p class="figma-esgoto__right figma-esgoto__right--first">Agência Nacional de Águas, a Amazônia aparece em melhor situação que o resto do país, em boa parte porque a água dilui o esgoto. O indicador mede o rio, e não as pessoas.</p>' +
        '<p class="figma-esgoto__right figma-esgoto__right--second">O Nordeste, que não vive de minério, também tem um déficit grande. Lá, a coleta era de 35,9% em 2024, e essa desigualdade regional é antiga. Mas o Norte está pior, com população dispersa e companhias estaduais frágeis.</p>' +
        '<p class="figma-esgoto__right figma-esgoto__right--third">A explicação passa pelo dinheiro. Entre 2019 e 2023, o Norte recebeu cerca de 5% do investimento em água e esgoto do país, com 8,5% da população. Em 2024, aplicou R$ 66,52 por habitante, menos de 30% do necessário. O saneamento é pago, em boa parte, pela tarifa. Onde a renda é baixa e as palafitas se espalham, cada ligação custa caro e rende</p>' +
        '<p class="figma-esgoto__right figma-esgoto__right--fourth">pouco, e o Marco Legal do Saneamento, de 2020, deixa o financiamento depender de quem pode pagar. E não falta retorno, pois na Amazônia Legal cada R$ 1 investido renderia R$ 5,10. Só que ele aparece na saúde e na escola, não na conta de água. Por isso, o dinheiro vai para onde dá lucro, e não para onde dá mais resultado. Até o FGTS, principal fonte pública, é empréstimo, e o Norte e o Nordeste ficaram com só 20% do que foi aplicado, segundo o Tribunal de Contas da União. O crédito exige renda e garantias que os municípios mais pobres não têm.</p>' +
        '<p class="figma-esgoto__map-credit">Amazônia Legal — Foto: Toda Matéria</p>' +
        '<p class="figma-esgoto__folio">04 <span>•</span> Esgoto e saneamento</p>' +
        '</div>'
      );
      const garimpoOneMarkup = () => (
        '<div class="figma-frame figma-frame--garimpo-one" role="group" aria-label="O mercúrio que chega ao prato">' +
        '<div class="garimpo-one__water" aria-hidden="true"><img src="assets/images/185-856-imgAguinha-1662.webp" alt=""></div>' +
        '<div class="garimpo-one__divider" aria-hidden="true"></div>' +
        '<figure class="garimpo-one__hero"><img src="assets/images/185-719-imgImage8-1200.webp" alt="Agentes limpam um córrego poluído entre casas na Amazônia." decoding="async"><figcaption>Expansão do saneamento na Amazônia é “legal” — Foto: Wilson Lopes</figcaption></figure>' +
        '<figure class="garimpo-one__portrait"><img src="assets/images/185-719-imgImage9-1080.webp" alt="O líder Yanomami Júnior Hekurari." decoding="async"><figcaption>Junior Hekurari — Foto: Congresso do Abrajai</figcaption></figure>' +
        '<section class="garimpo-one__stats" aria-label="Dados sobre água, garimpo e saneamento">' +
        '<div class="garimpo-one__stats-head"><span>Número</span><span>O que mede</span></div>' +
        '<div class="garimpo-one__stat"><strong>80%</strong><span>Parte da água doce do país na Amazônia<small>Embrapa</small></span></div>' +
        '<div class="garimpo-one__stat"><strong>92%</strong><span>Parte da área garimpada do país no bioma Amazônia (2022)<small>MapBiomas</small></span></div>' +
        '<div class="garimpo-one__stat"><strong>+ 14 mi</strong><span>Moradores do Norte sem coleta de esgoto (2024)<small>Trata Brasil e IBGE</small></span></div>' +
        '</section>' +
        '<p class="garimpo-one__eye">Mais de 14 milhões de moradores do Norte vivem sem coleta de esgoto.</p>' +
        '<p class="garimpo-one__intro"><span class="garimpo-one__initial">S</span><span>e essa explicação estiver errada, três coisas seriam diferentes. Se o garimpo dependesse só de um governo omisso, sumiria com um governo que fiscaliza, mas, como veremos, parte dele muda de lugar. Se a falta de esgoto viesse só da exploração de minério, o Nordeste, que não vive disso, teria saneamento, e não tem. Se todos os atingidos concordassem, não haveria povos divididos, mas há.</span></p>' +
        '<section class="garimpo-one__definition">' +
        '<h2>O que é injustiça ambiental?</h2>' +
        '<p>Para o sociólogo Henri Acselrad, é o mecanismo pelo qual sociedades desiguais jogam a maior parte dos danos ambientais do desenvolvimento sobre os mais pobres, os grupos discriminados e os povos tradicionais. É o resultado previsível de quem tem e quem não tem poder para recusar um risco.</p>' +
        '</section>' +
        '<h1 class="garimpo-one__title">O mercúrio que chega ao prato</h1>' +
        '<p class="garimpo-one__body">disse em 2023 o líder yanomami Júnior Hekurari. No garimpo, o mercúrio junta as partículas de ouro. Nos rios, vira metilmercúrio, uma forma mais tóxica do metal, e se acumula a cada degrau da cadeia alimentar. Por isso, peixes carnívoros são os mais contaminados. No Amapá, em 428 peixes de cinco rios analisados em 2017 e 2018, 77,6% dos carnívoros e 2,4% dos herbívoros estavam acima do limite da OMS. No corpo, o metilmercúrio ataca o sistema nervoso, sobretudo de fetos e crianças.</p>' +
        '<span class="garimpo-one__quote-mark" aria-hidden="true">“</span>' +
        '<blockquote class="garimpo-one__quote">Os rios, principais fontes de alimentação que o povo Yanomâmi tem, os garimpeiros mataram”</blockquote>' +
        '<aside class="garimpo-one__summary">O garimpo de ouro despeja mercúrio nos rios. O metal sobe pela cadeia alimentar e alcança aldeias, comunidades ribeirinhas e feiras das cidades. O ouro sai, mercúrio fica.</aside>' +
        '<p class="garimpo-one__folio garimpo-one__folio--left">03 • Garimpo e mercúrio</p>' +
        '<p class="garimpo-one__folio garimpo-one__folio--right">03 • Garimpo e mercúrio</p>' +
        '</div>'
      );
      const garimpoTwoBars = [
        ['carnivoros', 'Carnívoros', '77,6%', 77.6, 'wine'],
        ['omnivoros', 'Onívoros', '20%', 20, 'ice'],
        ['herbivoros', 'Herbívoros', '2,4%', 2.4, 'mist'],
      ];
      const garimpoTwoDots = Array.from({ length: 100 }, (_, index) => {
        const category = index < 11 ? 'high' : index < 84 ? 'mid' : 'low';
        return '<span class="garimpo-two__dot" data-category="' + category + '" style="--dot-index:' + index + '" aria-hidden="true"></span>';
      }).join('');
      const garimpoTwoMarkup = () => (
        '<div class="figma-frame figma-frame--garimpo-two" role="group" aria-label="Garimpo, mercúrio e a cadeia do ouro">' +
        '<div class="garimpo-two__water" aria-hidden="true"><img src="assets/images/185-856-imgAguinha-1662.webp" alt=""></div>' +
        '<figure class="garimpo-two__hero"><img src="assets/images/185-756-imgImage10-500.webp" alt="Vista aérea de um rio amazônico atravessando a floresta." decoding="async"><figcaption>Rio Mucajaí — Foto: Pulsar Imagens</figcaption></figure>' +
        '<div class="garimpo-two__hero-shade" aria-hidden="true"></div>' +
        '<div class="garimpo-two__divider" aria-hidden="true"></div>' +
        '<span class="garimpo-two__dropcap" aria-hidden="true">E</span>' +
        '<p class="garimpo-two__firstline">m 2022, 84% de 287 Yanomami do</p>' +
        '<p class="garimpo-two__left-top">Rio Mucajaí passavam de 2 µg/g (milionésimo de grama de mercúrio por grama de cabelo). Entre os Munduruku, em 2019, 57,9% passavam de 6 µg/g, nível considerado alto. Em 17 pontos de coleta de seis estados amazônicos, 21,3% dos peixes que chegam às mesas tinham níveis considerados altos, acima do limite de 0,5 µg/g da Organização Mundial da Saúde (OMS).</p>' +
        '<p class="garimpo-two__left-bottom">O garimpo continua porque o preço da onça de ouro (cerca de 31 gramas) mais que triplicou entre 2016 e 2025. A lei também “lavava” esse ouro. De 2013 a 2023, bastava o vendedor declarar a origem para o comprador ficar livre de culpa. A regra entrou na lei numa emenda alheia ao tema, e, segundo o Instituto Escolhas, 282 toneladas de ouro com indícios de ilegalidade foram vendidas entre 2015</p>' +
        '<p class="garimpo-two__right-top">e 2021. O Supremo Tribunal Federal (STF) derrubou a regra. O garimpeiro costuma ser um migrante sem opção, com expectativa de vida estimada de 55 anos, enquanto os financiadores, segundo a Polícia Federal, movimentaram R$ 64 milhões em dois anos. Para Charles Tilly, é exploração, quando quem controla o capital fica com o valor do trabalho alheio. Prender quem está na balsa não toca em quem financia.</p>' +
        '<p class="garimpo-two__right-bottom">Na Terra Yanomami, o garimpo cresceu 3.350% entre 2016 e 2020 e mais 54% em 2022, segundo a associação yanomami Hutukara. Em agosto de 2022, o vice-presidente Hamilton Mourão, que presidia o Conselho Nacional da Amazônia Legal, admitiu a necessidade de “uma operação de grande envergadura”, que só veio em 2023. Com as operações do governo Lula, os alertas de garimpo na Terra Yanomami caíram 98%.</p>' +
        '<figure class="garimpo-two__chart garimpo-two__chart--bars" aria-labelledby="garimpo-bars-title">' +
        '<figcaption><strong id="garimpo-bars-title">Peixes acima do limite da OMS, por tipo de alimentação</strong><span>Amapá, 428 peixes de cinco rios (coleta de 2017 a 2018)</span></figcaption>' +
        '<div class="garimpo-two__bar-list" role="group" aria-label="Percentual de peixes acima do limite de mercúrio">' +
        garimpoTwoBars.map(([id, label, value, amount, color]) => '<button type="button" class="garimpo-two__bar-row" data-chart-filter="' + id + '" aria-pressed="false" aria-label="' + label + ': ' + value + '"><span class="garimpo-two__bar-label">' + label + '</span><span class="garimpo-two__bar-track"><i class="garimpo-two__bar garimpo-two__bar--' + color + '" style="--bar-value:' + amount + '%"></i></span><strong class="garimpo-two__bar-value">' + value + '</strong></button>').join('') +
        '</div><p class="garimpo-two__chart-source">Fonte: Fiocruz e parceiros, reportagem do Conexão Planeta (2020). Total: 28,7% dos peixes acima do limite.</p>' +
        '</figure>' +
        '<p class="garimpo-two__chart-note">Mas o garimpo não some, e parte muda de lugar. Garimpeiros foram para a Floresta Nacional de Urupadi, no Amazonas, e para a Terra Sararé, em Mato Grosso, segundo o boletim do ouro da UFMG.</p>' +
        '<p class="garimpo-two__mid-note">Como num balão apertado, reaparece em outro ponto, porque depende do preço e de quem compra, e não só de quem governa. Com o mercúrio, é pela comida que o rio adoece quem vive dele.</p>' +
        '<figure class="garimpo-two__chart garimpo-two__chart--dots" aria-labelledby="garimpo-dots-title">' +
        '<figcaption><strong id="garimpo-dots-title">Mercúrio no cabelo de 287 Yanomami (2022)</strong><span>Cada quadrado representa 1% das pessoas analisadas</span></figcaption>' +
        '<div class="garimpo-two__dot-layout"><div class="garimpo-two__dot-grid" role="img" aria-label="100 quadrados: 11% acima de 6 microgramas por grama, 73% entre 2 e 6, e 16% abaixo de 2">' + garimpoTwoDots + '</div>' +
        '<div class="garimpo-two__legend" role="group" aria-label="Destacar faixas de concentração de mercúrio">' +
        '<button type="button" data-chart-filter="high" aria-pressed="false"><i class="is-wine"></i>Acima de 6 µg/g: 11%</button>' +
        '<button type="button" data-chart-filter="mid" aria-pressed="false"><i class="is-ice"></i>Entre 2 e 6 µg/g: 73%</button>' +
        '<button type="button" data-chart-filter="low" aria-pressed="false"><i class="is-mist"></i>Abaixo de 2 µg/g: 16%</button>' +
        '<strong>Total acima de 2 µg/g: 84%</strong></div></div>' +
        '<p class="garimpo-two__chart-source">Fonte: Fiocruz (2024). Percentuais da contagem das quadrículas do painel original (10,8% na divulgação).</p>' +
        '</figure>' +
        '<section class="garimpo-two__export">' +
        '<p>Em 2024, o Brasil exportou 61,6 toneladas de ouro, e quase metade, 29,4 toneladas, foi para o Canadá, o maior destinatário, segundo o Greenpeace. Mais de 90% do ouro brasileiro importado pela Europa em 2023 veio de áreas com alto risco de ilegalidade, e a Suíça responde por 70% do abastecimento europeu. Antes de sair, o ouro viaja dentro do país. Os estados amazônicos produziram muito mais do que exportaram, e estados de outras regiões, como o Sudeste, exportaram muito mais do que produziram, sinal de ouro sem registro no caminho. O mercúrio fica no Tapajós, o ouro ganha aparência de legal até Guarulhos e vira reserva em Toronto ou Zurique.</p>' +
        '</section>' +
        '<p class="garimpo-two__folio">03 • Garimpo e mercúrio</p>' +
        '</div>'
      );
      const transformacaoInvestmentChart = () => (
        '<figure class="transformacao__chart transformacao__chart--investment" role="img" tabindex="0" aria-label="Gráfico animado: investimento em saneamento no Norte, em 2024. Eram necessários 223 reais e 82 centavos por habitante; foram investidos 66 reais e 52 centavos, menos de 30 por cento do necessário.">' +
        '<svg class="transformacao-chart__svg" viewBox="0 0 880 567" aria-hidden="true" focusable="false">' +
        '<defs><linearGradient id="investment-accent" x1="0" x2="1"><stop stop-color="#661414"/><stop offset="1" stop-color="#b9ecff"/></linearGradient><linearGradient id="investment-ice" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b9ecff"/><stop offset="1" stop-color="#8ddcf4"/></linearGradient></defs>' +
        '<rect class="transformacao-chart__paper" width="880" height="567" rx="8"/><rect class="transformacao-chart__accent" width="880" height="8" rx="4" fill="url(#investment-accent)"/>' +
        '<text class="transformacao-chart__title" x="42" y="53">Investimento em saneamento no Norte, 2024, por habitante</text>' +
        '<text class="transformacao-chart__subtitle" x="42" y="82">Valor necessário × valor investido (R$)</text>' +
        '<g class="transformacao-chart__grid"><path class="transformacao-chart__gridline" d="M106 171H774"/><path class="transformacao-chart__gridline" d="M106 300H774"/><path class="is-baseline" d="M106 429H774"/></g>' +
        '<rect class="transformacao-chart__bar transformacao-chart__bar--ice transformacao-chart__bar--needed" x="221" y="198" width="154" height="231" rx="7"/><rect class="transformacao-chart__bar transformacao-chart__bar--wine transformacao-chart__bar--invested" x="505" y="360" width="154" height="69" rx="7"/>' +
        '<text class="transformacao-chart__value" x="298" y="182" text-anchor="middle">R$ 223,82</text><text class="transformacao-chart__value" x="582" y="344" text-anchor="middle">R$ 66,52</text>' +
        '<text class="transformacao-chart__category" x="298" y="466" text-anchor="middle">Necessário</text><text class="transformacao-chart__category" x="582" y="466" text-anchor="middle">Investido</text>' +
        '<text class="transformacao-chart__source" x="42" y="536">Fonte: Instituto Trata Brasil (2025). Investido equivale a menos de 30% do necessário.</text>' +
        '</svg></figure>'
      );
      const transformacaoCollectionChart = () => (
        '<figure class="transformacao__chart transformacao__chart--collection" role="img" tabindex="0" aria-label="Gráfico animado: população com coleta de esgoto em 2024. Região Norte: 16,6 por cento. Região Sudeste: 80,8 por cento.">' +
        '<svg class="transformacao-chart__svg" viewBox="0 0 880 567" aria-hidden="true" focusable="false">' +
        '<defs><linearGradient id="collection-accent" x1="0" x2="1"><stop stop-color="#661414"/><stop offset="1" stop-color="#b9ecff"/></linearGradient><linearGradient id="collection-ice" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b9ecff"/><stop offset="1" stop-color="#8ddcf4"/></linearGradient></defs>' +
        '<rect class="transformacao-chart__paper" width="880" height="567" rx="8"/><rect class="transformacao-chart__accent" width="880" height="8" rx="4" fill="url(#collection-accent)"/>' +
        '<text class="transformacao-chart__title" x="42" y="53">População com coleta de esgoto, 2024</text>' +
        '<text class="transformacao-chart__subtitle" x="42" y="82">Percentual da população atendida pela coleta de esgoto</text>' +
        '<g class="transformacao-chart__grid"><path class="transformacao-chart__gridline" d="M106 171H774"/><path class="transformacao-chart__gridline" d="M106 300H774"/><path class="is-baseline" d="M106 429H774"/></g>' +
        '<rect class="transformacao-chart__bar transformacao-chart__bar--wine transformacao-chart__bar--north" x="221" y="386" width="154" height="43" rx="7"/><rect class="transformacao-chart__bar transformacao-chart__bar--ice transformacao-chart__bar--southeast" x="505" y="220" width="154" height="209" rx="7"/>' +
        '<text class="transformacao-chart__value" x="298" y="369" text-anchor="middle">16,6%</text><text class="transformacao-chart__value" x="582" y="203" text-anchor="middle">80,8%</text>' +
        '<text class="transformacao-chart__category" x="298" y="466" text-anchor="middle">Região Norte</text><text class="transformacao-chart__category" x="582" y="466" text-anchor="middle">Região Sudeste</text>' +
        '<text class="transformacao-chart__source" x="42" y="536">Fonte: Instituto Trata Brasil (2026), com dados do SINISA (ano-base 2024).</text>' +
        '</svg></figure>'
      );
      const esgotoTransformacaoMarkup = () => (
        '<div class="figma-frame figma-frame--esgoto-transformacao" role="group" aria-label="A floresta vira lavoura, o rio vira usina">' +
        '<div class="transformacao__left-paper" aria-hidden="true"></div>' +
        '<p class="transformacao__tilly">Tilly chama de desigualdade durável a que dura gerações porque está embutida nas rotinas das instituições. Quem tem acesso a crédito, sobretudo no Sudeste, monopoliza o dinheiro, e a falta de esgoto no Norte passa a parecer normal. Ninguém precisa decidir todo ano deixar a região sem esgoto, basta não mudar as regras que distribuem o dinheiro.</p>' +
        transformacaoInvestmentChart() +
        transformacaoCollectionChart() +
        '<figure class="transformacao__river"><img src="assets/images/243-876-xingu.webp" alt="Vista aérea do rio Xingu cercado pela floresta amazônica." decoding="async"></figure>' +
        '<div class="transformacao__river-shade" aria-hidden="true"></div>' +
        '<section class="transformacao__altamira" aria-label="Altamira e a falta de saneamento">' +
        '<h2>Altamira, onde nem a grande obra trouxe esgoto.</h2>' +
        '<p>O saneamento era condição para a usina de Belo Monte, no rio Xingu, desde a licença prévia, de 2010. Em 2014, o secretário de obras de Altamira dizia que a companhia estadual, a Cosanpa, estava falida e que a prefeitura não tinha como pagar as ligações. Em 2015, os canos estavam instalados, mas nenhuma casa estava ligada à rede. Em 2017, a Justiça Federal suspendeu a licença de operação da usina, porque ainda faltavam 16.093 ligações de esgoto e 11.888 de água. A energia entrou na rede nacional, e as ligações ficaram presas entre uma empresa que cumpria só parte das obrigações, uma estatal sem recursos e uma prefeitura sem caixa.</p>' +
        '</section>' +
        '<p class="transformacao__river-credit">Rio Xingu — Foto: Mato Grosso é Nosso</p>' +
        '<div class="transformacao__leaf"><img src="assets/images/243-876-leaf.webp" alt="Textura verde de uma folha, em detalhe." decoding="async"></div>' +
        '<h1 class="transformacao__title">A floresta vira lavoura,<br>o rio vira usina</h1>' +
        '<p class="transformacao__dek">No mesmo rio, o Xingu, a lavoura envenena a água e a usina a desvia. O território continua lá, mas deixa de sustentar quem vive nele.</p>' +
        '<p class="transformacao__column transformacao__column--xingu"><span class="transformacao__dropcap">O</span><span class="transformacao__firstline">Território Indígena do Xingu, em Mato Grosso, é</span><span class="transformacao__xingu-body">cercado por soja. Krenak o descreve como “uma ilha de mata cercada de terra pelada por todos os lados”. Um estudo da Fiocruz e da Unifesp achou agrotóxicos na água, nos peixes e em todas as amostras de chuva. O veneno chega a quem nunca plantou soja, e chega com desconto. Em 2025, o STF manteve o imposto reduzido dos agrotóxicos, que tirou R$ 12,9 bilhões da arrecadação em 2021, segundo a Associação Brasileira de Saúde Coletiva. A sociedade subsidia o veneno da chuva do Xingu.</span></p>' +
        '<p class="transformacao__column transformacao__column--volta">Na Volta Grande do Xingu, Belo Monte desvia água para as turbinas. Moradores relatam queda de até 80% na vazão, o volume de água do rio, mas não há medição oficial. Ali vivem cerca de mil famílias, em 23 comunidades, que contavam dois anos sem piracema, a subida dos peixes para se reproduzir. “Nessa área da vazão reduzida, não tem mais peixe”, dizia Antonia Melo, do Movimento Xingu Vivo para Sempre. As cacimbas, poços rasos, secaram. Em dezembro de 2025, a Justiça mandou a Norte Energia, dona da usina, garantir água a 635 famílias, e só 243 tinham sistema definitivo.</p>' +
        '<p class="transformacao__folio transformacao__folio--left">04 <span>•</span> Esgoto e saneamento</p>' +
        '<p class="transformacao__folio transformacao__folio--right">05 <span>•</span> Transformação do território</p>' +
        '<div class="transformacao__divider" aria-hidden="true"></div>' +
        '</div>'
      );
      const scenesMarkup = pages.map((page, index) => {
        const title = escapeHtml(page.title);
        const frame = index === 0
          ? coverMarkup()
          : index === 1
            ? teamMarkup()
            : index === 2
              ? summaryMarkup()
              : index === 3
                ? editorialContinuationMarkup()
                : index === 4
                  ? contextualizacaoMarkup()
                  : index === 5
                    ? garimpoOneMarkup()
                    : index === 6
                      ? garimpoTwoMarkup()
                      : index === 7
                        ? esgotoMarkup()
                        : index === 8
                          ? esgotoTransformacaoMarkup()
              : '<figure class="figma-frame">' +
            '<img class="figma-export" data-src="' + page.image + '" alt="' + title + ' — página original da revista Idibi" draggable="false" loading="lazy" decoding="async">' +
            '</figure>';
        return '<section class="figma-scene' + (index === 0 ? ' is-active' : '') +
          '" id="' + page.id + '" data-scene data-title="' + title + '" aria-label="' + title +
          '" aria-hidden="' + (index === 0 ? 'false' : 'true') + '">' + frame + '</section>';
      }).join('');
      magazine.innerHTML = scenesMarkup;
      document.body.classList.add('figma-edition');
      magazine.addEventListener('click', (event) => {
        const control = event.target.closest('.garimpo-two__chart [data-chart-filter]');
        if (!control) return;
        const chart = control.closest('.garimpo-two__chart');
        const clear = control.getAttribute('aria-pressed') === 'true';
        const selected = clear ? '' : control.dataset.chartFilter;
        chart.querySelectorAll('[data-chart-filter]').forEach((button) => {
          button.setAttribute('aria-pressed', String(button === control && !clear));
          button.classList.toggle('is-muted', Boolean(selected) && button !== control);
        });
        chart.querySelectorAll('[data-category]').forEach((mark) => {
          mark.classList.toggle('is-muted', Boolean(selected) && mark.dataset.category !== selected);
        });
      });

      const scenes = [...magazine.querySelectorAll('.figma-scene')];
      const sceneIndex = new Map(scenes.map((scene, index) => [scene.id, index]));
      // A conclusão e as referências ocupam dois fólios na mesma tela.
      const pageSlots = scenes.flatMap((_, index) => index === 18 ? [index, index] : [index]);
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
      const ensureSceneImage = (index) => {
        const image = scenes[index]?.querySelector('.figma-export[data-src]');
        if (!image) return;
        image.loading = 'eager';
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      };
      const updateControls = () => {
        const slots = slotsForScene(activeScene);
        const start = slots[0] + 1;
        const end = slots[slots.length - 1] + 1;
        count.innerHTML = `${String(start).padStart(2, '0')}${end > start ? `–${String(end).padStart(2, '0')}` : ''} <i>/</i> ${pageSlots.length}`;
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
        ensureSceneImage(index);
        const outgoing = scenes[activeScene];
        const incoming = scenes[index];
        window.clearTimeout(transitionTimer);
        scenes.forEach((scene) => {
          if (scene !== outgoing && scene !== incoming) scene.classList.remove('is-active', 'is-leaving', 'leave-next', 'leave-previous', 'is-entering', 'enter-next', 'enter-previous');
        });
        outgoing.classList.remove('enter-next', 'enter-previous', 'is-entering');
        outgoing.classList.add('is-leaving', `leave-${direction}`);
        outgoing.setAttribute('aria-hidden', 'true');
        incoming.classList.remove('is-leaving', 'leave-next', 'leave-previous');
        incoming.classList.add('is-active', 'is-entering', `enter-${direction}`);
        incoming.setAttribute('aria-hidden', 'false');
        activeScene = index;
        requestAnimationFrame(() => requestAnimationFrame(() => incoming.classList.remove('is-entering')));
        transitionTimer = window.setTimeout(() => {
          outgoing.classList.remove('is-active', 'is-leaving', 'leave-next', 'leave-previous');
          incoming.classList.remove('is-entering', 'enter-next', 'enter-previous');
        }, motionAllowed ? 1120 : 0);
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
        const chapterLink = event.target.closest('[data-target-scene]');
        if (chapterLink) {
          goToScene(chapterLink.dataset.targetScene);
          return;
        }
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
