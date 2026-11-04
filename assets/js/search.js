/* Frontier's End Wiki — çok dallı anahtar kelime arama motoru
   ------------------------------------------------------------
   Sorgu birkaç daldan geçer ve her makale bu dalların en iyisiyle puanlanır:

   1. Normalleştirme: Türkçe büyük/küçük harf (İ/ı), aksanlar katlanır (ş→s, ğ→g, ı→i…), kesme işaretinden
      sonraki ek atılır (Harlow'a → harlow). Türkçe karakter yazmadan aramak aynı sonucu verir.
   2. Dil dalları: sorgu hem Türkçe hem İngilizce olarak işlenir; ikisinin kendi durdurma sözcükleri ve kök
      kuralları vardır ("at" Türkçede at, İngilizcede edattır). Sorgunun dili sezilir, arayüz dili hafif bir
      öncelik verir; iki dalın puanı ağırlıklandırılıp en iyisi alınır.
   3. Kök dalları: Türkçe ekler sondan geriye doğru, her adımda bütün olası ekler denenerek ayıklanır
      (evcilleştirebilirim → evcilleştirebilir → evcilleştir…); her ara biçim ayrı bir aday köktür, derine
      indikçe ağırlığı biraz düşer. Ünsüz yumuşaması (kurdu → kurt, tüfeği → tüfek) ayrı bir dal olarak eklenir.
      İngilizcede -s, -es, -ies, -ed, -ing, -er, -ly ayıklanır (taming → tame, bounties → bounty).
   4. Eşleşme dalları: her aday kök (a) kavram sözlüğündeki eş anlamlılarla (beygir → at kavramı),
      (b) makalelerin sözcükleriyle (aynı kök ayıklamasından geçmiş) karşılaştırılır. Çok sözcüklü öbekler
      (ödül avcısı, dead eye, satın al) önce eşleşir. Bir sözcüğün daha uzun bir kökü eşleştiyse onun kısa
      önekleri (kazan → kaz) cezalandırılır: en uzun anlamlı kök kazanır.
   5. Yazım hatası dalı: hiçbir kökü eşleşmeyen sözcük için sözlükte Damerau-Levenshtein uzaklığı 1-2 olan
      sözcükler denenir ve "Bunu mu demek istedin?" önerisi üretilir.
   6. Yakın kavram dalı: kavramın komşuları (kazanmak → para) düşük ağırlıkla eklenir.
   7. Puan: her sorgu birimi için en iyi dal × kavramın/sözcüğün nadirliği (IDF) × bulunduğu alanın ağırlığı
      (başlık 5, soru kalıpları 4, kısa ad 3, etiket 3,5, cevap 2, adımlar 1,3, ipuçları 1). Birimler toplanır;
      sorgunun ne kadarını karşıladığı (kapsama) puanı güçlü biçimde etkiler, bütün birimler başlıkta ya da bir
      soru kalıbında geçiyorsa ek puan verilir.
   8. Daraltma dalları: kısa ve geniş sorgularda (ör. "at") yakın puanlı sonuçların kısa adları seçenek olarak
      sunulur (Satın alma · Evcilleştirme · Islık…). */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WikiSearch = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ================= 1. Normalleştirme ================= */
  const MARKS = /[̀-ͯ]/g;
  function fold(s) {
    return String(s).toLowerCase().normalize('NFD').replace(MARKS, '').replace(/ı/g, 'i');
  }
  function plain(s) { return String(s).replace(/\*\*|\[\[|\]\]/g, ''); }
  function tokenize(s) {
    return fold(plain(s)).replace(/['’`´‘][a-z]*/g, ' ').split(/[^a-z0-9]+/).filter(Boolean);
  }

  /* ================= 2. Durdurma sözcükleri ================= */
  const STOP = {
    tr: new Set(('ve ile bir bu da de mi mu ne nasil nerede nereden nereye neden niye nicin hangi hangisi icin gibi ama fakat veya ya yoksa cok daha en her hic ' +
      'ben sen biz siz onlar benim senin beni seni bana sana sey seyi var yok olur olmak olarak oluyor olabilir olsun ki misin miyim muyum musun midir ' +
      'mudur nedir neler nelerdir kim kimi kime lazim gerek gerekir gerekiyor gerekli istiyorum isterim acaba oyun oyunda oyunu oyunun kendi tum butun ' +
      'yapilir yapmak yapmali yaparim yapabilirim yapiyorum yapmaliyim yapilmali yapmam simdi sonra once hep artik bile hala diye yani mesela orada burada ' +
      'icinde uzerinde ustunde altinda yaninda etmek ediyor edilir olur mu olmaz').split(' ')),
    en: new Set(('a an the and or of to in on at for with by from is are was were be been am do does did doing done how what where when why which who whom ' +
      'can could should would will shall may might must i me my mine you your we our us it its this that these those there here got have has had not ' +
      'no any some way ways into out about as if then than so just game anyone please tell know want need find also really very get to').split(' ')),
  };
  /* sorgunun başka bir şey sormadığını gösteren öbekler ("ne zaman", "how to") */
  const STOP_PHRASE = { tr: ['ne zaman', 'ne yapmaliyim', 'ne yapmali'], en: ['how to', 'how do', 'how can', 'is there', 'what is', 'what do', 'what are'] };
  const STOP_STEM = { tr: new Set(['yap', 'ol', 'oyun', 'et']), en: new Set(['do', 'get']) };

  /* ================= 3. Kök dalları ================= */
  /* Türkçe ekler, katlanmış (ı→i, ü→u…) ve uzundan kısaya. Her biri sondan ayıklanmayı dener. */
  const TR_SUF = ['yabilir', 'yebilir', 'abilir', 'ebilir', 'yabil', 'yebil', 'abil', 'ebil', 'iyor', 'uyor', 'yor', 'yacak', 'yecek', 'acak', 'ecek',
    'malar', 'meler', 'mali', 'meli', 'masi', 'mesi', 'larim', 'lerim', 'larin', 'lerin', 'lari', 'leri', 'imiz', 'umuz', 'iniz', 'unuz', 'siniz', 'sunuz',
    'ndan', 'nden', 'dan', 'den', 'tan', 'ten', 'nda', 'nde', 'nin', 'nun', 'dir', 'dur', 'tir', 'tur', 'dik', 'duk', 'tik', 'tuk', 'lik', 'luk',
    'mak', 'mek', 'maz', 'mez', 'sin', 'sun', 'siz', 'suz', 'lar', 'ler', 'yla', 'yle', 'ken', 'arak', 'erek', 'inca', 'ince', 'unca', 'iyle',
    'da', 'de', 'ta', 'te', 'ya', 'ye', 'yi', 'yu', 'na', 'ne', 'ni', 'nu', 'si', 'su', 'la', 'le', 'li', 'lu', 'ci', 'cu', 'ca', 'ce',
    'im', 'um', 'in', 'un', 'il', 'ul', 'ir', 'ur', 'ar', 'er', 'iz', 'uz', 'di', 'du', 'ti', 'tu', 'mis', 'mus', 'ma', 'me', 'sa', 'se', 'ip', 'up',
    'i', 'u', 'a', 'e', 'm', 'n', 'r', 'y'];
  const VOWEL = /[aeiou]/;
  const SOFT = { b: 'p', d: 't', g: 'k' };
  const MAX_DEPTH = 5;

  function stemsTR(w) {
    const out = new Map([[w, 0]]);
    if (/^\d+$/.test(w)) return out;
    let frontier = [w];
    for (let d = 1; d <= MAX_DEPTH && frontier.length; d++) {
      const next = [];
      for (const s of frontier) {
        for (const suf of TR_SUF) {
          if (!s.endsWith(suf)) continue;
          const st = s.slice(0, s.length - suf.length);
          if (st.length < 2 || !VOWEL.test(st)) continue;
          if (!out.has(st)) { out.set(st, d); next.push(st); }
          // ünsüz yumuşaması: ünlüyle başlayan ekten önce p/t/k → b/d/g (tüfeği → tüfeg → tüfek)
          const last = st[st.length - 1];
          if (SOFT[last] && /^[aeiou]/.test(suf)) {
            const hard = st.slice(0, -1) + SOFT[last];
            if (!out.has(hard)) out.set(hard, d);
          }
        }
      }
      frontier = next;
    }
    return out;
  }

  function stemsEN(w) {
    const out = new Map([[w, 0]]);
    if (/^\d+$/.test(w) || w.length < 4) return out;
    const add = (s, d) => { if (s.length >= 3 && !out.has(s)) out.set(s, d); };
    const undouble = (s, d) => { if (/([bdgklmnprt])\1$/.test(s)) add(s.slice(0, -1), d); };
    if (w.endsWith('ies')) add(w.slice(0, -3) + 'y', 1);
    if (/(ses|xes|zes|ches|shes)$/.test(w)) add(w.slice(0, -2), 1);
    if (w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us')) add(w.slice(0, -1), 1);
    for (const [suf, d] of [['ing', 1], ['ed', 1], ['ers', 1], ['er', 1], ['ly', 1], ['ment', 1], ['ness', 1]]) {
      if (!w.endsWith(suf)) continue;
      const s = w.slice(0, -suf.length);
      if (s.length < 3) continue;
      add(s, d); add(s + 'e', d); undouble(s, d);
    }
    return out;
  }
  const STEMMER = { tr: stemsTR, en: stemsEN };

  /* ================= Yardımcılar ================= */
  const depthW = (d) => 1 - 0.05 * d;
  /* kısa kökler (at, su, ok…) yalnızca az ek ayıklanmışsa eşleşir */
  const okPair = (stem, dq, da) => stem.length >= 4 || (stem.length === 3 ? dq + da <= 3 : dq + da <= 2);

  function dl(a, b, max) {                    // Damerau-Levenshtein (optimal hizalama), erken kesmeli
    if (Math.abs(a.length - b.length) > max) return max + 1;
    const n = a.length, m = b.length;
    let p2 = null, p1 = Array.from({ length: m + 1 }, (_, j) => j);
    for (let i = 1; i <= n; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= m; j++) {
        const c = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(p1[j] + 1, cur[j - 1] + 1, p1[j - 1] + c);
        if (p2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, p2[j - 2] + 1);
        cur.push(v);
        if (v < best) best = v;
      }
      if (best > max) return max + 1;
      p2 = p1; p1 = cur;
    }
    return p1[m];
  }

  /* ================= 4. Dizin ================= */
  const FIELDS = [['title', 5], ['q', 4], ['chip', 3], ['a', 2], ['steps', 1.3], ['tips', 1]];
  const TAG_W = 3.5;

  function create(articles, concepts, opts = {}) {
    const LANGS = ['tr', 'en'];
    const N = articles.length;
    const byId = new Map(articles.map(a => [a.id, a]));

    const stemCache = { tr: new Map(), en: new Map() };
    const cands = (L, w) => {
      let c = stemCache[L].get(w);
      if (!c) { c = STEMMER[L](w); stemCache[L].set(w, c); }
      return c;
    };
    /* iki sözcüğün kök kümeleri kesişiyor mu (öbeklerde); en sığ eşleşmenin toplam derinliğini döndürür */
    const meet = (a, b) => {
      let best = -1;
      for (const [s, d] of a) { const e = b.get(s); if (e != null && okPair(s, d, e) && (best < 0 || d + e < best)) best = d + e; }
      return best;
    };

    /* --- kavram eş anlamlıları: tek sözcükler ve öbekler --- */
    const syn = { tr: new Map(), en: new Map() };          // kök → Set(kavram)
    const phr = { tr: new Map(), en: new Map() };          // ilk sözcüğün kökü → [{c, sets}]
    const synSurface = { tr: new Map(), en: new Map() };   // kök → görünen biçim (öneri için)
    for (const [cid, C] of Object.entries(concepts)) {
      for (const L of LANGS) {
        for (const s of C[L] || []) {
          const toks = tokenize(s);
          if (!toks.length) continue;
          if (toks.length === 1) {
            const keys = L === 'en' ? [...stemsEN(toks[0]).keys()] : [toks[0]];
            for (const k of keys) {
              if (!syn[L].has(k)) syn[L].set(k, new Set());
              syn[L].get(k).add(cid);
              if (!synSurface[L].has(k)) synSurface[L].set(k, s);
            }
          } else {
            const P = { c: cid, len: toks.length, sets: toks.map(t => cands(L, t)), text: s };
            for (const k of P.sets[0].keys()) {
              if (!phr[L].has(k)) phr[L].set(k, []);
              if (!phr[L].get(k).includes(P)) phr[L].get(k).push(P);
            }
          }
        }
      }
    }
    /* i. sözcükten başlayan öbekleri bulur: [{P, depth}] */
    const phrasesAt = (L, toks, i, openLast) => {
      const seen = new Set(), out = [];
      for (const [st] of cands(L, toks[i])) {
        for (const P of phr[L].get(st) || []) {
          if (seen.has(P) || i + P.len > toks.length) continue;
          seen.add(P);
          let depth = 0, ok = true;
          for (let j = 0; j < P.len && ok; j++) {
            const qc = cands(L, toks[i + j]);
            const m = meet(qc, P.sets[j]);
            if (m >= 0) depth += m;
            else if (openLast && i + j === toks.length - 1 && toks[i + j].length >= 2 && [...P.sets[j].keys()].some(k => k.startsWith(toks[i + j]))) depth += 1;
            else ok = false;
          }
          if (ok) out.push({ P, depth });
        }
      }
      return out;
    };
    const stopPhrases = { tr: STOP_PHRASE.tr.map(tokenize), en: STOP_PHRASE.en.map(tokenize) };

    /* --- makale dizini --- */
    const idx = new Map();                 // id → { tr: {terms, conc}, en: {...} }
    const dfT = { tr: new Map(), en: new Map() };
    const dfC = new Map();
    const vocab = { tr: new Map(), en: new Map() };     // yüzey sözcük (katlanmış) → görünen biçim
    const fieldText = (A, f, L) => {
      const v = A[f] && A[f][L];
      if (v == null) return [];
      return Array.isArray(v) ? v : [v];
    };
    const isStop = (L, t) => STOP[L].has(t) || t.length < 2 && !/\d/.test(t);

    for (const A of articles) {
      const entry = {};
      for (const L of LANGS) {
        const terms = new Map(), conc = new Map();
        const put = (map, k, w) => { if (!(map.get(k) >= w)) map.set(k, w); };
        for (const [f, fw] of FIELDS) {
          for (const text of fieldText(A, f, L)) {
            const raw = tokenize(text);
            const words = plain(text).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
            for (const w of words) { const k = tokenize(w)[0]; if (k && !vocab[L].has(k)) vocab[L].set(k, w.toLowerCase()); }
            // öbek kavramlar (ödül avcısı, nişan al, dead eye…): öbeğin sözcükleri ayrıca tek başına kavram sayılmaz
            // ("nişan alma" satın almak değildir)
            const inPhrase = new Array(raw.length).fill(false);
            for (let i = 0; i < raw.length; i++) {
              for (const { P, depth } of phrasesAt(L, raw, i, false)) {
                put(conc, P.c, fw * depthW(depth / P.len));
                for (let j = 0; j < P.len; j++) inPhrase[i + j] = true;
              }
            }
            for (let i = 0; i < raw.length; i++) {
              const t = raw[i];
              if (isStop(L, t)) continue;
              const cs = cands(L, t);
              // en uzun kök kuralı (dizinde): "kazanımlar" kazanım köküne uyar, içindeki "kazan" sayılmaz
              const roots = [];
              for (const [st, d] of cs) if (okPair(st, 0, d) && syn[L].has(st)) roots.push(st);
              for (const [st, d] of cs) {
                if (!okPair(st, 0, d)) continue;
                put(terms, st, fw * depthW(d));
                const hit = !inPhrase[i] && syn[L].get(st);
                if (hit && !roots.some(r => r.length > st.length && r.startsWith(st))) for (const cid of hit) put(conc, cid, fw * depthW(d));
              }
            }
          }
        }
        for (const t of A.tags || []) put(conc, t, TAG_W);
        entry[L] = { terms, conc };
        for (const k of terms.keys()) dfT[L].set(k, (dfT[L].get(k) || 0) + 1);
      }
      const cs = new Set([...entry.tr.conc.keys(), ...entry.en.conc.keys()]);
      for (const c of cs) dfC.set(c, (dfC.get(c) || 0) + 1);
      idx.set(A.id, entry);
    }
    const idfT = (L, k) => 1 + Math.log(N / (dfT[L].get(k) || N));
    const idfC = (c) => 1 + Math.log(N / (dfC.get(c) || N));
    const vocabKeys = { tr: [...new Set([...dfT.tr.keys(), ...syn.tr.keys()])], en: [...new Set([...dfT.en.keys(), ...syn.en.keys()])] };

    /* ================= 5. Sorgu dalları ================= */
    function parse(q, L, partial) {
      const toks = tokenize(q);
      const endsOpen = partial && !/\s$/.test(q);
      const units = [];
      const used = new Array(toks.length).fill(false);
      // durdurma öbekleri
      for (const sp of stopPhrases[L]) {
        for (let i = 0; i + sp.length <= toks.length; i++) {
          if (sp.every((t, j) => toks[i + j] === t)) for (let j = 0; j < sp.length; j++) used[i + j] = true;
        }
      }
      // kavram öbekleri (en uzun önce; aynı uzunlukta birden çok kavram varsa hepsi dal olur)
      for (let i = 0; i < toks.length; i++) {
        if (used[i]) continue;
        const found = phrasesAt(L, toks, i, endsOpen).filter(f => {
          for (let j = 0; j < f.P.len; j++) if (used[i + j]) return false;
          return true;
        });
        if (found.length) {
          const len = Math.max(...found.map(f => f.P.len));
          const best = { len };
          const text = toks.slice(i, i + len).join(' ');
          const branches = found.filter(f => f.P.len === len).map(f => ({ k: 'c', c: f.P.c, w: depthW(f.depth / len), stem: text }));
          for (let j = 0; j < best.len; j++) used[i + j] = true;
          // öbeğin sözcükleri kendi başına da (düşük ağırlıkla) aranır
          for (let j = 0; j < best.len; j++) {
            const t = toks[i + j];
            if (isStop(L, t)) continue;
            for (const [st, d] of cands(L, t)) if (dfT[L].has(st) && okPair(st, d, 0)) branches.push({ k: 't', stem: st, w: 0.45 * depthW(d), wi: j });
          }
          units.push({ text, phrase: true, branches, pos: i });
        }
      }
      // tek sözcükler
      for (let i = 0; i < toks.length; i++) {
        if (used[i]) continue;
        const t = toks[i];
        if (isStop(L, t)) continue;
        const last = endsOpen && i === toks.length - 1;
        const cs = cands(L, t);
        // genel fiiller (yapmak, olmak) tek başına bir şey sormaz
        let generic = false;
        for (const [st, d] of cs) if (STOP_STEM[L].has(st) && d <= 3 && st.length >= t.length - 6 && !syn[L].has(t) && !dfT[L].has(t)) generic = true;
        if (generic && ![...cs.keys()].some(st => st.length > 3 && (syn[L].has(st) || dfT[L].has(st)))) continue;
        const branches = [];
        for (const [st, d] of cs) {
          const cs2 = syn[L].get(st);
          if (cs2 && okPair(st, d, 0)) for (const c of cs2) branches.push({ k: 'c', c, w: depthW(d), stem: st });
          if (dfT[L].has(st) && okPair(st, d, 0)) branches.push({ k: 't', stem: st, w: depthW(d) });
        }
        // yazarken: son sözcüğün öneki
        if (last && t.length >= 2) {
          for (const key of vocabKeys[L]) {
            if (key.length <= t.length || !key.startsWith(t)) continue;
            const cs2 = syn[L].get(key);
            if (cs2) for (const c of cs2) branches.push({ k: 'c', c, w: 0.72, stem: key, pre: 1 });
            if (dfT[L].has(key)) branches.push({ k: 't', stem: key, w: 0.7, pre: 1 });
          }
        }
        // en uzun kök kuralı: sözcük sözlükteki bir köke (kazan) uyuyorsa, o kökün içinde kalan kısa kökler
        // (kaz) rastlantısaldır ve cezalandırılır. Aynı sözcüğün ekli biçimleri (evcilleştirilir → evcilleştir) etkilenmez.
        const roots = branches.filter(b => !b.pre && b.k === 'c').map(b => b.stem);
        for (const b of branches) {
          if (b.pre) continue;
          if (roots.some(s => s.length > b.stem.length && s.startsWith(b.stem))) b.w *= 0.55;
        }
        let fixed = null;
        // yazım hatası dalı
        if (!branches.length && t.length >= 4 && !/^\d+$/.test(t)) {
          const max = t.length >= 8 ? 2 : 1;
          let hits = [];
          // önce sözcüğün kendisi, olmazsa tek ek ayıklanmış biçimi (kısa kökler yanıltır: bal → bas)
          const tries = [...cs].filter(([st, d]) => d <= 1 && st.length >= 4).sort((a, b) => a[1] - b[1]);
          for (const [st] of tries) {
            let bestD = max + 1;
            for (const key of vocabKeys[L]) {
              if (key.length < 4) continue;
              const dist = dl(st, key, max);
              if (dist > max || dist > bestD) continue;
              if (dist < bestD) { bestD = dist; hits = []; }
              hits.push(key);
            }
            if (hits.length) break;
          }
          hits = [...new Set(hits)].sort((a, b) => (dfT[L].get(b) || 0) + (syn[L].has(b) ? 3 : 0) - (dfT[L].get(a) || 0) - (syn[L].has(a) ? 3 : 0)).slice(0, 3);
          for (const key of hits) {
            const cs2 = syn[L].get(key);
            if (cs2) for (const c of cs2) branches.push({ k: 'c', c, w: 0.7, stem: key, fuzzy: 1 });
            if (dfT[L].has(key)) branches.push({ k: 't', stem: key, w: 0.68, fuzzy: 1 });
          }
          if (hits.length) fixed = synSurface[L].get(hits[0]) || vocab[L].get(hits[0]) || hits[0];
        }
        // yakın kavram dalı
        const have = new Map();
        for (const b of branches) if (b.k === 'c') have.set(b.c, Math.max(have.get(b.c) || 0, b.w));
        for (const [c, w] of [...have]) {
          for (const r of (concepts[c] && concepts[c].rel) || []) {
            if ((have.get(r) || 0) < w * 0.35) branches.push({ k: 'c', c: r, w: w * 0.35, stem: '~' + r, rel: 1 });
          }
        }
        units.push({ text: t, branches, fixed, pos: i });
      }
      units.sort((a, b) => a.pos - b.pos);
      return { toks, units };
    }

    /* ================= 6. Puanlama ================= */
    function scoreLang(parsed, L) {
      const res = new Map();
      const U = parsed.units.length;
      if (!U) return res;
      for (const A of articles) {
        const I = idx.get(A.id)[L];
        let sum = 0, matched = 0, strong = 0;
        for (const u of parsed.units) {
          // kavram dalı ile sözcük dalı ayrı ayrı; sözcüğün kendisi de geçiyorsa kavram puanına eklenir
          let bc = 0, bt = 0, bestField = 0;
          const perWord = [];          // öbekte her sözcüğün en iyi sözcük dalı ayrı sayılır
          for (const b of u.branches) {
            let v = 0, fw = 0;
            if (b.k === 'c') { fw = I.conc.get(b.c) || 0; v = b.w * idfC(b.c) * fw; if (v > bc) bc = v; }
            else {
              fw = I.terms.get(b.stem) || 0; v = b.w * idfT(L, b.stem) * fw;
              if (b.wi != null) { if (v > (perWord[b.wi] || 0)) perWord[b.wi] = v; } else if (v > bt) bt = v;
            }
            if (v > 0 && fw > bestField) bestField = fw;
          }
          if (perWord.length) bt = Math.max(bt, perWord.reduce((a, v) => a + (v || 0), 0));
          const best = bc && bt ? Math.max(bc, bt) + 0.35 * Math.min(bc, bt) : bc || bt;
          if (best > 0) { sum += best; matched++; if (bestField >= 3.4) strong++; }
        }
        if (!matched) continue;
        const cov = matched / U;
        let s = sum * (0.3 + 0.7 * cov * cov);
        if (U >= 2 && strong === U) s *= 1.15;
        res.set(A.id, { s, cov });
      }
      return res;
    }

    const TR_CHARS = /[ıışğçöüİŞĞÇÖÜ]/;
    function detect(q, ui) {
      const toks = tokenize(q);
      let tr = (ui === 'tr' ? 0.6 : 0) + 0.2, en = (ui === 'en' ? 0.6 : 0) + 0.2;
      if (TR_CHARS.test(q)) tr += 1.5;
      for (const t of toks) {
        if (STOP.tr.has(t) && !STOP.en.has(t)) tr += 1;
        if (STOP.en.has(t) && !STOP.tr.has(t)) en += 1;
        if (/(lar|ler|lari|leri|mak|mek|iyor|ilir|inir|irim|abilir|ebilir|sin|mi)$/.test(t) && t.length > 4) tr += 0.5;
        if (/(ing|tion|ness)$/.test(t) && t.length > 5) en += 0.5;
      }
      return { tr: tr / (tr + en), en: en / (tr + en) };
    }

    function search(q, o = {}) {
      const ui = o.lang === 'en' ? 'en' : 'tr';
      const partial = !!o.partial;
      const limit = o.limit || 10;
      if (!String(q || '').trim()) return { results: [], units: [], lang: ui, fixed: null, broad: false };
      const p = detect(q, ui);
      const parsed = { tr: parse(q, 'tr', partial), en: parse(q, 'en', partial) };
      const sc = { tr: scoreLang(parsed.tr, 'tr'), en: scoreLang(parsed.en, 'en') };
      const all = new Map();
      for (const L of LANGS) {
        const f = 0.55 + 0.45 * p[L];
        for (const [id, v] of sc[L]) {
          const s = v.s * f;
          const cur = all.get(id);
          if (!cur || s > cur.score) all.set(id, { id, score: s, cov: v.cov, via: L });
        }
      }
      let results = [...all.values()].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
      const top = results.length ? results[0].score : 0;
      results = results.filter(r => r.score >= top * 0.28).slice(0, limit);
      // sorgunun hangi dalda okunduğu: güçlü dalın birimleri
      const qL = results.length ? results[0].via : (p.tr >= p.en ? 'tr' : 'en');
      const units = parsed[qL].units;
      const fixedOf = (L) => {
        const fu = parsed[L].units.filter(u => u.fixed);
        if (!fu.length) return null;
        const toks = parsed[L].toks.slice();
        for (const u of fu) toks[u.pos] = u.fixed;
        return toks.join(' ');
      };
      const fixed = results.length ? fixedOf(qL) : null;
      const content = units.length;
      const broad = results.length >= 3 && content <= 2 && results[1].score >= top * 0.75;
      return { results: results.map(r => ({ id: r.id, score: r.score, cov: r.cov, article: byId.get(r.id) })), units, lang: qL, fixed, broad, p };
    }

    /* ================= 7. Vurgu ve en iyi cümle ================= */
    function queryStems(q, L) {
      const parsed = parse(q, L, false);
      const stems = new Set(), conc = new Set();
      for (const u of parsed.units) for (const b of u.branches) {
        if (b.rel) continue;
        if (b.k === 't') stems.add(b.stem);
        else conc.add(b.c);
      }
      // kavramın bu dildeki eş anlamlıları da vurgulanır
      for (const [k, cs] of syn[L]) for (const c of cs) if (conc.has(c)) stems.add(k);
      return stems;
    }
    function wordHits(word, L, stems) {
      const t = tokenize(word)[0];
      if (!t || isStop(L, t)) return false;
      for (const [st, d] of cands(L, t)) if (stems.has(st) && okPair(st, 0, d)) return true;
      return false;
    }
    /* metni HTML'e çevirir: **kalın**, [[tuş]] ve sorgu sözcüklerinin vurgusu */
    function render(text, q, L) {
      const stems = q ? queryStems(q, L) : null;
      const esc = (s) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
      const hl = (s) => {
        if (!stems || !stems.size) return esc(s);
        return s.replace(/[\p{L}\p{N}]+|[^\p{L}\p{N}]+/gu, (m) => /[\p{L}\p{N}]/u.test(m) && wordHits(m, L, stems) ? `<mark>${esc(m)}</mark>` : esc(m));
      };
      let out = '';
      const re = /\*\*(.+?)\*\*|\[\[(.+?)\]\]/g;
      let last = 0, m;
      while ((m = re.exec(text))) {
        out += hl(text.slice(last, m.index));
        out += m[1] != null ? `<b>${hl(m[1])}</b>` : `<kbd>${esc(m[2])}</kbd>`;
        last = re.lastIndex;
      }
      return out + hl(text.slice(last));
    }
    /* makalenin sorguya en çok uyan cümlesi (sonuç listesinde gösterilir) */
    function snippet(A, q, L) {
      const stems = queryStems(q, L);
      const pool = [A.a[L], ...(A.steps[L] || []), ...((A.tips && A.tips[L]) || [])];
      let best = pool[0], bestN = -1;
      pool.forEach((s, i) => {
        const sentences = String(s).match(/[^.!?]+(?:[.!?]+|$)/g) || [String(s)];
        for (const sen of sentences) {
          let n = 0;
          for (const w of plain(sen).split(/[^\p{L}\p{N}]+/u)) if (w && wordHits(w, L, stems)) n++;
          const v = n * 10 - i * 0.1;
          if (v > bestN) { bestN = v; best = sen; }
        }
      });
      return best;
    }

    return {
      search, render, snippet, parse, detect,
      suggest: (q, lang, n = 6) => search(q, { lang, partial: true, limit: n }).results,
      get: (id) => byId.get(id),
      stats: () => ({ articles: N, concepts: Object.keys(concepts).length, vocab: { tr: vocabKeys.tr.length, en: vocabKeys.en.length } }),
    };
  }

  return { create, fold, tokenize, stemsTR, stemsEN, dl };
});
