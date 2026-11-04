/* Frontier's End Wiki — makaleler: Para ve iş */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'money', cat: 'money', tags: ['money', 'earn', 'job', 'hunt', 'bounty'],
      title: { tr: 'Para kazanmanın yolları', en: 'Ways to make money' },
      chip: { tr: 'Para kazanma', en: 'Making money' },
      q: {
        tr: ['nasıl para kazanırım', 'hızlı para kazanmak', 'başlangıçta para nasıl kazanılır', 'zengin olmak', 'en karlı iş'],
        en: ['how do I make money', 'fast money', 'how to earn money early', 'how to get rich', 'most profitable job'],
      },
      a: {
        tr: 'Başta en kolay yollar: **avlanıp postları satmak**, kasabalardaki **günlük işler** (vardiya başına $1–3), **bitki toplamak**, **balık tutmak**, **altın elemek** ve şerifteki **ödül ilanları**. Paran birikince işletme, mülk ve petrole yatırım yap.',
        en: 'The easiest early options are **hunting and selling pelts**, **day jobs** in town ($1–3 a shift), **gathering herbs**, **fishing**, **panning for gold** and the **bounty posters** at the sheriff’s office. Once you have savings, invest in businesses, property and oil.',
      },
      steps: {
        tr: [
          'Avcılık: kızıl geyik, kurt, puma ve ayı postu iyi para eder.',
          'İş: maden, kereste fabrikası, liman, değirmen, imalathane ve çiftlik vardiya başına ücret öder.',
          'Ödül avı: hedefi canlı getirirsen tam ödül alırsın.',
          'Değerli eşyalar (yüzük, saat, altın) kaçakçıya iyi fiyata gider.',
          'Uzun vadede: işletmeler her gün gelir getirir, çiftlik mülkü günde $2,50 kazandırır.',
        ],
        en: [
          'Hunting: elk, wolf, cougar and bear pelts pay well.',
          'Jobs: the mine, lumber mill, docks, mill, brewery and farm pay per shift.',
          'Bounties: bring the target in alive for the full reward.',
          'Valuables (rings, watches, gold) sell well to the fence.',
          'Long term: businesses earn every day, and a farm property earns $2.50 a day.',
        ],
      },
      tips: {
        tr: ['Paranı bankaya yatır: ölünce kaybolmaz.', 'Al-sat döngüsüyle para basılamaz: dükkânlar her zaman aldıklarından daha ucuza satın alır.'],
        en: ['Bank your money: it is safe if you die.', 'You cannot profit by buying and reselling: shops always buy for less than they sell.'],
      },
      rel: ['jobs', 'pelts', 'business'],
    },
    {
      id: 'jobs', cat: 'money', tags: ['job', 'money', 'earn'],
      title: { tr: 'Günlük işler ve vardiyalar', en: 'Day jobs and shifts' },
      chip: { tr: 'İşler', en: 'Jobs' },
      q: {
        tr: ['nerede çalışabilirim', 'iş nasıl bulunur', 'madende çalışmak', 'vardiya ne kadar kazandırır', 'iş ücreti'],
        en: ['where can I work', 'how to find a job', 'working in the mine', 'how much does a shift pay', 'job wages'],
      },
      a: {
        tr: 'Maden ofisi, kereste fabrikası, liman deposu, değirmen, bira imalathanesi ve çiftlik evinde **vardiyalı** çalışabilirsin. Bir vardiya 4–5 saat sürer ve $1–3 kazandırır.',
        en: 'You can work **shifts** at the mining office, lumber mill, dock warehouse, mill, brewery and farmhouse. A shift lasts 4–5 hours and pays $1–3.',
      },
      steps: {
        tr: [
          '**Maden** en iyi ödeyen iştir ($1,60–2,80, 5 saat); bazen cevher de çıkar.',
          '**Kereste** ($1,30–2,20) ve **liman** ($1,30–2,40) 4 saat sürer.',
          '**İmalathane** ve **değirmen** biraz daha az öder ama bira ya da ekmek verebilir.',
          '**Çiftlik** ($1–1,80) mısır ve elma verebilir.',
          'Çalışmak uyku, açlık ve susuzluğu azaltır; önce karnını doyur.',
        ],
        en: [
          'The **mine** pays best ($1.60–2.80, 5 hours) and sometimes yields ore.',
          '**Lumber** ($1.30–2.20) and the **docks** ($1.30–2.40) take 4 hours.',
          'The **brewery** and **mill** pay a little less but may give beer or bread.',
          'The **farm** ($1–1.80) may give corn and apples.',
          'Working drains sleep, hunger and thirst, so eat first.',
        ],
      },
      tips: {
        tr: ['Güç yeteneği iş verimini artırır.', '**Alın Teri** başarımı (10 vardiya) iş ücretlerini %25 artırır.'],
        en: ['The Strength skill raises your job output.', 'The **Sweat of Your Brow** achievement (10 shifts) raises wages by 25%.'],
      },
      rel: ['money', 'ore', 'skills'],
    },
    {
      id: 'bank', cat: 'money', tags: ['bank', 'money', 'death'],
      title: { tr: 'Banka hesabı: para yatırma ve çekme', en: 'Bank account: deposits and withdrawals' },
      chip: { tr: 'Banka hesabı', en: 'Bank account' },
      q: {
        tr: ['bankaya para nasıl yatırılır', 'para nasıl çekilir', 'faiz', 'param güvende mi', 'ölünce param gider mi'],
        en: ['how do I deposit money', 'how to withdraw money', 'interest', 'is my money safe', 'do I lose money when I die'],
      },
      a: {
        tr: 'Herhangi bir kasabanın bankasında vezneye gidip $1, $10, $50 ya da tümünü yatırır, istediğin zaman çekersin. Bankadaki para **ölünce kaybolmaz** ve her doğum gününde %2 faiz kazanır.',
        en: 'At any town bank’s teller you can deposit $1, $10, $50 or everything, and withdraw whenever you like. Bank money is **safe when you die** and earns 2% interest on each birthday.',
      },
      steps: {
        tr: [
          'Mülklerinin günlük geliri bankaya yatar.',
          'İşletmelerinin kasasını %10 kesintiyle bankana aktarılacak şekilde ayarlayabilirsin.',
          'Nakliyeci, koruma ve hizmetçi ücretleri önce bankadan ödenir.',
        ],
        en: [
          'Daily income from your properties goes into the bank.',
          'You can have your businesses’ tills transferred to the bank for a 10% fee.',
          'Wages for haulers, guards and servants are paid from the bank first.',
        ],
      },
      tips: {
        tr: ['Kendi bankanı kurmak ayrı bir iştir; “Kendi bankanı kurmak” konusuna bak.'],
        en: ['Owning a bank is a different thing; see “Owning a bank”.'],
      },
      rel: ['death', 'ownbank', 'money'],
    },
    {
      id: 'trade', cat: 'money', tags: ['sell', 'buy', 'shop', 'price'],
      title: { tr: 'Alışveriş ve satış', en: 'Buying and selling' },
      chip: { tr: 'Alım-satım', en: 'Trading' },
      q: {
        tr: ['eşya nereye satılır', 'değerli eşyalar nereye satılır', 'en iyi fiyat nerede', 'indirim nasıl alınır', 'dükkan neden bana satmıyor'],
        en: ['where do I sell items', 'where to sell valuables', 'where to get the best price', 'how to get discounts', 'why will the shop not serve me'],
      },
      a: {
        tr: 'Her dükkân her şeyi almaz ve aynı fiyatı vermez: postu kasap, bitkiyi münzevi ve eczane, değerli eşyayı **kaçakçı**, koleksiyon eşyasını kervan en iyi fiyata alır. Genel mağaza çok şey alır ama ucuza.',
        en: 'Shops do not buy everything or pay the same: butchers pay best for pelts, the hermit and pharmacies for herbs, the **fence** for valuables, caravans for collectibles. General stores buy almost anything, but cheaply.',
      },
      steps: {
        tr: [
          'Dükkânda **Alışveriş** → **Sat** sekmesi.',
          'Seni seven dükkân sahibi %10’a kadar indirim yapar; nefret eden zam yapar.',
          'Ticaret yeteneği ve bazı başarımlar fiyatları iyileştirir.',
          'Saint Clement pazarı %25 pahalıdır ama malları daha güçlüdür.',
        ],
        en: [
          'In a shop: **Shopping** → the **Sell** tab.',
          'A shopkeeper who likes you gives up to 10% off; one who hates you charges more.',
          'The Trade skill and some achievements improve prices.',
          'The Saint Clement market is 25% pricier, but its goods are stronger.',
        ],
      },
      tips: {
        tr: ['Dükkânlar maskeli müşteriye hizmet etmez (kaçakçı hariç).'],
        en: ['Shops will not serve a masked customer (except the fence).'],
      },
      rel: ['pelts', 'social', 'mask'],
    },
    {
      id: 'gambling', cat: 'money', tags: ['gamble', 'money', 'club'],
      title: { tr: 'Kumar: poker, Yirmi Bir, bilek güreşi, bilardo', en: 'Gambling: poker, blackjack, arm wrestling, billiards' },
      chip: { tr: 'Kumar', en: 'Gambling' },
      q: {
        tr: ['poker nasıl oynanır', 'blackjack nerede', 'bilek güreşi', 'bilardo nasıl oynanır', 'kumar oynamak'],
        en: ['how to play poker', 'where is blackjack', 'arm wrestling', 'how to play billiards', 'where can I gamble'],
      },
      a: {
        tr: 'Saloon, cantina ve kumarhanelerde **poker** ve **Yirmi Bir** oynanır; saloon ve cantinada **bilek güreşi** yapılır. Saint Clement Kulübü’nde yüksek bahisli poker ve **bilardo** vardır.',
        en: '**Poker** and **blackjack** are played in saloons, cantinas and gambling halls; saloons and cantinas also host **arm wrestling**. The Saint Clement Club offers high-stakes poker and **billiards**.',
      },
      steps: {
        tr: [
          'Poker: beş kart çekmeli, üç rakip; giriş 5¢, 10¢ ya da 25¢. En fazla 3 kart değiştirirsin.',
          'Bilek güreşi: 25¢ bahis, günde 3 kez.',
          'Bilardo (yalnız kulüp üyeleri): 7 top, ilk 4 topu sokan kazanır; bahis $1, $2,50 ya da $5.',
          'Kulübün kart odasında bahisler on kat yüksektir.',
        ],
        en: [
          'Poker: five-card draw against three opponents; antes are 5¢, 10¢ or 25¢. You can swap up to 3 cards.',
          'Arm wrestling: 25¢ a bout, 3 times a day.',
          'Billiards (club members only): 7 balls, first to pocket 4 wins; bets are $1, $2.50 or $5.',
          'Stakes in the club’s card room are ten times higher.',
        ],
      },
      tips: {
        tr: ['**Kumarbaz** başarımı (10 el Yirmi Bir) pokerde rakiplerin yüzünü okumanı sağlar.', '**Demir Bilek** (5 bilek güreşi) yakın dövüş hasarını %30 artırır.'],
        en: ['The **Gambler** achievement (10 blackjack wins) lets you read faces at poker.', '**Iron Wrist** (5 arm wrestling wins) adds 30% melee damage.'],
      },
      rel: ['club', 'duel', 'money'],
    },
    {
      id: 'duel', cat: 'money', tags: ['duel', 'shoot', 'weapon'],
      title: { tr: 'Düello', en: 'Duels' },
      chip: { tr: 'Düello', en: 'Duel' },
      q: {
        tr: ['düello nasıl kazanılır', 'düelloda nasıl ateş edilir', 'düello teklifi', 'düelloyu kaybettim'],
        en: ['how do I win a duel', 'how to shoot in a duel', 'duel challenge', 'I lost the duel'],
      },
      a: {
        tr: 'Bazı yabancılar seni düelloya çağırır; kabul etmek için bir **tabancan** olmalı. **“ÇEK!”** yazısı çıkınca hemen ateş tuşuna ya da [[Enter]]’a bas. Erken davranırsan kaybedersin.',
        en: 'Some strangers challenge you to a duel; you need a **revolver** to accept. When **“DRAW!”** appears, press fire or [[Enter]] at once. Move too early and you lose.',
      },
      steps: {
        tr: [
          'Kazanırsan bahsi alırsın, onurun ve Nişancılık yeteneğin artar.',
          'Kaybedersen ağır yaralanırsın.',
        ],
        en: [
          'Win and you take the bet, plus a little honor and Marksmanship.',
          'Lose and you are badly wounded.',
        ],
      },
      tips: {
        tr: ['Sarhoşken düelloya girme.'],
        en: ['Never duel while drunk.'],
      },
      rel: ['weapons', 'drunk', 'gambling'],
    },
    {
      id: 'bounty', cat: 'money', tags: ['bounty', 'lasso', 'money'],
      title: { tr: 'Ödül avı (ödül ilanları)', en: 'Bounty hunting (bounty posters)' },
      chip: { tr: 'Ödül avı', en: 'Bounty hunting' },
      q: {
        tr: ['ödül ilanı nasıl alınır', 'ödül nasıl teslim edilir', 'hedefi nasıl teslim ederim', 'aranan kişiyi canlı getirmek', 'ödülümü alamadım'],
        en: ['how to take a bounty', 'how to turn in a bounty', 'how do I deliver the target', 'bring the target alive', 'I did not get my reward'],
      },
      a: {
        tr: 'Şerif ofisinde **Ödül İlanları**’ndan bir hedef seç. Hedef ölünce ödül kendiliğinden verilmez: kişiyi **şerif ofisine getirmen** gerekir. Canlı teslim tam ödülü, ceset yarısını kazandırır.',
        en: 'Pick a target from the **Bounty Posters** at a sheriff’s office. The reward is not paid automatically: you have to **bring the person to the sheriff’s office**. Alive pays the full reward, dead pays half.',
      },
      steps: {
        tr: [
          'Ağır yaralanan hedef çoğunlukla yere yığılır; yanına gidip [[E]]’yi basılı tutarak bağla.',
          'Kementle yakalamak da işe yarar.',
          'Omzundakini ofisin içinde, eyerdekini ofis kapısında ya da şerifin masasında teslim et.',
          'Haydutları da teslim edebilirsin: canlı $5, ceset $2.',
        ],
        en: [
          'A badly wounded target usually collapses; walk up and hold [[E]] to hogtie them.',
          'Catching them with a lasso works too.',
          'Deliver someone on your shoulder inside the office, or on your saddle at the office door or the sheriff’s desk.',
          'You can turn in bandits too: $5 alive, $2 dead.',
        ],
      },
      tips: {
        tr: ['Bağlı kişi bir süre sonra iplerinden kurtulur; oyalanma.', 'Bağlı ya da baygın biri suda birkaç saniyede boğulur.'],
        en: ['A hogtied person eventually wriggles free, so do not dawdle.', 'A hogtied or unconscious person drowns in water within seconds.'],
      },
      rel: ['lasso', 'carry', 'wanted'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
