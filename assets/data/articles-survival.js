/* Frontier's End Wiki — makaleler: Hayatta kalma (ihtiyaçlar, sağlık, hava, ölüm) */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'hunger', cat: 'survival', tags: ['hunger', 'buy', 'cook'],
      title: { tr: 'Açlık ve yemek', en: 'Hunger and food' },
      chip: { tr: 'Açlık', en: 'Hunger' },
      q: {
        tr: ['açlık nasıl giderilir', 'yemek nereden alınır', 'ne yemeliyim', 'açlıktan ölüyorum', 'en doyurucu yemek'],
        en: ['how do I stop being hungry', 'where to buy food', 'what should I eat', 'I am starving', 'most filling food'],
      },
      a: {
        tr: 'Açlık oyun saatinde yaklaşık 2,8 azalır; sıfıra inerse saatte 2 can gider. Çarktan ya da [[T]] ile yemek ye; yiyecekleri genel mağaza, fırın ve kasaptan alabilir ya da avlayıp pişirebilirsin.',
        en: 'Hunger drops about 2.8 per game hour; at zero you lose 2 health an hour. Eat from the wheel or press [[T]]; buy food at general stores, bakeries and butchers, or hunt and cook your own.',
      },
      steps: {
        tr: [
          'Ucuz ve doyurucu: konserve fasulye (20¢), ekmek (10¢), kuru et (30¢).',
          'Saloon ve cantinada **Sıcak Yemek Ye** (50¢) hem doyurur hem ısıtır.',
          'Avladığın eti kampta ya da evindeki ocakta pişir: pişmiş biftek çok doyurur ve can verir.',
          'Koşarken açlık 1,5 kat, soğukta daha hızlı azalır.',
        ],
        en: [
          'Cheap and filling: canned beans (20¢), bread (10¢), jerky (30¢).',
          '**Eat a Hot Meal** (50¢) at a saloon or cantina fills you up and warms you.',
          'Cook meat you hunt at a camp or your home stove: a cooked steak is very filling and heals.',
          'Hunger drops 1.5× faster while running, and faster in the cold.',
        ],
      },
      tips: {
        tr: ['Çiğ et ve çiğ balık hasta edebilir; önce pişir.', '**Demir Mide** başarımı (60 öğün) yiyecekleri %20 daha doyurucu yapar.'],
        en: ['Raw meat and raw fish can make you sick; cook them first.', 'The **Iron Stomach** achievement (60 meals) makes food 20% more filling.'],
      },
      rel: ['cooking', 'thirst', 'health'],
    },
    {
      id: 'consumables', cat: 'survival', tags: ['hunger', 'focus', 'drunk', 'temperature'],
      title: { tr: 'Yiyecek, içecek ve tütünün etkileri', en: 'Effects of food, drink and tobacco' },
      chip: { tr: 'Eşya etkileri', en: 'Item effects' },
      q: {
        tr: ['kahve ne işe yarar', 'viski ne işe yarar', 'hangi yiyecek ne verir', 'puro ne işe yarar', 'çikolata ne yapar', 'dayanıklılık nasıl dolar'],
        en: ['what does coffee do', 'what does whiskey do', 'what does each food give', 'what does a cigar do', 'what does chocolate do', 'how to refill stamina'],
      },
      a: {
        tr: 'Yiyecekler açlığı, içecekler susuzluğu giderir; bazıları ek olarak can, dayanıklılık ya da **Odak** verir, uykuyu açar ya da seni ısıtır. Kahve ve tütün Odak için, sıcak yemek ve içki soğuk için iyidir.',
        en: 'Food eases hunger and drinks ease thirst; some also give health, stamina or **Focus**, keep you awake or warm you up. Coffee and tobacco are good for Focus; hot food and liquor help in the cold.',
      },
      steps: {
        tr: [
          '**Kahve** (20¢): biraz susuzluk, uyku ve Odak verir, ısıtır. **İthal kahve** (Saint Clement) çok daha fazla Odak verir.',
          '**Viski** (50¢): biraz can ve Odak verir, ısıtır ama sarhoş eder. **Bira** (10¢) susuzluğu giderir.',
          '**Güveç** (50¢): çok doyurur, can verir ve ısıtır. **Pişmiş biftek**: doyurur, can ve dayanıklılık verir.',
          '**Çikolata** ve **kremalı pasta** dayanıklılığı doldurur; **kuru et** hem doyurur hem dayanıklılık verir.',
          '**Tütün**, **sigara** ve **puro** Odak’ı doldurur; puro en güçlüsüdür.',
          '**Konserve şeftali** ve **elma** hem açlığa hem susuzluğa iyi gelir.',
        ],
        en: [
          '**Coffee** (20¢): a little thirst, sleep and Focus, and it warms you. **Imported coffee** (Saint Clement) gives much more Focus.',
          '**Whiskey** (50¢): some health and Focus and warmth, but it gets you drunk. **Beer** (10¢) quenches thirst.',
          '**Stew** (50¢): very filling, heals and warms. **Cooked steak**: filling, plus health and stamina.',
          '**Chocolate** and **cream cake** refill stamina; **jerky** fills you up and gives stamina.',
          '**Chewing tobacco**, **cigarettes** and **cigars** fill Focus; the cigar is the strongest.',
          '**Canned peaches** and **apples** help with both hunger and thirst.',
        ],
      },
      tips: {
        tr: ['Çikolata, kır çiçeği, mücevher, parfüm ve şampanya iyi hediyelerdir.', 'Sıcakta ya da susuzken içki içme.'],
        en: ['Chocolate, wildflowers, jewelry, perfume and champagne make good gifts.', 'Do not drink liquor in the heat or when thirsty.'],
      },
      rel: ['hunger', 'focus', 'drunk'],
    },
    {
      id: 'thirst', cat: 'survival', tags: ['thirst', 'canteen'],
      title: { tr: 'Susuzluk, su ve matara', en: 'Thirst, water and the canteen' },
      chip: { tr: 'Susuzluk', en: 'Thirst' },
      q: {
        tr: ['susuzluk nasıl giderilir', 'matara nasıl doldurulur', 'su nereden içilir', 'nehirden su içmek', 'susuzluktan ölüyorum'],
        en: ['how do I stop being thirsty', 'how to refill the canteen', 'where can I drink water', 'drinking from a river', 'dying of thirst'],
      },
      a: {
        tr: 'Susuzluk oyun saatinde 4 azalır ve sıfırda saatte 4 can götürür; açlıktan daha tehlikelidir. Bir **matara** al (genel mağaza, $1,20): 5 yudum alır, her yudum susuzluğu 32 doldurur. Kuyu, çeşme ve nehir başında dolar.',
        en: 'Thirst drops 4 per game hour and costs 4 health an hour at zero, so it is more dangerous than hunger. Get a **canteen** (general store, $1.20): it holds 5 sips, each restoring 32 thirst. Refill it at wells, fountains and rivers.',
      },
      steps: {
        tr: [
          'Mataradan içmek için çarkı ya da [[T]]’yi kullan.',
          'Kuyu ve çeşme temizdir; nehir ve gölden içmek susuzluğu 40 doldurur ama hastalık riski taşır (bataklıkta daha çok).',
          'Konserve şeftali ve sarsaparilla da susuzluğu giderir.',
          'Sıcakta susuzluk 2,5 kata kadar hızlanır; çöle mutlaka dolu matarayla çık.',
        ],
        en: [
          'Drink from the canteen with the wheel or [[T]].',
          'Wells and fountains are clean; drinking from rivers and lakes restores 40 thirst but may make you sick (more so in swamps).',
          'Canned peaches and sarsaparilla quench thirst too.',
          'Heat makes thirst drop up to 2.5× faster; never enter the desert without a full canteen.',
        ],
      },
      tips: {
        tr: ['Sıcakta ya da susuzken içki içme; viski susuzluğu pek gidermez.'],
        en: ['Avoid liquor in the heat or when thirsty; whiskey barely helps.'],
      },
      rel: ['temperature', 'hunger', 'sickness'],
    },
    {
      id: 'sleep', cat: 'survival', tags: ['sleep', 'hotel', 'camp', 'property'],
      title: { tr: 'Uyku ve uyuyacak yer', en: 'Sleep and where to rest' },
      chip: { tr: 'Uyku', en: 'Sleep' },
      q: {
        tr: ['nerede uyuyabilirim', 'nasıl uyunur', 'uykum geliyor', 'uykusuzluk', 'uykum neden bölündü'],
        en: ['where can I sleep', 'how do I sleep', 'I am tired', 'sleep deprivation', 'why was my sleep interrupted'],
      },
      a: {
        tr: 'Üç yerde uyuyabilirsin: **otelde** kiraladığın odada, **kendi evinde** ya da **kampta** (uyku tulumu gerekir). Uyku oyun saatinde 3,4 azalır; sıfırda saatte 3 can gider.',
        en: 'You can sleep in three places: a room you rent at a **hotel**, your **own home**, or at **camp** (you need a bedroll). Sleep drops 3.4 per game hour and you lose 3 health an hour at zero.',
      },
      steps: {
        tr: [
          'Otel: resepsiyondan oda kirala ($1, bir gün geçerli), merdivenden üst kata çık, odandaki yatakta uyu.',
          'Ev: satın aldığın mülkün, kurduğun evin ya da malikanenin yatağı. Burada elle kayıt da alırsın.',
          'Kamp: kasabadan uzakta [[B]]’yi basılı tut, kamp ateşinde **Uyu**’yu seç.',
          'Kahve ve koklatma tuzu uykuyu bir süre açar.',
        ],
        en: [
          'Hotel: rent a room at reception ($1, valid for a day), walk upstairs and sleep in your room’s bed.',
          'Home: the bed in a property you bought, a house you built, or the mansion. You can also save there.',
          'Camp: away from town hold [[B]], then choose **Sleep** at the campfire.',
          'Coffee and smelling salts keep you awake for a while.',
        ],
      },
      tips: {
        tr: ['Uyku 20’nin altındayken koşu dayanıklılığı hızlı biter; 10’un altında en yüksek dayanıklılığın %40 düşer.', 'Tehlike (sıcak, soğuk, açlık, susuzluk, can kaybı) uykunu böler; uyurken ölmezsin.'],
        en: ['Below 20 sleep your stamina drains fast while running; below 10 your max stamina drops 40%.', 'Danger (heat, cold, hunger, thirst, losing health) wakes you up; you never die in your sleep.'],
      },
      rel: ['hotel', 'camp', 'property'],
    },
    {
      id: 'camp', cat: 'survival', tags: ['camp', 'sleep', 'cook', 'save'],
      title: { tr: 'Kamp kurma', en: 'Making camp' },
      chip: { tr: 'Kamp', en: 'Camp' },
      q: {
        tr: ['kamp nasıl kurulur', 'kamp kuramıyorum', 'uyku tulumu nereden alınır', 'kamp ateşi nasıl yakılır'],
        en: ['how do I make camp', 'I cannot set up camp', 'where to buy a bedroll', 'how to light a campfire'],
      },
      a: {
        tr: 'Kamp için **Uyku Tulumu** gerekir (genel mağaza ya da kervan, $4,25). Kasabalardan uzakta [[B]]’yi **basılı tut**; ateş yanar ve kamp menüsü açılır.',
        en: 'You need a **Bedroll** to camp (general store or caravan, $4.25). Away from towns, **hold** [[B]]; a fire is lit and the camp menu opens.',
      },
      steps: {
        tr: [
          'Uyku tulumunu genel mağazadan ya da kervandan bir kez alırsın; kamp kurdukça bitmez.',
          'Kasabanın içinde kamp kurulmaz; biraz uzaklaş.',
          'Kamp ateşinin yanında [[E]] ile **Kamp Menüsü**: Uyu, Pişir ve Üret, Ateş Başında Bekle, Mızıka Çal, Oyunu Kaydet, Kampı Topla.',
          'Ateş seni en çok 26 °C’ye kadar ısıtır; soğuk gecelerde can kurtarır.',
          'Kamp tuşuna kısa basmak kamp kurmaz, büyük radarı açar.',
        ],
        en: [
          'You buy a bedroll once from a general store or caravan; it never wears out.',
          'You cannot camp inside a town; move away first.',
          'Press [[E]] by the fire for the **Camp Menu**: Sleep, Cook and Craft, Wait by the Fire, Play Harmonica, Save Game, Pack Up Camp.',
          'The fire warms you up to 26 °C at most, which saves lives on cold nights.',
          'Tapping the camp key does not make camp; it opens the big radar.',
        ],
      },
      tips: {
        tr: ['**Kamp Ateşi** başarımı (10 kamp) kampta pişen yemekleri %30 daha besleyici yapar.'],
        en: ['The **Campfire** achievement (10 camps) makes food cooked at camp 30% more nourishing.'],
      },
      rel: ['cooking', 'sleep', 'temperature'],
    },
    {
      id: 'cooking', cat: 'survival', tags: ['cook', 'craft', 'herb'],
      title: { tr: 'Pişirme ve üretim tarifleri', en: 'Cooking and crafting recipes' },
      chip: { tr: 'Tarifler', en: 'Recipes' },
      q: {
        tr: ['et nasıl pişirilir', 'panzehir nasıl yapılır', 'ok nasıl yapılır', 'bandaj nasıl yapılır', 'tarifler neler'],
        en: ['how do I cook meat', 'how to craft antidote', 'how to make arrows', 'how to make bandages', 'what recipes are there'],
      },
      a: {
        tr: 'Kamp ateşinde ya da evindeki ocakta **Pişir ve Üret**’i seç. Eti, balığı pişirir; topladığın bitkilerden ilaç, tüyden ok yaparsın.',
        en: 'Choose **Cook and Craft** at a campfire or your home stove. You can cook meat and fish, turn herbs into medicine and feathers into arrows.',
      },
      steps: {
        tr: [
          'Pişirme: çiğ av eti, iri et, kuş eti ve balık pişirilince çok daha doyurucu olur ve hastalık riski kalkar.',
          '**Güveç**: çiğ av eti + mısır + kekik.',
          '**Kahve**: nane + adaçayı.',
          '**Bitki Toniği**: ginseng + 2 civanperçemi. **Enerji Toniği**: ginseng + nane + ipekotu.',
          '**Bandaj**: civanperçemi + ipekotu. **Panzehir**: yılan derisi + 2 adaçayı.',
          '**Ok (5 adet)**: 3 tüy.',
        ],
        en: [
          'Cooking: raw game, big game, bird meat and fish become far more filling and no longer risk sickness.',
          '**Stew**: raw game meat + corn + oregano.',
          '**Coffee**: mint + sage.',
          '**Herbal Tonic**: ginseng + 2 yarrow. **Stamina Tonic**: ginseng + mint + milkweed.',
          '**Bandage**: yarrow + milkweed. **Antidote**: snakeskin + 2 sage.',
          '**Arrows (5)**: 3 feathers.',
        ],
      },
      tips: {
        tr: ['Tüyleri yaban hindisi ve tavuktan, yılan derisini çıngıraklı yılandan alırsın.'],
        en: ['Feathers come from wild turkeys and chickens; snakeskin from rattlesnakes.'],
      },
      rel: ['herbs', 'camp', 'poison'],
    },
    {
      id: 'health', cat: 'survival', tags: ['health', 'heal', 'medicine', 'doctor'],
      title: { tr: 'Can ve iyileşme', en: 'Health and healing' },
      chip: { tr: 'İyileşme', en: 'Healing' },
      q: {
        tr: ['canım dolmuyor', 'nasıl iyileşirim', 'can nasıl doldurulur', 'hızlı iyileşme', 'yaralandım ne yapmalıyım'],
        en: ['my health is not regenerating', 'how do I heal', 'how to restore health', 'quick heal', 'I am wounded what should I do'],
      },
      a: {
        tr: 'Canın kendiliğinden dolar ama yalnızca **açlık ve susuzluk 20’nin, uyku 10’un üstündeyken** ve hasta, zehirli ya da sıcaktan/soğuktan bitkin değilken. Hızlı iyileşmek için [[T]] ile ilaç kullan ya da doktora git.',
        en: 'Health refills on its own, but only while **hunger and thirst are above 20 and sleep above 10**, and you are not sick, poisoned or exhausted by heat or cold. To heal fast, use medicine with [[T]] or see a doctor.',
      },
      steps: {
        tr: [
          'Kendiliğinden dolma hızı oyun saatinde 7 can; açlık ve susuzluk 60’ın üstündeyse 13, uyurken daha fazla.',
          '**Sağlık İksiri** +60, **Bitki Toniği** +35, **Bandaj** +25 can verir.',
          'Doktor $2 karşılığında canını, hastalığını ve zehrini tamamen iyileştirir.',
          'Sıcak kaynaklarda dinlenmek de canını doldurur.',
        ],
        en: [
          'Natural regeneration is 7 health per game hour; 13 if hunger and thirst are above 60, and more while sleeping.',
          'A **Health Cure** gives +60, an **Herbal Tonic** +35, a **Bandage** +25.',
          'A doctor fully heals your health, sickness and poison for $2.',
          'Soaking in a hot spring also restores your health.',
        ],
      },
      tips: {
        tr: ['Canın %20’nin altındayken %15 yavaş yürürsün.', 'Her ölüm en yüksek canını 3 azaltır (en çok 30).'],
        en: ['Below 20% health you walk 15% slower.', 'Each death lowers your max health by 3 (up to 30 in total).'],
      },
      rel: ['medicine', 'doctor', 'death'],
    },
    {
      id: 'temperature', cat: 'survival', tags: ['temperature', 'clothing', 'camp'],
      title: { tr: 'Sıcak, soğuk ve giysiler', en: 'Heat, cold and clothing' },
      chip: { tr: 'Sıcak/soğuk', en: 'Heat/cold' },
      q: {
        tr: ['üşüyorum ne yapmalıyım', 'donuyorum', 'sıcak çarpması', 'çölde nasıl hayatta kalınır', 'karlı dağda ne giymeliyim', 'hangi palto daha sıcak'],
        en: ['I am freezing what do I do', 'how to stay warm', 'heatstroke', 'how to survive the desert', 'what to wear in the snow', 'warmest coat'],
      },
      a: {
        tr: 'Sağ üstteki derece **hissedilen sıcaklıktır**. Aşırı sıcak ya da soğuk hemen can götürmez; maruz kaldıkça vücudunda bir yük birikir ve üç aşamada ağırlaşır. Soğukta ateş, sıcak yemek ve kalın palto; sıcakta gölge, su ve ince giysi kurtarır.',
        en: 'The number in the top right is the **felt temperature**. Extreme heat or cold does not hurt at once; exposure builds up a load that worsens in three stages. In the cold, use fire, hot food and a thick coat; in the heat, use shade, water and light clothes.',
      },
      steps: {
        tr: [
          '1. aşama (Üşüyorsun / Sıcak basıyor): soğukta açlık, sıcakta susuzluk hızlanır. Can gitmez.',
          '2. aşama (Titriyorsun / Sıcaktan bitkinsin): %12 yavaş yürürsün, nişan dağılır, can dolmaz.',
          '3. aşama (Donuyorsun / Sıcak çarpması): maruz kaldıkça saatte birkaç can gider.',
          'Soğuğa: kürk manto (+18 °C), kuzu postu ceket (+11 °C), uzun palto (+5 °C), panço (+3 °C, yağmurda ıslanmazsın).',
          'Sıcağa: keten gömlek (−5 °C), geniş kenarlı şapka (−2 °C), sarsaparilla (3 saat serinletir).',
          'Bina içi yükü hızla azaltır; içerisi yaklaşık 21 °C’dir.',
        ],
        en: [
          'Stage 1 (Chilly / Feeling the heat): hunger rises faster in the cold, thirst in the heat. No health loss.',
          'Stage 2 (Shivering / Heat exhaustion): you walk 12% slower, your aim spreads and health stops regenerating.',
          'Stage 3 (Freezing / Heatstroke): you lose a few health per hour as long as the exposure lasts.',
          'For the cold: fur coat (+18 °C), sheepskin coat (+11 °C), duster (+5 °C), poncho (+3 °C, keeps the rain off).',
          'For the heat: linen shirt (−5 °C), wide-brimmed hat (−2 °C), sarsaparilla (cools you for 3 hours).',
          'Going indoors clears the load fast; inside it is about 21 °C.',
        ],
      },
      tips: {
        tr: ['Giysileri terzi, kürk ve post ceketleri tuzakçılar da satar.', 'Hayatta Kalma yeteneği ve **Çöl Faresi** / **Kutup Kurdu** başarımları dayanımını artırır.'],
        en: ['Tailors sell clothes; trappers also sell fur and sheepskin coats.', 'The Survival skill and the **Desert Rat** / **Polar Wolf** achievements raise your tolerance.'],
      },
      rel: ['clothes', 'camp', 'faint'],
    },
    {
      id: 'poison', cat: 'survival', tags: ['poison', 'medicine', 'predator'],
      title: { tr: 'Yılan sokması ve zehir', en: 'Snakebites and poison' },
      chip: { tr: 'Zehir', en: 'Poison' },
      q: {
        tr: ['yılan soktu ne yapmalıyım', 'zehir nasıl geçer', 'panzehir nereden alınır', 'zehirlendim', 'yılan yağı ne işe yarar'],
        en: ['a snake bit me what do I do', 'how do I cure poison', 'where to buy antidote', 'I am poisoned', 'what does snake oil do'],
      },
      a: {
        tr: 'Çıngıraklı yılan seni yaklaşık **6 oyun saati** zehirler. Zehir tek başına canını %15’in altına indirmez ama bu sürede can dolmaz. **Panzehir** ya da **Yılan Yağı** zehri hemen söker; doktor da tedavi eder.',
        en: 'A rattlesnake poisons you for about **6 game hours**. Poison alone will not drop you below 15% health, but your health will not refill meanwhile. An **Antidote** or **Snake Oil** clears it at once; a doctor can treat it too.',
      },
      steps: {
        tr: [
          'Zehirliyken [[T]] önce panzehiri kullanır.',
          'Panzehir ($1,50) doktor, eczane ve münzevide; yılan yağı ($1) daha birçok yerde satılır.',
          'Kendin de yapabilirsin: yılan derisi + 2 adaçayı.',
          'Laudanum 3 saat boyunca zehir dahil her hasarı %40 azaltır.',
        ],
        en: [
          'While poisoned, [[T]] uses an antidote first.',
          'Antidote ($1.50) is sold by doctors, pharmacies and the hermit; snake oil ($1) in many more places.',
          'You can craft it yourself: snakeskin + 2 sage.',
          'Laudanum reduces all damage, poison included, by 40% for 3 hours.',
        ],
      },
      tips: {
        tr: ['Asıl tehlike zehirliyken yeni bir sokma ya da yara almaktır; her yeni sokma zehri 2 saat uzatır.', 'At sırtındayken yılan seni zehirleyemez.'],
        en: ['The real danger is a new bite or wound while poisoned; each extra bite adds 2 hours.', 'Snakes cannot poison you while you are on horseback.'],
      },
      rel: ['medicine', 'predators', 'cooking'],
    },
    {
      id: 'sickness', cat: 'survival', tags: ['sickness', 'medicine', 'doctor'],
      title: { tr: 'Hastalık', en: 'Sickness' },
      chip: { tr: 'Hastalık', en: 'Sickness' },
      q: {
        tr: ['hasta oldum', 'hastalık nasıl geçer', 'kinin ne işe yarar', 'neden hastalandım', 'ateşim var'],
        en: ['I got sick', 'how to cure sickness', 'what does quinine do', 'why did I get sick', 'I have a fever'],
      },
      a: {
        tr: 'Çiğ et ya da balık yemek, nehir ve gölden su içmek ve ileri yaş seni hasta edebilir. Hastayken saatte 2,5 can gider ve can dolmaz. **Kinin** iyileştirir ve bir gün boyunca seni korur.',
        en: 'Eating raw meat or fish, drinking from rivers and lakes, and old age can make you sick. While sick you lose 2.5 health an hour and do not regenerate. **Quinine** cures it and protects you for a day.',
      },
      steps: {
        tr: [
          'Kinin ($1,20) doktor, eczane, kervan ve münzevide satılır.',
          'Bitki Toniği ve Yılan Yağı da hastalığı geçirir; doktor ve sıcak kaynak da iyileştirir.',
          'Kirli sudan hastalık yaklaşık 6, çiğ etten 8 oyun saati sürer.',
          'Korunmak için eti pişir, kuyu ve çeşmeden su iç.',
        ],
        en: [
          'Quinine ($1.20) is sold by doctors, pharmacies, caravans and the hermit.',
          'Herbal Tonic and Snake Oil cure it too; doctors and hot springs heal it as well.',
          'Sickness from dirty water lasts about 6 game hours, from raw meat about 8.',
          'To avoid it, cook your meat and drink from wells and fountains.',
        ],
      },
      tips: {
        tr: ['62 yaşından sonra her doğum gününde hastalanma ihtimali artar.'],
        en: ['After age 62 each birthday brings a growing chance of falling ill.'],
      },
      rel: ['medicine', 'thirst', 'cooking'],
    },
    {
      id: 'faint', cat: 'survival', tags: ['faint', 'health', 'death'],
      title: { tr: 'Bayılma', en: 'Fainting' },
      chip: { tr: 'Bayılma', en: 'Fainting' },
      q: {
        tr: ['bayıldım ne oldu', 'neden bayıldım', 'bayılınca ne olur', 'yükümü kaybettim'],
        en: ['I fainted what happened', 'why did I pass out', 'what happens when I faint', 'I lost what I was carrying'],
      },
      a: {
        tr: 'Sıcak, soğuk, açlık, susuzluk, uykusuzluk ya da hastalık canını %10’a indirince ölmeden önce **bayılırsın**. 2–4 saat sonra olduğun yerde kendine gelirsin ya da yoldan geçen biri seni en yakın doktora götürür ($3).',
        en: 'When heat, cold, hunger, thirst, lack of sleep or sickness drops you to 10% health, you **faint** before dying. You wake where you fell 2–4 hours later, or a passer-by takes you to the nearest doctor ($3).',
      },
      steps: {
        tr: [
          'Kendine gelince canın en az %15’tir; önce sebebi gider (su iç, ısın, ye).',
          'Kendine geldikten sonraki 12 oyun saatinde can yine biterse bu kez bayılmadan ölürsün.',
          'Aranırken kimse seni doktora götürmez.',
          'Omzundaki yük olduğun yere düşer, kement elinden kayar.',
        ],
        en: [
          'You wake with at least 15% health; fix the cause first (drink, warm up, eat).',
          'If your health runs out again within 12 game hours, you die without fainting.',
          'Nobody takes you to a doctor while you are wanted.',
          'Whatever you were carrying drops where you fell and your lasso slips away.',
        ],
      },
      tips: {
        tr: ['Kurşun, hayvan saldırısı, düşme ve zehir bayıltmaz; doğrudan can götürür.'],
        en: ['Bullets, animal attacks, falls and poison do not make you faint; they just hurt.'],
      },
      rel: ['death', 'temperature', 'thirst'],
    },
    {
      id: 'death', cat: 'survival', tags: ['death', 'doctor', 'difficulty', 'money'],
      title: { tr: 'Ölüm ve doktor', en: 'Death and the doctor' },
      chip: { tr: 'Ölüm', en: 'Death' },
      q: {
        tr: ['ölünce ne olur', 'öldüm param gitti', 'ölünce kayıt silinir mi', 'ölüm ekranı', 'paramı nasıl korurum'],
        en: ['what happens when I die', 'I died and lost money', 'does dying delete my save', 'death screen', 'how do I protect my money'],
      },
      a: {
        tr: '**Hikâye** zorluğunda ölünce bir doktor seni kurtarır: cebindeki paranın dörtte biri gider (bankadaki güvende), en yüksek canın kalıcı olarak 3 azalır ve 18 saat sonra %60 canla uyanırsın. **Tek Hayat**’ta ölüm kalıcıdır, kayıt silinir.',
        en: 'On **Story** difficulty a doctor saves you: you lose a quarter of the cash in your pocket (bank money is safe), your max health drops by 3 for good, and you wake 18 hours later at 60% health. On **One Life** death is permanent and the save is deleted.',
      },
      steps: {
        tr: [
          'Aranıyorsan aranman biter ama başındaki ödül kalır.',
          'Zehir ve hastalık geçer; açlık, susuzluk ve uyku bir miktar dolar.',
          'Omzundaki yük öldüğün yerde kalır.',
          'Ölüm ekranı sebebi, seni öldüreni, son iki dakikada aldığın hasarı ve bir öğüt gösterir.',
        ],
        en: [
          'If you were wanted, the chase ends but your bounty stays.',
          'Poison and sickness are cured; hunger, thirst and sleep are partly restored.',
          'Anything on your shoulder stays where you died.',
          'The death screen shows the cause, your killer, the damage you took in the last two minutes and a tip.',
        ],
      },
      tips: {
        tr: ['Paranı bankaya yatır: ölünce kaybolmaz.'],
        en: ['Keep your money in the bank: it is safe when you die.'],
      },
      rel: ['bank', 'faint', 'newgame'],
    },
    {
      id: 'doctor', cat: 'survival', tags: ['doctor', 'heal', 'medicine', 'price'],
      title: { tr: 'Doktor ve eczane', en: 'Doctors and pharmacies' },
      chip: { tr: 'Doktor', en: 'Doctor' },
      q: {
        tr: ['en yakın doktor nerede', 'doktor ne kadar', 'eczane ne satar', 'tedavi nasıl olunur'],
        en: ['where is the nearest doctor', 'how much does a doctor cost', 'what does the pharmacy sell', 'how do I get treatment'],
      },
      a: {
        tr: 'Doktorda **Tedavi Ol** ($2) canını, hastalığını ve zehrini tamamen iyileştirir (30 oyun dakikası). Doktor ve eczane ilaç da satar; eczane ayrıca sarsaparilla ve tütün bulundurur.',
        en: 'At a doctor, **Get Treatment** ($2) fully heals your health, sickness and poison (30 game minutes). Doctors and pharmacies also sell medicine; pharmacies stock sarsaparilla and tobacco too.',
      },
      steps: {
        tr: [
          'Haritayı aç ([[M]]), açıklamada **Doktor**’a tıkla: en yakını işaretlenir.',
          'Tehlike kartı, çantanda ilaç yoksa en yakın doktorun yönünü ve uzaklığını yazar.',
          'Doktor ve eczane şifalı bitki de satın alır.',
        ],
        en: [
          'Open the map ([[M]]) and click **Doctor** in the legend: the nearest one is marked.',
          'If you carry no cure, the danger card names the nearest doctor with direction and distance.',
          'Doctors and pharmacies also buy medicinal herbs.',
        ],
      },
      tips: {
        tr: ['**Aziz** başarımı (onur 80) doktoru yarı fiyata indirir.'],
        en: ['The **Saint** achievement (honor 80) halves doctor prices.'],
      },
      rel: ['medicine', 'health', 'map'],
    },
    {
      id: 'medicine', cat: 'survival', tags: ['medicine', 'buy', 'heal'],
      title: { tr: 'İlaçlar ve etkileri', en: 'Medicines and their effects' },
      chip: { tr: 'İlaçlar', en: 'Medicines' },
      q: {
        tr: ['hangi ilaç ne işe yarar', 'laudanum ne yapar', 'kas merhemi', 'koklatma tuzu', 'ilaç listesi'],
        en: ['what does each medicine do', 'what does laudanum do', 'liniment', 'smelling salts', 'medicine list'],
      },
      a: {
        tr: 'İlaçlar doktor ve eczanede, bir kısmı genel mağaza, seyyar satıcı, kervan ve münzevide satılır. Süreli etkiler HUD’da simgeyle görünür.',
        en: 'Medicines are sold at doctors and pharmacies, some also at general stores, peddlers, caravans and the hermit. Timed effects show as icons on the HUD.',
      },
      steps: {
        tr: [
          '**Sağlık İksiri** ($1): +60 can. **Bandaj** (20¢): +25 can. **Bitki Toniği** (70¢): +35 can, hastalığı geçirir.',
          '**Enerji Toniği** (70¢): dayanıklılığı doldurur.',
          '**Panzehir** ($1,50) ve **Yılan Yağı** ($1): zehri söker; yılan yağı hastalığı da geçirir, Odak verir.',
          '**Kinin** ($1,20): hastalığı geçirir, bir gün korur.',
          '**Laudanum** ($1,50): 3 saat %40 az hasar alırsın; başını döndürür, uykunu getirir.',
          '**Kas Merhemi** (85¢): 2 saat koşarken dayanıklılık geç tükenir. **Koklatma Tuzu** (60¢): sarhoşluğu ve uykuyu dağıtır. **Sarsaparilla** (20¢): susuzluğu giderir, sıcakta serinletir.',
        ],
        en: [
          '**Health Cure** ($1): +60 health. **Bandage** (20¢): +25 health. **Herbal Tonic** (70¢): +35 health and cures sickness.',
          '**Stamina Tonic** (70¢): refills stamina.',
          '**Antidote** ($1.50) and **Snake Oil** ($1): clear poison; snake oil also cures sickness and fills Focus.',
          '**Quinine** ($1.20): cures sickness and protects you for a day.',
          '**Laudanum** ($1.50): 40% less damage for 3 hours, but it makes you dizzy and sleepy.',
          '**Liniment** (85¢): stamina lasts much longer while running for 2 hours. **Smelling Salts** (60¢): clear drunkenness and drowsiness. **Sarsaparilla** (20¢): quenches thirst and cools you in the heat.',
        ],
      },
      tips: {
        tr: ['Bandaj, bitki toniği, enerji toniği ve panzehiri bitkilerden kendin yapabilirsin.'],
        en: ['You can craft bandages, herbal tonic, stamina tonic and antidote from herbs.'],
      },
      rel: ['doctor', 'cooking', 'poison'],
    },
    {
      id: 'drunk', cat: 'survival', tags: ['drunk', 'medicine'],
      title: { tr: 'Sarhoşluk ve içki', en: 'Drinking and drunkenness' },
      chip: { tr: 'Sarhoşluk', en: 'Drunk' },
      q: {
        tr: ['sarhoşluk nasıl geçer', 'ekran neden çift görüyor', 'ayılmak için ne yapmalıyım', 'viski ne işe yarar'],
        en: ['how do I sober up', 'why is my screen seeing double', 'how to get sober', 'what does whiskey do'],
      },
      a: {
        tr: 'Bira, viski, şampanya ve konyak seni sarhoş eder: görüntü çift görünür ve sallanır. **Koklatma Tuzu** sarhoşluğu anında giderir; yoksa zamanla geçer.',
        en: 'Beer, whiskey, champagne and cognac make you drunk: the view doubles and sways. **Smelling Salts** sober you up instantly; otherwise it wears off with time.',
      },
      steps: {
        tr: [
          'Viski içini ısıtır ve biraz can ve Odak verir, ama susuzluğu pek gidermez.',
          'Çok sarhoşken uykun daha hızlı azalır, kasabalılar laf atar.',
          'Sarhoşken düelloya girme.',
        ],
        en: [
          'Whiskey warms you and gives a little health and Focus, but barely quenches thirst.',
          'When very drunk your sleep drains faster and townsfolk make remarks.',
          'Never accept a duel while drunk.',
        ],
      },
      tips: {
        tr: ['Koklatma tuzu doktor ve eczanede satılır.'],
        en: ['Smelling salts are sold by doctors and pharmacies.'],
      },
      rel: ['medicine', 'gambling', 'social'],
    },
    {
      id: 'clean', cat: 'survival', tags: ['clean', 'barber', 'hotel'],
      title: { tr: 'Temizlik, banyo ve berber', en: 'Cleanliness, baths and the barber' },
      chip: { tr: 'Temizlik', en: 'Bathing' },
      q: {
        tr: ['nasıl yıkanırım', 'banyo nerede', 'kirliyim', 'temizlik nasıl artar', 'saç nasıl kestirilir', 'sakal nasıl değiştirilir'],
        en: ['how do I wash', 'where can I take a bath', 'I am dirty', 'how to raise cleanliness', 'how to get a haircut', 'how to change my beard'],
      },
      a: {
        tr: 'Otelde ya da çamaşırhanede **Sıcak Banyo** (50¢) seni tertemiz yapar ve ısıtır. Binalardaki lavaboda el yüz yıkamak temizliği biraz artırır. Saç ve sakal için **berbere** git (30¢).',
        en: 'A **Hot Bath** (50¢) at a hotel or laundry gets you spotless and warm. Washing up at a basin indoors helps a little. For hair and beard, visit the **barber** (30¢).',
      },
      steps: {
        tr: [
          'Çiftlik evi ve malikanede kendi küvetin olur.',
          'Sıcak kaynaklar da seni temizler.',
          'Berberde saç stilini, sakal ve bıyığını değiştirirsin.',
        ],
        en: [
          'Farmhouses and the mansion have their own tub.',
          'Hot springs get you clean too.',
          'At the barber you can change your hairstyle, beard and mustache.',
        ],
      },
      tips: {
        tr: ['Kirliyken insanlar laf atar, sevdiğin kişi sohbetten hoşlanmaz; temizlik 30’un altındayken kulübe alınmazsın.'],
        en: ['When dirty people tease you, your sweetheart enjoys your talks less, and below 30 cleanliness the club turns you away.'],
      },
      rel: ['hotel', 'romance', 'club'],
    },
    {
      id: 'aging', cat: 'survival', tags: ['aging', 'time'],
      title: { tr: 'Yaşlanma', en: 'Aging' },
      chip: { tr: 'Yaşlanma', en: 'Aging' },
      q: {
        tr: ['karakter yaşlanıyor mu', 'yaş sınırı var mı', 'yaşlanınca ne olur', 'yaşlanma hızı nasıl değişir'],
        en: ['does my character age', 'is there an age limit', 'what happens as I get older', 'how to change aging pace'],
      },
      a: {
        tr: 'Hayata 18 yaşında başlarsın ve yaşlanırsın; yaş sınırı yoktur, oyun ancak ölünce biter. 30’lardan sonra dayanıklılık, 50’den sonra en yüksek can yavaş yavaş azalır.',
        en: 'You start at 18 and grow older; there is no age limit and the game only ends when you die. After your early 30s stamina, and after 50 max health, slowly decline.',
      },
      steps: {
        tr: [
          '32’den sonra en yüksek dayanıklılık her yıl biraz düşer.',
          '42’den sonra saçın ağarır; 50’den sonra en yüksek can azalır.',
          '60’tan sonra yürüyüşün yavaşlar, 62’den sonra hastalanma ihtimali artar.',
          'Bir yılın uzunluğu yeni hayatta seçilen **yaşlanma hızına** bağlıdır.',
        ],
        en: [
          'After 32 your max stamina drops a little each year.',
          'After 42 your hair turns gray; after 50 your max health declines.',
          'After 60 you walk slower; after 62 your chance of illness rises.',
          'How long a year lasts depends on the **aging pace** chosen for the life.',
        ],
      },
      tips: {
        tr: ['30, 50, 65 ve 80 yaşlarında başarımlar ve kazanımlar açılır.'],
        en: ['Ages 30, 50, 65 and 80 unlock achievements and perks.'],
      },
      rel: ['time', 'newgame', 'achievements'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
