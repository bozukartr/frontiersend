/* Frontier's End Wiki — makaleler: At ve yolculuk */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'horse-buy', cat: 'horse', tags: ['horse', 'buy', 'stable', 'price'],
      title: { tr: 'At satın alma', en: 'Buying a horse' },
      chip: { tr: 'Satın alma', en: 'Buying' },
      q: {
        tr: ['at nereden alınır', 'en iyi at hangisi', 'en hızlı at', 'at fiyatları', 'yeni at almak'],
        en: ['where do I buy a horse', 'what is the best horse', 'fastest horse', 'horse prices', 'getting a new horse'],
      },
      a: {
        tr: 'Atı kasabaların **ahırından** alırsın: tezgâhta **At Satın Al**. Fiyatlar {{$:horses.morgan.p}} ile {{$:horses.arabian.p}} arasındadır; pahalı atlar daha hızlı ya da daha dayanıklıdır.',
        en: 'Buy horses at a town **stable**: choose **Buy a Horse** at the counter. Prices run from {{$:horses.morgan.p}} to {{$:horses.arabian.p}}; pricier horses are faster or tougher.',
      },
      steps: {
        tr: [
          '**Morgan** ({{$:horses.morgan.p}}): ucuz ve dengeli.',
          '**Tennessee Walker** ({{$:horses.tennessee.p}}): biraz daha hızlı ve dayanıklı.',
          '**Mustang** ({{$:horses.mustang.p}}): hızlı ve sağlam.',
          '**Shire** ({{$:horses.shire.p}}): yavaş ama çok dayanıklı ve güçlü.',
          '**Standardbred** ({{$:horses.standardbred.p}}): çok hızlı. **Arap Atı** ({{$:horses.arabian.p}}): en hızlısı.',
        ],
        en: [
          '**Morgan** ({{$:horses.morgan.p}}): cheap and balanced.',
          '**Tennessee Walker** ({{$:horses.tennessee.p}}): a little faster and hardier.',
          '**Mustang** ({{$:horses.mustang.p}}): fast and sturdy.',
          '**Shire** ({{$:horses.shire.p}}): slow but very tough and strong.',
          '**Standardbred** ({{$:horses.standardbred.p}}): very fast. **Arabian** ({{$:horses.arabian.p}}): the fastest of all.',
        ],
      },
      tips: {
        tr: ['Yeni at alınca eskisi ahıra gider; **Ahırdaki Atların**’dan istediğin zaman değiştirirsin.', 'Para yoksa yabani bir at evcilleştirmek bedavadır.'],
        en: ['When you buy a new horse your old one goes to the stable; swap any time via **Your Stabled Horses**.', 'Short on money? Taming a wild horse is free.'],
      },
      rel: ['horse-tame', 'horse-bond', 'horse-ride'],
    },
    {
      id: 'horse-tame', cat: 'horse', tags: ['horse', 'tame', 'wild', 'lasso'],
      title: { tr: 'Yabani at evcilleştirme', en: 'Taming a wild horse' },
      chip: { tr: 'Evcilleştirme', en: 'Taming' },
      q: {
        tr: ['yabani at nasıl evcilleştirilir', 'yabani at nerede bulunur', 'at nasıl yakalanır', 'atı evcilleştiremiyorum', 'bedava at'],
        en: ['how do I tame a wild horse', 'where are wild horses', 'how to catch a horse', 'I cannot tame the horse', 'free horse'],
      },
      a: {
        tr: 'Yabani atlara **yaya ve çömelerek** yaklaş; böylece seni çok yakına gelene dek fark etmezler. Yanına varınca [[E]]’yi basılı tut ve **Sakinleştir ve Evcilleştir**’i seç.',
        en: 'Approach wild horses **on foot and crouched**; that way they do not notice you until you are very close. Next to one, hold [[E]] and choose **Calm and Tame**.',
      },
      steps: {
        tr: [
          'Yabani atlar kurak ovalarda ve çayırlarda yaşar.',
          'Atından in, [[C]] ile çömel, yavaşça yaklaş.',
          'Başarı şansı %65’tir; Binicilik yeteneğinin her seviyesi %4 ekler.',
          'Önce **kementle** yakalarsan şans %25 artar.',
          'Başarırsan yeni atın olur, eski atın ahıra gider.',
        ],
        en: [
          'Wild horses live on dry plains and grasslands.',
          'Dismount, crouch with [[C]] and creep closer.',
          'The base chance is 65%; each level of Riding adds 4%.',
          'Catching it with a **lasso** first adds 25%.',
          'On success it becomes your horse and your old one goes to the stable.',
        ],
      },
      tips: {
        tr: ['Kementteki yabani at 7–10 saniye içinde kurtulur; acele et.', '**{{n:achievements.tamer}}** başarımı: {{n:achievements.tamer.perk}}.'],
        en: ['A lassoed wild horse breaks free in 7–10 seconds, so be quick.', '**{{n:achievements.tamer}}** achievement: {{n:achievements.tamer.perk}}.'],
      },
      rel: ['horse-bond', 'lasso', 'horse-buy'],
    },
    {
      id: 'horse-bond', cat: 'horse', tags: ['horse', 'bond', 'stable'],
      title: { tr: 'Atınla bağ ve at bakımı', en: 'Horse bond and care' },
      chip: { tr: 'Bağ ve bakım', en: 'Bond and care' },
      q: {
        tr: ['at bağı nasıl artar', 'atım neden kaçıyor', 'ata nasıl bakılır', 'at nasıl beslenir', 'atı fırçalamak'],
        en: ['how do I raise horse bond', 'why does my horse run away', 'how to care for my horse', 'how to feed my horse', 'brushing the horse'],
      },
      a: {
        tr: 'Atınla bağın 4 seviyedir. Birlikte yol aldıkça, okşadıkça, **At Fırçası** ile fırçaladıkça ve **saman** verdikçe bağ güçlenir.',
        en: 'Your bond has 4 levels. It grows as you ride together, pat it, brush it with a **Horse Brush** and feed it **hay**.',
      },
      steps: {
        tr: [
          'Kendi atınla her mil yaklaşık 1 puan; okşamak 3, fırçalamak 5, saman 6 puan.',
          'Seviyeler: 2 (50 puan), 3 (150), 4 (300).',
          'Saman canını 40 artırır ve dayanıklılığını doldurur; **At Toniği** dayanıklılığı doldurur.',
          'Ahırda ve demircide atını **tımar ettirebilirsin** ({{$:svc.horsecare}}).',
        ],
        en: [
          'About 1 point per mile on your own horse; patting gives 3, brushing 5, hay 6.',
          'Levels: 2 (50 points), 3 (150), 4 (300).',
          'Hay restores 40 health and refills stamina; a **Horse Tonic** refills stamina.',
          'Stables and blacksmiths can **groom** your horse ({{$:svc.horsecare}}).',
        ],
      },
      tips: {
        tr: ['Bağı 2’nin altındaki at, üstünde değilken yakında silah patlarsa kaçabilir.', 'Saman, fırça ve tonik genel mağaza ve ahırda satılır.'],
        en: ['A horse with bond below 2 may bolt at nearby gunfire when you are not riding it.', 'Hay, brushes and tonics are sold at general stores and stables.'],
      },
      rel: ['horse-call', 'horse-down', 'horse-ride'],
    },
    {
      id: 'horse-call', cat: 'horse', tags: ['horse', 'whistle'],
      title: { tr: 'Atı ıslıkla çağırma', en: 'Whistling for your horse' },
      chip: { tr: 'Islık', en: 'Whistle' },
      q: {
        tr: ['atımı nasıl çağırırım', 'atımı kaybettim', 'atım nerede', 'ıslık tuşu', 'at gelmiyor'],
        en: ['how do I call my horse', 'I lost my horse', 'where is my horse', 'whistle key', 'my horse will not come'],
      },
      a: {
        tr: '[[H]] ile ıslık çal (kolda D-pad ↑): atın yanına koşar. Çok uzaktaysa yakınına gelir. Islık 3 saniyede bir çalınır.',
        en: 'Press [[H]] to whistle (D-pad ↑ on a controller) and your horse runs to you. If it is far away it shows up nearby. You can whistle once every 3 seconds.',
      },
      steps: {
        tr: [
          'Atın radarın dışındaysa yönü radarın kenarında görünür.',
          'Atın gelmiyorsa yaralanıp yere yığılmış olabilir: At Diriltici kullan.',
          'Ray kenarında at trenin geçmesini bekler.',
        ],
        en: [
          'When your horse is off the radar, its direction shows on the radar’s rim.',
          'If it never comes it may be down and wounded: use a Horse Reviver.',
          'Near railroad tracks the horse waits for trains to pass.',
        ],
      },
      tips: {
        tr: ['Atlar binalara giremez; atını kapının önünde bırak.'],
        en: ['Horses cannot enter buildings; leave yours at the door.'],
      },
      rel: ['horse-down', 'horse-bond', 'hud'],
    },
    {
      id: 'horse-ride', cat: 'horse', tags: ['horse', 'ride', 'controls'],
      title: { tr: 'Ata binme ve sürme', en: 'Mounting and riding' },
      chip: { tr: 'Sürüş', en: 'Riding' },
      q: {
        tr: ['ata nasıl binilir', 'at nasıl sürülür', 'dörtnala nasıl gidilir', 'at geri nasıl gider', 'attan nasıl inilir'],
        en: ['how do I mount a horse', 'how to ride', 'how to gallop', 'how to back up a horse', 'how to dismount'],
      },
      a: {
        tr: 'Atın yanında [[E]] ile bin ve in. Klavyede at dizginle sürülür: [[W]] ileri, [[A]] / [[D]] sola ve sağa döner, [[S]] frendir; durunca basılı tutarsan geri gider. [[Shift]] dörtnala kaldırır.',
        en: 'Press [[E]] next to your horse to mount and dismount. On the keyboard you ride with reins: [[W]] goes forward, [[A]] / [[D]] turn left and right, [[S]] brakes; hold it when stopped to back up. [[Shift]] breaks into a gallop.',
      },
      steps: {
        tr: [
          'Dururken [[A]] / [[D]] atı yerinde döndürür; dörtnalda daha geniş döner.',
          'Kolda sol analog atı gösterdiği yöne çevirir.',
          'Eyere {{#:c.HORSE_CAP}} birim yük alınır (kişi ve iri leş 2, post ve küçük leş 1).',
          'Atlıyken [[E]]’yi basılı tutarak yanındakilere selam verebilirsin.',
        ],
        en: [
          'When standing still, [[A]] / [[D]] turn the horse in place; at a gallop it turns wider.',
          'On a controller the left stick steers the horse where you point.',
          'The saddle carries {{#:c.HORSE_CAP}} units (a person or big carcass is 2, a pelt or small carcass 1).',
          'While mounted, hold [[E]] to greet people around you.',
        ],
      },
      tips: {
        tr: ['Dörtnala giderken birine çarpmak ilk iki seferde uyarıdır, üçüncüsü saldırı sayılır.', 'Binicilik yeteneği atının hızını ve dayanıklılığını artırır.'],
        en: ['Bumping into someone at a gallop is a warning the first two times; the third counts as assault.', 'The Riding skill improves your horse’s speed and stamina.'],
      },
      rel: ['horse-bond', 'carry', 'controls'],
    },
    {
      id: 'horse-down', cat: 'horse', tags: ['horse', 'revive', 'stable'],
      title: { tr: 'Atın yaralanıp yere yığıldıysa', en: 'If your horse is wounded and down' },
      chip: { tr: 'Yaralı at', en: 'Downed horse' },
      q: {
        tr: ['atım öldü', 'atım yere yığıldı', 'at diriltici nereden alınır', 'atı nasıl iyileştiririm'],
        en: ['my horse died', 'my horse is down', 'where to buy horse reviver', 'how do I heal my horse'],
      },
      a: {
        tr: 'Atının canı biterse yere yığılır; üstündeysen düşer ve 12 can kaybedersin. **At Diriltici** ({{$:items.horse_reviver.p}}, ahır) atını %50 canla ayağa kaldırır. Yoksa ahırdan yeni bir at alırsın.',
        en: 'If your horse runs out of health it collapses; if you were riding you fall and lose 12 health. A **Horse Reviver** ({{$:items.horse_reviver.p}}, stables) gets it back up with 50% health. Otherwise buy a new horse at a stable.',
      },
      steps: {
        tr: [
          'Yaralı ata saman (+40 can) ya da At Toniği (+15 can) ver.',
          'Ahırda tımar ettirmek atını dinlendirir.',
          'Tehlikeli hayvanlardan ve çatışmadan uzaklaşmak için dörtnala kaç.',
        ],
        en: [
          'Feed a hurt horse hay (+40 health) or a Horse Tonic (+15 health).',
          'Grooming at a stable rests your horse.',
          'Gallop away from predators and gunfights.',
        ],
      },
      tips: {
        tr: ['Çantanda bir At Diriltici taşımak uzun yolculuklarda iyi fikirdir.'],
        en: ['Carrying a Horse Reviver on long trips is a good idea.'],
      },
      rel: ['horse-bond', 'horse-buy', 'predators'],
    },
    {
      id: 'wagon', cat: 'horse', tags: ['wagon', 'car', 'supply', 'buy'],
      title: { tr: 'Yük arabası ve otomobil', en: 'Freight wagon and automobile' },
      chip: { tr: 'Araba', en: 'Wagon/car' },
      q: {
        tr: ['yük arabası nereden alınır', 'otomobil nasıl alınır', 'araba nasıl sürülür', 'araba ne zaman çıkar', 'arabamı nasıl getiririm'],
        en: ['where to buy a wagon', 'how do I get a car', 'how to drive a car', 'when do cars appear', 'how to fetch my wagon'],
      },
      a: {
        tr: '**Yük arabası** ahırda {{$:c.WAGON_PRICE}}’dır ve {{#:c.WAGON_CAP}} sandık mal taşır; işletmelerine mal götürmek için idealdir. {{#:c.CAR_YEAR}} yılından sonra ahırdan bir **otomobil** de alabilirsin.',
        en: 'A **freight wagon** costs {{$:c.WAGON_PRICE}} at a stable and carries {{#:c.WAGON_CAP}} crates, ideal for supplying your businesses. After {{#:c.CAR_YEAR}} you can also buy an **automobile** at a stable.',
      },
      steps: {
        tr: [
          'Araba at gibi sürülür: [[W]] gaz, [[A]] / [[D]] direksiyon, [[S]] fren; dururken basılı tutarsan geri gider.',
          'Otomobil yalnızca giderken döner ve yorulmaz.',
          'Herhangi bir ahırda arabanı ya da otomobilini ahırın önüne getirtebilirsin ({{$:svc.fetchWagon}}).',
          '1908’den sonra yollarda otomobiller görünmeye başlar, yıllar geçtikçe çoğalır.',
        ],
        en: [
          'Drive it like a horse: [[W]] throttle, [[A]] / [[D]] steer, [[S]] brake; hold it when stopped to reverse.',
          'A car only turns while moving and never gets tired.',
          'Any stable can bring your wagon or car to its door ({{$:svc.fetchWagon}}).',
          'Cars start appearing on the roads after 1908 and grow more common over the years.',
        ],
      },
      tips: {
        tr: ['Başkasının arabasını ya da otomobilini almak hırsızlıktır.'],
        en: ['Taking someone else’s wagon or car is theft.'],
      },
      rel: ['supply', 'horse-ride', 'robbery'],
    },
    {
      id: 'train', cat: 'horse', tags: ['train', 'stagecoach', 'travel', 'price'],
      title: { tr: 'Tren ve posta arabası', en: 'Trains and stagecoaches' },
      chip: { tr: 'Tren', en: 'Train' },
      q: {
        tr: ['hızlı seyahat var mı', 'tren bileti nereden alınır', 'başka kasabaya nasıl giderim', 'posta arabası nedir', 'tren olmayan kasabaya nasıl gidilir'],
        en: ['is there fast travel', 'where to buy a train ticket', 'how do I get to another town', 'what is the stagecoach', 'how to reach a town without a train'],
      },
      a: {
        tr: 'İstasyondaki gişede **Tren Bileti Al**: bilet uzaklığa göre en az {{$:svc.trainMin}}’dir ve yol süresi ekran kararırken geçer. Tren geçmeyen kasabalara ahır ya da postaneden **posta arabası** bileti alırsın.',
        en: 'At a station’s ticket office choose **Buy a Train Ticket**: fares start at {{$:svc.trainMin}} and grow with distance, and the trip passes while the screen fades. For towns without a railroad, buy a **stagecoach** ticket at a stable or post office.',
      },
      steps: {
        tr: [
          'Posta arabası gittiğin kasabalara ve yakın komşularına sefer yapar.',
          'Posta arabası trenden yavaş ve pahalıdır; bazen tekerlek kırılır, geç varırsın.',
          'Yolculukta zaman geçer: açlık, susuzluk ve uyku da azalır.',
        ],
        en: [
          'Stagecoaches run to towns you have visited and their nearby neighbors.',
          'It is slower and pricier than the train; sometimes a wheel breaks and you arrive late.',
          'Time passes during a trip, so hunger, thirst and sleep go down too.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.towns}}** başarımı: {{n:achievements.towns.perk}}.'],
        en: ['**{{n:achievements.towns}}** achievement: {{n:achievements.towns.perk}}.'],
      },
      rel: ['carriage', 'map', 'towns'],
    },
    {
      id: 'carriage', cat: 'horse', tags: ['carriage', 'travel', 'buy', 'mansion'],
      title: { tr: 'Özel fayton', en: 'Private carriage' },
      chip: { tr: 'Fayton', en: 'Carriage' },
      q: {
        tr: ['özel fayton nasıl alınır', 'fayton nasıl çağrılır', 'arabacı', 'faytonla yolculuğu atlamak'],
        en: ['how to buy a private carriage', 'how to call the carriage', 'coachman', 'skip the carriage ride'],
      },
      a: {
        tr: 'Ahırdan **{{$:c.CARRIAGE_PRICE}}**’a çift atlı bir fayton ve arabacısını alırsın (arabacı günde {{$:c.CARRIAGE_WAGE}}). Binince gideceğin yeri seçersin; arabacı yolu kendisi sürer.',
        en: 'Buy a two-horse carriage and its driver at a stable for **{{$:c.CARRIAGE_PRICE}}** (the driver earns {{$:c.CARRIAGE_WAGE}} a day). Climb in, pick a destination and the driver takes the road for you.',
      },
      steps: {
        tr: [
          'Faytonu ahırdan, postaneden ya da malikanedeki uşaktan çağır.',
          'Hedef seç: bildiğin kasabalar, malikanen, yapıların ya da haritadaki işaretin. Yanında tahmini süre yazar.',
          'Onay tuşunu ([[Enter]]) basılı tutarsan yol atlanır; süre yine geçer.',
          '[[E]] ile istediğin yerde inersin. Atın arkadan bağlı gelir.',
        ],
        en: [
          'Call the carriage from a stable, a post office or your mansion’s butler.',
          'Choose a destination: known towns, your mansion, your buildings or your map pin, each with an estimated time.',
          'Hold the confirm key ([[Enter]]) to skip the trip; the time still passes.',
          'Press [[E]] to get off anywhere. Your horse follows, tied behind.',
        ],
      },
      tips: {
        tr: ['Aranırken ya da omzunda yükle yola çıkılmaz; kanun görünürse ya da saldırıya uğrarsan arabacı durur.', 'Arabacının ücreti iki gün ödenmezse işi bırakır.'],
        en: ['You cannot set off while wanted or carrying something on your shoulder; the driver stops if the law shows up or you are attacked.', 'A driver left unpaid for two days quits.'],
      },
      rel: ['train', 'mansion', 'horse-buy'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
