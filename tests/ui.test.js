'use strict';
/* Frontier's End Wiki — tarayıcı testi (Playwright gerekir).  Çalıştırma: node tests/ui.test.js
   Sayfayı küçük bir yerel sunucuyla açar; ana sayfa, canlı öneriler, sonuç, makale, dil değişimi,
   tüm konular ve telefon genişliği denetlenir; sayfada hiç JavaScript hatası olmamalıdır. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp' };

let fail = 0, pass = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

(async () => {
  const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = path.join(ROOT, u === '/' ? 'index.html' : u);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${srv.address().port}/`;
  const browser = await chromium.launch();
  const errors = [];
  const page = async (opts = {}) => {
    const ctx = await browser.newContext(Object.assign({ viewport: { width: 1280, height: 800 }, locale: 'tr-TR' }, opts));
    const p = await ctx.newPage();
    p.on('pageerror', e => errors.push(e.message));
    p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    return p;
  };
  try {
    console.log('Ana sayfa');
    let p = await page();
    await p.goto(base + 'index.html');
    ok(await p.locator('.faq .chip').count() === 4, '4 hazır soru');
    ok(await p.evaluate(() => document.body.dataset.mode) === 'home', 'ana sayfa kipi');
    ok(await p.locator('.clear').isHidden(), 'boş kutuda temizle düğmesi gizli');
    ok(await p.evaluate(() => document.documentElement.lang) === 'tr', 'Türkçe tarayıcıda Türkçe');

    console.log('Canlı öneri ve arama');
    await p.fill('#q', 'atımı nasıl');
    await p.waitForSelector('#suggest li');
    ok((await p.locator('#suggest li').first().getAttribute('data-id')) === 'horse-call', 'ilk öneri: atı çağırma');
    await p.keyboard.press('ArrowDown');
    await p.keyboard.press('Enter');
    await p.waitForSelector('.article h1');
    ok(/#\/a\/horse-call$/.test(p.url()), 'öneriyle makaleye gidilir');
    await p.fill('#q', 'yabani at nasıl evcilleştirilir');
    await p.keyboard.press('Enter');
    await p.waitForSelector('.card h2');
    ok(/evcilleştirme/i.test(await p.locator('.card h2').innerText()), 'cevap kartı doğru konu');
    ok(await p.locator('.card mark').count() > 0, 'sorgu sözcükleri vurgulanır');
    ok(await p.locator('.card .steps li').count() >= 3, 'adımlar görünür');
    await p.click('.more');
    await p.waitForSelector('.article .rel .chip');
    ok(await p.locator('.article .actions .ghost').count() === 2, 'geri ve bağlantı düğmeleri');
    await p.click('.article .actions a.ghost');
    await p.waitForSelector('.card h2');
    ok(/#\/q\//.test(p.url()), 'geri sonuçlara döner');

    console.log('Hazır soru ve dil');
    await p.goto(base + 'index.html#/');
    await p.click('.faq .chip >> nth=0');
    await p.waitForSelector('.card h2');
    ok(/para/i.test(await p.locator('.card h2').innerText()), 'hazır soru cevabı');
    await p.click('.lang button[data-lang="en"]');
    await p.waitForFunction(() => document.documentElement.lang === 'en');
    ok(/money/i.test(await p.locator('.card h2').innerText()), 'dil değişince sonuç İngilizce');
    ok(await p.evaluate(() => localStorage.getItem('fe-wiki-lang')) === 'en', 'dil seçimi saklanır');

    console.log('Adres parametresi, yazım önerisi, sonuçsuz arama, tüm konular');
    p = await page({ locale: 'tr-TR' });
    await p.goto(base + 'index.html?lang=en');
    ok(await p.evaluate(() => document.documentElement.lang) === 'en', '?lang=en önceliklidir');
    await p.goto(base + 'index.html?lang=tr#/q/' + encodeURIComponent('ballik tutma'));
    await p.waitForSelector('.fix a');
    ok(/balık/.test(await p.locator('.fix a').innerText()), 'bunu mu demek istedin');
    await p.goto(base + 'index.html?lang=tr#/q/xyzzy');
    await p.waitForSelector('.empty');
    ok(await p.locator('.empty .chip').count() >= 4, 'sonuç yoksa öneriler');
    await p.goto(base + 'index.html?lang=tr#/topics');
    await p.waitForSelector('.catbox');
    const n = await p.locator('.catbox li').count();
    ok(n === await p.evaluate(() => window.WIKI_ARTICLES.length), `tüm konular listesi (${n})`);
    await p.goto(base + 'index.html?lang=tr#/a/yok-boyle-bir-konu');
    await p.waitForSelector('.empty');
    ok(true, 'olmayan konu');

    console.log('Veri sayfaları');
    p = await page({ locale: 'tr-TR' });
    await p.goto(base + 'index.html?lang=tr#/q/' + encodeURIComponent('kinin nerede satılır'));
    await p.waitForSelector('.card h2');
    ok((await p.locator('.card h2').innerText()) === 'Kinin', 'veri sorusu veri sayfasına gider');
    ok(await p.locator('.card .facts > div').count() >= 3, 'cevap kartında bilgi tablosu');
    await p.click('.card .more');
    await p.waitForSelector('.article .facts');
    ok(/Fiyatı/.test(await p.locator('.article .facts').innerText()), 'bilgi tablosu: fiyat');
    ok(/sürüm/.test(await p.locator('.article .dbnote').innerText()), 'oyun verisinin sürümü yazar');
    const placeLink = p.locator('.article .facts a.ent[href^="#/a/place-"]').first();
    ok(await placeLink.count() === 1, 'tablodaki yer adı bağlantıdır');
    await placeLink.click();
    await p.waitForFunction(() => /#\/a\/place-/.test(location.hash) && document.querySelector('.article h1') && document.querySelector('.article h1').textContent !== 'Kinin');
    ok(await p.locator('.article .facts a.ent[href="#/a/item-quinine"]').count() === 1, 'yer sayfasından eşyaya geri bağlantı');
    await p.goto(base + 'index.html?lang=tr#/a/medicine');
    await p.waitForSelector('.article h1');
    ok(await p.locator('.article a.ent[href="#/a/item-quinine"]').count() >= 1, 'makalede kalın eşya adı veri sayfasına bağlanır');
    ok(!/\{\{|undefined|NaN/.test(await p.locator('.article').innerText()), 'makalede doldurulmamış değer yok');
    await p.goto(base + 'index.html?lang=tr#/a/achievements');
    await p.waitForSelector('.article h1');
    ok(await p.locator('.article a.ent[href^="#/a/ach-"]').count() >= 5, 'başarımlar makalesi başarım sayfalarına bağlanır');
    await p.goto(base + 'index.html?lang=tr#/a/newgame');
    await p.waitForSelector('.article h1');
    ok(await p.locator('.article a.ent[href="#/a/ach-outlaw"]').count() === 0, 'başlangıç adı (Kanun Kaçağı) başarıma bağlanmaz');
    await p.goto(base + 'index.html?lang=en#/a/item-quinine');
    await p.waitForSelector('.article .facts');
    ok(/Price/.test(await p.locator('.article .facts').innerText()) && (await p.locator('.article h1').innerText()) === 'Quinine', 'İngilizce veri sayfası');
    await p.goto(base + 'index.html?lang=tr#/topics');
    await p.waitForSelector('.dbcats');
    ok(await p.locator('.dbcats .catbox').count() === 7, 'tüm konularda 7 veri kategorisi');
    const nEnt = await p.locator('.dbcats .inl a').count();
    ok(nEnt > 200 && nEnt === await p.evaluate(() => document.querySelectorAll('.dbcats .inl a').length), `veri sayfaları listelenir (${nEnt})`);
    ok(await p.locator('#cat-db-item h3').count() >= 8, 'eşyalar türlerine göre gruplanır');
    ok(/\d{3} konu/.test(await p.locator('.foot-topics').innerText()), 'alt bilgide toplam konu sayısı');

    console.log('Dünya haritası');
    p = await page({ locale: 'tr-TR' });
    await p.goto(base + 'index.html?lang=tr#/map');
    await p.waitForSelector('.wm');
    await p.waitForFunction(() => document.querySelectorAll('.wm-tiles img.ok').length > 0 && document.querySelector('.wm-base').complete, null, { timeout: 10000 });
    const nMarks = await p.evaluate(() => window.WIKI_MAP.marks.length);
    ok(await p.locator('.wm-m').count() === nMarks, `bütün işaretler (${nMarks})`);
    ok((await p.locator('.article h1').innerText()) === 'Dünya haritası', 'üst çubuktaki Harita bağlantısı dünya haritasını açar');
    const view = () => p.evaluate(() => { const s = getComputedStyle(document.querySelector('.wm-base')).transform; return { lv: document.querySelector('.wm').dataset.lv, t: s }; });
    const v0 = await view();
    await p.click('.wm-ctl [data-z="plus"]');
    await p.waitForTimeout(200);
    const v1 = await view();
    ok(v1.t !== v0.t, 'yakınlaştır düğmesi');
    const box = await p.locator('.wm').boundingBox();
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    for (let i = 0; i < 8; i++) await p.mouse.wheel(0, -300);
    await p.waitForTimeout(300);
    ok((await view()).lv === '3', 'tekerlekle en yakına kadar');
    const before = await view();
    await p.mouse.down(); await p.mouse.move(box.x + box.width / 2 - 160, box.y + box.height / 2 - 60, { steps: 6 }); await p.mouse.up();
    await p.waitForTimeout(200);
    ok((await view()).t !== before.t, 'sürükleyerek kaydırma');
    ok(/#\/map$/.test(p.url()), 'sürükleme bağlantı açmaz');
    await p.waitForFunction(() => [...document.querySelectorAll('.wm-tiles img')].some(i => /\/5\//.test(i.src) && i.complete), null, { timeout: 10000 });
    ok(true, 'en ayrıntılı döşemeler yüklenir');
    // kasaba sayfasından haritaya, haritadan sayfaya
    await p.goto(base + 'index.html?lang=tr#/a/town-harlow');
    await p.waitForSelector('.article .onmap');
    await p.click('.article .onmap');
    await p.waitForSelector('.wm-m.wm-on', { state: 'attached' });
    // odaklanma bir sonraki karede çizilir: işaret görünümün ortasına gelene kadar beklenir
    const centered = await p.waitForFunction(() => {
      const b = document.querySelector('.wm').getBoundingClientRect(), e = document.querySelector('.wm-m.wm-on'), m = e.getBoundingClientRect();
      return e.dataset.link === 'town-harlow' && Math.abs(m.left - (b.left + b.width / 2)) < 3 && Math.abs(m.top - (b.top + b.height / 2)) < 3;
    }, null, { timeout: 5000 }).then(() => true, () => false);
    ok(centered, 'Haritada göster: kasaba ortada ve vurgulu');
    await p.click('.wm-m.wm-on .wm-dot');
    await p.waitForFunction(() => /#\/a\/town-harlow$/.test(location.hash));
    ok(true, 'işarete tıklayınca kasaba sayfası açılır');
    await p.goto(base + 'index.html?lang=en#/map/place-crater');
    await p.waitForSelector('.wm-m.wm-on', { state: 'attached' });
    ok((await p.locator('.wm-m.wm-on .wm-lb').innerText()) === 'Meteor Crater', 'İngilizce işaret adı');
    await p.goto(base + 'index.html?lang=tr#/a/item-quinine');
    await p.waitForSelector('.article h1');
    ok(await p.locator('.article .onmap').count() === 0, 'haritada olmayan sayfada düğme yok');

    console.log('Telefon');
    p = await page({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await p.goto(base + 'index.html?lang=tr#/q/' + encodeURIComponent('kamp nasıl kurulur'));
    await p.waitForSelector('.card');
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(over <= 0, `yatay kaydırma yok (${over}px)`);
    await p.goto(base + 'index.html?lang=tr#/a/town-stclement');
    await p.waitForSelector('.article .facts');
    const over2 = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(over2 <= 0, `veri sayfasında yatay kaydırma yok (${over2}px)`);
    await p.goto(base + 'index.html?lang=tr#/map');
    await p.waitForSelector('.wm');
    const over3 = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(over3 <= 0, `haritada yatay kaydırma yok (${over3}px)`);
  } catch (e) {
    fail++; console.log('  ✗ ' + e.message);
  }
  ok(!errors.length, 'sayfa hataları: ' + errors.join(' | '));
  await browser.close();
  srv.close();
  console.log(`\n${pass} geçti, ${fail} kaldı`);
  process.exit(fail ? 1 : 0);
})();
