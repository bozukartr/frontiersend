# Frontier's End Wiki

**Frontier's End** oyununun arama tabanlı rehberi. Oyuncu takıldığı şeyi tek bir arama kutusuna yazar
(“yabani at nasıl evcilleştirilir?”, “how do I lose the law?”), rehber doğrudan cevabı ve adımları gösterir.

Yayın adresi (GitHub Pages açıldıktan sonra): **https://bozukartr.github.io/frontiersend/**

Oyunun kendisi `bozukartr/dustbound` deposundadır; oyunun ana menüsündeki **Wiki** düğmesi bu sayfayı
oyunun diliyle (`?lang=tr` ya da `?lang=en`) açar.

## Neler var?

- **Tek arama kutusu**: ekranın ortasında, Google ya da sohbet kutusu gibi sade bir giriş alanı. Altında dört
  hazır soru (para kazanma, yabani at, aranmaktan kurtulma, kamp).
- **Yazarken öneriler**: iki harften sonra en uygun konular listelenir; ↑/↓ ile gezilir, Enter ile açılır.
- **Cevap kartı**: en iyi sonucun kısa cevabı ve adımları hemen görünür; sorgudaki sözcükler vurgulanır.
  Altında diğer sonuçlar, her biri sorguya en çok uyan cümlesiyle.
- **Daraltma dalları**: “at” gibi geniş sorgularda yakın sonuçların kısa adları seçenek olarak sunulur
  (Satın alma · Evcilleştirme · Islık · Bağ ve bakım…).
- **Bunu mu demek istedin?**: yazım hatalı sözcükler sözlükteki en yakın sözcükle düzeltilir.
- **İki dil**: Türkçe ve İngilizce. Arayüz dili tarayıcıdan, `?lang=` parametresinden ya da sağ üstteki
  düğmeden seçilir ve hatırlanır. Arama her iki dilde de çalışır: Türkçe arayüzde İngilizce soru da bulunur.
- **Tüm konular**: kategorilere göre bütün başlıklar (`#/topics`); altında “Oyun verisi” bölümü.
- **Veri sayfaları**: 119 eşya, 9 silah, 7 at cinsi, 17 hayvan, 13 kasaba, 25 önemli yer ve 40 başarım için
  kısa bir giriş cümlesi ve bir bilgi tablosu: fiyatı, satıldığı yerler, nasıl bulunduğu (av, balık, toplama,
  tarif, iş, sandık), satınca kabaca ne getirdiği ve en iyi alıcıları, etkisi, hangi tariflerde kullanıldığı,
  hayvanın canı ve yaşadığı yerler, atın hızı ve dayanıklılığı, kasabanın binaları… “kinin nerede satılır”,
  “arap atı kaç para”, “bear pelt price” gibi sorular doğrudan bu sayfalara gider. Makalelerde kalın yazılan
  adlar (**Kinin**, **Mustang**) kendi sayfasına bağlanır.
- Açık ve koyu tema (sistem ayarını izler), telefon genişliğinde de düzgün.
- **Dünya haritası** (`#/map`, üst çubukta “Harita”): bütün dünya, oyunun kendi harita çiziminde; en yakın
  görünümde 12.288 × 12.288 piksel. Sürükleyerek, tekerlekle, iki parmakla, düğmelerle ya da klavyeyle (+ − 0, ok
  tuşları) gezilir, tam ekran açılır. Kasabalar, önemli yerler, çiftlikler, haydut kampları ve satılık mülkler
  iki dilde, tıklanabilir işaretlerdir; kasaba ve yer sayfalarında **Haritada göster** düğmesi o noktaya götürür
  (`#/map/town-harlow`).
- Hikâye bölümleri yoktur; metinler oyunun kurallarına dayanır ama oyundan birebir alınmamış, sadeleştirilmiştir.

## Dünya haritası nasıl üretilir?

Oyun deposunda `node tools/wiki-map.js` (wiki deposu oyunun yanında klonlu olmalı; `--root <klasör>`, `--seed`,
`--scale`, `--quality`). Araç oyunu başsız tarayıcıda açar, dünyayı sabit bir tohumla (1890) oyunun kendi
üreticisiyle kurar ve haritayı oyunun harita çizimiyle (kâğıt dokusu, kıyı mürekkebi, eş yükselti çizgileri,
binalar, yollar, patikalar, demiryolları, mil ızgarası, bölge adları) döşemeler hâlinde çizer:

- `assets/map/<düzey>/<x>-<y>.webp`: 512 piksellik döşemeler, 6 düzey (384 pikselden 12.288 piksele; yaklaşık 23 MB).
  Her düzey kendi ölçeğinde çizilir, çizgiler uzaktan da okunur kalır.
- `assets/data/map.js`: döşeme bilgisi, bölge adları ve işaretler (iki dilde ad, konum, bağlantı, oyunun simgesi).
- `assets/js/map.js`: görüntüleyici. Ekranda kalan döşemeleri yükler, en küçük düzey hep altta durur; en
  ayrıntılı düzeyden de yakına gidilince pikseller keskin büyür.

Dünya her yeni hayatta farklı üretilir. Kasabaların ve satılık mülklerin yeri hemen hemen aynıdır; önemli yerler,
kamplar ve çiftlikler aynı bölgede kalır ama birkaç mil kayabilir; kıyının, göllerin, nehir kıvrımlarının ve
yolların ayrıntısı değişir. Sayfa bunu söyler. Harita yalnız dünya üretimi ya da harita çizimi değişince
yeniden üretilmelidir (her üretim depoya yeni döşemeler ekler).

## Oyun verisi: tek kaynak

Wiki'deki sayılar elle yazılmaz. Oyun deposundaki (`bozukartr/dustbound`) `tools/wiki-export.js` aracı oyunun
kendi tablolarını (eşyalar, dükkânlar, hizmet fiyatları, atlar, hayvanlar, kasabalar, önemli yerler ve
sandıkları, başarımlar, işler, mülkler, hayatta kalma kuralları…) ve İngilizce adlarını okuyup
`assets/data/game.js` dosyasını üretir. Oyunun düzyazı açıklamaları aktarılmaz.

- **Veri sayfaları** bu dosyadan tarayıcıda üretilir (`assets/js/gamedata.js`): cümleler tablolardaki
  değerlerden sade biçimde kurulur, bilgi tablosu oyunun değerlerini gösterir.
- **Makalelerdeki sayılar** yer tutucudur: `{{$:items.bedroll.p}}` sayfada `$4,25` (İngilizcede `$4.25`) olur.
  Biçimler: `$` para, `$-` para aralığı, `#` sayı, `#-` sayı aralığı, `%` kesirden yüzde (0,25 → %25),
  `%#` hazır yüzde, `x` çarpan (×1,4), `n` ad. Yol `game.js` içindeki değerdir; dizilerde sıra ya da kimlik
  kullanılır (`c.LIFE_PACES.0.dpy`, `recipes.arrows.need.feather`, `achievements.towns.perk`).
- Oyunda bir değer değişince oyun deposunda `node tools/wiki-export.js` çalıştırılır (wiki deposu oyunun yanında
  klonlu olmalı) ve değişen `game.js` buraya gönderilir. Oyunun testi (`tests/e2e/wikidata.test.js`), wiki
  deposu yanındaysa buradaki kopyanın eski kaldığını yakalar; buradaki test de çözülemeyen yer tutucuyu,
  kırık bağlantıyı ya da eksik sayfayı yakalar.

Adresler: `#/` ana sayfa, `#/q/<soru>` arama, `#/a/<konu>` konu, `#/topics` tüm konular. Veri sayfaları:
`#/a/item-quinine`, `#/a/weapon-rifle`, `#/a/horse-arabian`, `#/a/animal-bear`, `#/a/town-harlow`,
`#/a/place-crater`, `#/a/ach-towns`.

## Arama nasıl çalışır? (çok dallı anahtar kelime araması)

Yapay zekâ kullanılmaz; her şey tarayıcıda, `assets/js/search.js` içinde çalışır. Sorgu birkaç daldan geçer,
her makale bu dalların en iyisiyle puanlanır:

1. **Normalleştirme**: Türkçe büyük/küçük harf (İ/ı) ve aksanlar katlanır (ş→s, ğ→g, ı→i…); kesme işaretinden
   sonraki ek atılır. Türkçe karakter kullanmadan yazmak aynı sonucu verir (`atimi nasil cagiririm`).
2. **Dil dalları**: sorgu hem Türkçe hem İngilizce kurallarla işlenir. Her dilin kendi durdurma sözcükleri
   vardır (“at” Türkçede at, İngilizcede edattır). Sorgunun dili sezilir; arayüz dili hafif öncelik verir.
3. **Kök dalları**: Türkçe ekler sondan geriye, her adımda bütün olası ekler denenerek ayıklanır
   (`evcilleştirebilirim → evcilleştirebilir → evcilleştir`); her ara biçim ayrı bir aday köktür, derine indikçe
   ağırlığı azalır. Ünsüz yumuşaması (`tüfeği → tüfek`, `kurdu → kurt`) ayrı bir dal olarak eklenir. İngilizcede
   `-s, -es, -ies, -ed, -ing, -er, -ly` ayıklanır (`taming → tame`, `bounties → bounty`). Kısa köklerde iki
   taraftaki ek derinliğinin toplamı sınırlıdır (uzay → “uz” ile uzun → “uz” eşleşmez).
4. **Eşleşme dalları**: her aday kök hem **kavram sözlüğüyle** (`beygir → at`, `kelle avcısı → ödül avcısı`)
   hem de makalelerin aynı yoldan köklenmiş sözcükleriyle karşılaştırılır. Çok sözcüklü öbekler (“ödül avcısı”,
   “satın al”, “dead eye”) önce eşleşir; makalede bir öbeğin sözcükleri ayrıca tek başına kavram sayılmaz
   (“nişan alma” satın almak değildir). Bir sözcük sözlükteki uzun bir köke uyuyorsa (kazan) içinde kalan,
   başka anlama gelen kısa kökler (kaz) cezalandırılır.
5. **Yazım hatası dalı**: hiçbir kökü eşleşmeyen sözcük için Damerau-Levenshtein uzaklığı 1-2 olan sözcükler
   denenir ve öneri gösterilir.
6. **Yakın kavram dalı**: kavramın komşuları (kazanmak → para) düşük ağırlıkla eklenir.
7. **Puan**: her sorgu birimi için en iyi kavram dalı ve en iyi sözcük dalı × nadirlik (IDF) × bulunduğu alanın
   ağırlığı (başlık 5, soru kalıpları 4, kısa ad 3, etiket 3,5, cevap 2, adımlar 1,3, ipuçları 1). Sözcüğün
   kendisi de geçiyorsa kavram puanına eklenir. Sorgunun ne kadarını karşıladığı (kapsama) puanı güçlü biçimde
   etkiler; bütün birimler başlıkta ya da bir soru kalıbında geçiyorsa ek puan verilir.
8. **Veri sayfaları**: bilgi tablosu da aranır (ağırlık 1,4). Yüzlerce veri sayfası nadirlik hesabını
   çarpıtmasın diye belge sıklığına çeyrek ağırlıkla katılır ve aynı puanda nasıl yapılır makalelerinin biraz
   gerisinde kalır. Sorgu bir sayfanın adını ve yalnızca fiyat / satın alma / satma sorusunu içeriyorsa
   (“kinin nerede satılır”) o sayfa öne çıkar; “yabani at nasıl evcilleştirilir” ise yine makaleye gider.

## Klasörler

```
index.html                 tek sayfa
assets/css/wiki.css        görünüm
assets/js/search.js        arama motoru (tarayıcıda ve Node'da çalışır)
assets/js/gamedata.js      oyun verisinden yer tutucular ve veri sayfaları (tarayıcıda ve Node'da çalışır)
assets/js/map.js           dünya haritası görüntüleyici
assets/js/app.js           arayüz: yönlendirme, öneriler, sonuç ve makale görünümü
assets/js/app-data.js      kategoriler, hazır sorular, arayüz metinleri (TR/EN)
assets/data/concepts.js    kavram sözlüğü (TR/EN eş anlamlılar)
assets/data/articles-*.js  makaleler, kategori kategori
assets/data/game.js        oyunun verisi (OTOMATİK ÜRETİLİR; dustbound: node tools/wiki-export.js)
assets/data/map.js         dünya haritasının işaretleri (OTOMATİK ÜRETİLİR; dustbound: node tools/wiki-map.js)
assets/map/                dünya haritasının döşemeleri (OTOMATİK ÜRETİLİR)
assets/img/                logo ve sekme simgesi
assets/fonts/              Rye yazı tipi (SIL Open Font License, bkz. Rye-OFL.txt)
tests/                     veri, arama kalitesi ve tarayıcı testleri
```

## Makale eklemek ya da düzenlemek

Her makale `assets/data/articles-*.js` dosyalarından birinde bir nesnedir:

```js
{
  id: 'horse-tame', cat: 'horse', tags: ['horse', 'tame', 'wild', 'lasso'],
  title: { tr: 'Yabani at evcilleştirme', en: 'Taming a wild horse' },
  chip:  { tr: 'Evcilleştirme', en: 'Taming' },                     // daraltma düğmesindeki kısa ad
  q:     { tr: ['yabani at nasıl evcilleştirilir', …], en: [ … ] },  // oyuncuların soracağı biçimler
  a:     { tr: 'Kısa cevap…', en: 'Short answer…' },
  steps: { tr: [ … ], en: [ … ] },                                   // nasıl yapılır
  tips:  { tr: [ … ], en: [ … ] },                                   // isteğe bağlı
  rel:   ['horse-bond', 'lasso'],                                     // ilgili konular
}
```

- Metinde `**kalın**`, `[[E]]` (tuş simgesi) ve `[metin](#/a/konu)` (bağlantı) kullanılabilir; HTML yazılmaz.
  Kalın yazılan bir eşya, silah, at, hayvan, kasaba ya da yer adı kendi veri sayfasına bağlanır; başarım adları
  yalnız “başarım” geçen cümlede bağlanır.
- `tags` kavram sözlüğündeki kimliklerdir (`assets/data/concepts.js`). Yeni bir eş anlamlı ya da yeni bir
  kavram eklemek aramayı hemen etkiler. Eş anlamlıları kök ya da yalın hâliyle yazın; çok genel sözcüklerden
  (ör. “slow”, “kapı”) kaçının: başka konulara da yapışırlar.
- `q` içine oyuncuların gerçekten soracağı cümleleri yazmak aramayı en çok güçlendiren şeydir.
- Oyunun verisinde olan sayıları elle yazmayın, yer tutucu kullanın (`({{$:items.quinine.p}})`,
  `{{#:c.HORSE_CAP}} birim`). Sayıdan sonra ek gelecekse cümleyi eksiz kurun (“1912’den sonra” değil
  “{{#:c.CAR_YEAR}} yılından sonra”): değer değişince ek uyumu bozulmasın. Başarım kazanımları için
  `**{{n:achievements.hunt25}}** başarımı: {{n:achievements.hunt25.perk}}.` kalıbı kullanılır.
- Yeni bir makaleyi `tests/search.test.js` içindeki örnek sorgulara da ekleyin.

## Testler

```
node tests/search.test.js     # veri denetimi (yer tutucular, veri sayfaları, bağlantılar) + 200'ü aşkın gerçek soru
                              # (TR/EN, ekli, yazım hatalı, eş anlamlı, fiyat ve satın alma soruları)
node tests/ui.test.js         # tarayıcıda arayüz (Playwright gerekir)
```

Yerelde açmak için depo klasöründe herhangi bir statik sunucu yeterlidir, ör. `python3 -m http.server`.

## Yayınlama (GitHub Pages)

Depo ayarlarında **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
**Branch: `main` / `(root)`** seçip kaydedin. Birkaç dakika sonra site
`https://bozukartr.github.io/frontiersend/` adresinde yayında olur. `.nojekyll` dosyası sayfanın olduğu gibi
sunulmasını sağlar; derleme adımı yoktur.
