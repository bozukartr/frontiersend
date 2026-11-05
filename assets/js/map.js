/* Frontier's End Wiki — dünya haritası görüntüleyici
   ------------------------------------------------------------
   Döşeme piramidi (assets/map/<düzey>/<x>-<y>.webp; oyundan üretilir: dustbound, node tools/wiki-map.js) ve üstünde
   iki dilli, tıklanabilir işaretler (assets/data/map.js). En küçük düzey (tek döşeme) her zaman altta durur; görünen
   düzeyin döşemeleri yalnızca ekranda kalan kısım için yüklenir. Konumlar dünya karosu cinsindendir (0..world).
   Gezinme: sürükle, tekerlek, iki parmak, çift tık, düğmeler; odaklıyken + − 0 ve ok tuşları. */
(function (root) {
  'use strict';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const SVG = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    full: '<path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
  };
  const btn = (k, label) => `<button type="button" data-z="${k}" aria-label="${esc(label)}" title="${esc(label)}"><svg viewBox="0 0 24 24" aria-hidden="true">${SVG[k]}</svg></button>`;

  /* el: kapsayıcı; D: WIKI_MAP; o: { lang, ui: { label, zoomIn, zoomOut, fit, full }, focus, base } */
  function mount(el, D, o) {
    const lang = o.lang, T = D.tiles, WN = D.world, Z = T.levels - 1, base = (o.base || '') + T.path;
    const P = (z) => T.sizes[z] / WN;                       // düzeyde karo başına piksel
    const src = (z, x, y) => `${base}/${z}/${x}-${y}.${T.ext}`;
    el.innerHTML = `<div class="wm" tabindex="0" role="application" aria-roledescription="map" aria-label="${esc(o.ui.label)}">
      <img class="wm-base" alt="" draggable="false" src="${src(0, 0, 0)}" width="${T.sizes[0]}" height="${T.sizes[0]}">
      <div class="wm-tiles"></div><div class="wm-marks"></div>
      <div class="wm-ctl">${btn('plus', o.ui.zoomIn)}${btn('minus', o.ui.zoomOut)}${btn('fit', o.ui.fit)}${document.fullscreenEnabled ? btn('full', o.ui.full) : ''}</div>
    </div>`;
    const box = el.querySelector('.wm'), baseImg = box.querySelector('.wm-base'), layer = box.querySelector('.wm-tiles'), marksEl = box.querySelector('.wm-marks');

    /* işaretler */
    const icon = (k) => D.icons[k] ? `<img alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(D.icons[k])}">` : '';
    const marks = D.marks.map(m => {
      const a = document.createElement('a');
      a.className = `wm-m wm-${m.kind === 'town' ? 'town' : 'poi'} wm-k-${m.kind}${m.sz ? ' wm-sz-' + m.sz : ''}`;
      a.href = '#/a/' + m.link;
      a.dataset.link = m.link;
      const name = m.n[lang] || m.n.tr;
      a.setAttribute('aria-label', name);
      a.innerHTML = m.kind === 'town' ? `<span class="wm-dot"></span><span class="wm-lb">${esc(name)}</span>` : `<span class="wm-ic">${icon(m.icon)}</span><span class="wm-lb">${esc(name)}</span>`;
      marksEl.appendChild(a);
      return { m, el: a };
    });

    /* görünüm: k ekran pikseli / dünya karosu, (cx, cy) ekranın ortasındaki dünya noktası */
    let W = 1, H = 1, k = 0.2, cx = WN / 2, cy = WN / 2, kFit = 0.2, raf = 0;
    const kMax = P(Z) * 2;                                   // en ayrıntılı düzeyin iki katı (pikseller büyür)
    const tiles = new Map();
    const fit = () => { kFit = Math.min(W, H) / WN * 0.98; };
    const limit = () => { k = clamp(k, kFit * 0.85, kMax); cx = clamp(cx, 0, WN); cy = clamp(cy, 0, WN); };
    const draw = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); };

    function render() {
      if (!box.isConnected) { ro.disconnect(); return; }
      limit();
      // en az ekran kadar ayrıntılı ilk düzey
      let z = 0;
      while (z < Z && P(z) < k * 0.9) z++;
      const f = k / P(z), ts = T.size, L = T.sizes[z], n = Math.ceil(L / ts);
      const ox = W / 2 - cx * k, oy = H / 2 - cy * k;        // dünyanın sol üst köşesi ekranda
      baseImg.style.transform = `translate(${ox}px, ${oy}px) scale(${(WN * k) / T.sizes[0]})`;
      const span = ts * f;
      const x0 = Math.max(0, Math.floor(-ox / span)), x1 = Math.min(n - 1, Math.floor((W - ox) / span));
      const y0 = Math.max(0, Math.floor(-oy / span)), y1 = Math.min(n - 1, Math.floor((H - oy) / span));
      const want = new Set();
      for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx <= x1; tx++) {
        const key = `${z}/${tx}-${ty}`;
        want.add(key);
        let im = tiles.get(key);
        if (!im) {
          im = new Image();
          im.alt = ''; im.draggable = false; im.decoding = 'async';
          im.onload = () => im.classList.add('ok');
          im.src = src(z, tx, ty);
          layer.appendChild(im);
          tiles.set(key, im);
        }
        // kenarlar yuvarlanır: komşu döşemeler arasında aralık kalmaz
        const l = Math.round(ox + tx * span), t = Math.round(oy + ty * span);
        const r = Math.round(ox + Math.min(L, (tx + 1) * ts) * f), b = Math.round(oy + Math.min(L, (ty + 1) * ts) * f);
        im.style.left = l + 'px'; im.style.top = t + 'px'; im.style.width = (r - l) + 'px'; im.style.height = (b - t) + 'px';
      }
      for (const [key, im] of tiles) if (!want.has(key)) { im.remove(); tiles.delete(key); }
      box.classList.toggle('wm-px', f > 1.05);               // en ayrıntılı düzeyden de yakın: keskin pikseller
      // yakınlık basamağı: işaretlerin ve adların ne kadarının görüneceğini CSS seçer (xs: telefonda bütün dünya)
      box.dataset.lv = k < 0.16 ? 'xs' : k < 0.42 ? '0' : k < 0.85 ? '1' : k < 1.6 ? '2' : '3';
      for (const M of marks) {
        const x = ox + M.m.x * k, y = oy + M.m.y * k;
        const off = x < -160 || y < -40 || x > W + 160 || y > H + 40;
        if (M.el.hidden !== off) M.el.hidden = off;
        if (!off) M.el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
      }
    }

    /* ekrandaki (sx, sy) noktası yerinde kalarak yakınlaş */
    function zoomAt(sx, sy, mul) {
      const k1 = clamp(k * mul, kFit * 0.85, kMax);
      const wx = cx + (sx - W / 2) / k, wy = cy + (sy - H / 2) / k;
      k = k1; cx = wx - (sx - W / 2) / k; cy = wy - (sy - H / 2) / k;
      draw();
    }
    const local = (e) => { const r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

    /* sürükleme ve iki parmak; 4 pikselden az oynayan basış tıklamadır (işaretin bağlantısı çalışır) */
    const ptrs = new Map();
    let pan = null, pinch = null, dragged = false;
    box.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('.wm-ctl')) return;
      ptrs.set(e.pointerId, local(e));
      dragged = false;
      if (ptrs.size === 1) pan = { p: local(e), cx, cy, id: e.pointerId };
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, k, mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], cx, cy };
        for (const id of ptrs.keys()) { try { box.setPointerCapture(id); } catch (x) { /* yok */ } }
        dragged = true;
      }
    });
    box.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, local(e));
      if (pinch && ptrs.size >= 2) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const k1 = clamp(pinch.k * d / pinch.d, kFit * 0.85, kMax);
        // başlangıçtaki orta noktanın altındaki dünya noktası parmakların yeni orta noktasında kalır
        const wx = pinch.cx + (pinch.mid[0] - W / 2) / pinch.k, wy = pinch.cy + (pinch.mid[1] - H / 2) / pinch.k;
        k = k1; cx = wx - (mid[0] - W / 2) / k; cy = wy - (mid[1] - H / 2) / k;
        draw();
        return;
      }
      if (!pan || pan.id !== e.pointerId) return;
      const p = local(e), dx = p[0] - pan.p[0], dy = p[1] - pan.p[1];
      if (!dragged && Math.hypot(dx, dy) < 4) return;
      if (!dragged) { dragged = true; box.classList.add('drag'); try { box.setPointerCapture(e.pointerId); } catch (x) { /* yok */ } }
      cx = pan.cx - dx / k; cy = pan.cy - dy / k;
      draw();
    });
    const up = (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 1) { const [id, p] = [...ptrs.entries()][0]; pan = { p, cx, cy, id }; } else if (!ptrs.size) pan = null;
      box.classList.remove('drag');
    };
    box.addEventListener('pointerup', up);
    box.addEventListener('pointercancel', up);
    // sürüklemenin sonunda bırakılan işaret açılmaz
    box.addEventListener('click', (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
    box.addEventListener('wheel', (e) => {
      e.preventDefault();
      const [sx, sy] = local(e);
      zoomAt(sx, sy, Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.06 : 0.0016)));
    }, { passive: false });
    box.addEventListener('dblclick', (e) => { if (e.target.closest('.wm-ctl, .wm-m')) return; const [sx, sy] = local(e); zoomAt(sx, sy, 2); });
    box.addEventListener('keydown', (e) => {
      const step = 90;
      if (e.key === '+' || e.key === '=') zoomAt(W / 2, H / 2, 1.6);
      else if (e.key === '-' || e.key === '_') zoomAt(W / 2, H / 2, 1 / 1.6);
      else if (e.key === '0') { k = kFit; cx = cy = WN / 2; draw(); }
      else if (e.key === 'ArrowLeft') { cx -= step / k; draw(); }
      else if (e.key === 'ArrowRight') { cx += step / k; draw(); }
      else if (e.key === 'ArrowUp') { cy -= step / k; draw(); }
      else if (e.key === 'ArrowDown') { cy += step / k; draw(); }
      else return;
      e.preventDefault();
    });
    box.querySelector('.wm-ctl').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const z = b.dataset.z;
      if (z === 'plus') zoomAt(W / 2, H / 2, 1.6);
      else if (z === 'minus') zoomAt(W / 2, H / 2, 1 / 1.6);
      else if (z === 'fit') { k = kFit; cx = cy = WN / 2; draw(); }
      else if (z === 'full') { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen().catch(() => {}); }
    });

    const ro = new ResizeObserver(() => {
      const r = box.getBoundingClientRect();
      const first = W === 1;
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      const wasFit = Math.abs(k - kFit) < 1e-6;
      fit();
      if (first || wasFit) k = kFit;
      if (first && o.focus) focus(o.focus); else draw();
    });
    ro.observe(box);

    /* bir işareti ortala ve vurgula (kasaba ve yer sayfalarındaki "Haritada göster") */
    function focus(id) {
      const M = marks.find(x => x.m.link === id);
      if (!M) { draw(); return false; }
      for (const x of marks) x.el.classList.toggle('wm-on', x === M);
      cx = M.m.x; cy = M.m.y; k = Math.max(k, Math.min(kMax, M.m.kind === 'town' ? 1.4 : 1.1));
      draw();
      return true;
    }
    return { focus, view: () => ({ k, cx, cy, kFit }), el: box };
  }

  root.WikiMap = { mount };
})(typeof self !== 'undefined' ? self : this);
