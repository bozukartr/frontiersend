/* Frontier's End Wiki — makaleler: Temeller (kontroller, arayüz, kayıt, gelişim)
   Biçim: **kalın**, [[Tuş]] tuş simgesi. Metinler oyunun kurallarına dayanır ama sadeleştirilmiştir. */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'controls', cat: 'basics', tags: ['controls', 'settings'],
      title: { tr: 'Kontroller ve tuşlar', en: 'Controls and keys' },
      chip: { tr: 'Tuşlar', en: 'Keys' },
      q: {
        tr: ['tuşlar neler', 'hangi tuş ne işe yarar', 'nasıl oynanır', 'klavye kontrolleri', 'koşma tuşu'],
        en: ['what are the controls', 'which key does what', 'how to play', 'keyboard controls', 'run key'],
      },
      a: {
        tr: 'Klavyede **W A S D** ile yürür, **Shift** ile koşar, **E** ile etkileşirsin. Sağ tık nişan alır, sol tık ateş eder. Bütün tuşları **Ayarlar → Kontroller → Tuş Atamaları**ndan değiştirebilirsin.',
        en: 'On the keyboard you move with **W A S D**, run with **Shift** and interact with **E**. Right-click aims and left-click fires. Every key can be changed in **Settings → Controls → Key Bindings**.',
      },
      steps: {
        tr: [
          '[[E]] etkileşim, ata bin ve in. Basılı tutarsan seçenekler açılır.',
          '[[R]] şarjör değiştirir, [[F]] yakın dövüş, [[C]] çömelip gizlenir.',
          '[[Q]] nişan alırken Odak; nişan almıyorken önündeki kişiyi kışkırtır.',
          '[[Tab]] basılı: silah ve eşya çarkı. [[T]] hızlıca iyileşir ya da yer.',
          '[[H]] atı ıslıkla çağırır, [[L]] fener, [[I]] çanta, [[V]] maske.',
          '[[B]] basılı: kamp kur; kısa bas: büyük radar. [[M]] harita, [[J]] günlük, [[Esc]] duraklat.',
          '[[+]] ve [[−]] görüntüyü yakınlaştırır ya da uzaklaştırır.',
        ],
        en: [
          '[[E]] interacts, mounts and dismounts. Hold it to open more options.',
          '[[R]] reloads, [[F]] is melee, [[C]] crouches to sneak.',
          '[[Q]] is Focus while aiming; when not aiming it antagonizes the person in front of you.',
          'Hold [[Tab]] for the weapon and item wheel. [[T]] quickly heals or eats.',
          '[[H]] whistles for your horse, [[L]] lantern, [[I]] satchel, [[V]] mask.',
          'Hold [[B]] to make camp; tap it for the big radar. [[M]] map, [[J]] journal, [[Esc]] pause.',
          '[[+]] and [[−]] zoom the view in and out.',
        ],
      },
      tips: {
        tr: ['PlayStation kolunda: L2 nişan, R2 ateş, △ etkileşim, ✕ koşu, L1 çark, D-pad ↑ ıslık.', 'Menülerde Enter seçer, Esc geri döner, Q ve E sekme değiştirir.'],
        en: ['On a PlayStation controller: L2 aims, R2 fires, △ interacts, ✕ runs, L1 opens the wheel, D-pad ↑ whistles.', 'In menus Enter selects, Esc goes back, Q and E switch tabs.'],
      },
      rel: ['keybinds', 'aim', 'wheel'],
    },
    {
      id: 'keybinds', cat: 'basics', tags: ['controls', 'settings'],
      title: { tr: 'Tuşları değiştirme ve oyun kolu', en: 'Rebinding keys and using a controller' },
      chip: { tr: 'Tuş atama', en: 'Rebinding' },
      q: {
        tr: ['tuş nasıl değiştirilir', 'oyun kolu ile oynanır mı', 'ps kolu bağlama', 'nişan yardımı nasıl açılır'],
        en: ['how do I change keys', 'can I play with a controller', 'gamepad support', 'how to turn on aim assist'],
      },
      a: {
        tr: '**Ayarlar → Kontroller → Tuş Atamaları**nda klavye/fare ve oyun kolu ayrı ayrı ayarlanır. Bir tuşu başka bir eylemin tuşuna atarsan ikisi yer değiştirir.',
        en: 'In **Settings → Controls → Key Bindings** the keyboard/mouse and the controller are set separately. If you give a key to an action that already uses it, the two swap.',
      },
      steps: {
        tr: [
          'Kolu bağla; oyun onu kendiliğinden tanır. Ekrandaki tuş simgeleri **Kol Simgeleri** ayarıyla değişir.',
          'Kolda L2 baktığın yöndeki en uygun hedefe kilitlenir; sağ analogu savurunca yandaki hedefe geçer.',
          '**Nişan Yardımı (Kol)**: Kapalı, Hafif, Standart ya da Tam Kilit. **Nişan Hassasiyeti (Kol)** dönüş hızını ayarlar.',
          'Atamalar kaydedilir; oyunu kapatıp açınca da kalır.',
        ],
        en: [
          'Plug in the controller; the game picks it up on its own. The on-screen button icons follow the **Controller Icons** setting.',
          'On a controller L2 locks onto the best target where you are looking; flick the right stick to switch to the next one.',
          '**Aim Assist (Controller)**: Off, Light, Standard or Full Lock. **Aim Sensitivity (Controller)** sets how fast you turn.',
          'Your bindings are saved and stay after a restart.',
        ],
      },
      tips: {
        tr: ['Kolda siviller yalnızca sağ analogla onlara doğru nişan alırsan hedeflenir; kilit önce düşmanları seçer.'],
        en: ['With a controller, civilians are only targeted if you aim at them with the right stick; the lock prefers enemies.'],
      },
      rel: ['controls', 'aim', 'settings'],
    },
    {
      id: 'aim', cat: 'basics', tags: ['aim', 'shoot', 'weapon'],
      title: { tr: 'Nişan alma ve ateş etme', en: 'Aiming and shooting' },
      chip: { tr: 'Nişan', en: 'Aiming' },
      q: {
        tr: ['nasıl ateş edilir', 'nişan nasıl alınır', 'silahla vuramıyorum', 'şarjör nasıl değiştirilir'],
        en: ['how do I shoot', 'how do I aim', 'I cannot hit anything', 'how do I reload'],
      },
      a: {
        tr: 'Önce çarktan bir silah seç, sonra **sağ tıkı basılı tutarak** nişan al ve **sol tıkla** ateş et. Nişanı sabit tuttukça dağılım daralır, isabet artar.',
        en: 'Pick a weapon from the wheel first, then **hold right-click** to aim and **left-click** to fire. The longer you hold the aim steady, the tighter the spread.',
      },
      steps: {
        tr: [
          '[[Tab]] basılı tut, fareyle bir silah seç.',
          'Sağ tık basılı: nişan al. Kolda L2 hedefe kilitlenir.',
          'Sol tık ateş eder; nişansız ateş etmek isabetsizdir.',
          '[[R]] ile şarjör değiştir. Mermiyi silahçıdan alırsın.',
          'Zor anlarda nişan alırken [[Q]]: Odak zamanı yavaşlatır.',
        ],
        en: [
          'Hold [[Tab]] and choose a weapon with the mouse.',
          'Hold right-click to aim. On a controller, L2 locks onto a target.',
          'Left-click fires; shooting without aiming is inaccurate.',
          'Reload with [[R]]. Buy ammo at a gunsmith.',
          'In a tight spot press [[Q]] while aiming: Focus slows time down.',
        ],
      },
      tips: {
        tr: ['Kasabada boşuna ateş etmek suçtur; tanıklar kanuna koşar.', 'Sıcakta ya da soğukta bitkin düşünce elin titrer, nişan {{#:c.SURV.STAGE2_AIM}} kat dağılır.', 'Nişancılık yeteneği isabeti ve Odak süresini artırır.'],
        en: ['Firing in town for no reason is a crime; witnesses run to the law.', 'When heat or cold exhausts you, your hands shake and spread grows {{#:c.SURV.STAGE2_AIM}}×.', 'The Marksmanship skill improves accuracy and Focus duration.'],
      },
      rel: ['weapons', 'focus', 'wheel'],
    },
    {
      id: 'weapons', cat: 'basics', tags: ['weapon', 'buy', 'ammo', 'price'],
      title: { tr: 'Silahlar ve mermi', en: 'Weapons and ammo' },
      chip: { tr: 'Silahlar', en: 'Weapons' },
      q: {
        tr: ['silah nereden alınır', 'en iyi silah hangisi', 'mermi nereden alınır', 'yay nereden alınır', 'tüfek fiyatı'],
        en: ['where do I buy guns', 'what is the best weapon', 'where to buy ammo', 'where can I get a bow', 'rifle price'],
      },
      a: {
        tr: 'Silah ve mermi **silahçıda** satılır. Tabancalar {{$:weapons.cattleman.p}}–{{#:weapons.schofield.p}}, tüfekler {{$:weapons.repeater.p}}–{{#:weapons.rifle.p}}, av tüfeği {{$:weapons.shotgun.p}}, yay {{$:weapons.bow.p}} civarındadır. Demirci bıçak, birkaç dükkân da tabanca mermisi satar.',
        en: 'Guns and ammo are sold at the **gunsmith**. Revolvers cost about {{$:weapons.cattleman.p}}–{{#:weapons.schofield.p}}, rifles {{$:weapons.repeater.p}}–{{#:weapons.rifle.p}}, the shotgun {{$:weapons.shotgun.p}} and the bow {{$:weapons.bow.p}}. The blacksmith sells knives and a few shops sell revolver ammo.',
      },
      steps: {
        tr: [
          '**Tabancalar**: Drover ({{$:weapons.cattleman.p}}) ve daha güçlü Schofield ({{$:weapons.schofield.p}}). Düelloya girmek için tabanca gerekir.',
          '**Tüfekler**: Karabina ({{$:weapons.repeater.p}}), Plainsman ({{$:weapons.winchester.p}}) ve tek atımlık, çok güçlü Rolling Block ({{$:weapons.rifle.p}}). İri av için en iyisi Rolling Block.',
          '**Çift namlulu av tüfeği** ({{$:weapons.shotgun.p}}) yakında çok etkilidir.',
          '**Av yayı** ({{$:weapons.bow.p}}) sessizdir; av korkmaz. Oku silahçı ve tuzakçı satar, {{#:recipes.arrows.need.feather}} tüyden {{#:recipes.arrows.outAmmo.arrow}} ok da yapabilirsin.',
          '**Kement** ({{$:weapons.lasso.p}}) insanları ve hayvanları yakalar, **dinamit** silahçı ve kaçakçıda bulunur.',
        ],
        en: [
          '**Revolvers**: the Drover ({{$:weapons.cattleman.p}}) and the stronger Schofield ({{$:weapons.schofield.p}}). You need a revolver to accept a duel.',
          '**Rifles**: the Carbine Repeater ({{$:weapons.repeater.p}}), the Plainsman ({{$:weapons.winchester.p}}) and the single-shot, very powerful Rolling Block ({{$:weapons.rifle.p}}) — the best choice for big game.',
          'The **double-barrel shotgun** ({{$:weapons.shotgun.p}}) is deadly up close.',
          'The **hunting bow** ({{$:weapons.bow.p}}) is quiet, so game does not flee. Gunsmiths and trappers sell arrows; you can also craft {{#:recipes.arrows.outAmmo.arrow}} arrows from {{#:recipes.arrows.need.feather}} feathers.',
          'The **lasso** ({{$:weapons.lasso.p}}) catches people and animals; **dynamite** is sold by the gunsmith and the fence.',
        ],
      },
      tips: {
        tr: ['Ölen silahlı birinin silahı yere düşer; sende yoksa alırsın, varsa yalnız mermisini alırsın.'],
        en: ['When an armed person dies their gun drops; pick it up if you lack it, otherwise you only take the ammo.'],
      },
      rel: ['aim', 'hunting', 'lasso'],
    },
    {
      id: 'wheel', cat: 'basics', tags: ['wheel', 'weapon', 'controls'],
      title: { tr: 'Silah ve eşya çarkı', en: 'Weapon and item wheel' },
      chip: { tr: 'Çark', en: 'Wheel' },
      q: {
        tr: ['silah nasıl değiştirilir', 'silah nasıl seçilir', 'eşya nasıl kullanılır', 'çark nasıl açılır'],
        en: ['how do I switch weapons', 'how to equip a gun', 'how to use an item', 'how to open the wheel'],
      },
      a: {
        tr: '[[Tab]]’ı basılı tut: çark açılır. Fareyi istediğin yuvaya götürüp bırakınca o silah ele alınır. Çarkın ikinci sayfası **Eşyalar**dır; yiyecek ve ilaçları buradan kullanırsın.',
        en: 'Hold [[Tab]] to open the wheel. Move the mouse to a slot and let go to equip that weapon. The second page is **Items**, where you use food and medicine.',
      },
      steps: {
        tr: [
          '[[Tab]] basılı, fareyle bir yuva seç ve bırak.',
          '[[Q]] / [[E]] sayfa değiştirir: Silahlar ve Eşyalar.',
          'Fare tekerleği ya da [[←]] [[→]] aynı yuvadaki silahlar arasında geçer.',
          'Eşyalar sayfasında sol tık seçili eşyayı kullanır.',
        ],
        en: [
          'Hold [[Tab]], point at a slot with the mouse and let go.',
          '[[Q]] / [[E]] switch pages: Weapons and Items.',
          'The mouse wheel or [[←]] [[→]] cycle through weapons in the same slot.',
          'On the Items page, left-click uses the selected item.',
        ],
      },
      tips: {
        tr: ['Kolda L1 basılı tut ve sağ analogla seç; R1 sayfa değiştirir, ✕ eşya kullanır.', 'Acele edince [[T]] en uygun yiyeceği ya da ilacı kendisi kullanır.'],
        en: ['On a controller hold L1 and pick with the right stick; R1 switches pages and ✕ uses an item.', 'In a hurry, [[T]] picks the best food or medicine for you.'],
      },
      rel: ['aim', 'weapons', 'health'],
    },
    {
      id: 'focus', cat: 'basics', tags: ['focus', 'aim', 'shoot'],
      title: { tr: 'Odak (zamanı yavaşlatma)', en: 'Focus (slowing time)' },
      chip: { tr: 'Odak', en: 'Focus' },
      q: {
        tr: ['odak nasıl kullanılır', 'zaman nasıl yavaşlatılır', 'odak çubuğu nasıl dolar', 'dead eye'],
        en: ['how do I use focus', 'how to slow down time', 'how to refill focus', 'dead eye'],
      },
      a: {
        tr: 'Silahla nişan alırken [[Q]]’ya bas: zaman %35 hızına iner ve hedefleri rahatça vurursun. Açmak için Odak çubuğunun 12’nin üstünde olması gerekir.',
        en: 'While aiming a gun press [[Q]]: time drops to 35% speed so you can pick your targets. The Focus bar must be above 12 to start it.',
      },
      steps: {
        tr: [
          'Sağ tıkla nişan al, [[Q]]’ya bas.',
          'Odak açıkken çubuk hızla biter; nişanı bırakınca ya da çubuk bitince kapanır.',
          'Kapalıyken çubuk yavaş yavaş dolar.',
          'Çubuğun içindeki çekirdek zamanla azalır; kahve, tütün, sigara, puro, yılan yağı ve adaçayı onu doldurur.',
        ],
        en: [
          'Aim with right-click and press [[Q]].',
          'The bar drains fast while Focus is on; it ends when you stop aiming or the bar runs out.',
          'When off, the bar refills slowly.',
          'The core inside the bar slowly shrinks over time; coffee, tobacco, cigarettes, cigars, snake oil and sage top it up.',
        ],
      },
      tips: {
        tr: ['Kilisede günde bir kez dua etmek de çekirdeği doldurur.', '**{{n:achievements.longshot}}** başarımı: {{n:achievements.longshot.perk}}.'],
        en: ['Praying at a church once a day also fills the core.', '**{{n:achievements.longshot}}** achievement: {{n:achievements.longshot.perk}}.'],
      },
      rel: ['aim', 'medicine', 'achievements'],
    },
    {
      id: 'time', cat: 'basics', tags: ['time', 'aging'],
      title: { tr: 'Zaman, gün ve yıl', en: 'Time, days and years' },
      chip: { tr: 'Zaman', en: 'Time' },
      q: {
        tr: ['bir gün kaç dakika', 'oyunda zaman nasıl geçer', 'bir yıl kaç gün', 'saat kaç saniye'],
        en: ['how long is a day', 'how does time pass', 'how many days in a year', 'how long is an hour'],
      },
      a: {
        tr: 'Oyunda bir saat yaklaşık **{{#:d.hourSec}} gerçek saniye**, bir gün yaklaşık **{{#:d.dayMin}} dakika** sürer. Bir yılın kaç gün süreceğini yeni hayatta seçtiğin **yaşlanma hızı** belirler.',
        en: 'One in-game hour lasts about **{{#:d.hourSec}} real seconds** and a day about **{{#:d.dayMin}} minutes**. How many days make a year depends on the **aging pace** you choose for a new life.',
      },
      steps: {
        tr: [
          'Yaşlanma hızı: Yavaş (yıl {{#:c.LIFE_PACES.0.dpy}} gün), Normal ({{#:c.LIFE_PACES.1.dpy}} gün), Hızlı ({{#:c.LIFE_PACES.2.dpy}} gün).',
          'Oyun {{#:c.START_YEAR}} yılında başlar; dünya ve kasabalar yıllar içinde değişir.',
          'Uyurken zaman hızlı akar; açlık ve susuzluk uykuda yarı hızda azalır.',
          'Saat ve hava sağ üstteki gün kadranındadır.',
        ],
        en: [
          'Aging pace: Slow (a year is {{#:c.LIFE_PACES.0.dpy}} days), Normal ({{#:c.LIFE_PACES.1.dpy}} days), Fast ({{#:c.LIFE_PACES.2.dpy}} days).',
          'The game starts in {{#:c.START_YEAR}}; the world and its towns change over the years.',
          'Time flies while you sleep; hunger and thirst drop at half speed in your sleep.',
          'The clock and weather are on the day dial in the top-right corner.',
        ],
      },
      tips: {
        tr: ['Dükkânlar gece kapanır; pazar sabahı kasaba kiliseye gider.'],
        en: ['Shops close at night; on Sunday mornings the town goes to church.'],
      },
      rel: ['aging', 'sleep', 'towns'],
    },
    {
      id: 'save', cat: 'basics', tags: ['save'],
      title: { tr: 'Kaydetme ve kayıt yükleme', en: 'Saving and loading' },
      chip: { tr: 'Kayıt', en: 'Saving' },
      q: {
        tr: ['oyun nasıl kaydedilir', 'kayıt nasıl yüklenir', 'otomatik kayıt ne zaman', 'kaydım açılmıyor', 'kayıt silindi'],
        en: ['how do I save', 'how to load a save', 'when does it autosave', 'my save will not load', 'save deleted'],
      },
      a: {
        tr: 'Oyun **kendiliğinden kaydeder**: her yeni günde, uyuyunca ve oynarken 4 dakikada bir. Elle kaydetmek için **duraklat menüsü**nü, **çanta**yı, **evindeki yatağı** ya da kamp menüsünü kullan.',
        en: 'The game **autosaves** every new day, when you sleep and every 4 minutes of play. To save by hand use the **pause menu**, your **satchel**, the **bed at your home** or the camp menu.',
      },
      steps: {
        tr: [
          '3 kayıt yuvası vardır; her yuva ayrı bir hayattır.',
          'Her yuvada bir otomatik, bir de elle alınmış kayıt tutulur.',
          'Ana menüde **Devam Et** en yeni kaydı açar; **Kayıt Yükle**’de ikisinden istediğini seçersin.',
          'Bir kayıt bozuksa oyun nedenini söyler; aynı yuvanın öbür kaydını dene.',
        ],
        en: [
          'There are 3 save slots; each slot is a separate life.',
          'Each slot keeps one autosave and one manual save.',
          '**Continue** on the main menu opens the newest save; **Load Game** lets you pick either one.',
          'If a save is damaged the game tells you why; try the other save in the same slot.',
        ],
      },
      tips: {
        tr: ['Aranırken 4 dakikalık otomatik kayıt alınmaz.', '**Tek Hayat** zorluğunda yalnız otomatik kayıt vardır ve ölünce yuva silinir.'],
        en: ['The 4-minute autosave is skipped while you are wanted.', 'On **One Life** difficulty there is only an autosave, and the slot is deleted when you die.'],
      },
      rel: ['death', 'newgame', 'camp'],
    },
    {
      id: 'satchel', cat: 'basics', tags: ['satchel', 'chest', 'sell'],
      title: { tr: 'Çanta, eşya sınırı ve sandık', en: 'Satchel, item limits and the chest' },
      chip: { tr: 'Çanta', en: 'Satchel' },
      q: {
        tr: ['çantam doldu', 'çantada yer yok', 'eşyalarımı nerede saklarım', 'çanta nasıl açılır', 'kaç tane taşıyabilirim'],
        en: ['my satchel is full', 'no room in satchel', 'where can I store items', 'how to open the satchel', 'how many can I carry'],
      },
      a: {
        tr: '[[I]] çantayı açar. Çantada her eşya türünün **kendi sınırı** vardır: aletlerden birer tane, yiyecekten genelde {{#:items.beans.max}}, etten {{#:items.raw_game.max}}, bitkiden {{#:items.ginseng.max}} taşırsın. Sınır dolunca yenisi alınmaz; fazlasını **evindeki sandığa** koy ya da sat.',
        en: '[[I]] opens the satchel. Each item type has **its own limit**: one of each tool, usually {{#:items.beans.max}} of a food, {{#:items.raw_game.max}} of meat, {{#:items.ginseng.max}} of an herb. Once a limit is reached no more fit; put the rest in **your home’s chest** or sell it.',
      },
      steps: {
        tr: [
          'Çantadan eşya kullanır, inceler ve elle kayıt alırsın.',
          'Sandık evinde, kurduğun yapıda ve malikanededir: **Çantadan Koy** / **Sandıktan Al**.',
          'Büyük postlar ve leşler çantaya sığmaz; omzunda ya da eyerde taşınır.',
          'Silahlar çantada değil, çarkta durur.',
        ],
        en: [
          'From the satchel you can use items, inspect them and make a manual save.',
          'Chests are in your home, your built house and the mansion: **Put From Satchel** / **Take From Chest**.',
          'Large pelts and carcasses do not fit in the satchel; carry them on your shoulder or saddle.',
          'Weapons live in the wheel, not the satchel.',
        ],
      },
      tips: {
        tr: ['Malikanede uşak tutarsan postları ve değerli eşyaları sandığa kendisi kaldırır.'],
        en: ['Hire a butler at the mansion and pelts and valuables get put away in the chest for you.'],
      },
      rel: ['property', 'trade', 'carry'],
    },
    {
      id: 'journal', cat: 'basics', tags: ['journal'],
      title: { tr: 'Günlük ve oyun içi Rehber', en: 'The Journal and in-game Guide' },
      chip: { tr: 'Günlük', en: 'Journal' },
      q: {
        tr: ['günlük nasıl açılır', 'görevleri nerede görürüm', 'rehber nerede', 'yeteneklerimi nerede görürüm'],
        en: ['how to open the journal', 'where are my quests', 'where is the guide', 'where can I see my skills'],
      },
      a: {
        tr: '[[J]] Günlük’ü açar. Karakterin, yeteneklerin, başarımların, ilişkilerin, işletmelerin, görevlerin, kasabalar ve oyunun el kitabı **Rehber** buradadır.',
        en: '[[J]] opens the Journal. Your character, skills, achievements, relationships, businesses, quests, towns and the game’s handbook, the **Guide**, live here.',
      },
      steps: {
        tr: [
          '**Karakter**: onur, nüfuz ve genel durum.',
          '**Yetenekler**, **Başarımlar**, **İstatistikler** ve **İlişkiler** sekmeleri.',
          '**İşlerim**: işletmeler, stoklar, pazar payları, bankalar ve malikane.',
          '**Görevler** ve **Kasabalar** (kasabaların gelişimi ve son haberler).',
          '**Rehber**: kurallar ve sayılar konu konu anlatılır.',
        ],
        en: [
          '**Character**: honor, influence and overall status.',
          'The **Skills**, **Achievements**, **Statistics** and **Relationships** tabs.',
          '**Business**: your businesses, stock, market shares, banks and mansion.',
          '**Quests** and **Towns** (how each town is growing, plus recent news).',
          '**Guide**: the rules and numbers, topic by topic.',
        ],
      },
      tips: {
        tr: ['Yeni bir şeyle karşılaşınca çıkan ipucunun altında “Ayrıntılar: J Günlük → Rehber” yazar; o konu YENİ diye işaretlenir.'],
        en: ['When something new comes up, its hint ends with “Details: J Journal → Guide” and that topic is marked NEW.'],
      },
      rel: ['hud', 'skills', 'achievements'],
    },
    {
      id: 'hud', cat: 'basics', tags: ['hud', 'health', 'hunger', 'map'],
      title: { tr: 'Göstergeler, radar ve tehlike kartı', en: 'Meters, radar and the danger card' },
      chip: { tr: 'Göstergeler', en: 'Meters' },
      q: {
        tr: ['halkalar ne anlama geliyor', 'göstergeler kayboldu', 'sağ üstteki kart nedir', 'radar nasıl büyütülür', 'sayısal değerleri nasıl görürüm'],
        en: ['what do the rings mean', 'my meters disappeared', 'what is the card in the top right', 'how to enlarge the radar', 'how to see exact numbers'],
      },
      a: {
        tr: 'Sol alttaki radarın çevresinde can, dayanıklılık ve Odak ile açlık, susuzluk, uyku ve temizlik halkaları durur. Doluyken ve değişmezken sönerler; gerektiğinde yeniden görünürler.',
        en: 'Around the radar in the bottom-left are health, stamina and Focus, plus the hunger, thirst, sleep and cleanliness rings. They fade out while full and steady, and come back when needed.',
      },
      steps: {
        tr: [
          '[[B]]’ye kısa bas: radar büyür, bütün göstergelerin sayıları, hava, sıcaklık ve onur görünür.',
          'Her zaman görmek istersen **Ayarlar → Görüntü → Göstergeler: Her Zaman**.',
          'Can götüren bir durumda (zehir, susuzluk, sıcak…) sağ üstte **tehlike kartı** çıkar.',
          'Kart ne kadar süreceğini, bu gidişle ne kadar vaktin kaldığını ve çantandaki çareleri gösterir.',
        ],
        en: [
          'Tap [[B]]: the radar grows and shows exact numbers for every meter, plus weather, temperature and honor.',
          'To always see them, set **Settings → Display → Meters: Always**.',
          'When something is draining your health (poison, thirst, heat…) a **danger card** appears in the top right.',
          'The card shows how long it will last, how much time you have at this rate and which items in your satchel help.',
        ],
      },
      tips: {
        tr: ['Bir ihtiyaç 20’nin altına düşünce halkası kırmızı yanıp söner.', 'Radarın kenarındaki işaretler görev hedefini, haritadaki işaretini ve atını gösterir.'],
        en: ['A need ring flashes red below 20.', 'Markers on the radar’s rim point to your quest target, your map pin and your horse.'],
      },
      rel: ['health', 'map', 'settings'],
    },
    {
      id: 'map', cat: 'basics', tags: ['map', 'explore', 'travel'],
      title: { tr: 'Harita, işaretler ve yol tarifi', en: 'Map, pins and directions' },
      chip: { tr: 'Harita', en: 'Map' },
      q: {
        tr: ['haritaya nasıl işaret konur', 'en yakın doktoru nasıl bulurum', 'harita nasıl açılır', 'haritada yer nasıl bulunur', 'gps rotası'],
        en: ['how to place a map marker', 'how do I find the nearest doctor', 'how to open the map', 'how to find a place on the map', 'gps route'],
      },
      a: {
        tr: '[[M]] haritayı açar. Soldaki açıklamada bir türe (ör. Doktor) tıklarsan bildiğin **en yakın** yer işaretlenir ve yol tarifi çıkar. **Shift + tık** ile adını verdiğin bir işaret koyarsın.',
        en: '[[M]] opens the map. Click a type in the legend (e.g. Doctor) to mark the **nearest** one you know and get directions. **Shift + click** places a pin you can name.',
      },
      steps: {
        tr: [
          'Harita gezdikçe açılır; keşfetmediğin yerler eski kâğıt gibi taralı görünür.',
          'Aynı türe yeniden tıklamak bir sonraki yere geçer.',
          'Türlerin yanındaki gözle o türü haritada gizler ya da gösterirsin.',
          'İşaretler sağ üstteki listede durur (en çok {{#:c.MAP_PINS}}); sağ tık ya da × siler.',
          'Konum kartı hedefe yolu ve yaya, atla ya da faytonla süresini yazar.',
        ],
        en: [
          'The map reveals itself as you travel; unexplored areas look like hatched old paper.',
          'Clicking the same type again jumps to the next place.',
          'The eye icon next to each type hides or shows it on the map.',
          'Pins appear in the list at the top right (up to {{#:c.MAP_PINS}}); right-click or × removes one.',
          'The location card shows the route length and travel time on foot, on horseback or by carriage.',
        ],
      },
      tips: {
        tr: ['Genel mağazadaki **Bölge Haritası** ({{$:items.region_map.p}}) o kasabanın çevresini açar.', 'Deniz fenerine tırmanmak kıyı haritasını açar; dürbünle gördüğün yerler de işaretlenir.'],
        en: ['The **Regional Map** ({{$:items.region_map.p}}) from a general store reveals the area around that town.', 'Climbing a lighthouse reveals the coast; places you spot with binoculars get marked too.'],
      },
      rel: ['explore', 'binoculars', 'train'],
    },
    {
      /* map: makalenin içinde yakınlaştırılabilir dünya haritası gösterilir (assets/js/map.js, assets/data/map.js) */
      id: 'worldmap', cat: 'basics', tags: ['map', 'town', 'explore'], map: true,
      title: { tr: 'Dünya haritası', en: 'World map' },
      chip: { tr: 'Dünya haritası', en: 'World map' },
      q: {
        tr: ['dünya haritası', 'haritanın tamamı', 'büyük harita', 'harita görseli', 'kasabalar nerede', 'önemli yerler nerede', 'bütün harita'],
        en: ['world map', 'full map', 'whole map', 'big map', 'map image', 'where are the towns', 'where are the landmarks'],
      },
      a: {
        tr: 'Bütün dünya, oyunun kendi harita çiziminde. Sürükleyerek gez, tekerlekle ya da iki parmakla yakınlaştır; bir kasabaya ya da yere tıklayınca sayfası açılır.',
        en: 'The whole world, drawn in the game’s own map style. Drag to move around, zoom with the wheel or two fingers; click a town or place to open its page.',
      },
      stepsTitle: { tr: 'Haritayı okumak', en: 'Reading the map' },
      steps: {
        tr: [
          'Çift çizgi ana yol, kesikli çizgi patika, traversli siyah çizgi demiryoludur. Izgaranın her karesi iki mildir (uzaktan bakınca dört).',
          'Kasabaların ve satılık mülklerin yeri her hayatta neredeyse aynıdır.',
          'Önemli yerler, haydut kampları (kırmızı) ve çiftlikler hep aynı bölgededir ama yeni bir hayatta birkaç mil kayabilir.',
          'Kıyının, göllerin, nehir kıvrımlarının ve yolların ayrıntısı her dünyada biraz farklıdır: bu harita örnek bir dünyadır.',
        ],
        en: [
          'A double line is a main road, a dashed line is a trail and a black line with ties is the railroad. Each grid square is two miles (four when zoomed out).',
          'Towns and properties for sale are almost always in the same place in every life.',
          'Landmarks, bandit camps (red) and farms are always in the same area, but in a new life they can shift by a few miles.',
          'The details of the coast, lakes, river bends and roads differ a little in every world: this map shows an example world.',
        ],
      },
      tips: {
        tr: ['Oyunda haritayı [[M]] ile açarsın; orada yalnızca gezdiğin yerler görünür.'],
        en: ['In the game, [[M]] opens the map; it only shows the places you have explored.'],
      },
      rel: ['map', 'explore', 'towns'],
    },
    {
      id: 'newgame', cat: 'basics', tags: ['newgame', 'difficulty', 'aging'],
      title: { tr: 'Yeni hayat: geçmiş, zorluk ve yaşlanma hızı', en: 'New life: background, difficulty and aging pace' },
      chip: { tr: 'Yeni hayat', en: 'New life' },
      q: {
        tr: ['hangi geçmişi seçmeliyim', 'karakter nasıl oluşturulur', 'tek hayat nedir', 'hikayesiz oynanır mı', 'en kolay başlangıç'],
        en: ['which background should I pick', 'how to create a character', 'what is one life', 'can I play without the story', 'easiest start'],
      },
      a: {
        tr: 'Karakteri dört adımda oluşturursun: Kimlik, Görünüm, Kıyafet ve Hikâye. Burada geçmişini, zorluğu ve yaşlanma hızını seçersin. Her geçmiş farklı bir kasabada, farklı para, at ve eşyalarla başlar.',
        en: 'You build a character in four steps: Identity, Appearance, Clothing and Story. There you choose a background, the difficulty and the aging pace. Each background starts in a different town with different money, horse and gear.',
      },
      steps: {
        tr: [
          '**Çiftçi Çocuğu**: Harlow, {{$:backgrounds.farm.money}}, yaşlı bir kısrak; hayatta kalma becerisi.',
          '**Göçmen**: Saint Clement, {{$:backgrounds.immigrant.money}}, at yok; ticaret ve karizma.',
          '**Kanun Kaçağı**: Dust Creek yakınındaki saklı kamp, {{$:backgrounds.outlaw.money}}, Mustang, başında {{$:backgrounds.outlaw.bounty}} ödül ve bir bandana.',
          '**Demiryolu İşçisi**: Fort Redstone, {{$:backgrounds.rail.money}}, at yok; güçlü başlar.',
          '**Tuzakçı**: Cedar Falls, {{$:backgrounds.trapper.money}}, Morgan atı ve yay; avcılık.',
          'Zorluk: **Hikâye**de ölünce doktor kurtarır; **Tek Hayat**ta ölüm kalıcıdır.',
        ],
        en: [
          '**Farm Kid**: Harlow, {{$:backgrounds.farm.money}}, an old mare; good at survival.',
          '**Immigrant**: Saint Clement, {{$:backgrounds.immigrant.money}}, no horse; good at trade and charisma.',
          '**Outlaw**: a hidden camp near Dust Creek, {{$:backgrounds.outlaw.money}}, a Mustang, a {{$:backgrounds.outlaw.bounty}} bounty and a bandana.',
          '**Railroad Worker**: Fort Redstone, {{$:backgrounds.rail.money}}, no horse; starts strong.',
          '**Trapper**: Cedar Falls, {{$:backgrounds.trapper.money}}, a Morgan horse and a bow; good at hunting.',
          'Difficulty: on **Story** a doctor saves you when you die; on **One Life** death is permanent.',
        ],
      },
      tips: {
        tr: ['**Hikâyeli Başlangıç**ı kapatırsan görevsiz, serbest başlarsın.', 'Kanun Kaçağı kasabaya maskeyle girmeli ya da şerife teslim olup cezasını ödemeli.'],
        en: ['Turn off **Story Start** to begin freely without quests.', 'The Outlaw must enter town masked, or surrender to the sheriff and pay the fine.'],
      },
      rel: ['death', 'aging', 'save'],
    },
    {
      id: 'skills', cat: 'basics', tags: ['skills'],
      title: { tr: 'Yetenekler', en: 'Skills' },
      chip: { tr: 'Yetenekler', en: 'Skills' },
      q: {
        tr: ['yetenekler nasıl gelişir', 'seviye nasıl atlanır', 'güç yeteneği ne işe yarar', 'karizma nasıl artar'],
        en: ['how do skills improve', 'how do I level up', 'what does strength do', 'how to raise charisma'],
      },
      a: {
        tr: '7 yetenek vardır ve **yaptıkça gelişirler**: ateş ettikçe Nişancılık, avladıkça Avcılık, çalıştıkça Güç artar. Seviyelerini **Günlük → Yetenekler**’de görürsün.',
        en: 'There are 7 skills and they **improve by doing**: shooting raises Marksmanship, hunting raises Hunting, working raises Strength. See them in **Journal → Skills**.',
      },
      steps: {
        tr: [
          '**Nişancılık**: isabet ve Odak süresi.',
          '**Avcılık**: post kalitesi ve gizlilik; yüksek seviyede ek post çıkabilir.',
          '**Hayatta Kalma**: açlık ve susuzluk daha yavaş azalır, sıcağa ve soğuğa dayanırsın.',
          '**Binicilik**: atın hızı ve dayanıklılığı; yabani at evcilleştirme şansı.',
          '**Ticaret**: alım-satım fiyatları. **Karizma**: ilişkiler ve onur kazanımı. **Güç**: yakın dövüş ve iş verimi.',
        ],
        en: [
          '**Marksmanship**: accuracy and Focus duration.',
          '**Hunting**: pelt quality and stealth; at high levels you may get an extra pelt.',
          '**Survival**: hunger and thirst drop slower, and you handle heat and cold better.',
          '**Riding**: horse speed and stamina, plus your chance to tame wild horses.',
          '**Trade**: buying and selling prices. **Charisma**: relationships and honor gain. **Strength**: melee and job output.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.age30}}** başarımı: {{n:achievements.age30.perk}}.'],
        en: ['**{{n:achievements.age30}}** achievement: {{n:achievements.age30.perk}}.'],
      },
      rel: ['achievements', 'jobs', 'hunting'],
    },
    {
      id: 'achievements', cat: 'basics', tags: ['achievements', 'skills'],
      title: { tr: 'Başarımlar ve kazanımlar', en: 'Achievements and perks' },
      chip: { tr: 'Başarımlar', en: 'Achievements' },
      q: {
        tr: ['başarımlar ne işe yarar', 'kazanım nedir', 'perkler', 'tren bileti indirimi', 'dükkan indirimi nasıl alınır'],
        en: ['what do achievements do', 'what are perks', 'perks list', 'train ticket discount', 'how to get a shop discount'],
      },
      a: {
        tr: 'Oyunda 40’tan fazla başarım vardır ve çoğu **kalıcı bir kazanım** verir. Listeyi ve ilerlemeni **Günlük → Başarımlar**’da görürsün.',
        en: 'There are over 40 achievements and most give a **permanent perk**. See the list and your progress in **Journal → Achievements**.',
      },
      steps: {
        tr: [
          '**{{n:achievements.towns}}**: {{n:achievements.towns.perk}}.',
          '**{{n:achievements.rich}}**: {{n:achievements.rich.perk}}.',
          '**{{n:achievements.tycoon}}**: {{n:achievements.tycoon.perk}}.',
          '**{{n:achievements.hunt25}}**: {{n:achievements.hunt25.perk}}. **{{n:achievements.tamer}}**: {{n:achievements.tamer.perk}}.',
          '**{{n:achievements.saint}}**: {{n:achievements.saint.perk}}. **{{n:achievements.home}}**: {{n:achievements.home.perk}}.',
        ],
        en: [
          '**{{n:achievements.towns}}**: {{n:achievements.towns.perk}}.',
          '**{{n:achievements.rich}}**: {{n:achievements.rich.perk}}.',
          '**{{n:achievements.tycoon}}**: {{n:achievements.tycoon.perk}}.',
          '**{{n:achievements.hunt25}}**: {{n:achievements.hunt25.perk}}. **{{n:achievements.tamer}}**: {{n:achievements.tamer.perk}}.',
          '**{{n:achievements.saint}}**: {{n:achievements.saint.perk}}. **{{n:achievements.home}}**: {{n:achievements.home.perk}}.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.gold}}**: {{n:achievements.gold.perk}}. **{{n:achievements.fisher}}**: {{n:achievements.fisher.perk}}.'],
        en: ['**{{n:achievements.gold}}**: {{n:achievements.gold.perk}}. **{{n:achievements.fisher}}**: {{n:achievements.fisher.perk}}.'],
      },
      rel: ['skills', 'money', 'honor'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
