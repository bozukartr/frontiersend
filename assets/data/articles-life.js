/* Frontier's End Wiki — makaleler: Kasaba hayatı, mülk ve ayarlar */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'social', cat: 'town', tags: ['greet', 'honor', 'price'],
      title: { tr: 'Selamlaşma, kışkırtma ve kasabalılar', en: 'Greeting, antagonizing and townsfolk' },
      chip: { tr: 'Selamlaşma', en: 'Greeting' },
      q: {
        tr: ['nasıl selam verilir', 'kasabalılar beni sevmiyor', 'kışkırtma nasıl yapılır', 'laf atana karşılık vermek', 'dükkan sahibi indirim yapar mı'],
        en: ['how do I greet people', 'townsfolk do not like me', 'how to antagonize someone', 'talk back to someone who taunts me', 'do shopkeepers give discounts'],
      },
      a: {
        tr: 'Önündeki kişiye [[E]] ile **selam ver**, [[Q]] ile **kışkırt** (kanun adamı kışkırtılmaz). Kasabalılar seni hatırlar: selamlaştıkça ısınırlar; soyduğun, saldırdığın ya da tehdit ettiğin kişiler sana soğur.',
        en: 'Press [[E]] to **greet** the person in front of you and [[Q]] to **antagonize** them (not lawmen). Townsfolk remember you: greetings warm them up, while people you rob, attack or threaten turn cold.',
      },
      steps: {
        tr: [
          'Biri el sallayınca **Selamla** ile karşılık ver; karşılık vermezsen bozulabilir.',
          'Laf atıldıktan hemen sonra **Karşılık Ver** seçeneği çıkar.',
          'Seni seven dükkân sahibi %10’a kadar indirim yapar; nefret eden zam yapar.',
          'At üstündeyken [[E]]’yi basılı tutunca yanındakilerle selamlaşma seçenekleri açılır.',
        ],
        en: [
          'When someone waves, reply with **Greet**; ignore them and they may take offense.',
          'Right after someone taunts you, a **Talk Back** option appears.',
          'A shopkeeper who likes you gives up to 10% off; one who hates you charges more.',
          'On horseback, hold [[E]] to open greeting options for people nearby.',
        ],
      },
      tips: {
        tr: ['Her sakinin bir mizacı vardır (şakacı, huysuz, utangaç, dedikoducu, dindar, sakin); adının yanında yazar.'],
        en: ['Every resident has a temperament (jokey, grumpy, shy, gossipy, devout, calm), shown next to their name.'],
      },
      rel: ['romance', 'brawl', 'honor'],
    },
    {
      id: 'romance', cat: 'town', tags: ['romance', 'greet', 'property'],
      title: { tr: 'Flört ve evlilik', en: 'Courtship and marriage' },
      chip: { tr: 'Evlilik', en: 'Marriage' },
      q: {
        tr: ['nasıl evlenirim', 'evlenme teklifi', 'sevgili nasıl bulunur', 'hediye ne vermeliyim', 'yakınlık nasıl artar'],
        en: ['how do I get married', 'how to propose', 'how to find a partner', 'what gift should I give', 'how to raise affection'],
      },
      a: {
        tr: 'Her kasabada tanışabileceğin biri yaşar. Onunla günde bir kez **Sohbet Et**, **hediye ver**; yakınlık 80’e ulaşınca **Evlenme Teklif Et** seçeneği açılır. Evlenmek için bir **evin** olmalı.',
        en: 'Each town has someone you can court. **Chat** with them once a day and **give gifts**; at 80 affection the **Propose Marriage** option appears. You need a **home** to marry.',
      },
      steps: {
        tr: [
          'Temiz ol ve onurunu yüksek tut; kirli ya da kötü ünlüyken sohbet az işe yarar.',
          'Hediyeler: kır çiçeği, çikolata, mücevher, parfüm, şampanya.',
          '**Altın yüzük** teklifin kabul edilmesini garantiler.',
          'Ev: satın aldığın bir mülk ya da kurduğun (mühürlü olmayan) bir yapı.',
          'Yakınlığı **Günlük → İlişkiler**’de görürsün.',
        ],
        en: [
          'Stay clean and keep your honor up; talking while dirty or disreputable helps little.',
          'Gifts: wildflowers, chocolate, jewelry, perfume, champagne.',
          'A **gold ring** guarantees a yes.',
          'Home: a property you bought or a house you built (not sealed).',
          'See affection in **Journal → Relationships**.',
        ],
      },
      tips: {
        tr: ['Karizma yeteneği sohbeti daha etkili yapar.', '**{{n:achievements.married}}** başarımı: {{n:achievements.married.perk}}.'],
        en: ['The Charisma skill makes your chats count for more.', '**{{n:achievements.married}}** achievement: {{n:achievements.married.perk}}.'],
      },
      rel: ['property', 'clean', 'social'],
    },
    {
      id: 'hotel', cat: 'town', tags: ['hotel', 'sleep', 'clean'],
      title: { tr: 'Otel', en: 'Hotels' },
      chip: { tr: 'Otel', en: 'Hotel' },
      q: {
        tr: ['otelde nasıl uyunur', 'otel odası nasıl kiralanır', 'oda kapısı açılmıyor', 'otelin üst katına nasıl çıkılır'],
        en: ['how to sleep at the hotel', 'how to rent a hotel room', 'the room door will not open', 'how to go upstairs in the hotel'],
      },
      a: {
        tr: 'Resepsiyondan oda kirala ({{$:svc.room}}, bir gün geçerli). Merdivene güney ucundan girip sonuna kadar yürüyerek üst kata çık; yalnızca **kiraladığın odanın** kapısı açılır. Odandaki yatakta uyu.',
        en: 'Rent a room at reception ({{$:svc.room}}, valid for a day). Walk into the stairs from their south end and keep going to reach the upper floor; only **the room you rented** opens. Sleep in your room’s bed.',
      },
      steps: {
        tr: [
          'İnmek için üst kattaki merdiven boşluğuna yürü.',
          'Otel senin işletmense oda ücretsizdir.',
          'Otelde **Sıcak Banyo** ({{$:svc.bath}}) da yapabilirsin.',
        ],
        en: [
          'To go down, walk into the stairwell on the upper floor.',
          'If the hotel is your business, the room is free.',
          'Hotels also offer a **Hot Bath** ({{$:svc.bath}}).',
        ],
      },
      tips: {
        tr: ['Aranırken görevli seni yukarı bırakmaz; omzunda yükle de merdiven çıkılmaz.'],
        en: ['The clerk will not let you upstairs while you are wanted, and you cannot climb the stairs while carrying something.'],
      },
      rel: ['sleep', 'clean', 'save'],
    },
    {
      id: 'services', cat: 'town', tags: ['shop', 'price', 'doctor', 'church', 'news'],
      title: { tr: 'Kasaba binaları ve hizmetler', en: 'Town buildings and services' },
      chip: { tr: 'Hizmetler', en: 'Services' },
      q: {
        tr: ['kasabada neler var', 'hangi binada ne yapılır', 'gazete nereden alınır', 'söylenti nasıl dinlenir', 'kilisede ne yapılır', 'tapu dairesi'],
        en: ['what is there in town', 'what can I do in each building', 'where to read the newspaper', 'how to hear rumors', 'what can I do at church', 'land office'],
      },
      a: {
        tr: 'Bütün binalara girilir; hizmetler içerideki tezgâhta ya da eşyanın başında alınır. Kasabaya göre genel mağaza, saloon, şerif, doktor, silahçı, kasap, ahır, otel, banka, kilise, berber, terzi, postane ve daha fazlası bulunur.',
        en: 'Every building can be entered, and services are bought at the counter or the relevant fixture inside. Depending on the town you find a general store, saloon, sheriff, doctor, gunsmith, butcher, stable, hotel, bank, church, barber, tailor, post office and more.',
      },
      steps: {
        tr: [
          '**Saloon / cantina**: içki, sıcak yemek (50¢), poker, Yirmi Bir, bilek güreşi, söylenti ({{$:svc.rumor}}), koruma.',
          '**Genel mağaza / postane**: gazete (10¢); gazeteler kasabaların son gelişmelerini yazar.',
          '**Kilise**: bağış (50¢, onur +3) ve günde bir kez dua.',
          '**Tapu dairesi / ilçe binası**: satılık mülkler, işletmeler, arsalar, tapu ve petrol arazisi.',
          '**Ahır**: at, tımar, yük arabası, posta arabası ve nakliyeciler.',
        ],
        en: [
          '**Saloon / cantina**: drinks, hot meals (50¢), poker, blackjack, arm wrestling, rumors ({{$:svc.rumor}}), bodyguards.',
          '**General store / post office**: newspapers (10¢), which report what is happening to the towns.',
          '**Church**: donations (50¢, +3 honor) and a daily prayer.',
          '**Land office / county office**: properties, businesses, lots, deeds and oil land for sale.',
          '**Stable**: horses, grooming, freight wagons, stagecoaches and haulers.',
        ],
      },
      tips: {
        tr: ['Dükkânlar gece kapanır ve kilitlenir.', 'Haritada soldaki açıklamadan bir bina türüne tıklarsan en yakını işaretlenir.'],
        en: ['Shops close and lock at night.', 'Click a building type in the map legend to mark the nearest one.'],
      },
      rel: ['map', 'trade', 'towns'],
    },
    {
      id: 'clothes', cat: 'town', tags: ['clothing', 'temperature', 'mask', 'barber'],
      title: { tr: 'Kıyafet ve görünüm', en: 'Clothing and appearance' },
      chip: { tr: 'Kıyafet', en: 'Clothing' },
      q: {
        tr: ['kıyafet nereden alınır', 'şapka nereden alınır', 'görünümümü nasıl değiştiririm', 'terzi ne satar', 'saç modeli değiştirmek'],
        en: ['where to buy clothes', 'where to buy a hat', 'how to change my look', 'what does the tailor sell', 'change my hairstyle'],
      },
      a: {
        tr: 'Paltolar, ceketler ve şapkalar **terzide** satılır; saç ve sakalını **berber** değiştirir. Giysiler hem görünüşü hem sıcaklığı etkiler.',
        en: 'Coats, jackets and hats are sold at the **tailor**; the **barber** changes your hair and beard. Clothes affect both your look and your temperature.',
      },
      steps: {
        tr: [
          'Sıcak tutanlar: kürk manto ({{$:items.coat_fur.p}}), kuzu postu ceket ({{$:items.coat_sheep.p}}), uzun palto ({{$:items.coat_duster.p}}), panço.',
          'Serin tutanlar: keten gömlek ({{$:items.coat_linen.p}}), geniş kenarlı ve hasır şapka.',
          'Şapkalar: kovboy, ova, melon, kasket, silindir, kürk başlık, bone ve daha fazlası.',
          'Kanun suç anındaki şapkanı ve paltonu hatırlar; kıyafet değiştirmek tanınmanı zorlaştırır.',
        ],
        en: [
          'Warm: fur coat ({{$:items.coat_fur.p}}), sheepskin coat ({{$:items.coat_sheep.p}}), duster ({{$:items.coat_duster.p}}), poncho.',
          'Cool: linen shirt ({{$:items.coat_linen.p}}), wide-brimmed and straw hats.',
          'Hats: cowboy, plains, bowler, flat cap, top hat, fur cap, bonnet and more.',
          'The law remembers the hat and coat you wore during a crime; a change of clothes makes you harder to recognize.',
        ],
      },
      tips: {
        tr: ['Terzi kullanılmış giysileri yarı fiyatına geri alır.'],
        en: ['Tailors buy used clothes back at half price.'],
      },
      rel: ['temperature', 'clean', 'mask'],
    },
    {
      id: 'towns', cat: 'town', tags: ['town', 'travel'],
      title: { tr: 'Kasabalar ve gelişimleri', en: 'Towns and how they grow' },
      chip: { tr: 'Kasabalar', en: 'Towns' },
      q: {
        tr: ['kaç kasaba var', 'kasabalar nasıl büyür', 'kasaba neden geriliyor', 'saint clement nerede', 'kasabaya elektrik ne zaman gelir', 'hayalet kasaba'],
        en: ['how many towns are there', 'how do towns grow', 'why is my town declining', 'where is saint clement', 'when does electricity arrive', 'ghost town'],
      },
      a: {
        tr: '13 kasaba vardır: Harlow, Saint Clement, Dust Creek, Silver Ridge, Cedar Falls, Cypress Bend, Fort Redstone, Coyote Springs, Carver Junction, Brine Cove, Longhorn, San Rafael ve Millbrook. Kasabalar yıllar içinde **büyür ya da geriler**; dünya {{#:c.DEV_END_YEAR}} yılına kadar gelişir.',
        en: 'There are 13 towns: Harlow, Saint Clement, Dust Creek, Silver Ridge, Cedar Falls, Cypress Bend, Fort Redstone, Coyote Springs, Carver Junction, Brine Cove, Longhorn, San Rafael and Millbrook. Towns **grow or decline** over the years; the world keeps developing until {{#:c.DEV_END_YEAR}}.',
      },
      steps: {
        tr: [
          'Basamaklar: köy, kasaba, gelişmiş kasaba, şehir, büyük şehir. Saint Clement en zengin şehirdir.',
          'Gelişimi kasabanın türü, demiryolu, çevredeki haydutlar ve suçlar etkiler.',
          'Senin işletmelerin ve mülklerin büyüyen kasabayı öne çeker; temizlediğin kamplar ve teslim ettiğin kaçaklar da yardım eder.',
          'Büyüyen kasabaya yeni binalar, taş sokaklar ve elektrik gelir; gerileyende dükkânlar tahta perdeyle kapanır.',
          '**Günlük → Kasabalar** her kasabanın durumunu ve son gelişmeleri gösterir.',
        ],
        en: [
          'Tiers: village, town, thriving town, city, big city. Saint Clement is the richest city.',
          'Growth depends on the town’s type, the railroad, nearby bandits and crime.',
          'Your businesses and property help a growing town along; clearing camps and turning in outlaws helps too.',
          'Growing towns get new buildings, paved streets and electricity; in declining ones shops get boarded up.',
          '**Journal → Towns** shows each town’s state and the latest developments.',
        ],
      },
      tips: {
        tr: ['Gazeteler ve gazeteci çocuk kasabalardaki gelişmeleri duyurur.'],
        en: ['Newspapers and the paperboy announce what is happening in each town.'],
      },
      rel: ['services', 'business', 'train'],
    },
    {
      id: 'club', cat: 'town', tags: ['club', 'gamble', 'influence'],
      title: { tr: 'Saint Clement Kulübü', en: 'The Saint Clement Club' },
      chip: { tr: 'Kulüp', en: 'Club' },
      q: {
        tr: ['kulübe nasıl üye olunur', 'kulübe neden giremiyorum', 'özel kulüp', 'bilardo nerede'],
        en: ['how to join the club', 'why can I not enter the club', 'private club', 'where is billiards'],
      },
      a: {
        tr: 'Saint Clement’teki özel kulübün kapısı yalnızca üyelere açılır. Kapı görevlisinden **{{$:c.CLUB_FEE}}**’a üye olursun. İçeride puro ve konyak salonu, okuma odası, yüksek bahisli kart odası ve bilardo vardır.',
        en: 'The private club in Saint Clement is members only. Join for **{{$:c.CLUB_FEE}}** at the door. Inside are a cigar and cognac lounge, a reading room, a high-stakes card room and billiards.',
      },
      steps: {
        tr: [
          'Aranırken, maskeliyken ya da kirliyken (temizlik 30’un altında) içeri alınmazsın.',
          'Okuma odasında günün gazetesi okunur; üyelerin konuştuğu bilinmeyen bir yer haritanda işaretlenir.',
          'Barda puro, konyak, şampanya, istiridye ve peynir satılır.',
        ],
        en: [
          'You are turned away while wanted, masked or dirty (cleanliness below 30).',
          'In the reading room you can read the day’s paper, and an unknown place the members mention gets marked on your map.',
          'The bar sells cigars, cognac, champagne, oysters and cheese.',
        ],
      },
      tips: {
        tr: ['Kulüp üyeliği nüfuzunu da artırır.'],
        en: ['Club membership also raises your influence.'],
      },
      rel: ['gambling', 'influence', 'mansion'],
    },
    {
      id: 'property', cat: 'home', tags: ['property', 'buy', 'sleep', 'earn'],
      title: { tr: 'Mülk satın alma', en: 'Buying property' },
      chip: { tr: 'Mülk', en: 'Property' },
      q: {
        tr: ['ev nasıl satın alınır', 'satılık mülkler', 'çiftlik nasıl alınır', 'kendi evim olsun istiyorum', 'eşyalarımı nerede saklarım'],
        en: ['how do I buy a house', 'properties for sale', 'how to buy a farm', 'I want my own home', 'where can I store items'],
      },
      a: {
        tr: 'Tapu dairesinde **Satılık Mülkler**’den ya da mülkün kendisinde **Mülkü İncele** ile ev alırsın. Baraka ({{$:props.shack.p}}), göl kıyısı kulübe ({{$:props.cabin.p}}), çiftlik ({{$:props.ranch.p}}, günde {{$:props.ranch.income}} gelir) ve konak ({{$:props.estate.p}}) gibi seçenekler vardır.',
        en: 'Buy a home via **Properties for Sale** at a land office, or with **Inspect Property** at the place itself. Options include a shack ({{$:props.shack.p}}), a lakeside cabin ({{$:props.cabin.p}}), a farm ({{$:props.ranch.p}}, earning {{$:props.ranch.income}} a day) and a manor ({{$:props.estate.p}}).',
      },
      steps: {
        tr: [
          'Evinde yatakta uyur ve elle kayıt alırsın.',
          'Sandığa eşya koyup saklarsın.',
          'Evinde ocak varsa yemek pişirirsin.',
          'Mülklerin günlük geliri bankana yatar.',
        ],
        en: [
          'Sleep and save in your home’s bed.',
          'Store items in the chest.',
          'Cook at the stove, if your home has one.',
          'Daily income from properties goes to your bank.',
        ],
      },
      tips: {
        tr: ['**Ev Sahibi** başarımı: evde uyumak bütün çekirdekleri doldurur.', 'Evlenmek için bir evin olmalı.'],
        en: ['**Homeowner** achievement: sleeping at home refills every core.', 'You need a home to get married.'],
      },
      rel: ['homestead', 'mansion', 'romance'],
    },
    {
      id: 'homestead', cat: 'home', tags: ['homestead', 'property', 'lot'],
      title: { tr: 'Kendi evini kurmak (arazi kazıkları)', en: 'Building your own home (survey stakes)' },
      chip: { tr: 'Ev kurma', en: 'Homestead' },
      q: {
        tr: ['ev nasıl yapılır', 'arazi kazığı nasıl kullanılır', 'kazık çakamıyorum', 'tapu nasıl alınır', 'evim mühürlendi', 'kulübe nasıl kurulur'],
        en: ['how do I build a house', 'how to use survey stakes', 'I cannot place stakes', 'how to get a land deed', 'my home was sealed', 'how to build a cabin'],
      },
      a: {
        tr: 'Genel mağaza ya da toptancıdan **Arazi Kazıkları** al ({{$:items.stakes.p}}), kasabalardan uzak boş bir araziye çak. Yer uygunsa bir yapı seçersin: **Baraka** ({{#:home.types.hs_shack.days}} gün), **Kütük Kulübe** ({{#:home.types.hs_cabin.days}} gün) ya da **Çiftlik Evi** ({{#:home.types.hs_house.days}} gün).',
        en: 'Buy **Survey Stakes** ({{$:items.stakes.p}}) at a general store or wholesaler and plant them on empty land far from towns. If the spot is valid, pick a building: **Shack** ({{#:home.types.hs_shack.days}} days), **Log Cabin** ({{#:home.types.hs_cabin.days}} days) or **Farmhouse** ({{#:home.types.hs_house.days}} days).',
      },
      steps: {
        tr: [
          'Kasabalara, yollara, raya, suya, bataklığa, kayalık ve kumlu zemine, önemli yerlere ve sık ağaçlığa yakın yerler kabul edilmez.',
          'Fiyat yapıya ve seçtiğin tasarıma göre değişir (baraka {{$-:d.homeRange.hs_shack}}, kulübe {{$-:d.homeRange.hs_cabin}}, çiftlik evi {{$-:d.homeRange.hs_house}}).',
          'Şantiye her gün kendiliğinden ilerler; tabeladan çalışırsan (günde en çok iki kez) hızlanır.',
          'Bitince **ahır** ({{$:home.addons.stable.p}}), **kuyu** ({{$:home.addons.well.p}}) ve **bostan** ({{$:home.addons.garden.p}}) ekleyebilirsin.',
        ],
        en: [
          'Spots near towns, roads, rails, water, swamps, rocky or sandy ground, landmarks or dense woods are refused.',
          'Price depends on the building and the design you pick (shack {{$-:d.homeRange.hs_shack}}, cabin {{$-:d.homeRange.hs_cabin}}, farmhouse {{$-:d.homeRange.hs_house}}).',
          'Construction moves forward every day; working at the sign (up to twice a day) speeds it up.',
          'Once finished you can add a **stable** ({{$:home.addons.stable.p}}), a **well** ({{$:home.addons.well.p}}) and a **garden** ({{$:home.addons.garden.p}}).',
        ],
      },
      tips: {
        tr: ['Tapu dairesi ya da ilçe binasından **Arazi Tapusu** ({{$:home.deed}}) alırsan yapın yasaldır.', 'Tapusuz yapı ihbar edilebilir: 3 gün içinde tapuya bağlamazsan (tapu + {{$:home.fine}} ceza) mühürlenir.'],
        en: ['Buy a **Land Deed** ({{$:home.deed}}) at a land office or county office to make the building legal.', 'An undeeded building can be reported: register it within 3 days (deed + {{$:home.fine}} fine) or it gets sealed.'],
      },
      rel: ['property', 'build', 'sleep'],
    },
    {
      id: 'mansion', cat: 'home', tags: ['mansion', 'property', 'carriage'],
      title: { tr: 'Malikane ve hizmetçiler', en: 'The mansion and servants' },
      chip: { tr: 'Malikane', en: 'Mansion' },
      q: {
        tr: ['malikane nasıl alınır', 'hizmetçi nasıl tutulur', 'aşçı ne yapar', 'uşak ne işe yarar'],
        en: ['how do I buy the mansion', 'how to hire servants', 'what does the cook do', 'what is the butler for'],
      },
      a: {
        tr: 'Saint Clement’in kuzeydoğusundaki iki katlı taş malikane **{{$:c.MANSION_PRICE}}**’dır; kapısından ya da tapu dairesinden alınır. Ev gibi kullanılır: yatakta uyku ve kayıt, sandık, ocak ve küvet.',
        en: 'The two-story stone mansion in northeast Saint Clement costs **{{$:c.MANSION_PRICE}}**; buy it at its door or at the land office. It works like a home: sleep and save in bed, plus a chest, stove and tub.',
      },
      steps: {
        tr: [
          'Hizmetçileri üst kattaki çalışma masasından (**Malikane Defteri**) tutarsın.',
          '**Aşçı** (günde {{$:c.SERVANTS.cook.wage}}): sabah 5–11 arası kahvaltı hazırlar.',
          '**Seyis** (günde {{$:c.SERVANTS.groom.wage}}): bahçe kapısına getirdiğin atı tımarlar, besler, dinlendirir.',
          '**Uşak** (günde {{$:c.SERVANTS.butler.wage}}): postları ve değerli eşyaları sandığa kaldırır, faytonu kapıya getirtir.',
        ],
        en: [
          'Hire servants at the desk upstairs (**Mansion Ledger**).',
          '**Cook** ({{$:c.SERVANTS.cook.wage}} a day): makes breakfast between 5 and 11 in the morning.',
          '**Stable Hand** ({{$:c.SERVANTS.groom.wage}} a day): grooms, feeds and rests your horse at the garden gate.',
          '**Butler** ({{$:c.SERVANTS.butler.wage}} a day): puts pelts and valuables away in the chest and has your carriage brought round.',
        ],
      },
      tips: {
        tr: ['Ücretler önce bankadan ödenir; iki gün ücret alamayan hizmetçi işi bırakır.'],
        en: ['Wages come out of the bank first; a servant unpaid for two days quits.'],
      },
      rel: ['property', 'carriage', 'club'],
    },
    {
      id: 'graphics', cat: 'settings', tags: ['graphics', 'settings'],
      title: { tr: 'Grafik ayarları ve performans', en: 'Graphics settings and performance' },
      chip: { tr: 'Performans', en: 'Performance' },
      q: {
        tr: ['oyun kasıyor', 'fps düşük', 'oyun yavaş', 'grafik ayarları', 'ekran kartı seçimi', 'melez ve klasik farkı'],
        en: ['the game is lagging', 'low fps', 'the game runs slow', 'graphics settings', 'choose the graphics card', 'hybrid vs classic'],
      },
      a: {
        tr: '**Ayarlar → Görüntü → Grafik**: **Melez** (varsayılan, ışık ve gölgeli) ya da **Klasik** (daha hafif). Oyun akıcı değilse Klasik’e geç, **Görsel Efektler**’i Sade yap ve **Ekran Kartı**’nda güçlü kartı seç.',
        en: '**Settings → Display → Graphics**: **Hybrid** (default, with lighting and shadows) or **Classic** (lighter). If the game is not smooth, switch to Classic, set **Visual Effects** to Minimal and pick your strong GPU under **Graphics Card**.',
      },
      steps: {
        tr: [
          '**FPS Göster** (Ayarlar → Genel) kare sayısını ve kare süresini yazar; FPS düşük ama süre kısaysa yük ekran kartındadır.',
          'Dizüstünde Windows’ta Ayarlar → Sistem → Ekran → Grafik’ten oyuna güçlü kartı seçtir.',
          'Linux’ta Steam başlatma seçeneği: prime-run %command%.',
          'Ekran kartı WebGL’i desteklemiyorsa oyun kendiliğinden Klasik’e döner.',
        ],
        en: [
          '**Show FPS** (Settings → General) displays the frame rate and frame time; low FPS with a short frame time means the GPU is the bottleneck.',
          'On a Windows laptop, assign the strong GPU via Settings → System → Display → Graphics.',
          'On Linux use the Steam launch option prime-run %command%.',
          'If your GPU lacks WebGL support, the game falls back to Classic automatically.',
        ],
      },
      tips: {
        tr: ['Masaüstü sürümünde ekran kartı seçimi oyun yeniden açılınca geçerli olur.'],
        en: ['In the desktop version, the graphics card choice applies after a restart.'],
      },
      rel: ['settings', 'controls', 'hud'],
    },
    {
      id: 'settings', cat: 'settings', tags: ['settings', 'language', 'audio', 'hud'],
      title: { tr: 'Dil, ses ve arayüz ayarları', en: 'Language, audio and interface settings' },
      chip: { tr: 'Ayarlar', en: 'Settings' },
      q: {
        tr: ['dil nasıl değiştirilir', 'ingilizceye nasıl geçilir', 'ses ayarları', 'arayüz çok küçük', 'ekran sarsıntısını kapatmak', 'sinematik nasıl geçilir'],
        en: ['how do I change the language', 'switch to turkish', 'audio settings', 'the interface is too small', 'turn off screen shake', 'how to skip a cutscene'],
      },
      a: {
        tr: '**Ayarlar → Genel → Dil** oyunun dilini hemen değiştirir (Türkçe / English). **Ses** sekmesinde ana ses, müzik, efektler ve ortam sesleri; **Görüntü** sekmesinde arayüz boyutu, göstergeler ve renk tonu ayarlanır.',
        en: '**Settings → General → Language** switches the game language instantly (Türkçe / English). The **Audio** tab has master, music, effects and ambient volume; the **Display** tab has interface size, meters and color tone.',
      },
      steps: {
        tr: [
          '**Arayüz Boyutu**: %80–%140.',
          '**Göstergeler**: Gerektiğinde ya da Her Zaman.',
          '**Görüntü Tonu**: Doğal ya da Canlı. **Ekran Sarsıntısı**: baş döndürüyorsa kapat.',
          'Sinematiği geçmek için [[Enter]], [[Space]] ya da [[Esc]]’yi bir saniye basılı tut.',
        ],
        en: [
          '**Interface Size**: 80%–140%.',
          '**Meters**: When Needed or Always.',
          '**Color Tone**: Natural or Vivid. **Screen Shake**: turn it off if it makes you dizzy.',
          'To skip a cutscene, hold [[Enter]], [[Space]] or [[Esc]] for one second.',
        ],
      },
      tips: {
        tr: ['Sinematiklerde İngilizce seslendirme ve altyazı vardır.'],
        en: ['Cutscenes have English voice acting and subtitles.'],
      },
      rel: ['graphics', 'keybinds', 'hud'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
