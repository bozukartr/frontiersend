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
- **Tüm konular**: kategorilere göre bütün başlıklar (`#/topics`).
- Açık ve koyu tema (sistem ayarını izler), telefon genişliğinde de düzgün.
- Hikâye bölümleri yoktur; metinler oyunun kurallarına dayanır ama oyundan birebir alınmamış, sadeleştirilmiştir.

Adresler: `#/` ana sayfa, `#/q/<soru>` arama, `#/a/<konu>` konu, `#/topics` tüm konular.

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

## Klasörler

```
index.html                 tek sayfa
assets/css/wiki.css        görünüm
assets/js/search.js        arama motoru (tarayıcıda ve Node'da çalışır)
assets/js/app.js           arayüz: yönlendirme, öneriler, sonuç ve makale görünümü
assets/js/app-data.js      kategoriler, hazır sorular, arayüz metinleri (TR/EN)
assets/data/concepts.js    kavram sözlüğü (TR/EN eş anlamlılar)
assets/data/articles-*.js  makaleler, kategori kategori
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

- Metinde `**kalın**` ve `[[E]]` (tuş simgesi) kullanılabilir; HTML yazılmaz.
- `tags` kavram sözlüğündeki kimliklerdir (`assets/data/concepts.js`). Yeni bir eş anlamlı ya da yeni bir
  kavram eklemek aramayı hemen etkiler. Eş anlamlıları kök ya da yalın hâliyle yazın; çok genel sözcüklerden
  (ör. “slow”, “kapı”) kaçının: başka konulara da yapışırlar.
- `q` içine oyuncuların gerçekten soracağı cümleleri yazmak aramayı en çok güçlendiren şeydir.
- Sayıları ve adları oyunun güncel verisiyle (eşyalar, dükkânlar, hizmet fiyatları, hayatta kalma
  kuralları) aynı tutun.
- Yeni bir makaleyi `tests/search.test.js` içindeki örnek sorgulara da ekleyin.

## Testler

```
node tests/search.test.js     # veri denetimi + 170'i aşkın gerçek soru (TR/EN, ekli, yazım hatalı, eş anlamlı)
node tests/ui.test.js         # tarayıcıda arayüz (Playwright gerekir)
```

Yerelde açmak için depo klasöründe herhangi bir statik sunucu yeterlidir, ör. `python3 -m http.server`.

## Yayınlama (GitHub Pages)

Depo ayarlarında **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
**Branch: `main` / `(root)`** seçip kaydedin. Birkaç dakika sonra site
`https://bozukartr.github.io/frontiersend/` adresinde yayında olur. `.nojekyll` dosyası sayfanın olduğu gibi
sunulmasını sağlar; derleme adımı yoktur.
