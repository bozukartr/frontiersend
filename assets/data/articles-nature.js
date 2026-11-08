/* Frontier's End Wiki — makaleler: Av ve doğa */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'hunting', cat: 'nature', tags: ['hunt', 'animal', 'skin', 'weapon'],
      title: { tr: 'Avlanma', en: 'Hunting' },
      chip: { tr: 'Avlanma', en: 'Hunting' },
      q: {
        tr: ['nasıl avlanılır', 'av hayvanları nerede', 'geyik nerede bulunur', 'hayvanlar kaçıyor', 'deri nasıl yüzülür', 'ava nasıl yaklaşılır'],
        en: ['how do I hunt', 'where are the animals', 'where to find deer', 'animals keep running away', 'how to skin an animal', 'how to sneak up on game'],
      },
      a: {
        tr: 'Vahşi hayvanlar kasabaların dışında yaşar. [[C]] ile **çömelirsen** seni yarı uzaklıktan fark ederler; sessiz bir **yayla** ya da güçlü bir tüfekle vur, sonra leşin yanında [[E]]’yi basılı tutup **Derisini Yüz**.',
        en: 'Wild animals live outside towns. **Crouch** with [[C]] and they notice you at half the distance; shoot with a quiet **bow** or a strong rifle, then hold [[E]] by the carcass and choose **Skin**.',
      },
      steps: {
        tr: [
          'Ormanda geyik ve kızıl geyik, ovada bizon ve antilop, çayırda tavşan ve yaban hindisi bulunur.',
          'Koşarken ve at sırtında daha çabuk fark edilirsin; gece biraz daha geç.',
          'Silah sesi uzaktaki ürkek hayvanları kaçırır; yayın sesi çok kısa mesafede duyulur.',
          'Derisini yüzünce post, et ve erkek geyikten boynuz alırsın.',
          'Büyük postlar çantaya sığmaz: omzuna al ya da atının eyerine yükle.',
        ],
        en: [
          'Deer and elk live in forests, bison and pronghorn on the plains, rabbits and wild turkeys in the grasslands.',
          'Running or riding gets you noticed sooner; at night a bit later.',
          'Gunshots scare off skittish animals far away; a bow is only heard up close.',
          'Skinning gives you the pelt, the meat and antlers from bucks.',
          'Large pelts do not fit in your satchel: carry them on your shoulder or load them on your saddle.',
        ],
      },
      tips: {
        tr: ['Ayı, bizon ve timsah leşi omza alınamayacak kadar iridir; önce derisini yüz.', 'Avcılık yeteneği ve **Vahşi Batı’nın Avcısı** başarımı hayvanların seni daha geç fark etmesini sağlar.'],
        en: ['Bear, bison and alligator carcasses are too heavy to shoulder; skin them first.', 'The Hunting skill and the **Hunter of the Wild West** achievement make animals notice you later.'],
      },
      rel: ['pelts', 'predators', 'weapons'],
    },
    {
      id: 'pelts', cat: 'nature', tags: ['pelt', 'sell', 'skin', 'price', 'shop', 'animal'],
      title: { tr: 'Post, leş ve et satma', en: 'Selling pelts, carcasses and meat' },
      chip: { tr: 'Post satışı', en: 'Selling pelts' },
      q: {
        tr: ['postlar nereye satılır', 'en pahalı post', 'deri nerede satılır', 'kasap ne alır', 'leş nasıl satılır'],
        en: ['where do I sell pelts', 'most valuable pelt', 'where to sell hides', 'what does the butcher buy', 'how to sell a carcass'],
      },
      a: {
        tr: 'Postları ve leşleri en iyi fiyata **Kasap & Tuzakçı** dükkânı ve kasaba dışındaki tuzakçılar alır. Atın kapıdaysa eyerdeki yükleri de içeriden satabilirsin.',
        en: 'The **Butcher & Trapper** shop and the trappers out in the wild pay best for pelts and carcasses. If your horse is at the door you can sell what is on the saddle from inside.',
      },
      steps: {
        tr: [
          'Değerli postlar: ayı ({{$:items.bear_pelt.p}}), bizon ({{$:items.bison_hide.p}}), puma ({{$:items.cougar_pelt.p}}), timsah ({{$:items.gator_skin.p}}), kurt ({{$:items.wolf_pelt.p}}), kızıl geyik ({{$:items.elk_hide.p}}).',
          'Geyik, antilop ve çakal postu yaklaşık {{$:items.deer_hide.p}}’dir.',
          'Bütün leş, derisini yüzüp parça parça satmaktan %10 daha çok getirir.',
          'Genel mağaza da post alır ama çok daha ucuza.',
        ],
        en: [
          'Valuable pelts: bear ({{$:items.bear_pelt.p}}), bison ({{$:items.bison_hide.p}}), cougar ({{$:items.cougar_pelt.p}}), alligator ({{$:items.gator_skin.p}}), wolf ({{$:items.wolf_pelt.p}}), elk ({{$:items.elk_hide.p}}).',
          'Deer, pronghorn and coyote pelts fetch about {{$:items.deer_hide.p}}.',
          'A whole carcass sells for 10% more than its pelt and meat sold separately.',
          'General stores buy pelts too, but for much less.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.hunt25}}** başarımı: {{n:achievements.hunt25.perk}}.', 'Bıraktığın leş uzaklaşınca bir süre sonra kaybolur.'],
        en: ['**{{n:achievements.hunt25}}** achievement: {{n:achievements.hunt25.perk}}.', 'A carcass you leave behind disappears after a while once you move away.'],
      },
      rel: ['hunting', 'carry', 'trade'],
    },
    {
      id: 'predators', cat: 'nature', tags: ['predator', 'animal', 'health'],
      title: { tr: 'Tehlikeli hayvanlar', en: 'Dangerous animals' },
      chip: { tr: 'Tehlikeli hayvanlar', en: 'Predators' },
      q: {
        tr: ['ayı saldırıyor ne yapmalıyım', 'kurtlardan nasıl kaçılır', 'puma nerede', 'timsah', 'hayvan saldırısı'],
        en: ['a bear is attacking me what do I do', 'how to escape wolves', 'where are cougars', 'alligator', 'animal attack'],
      },
      a: {
        tr: 'Kurt, boz ayı, puma, yaban domuzu, timsah ve çıngıraklı yılan saldırgandır; çakal gece ya da yaralıyken saldırır. Onlarla yakın dövüşe girme: **uzaktan vur** ya da **atla uzaklaş**.',
        en: 'Wolves, grizzly bears, cougars, wild boars, alligators and rattlesnakes are aggressive; coyotes attack at night or when you are hurt. Never fight them in melee: **shoot from range** or **ride away**.',
      },
      steps: {
        tr: [
          'Kurtlar ve ayılar orman, karlı dağ ve kayalıklarda; pumalar kayalıklarda yaşar.',
          'Timsahlar ve yaban domuzları bataklıkta; timsahlar sığ suya da girer.',
          'Yılanlar çöl, kızıl kayalık ve bataklıkta; at sırtındayken seni zehirleyemezler.',
          'Gece kurt ve çakal daha sık görülür.',
        ],
        en: [
          'Wolves and bears roam forests, snowy mountains and rocky ground; cougars live among the rocks.',
          'Alligators and boars live in swamps; alligators also enter shallow water.',
          'Snakes live in deserts, red rock and swamps; they cannot poison you on horseback.',
          'Wolves and coyotes are more common at night.',
        ],
      },
      tips: {
        tr: ['Hayvanlar derin suya girmez.', 'Uzun yolda panzehir ve sağlık iksiri taşı.'],
        en: ['Animals do not enter deep water.', 'Carry antidote and health cures on long trips.'],
      },
      rel: ['poison', 'hunting', 'health'],
    },
    {
      id: 'fishing', cat: 'nature', tags: ['fish', 'buy'],
      title: { tr: 'Balık tutma', en: 'Fishing' },
      chip: { tr: 'Balık', en: 'Fishing' },
      q: {
        tr: ['balık nasıl tutulur', 'olta nereden alınır', 'balık kaçıyor', 'misina koptu', 'yem nereden alınır', 'somon nerede'],
        en: ['how do I fish', 'where to buy a fishing rod', 'the fish keeps escaping', 'my line snapped', 'where to buy bait', 'where are salmon'],
      },
      a: {
        tr: 'Bir **olta** al ({{$:items.fishing_rod.p}}; genel mağaza ya da liman tüccarı). Nehir ya da göl kenarında [[E]] → **Balık Tut**. Oltayı atmak için onay tuşunu basılı tutup bırak, balık vurunca hemen bas, sonra misinayı germeden makarayı sar.',
        en: 'Buy a **fishing rod** ({{$:items.fishing_rod.p}}; general store or dock merchant). At a river or lake press [[E]] → **Fish**. Hold and release the confirm key to cast, press it right when a fish bites, then reel in without snapping the line.',
      },
      steps: {
        tr: [
          'Balık vurunca 1 saniye içinde bas; erken çekersen kaçar.',
          'Sarmak için tuşu basılı tut: balık yaklaşır ama misina gerilir. Gerilim dolarsa misina kopar.',
          'Bırakınca gerilim düşer ama balık uzaklaşır; çok uzaklaşırsa kaçar.',
          '**Solucan yem** ({{$:items.bait.p}}) beklemeyi kısaltır.',
          'Soğuk kuzey sularında alabalık ve somon, sıcak güney sularında ve bataklıkta yayın balığı ve karabalık vurur.',
        ],
        en: [
          'When a fish bites, press within about a second; strike too early and it gets away.',
          'Hold the key to reel: the fish comes closer but the line tightens. If the tension maxes out, it snaps.',
          'Letting go eases the tension but the fish swims away; too far and it escapes.',
          '**Worm bait** ({{$:items.bait.p}}) shortens the wait.',
          'Cold northern waters hold trout and salmon; warm southern waters and swamps hold catfish and bass.',
        ],
      },
      tips: {
        tr: ['Çiğ balık hasta edebilir; kampta pişir.', 'Balığı en iyi liman tüccarı ve kasap alır.'],
        en: ['Raw fish can make you sick; cook it at camp.', 'Dock merchants and butchers pay best for fish.'],
      },
      rel: ['cooking', 'money', 'achievements'],
    },
    {
      id: 'legends', cat: 'nature', tags: ['legend'],
      title: { tr: 'Efsaneler: nadir av ve balıklar', en: 'Legends of the wild' },
      chip: { tr: 'Efsaneler', en: 'Legends' },
      q: {
        tr: ['efsanevi hayvanlar nerede', 'beyaz kurt nerede', 'efsanevi balık nasıl tutulur', 'efsane söylentisi nereden duyulur', 'arama çemberi nedir', 'efsanevi post ne işe yarar'],
        en: ['where are the legendary animals', 'where is the white wolf', 'how to land a legendary catch', 'where to hear legend rumors', 'what is the search circle', 'what are legendary pelts for'],
      },
      a: {
        tr: 'Dünyada birkaç gerçekten nadir yer var: altı **efsanevi hayvanın** ini ve dört **efsanevi balığın** suyu. Her biri yalnızca belli bir saatte ya da havada görünür ve bir hayatta bir kez avlanır ya da tutulur. Söylentiyle başla, izleri takip et, inini bul.',
        en: 'The world holds a few truly rare places: the lairs of six **legendary animals** and the waters of four **legendary fish**. Each shows itself only at a certain hour or in certain weather and can be hunted or caught once per life. Start with a rumor, follow the signs, find the lair.',
      },
      steps: {
        tr: [
          '**Söylenti**: barmen ve münzevi arada bir efsane anlatır, gazetenin av köşesinde de çıkabilir. Tuzakçı kulübesinde **Av Efsanelerini Sor**, liman deposunda **Balıkçı Efsanelerini Dinle** ({{$:svc.tales}}) bir efsaneyi kesin anlatır. Haritanda bir arama çemberi açılır.',
          '**İzler**: inin çevresinde üç iz var (tüy tutamı, pençe izi, yarım leş, sürünme izi). Yanında [[E]] basılı tutup **İzi İncele**: her iz çemberi daraltır, üçüncüsünde in haritaya işlenir.',
          '**Vakit**: efsane yalnızca vakti gelince ininin yakınında belirir. Vakti değilken ine varırsan ne zaman geldiği söylenir.',
          '**Av**: derisini yüz. Eşsiz post (büyükleri omza alınır, yere bıraksan da kaybolmaz), iki kat et ve dördünden ganimet verir. Kemente dayanmaz.',
          '**Efsanevi balık**: kendi suyunda ve vaktinde olta vurursa çoğu zaman odur. Çok sert çeker; **Kaçmaya çalışıyor!** yazınca makarayı bırak. Hep sararsan misina kopar ve o gün bir daha vurmaz.',
        ],
        en: [
          '**Rumors**: the bartender and the hermit now and then tell of a legend, and one may turn up in the newspaper’s hunting column. At a trapper’s cabin **Ask About Hunting Legends**, at the dock warehouse **Hear the Anglers’ Legends** ({{$:svc.tales}}) for a sure tale. A search circle opens on your map.',
          '**Signs**: three signs lie around each lair (a tuft of fur, claw marks, a half-eaten carcass, a drag mark). Hold [[E]] beside one to **Examine the Sign**: each narrows the circle and the third marks the lair on your map.',
          '**Hour**: a legend appears near its lair only when its hour comes. Reach the lair at the wrong time and you learn when it comes.',
          '**The hunt**: skin it. You get a one-of-a-kind pelt (large ones go on your shoulder and never vanish, even set down), double meat and, from four of them, a trophy. No lasso holds it.',
          '**Legendary catch**: a bite in its own waters at its hour is usually the legend. It pulls very hard; when **It’s making a run!** appears, let the reel go. Keep reeling and the line snaps, and it won’t bite again that day.',
        ],
      },
      tips: {
        tr: [
          '**{{n:legends.ghost}}**: {{s:legends.ghost.region}}, {{n:legendWhen.night}}. Dev beyaz kurt; üç kurtluk sürüsüyle gelir, vurup çekilir.',
          '**{{n:legends.scar}}**: {{s:legends.scar.region}}, {{n:legendWhen.day}}. Dev boz ayı; canı yarıya inince kudurur.',
          '**{{n:legends.gold}}**: {{s:legends.gold.region}}, {{n:legendWhen.dawn}} ya da {{n:legendWhen.dusk}}. Altın tüylü puma; yaralanınca çekilip yeniden saldırır.',
          '**{{n:legends.crown}}**: {{s:legends.crown.region}}, {{n:legendWhen.dawn}} ya da {{n:legendWhen.fog}}. Dev kızıl geyik; çok ürkek, kaçarsa o gün dönmez.',
          '**{{n:legends.iron}}**: {{s:legends.iron.region}}, {{n:legendWhen.day}}. Kara bizon boğası; vurulunca kaçmaz, saldırır.',
          '**{{n:legends.tooth}}**: {{s:legends.tooth.region}}, {{n:legendWhen.night}} ya da {{n:legendWhen.rain}}. Bataklığın en yaşlı timsahı.',
          'Sular: **{{n:legendFish.lakeghost}}** ({{s:legendFish.lakeghost.region}}, {{n:legendWhen.night}}), **{{n:legendFish.copper}}** ({{s:legendFish.copper.region}}, {{n:legendWhen.dawn}}), **{{n:legendFish.whisker}}** ({{s:legendFish.whisker.region}}, {{n:legendWhen.rain}}), **{{n:legendFish.jaw}}** ({{s:legendFish.jaw.region}}, {{n:legendWhen.dusk}}).',
          'Terzi her efsanevi posttan eşsiz bir giysi diker. Başarımlar: {{n:achievements.legend1}}, {{n:achievements.legend6}}, {{n:achievements.legendfish}}.',
        ],
        en: [
          '**{{n:legends.ghost}}**: {{s:legends.ghost.region}}, {{n:legendWhen.night}}. A giant white wolf; comes with a pack of three, strikes and pulls back.',
          '**{{n:legends.scar}}**: {{s:legends.scar.region}}, {{n:legendWhen.day}}. A giant grizzly; enraged once half its life is gone.',
          '**{{n:legends.gold}}**: {{s:legends.gold.region}}, {{n:legendWhen.dawn}} or {{n:legendWhen.dusk}}. A golden-furred cougar; wounded, it slips away and strikes again.',
          '**{{n:legends.crown}}**: {{s:legends.crown.region}}, {{n:legendWhen.dawn}} or {{n:legendWhen.fog}}. A giant elk; very skittish, once it flees it won’t return that day.',
          '**{{n:legends.iron}}**: {{s:legends.iron.region}}, {{n:legendWhen.day}}. A black bison bull; shot, it doesn’t run but charges.',
          '**{{n:legends.tooth}}**: {{s:legends.tooth.region}}, {{n:legendWhen.night}} or {{n:legendWhen.rain}}. The swamp’s oldest alligator.',
          'Waters: **{{n:legendFish.lakeghost}}** ({{s:legendFish.lakeghost.region}}, {{n:legendWhen.night}}), **{{n:legendFish.copper}}** ({{s:legendFish.copper.region}}, {{n:legendWhen.dawn}}), **{{n:legendFish.whisker}}** ({{s:legendFish.whisker.region}}, {{n:legendWhen.rain}}), **{{n:legendFish.jaw}}** ({{s:legendFish.jaw.region}}, {{n:legendWhen.dusk}}).',
          'A tailor sews a unique garment from every legendary pelt. Achievements: {{n:achievements.legend1}}, {{n:achievements.legend6}}, {{n:achievements.legendfish}}.',
        ],
      },
      rel: ['hunting', 'fishing', 'crafting', 'predators'],
    },
    {
      id: 'gold', cat: 'nature', tags: ['gold', 'money', 'buy'],
      title: { tr: 'Altın eleme', en: 'Panning for gold' },
      chip: { tr: 'Altın', en: 'Gold' },
      q: {
        tr: ['altın nasıl bulunur', 'altın eleği nereden alınır', 'altın nereye satılır', 'nehirde altın'],
        en: ['how do I find gold', 'where to buy a gold pan', 'where do I sell gold', 'gold in the river'],
      },
      a: {
        tr: 'Bir **Altın Eleği** al ({{$:items.gold_pan.p}}; genel mağaza, demirci, maden deposu ya da altın arayıcıları). Nehir kenarında [[E]]’yi basılı tutup **Altın Ele**. Şansın yaver giderse tanesi {{$:items.gold_nugget.p}} eden **altın parçası** bulursun.',
        en: 'Buy a **Gold Pan** ({{$:items.gold_pan.p}}; general stores, blacksmiths, mine supply or prospectors). At a river, hold [[E]] and choose **Pan for Gold**. With luck you find **gold nuggets** worth {{$:items.gold_nugget.p}} each.',
      },
      steps: {
        tr: [
          'Elemek biraz zaman alır; tekrar tekrar dene.',
          'Altını en iyi kaçakçı ve altın arayıcıları alır, maden deposu da iyi öder.',
        ],
        en: [
          'Panning takes a little time; keep trying.',
          'The fence and the prospectors pay best for gold; mine supply pays well too.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.gold}}** başarımı: {{n:achievements.gold.perk}}.'],
        en: ['**{{n:achievements.gold}}** achievement: {{n:achievements.gold.perk}}.'],
      },
      rel: ['ore', 'money', 'trade'],
    },
    {
      id: 'ore', cat: 'nature', tags: ['ore', 'job', 'buy'],
      title: { tr: 'Cevher kazma ve maden', en: 'Mining ore' },
      chip: { tr: 'Cevher', en: 'Ore' },
      q: {
        tr: ['cevher nasıl kazılır', 'kazma nereden alınır', 'gümüş nerede bulunur', 'madende nasıl çalışılır', 'terk edilmiş maden'],
        en: ['how do I mine ore', 'where to buy a pickaxe', 'where to find silver', 'how to work in the mine', 'abandoned mine'],
      },
      a: {
        tr: 'Bir **kazma** al ({{$:items.pickaxe.p}}) ve kayalık yerlerdeki **cevher kayalarının** yanında [[E]] ile kaz. Demir ve gümüş cevheri çıkar; gümüş daha değerlidir.',
        en: 'Buy a **pickaxe** ({{$:items.pickaxe.p}}) and dig at **ore rocks** on rocky ground with [[E]]. You get iron and silver ore; silver is worth more.',
      },
      steps: {
        tr: [
          'Kazmayı genel mağaza, demirci, maden deposu ve altın arayıcıları satar.',
          'Kasabaların maden ofisinde vardiyalı çalışıp hem ücret hem cevher kazanabilirsin.',
          'Terk edilmiş maden galerilerine **fenerle** gir.',
        ],
        en: [
          'General stores, blacksmiths, mine supply and prospectors sell pickaxes.',
          'At a town’s mining office you can work shifts for wages and some ore.',
          'Bring a **lantern** into abandoned mine tunnels.',
        ],
      },
      tips: {
        tr: ['Cevheri kaçakçı ve maden deposu iyi fiyata alır.'],
        en: ['The fence and mine supply pay well for ore.'],
      },
      rel: ['jobs', 'gold', 'explore'],
    },
    {
      id: 'herbs', cat: 'nature', tags: ['herb', 'craft', 'sell'],
      title: { tr: 'Bitki toplama', en: 'Gathering herbs' },
      chip: { tr: 'Bitkiler', en: 'Herbs' },
      q: {
        tr: ['bitki nasıl toplanır', 'şifalı bitkiler nerede', 'ginseng nerede', 'bitkiler ne işe yarar', 'bitki nereye satılır'],
        en: ['how do I gather herbs', 'where are medicinal plants', 'where is ginseng', 'what are herbs for', 'where to sell herbs'],
      },
      a: {
        tr: 'Doğadaki bitkilerin yanına gidip [[E]] ile topla. Civanperçemi, adaçayı, nane, kekik, ipekotu, ginseng, mantar ve yaban mersini toplarsın; bunlardan ilaç ve kahve yapar ya da satarsın.',
        en: 'Walk up to plants in the wild and pick them with [[E]]. You find yarrow, sage, mint, oregano, milkweed, ginseng, mushrooms and berries, which you can craft into medicine and coffee or sell.',
      },
      steps: {
        tr: [
          'Bazı bitkiler doğrudan da işe yarar: civanperçemi biraz can, ginseng dayanıklılık verir.',
          'Tarifler için kamp ateşinde **Pişir ve Üret**.',
          'Bitkileri en iyi münzevi, eczane ve doktor alır.',
        ],
        en: [
          'Some herbs help on their own: yarrow restores a little health, ginseng gives stamina.',
          'For recipes, use **Cook and Craft** at a campfire.',
          'The hermit, pharmacies and doctors pay best for herbs.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.herbs}}** başarımı: {{n:achievements.herbs.perk}}.', 'Kır çiçeği güzel bir hediyedir.'],
        en: ['**{{n:achievements.herbs}}** achievement: {{n:achievements.herbs.perk}}.', 'Wildflowers make a nice gift.'],
      },
      rel: ['cooking', 'medicine', 'romance'],
    },
    {
      id: 'treasure', cat: 'nature', tags: ['treasure', 'collectible', 'money'],
      title: { tr: 'Hazine haritaları ve koleksiyon eşyaları', en: 'Treasure maps and collectibles' },
      chip: { tr: 'Hazine', en: 'Treasure' },
      q: {
        tr: ['hazine haritası nasıl bulunur', 'hazine nasıl kazılır', 'kürek nereden alınır', 'dinozor kemiği nereye satılır', 'koleksiyon eşyaları'],
        en: ['how do I find a treasure map', 'how to dig up treasure', 'where to buy a shovel', 'where to sell dinosaur bones', 'collectibles'],
      },
      a: {
        tr: 'Hazine haritaları sandıklardan ve ödül hedeflerinin üstünden çıkabilir, münzevi de satar. Haritayı çantadan aç, işaretli yere git; yaklaşınca toprakta bir tümsek görünür, **kürekle** kaz.',
        en: 'Treasure maps can turn up in chests and on bounty targets, and the hermit sells them. Open the map from your satchel and go to the marked spot; up close a mound appears in the ground — dig it up with a **shovel**.',
      },
      steps: {
        tr: [
          'Kürek ({{$:items.shovel.p}}) genel mağaza, demirci ve altın arayıcılarında satılır.',
          'Hazineden para, değerli eşya ve bazen bir **altın külçe** ({{$:items.gold_bar.p}}) çıkar.',
          'Koleksiyon eşyaları: ok ucu, dinozor kemiği, göktaşı parçası, eski sikke, sigara kartı.',
          'Koleksiyon eşyalarını en iyi kervan, münzevi ve kaçakçı alır.',
        ],
        en: [
          'Shovels ({{$:items.shovel.p}}) are sold at general stores, blacksmiths and prospectors.',
          'Treasure holds cash, valuables and sometimes a **gold bar** ({{$:items.gold_bar.p}}).',
          'Collectibles: arrowheads, dinosaur bones, meteorite fragments, old coins, cigarette cards.',
          'Caravans, the hermit and the fence pay best for collectibles.',
        ],
      },
      tips: {
        tr: ['Dinozor kemikleri Kemik Vadisi’nde, göktaşı parçası Göktaşı Krateri’nde bulunur.'],
        en: ['Dinosaur bones are found in the Valley of Bones, meteorite fragments at the Meteor Crater.'],
      },
      rel: ['explore', 'bounty', 'trade'],
    },
    {
      id: 'explore', cat: 'nature', tags: ['explore', 'map'],
      title: { tr: 'Keşfedilecek yerler', en: 'Places to discover' },
      chip: { tr: 'Keşif', en: 'Exploring' },
      q: {
        tr: ['keşfedilecek yerler neler', 'önemli yerler', 'sıcak kaynak nerede', 'deniz feneri', 'harita nasıl açılır keşif'],
        en: ['what places can I discover', 'landmarks', 'where are the hot springs', 'lighthouse', 'how to reveal the map'],
      },
      a: {
        tr: 'Dünyada 25 önemli yer vardır: göktaşı krateri, bin yıllık sekoya, misyon harabesi, hayalet kasaba, terk edilmiş maden, sıcak kaynaklar, kemik vadisi, karaya oturmuş gemi ve daha fazlası. Gezdikçe harita açılır.',
        en: 'The world has 25 landmarks: a meteor crater, an ancient sequoia, mission ruins, a ghost town, an abandoned mine, hot springs, a valley of bones, a beached ship and more. The map fills in as you travel.',
      },
      steps: {
        tr: [
          '**Sıcak Kaynaklar**’da dinlenmek canını doldurur, seni temizler ve ısıtır.',
          'Deniz fenerine tırmanınca kıyı haritası açılır.',
          'Harabeleri arayabilir, terk edilmiş madene fenerle girebilirsin.',
          'Saloonda söylenti dinlemek ({{$:svc.rumor}}) bilinmeyen bir yeri haritada işaretler.',
        ],
        en: [
          'Resting at the **Hot Springs** restores health, cleans you and warms you up.',
          'Climbing the lighthouse reveals the coastline on your map.',
          'You can search ruins and enter the abandoned mine with a lantern.',
          'Listening for rumors at a saloon ({{$:svc.rumor}}) marks an unknown place on your map.',
        ],
      },
      tips: {
        tr: ['**{{n:achievements.explore5}}** başarımı: {{n:achievements.explore5.perk}}. **{{n:achievements.explore20}}** başarımı: {{n:achievements.explore20.perk}}.'],
        en: ['**{{n:achievements.explore5}}** achievement: {{n:achievements.explore5.perk}}. **{{n:achievements.explore20}}** achievement: {{n:achievements.explore20.perk}}.'],
      },
      rel: ['map', 'binoculars', 'treasure'],
    },
    {
      id: 'binoculars', cat: 'nature', tags: ['binoculars', 'explore', 'hunt'],
      title: { tr: 'Dürbün', en: 'Binoculars' },
      chip: { tr: 'Dürbün', en: 'Binoculars' },
      q: {
        tr: ['dürbün nasıl kullanılır', 'dürbün nereden alınır', 'uzağı nasıl görürüm'],
        en: ['how to use binoculars', 'where to buy binoculars', 'how can I see far away'],
      },
      a: {
        tr: '**Dürbün** ({{$:items.binoculars.p}}; genel mağaza, silahçı, kervan, altın arayıcıları) çarktan ya da çantadan kullanılır. Durup uzağa bakarsın; hayvanların ve dikkat çeken insanların adları yazar, gördüğün yerler haritada işaretlenir.',
        en: '**Binoculars** ({{$:items.binoculars.p}}; general store, gunsmith, caravan, prospectors) are used from the wheel or satchel. Stand still and look far ahead; animals and notable people are labeled, and places you spot get marked on your map.',
      },
      steps: {
        tr: [
          'Fareyle, yön tuşlarıyla ya da çubukla bakış yönünü kaydır.',
          'Aranan kişiler ve haydutların adı kırmızı yazar.',
          '[[Esc]], sağ tık ya da hasar almak dürbünü indirir.',
        ],
        en: [
          'Pan the view with the mouse, arrow keys or a stick.',
          'Wanted targets and bandits are labeled in red.',
          '[[Esc]], right-click or taking damage lowers the binoculars.',
        ],
      },
      tips: {
        tr: ['At sırtında dürbün kullanılamaz.'],
        en: ['You cannot use binoculars on horseback.'],
      },
      rel: ['explore', 'hunting', 'bounty'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
