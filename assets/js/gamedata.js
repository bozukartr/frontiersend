/* Frontier's End Wiki — oyun verisinden gelen içerik
   ------------------------------------------------------------
   assets/data/game.js oyunun kendi tablolarından otomatik aktarılır (bozukartr/dustbound: node tools/wiki-export.js).
   Bu modül o veriyle iki iş yapar:

   1. Yer tutucular: makalelerdeki {{biçim:yol}} işaretleri oyunun güncel değeriyle doldurulur; böylece fiyatlar ve
      sınırlar elle yazılmaz, oyunda değişince wiki de değişir. Yol game.js içindeki bir değerdir (items.bedroll.p).
      Biçimler:  $ para · $- para aralığı · # sayı · #- sayı aralığı · % kesirden yüzde (0,25 → %25)
                 %# hazır yüzde (15 → %15) · x çarpan (×1,4) · n ad ({tr, en} ya da adı olan kayıt)
   2. Veri sayfaları: eşya, silah, at, hayvan, kasaba, önemli yer ve başarımlar için kısa bir giriş cümlesi ve bir
      bilgi tablosu üretilir. Cümleler oyunun düzyazısından alınmaz; tablolardaki değerlerden sade biçimde kurulur.
      Bağlantılar [metin](#/a/kimlik) biçimindedir; arama motoru ve arayüz bunları tanır. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WikiData = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const LANGS = ['tr', 'en'];
  const T2 = (tr, en) => ({ tr, en });

  /* ================= Biçimlendirme ================= */
  const group = (i, L) => i.replace(/\B(?=(\d{3})+(?!\d))/g, L === 'tr' ? '.' : ',');
  /* en çok iki ondalık, sondaki sıfırlar atılır; Türkçede ondalık virgül (2,5), İngilizcede nokta (2.5) */
  function num(v, L) {
    const s = (Math.round(Math.abs(v) * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
    const [i, f] = s.split('.');
    return (v < 0 ? '−' : '') + i + (f ? (L === 'tr' ? ',' : '.') + f : '');
  }
  /* oyundaki gibi: 1 doların altı sent (50¢), tam dolar küsuratsız ($30), diğerleri iki ondalıkla ($4,25 / $4.25) */
  function money(v, L) {
    if (v > 0 && v < 0.995) return Math.round(v * 100) + '¢';
    const c = Math.round(v * 100);
    const f = c % 100;
    return '$' + group(String(Math.floor(c / 100)), L) + (f ? (L === 'tr' ? ',' : '.') + String(f).padStart(2, '0') : '');
  }
  function moneyRange(a, b, L) {
    return a >= 1 && b >= 1 ? money(a, L) + '–' + money(b, L).slice(1) : money(a, L) + '–' + money(b, L);
  }
  const pct = (v, L) => (L === 'tr' ? '%' + num(v, L) : num(v, L) + '%');
  const cap = (s, L) => (s ? s.charAt(0).toLocaleUpperCase(L === 'tr' ? 'tr' : 'en') + s.slice(1) : s);
  const lower = (s, L) => s.toLocaleLowerCase(L === 'tr' ? 'tr' : 'en');
  function list(parts, L) {
    if (parts.length <= 1) return parts.join('');
    return parts.slice(0, -1).join(', ') + (L === 'tr' ? ' ve ' : ' and ') + parts[parts.length - 1];
  }
  const link = (text, id) => `[${text}](#/a/${id})`;

  /* ================= 1. Yer tutucular ================= */
  /* yol: nesne anahtarları ve dizi sırası (c.LIFE_PACES.0.dpy); dizilerde kimlikle de seçilir (recipes.arrows.need.feather) */
  const get = (G, path) => path.split('.').reduce((o, k) => {
    if (o == null) return undefined;
    if (Array.isArray(o) && !/^\d+$/.test(k)) return o.find(x => x && x.id === k);
    return o[k];
  }, G);
  const isNum = (v) => typeof v === 'number' && isFinite(v);
  const isPair = (v) => Array.isArray(v) && v.length === 2 && v.every(isNum);
  const FMT = {
    '$': (v, L) => (isNum(v) ? money(v, L) : null),
    '$-': (v, L) => (isPair(v) ? moneyRange(v[0], v[1], L) : null),
    '#': (v, L) => (isNum(v) ? num(v, L) : null),
    '#-': (v, L) => (isPair(v) ? num(v[0], L) + '–' + num(v[1], L) : null),
    '%': (v, L) => (isNum(v) ? pct(Math.round(v * 1000) / 10, L) : null),
    '%#': (v, L) => (isNum(v) ? pct(v, L) : null),
    'x': (v, L) => (isNum(v) ? '×' + num(v, L) : null),
    'n': (v, L) => { const o = v && v.n ? v.n : v; return o && typeof o[L] === 'string' ? o[L] : null; },
    's': (v) => (typeof v === 'string' && v ? v : null),   // dile göre değişmeyen düz metin (ör. bölge adı)
  };
  const PH = /\{\{([$#%xns-]{1,2}):([\w.]+)\}\}/g;
  function fillText(s, G, L, errs) {
    return String(s).replace(PH, (m, f, p) => {
      const out = FMT[f] ? FMT[f](get(G, p), L) : null;
      if (out == null) { errs.push(m); return '?'; }
      return out;
    });
  }
  /* makalelerdeki bütün yer tutucuları doldurur (yerinde); çözülemeyenleri döndürür */
  function fill(articles, G) {
    const errors = [];
    for (const A of articles) {
      for (const f of ['title', 'chip', 'q', 'a', 'steps', 'tips']) {
        const F = A[f];
        if (!F) continue;
        for (const L of LANGS) {
          if (F[L] == null) continue;
          const e = [];
          F[L] = Array.isArray(F[L]) ? F[L].map(s => fillText(s, G, L, e)) : fillText(F[L], G, L, e);
          for (const x of e) errors.push(`${A.id}.${f}.${L}: ${x}`);
        }
      }
    }
    return errors;
  }

  /* ================= 2. Veri sayfaları: sade metinler ================= */
  const LBL = {
    effect: T2('Etkisi', 'Effects'), price: T2('Fiyatı', 'Price'), soldAt: T2('Satıldığı yer', 'Sold at'),
    get: T2('Nasıl bulunur', 'How to get it'), sell: T2('Satarsan (yaklaşık)', 'Sells for (approx.)'),
    usedIn: T2('Tariflerde', 'Used in recipes'), max: T2('Çantada en fazla', 'Satchel limit'),
    dmg: T2('Hasar', 'Damage'), clip: T2('Şarjör', 'Magazine'), ammo: T2('Mermi', 'Ammo'), ammoAt: T2('Mermi satan', 'Ammo sold at'),
    speed: T2('Hız', 'Speed'), stamina: T2('Dayanıklılık', 'Stamina'), health: T2('Can', 'Health'), where: T2('Nereden alınır', 'Where to get it'),
    group: T2('Sürü', 'Group size'), habitat: T2('Yaşadığı yer', 'Habitat'), pelt: T2('Postu', 'Pelt'), meat: T2('Eti', 'Meat'), extra: T2('Ayrıca', 'Also'),
    buildings: T2('Binalar', 'Buildings'), jobs: T2('İşler', 'Jobs'), start: T2('Burada başlayan', 'Starting here'),
    chest: T2('Sandıkta', 'In the chest'), shop: T2('Satılanlar', 'For sale'), goal: T2('Koşul', 'Goal'), perk: T2('Kazanım', 'Perk'),
  };
  const ICAT = {
    food: T2('Yiyecek ve içecek', 'Food and drink'), med: T2('İlaç ve tütün', 'Medicine and tobacco'), herb: T2('Bitki', 'Herbs'),
    animal: T2('Post ve av ürünü', 'Pelts and animal parts'), valuable: T2('Değerli eşya', 'Valuables'), collect: T2('Koleksiyon', 'Collectibles'),
    tool: T2('Alet', 'Tools'), doc: T2('Belge', 'Documents'), clothing: T2('Giysi', 'Clothing'), horse: T2('At malzemesi', 'Horse supplies'),
    ammo: T2('Patlayıcı', 'Explosives'),
  };
  const IREL = { food: 'hunger', med: 'medicine', herb: 'herbs', animal: 'pelts', valuable: 'trade', collect: 'explore', clothing: 'clothes', horse: 'horse-bond', ammo: 'weapons' };
  const IDEF = {
    animal: T2('Avdan elde edilir ve satılır.', 'Comes from hunting and can be sold.'),
    valuable: T2('Değerli bir eşya; satıp para kazanırsın.', 'A valuable you can sell for money.'),
    collect: T2('Bir koleksiyon eşyası; bulup satabilirsin.', 'A collectible you can find and sell.'),
    herb: T2('Doğada toplanan bir bitki.', 'A plant you gather in the wild.'),
    clothing: T2('Bir giysi; görünüşünü değiştirir.', 'A piece of clothing that changes your look.'),
  };
  const HAT = T2('Bir şapka; görünüşünü değiştirir.', 'A hat that changes your look.');
  const GIFT = T2('Hediye olarak da verilebilir.', 'It also works as a gift.');
  /* eşyanın ne işe yaradığı (yalnız etkisi tablodan okunamayanlar için), ilgili makale */
  const NOTE = {
    bedroll: [T2('Kasabalardan uzakta kamp kurmak için gerekir.', 'You need it to make camp away from towns.'), 'camp'],
    fishing_rod: [T2('Nehir ve göl kenarında balık tutmanı sağlar.', 'Lets you fish at rivers and lakes.'), 'fishing'],
    gold_pan: [T2('Nehir kenarında altın elemek için kullanılır.', 'Used to pan for gold at rivers.'), 'gold'],
    pickaxe: [T2('Kayalık yerlerdeki cevher kayalarını kazmak için kullanılır.', 'Used to mine ore rocks in rocky areas.'), 'ore'],
    shovel: [T2('Hazine haritasının gösterdiği yeri kazmak için kullanılır.', 'Used to dig up the spot marked on a treasure map.'), 'treasure'],
    canteen: [T2('Su taşır; kuyu, çeşme ve nehirde dolar.', 'Carries water; refill it at wells, pumps and rivers.'), 'thirst'],
    lantern: [T2('Karanlıkta yolunu aydınlatır; terk edilmiş madenin galerilerine inmek için gerekir.', 'Lights your way in the dark; you need it to go down into the abandoned mine.'), 'explore'],
    horse_brush: [T2('Atını fırçalarsın; aranızdaki bağ güçlenir.', 'Brush your horse to strengthen your bond.'), 'horse-bond'],
    stakes: [T2('Boş bir araziye çakarak kendi evini kurmaya başlarsın.', 'Drive them into empty land to start building your own home.'), 'homestead'],
    binoculars: [T2('Uzaktaki hayvanları ve insanları görmeni sağlar.', 'Lets you see animals and people far away.'), 'binoculars'],
    lockpick: [T2('Kilitli kapıları sessizce açar.', 'Opens locked doors quietly.'), 'lockpick'],
    harmonica: [T2('Çarktan çalarsın; kısa bir ezgi seni dinlendirir.', 'Play it from the wheel; a short tune lifts your spirits.'), null],
    bait: [T2('Balık tutarken beklemeyi kısaltır.', 'Fish bite sooner when you use it.'), 'fishing'],
    land_deed: [T2('Kendi yaptığın evi yasal hâle getirir.', 'Makes a home you built legal.'), 'homestead'],
    treasure_map: [T2('Gömülü bir hazinenin yerini gösterir; orayı kürekle kazarsın.', 'Shows where treasure is buried; dig there with a shovel.'), 'treasure'],
    region_map: [T2('Bir kasabanın çevresini haritanda açar.', 'Reveals the area around a town on your map.'), 'map'],
    hay: [T2('Atına yedirirsin; canını artırır ve dayanıklılığını doldurur.', 'Feed it to your horse to restore its health and stamina.'), 'horse-bond'],
    horse_reviver: [T2('Canı bitip yere yığılan atını ayağa kaldırır.', 'Gets a downed horse back on its feet.'), 'horse-down'],
    horse_tonic: [T2('Atının dayanıklılığını doldurur.', 'Refills your horse’s stamina.'), 'horse-down'],
    dynamite: [T2('Fitilini yakıp attığın güçlü bir patlayıcı.', 'A powerful explosive you light and throw.'), 'weapons'],
    mask_bandana: [T2('Yüzünü gizler.', 'Hides your face.'), 'mask'],
    mask_sack: [T2('Yüzünü gizler.', 'Hides your face.'), 'mask'],
    hat_wide: [T2('Bir şapka; sıcakta seni biraz serinletir.', 'A hat that keeps you a little cooler in the heat.'), 'temperature'],
    coat_poncho: [T2('Yağmurda ıslanmanı da önler.', 'It also keeps you dry in the rain.'), 'temperature', 'add'],
    iron_ore: [T2('Cevher kayalarından kazılan bir maden.', 'An ore mined from ore rocks.'), 'ore'],
    silver_ore: [T2('Cevher kayalarından kazılan, demirden değerli bir maden.', 'An ore mined from ore rocks, worth more than iron.'), 'ore'],
    gold_nugget: [T2('Değerli bir altın parçası; satıp para kazanırsın.', 'A valuable gold nugget you can sell.'), 'gold'],
  };
  /* giysinin oyundaki ek etkileri (js/legends.js coatFx): çarpanlar yüzdeye çevrilir */
  const P100 = (v) => Math.round(Math.abs(1 - v) * 100);
  const COAT_FX = [
    ['rain', (v, L) => (L === 'tr' ? 'Yağmur geçirmez' : 'Rainproof')],
    ['scent', (v, L) => (L === 'tr' ? `Hayvanlar %${P100(v)} geç fark eder` : `Animals notice you ${P100(v)}% later`)],
    ['guard', (v, L) => (L === 'tr' ? `Hayvan saldırısı %${P100(v)} az yaralar` : `Animal attacks wound ${P100(v)}% less`)],
    ['aggro', (v, L) => (L === 'tr' ? `Saldırgan hayvanlar %${P100(v)} daha yakından saldırır` : `Hostile animals charge from ${P100(v)}% closer`)],
    ['sta', (v, L) => (L === 'tr' ? `Koşarken dayanıklılık %${P100(v)} yavaş tükenir` : `Stamina drains ${P100(v)}% slower while running`)],
    ['de', (v, L) => (L === 'tr' ? `Odak %${P100(v)} yavaş tükenir` : `Focus drains ${P100(v)}% slower`)],
    ['venom', (v, L) => (L === 'tr' ? 'Yılan sokması zehirlemez' : 'Snakebites don’t poison you')],
  ];
  /* tablolarda olmayan elde etme yolları */
  const SRC = {
    gold_nugget: [T2('Altın eleyerek', 'Gold panning'), 'gold'],
    gold_bar: [T2('Gömülü hazineden', 'Buried treasure'), 'treasure'],
    gold_ring: [T2('Gömülü hazineden', 'Buried treasure'), 'treasure'],
    necklace: [T2('Gömülü hazineden', 'Buried treasure'), 'treasure'],
    pocket_watch: [T2('Gömülü hazineden', 'Buried treasure'), 'treasure'],
  };
  /* etkiler: cümle parçası, eksi değer için ayrı parça, tablo etiketi */
  const EFF = {
    hunger: { s: T2('açlığı giderir', 'eases hunger'), l: T2('Açlık', 'Hunger') },
    thirst: { s: T2('susuzluğu giderir', 'quenches thirst'), l: T2('Susuzluk', 'Thirst') },
    health: { s: T2('can verir', 'restores health'), l: T2('Can', 'Health') },
    stamina: { s: T2('dayanıklılık verir', 'restores stamina'), neg: T2('dayanıklılığı biraz düşürür', 'lowers stamina a little'), l: T2('Dayanıklılık', 'Stamina') },
    energy: { s: T2('uykunu açar', 'keeps you awake'), neg: T2('uykunu getirir', 'makes you drowsy'), l: T2('Uyku', 'Sleep') },
    deadeye: { s: T2('Odak verir', 'restores Focus'), l: T2('Odak', 'Focus') },
    warmth: { s: T2('ısıtır', 'warms you'), l: T2('Sıcaklık', 'Warmth') },
    drunk: { s: T2('sarhoş eder', 'makes you drunk'), l: T2('Sarhoşluk', 'Drunkenness') },
    cure: { s: T2('hastalığı geçirir', 'cures sickness') },
    poison: { s: T2('zehri söker', 'cures poison') },
    sober: { s: T2('sarhoşluğu giderir', 'sobers you up') },
    immune: { s: T2('{h} saat hastalıktan korur', 'protects you from sickness for {h} hours') },
    pain: { s: T2('{h} saat boyunca aldığın hasarı azaltır', 'reduces the damage you take for {h} hours') },
    limber: { s: T2('{h} saat koşarken dayanıklılığın geç tükenir', 'makes stamina last longer while running for {h} hours') },
    cool: { s: T2('{h} saat serinletir', 'cools you down for {h} hours') },
  };
  const BIOME = {
    GRASS: T2('Çayır', 'Grassland'), DRY: T2('Kurak ova', 'Dry plains'), FOREST: T2('Orman', 'Forest'), SNOW: T2('Karlı dağlar', 'Snowy mountains'),
    DESERT: T2('Çöl', 'Desert'), ROCK: T2('Kayalık', 'Rocky hills'), REDROCK: T2('Kızıl kayalar', 'Red rocks'), SWAMP: T2('Bataklık', 'Swamp'),
  };
  const POOL = { cold: T2('soğuk bölgeler', 'cold regions'), mild: T2('ılıman bölgeler', 'mild regions'), warm: T2('sıcak bölgeler', 'warm regions') };
  /* önemli yer türleri: kısa tanım, ilgili makale, (varsa) içindeki dükkânın binası */
  const TYPE = {
    crater: { d: T2('Gökten düşen bir taşın açtığı büyük bir çukur.', 'A huge pit left by a stone that fell from the sky.') },
    sequoia: { d: T2('Ormanın içinde yükselen, çok yaşlı dev bir ağaç.', 'A giant, ancient tree rising out of the forest.') },
    ruins: { d: T2('Çoktan terk edilmiş eski bir misyonun yıkıntıları.', 'The crumbling remains of a long-abandoned mission.') },
    ghost: { d: T2('Halkı çoktan göçüp gitmiş, ıssız bir kasaba.', 'A deserted town whose people left long ago.') },
    mine: { d: T2('Kapanmış eski bir maden. İçi zifiri karanlıktır; galerilere inmek için fener gerekir.', 'A long-closed mine. It is pitch dark inside; you need a lantern to go down into the tunnels.'), rel: 'ore' },
    hotspring: { d: T2('Buharı tüten sıcak su kaynakları.', 'Steaming hot springs.') },
    dino: { d: T2('Topraktan dev kemiklerin çıktığı bir vadi.', 'A valley where giant bones stick out of the ground.') },
    hanging: { d: T2('Eski bir darağacının durduğu ıssız bir tepe.', 'A lonely hill with an old gallows on top.') },
    wreck: { d: T2('Yolda devrilmiş, yükü etrafa saçılmış bir posta arabası.', 'A stagecoach lying on its side, its cargo scattered around.') },
    lighthouse: { d: T2('Kıyıda yükselen bir deniz feneri.', 'A lighthouse standing on the coast.') },
    hermit: { d: T2('Kimseyle görüşmeden yaşayan birinin kulübesi; içeride alışveriş yapabilirsin.', 'The hut of someone who lives apart from everyone; you can trade inside.'), b: 'hermit', rel: 'medicine' },
    trapper: { d: T2('Bir tuzakçının kulübesi; post satabilir, kürk ve yem alabilirsin.', 'A trapper’s cabin where you can sell pelts and buy furs and bait.'), b: 'cabin', rel: 'pelts' },
    battlefield: { d: T2('Eski bir savaşın izlerini taşıyan geniş bir alan.', 'Wide fields still marked by an old battle.') },
    fortruin: { d: T2('Yıkılıp terk edilmiş eski bir kale.', 'An old fort, ruined and abandoned.') },
    windmill: { d: T2('Issız bir yerde tek başına duran bir yel değirmeni.', 'A windmill standing alone in empty country.') },
    oasis: { d: T2('Çölün ortasında küçük, yeşil bir vaha.', 'A small green oasis in the middle of the desert.') },
    lookout: { d: T2('Çevreye tepeden bakan yüksek bir nokta; çıkınca etraftaki geniş bir alan haritanda açılır.', 'A high point overlooking the land; climb it and a wide area around it appears on your map.'), rel: 'map' },
    cave: { d: T2('Kayaların arasında karanlık bir mağara.', 'A dark cave among the rocks.') },
    graveyard: { d: T2('Otların bürüdüğü, unutulmuş eski bir mezarlık.', 'An old, forgotten cemetery overgrown with weeds.') },
    shipwreck: { d: T2('Kıyıya vurup karaya oturmuş eski bir gemi.', 'An old ship that ran aground on the shore.') },
    arch: { d: T2('Rüzgârın kızıl kayayı oyarak yaptığı dev bir kemer.', 'A giant arch carved out of red rock by the wind.') },
  };
  const PLACE_NOTE = T2('Yeri her yeni hayatta değişir; bulduğunda haritanda görünür.', 'Its location changes with every new life; once you find it, it shows on your map.');
  /* başarım → konuyla ilgili makale */
  const ACH_REL = {
    hunt1: 'hunting', hunt25: 'pelts', hunt100: 'hunting', bear: 'predators', explore5: 'explore', explore20: 'explore', towns: 'train',
    rider: 'horse-ride', walker: 'time', eater: 'hunger', herbs: 'herbs', fisher: 'fishing', longshot: 'focus', gunslinger: 'weapons',
    rich: 'money', tycoon: 'property', worker: 'jobs', samaritan: 'honor', outlaw: 'wanted', saint: 'honor', devil: 'honor', home: 'property',
    married: 'romance', parent: 'romance', gambler: 'gambling', arm: 'gambling', desert: 'temperature', cold: 'temperature', gold: 'gold',
    collector: 'explore', tamer: 'horse-tame', camper: 'camp', treasure: 'treasure', train: 'train', deadeye: 'focus',
    age30: 'aging', age50: 'aging', age65: 'aging', age80: 'aging',
  };
  const SIZE = { s: T2('küçük', 'small'), m: T2('orta büyüklükte', 'medium-sized'), l: T2('büyük', 'large') };

  /* ================= 2. Veri sayfaları: üretim ================= */
  function entities(G) {
    const out = [];
    const items = G.items, shops = G.shops;
    const purch = new Set(Object.values(shops).flatMap(S => S.sell || []));
    const iLink = (id, L) => (items[id] ? link(items[id].n[L], 'item-' + id) : id);

    /* dükkânın oyuncunun gördüğü yerleri: kasaba binaları, gezgin kamplar, önemli yerler */
    const placesOf = {};
    for (const sid of Object.keys(shops)) {
      const P = { tr: [], en: [] };
      const add = (n, id) => { for (const L of LANGS) { const s = id ? link(n[L], id) : n[L]; if (!P[L].includes(s)) P[L].push(s); } };
      for (const B of Object.entries(G.buildings)) {
        if (B[1].shop !== sid) continue;
        const types = Object.keys(TYPE).filter(t => TYPE[t].b === B[0]);
        if (types.length) { for (const l of G.landmarks) if (types.includes(l.type)) add(l.n, 'place-' + l.id); } else add(B[1].n);
      }
      for (const N of G.nomads) if (N.shop === sid) add(N.n);
      if (!P.tr.length) add(shops[sid].n);
      placesOf[sid] = P;
    }
    const placesFor = (sids, L) => [...new Set(sids.flatMap(s => placesOf[s] ? placesOf[s][L] : []))];
    const sellersOf = (id, key) => Object.keys(shops).filter(s => (shops[s][key] || []).includes(id));

    /* eşyanın kaynakları */
    const hunted = {}, chests = {}, crafted = {}, usedIn = {}, jobsFor = {}, fished = {};
    for (const [aid, A] of Object.entries(G.animals)) for (const k of ['pelt', 'meat', 'extra']) if (A[k]) (hunted[A[k][0]] = hunted[A[k][0]] || new Set()).add(aid);
    for (const l of G.landmarks) for (const id of l.chest || []) (chests[id] = chests[id] || []).push(l);
    for (const r of G.recipes) {
      for (const id of Object.keys(r.out || {})) (crafted[id] = crafted[id] || []).push(r);
      for (const id of Object.keys(r.need)) (usedIn[id] = usedIn[id] || []).push(r);
    }
    for (const [jid, J] of Object.entries(G.jobs)) for (const [id] of J.bonus || []) (jobsFor[id] = jobsFor[id] || []).push(jid);
    for (const [pool, ids] of Object.entries(G.fish)) for (const id of ids) (fished[id] = fished[id] || []).push(pool);
    // efsanelerden çıkanlar (post, ganimet, balık); terzinin diktikleri ve siparişlerde kullanılan postlar
    const legendSrc = {}, tailored = {}, tailorUse = {}, tierUse = {};
    for (const Lg of Object.values(G.legends || {})) for (const x of [Lg.pelt, Lg.trophy].filter(Boolean)) legendSrc[x] = Lg;
    for (const F of Object.values(G.legendFish || {})) legendSrc[F.item] = F;
    for (const R of G.tailor || []) { tailored[R.id] = R; for (const x of Object.keys(R.need)) (tailorUse[x] = tailorUse[x] || []).push(R); }
    for (const S of [...(G.satchel || []), ...(G.saddle || [])]) for (const x of Object.keys(S.need || {})) (tierUse[x] = tierUse[x] || []).push(S);
    const gather = new Set(G.gather || []), ore = new Set(G.ore || []);

    const page = (kind, key, n, lead, rows, rel, extra) => {
      const facts = { tr: [], en: [] };
      for (const [lk, v] of rows) {
        if (!v) continue;
        for (const L of LANGS) if (v[L]) facts[L].push([LBL[lk][L], v[L]]);
      }
      const A = Object.assign({
        id: kind + '-' + key, cat: 'db-' + kind, entity: kind, key,
        title: T2(n.tr, n.en), chip: T2(n.tr, n.en), q: { tr: [n.tr], en: [n.en] },
        a: lead, steps: { tr: [], en: [] }, facts,
        ftext: { tr: facts.tr.map(([l, v]) => l + ': ' + v), en: facts.en.map(([l, v]) => l + ': ' + v) },
        rel: [...new Set(rel.filter(Boolean))],
      }, extra || {});
      out.push(A);
      return A;
    };
    const both = (fn) => ({ tr: fn('tr'), en: fn('en') });
    const joined = (fn) => both(L => { const a = fn(L); return a && a.length ? a.join(', ') : ''; });

    /* ---------- eşyalar ---------- */
    const W_OF_ITEM = {};
    for (const W of Object.values(G.weapons)) if (W.item) W_OF_ITEM[W.item] = W;
    for (const [id, it] of Object.entries(items)) {
      const note = NOTE[id];
      const lead = both(L => {
        const s = [];
        const parts = [];
        for (const [k, v] of Object.entries(it.e || {})) {
          const E = EFF[k];
          if (E) parts.push((v < 0 && E.neg ? E.neg : E.s)[L].replace('{h}', num(v, L)));
        }
        if (parts.length) s.push(cap(list(parts, L), L) + '.');
        if (it.warm) s.push(L === 'tr' ? `Giyince seni ${num(Math.abs(it.warm), L)} °C ${it.warm > 0 ? 'ısıtır' : 'serinletir'}.` : `Keeps you ${num(Math.abs(it.warm), L)} °C ${it.warm > 0 ? 'warmer' : 'cooler'}.`);
        if (it.made) s.push(L === 'tr' ? 'Dükkânda satılmaz; terzi senin postundan diker.' : 'No shop sells it; a tailor sews it from your own pelts.');
        if (legendSrc[id]) s.push(L === 'tr' ? `Efsanevi bir avdan çıkar; her hayatta yalnızca bir tane.` : `Comes from a legendary quarry; only one per life.`);
        if (note && (note[2] === 'add' || !s.length)) s.push(note[0][L]);
        if (!s.length) s.push((it.hat ? HAT : IDEF[it.c] || T2('', ''))[L]);
        if (it.raw && it.cook && items[it.cook]) s.push(L === 'tr' ? `Çiğ yenirse hasta edebilir; pişirince ${iLink(it.cook, L)} olur.` : `Eating it raw can make you sick; cook it to get ${iLink(it.cook, L)}.`);
        if (it.gift) s.push(GIFT[L]);
        return s.filter(Boolean).join(' ');
      });
      const eff = joined(L => [
        ...Object.entries(it.e || {}).filter(([k, v]) => EFF[k] && EFF[k].l && isNum(v)).map(([k, v]) => `${EFF[k].l[L]} ${v > 0 ? '+' : ''}${num(v, L)}`),
        ...(it.warm ? [`${EFF.warmth.l[L]} ${it.warm > 0 ? '+' : ''}${num(it.warm, L)} °C`] : []),
        ...COAT_FX.filter(([k]) => it[k] !== undefined).map(([k, f]) => f(it[k], L)),
      ]);
      const sellers = sellersOf(id, 'sell');
      const src = both(L => {
        const s = [];
        if (hunted[id]) s.push((L === 'tr' ? 'Av: ' : 'Hunting: ') + [...hunted[id]].map(a => link(G.animals[a].n[L], 'animal-' + a)).join(', '));
        if (fished[id]) s.push(link(L === 'tr' ? 'Balık tutarak' : 'Fishing', 'fishing') + ' (' + fished[id].map(p => POOL[p] ? POOL[p][L] : p).join(', ') + ')');
        if (gather.has(id)) s.push(it.c === 'herb' ? link(L === 'tr' ? 'Doğada toplanır' : 'Gathered in the wild', 'herbs') : (L === 'tr' ? 'Doğada toplanır' : 'Gathered in the wild'));
        if (ore.has(id)) s.push(link(L === 'tr' ? 'Cevher kayası kazarak' : 'Mining ore rocks', 'ore'));
        if (SRC[id]) s.push(link(SRC[id][0][L], SRC[id][1]));
        if (legendSrc[id]) s.push(link((L === 'tr' ? 'Efsane: ' : 'Legend: ') + legendSrc[id].n[L], 'legends'));
        if (tailored[id]) s.push(link(L === 'tr' ? 'Terzi diker' : 'Sewn by a tailor', 'crafting') + ': ' + Object.entries(tailored[id].need).map(([x, n]) => (n > 1 ? n + ' ' : '') + iLink(x, L)).join(' + ') + ' + ' + money(tailored[id].fee, L));
        for (const r of crafted[id] || []) s.push((L === 'tr' ? 'Yapılır: ' : 'Crafted: ') + Object.entries(r.need).map(([x, n]) => (n > 1 ? n + ' ' : '') + iLink(x, L)).join(' + '));
        for (const j of jobsFor[id] || []) s.push((L === 'tr' ? 'İş: ' : 'Job: ') + link(G.jobs[j].n[L], 'jobs'));
        if (chests[id]) s.push((L === 'tr' ? 'Sandık: ' : 'Chest: ') + chests[id].map(l => link(l.n[L], 'place-' + l.id)).join(', '));
        return s.join(' · ');
      });
      const buyers = Object.keys(shops).map(s => [s, shops[s].buy && shops[s].buy[it.c]]).filter(([, r]) => r > 0 && it.p > 0)
        .map(([s, r]) => [s, Math.max(0.01, purch.has(id) ? Math.min(it.p * r, it.p * 0.6) : it.p * r)])
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3);
      const W = W_OF_ITEM[id];
      page('item', id, it.n, lead, [
        ['effect', eff],
        ['dmg', W ? both(L => num(W.dmg, L)) : null],
        ['price', purch.has(id) && it.p > 0 ? both(L => money(it.p, L)) : null],
        ['soldAt', joined(L => placesFor(sellers, L))],
        ['get', src],
        ['sell', joined(L => buyers.map(([s, v]) => `${shops[s].n[L]} ≈ ${money(v, L)}`))],
        ['usedIn', joined(L => [...(usedIn[id] || []).map(r => {
          const o = Object.keys(r.out || {})[0];
          return o ? link(r.n[L], 'item-' + o) : r.n[L];
        }), ...(tailorUse[id] || []).map(R => iLink(R.id, L)), ...(tierUse[id] || []).map(S => link(S.n[L], 'crafting'))])],
        ['max', both(L => num(it.max, L))],
      ], [note && note[1], legendSrc[id] ? 'legends' : null, it.made || tailorUse[id] ? 'crafting' : null, IREL[it.c], it.raw || it.cook ? 'cooking' : null], { group: it.c });
    }

    /* ---------- silahlar ---------- */
    for (const [id, W] of Object.entries(G.weapons)) {
      if (W.item) continue;   // dinamit bir eşyadır; kendi sayfası var
      const A = W.ammo && G.ammo[W.ammo];
      const lead = both(L => {
        const tr = L === 'tr';
        if (W.lasso) return tr ? 'İnsanları ve hayvanları yakalayıp bağlamanı sağlar.' : 'Lets you catch and tie up people and animals.';
        if (W.melee) return tr ? 'Yakın dövüş silahı.' : 'A melee weapon.';
        if (W.kind === 'bow') return tr ? 'Sessiz bir yay; ateş edince av ürkmez.' : 'A silent bow; shooting it does not spook game.';
        if (W.pellets) return tr ? `${W.clip} namlulu bir av tüfeği; saçması yakında çok etkilidir.` : `A ${W.clip}-barrel shotgun; its shot is deadly up close.`;
        if (W.kind === 'pistol') return tr ? `${W.clip} atımlık bir tabanca.` : `A ${W.clip}-shot revolver.`;
        if (W.scope) return tr ? 'Tek atımlık, dürbünlü ve çok güçlü bir tüfek; uzaktaki iri av için idealdir.' : 'A single-shot scoped rifle that hits very hard; ideal for big game at long range.';
        return tr ? `${W.clip} atımlık bir tüfek.` : `A ${W.clip}-shot repeating rifle.`;
      });
      page('weapon', id, W.n, lead, [
        ['price', W.p ? both(L => money(W.p, L)) : null],
        ['dmg', W.dmg ? both(L => num(W.dmg, L) + (W.pellets ? ' × ' + W.pellets : '')) : null],
        ['clip', W.clip ? both(L => num(W.clip, L)) : null],
        ['ammo', A ? both(L => L === 'tr' ? `${A.n.tr} — kutusu ${money(A.p, L)} (${A.box} adet)` : `${A.n.en} — ${money(A.p, L)} per box of ${A.box}`) : null],
        ['soldAt', joined(L => placesFor(sellersOf(id, 'weapons'), L))],
        ['ammoAt', A ? joined(L => placesFor(sellersOf(W.ammo, 'ammo'), L)) : null],
      ], ['weapons', W.lasso ? 'lasso' : W.melee ? 'brawl' : W.kind === 'bow' ? 'hunting' : 'aim']);
    }

    /* ---------- atlar ---------- */
    const breeds = Object.values(G.horses);
    const top = (k) => Math.max(...breeds.map(h => h[k]));
    for (const [id, H] of Object.entries(G.horses)) {
      const spd = H.spd >= 1.2 ? T2('çok hızlı', 'very fast') : H.spd >= 1.05 ? T2('hızlı', 'fast') : H.spd >= 0.95 ? T2('orta hızda', 'medium-speed') : T2('yavaş', 'slow');
      const sta = H.sta >= 150 ? T2('çok dayanıklı', 'very high') : H.sta >= 120 ? T2('dayanıklı', 'high') : H.sta >= 100 ? T2('orta dayanıklılıkta', 'medium') : T2('çabuk yorulan', 'low');
      const starts = Object.values(G.backgrounds || {}).filter(b => b.horse === id);
      const lead = both(L => {
        const s = [L === 'tr' ? `${H.n.tr}, ${spd.tr} ve ${sta.tr} bir attır.` : `The ${H.n.en} is a ${spd.en} horse with ${sta.en} stamina.`];
        if (H.spd === top('spd')) s.push(L === 'tr' ? 'Oyundaki en hızlı at.' : 'The fastest horse in the game.');
        if (H.sta === top('sta')) s.push(L === 'tr' ? 'En dayanıklı at.' : 'The horse with the most stamina.');
        if (!H.p) s.push(L === 'tr' ? 'Ahırlarda satılmaz.' : 'Stables do not sell it.');
        return s.join(' ');
      });
      page('horse', id, H.n, lead, [
        ['price', H.p ? both(L => money(H.p, L)) : null],
        ['speed', both(L => num(Math.round(H.spd * 100), L))],
        ['stamina', both(L => num(H.sta, L))],
        ['health', both(L => num(H.hp, L))],
        ['where', joined(L => [
          ...(H.p ? [link(G.buildings.stable ? G.buildings.stable.n[L] : (L === 'tr' ? 'Ahır' : 'Stable'), 'horse-buy')] : []),
          ...starts.map(b => (L === 'tr' ? 'Başlangıç atı: ' : 'Starting horse: ') + link(b.n[L], 'newgame')),
        ])],
      ], ['horse-buy', 'horse-bond', 'horse-ride']);
    }

    /* ---------- hayvanlar ---------- */
    for (const [id, A] of Object.entries(G.animals)) {
      const lead = both(L => {
        const tr = L === 'tr', s = [];
        if (A.beh === 'hostile') s.push(tr ? 'Tehlikeli bir hayvan; yaklaşınca saldırır.' : 'A dangerous animal that attacks when you get close.');
        else if (A.beh === 'skittish') s.push(tr ? 'Genelde uzak durur; çok yaklaşırsan saldırabilir.' : 'Usually keeps its distance but may attack if you get too close.');
        else if (A.beh === 'passive') s.push(tr ? 'Uysal bir hayvan.' : 'A docile animal.');
        else s.push(tr ? 'Ürkek bir hayvan; yaklaşınca kaçar.' : 'A shy animal that runs when you get close.');
        if (A.venom) s.push(tr ? 'Isırığı zehirlidir.' : 'Its bite is venomous.');
        if (A.grp && A.grp[1] > 1) s.push(tr ? 'Sürü hâlinde gezer.' : 'It moves in groups.');
        if (A.night) s.push(tr ? 'Geceleri daha sık görülür.' : 'It is more common at night.');
        if (A.tame) s.push(tr ? 'Evcilleştirilebilir.' : 'It can be tamed.');
        if (A.owned) s.push(tr ? 'Çiftliklere aittir; öldürmek suçtur.' : 'It belongs to a farm; killing it is a crime.');
        return s.join(' ');
      });
      const drop = (k) => (A[k] ? both(L => iLink(A[k][0], L) + (k === 'extra' ? (L === 'tr' ? ` (${pct(Math.round(A[k][1] * 100), L)} şans)` : ` (${pct(Math.round(A[k][1] * 100), L)} chance)`) : A[k][1] > 1 ? ' × ' + A[k][1] : '')) : null);
      page('animal', id, A.n, lead, [
        ['health', both(L => num(A.hp, L))],
        ['dmg', A.dmg ? both(L => num(A.dmg, L)) : null],
        ['group', A.grp && A.grp[1] > 1 ? both(L => num(A.grp[0], L) + '–' + num(A.grp[1], L)) : null],
        ['habitat', A.owned ? T2('Çiftlikler', 'Farms') : joined(L => (A.b || []).map(b => BIOME[b] ? BIOME[b][L] : b))],
        ['pelt', drop('pelt')], ['meat', drop('meat')], ['extra', drop('extra')],
      ], ['hunting', A.beh === 'hostile' ? 'predators' : null, A.tame ? 'horse-tame' : null, A.venom ? 'poison' : null, 'pelts']);
    }

    /* ---------- kasabalar ---------- */
    for (const T of G.towns) {
      const K = G.townKinds[T.kind];
      const lead = both(L => {
        const s = [];
        const sz = SIZE[T.sz] ? SIZE[T.sz][L] : '';
        if (K) s.push(L === 'tr' ? `${T.n.tr}, ${sz} bir ${lower(K.n.tr, L)}.` : `${T.n.en} is a ${sz} ${lower(K.n.en, L)}.`);
        if (K && K.ghost) s.push(L === 'tr' ? 'Zor yıllarda boşalıp hayalet kasabaya dönebilir.' : 'In hard years it can empty out and become a ghost town.');
        s.push(L === 'tr' ? 'Kasabalar yıllar içinde büyür ya da geriler.' : 'Towns grow or decline over the years.');
        return s.join(' ');
      });
      const bs = T.b.filter(b => G.buildings[b] && (G.buildings[b].svc || []).length);
      page('town', T.id, T.n, lead, [
        ['buildings', joined(L => bs.map(b => G.buildings[b].n[L]))],
        ['jobs', joined(L => [...new Set(bs.map(b => G.buildings[b].work).filter(j => j && G.jobs[j]))].map(j => link(G.jobs[j].n[L], 'jobs')))],
        ['start', joined(L => Object.values(G.backgrounds || {}).filter(b => b.town === T.id).map(b => link(b.n[L], 'newgame')))],
      ], ['towns', 'services']);
    }

    /* ---------- önemli yerler ---------- */
    for (const l of G.landmarks) {
      const Y = TYPE[l.type] || {};
      const shopId = Y.b && G.buildings[Y.b] && G.buildings[Y.b].shop;
      page('place', l.id, l.n, both(L => [(Y.d || T2('', ''))[L], PLACE_NOTE[L]].filter(Boolean).join(' ')), [
        ['chest', l.chest && l.chest.length ? joined(L => l.chest.map(id => iLink(id, L))) : null],
        ['shop', shopId ? joined(L => (shops[shopId].sell || []).map(id => iLink(id, L))) : null],
      ], ['explore', Y.rel]);
    }

    /* ---------- başarımlar ---------- */
    for (const A of G.achievements) {
      page('ach', A.id, A.n, both(L => A.d[L]), [
        ['perk', A.perk ? both(L => A.perk[L]) : T2('Yok', 'None')],
      ], ['achievements', ACH_REL[A.id]]);
    }

    return out;
  }

  /* veri sayfalarının adları → kimlik (makalelerde kalın yazılan adları sayfaya bağlamak için) */
  function nameIndex(pages, fold) {
    const idx = { tr: new Map(), en: new Map() };
    for (const A of pages) for (const L of LANGS) {
      const k = fold(A.title[L]);
      if (!idx[L].has(k)) idx[L].set(k, A);
    }
    return idx;
  }

  return { fill, fillText, get, FMT, entities, nameIndex, money, moneyRange, num, pct, ICAT, LANGS };
});
