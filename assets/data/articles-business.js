/* Frontier's End Wiki — makaleler: İşletme, tekel, banka, petrol, nüfuz */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'business', cat: 'business', tags: ['business', 'buy', 'money', 'earn'],
      title: { tr: 'İşletme satın alma ve yönetme', en: 'Buying and running a business' },
      chip: { tr: 'İşletme', en: 'Business' },
      q: {
        tr: ['dükkan nasıl satın alınır', 'işletme nasıl alınır', 'işletme geliri nasıl toplanır', 'hangi dükkanlar satılık', 'kendi dükkanım'],
        en: ['how do I buy a shop', 'how to buy a business', 'how to collect business income', 'which shops are for sale', 'owning a store'],
      },
      a: {
        tr: 'Kasabalardaki dükkânların bir kısmı satılıktır. Tezgâhta sahibine ya da tapu dairesi / ilçe binasında **Satılık İşletmeler ve Arsalar**’dan alırsın. Eski sahibi işletmeci olarak kalır ve işi yürütür; gelir her gün kasada birikir.',
        en: 'Some shops in each town are for sale. Buy one from the owner at the counter, or via **Businesses and Lots for Sale** at the land office or county office. The old owner stays on as manager and runs it; income piles up in the till every day.',
      },
      steps: {
        tr: [
          'Satılık türler: fırın, berber, çamaşırhane, kasap, terzi, değirmen, demirci, eczane, cantina, ahır, genel mağaza, saloon, otel, bira imalathanesi, kumarhane.',
          'Kasadaki parayı uğrayıp alabilir ya da %10 kesintiyle her gün bankana aktarılmasını seçebilirsin.',
          'Çoğu işletme mal tüketir; stok biterse gelir çok düşer.',
          '**Günlük → İşlerim** bütün işletmelerini, stoklarını ve kasalarını gösterir.',
        ],
        en: [
          'Types for sale: bakery, barber, laundry, butcher, tailor, mill, blacksmith, pharmacy, cantina, stable, general store, saloon, hotel, brewery, gambling hall.',
          'Collect the till in person, or have it sent to your bank daily for a 10% fee.',
          'Most businesses use up goods; if stock runs out, income drops sharply.',
          '**Journal → Business** lists all your businesses, their stock and tills.',
        ],
      },
      tips: {
        tr: ['İşletmeci dürüst, çalışkan ya da şüpheli olabilir.', 'Haritada işletmelerin altın renkle işaretlenir.'],
        en: ['A manager can be honest, hardworking or shady.', 'Your businesses are marked in gold on the map.'],
      },
      rel: ['supply', 'build', 'monopoly'],
    },
    {
      id: 'supply', cat: 'business', tags: ['supply', 'hauler', 'business', 'wagon'],
      title: { tr: 'Mal taşıma, stok ve nakliyeciler', en: 'Supplies, stock and haulers' },
      chip: { tr: 'Stok', en: 'Supplies' },
      q: {
        tr: ['işletmenin stoğu bitti', 'mal nereden alınır', 'sandık nasıl taşınır', 'nakliyeci nasıl tutulur', 'işletmem para kazanmıyor'],
        en: ['my business is out of stock', 'where to buy goods', 'how to carry crates', 'how to hire a hauler', 'my business is not making money'],
      },
      a: {
        tr: 'İşletmeler erzak, içki, un, arpa, yem, et, kumaş, demir ya da ilaç tüketir. Stok “dolu / azalıyor / boş” diye görünür; boşalınca işletme gelirinin yalnız %30’unu kazanır. Malı sen taşıyabilir ya da bir **nakliyeci** tutabilirsin.',
        en: 'Businesses use up provisions, liquor, flour, barley, feed, meat, cloth, iron or medicine. Stock shows as “full / low / empty”; when empty a business earns only 30% of its income. Haul goods yourself or hire a **hauler**.',
      },
      steps: {
        tr: [
          'Malı toptancı ambarından, limandan, değirmenden, imalathaneden, madenden ya da çiftlikten sandıkla al.',
          'Omzunda 1, atında 2, **yük arabasında** 8 sandık taşırsın.',
          'Kasaba avladığın hayvanın leşini de götürebilirsin.',
          'Ahır ya da postaneden en fazla 4 nakliyeci tut (peşin $10 + günlük ücret); stoğu azalan işletmeye malı kendileri götürür.',
        ],
        en: [
          'Buy crates at the wholesale warehouse, docks, mill, brewery, mine or farm.',
          'You carry 1 crate on your shoulder, 2 on your horse and 8 in a **freight wagon**.',
          'You can also bring carcasses from your hunts to a butcher shop.',
          'Hire up to 4 haulers at a stable or post office ($10 up front plus a daily wage); they deliver to whichever business runs low.',
        ],
      },
      tips: {
        tr: ['Güvenilir nakliyeci fırtınada da yola çıkar, hızlı olan sık sefer yapar, korkak olan ucuzdur ama haydut görünce kaçar.', 'Kasaba dışında haydut baskını olursa yer haritada kırmızı görünür; yetişirsen yükü kurtarırsın.', 'Değirmen ya da imalathane senin olursa malı ucuza alırsın.'],
        en: ['Reliable haulers travel even in storms, fast ones make more trips, cowardly ones are cheap but drop the load and flee from bandits.', 'If bandits raid a hauler outside town, the spot turns red on the map; get there in time to save the cargo.', 'Owning a mill or brewery makes their goods cheaper for you.'],
      },
      rel: ['business', 'wagon', 'monopoly'],
    },
    {
      id: 'build', cat: 'business', tags: ['lot', 'business', 'buy'],
      title: { tr: 'Arsaya işletme kurma ve yapı tasarımları', en: 'Building on a lot and building designs' },
      chip: { tr: 'Arsa', en: 'Lots' },
      q: {
        tr: ['arsa nasıl alınır', 'boş arsaya ne kurulur', 'yeni işletme nasıl kurulur', 'lüks tasarım ne işe yarar'],
        en: ['how do I buy a lot', 'what can I build on a lot', 'how to build a new business', 'what does the luxury design do'],
      },
      a: {
        tr: 'Kasabalarda çitle çevrili, tabelalı **satılık arsalar** vardır (haritada “$”). Arsayı alınca ona sığan herhangi bir işletmeyi **3 günde** yaptırırsın; bina gerçekten kasabada yükselir.',
        en: 'Towns have fenced **lots for sale** with a sign (shown as “$” on the map). Once you own one, you can have any business that fits built there in **3 days**; the building actually rises in town.',
      },
      steps: {
        tr: [
          'Önce türü, sonra dört tasarımdan birini seç.',
          '**Ekonomik** (×0,75 fiyat), **Normal**, **Gelişmiş** (×1,4) ve **Lüks** (×2).',
          'Tasarım yalnızca görünümü ve fiyatı değiştirir; gelir ve süre aynıdır.',
          'Menü her tasarımın dışını ve içini önizler.',
        ],
        en: [
          'Choose the type first, then one of four designs.',
          '**Budget** (×0.75 price), **Normal**, **Fine** (×1.4) and **Luxury** (×2).',
          'The design only changes looks and price; income and build time stay the same.',
          'The menu previews each design inside and out.',
        ],
      },
      tips: {
        tr: ['Banka kurmak için gelişmiş bir kasabanın büyük arsası gerekir.'],
        en: ['A bank needs a large lot in a thriving town or bigger.'],
      },
      rel: ['business', 'ownbank', 'homestead'],
    },
    {
      id: 'monopoly', cat: 'business', tags: ['monopoly', 'business', 'earn'],
      title: { tr: 'Tekel ve pazar payı', en: 'Monopoly and market share' },
      chip: { tr: 'Tekel', en: 'Monopoly' },
      q: {
        tr: ['tekel nasıl olunur', 'pazar payı nedir', 'satmak istemeyen dükkanı nasıl alırım', 'rakip işletmeyi satın alma', 'ticaret odası cezası'],
        en: ['how do I get a monopoly', 'what is market share', 'how to buy a shop that is not for sale', 'buying out a rival', 'trade chamber fine'],
      },
      a: {
        tr: 'İşletmeler sektörlere ayrılır (gıda, içki ve eğlence, hizmet, demir ve ahır, konaklama, bankacılık, petrol). Bir sektördeki payın %25’i geçince **güçlü**, %50’yi geçince **hakim**, %75’i geçince **tekel** olursun; o sektördeki işletmelerin daha çok kazanır.',
        en: 'Businesses fall into sectors (food, drink and entertainment, services, iron and stables, lodging, banking, oil). Pass 25% of a sector to become **Strong**, 50% for **Dominant** and 75% for a **Monopoly**; your businesses in that sector earn more.',
      },
      steps: {
        tr: [
          'Kazanç artışı: güçlü %5, hakim %15, tekel %30. Toptan mal da ucuzlar.',
          'Satmak istemeyen işletmeye tezgâhta ya da ilçe binasının **Rakipler** sekmesinde teklif yap; hakimiyetin arttıkça bedel düşer.',
          'Hakim olduğun pazarda zor duruma düşen rakipler ucuza satılır.',
          '**Günlük → İşlerim → Pazar Payların** her sektördeki payını gösterir.',
        ],
        en: [
          'Income bonus: Strong +5%, Dominant +15%, Monopoly +30%. Wholesale goods get cheaper too.',
          'Make an offer on a business that is not for sale at its counter or in the county office’s **Rivals** tab; the price drops as your dominance grows.',
          'In markets you dominate, struggling rivals go up for sale cheaply.',
          '**Journal → Business → Your Market Shares** shows your share in every sector.',
        ],
      },
      tips: {
        tr: ['Halk tekelcileri sevmez: ilk tekelde onurun düşer.', '1905’ten sonra ticaret odası tekelleri zaman zaman soruşturup ceza keser.'],
        en: ['People dislike monopolists: your first monopoly costs honor.', 'After 1905 the trade chamber sometimes investigates monopolies and fines them.'],
      },
      rel: ['business', 'influence', 'oil'],
    },
    {
      id: 'ownbank', cat: 'business', tags: ['ownbank', 'bank', 'business'],
      title: { tr: 'Kendi bankanı kurmak', en: 'Owning a bank' },
      chip: { tr: 'Kendi bankan', en: 'Own bank' },
      q: {
        tr: ['banka nasıl kurulur', 'kasabanın bankasını satın almak', 'banka paniği', 'bankam battı', 'mevduat faizi'],
        en: ['how do I start a bank', 'buy the town bank', 'bank run', 'my bank failed', 'deposit interest rate'],
      },
      a: {
        tr: 'Gelişmiş bir kasabanın (ya da daha büyüğünün) büyük arsasına banka kurabilir ya da kasabanın bankasını teklifle alabilirsin. İkisi de **onur 10 ve üstü** ister. Tezgâhtaki **Bankayı Yönet** menüsünden faizi, kredi politikasını ve bekçiyi seçersin.',
        en: 'Build a bank on a large lot in a thriving town (or bigger), or buy the town’s bank with an offer. Both need **honor 10 or more**. The **Run the Bank** menu at the counter sets interest, loan policy and the guard.',
      },
      steps: {
        tr: [
          'Mevduat faizi %1, %2 ya da %3,5: düşük faiz kârı büyütür ama mevduat kaçar.',
          'Kredi politikası: Temkinli (az batık), Dengeli ya da Cesur (yüksek faiz, çok batık).',
          'Silahlı bekçi soygunları zorlaştırır.',
          'Kâr kasada birikir ya da hesabına aktarılır; zarar sermayeden düşer.',
        ],
        en: [
          'Deposit interest of 1%, 2% or 3.5%: low rates boost profit but depositors leave.',
          'Loan policy: Cautious (few bad loans), Balanced, or Bold (high interest, many bad loans).',
          'An armed guard makes robberies harder.',
          'Profit collects in the vault or goes to your account; losses come out of capital.',
        ],
      },
      tips: {
        tr: ['Panik çıkar ve kasa yetmezse **iki gün** içinde tezgâha gidip sermaye ekle; yoksa banka batar ve onurun düşer.'],
        en: ['If a bank run hits and the vault is short, add capital at the counter within **two days** or the bank fails and you lose honor.'],
      },
      rel: ['bank', 'build', 'monopoly'],
    },
    {
      id: 'oil', cat: 'business', tags: ['oil', 'business', 'earn'],
      title: { tr: 'Petrol', en: 'Oil' },
      chip: { tr: 'Petrol', en: 'Oil' },
      q: {
        tr: ['petrol nasıl bulunur', 'sondaj kulesi nasıl kurulur', 'petrol sahası nerede', 'rafineri nasıl kurulur', 'kara altın'],
        en: ['how do I find oil', 'how to build an oil derrick', 'where are the oil fields', 'how to build a refinery', 'black gold'],
      },
      a: {
        tr: 'Dünyada altı petrol sahası vardır; kasabalardan uzak düz ovalarda toprakta **kara, yağlı sızıntılar** görürsün. 1900’den sonra araziyi sızıntının başından ya da ilçe binasının **Petrol** sekmesinden alır, **sondaj kulesi** ($450) kurarsın.',
        en: 'There are six oil fields, on flat plains far from towns, marked by **black, oily seeps** in the ground. After 1900 buy the land at the seep or in the county office’s **Oil** tab, then build a **derrick** ($450).',
      },
      steps: {
        tr: [
          'Kule üç günde açılır; kuyu kuru çıkabilir ya da fışkırabilir.',
          'Petrol her gün satılır, para hesabına yatar; saha tükendikçe üretim düşer.',
          'Varil fiyatı döneme bağlıdır: otomobiller yaygınlaştıkça yükselir.',
          'İstasyonlu bir kasabaya 1902’den sonra **rafineri** ($3000) kurarsan petrolün 1,8 katı fiyata satılır.',
        ],
        en: [
          'A derrick takes three days; the well may come up dry or strike a gusher.',
          'Oil sells every day and the money goes to your account; output falls as the field drains.',
          'The barrel price follows the era: it climbs as cars spread.',
          'Build a **refinery** ($3000) in a station town after 1902 and your oil sells for 1.8× the price.',
        ],
      },
      tips: {
        tr: ['Sahiplenilmemiş sahaları zamanla rakip şirketler alır; onlara teklif yapıp sahayı devralabilirsin.', 'Bilinen sahalar haritada kule simgesiyle görünür.'],
        en: ['Rival companies slowly claim unowned fields; you can make an offer and take them over.', 'Known fields appear on the map with a derrick icon.'],
      },
      rel: ['monopoly', 'business', 'money'],
    },
    {
      id: 'influence', cat: 'business', tags: ['influence', 'honor', 'money'],
      title: { tr: 'Nüfuz', en: 'Influence' },
      chip: { tr: 'Nüfuz', en: 'Influence' },
      q: {
        tr: ['nüfuz nasıl artar', 'nüfuz ne işe yarar', 'patron nasıl olunur', 'nüfuz seviyeleri'],
        en: ['how do I gain influence', 'what is influence for', 'how to become the boss', 'influence levels'],
      },
      a: {
        tr: 'Nüfuz 0–100 arası bir puandır: **servetin**, **onurun** ve **varlıkların** (sektör hakimiyeti, kendi bankan, malikane, kulüp üyeliği) toplamıdır. İşletmelerinin olduğu kasabada daha yüksektir.',
        en: 'Influence is a score from 0 to 100 built from your **wealth**, **honor** and **holdings** (sector dominance, your own bank, the mansion, club membership). It is higher in towns where you own businesses.',
      },
      steps: {
        tr: [
          'Basamaklar: Sıradan (0), Tanınmış (25), Nüfuzlu (50), Sözü Geçen (75), Patron (90).',
          'Nüfuz rüşvetin kabul edilmesini, şerifi maaşa bağlamayı ve koruma tutmayı açar.',
          'Puanı ve parçalarını **Günlük → Karakter**’de görürsün.',
        ],
        en: [
          'Levels: Nobody (0), Known (25), Influential (50), Powerful (75), Boss (90).',
          'Influence unlocks bribes that work, sheriffs on your payroll and bodyguards.',
          'See the score and its parts in **Journal → Character**.',
        ],
      },
      tips: {
        tr: ['Nüfuzlu birinin suçunu görenlerin bir kısmı susar.'],
        en: ['Some witnesses keep quiet about the crimes of influential people.'],
      },
      rel: ['bribery', 'guards', 'honor'],
    },
    {
      id: 'bribery', cat: 'business', tags: ['bribe', 'wanted', 'influence'],
      title: { tr: 'Rüşvet ve skandal', en: 'Bribery and scandal' },
      chip: { tr: 'Rüşvet', en: 'Bribery' },
      q: {
        tr: ['rüşvet nasıl verilir', 'şerife rüşvet', 'ödülümü rüşvetle silmek', 'rüşvet almayan şerif', 'rüşvet skandalı'],
        en: ['how do I bribe', 'bribing the sheriff', 'clear my bounty with a bribe', 'sheriff who refuses bribes', 'bribery scandal'],
      },
      a: {
        tr: 'Başındaki ödülün suçları bir dosyada tutulur; dosyanın en ağır suçu rüşvet için gereken **nüfuzu** belirler. Tutuklamaya gelen kanun adamına **Rüşvet Teklif Et**, şerifin masasında **Dosyayı Kapat (Rüşvet)** ya da tutuklanınca **Şerifle Anlaş**.',
        en: 'The crimes behind your bounty sit in a file, and the worst one sets how much **influence** a bribe needs. Use **Offer a Bribe** on an arresting lawman, **Close the File (Bribe)** at the sheriff’s desk, or **Deal with the Sheriff** after an arrest.',
      },
      steps: {
        tr: [
          'Hafif suç için Tanınmış, orta suç için Nüfuzlu, soygun için Sözü Geçen, cinayet için Patron olmalısın.',
          '**Kanun adamı öldürmenin pazarlığı olmaz**; maskeliyken de rüşvet olmaz.',
          'Kabul edilirse aranma biter, ödül ve dosya silinir; ama onur kaybedersin ve kasabada söylenti birikir.',
          'Söylenti büyürse **skandal** çıkar: gazeteye düşersin, nüfuzun yıllarca düşer.',
        ],
        en: [
          'You need to be Known for minor crimes, Influential for mid-level ones, Powerful for robbery and Boss for murder.',
          '**Killing a lawman cannot be bought off**, and no bribes while masked.',
          'If accepted, the chase ends and your bounty and file are wiped, but you lose honor and rumors spread in town.',
          'Too many rumors cause a **scandal**: you make the papers and your influence drops for years.',
        ],
      },
      tips: {
        tr: ['Bazı şerifler rüşvet almaz; onlara teklif yapmak ayrı bir suçtur. Barmen hangisinin aldığını fısıldayabilir.', '1915’te kurulan Islah Komisyonu’ndan sonra rüşvet pahalanır.'],
        en: ['Some sheriffs refuse bribes and offering one is a crime of its own. A bartender may whisper which ones take them.', 'After the Reform Commission forms in 1915, bribes cost more.'],
      },
      rel: ['influence', 'payroll', 'wanted'],
    },
    {
      id: 'payroll', cat: 'business', tags: ['payroll', 'bribe', 'influence'],
      title: { tr: 'Şerifi maaşa bağlama', en: 'Putting the sheriff on the payroll' },
      chip: { tr: 'Maaşlı şerif', en: 'Payroll' },
      q: {
        tr: ['şerifi maaşa bağlamak', 'şerif nasıl satın alınır', 'kasabada suçlara göz yumulması'],
        en: ['put the sheriff on the payroll', 'how to buy the sheriff', 'make the town look the other way'],
      },
      a: {
        tr: '**Nüfuzlu** olunca şerifin masasında **Şerifi Maaşa Bağla** seçeneği açılır: on günlük maaşı peşin, sonra her gün maaş ödersin. O kasabada hafif suçlara göz yumulur, orta suçların ödülü yarıya iner.',
        en: 'Once you are **Influential**, the sheriff’s desk offers **Put the Sheriff on the Payroll**: ten days’ pay up front, then a daily wage. In that town minor crimes are overlooked and mid-level bounties are halved.',
      },
      steps: {
        tr: [
          'Eski ödülünle o kasabada tanınmazsın; rüşvet yarı fiyatına ve neredeyse kesin kabul edilir.',
          'Maaş önce bankadan ödenir; iki gün ödenmezse küsen şerif ağzından laf kaçırır.',
          'Maaş yavaş yavaş söylenti biriktirir.',
        ],
        en: [
          'Your old bounty is not recognized in that town, and bribes cost half and almost always work.',
          'The wage comes out of your bank first; skip two days and the offended sheriff starts talking.',
          'The payroll slowly builds up rumors.',
        ],
      },
      tips: {
        tr: ['Şerif değişirse ve yenisi rüşvet almıyorsa anlaşma biter.'],
        en: ['If the sheriff is replaced by one who refuses bribes, the deal ends.'],
      },
      rel: ['bribery', 'influence', 'guards'],
    },
    {
      id: 'guards', cat: 'business', tags: ['guard', 'influence'],
      title: { tr: 'Korumalar', en: 'Bodyguards' },
      chip: { tr: 'Korumalar', en: 'Bodyguards' },
      q: {
        tr: ['koruma nasıl tutulur', 'fedai', 'korumam neden ateş etmiyor', 'koruma çeşitleri'],
        en: ['how do I hire a bodyguard', 'hired guns', 'why will my guard not shoot', 'types of bodyguards'],
      },
      a: {
        tr: '**Nüfuzlu** olunca saloon, cantina ve kumarhanelerden silahlı **koruma** tutarsın: Nüfuzlu 1, Sözü Geçen 2, Patron 3 koruma. Peşin on günlük ücret ve her gün ücret ödersin.',
        en: 'Once **Influential** you can hire armed **bodyguards** at saloons, cantinas and gambling halls: 1 when Influential, 2 when Powerful, 3 as Boss. You pay ten days up front, then a daily wage.',
      },
      steps: {
        tr: [
          '**Keskin Nişancı** uzaktan isabetli vurur; **İri Yarı** dayanıklıdır, tanıkları korkutur.',
          '**Sadık** asla kaçmaz; **Ucuz** olan canı yarıya inince kaçar.',
          'Haydutlara, sana saldıran ödül avcılarına ve vahşi hayvanlara ateş ederler; arada masum biri varsa ateş etmezler.',
          'Konuşup bir yeri tutmalarını isteyebilir ya da işlerine son verebilirsin.',
        ],
        en: [
          'The **Sharpshooter** hits from long range; the **Brawny** one is tough and scares witnesses.',
          'The **Loyal** one never runs; the **Cheap** one flees at half health.',
          'They shoot bandits, bounty hunters attacking you and wild animals, but hold fire if an innocent is in the way.',
          'Talk to them to have them hold a spot, or dismiss them.',
        ],
      },
      tips: {
        tr: ['Korumalar kanuna kendiliğinden asla ateş etmez; kanuna direnirsen yalnızca sadık olan yanında savaşır.'],
        en: ['Guards never fire on the law on their own; if you resist arrest, only the loyal one fights beside you.'],
      },
      rel: ['influence', 'bribery', 'bountyhunters'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
