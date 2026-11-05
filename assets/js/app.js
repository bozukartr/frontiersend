/* Frontier's End Wiki — arayüz: yönlendirme (#/q/…, #/a/…, #/topics), canlı öneriler, sonuç ve makale görünümü */
(function () {
  'use strict';
  const { CATS, FAQ, UI } = window.WIKI_APP;
  const G = window.WIKI_GAME, DATA = window.WikiData;
  const BASE = window.WIKI_ARTICLES || [];
  // makalelerdeki sayılar ve veri sayfaları oyunun verisinden (assets/data/game.js) gelir
  let ENT = [];
  if (G && DATA) {
    const errs = DATA.fill(BASE, G);
    if (errs.length) console.warn('Wiki: çözülemeyen yer tutucular', errs);
    ENT = DATA.entities(G);
  }
  const ARTICLES = BASE.concat(ENT);
  const ENGINE = window.WikiSearch.create(ARTICLES, window.WIKI_CONCEPTS || {});
  const byId = new Map(ARTICLES.map(a => [a.id, a]));
  const NAMES = DATA ? DATA.nameIndex(ENT, window.WikiSearch.fold) : null;

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const enc = encodeURIComponent;

  /* ---------- simgeler (24×24, çizgi) ---------- */
  const P = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    flame: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
    horseshoe: '<path d="M6.5 19v-7a5.5 5.5 0 0 1 11 0v7"/><path d="M4.5 19h4M15.5 19h4"/>',
    paw: '<circle cx="6.8" cy="10.5" r="1.7"/><circle cx="10.2" cy="6.8" r="1.7"/><circle cx="14.2" cy="6.8" r="1.7"/><circle cx="17.5" cy="10.5" r="1.7"/><path d="M12.2 11.5c-2.8 0-4.8 3.3-4.8 5.3 0 1.7 1.4 2.4 2.9 2.1.9-.2 1.3-.6 1.9-.6s1 .4 1.9.6c1.5.3 2.9-.4 2.9-2.1 0-2-2-5.3-4.8-5.3z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5"/>',
    store: '<path d="M4 10h16l-1.5-5h-13z"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
    star: '<path d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.4l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    town: '<path d="M3 20h18"/><path d="M5 20v-9l4-3 4 3v9"/><path d="M13 20v-7h6v7"/><path d="M9 20v-4"/>',
    house: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M2.8 12h3M18.2 12h3M4.5 19.5l2.1-2.1M17.4 6.6l2.1-2.1"/>',
    bag: '<path d="M5.5 8.5h13l-1.2 11.5H6.7z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
    gun: '<path d="M3 8h17v3.2h-9.5L9 18.5H5.2l1.6-7.3H3z"/><path d="M10.5 11.2c0 1.6 1 2.3 2.6 2.3"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    trophy: '<path d="M8 4h8v5.5a4 4 0 0 1-8 0z"/><path d="M8 6H5.2c0 2.4 1.2 4 2.9 4.3M16 6h2.8c0 2.4-1.2 4-2.9 4.3"/><path d="M12 13.5V17M8.5 20h7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    link: '<path d="M10 13.5a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M14 10.5a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/>',
    ask: '<path d="M7 17 17 7M9 7h8v8"/>',
  };
  const ico = (k, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[k] || ''}</svg>`;

  /* ---------- dil ---------- */
  const LS = 'fe-wiki-lang';
  let lang = (() => {
    const u = new URLSearchParams(location.search).get('lang');
    if (u === 'tr' || u === 'en') return u;
    try { const s = localStorage.getItem(LS); if (s === 'tr' || s === 'en') return s; } catch (e) { /* özel pencere */ }
    return /^tr\b/i.test(navigator.language || '') ? 'tr' : 'en';
  })();
  const T = () => UI[lang];

  /* ---------- öğeler ---------- */
  const body = document.body;
  const form = $('.search');
  const input = $('#q');
  const clearBtn = $('.clear', form);
  const goBtn = $('.go', form);
  const list = $('#suggest');
  const view = $('#view');
  const faqBox = $('.faq');
  const toastEl = $('.toast');
  let lastQuery = '';

  function applyLang() {
    const t = T();
    document.documentElement.lang = lang;
    input.placeholder = t.placeholder;
    input.setAttribute('aria-label', t.placeholder);
    goBtn.setAttribute('aria-label', t.search);
    clearBtn.setAttribute('aria-label', t.clear);
    for (const n of document.querySelectorAll('[data-t]')) n.textContent = t[n.dataset.t];
    for (const b of document.querySelectorAll('.lang button')) {
      const on = b.dataset.lang === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    }
    $('.foot-topics').textContent = t.topics(ARTICLES.length);
    faqBox.setAttribute('aria-label', lang === 'tr' ? 'Sık sorulanlar' : 'Frequently asked');
    faqBox.innerHTML = FAQ.map(f => `<a class="chip" href="#/q/${enc(f[lang])}">${ico('ask')}${esc(f[lang])}</a>`).join('');
  }

  /* ---------- parçalar ---------- */
  const catLabel = (A) => { const C = CATS[A.cat]; return `<a class="cat" href="#/topics/${A.cat}">${ico(C.icon)}${esc(C[lang])}</a>`; };
  /* makalelerde kalın yazılan adlar (**Kinin**) o adın veri sayfasına bağlanır; başarım adları yalnız
     "başarım" geçen cümlede bağlanır (Kanun Kaçağı hem başlangıç hem başarım adıdır) */
  let here = '';
  const linkName = (name, L, text) => {
    const A = NAMES && NAMES[L].get(window.WikiSearch.fold(name));
    if (!A || A.id === here) return null;
    if (A.entity === 'ach' && here !== 'achievements' && !/başarım|achievement/i.test(text)) return null;
    return A.id;
  };
  const r = (text, q) => ENGINE.render(text, q, lang, linkName);
  const stepsHtml = (A, q) => `<ol class="steps">${A.steps[lang].map(s => `<li>${r(s, q)}</li>`).join('')}</ol>`;
  const factsHtml = (A, q) => (A.facts[lang].length ? `<dl class="facts">${A.facts[lang].map(([l, v]) => `<div><dt>${esc(l)}</dt><dd>${r(v, q)}</dd></div>`).join('')}</dl>` : '');
  const bodyHtml = (A, q) => (A.entity ? factsHtml(A, q) : stepsHtml(A, q));

  function answerCard(A, q) {
    here = A.id;
    const html = `<section class="card">
      ${catLabel(A)}
      <h2><a href="#/a/${A.id}">${esc(A.title[lang])}</a></h2>
      <p class="lead">${r(A.a[lang], q)}</p>
      ${bodyHtml(A, q)}
      <a class="more" href="#/a/${A.id}">${esc(T().readMore)}${ico('arrow')}</a>
    </section>`;
    here = '';
    return html;
  }

  function showHome() {
    body.dataset.mode = 'home';
    view.innerHTML = '';
    input.value = '';
    syncButtons();
    document.title = T().htmlTitle;
  }

  function showResults(q) {
    body.dataset.mode = 'view';
    lastQuery = q;
    if (input.value !== q) input.value = q;
    syncButtons();
    const t = T();
    const res = ENGINE.search(q, { lang });
    document.title = `${q} · ${t.htmlTitle}`;
    if (!res.results.length) {
      view.innerHTML = `<section class="empty">
        <h2>${esc(t.none)}</h2><p>${esc(t.noneHint)}</p>
        <div class="chips">${FAQ.map(f => `<a class="chip" href="#/q/${enc(f[lang])}">${ico('ask')}${esc(f[lang])}</a>`).join('')}
        <a class="chip" href="#/topics">${ico('compass')}${esc(t.allTopics)}</a></div>
      </section>`;
      return;
    }
    const [top, ...rest] = res.results;
    let html = `<p class="meta">${esc(t.results(res.results.length))}${top.cov < 1 ? ' · ' + esc(t.partial) : ''}</p>`;
    if (res.fixed && res.fixed !== q) {
      html += `<p class="fix">${esc(t.didYouMean)} <a href="#/q/${enc(res.fixed)}">${esc(res.fixed)}</a></p>`;
    }
    if (res.broad) {
      html += `<div class="narrow"><p>${esc(t.narrow)}</p><div class="chips">${res.results.slice(0, 7).map(x =>
        `<a class="chip" href="#/a/${x.id}">${ico(CATS[x.article.cat].icon)}${esc(x.article.chip[lang])}</a>`).join('')}</div></div>`;
    }
    html += answerCard(top.article, q);
    if (rest.length) {
      html += `<section class="others"><h3 class="sec">${esc(t.others)}</h3>${rest.map(x => {
        const A = x.article;
        return `<a class="item" href="#/a/${A.id}"><span class="t">${esc(A.title[lang])}</span>
          <span class="s">${r(ENGINE.snippet(A, q, lang), q)}</span>
          <span class="c">${ico(CATS[A.cat].icon)}${esc(CATS[A.cat][lang])}</span></a>`;
      }).join('')}</section>`;
    }
    view.innerHTML = html;
  }

  function showArticle(id) {
    body.dataset.mode = 'view';
    const A = byId.get(id);
    const t = T();
    if (!A) { view.innerHTML = `<section class="empty"><h2>${esc(t.notFoundArticle)}</h2><div class="chips"><a class="chip" href="#/topics">${ico('compass')}${esc(t.allTopics)}</a></div></section>`; return; }
    const q = lastQuery;
    input.value = q;
    syncButtons();
    document.title = `${A.title[lang]} · ${t.htmlTitle}`;
    const tips = (A.tips && A.tips[lang]) || [];
    const rel = (A.rel || []).map(x => byId.get(x)).filter(Boolean);
    here = A.id;
    const money = A.entity && A.facts[lang].some(([, v]) => /[$¢]/.test(v));
    view.innerHTML = `<article class="article">
      ${catLabel(A)}
      <h1>${esc(A.title[lang])}</h1>
      <p class="lead">${r(A.a[lang], q)}</p>
      ${A.entity ? factsHtml(A, q) : `<h3>${esc(t.steps)}</h3>${stepsHtml(A, q)}`}
      ${tips.length ? `<h3>${esc(t.tips)}</h3><ul class="tips">${tips.map(s => `<li>${r(s, q)}</li>`).join('')}</ul>` : ''}
      ${A.entity ? `<p class="dbnote">${money ? esc(t.priceNote) + ' ' : ''}${esc(t.dbNote(G.meta.version))}</p>` : ''}
      ${rel.length ? `<h3>${esc(t.related)}</h3><div class="rel">${rel.map(R => `<a class="chip" href="#/a/${R.id}">${ico(CATS[R.cat].icon)}${esc(R.title[lang])}</a>`).join('')}</div>` : ''}
      <div class="actions">
        ${q ? `<a class="ghost" href="#/q/${enc(q)}">${ico('back')}${esc(t.back)}</a>` : ''}
        <button class="ghost copy" type="button">${ico('link')}${esc(t.copy)}</button>
      </div>
    </article>`;
    here = '';
    $('.copy', view).addEventListener('click', copyLink);
    window.scrollTo(0, 0);
  }

  function showTopics(focusCat) {
    body.dataset.mode = 'view';
    const t = T();
    document.title = `${t.allTopics} · ${t.htmlTitle}`;
    input.value = '';
    syncButtons();
    const box = (k, C, inner, n) => `<section class="catbox${C.db ? ' db' : ''}" id="cat-${k}"><h2>${ico(C.icon)}${esc(C[lang])}<small>${n}</small></h2>${inner}</section>`;
    const links = (as) => as.map(A => `<a href="#/a/${A.id}">${esc(A.title[lang])}</a>`).join('<span class="sep"> · </span>');
    const boxes = Object.entries(CATS).filter(([, C]) => !C.db).map(([k, C]) => {
      const items = ARTICLES.filter(A => A.cat === k);
      return items.length ? box(k, C, `<ul>${items.map(A => `<li><a href="#/a/${A.id}">${esc(A.title[lang])}</a></li>`).join('')}</ul>`, items.length) : '';
    }).join('');
    // veri sayfaları: kısa adlar yan yana; eşyalar kendi türlerine göre gruplanır
    const dbBoxes = Object.entries(CATS).filter(([, C]) => C.db).map(([k, C]) => {
      const items = ARTICLES.filter(A => A.cat === k).sort((a, b) => a.title[lang].localeCompare(b.title[lang], lang));
      if (!items.length) return '';
      if (k !== 'db-item') return box(k, C, `<p class="inl">${links(items)}</p>`, items.length);
      const groups = Object.keys(DATA.ICAT).map(g => [g, items.filter(A => A.group === g)]).filter(([, as]) => as.length);
      return box(k, C, groups.map(([g, as]) => `<h3>${esc(DATA.ICAT[g][lang])}</h3><p class="inl">${links(as)}</p>`).join(''), items.length);
    }).join('');
    view.innerHTML = `<section class="topics"><h1>${esc(t.allTopics)}</h1><div class="cats">${boxes}</div>
      ${dbBoxes ? `<h2 class="dbhead">${esc(t.db)}</h2><p class="dbhint">${esc(t.dbHint)}</p><div class="cats dbcats">${dbBoxes}</div>` : ''}</section>`;
    const focus = focusCat && document.getElementById('cat-' + focusCat);
    if (focus) focus.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
  }

  /* ---------- yönlendirme ---------- */
  function route() {
    closeSuggest();
    const h = location.hash.replace(/^#\/?/, '');
    const i = h.indexOf('/');
    const kind = i < 0 ? h : h.slice(0, i);
    let arg = i < 0 ? '' : h.slice(i + 1);
    try { arg = decodeURIComponent(arg); } catch (e) { /* bozuk adres */ }
    if (kind === 'q' && arg.trim()) showResults(arg);
    else if (kind === 'a' && arg) showArticle(arg);
    else if (kind === 'topics') showTopics(arg);
    else showHome();
  }
  const go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };

  /* ---------- canlı öneriler ---------- */
  let items = [], active = -1, timer = 0;
  function closeSuggest() {
    list.hidden = true; list.innerHTML = ''; items = []; active = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }
  function renderSuggest() {
    const q = input.value;
    if (q.trim().length < 2) { closeSuggest(); return; }
    items = ENGINE.suggest(q, lang, 6);
    if (!items.length) { closeSuggest(); return; }
    active = -1;
    list.innerHTML = items.map((x, i) => {
      const A = x.article, C = CATS[A.cat];
      return `<li id="sg-${i}" role="option" data-id="${A.id}">${ico(C.icon)}<span class="t">${esc(A.title[lang])}</span><span class="c">${esc(C[lang])}</span></li>`;
    }).join('');
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }
  function setActive(n) {
    const lis = list.querySelectorAll('li');
    if (!lis.length) return;
    active = (n + lis.length) % lis.length;
    lis.forEach((li, i) => { li.classList.toggle('on', i === active); li.setAttribute('aria-selected', i === active); });
    input.setAttribute('aria-activedescendant', 'sg-' + active);
  }
  function syncButtons() {
    const has = input.value.trim().length > 0;
    clearBtn.hidden = !input.value;
    goBtn.disabled = !has;
  }

  input.addEventListener('input', () => {
    syncButtons();
    clearTimeout(timer);
    timer = setTimeout(renderSuggest, 70);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && !list.hidden) { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp' && !list.hidden) { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Escape') {
      if (!list.hidden) closeSuggest();
      else if (input.value) { input.value = ''; syncButtons(); }
      else input.blur();
    } else if (e.key === 'Enter' && active >= 0 && items[active]) {
      e.preventDefault();
      const id = items[active].id;
      lastQuery = input.value.trim();
      closeSuggest();
      go('#/a/' + id);
    }
  });
  input.addEventListener('focus', () => { if (input.value.trim().length >= 2 && body.dataset.mode === 'home') renderSuggest(); });
  list.addEventListener('mousedown', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    e.preventDefault();
    lastQuery = input.value.trim();
    closeSuggest();
    go('#/a/' + li.dataset.id);
  });
  document.addEventListener('click', (e) => { if (!form.contains(e.target)) closeSuggest(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    closeSuggest();
    input.blur();
    go('#/q/' + enc(q));
  });
  clearBtn.addEventListener('click', () => { input.value = ''; syncButtons(); closeSuggest(); input.focus(); });

  /* "/" arama kutusuna götürür */
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
    input.focus();
    input.select();
  });

  for (const b of document.querySelectorAll('.lang button')) {
    b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      try { localStorage.setItem(LS, lang); } catch (e) { /* özel pencere */ }
      applyLang();
      route();
    });
  }

  let toastT = 0;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { toastEl.hidden = true; }, 1800);
  }
  function copyLink() {
    const url = location.href;
    const done = () => toast(T().copied);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => prompt('', url));
    else prompt('', url);
  }

  window.addEventListener('hashchange', route);
  applyLang();
  route();
  if (body.dataset.mode === 'home' && matchMedia('(pointer: fine)').matches) input.focus();
})();
