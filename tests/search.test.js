'use strict';
/* Frontier's End Wiki — veri ve arama kalitesi testleri.  Çalıştırma: node tests/search.test.js
   1) Veri: her makalenin iki dilde başlığı, cevabı, soruları ve adımları var mı; kimlikler tekil mi;
      ilgili makaleler ve etiketler gerçekten var mı; SSS düğmeleri var olan makalelere mi gidiyor.
   2) Arama: gerçek oyuncu sorularının (ekli, Türkçe karaktersiz, yazım hatalı, eş anlamlı, İngilizce)
      doğru makaleyi ilk sıraya (ya da ilk üçe) getirdiği denetlenir. */
const path = require('path');
const root = path.join(__dirname, '..', 'assets');
const FILES = ['basics', 'survival', 'horse', 'nature', 'money', 'business', 'law', 'life'];
const articles = FILES.flatMap(f => require(path.join(root, 'data', `articles-${f}.js`)));
const concepts = require(path.join(root, 'data', 'concepts.js'));
const WS = require(path.join(root, 'js', 'search.js'));
const APP = require(path.join(root, 'js', 'app-data.js'));
const GAME = require(path.join(root, 'data', 'game.js'));
const WD = require(path.join(root, 'js', 'gamedata.js'));
const fillErrors = WD.fill(articles, GAME);       // makalelerdeki {{…}} sayıları oyunun verisinden
const entities = WD.entities(GAME);               // eşya, silah, at, hayvan, kasaba, yer, başarım sayfaları
const all = articles.concat(entities);

let fail = 0, pass = 0;
const ok = (cond, msg) => { if (cond) pass++; else { fail++; console.log('  ✗ ' + msg); } };

/* ---------------- 1. Veri ---------------- */
console.log('Veri');
const ids = new Set();
for (const A of articles) {
  ok(!ids.has(A.id), `tekil kimlik: ${A.id}`); ids.add(A.id);
  ok(APP.CATS[A.cat], `${A.id}: bilinmeyen kategori ${A.cat}`);
  for (const L of ['tr', 'en']) {
    for (const k of ['title', 'chip', 'a']) ok(A[k] && typeof A[k][L] === 'string' && A[k][L].trim(), `${A.id}: ${k}.${L} eksik`);
    for (const k of ['q', 'steps']) ok(A[k] && Array.isArray(A[k][L]) && A[k][L].length, `${A.id}: ${k}.${L} eksik`);
  }
  for (const k of ['q', 'steps', 'tips']) if (A[k]) ok(A[k].tr.length === A[k].en.length, `${A.id}: ${k} TR/EN sayısı farklı`);
  for (const t of A.tags || []) ok(concepts[t], `${A.id}: etiket kavramı yok: ${t}`);
  const text = JSON.stringify(A);
  ok(!/<[a-z]/i.test(text), `${A.id}: metinde HTML olmamalı (biçim **kalın** ve [[tuş]])`);
  ok((text.match(/\*\*/g) || []).length % 2 === 0, `${A.id}: kapanmamış **`);
}
for (const A of articles) for (const r of A.rel || []) ok(ids.has(r), `${A.id}: ilgili makale yok: ${r}`);
for (const f of APP.FAQ) ok(ids.has(f.id), `SSS makalesi yok: ${f.id}`);
ok(APP.FAQ.length >= 3 && APP.FAQ.length <= 4, 'SSS 3-4 düğme');
for (const [c, C] of Object.entries(concepts)) {
  ok(Array.isArray(C.tr) && C.tr.length && Array.isArray(C.en) && C.en.length, `kavram ${c}: iki dil`);
  for (const r of C.rel || []) ok(concepts[r], `kavram ${c}: yakın kavram yok: ${r}`);
}

/* ---------------- 1b. Oyun verisi: yer tutucular ve veri sayfaları ---------------- */
console.log('Oyun verisi');
ok(!fillErrors.length, 'makalelerdeki bütün {{…}} yer tutucuları oyunun verisinden çözülür: ' + fillErrors.join(', '));
ok(!/\{\{/.test(JSON.stringify(articles)), 'doldurulmamış yer tutucu kalmadı');
ok(GAME.meta && GAME.meta.version && GAME.meta.hash, 'oyun verisinin sürümü ve özeti');
{
  const kinds = {};
  for (const A of entities) kinds[A.entity] = (kinds[A.entity] || 0) + 1;
  ok(kinds.item === Object.keys(GAME.items).length, `her eşyanın sayfası var (${kinds.item})`);
  ok(kinds.weapon === Object.values(GAME.weapons).filter(w => !w.item).length, `silah sayfaları (${kinds.weapon})`);
  ok(kinds.horse === Object.keys(GAME.horses).length && kinds.animal === Object.keys(GAME.animals).length, 'at cinsi ve hayvan sayfaları');
  ok(kinds.town === GAME.towns.length && kinds.place === GAME.landmarks.length && kinds.ach === GAME.achievements.length, 'kasaba, önemli yer ve başarım sayfaları');
}
const allIds = new Set(all.map(A => A.id));
ok(allIds.size === all.length, 'veri sayfalarının kimlikleri tekil ve makalelerle çakışmaz');
for (const A of entities) {
  ok(APP.CATS[A.cat] && APP.CATS[A.cat].db, `${A.id}: veri kategorisi ${A.cat}`);
  for (const L of ['tr', 'en']) {
    ok(A.title[L] && A.a[L] && A.a[L].trim(), `${A.id}: ${L} ad ve giriş cümlesi`);
    ok((A.facts[L].length > 0 || A.entity === 'place') && A.facts[L].every(([l, v]) => l && v), `${A.id}: ${L} bilgi tablosu`);
  }
  ok(A.facts.tr.length === A.facts.en.length, `${A.id}: TR/EN bilgi satırı sayısı aynı`);
  for (const r of A.rel) ok(allIds.has(r), `${A.id}: ilgili konu yok: ${r}`);
}
for (const A of all) {
  const text = JSON.stringify([A.title, A.a, A.steps, A.tips || {}, A.facts || {}]);
  ok(!/undefined|NaN|null|\[object/.test(text), `${A.id}: metinde bozuk değer`);
  for (const m of text.matchAll(/\]\(#\/a\/([\w-]+)\)/g)) ok(allIds.has(m[1]), `${A.id}: kırık bağlantı ${m[1]}`);
}
/* oyunun tablolarındaki değerler sayfada aynen görünür */
{
  const page = (id) => entities.find(A => A.id === id);
  const fact = (id, L, label) => (page(id).facts[L].find(([l]) => l === label) || [])[1] || '';
  ok(fact('item-quinine', 'tr', 'Fiyatı') === WD.money(GAME.items.quinine.p, 'tr'), 'eşya fiyatı oyundan');
  ok(/Eczane/.test(fact('item-quinine', 'tr', 'Satıldığı yer')) && /Doktor/.test(fact('item-quinine', 'tr', 'Satıldığı yer')), 'satıldığı yerler dükkân tablosundan');
  ok(/animal-deer/.test(fact('item-antler', 'tr', 'Nasıl bulunur')), 'kaynak: avlanan hayvan');
  ok(/place-crater/.test(fact('item-meteorite', 'tr', 'Nasıl bulunur')), 'kaynak: önemli yerin sandığı');
  ok(/item-cooked_game/.test(page('item-raw_game').a.tr), 'çiğ et pişirilince ne olduğunu söyler');
  ok(fact('horse-arabian', 'en', 'Price') === WD.money(GAME.horses.arabian.p, 'en'), 'at fiyatı oyundan');
  ok(fact('weapon-shotgun', 'tr', 'Hasar') === `${GAME.weapons.shotgun.dmg} × ${GAME.weapons.shotgun.pellets}`, 'saçmalı silahın hasarı');
  ok(/Mantar|Kinin/.test(fact('place-hermit', 'tr', 'Satılanlar')), 'yerdeki dükkânın malları');
  ok(fact('ach-towns', 'en', 'Perk') === GAME.achievements.find(a => a.id === 'towns').perk.en, 'başarım kazanımı');
  ok(!entities.some(A => A.entity === 'ach' && /^story/.test(A.key)), 'hikâye başarımları yok');
}
/* biçimler ve yer tutucu sözdizimi */
ok(WD.money(0.5, 'tr') === '50¢' && WD.money(4.25, 'tr') === '$4,25' && WD.money(4.25, 'en') === '$4.25' && WD.money(30, 'en') === '$30', 'para biçimi');
ok(WD.money(3500, 'tr') === '$3.500' && WD.money(3500, 'en') === '$3,500', 'binlik ayırıcı');
ok(WD.moneyRange(1.6, 2.8, 'tr') === '$1,60–2,80' && WD.moneyRange(0.5, 2, 'en') === '50¢–$2', 'para aralığı');
{
  const g = { a: { p: 1.5 }, r: 0.035, k: 1.4, h: 15, w: -5, pair: [2, 4], n: { n: { tr: 'Ad', en: 'Name' } }, list: [{ id: 'x', v: 2 }] };
  const e = [];
  const tr = WD.fillText('{{$:a.p}} {{%:r}} {{%#:h}} {{x:k}} {{#:w}} {{#-:pair}} {{n:n}} {{#:list.x.v}} {{#:list.0.v}}', g, 'tr', e);
  ok(tr === '$1,50 %3,5 %15 ×1,4 −5 2–4 Ad 2 2' && !e.length, 'yer tutucular (TR): ' + tr);
  const en = WD.fillText('{{$:a.p}} {{%:r}} {{x:k}} {{n:n}}', g, 'en', e);
  ok(en === '$1.50 3.5% ×1.4 Name' && !e.length, 'yer tutucular (EN): ' + en);
  ok(WD.fillText('{{$:yok.p}} {{$:n}}', g, 'tr', e) === '? ?' && e.length === 2, 'çözülemeyen yer tutucu "?" olur ve bildirilir');
}

/* ---------------- 1c. Dünya haritası ---------------- */
console.log('Dünya haritası');
{
  const fs = require('fs');
  const MAP = require(path.join(root, 'data', 'map.js'));
  const T = MAP.tiles;
  ok(T.levels === T.sizes.length && T.sizes[T.levels - 1] === MAP.world * T.scale, 'döşeme düzeyleri ve en büyük boyut');
  let missing = 0, count = 0;
  T.sizes.forEach((L, z) => {
    const n = Math.ceil(L / T.size);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { count++; if (!fs.existsSync(path.join(__dirname, '..', T.path, String(z), `${x}-${y}.${T.ext}`))) missing++; }
  });
  ok(!missing, `bütün döşemeler var (${count - missing}/${count})`);
  const kinds = {};
  for (const m of MAP.marks) {
    kinds[m.kind] = (kinds[m.kind] || 0) + 1;
    ok(allIds.has(m.link), `harita işareti ${m.id}: bağlantı yok: ${m.link}`);
    ok(m.n.tr && m.n.en, `harita işareti ${m.id}: iki dilde ad`);
    ok(m.x >= 0 && m.y >= 0 && m.x <= MAP.world && m.y <= MAP.world, `harita işareti ${m.id}: dünyanın içinde`);
    if (m.icon) ok(MAP.icons[m.icon] && /^<svg/.test(MAP.icons[m.icon]), `harita işareti ${m.id}: simge ${m.icon}`);
  }
  ok(kinds.town === GAME.towns.length && kinds.landmark === GAME.landmarks.length, `bütün kasabalar ve önemli yerler haritada (${kinds.town}, ${kinds.landmark})`);
  ok(articles.some(A => A.id === 'worldmap' && A.map), 'dünya haritası konusu');
}

/* ---------------- 2. Kök ve normalleştirme ---------------- */
console.log('Kökler');
const has = (m, s) => m.has(s);
ok(WS.fold('İSTANBUL Iğdır ŞŞ') === 'istanbul igdir ss', 'fold: Türkçe büyük harf ve aksan');
ok(WS.tokenize("Harlow'a gittim, Saint Clement’in pazarı").join(' ') === 'harlow gittim saint clement pazari', 'tokenize: kesme işareti eki');
ok(has(WS.stemsTR('evcilleştirebilirim'.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i')), 'evcillestir'), 'kök: evcilleştirebilirim → evcilleştir');
ok(has(WS.stemsTR('atlarimi'), 'at'), 'kök: atlarımı → at');
ok(has(WS.stemsTR('tufegi'), 'tufek'), 'kök: tüfeği → tüfek (yumuşama)');
ok(has(WS.stemsTR('kurdu'), 'kurt'), 'kök: kurdu → kurt (yumuşama)');
ok(has(WS.stemsEN('bounties'), 'bounty'), 'kök: bounties → bounty');
ok(has(WS.stemsEN('taming'), 'tame'), 'kök: taming → tame');
ok(has(WS.stemsEN('robbed'), 'rob'), 'kök: robbed → rob');
ok(WS.dl('evcilestirme', 'evcillestirme', 2) === 1, 'yazım uzaklığı');

/* ---------------- 3. Arama kalitesi ---------------- */
console.log('Arama');
const E = WS.create(all, concepts);
/* [sorgu, arayüz dili, beklenen makale(ler), en kötü sıra] */
const CASES = [
  // Türkçe, ekli ve doğal sorular
  ['yabani at nasıl evcilleştirilir', 'tr', 'horse-tame', 1],
  ['at nasıl evcilleştirilir', 'tr', 'horse-tame', 1],
  ['atı nasıl evcilleştiririm', 'tr', 'horse-tame', 1],
  ['atımı nasıl çağırırım', 'tr', 'horse-call', 1],
  ['atımı kaybettim', 'tr', 'horse-call', 1],
  ['atım öldü', 'tr', 'horse-down', 1],
  ['en hızlı at hangisi', 'tr', 'horse-buy', 1],
  ['ahırdan at almak', 'tr', 'horse-buy', 1],
  ['atla bağımı nasıl artırırım', 'tr', 'horse-bond', 1],
  ['ata nasıl binilir', 'tr', 'horse-ride', 1],
  ['nasıl para kazanırım', 'tr', 'money', 1],
  ['para nasıl kazanılır', 'tr', 'money', 1],
  ['madende çalışmak', 'tr', ['jobs', 'ore'], 2],
  ['bankaya para yatırmak', 'tr', 'bank', 1],
  ['ölünce param gider mi', 'tr', ['death', 'bank'], 2],
  ['aranmaktan nasıl kurtulurum', 'tr', 'wanted', 1],
  ['kanundan nasıl kaçarım', 'tr', 'wanted', 1],
  ['nasıl teslim olunur', 'tr', 'surrender', 1],
  ['ödül avcıları peşimde', 'tr', 'bountyhunters', 1],
  ['ödül ilanı nasıl teslim edilir', 'tr', 'bounty', 1],
  ['maske nasıl takılır', 'tr', 'mask', 1],
  ['kilitli kapı nasıl açılır', 'tr', 'lockpick', 1],
  ['maymuncuk nereden alınır', 'tr', 'lockpick', 1],
  ['ceset nasıl gömülür', 'tr', 'evidence', 1],
  ['birini nasıl bağlarım', 'tr', 'lasso', 1],
  ['kement nasıl kullanılır', 'tr', 'lasso', 1],
  ['oyun nasıl kaydedilir', 'tr', 'save', 1],
  ['kaydım açılmıyor', 'tr', 'save', 1],
  ['kamp nasıl kurulur', 'tr', 'camp', 1],
  ['kamp kuramıyorum', 'tr', 'camp', 1],
  ['uyku tulumu nereden alınır', 'tr', 'camp', 1],
  ['nerede uyuyabilirim', 'tr', 'sleep', 1],
  ['otel odası kiralamak', 'tr', 'hotel', 1],
  ['açlıktan ölüyorum', 'tr', 'hunger', 1],
  ['matara nasıl doldurulur', 'tr', 'thirst', 1],
  ['susuzluk', 'tr', 'thirst', 1],
  ['yılan soktu', 'tr', 'poison', 1],
  ['zehirlendim ne yapmalıyım', 'tr', 'poison', 1],
  ['hasta oldum', 'tr', 'sickness', 1],
  ['üşüyorum', 'tr', 'temperature', 1],
  ['çölde sıcak çarpması', 'tr', 'temperature', 1],
  ['bayıldım', 'tr', 'faint', 1],
  ['canım dolmuyor', 'tr', 'health', 1],
  ['doktor ne kadar', 'tr', 'doctor', 1],
  ['laudanum ne işe yarar', 'tr', ['item-laudanum', 'medicine'], 1],
  ['sarhoşluk nasıl geçer', 'tr', 'drunk', 1],
  ['nasıl yıkanırım', 'tr', 'clean', 1],
  ['sakal nasıl değiştirilir', 'tr', ['clean', 'clothes'], 2],
  ['et nasıl pişirilir', 'tr', 'cooking', 1],
  ['panzehir nasıl yapılır', 'tr', ['cooking', 'poison'], 2],
  ['ok nasıl yapılır', 'tr', 'cooking', 1],
  ['geyik nerede bulunur', 'tr', 'hunting', 1],
  ['deri nasıl yüzülür', 'tr', 'hunting', 1],
  ['postlar nereye satılır', 'tr', 'pelts', 1],
  ['ayı saldırıyor', 'tr', 'predators', 1],
  ['balık nasıl tutulur', 'tr', 'fishing', 1],
  ['misina koptu', 'tr', 'fishing', 1],
  ['altın nasıl bulunur', 'tr', 'gold', 1],
  ['kazma nereden alınır', 'tr', 'ore', 1],
  ['şifalı bitkiler nerede', 'tr', 'herbs', 1],
  ['hazine haritası', 'tr', 'treasure', 1],
  ['dürbün nasıl kullanılır', 'tr', 'binoculars', 1],
  ['sıcak kaynak nerede', 'tr', 'explore', 1],
  ['haritaya işaret koymak', 'tr', 'map', 1],
  ['tuşlar neler', 'tr', 'controls', 1],
  ['tuş nasıl değiştirilir', 'tr', 'keybinds', 1],
  ['nasıl ateş edilir', 'tr', 'aim', 1],
  ['silah nasıl değiştirilir', 'tr', 'wheel', 1],
  ['tüfek nereden alınır', 'tr', 'weapons', 1],
  ['mermi nereden alınır', 'tr', 'weapons', 1],
  ['zaman nasıl yavaşlatılır', 'tr', 'focus', 1],
  ['bir gün kaç dakika', 'tr', 'time', 1],
  ['hangi geçmişi seçmeliyim', 'tr', 'newgame', 1],
  ['tek hayat nedir', 'tr', ['newgame', 'death', 'save'], 3],
  ['yetenekler nasıl gelişir', 'tr', 'skills', 1],
  ['başarımlar ne işe yarar', 'tr', 'achievements', 1],
  ['tren bileti nereden alınır', 'tr', 'train', 1],
  ['başka kasabaya nasıl giderim', 'tr', 'train', 1],
  ['özel fayton', 'tr', 'carriage', 1],
  ['otomobil nasıl alınır', 'tr', 'wagon', 1],
  ['yük arabası', 'tr', 'wagon', 1],
  ['dükkan nasıl satın alınır', 'tr', 'business', 1],
  ['işletmemin stoğu bitti', 'tr', 'supply', 1],
  ['nakliyeci nasıl tutulur', 'tr', 'supply', 1],
  ['arsaya ne kurulur', 'tr', 'build', 1],
  ['tekel nasıl olunur', 'tr', 'monopoly', 1],
  ['banka nasıl kurulur', 'tr', 'ownbank', 1],
  ['petrol nasıl bulunur', 'tr', 'oil', 1],
  ['nüfuz nasıl artar', 'tr', 'influence', 1],
  ['şerife rüşvet vermek', 'tr', 'bribery', 1],
  ['şerifi maaşa bağlamak', 'tr', 'payroll', 1],
  ['koruma nasıl tutulur', 'tr', 'guards', 1],
  ['nasıl evlenirim', 'tr', 'romance', 1],
  ['evlenme teklifi', 'tr', 'romance', 1],
  ['ev nasıl satın alınır', 'tr', 'property', 1],
  ['ev nasıl yapılır', 'tr', 'homestead', 1],
  ['arazi kazığı nasıl kullanılır', 'tr', 'homestead', 1],
  ['malikane nasıl alınır', 'tr', 'mansion', 1],
  ['kulübe nasıl üye olunur', 'tr', 'club', 1],
  ['poker nasıl oynanır', 'tr', 'gambling', 1],
  ['düello nasıl kazanılır', 'tr', 'duel', 1],
  ['onur nasıl artar', 'tr', 'honor', 1],
  ['yumruk atmak suç mu', 'tr', 'brawl', 1],
  ['kasabalar nasıl büyür', 'tr', 'towns', 1],
  ['oyun kasıyor', 'tr', 'graphics', 1],
  ['dil nasıl değiştirilir', 'tr', 'settings', 1],
  ['kıyafet nereden alınır', 'tr', 'clothes', 1],
  ['selam nasıl verilir', 'tr', 'social', 1],
  ['gece nerede kalabilirim', 'tr', 'sleep', 1],
  ['çantam doldu', 'tr', 'satchel', 1],
  ['eşyalarımı nerede saklarım', 'tr', ['satchel', 'property'], 2],
  ['kahve ne işe yarar', 'tr', ['item-coffee', 'consumables'], 1],
  ['ayı postu kaç para', 'tr', ['item-bear_pelt', 'pelts'], 1],
  ['kurt saldırısı', 'tr', 'predators', 1],
  ['hayvan nasıl bağlanır', 'tr', 'lasso', 1],
  ['elektrik ne zaman gelir', 'tr', 'towns', 1],
  ['banka soymak', 'tr', 'robbery', 1],
  ['şapka almak istiyorum', 'tr', 'clothes', 1],
  ['çiftlik almak istiyorum', 'tr', 'property', 1],
  // Türkçe karakter olmadan
  ['nasil para kazanirim', 'tr', 'money', 1],
  ['atimi nasil cagiririm', 'tr', 'horse-call', 1],
  ['yilan sokmasi', 'tr', 'poison', 1],
  ['aranmaktan kurtulmak', 'tr', 'wanted', 1],
  ['odul avcilari', 'tr', 'bountyhunters', 1],
  // yazım hataları
  ['evcilestirme', 'tr', 'horse-tame', 1],
  ['ballik tutma', 'tr', 'fishing', 1],
  ['panzehr', 'tr', ['item-antidote', 'poison'], 1],
  ['maymuncuk nerdn alinir', 'tr', 'lockpick', 1],
  ['bayilma', 'tr', 'faint', 1],
  // eş anlamlılar
  ['beygir nasıl evcilleştirilir', 'tr', 'horse-tame', 1],
  ['kelle avcısı', 'tr', 'bountyhunters', 1],
  ['dead eye', 'tr', 'focus', 1],
  ['hızlı seyahat', 'tr', 'train', 1],
  // İngilizce
  ['how do I tame a wild horse', 'en', 'horse-tame', 1],
  ['how do I call my horse', 'en', 'horse-call', 1],
  ['my horse died', 'en', 'horse-down', 1],
  ['fastest horse', 'en', 'horse-buy', 1],
  ['how to make money', 'en', 'money', 1],
  ['where can I sleep', 'en', 'sleep', 1],
  ['how to lose the law', 'en', 'wanted', 1],
  ['bounty hunters are after me', 'en', 'bountyhunters', 1],
  ['turn in a bounty', 'en', 'bounty', 1],
  ['how do I save', 'en', 'save', 1],
  ['set up camp', 'en', 'camp', 1],
  ['snake bite', 'en', 'poison', 1],
  ['I am freezing', 'en', 'temperature', 1],
  ['how to fish', 'en', 'fishing', 1],
  ['where to sell pelts', 'en', 'pelts', 1],
  ['skinning animals', 'en', 'hunting', 1],
  ['buy a gun', 'en', 'weapons', 1],
  ['switch weapons', 'en', 'wheel', 1],
  ['slow down time', 'en', 'focus', 1],
  ['low fps', 'en', 'graphics', 1],
  ['fps drop', 'en', 'graphics', 1],
  ['change language', 'en', 'settings', 1],
  ['get married', 'en', 'romance', 1],
  ['buy a house', 'en', 'property', 1],
  ['build a house', 'en', 'homestead', 1],
  ['hire a bodyguard', 'en', 'guards', 1],
  ['bribe the sheriff', 'en', 'bribery', 1],
  ['oil derrick', 'en', 'oil', 1],
  ['market share', 'en', 'monopoly', 1],
  ['pick a lock', 'en', 'lockpick', 1],
  ['hide a body', 'en', 'evidence', 1],
  ['hogtie', 'en', 'lasso', 1],
  ['play poker', 'en', 'gambling', 1],
  ['train ticket', 'en', 'train', 1],
  ['private carriage', 'en', 'carriage', 1],
  ['what happens when I die', 'en', 'death', 1],
  ['I passed out', 'en', 'faint', 1],
  ['quick draw duel', 'en', 'duel', 1],
  ['my satchel is full', 'en', 'satchel', 1],
  ['what does coffee do', 'en', ['item-coffee', 'consumables'], 1],
  ['where to stay the night', 'en', 'sleep', 1],
  // arayüz dili İngilizceyken Türkçe soru, tersi
  ['yabani at', 'en', 'horse-tame', 1],
  ['how to tame a horse', 'tr', 'horse-tame', 1],
];
/* veri sayfaları: adı geçen şeyin fiyatı, satıldığı yer, kendisi */
CASES.push(
  ['kinin nerede satılır', 'tr', 'item-quinine', 1],
  ['kinin fiyatı', 'tr', 'item-quinine', 1],
  ['where can i buy quinine', 'en', 'item-quinine', 1],
  ['arap atı kaç para', 'tr', 'horse-arabian', 1],
  ['how much is an arabian horse', 'en', 'horse-arabian', 1],
  ['mustang fiyatı', 'tr', 'horse-mustang', 1],
  ['kurt postu ne kadar eder', 'tr', 'item-wolf_pelt', 1],
  ['bear pelt price', 'en', 'item-bear_pelt', 1],
  ['boz ayı', 'tr', 'animal-bear', 1],
  ['grizzly bear', 'en', 'animal-bear', 1],
  ['çıngıraklı yılan', 'tr', 'animal-snake', 1],
  ['tavşan', 'tr', 'animal-rabbit', 1],
  ['puma', 'tr', 'animal-cougar', 1],
  ['göktaşı krateri', 'tr', 'place-crater', 1],
  ['meteor crater', 'en', 'place-crater', 1],
  ['münzevi kulübesi', 'tr', 'place-hermit', 1],
  ['harlow', 'tr', 'town-harlow', 1],
  ['dust creek', 'en', 'town-dustcreek', 1],
  ['schofield', 'tr', 'weapon-schofield', 1],
  ['rolling block', 'en', 'weapon-rifle', 1],
  ['demir mide başarımı', 'tr', 'ach-eater', 1],
  ['iron stomach achievement', 'en', 'ach-eater', 1],
  ['laudanum', 'tr', 'item-laudanum', 1],
  ['meteorite fragment', 'en', 'item-meteorite', 1],
  ['geyik boynuzu nereden bulunur', 'tr', 'item-antler', 1],
  ['altın külçe', 'tr', 'item-gold_bar', 1],
  ['uyku tulumu', 'tr', ['item-bedroll', 'camp'], 1],
  ['olta nereden alınır', 'tr', ['fishing', 'item-fishing_rod'], 2],
  // dünya haritası
  ['dünya haritası', 'tr', 'worldmap', 1],
  ['haritanın tamamı', 'tr', 'worldmap', 1],
  ['world map', 'en', 'worldmap', 1],
  ['harita nasıl açılır', 'tr', 'map', 1],
);
for (const [q, lang, exp, rank] of CASES) {
  const r = E.search(q, { lang });
  const ids = r.results.map(x => x.id);
  const want = Array.isArray(exp) ? exp : [exp];
  const pos = Math.min(...want.map(w => { const i = ids.indexOf(w); return i < 0 ? 99 : i + 1; }));
  ok(pos <= rank, `"${q}" [${lang}] → ${want.join('|')} beklendi (≤${rank}), sıra ${pos === 99 ? 'yok' : pos}; ilk üç: ${ids.slice(0, 3).join(', ')}`);
}

/* ---------------- 4. Davranış ---------------- */
console.log('Davranış');
{
  const r = E.search('at', { lang: 'tr' });
  ok(r.broad && r.results.filter(x => x.article.cat === 'horse').length >= 4, 'geniş sorgu ("at") daraltma dalları sunar');
  const r2 = E.search('ballik tutma', { lang: 'tr' });
  ok(r2.fixed && /balık/.test(r2.fixed), `yazım önerisi: ${r2.fixed}`);
  const r3 = E.search('ne yapmalıyım', { lang: 'tr' });
  ok(r3.results.length === 0, 'yalnızca soru sözcükleri: sonuç yok');
  const r4 = E.search('', { lang: 'tr' });
  ok(r4.results.length === 0, 'boş sorgu');
  const s = E.suggest('evcil', 'tr');
  ok(s.length && s[0].id === 'horse-tame', `yazarken öneri: evcil → ${s[0] && s[0].id}`);
  const s2 = E.suggest('bounty hun', 'en');
  ok(s2.length && s2[0].id === 'bountyhunters', `yazarken öneri: bounty hun → ${s2[0] && s2[0].id}`);
  const html = E.render('Yabani atlara **yaya** yaklaş, [[E]] bas.', 'at evcilleştir', 'tr');
  ok(/<mark>atlara<\/mark>/.test(html) && /<b>yaya<\/b>/.test(html) && /<kbd>E<\/kbd>/.test(html), 'vurgu ve biçim: ' + html);
  ok(!/<script/.test(E.render('<script>alert(1)</script>', '', 'tr')), 'HTML kaçışı');
  const lk = E.render('[Kinin](#/a/item-quinine) ve **Bandaj**', '', 'tr', (n) => (n === 'Bandaj' ? 'item-bandage' : null));
  ok(/<a class="ent" href="#\/a\/item-quinine">Kinin<\/a>/.test(lk) && /<a class="ent" href="#\/a\/item-bandage"><b>Bandaj<\/b><\/a>/.test(lk), 'bağlantılar ve kalın adların sayfaya bağlanması: ' + lk);
  ok(WS.plain('[Kinin](#/a/item-quinine) **x** [[E]]') === 'Kinin x E', 'düz metin: biçim işaretleri atılır');
  ok(E.snippet(entities.find(A => A.id === 'item-quinine'), 'kinin nerede satılır', 'tr').startsWith('Satıldığı yer'), 'veri sayfasında en uygun satır gösterilir');
  ok(/2\.8 per game hour/.test(E.snippet(articles.find(A => A.id === 'hunger'), 'hunger per game hour', 'en')), 'ondalık nokta cümleyi bölmez');
  const t0 = Date.now();
  for (let i = 0; i < 50; i++) E.search('nasıl para kazanırım ' + i, { lang: 'tr' });
  const ms = (Date.now() - t0) / 50;
  ok(ms < 30, `sorgu süresi ${ms.toFixed(1)} ms`);
}

console.log(`\n${pass} geçti, ${fail} kaldı`);
process.exit(fail ? 1 : 0);
