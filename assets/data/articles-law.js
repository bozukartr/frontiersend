/* Frontier's End Wiki — makaleler: Kanun ve suç */
(function (root) {
  'use strict';
  const A = [
    {
      id: 'wanted', cat: 'law', tags: ['wanted', 'witness', 'bounty'],
      title: { tr: 'Aranma ve kanundan kurtulma', en: 'Being wanted and losing the law' },
      chip: { tr: 'Aranma', en: 'Wanted' },
      q: {
        tr: ['aranmaktan nasıl kurtulurum', 'kanundan nasıl kaçılır', 'aranma seviyesi nasıl düşer', 'şerif peşimde', 'ödülümü nasıl öderim'],
        en: ['how do I lose my wanted level', 'how to escape the law', 'how to get rid of wanted stars', 'the sheriff is after me', 'how do I pay my bounty'],
      },
      a: {
        tr: 'Radardaki **kırmızı alan**, kanunun seni en son gördüğü yerin çevresidir. Bu alanın dışına çık ve **12 saniye görünmeden kal**: aranman biter. Ama başındaki ödül kalır; onu şerif ofisinde ödersin.',
        en: 'The **red area** on the radar is where the law last saw you. Get out of it and **stay unseen for 12 seconds** and the search ends. Your bounty remains, though; pay it off at a sheriff’s office.',
      },
      steps: {
        tr: [
          'Suçunu gören tanık önce en yakın kanun adamına ya da şerif ofisine koşar.',
          'Tanık ulaşmadan onu durdurursan (silah doğrultup [[E]] ile tehdit, rüşvet) suç kayda geçmez.',
          'Kırmızı alan her yıldızda büyür.',
          'Ödülü şerif ofisinde öde ya da teslim ol (para cezası ya da birkaç gün hapis).',
        ],
        en: [
          'A witness first runs to the nearest lawman or sheriff’s office.',
          'Stop them before they get there (aim and intimidate with [[E]], or bribe them) and the crime is never reported.',
          'The red area grows with each star.',
          'Pay the bounty at a sheriff’s office or surrender (a fine or a few days in jail).',
        ],
      },
      tips: {
        tr: ['Kanun suç anındaki şapkanı ve paltonu hatırlar; kıyafet değiştirmek tanınmanı zorlaştırır.', 'Kanun adamlarının gözü önündeki suçlar ve soygunlar anında bildirilir.'],
        en: ['The law remembers the hat and coat you wore; changing clothes makes you harder to recognize.', 'Crimes in front of lawmen, and robberies, are reported instantly.'],
      },
      rel: ['surrender', 'mask', 'bountyhunters'],
    },
    {
      id: 'surrender', cat: 'law', tags: ['surrender', 'wanted'],
      title: { tr: 'Teslim olma, ceza ve hapis', en: 'Surrendering, fines and jail' },
      chip: { tr: 'Teslim olma', en: 'Surrender' },
      q: {
        tr: ['nasıl teslim olunur', 'hapse girersem ne olur', 'şerif ofisinde ateşkes', 'kanun adamı silah doğrultuyor', 'tutuklandım'],
        en: ['how do I surrender', 'what happens in jail', 'truce at the sheriff office', 'a lawman is pointing a gun at me', 'I got arrested'],
      },
      a: {
        tr: 'Düşük aranmada (1–2 yıldız) kanun adamları önce silah doğrultup teslim olmanı ister. [[E]]’yi **basılı tutarak** teslim olursun; uzaktan ve at üstünden de olur. Sonra ya ödülü ceza olarak ödersin ya da 1–7 gün hapis yatarsın.',
        en: 'At low wanted levels (1–2 stars) lawmen first point their guns and order you to surrender. **Hold** [[E]] to give up; it works from a distance and on horseback too. Then you either pay the bounty as a fine or spend 1–7 days in jail.',
      },
      steps: {
        tr: [
          'Aranırken şerif ofisine kendi ayağınla girersen kanun **30 saniye** ateş etmez.',
          'O sürede kanun adamının yanında ya da şerifin masasında **Teslim Ol**.',
          'Ofisten çıkınca süre durur; ateş etmek ya da suç işlemek ateşkesi bozar.',
          'Aranmıyor ama başında ödül varsa şerif seni masaya çağırır, ödülü orada ödersin.',
        ],
        en: [
          'Walk into a sheriff’s office while wanted and the law holds fire for **30 seconds**.',
          'In that time choose **Surrender** next to a lawman or at the sheriff’s desk.',
          'The timer pauses when you step outside; shooting or committing a crime breaks the truce.',
          'If you are not wanted but have a bounty, the sheriff calls you over to pay it at the desk.',
        ],
      },
      tips: {
        tr: ['Ateş edersen, kanun adamına silah doğrultursan ya da kaçarsan ateş açarlar. Cinayet ve kanun adamına saldırı doğrudan çatışma başlatır.'],
        en: ['Shoot, aim at a lawman or run and they open fire. Murder or attacking a lawman starts a gunfight right away.'],
      },
      rel: ['wanted', 'bribery', 'bountyhunters'],
    },
    {
      id: 'bountyhunters', cat: 'law', tags: ['bountyhunter', 'bounty', 'wanted'],
      title: { tr: 'Peşindeki ödül avcıları', en: 'Bounty hunters on your trail' },
      chip: { tr: 'Ödül avcıları', en: 'Bounty hunters' },
      q: {
        tr: ['ödül avcıları peşimde', 'ödül avcılarından nasıl kurtulurum', 'ödül avcısını öldürmek suç mu', 'neden sürekli saldırıya uğruyorum'],
        en: ['bounty hunters are after me', 'how to get rid of bounty hunters', 'is killing bounty hunters a crime', 'why do I keep getting attacked'],
      },
      a: {
        tr: 'Başında **$20 ya da daha fazla** ödül varken kasaba dışında 2–4 kişilik ödül avcısı grupları çıkar; ödül büyüdükçe daha sık gelirler. Önce yaklaşıp seslenirler ve bir süre beklerler.',
        en: 'While your bounty is **$20 or more**, groups of 2–4 bounty hunters show up outside towns, more often as the bounty grows. They ride up, call out and wait a moment first.',
      },
      steps: {
        tr: [
          '[[E]] **basılı**: teslim olursun (tutuklanma menüsü açılır).',
          '[[E]] **kısa**: seçeneklerden ödülün yaklaşık %60’ını verip kurtulursun (ödül başında kalır).',
          'Kaçarsan, onlara nişan alırsan ya da süre dolarsa ateş açarlar.',
          'Onları vurmak suç değildir.',
        ],
        en: [
          'Hold [[E]] to surrender (the arrest menu opens).',
          'Tap [[E]] for options and pay about 60% of the bounty to send them away (the bounty stays on you).',
          'Run, aim at them or let the time run out and they open fire.',
          'Shooting them is not a crime.',
        ],
      },
      tips: {
        tr: ['Ödülünü şerif ofisinde ödersen peşini bırakırlar.', 'Korumalı birinin peşine ödül avcıları daha seyrek düşer.'],
        en: ['Pay off your bounty at a sheriff’s office and they stop coming.', 'Bounty hunters bother people with bodyguards less often.'],
      },
      rel: ['wanted', 'surrender', 'guards'],
    },
    {
      id: 'mask', cat: 'law', tags: ['mask', 'wanted', 'witness', 'clothing'],
      title: { tr: 'Maske ve kılık', en: 'Masks and disguise' },
      chip: { tr: 'Maske', en: 'Mask' },
      q: {
        tr: ['maske nasıl takılır', 'maske ne işe yarar', 'bandana nereden alınır', 'tanınmadan suç işlemek', 'kimliğim açığa çıktı'],
        en: ['how do I wear a mask', 'what does a mask do', 'where to buy a bandana', 'committing crimes without being recognized', 'my identity was revealed'],
      },
      a: {
        tr: '[[V]] ile maskeni tak ya da çıkar. Maskeliyken işlediğin suçlar sana değil, **“maskeli bir yabancıya”** yazılır. Kimse görmeden maskeni çıkarırsan izini kaybederler.',
        en: 'Press [[V]] to put your mask on or take it off. Crimes committed while masked go to **“a masked stranger”**, not you. Take it off where nobody sees and they lose your trail.',
      },
      steps: {
        tr: [
          '**Bandana** (30¢): genel mağaza, terzi, kaçakçı, kervan. **Çuval maske** (10¢): kaçakçı.',
          'Maskeyi takarken görülürsen işe yaramaz.',
          'Maskeni çıkarırken biri görürse kimliğin açığa çıkar, ödül senin adına geçer.',
        ],
        en: [
          '**Bandana** (30¢): general store, tailor, fence, caravan. **Sack mask** (10¢): fence.',
          'If someone sees you put the mask on, it is useless.',
          'If someone sees you take it off, your identity is revealed and the bounty goes to your name.',
        ],
      },
      tips: {
        tr: ['Dükkânlar maskeli müşteriye hizmet etmez (kaçakçı hariç); maskeliyken rüşvet de olmaz.'],
        en: ['Shops refuse masked customers (except the fence), and you cannot bribe while masked.'],
      },
      rel: ['wanted', 'robbery', 'clothes'],
    },
    {
      id: 'lockpick', cat: 'law', tags: ['lockpick', 'rob'],
      title: { tr: 'Kilitli kapılar ve maymuncuk', en: 'Locked doors and lockpicks' },
      chip: { tr: 'Maymuncuk', en: 'Lockpick' },
      q: {
        tr: ['kilitli kapı nasıl açılır', 'maymuncuk nereden alınır', 'dükkan kapalı ne yapmalıyım', 'eve nasıl girilir', 'kapı nasıl kırılır'],
        en: ['how do I open a locked door', 'where to buy a lockpick', 'the shop is closed what now', 'how to get into a house', 'how to break down a door'],
      },
      a: {
        tr: 'Evler kilitlidir, dükkânlar gece kapanır. Kapıyı çalabilir, **kırabilir** ya da bir **maymuncukla** sessizce açabilirsin. Maymuncuğu kaçakçı ve seyyar satıcı satar ($1).',
        en: 'Houses are locked and shops close at night. You can knock, **break the door down** or open it quietly with a **lockpick**. Fences and peddlers sell lockpicks ($1).',
      },
      steps: {
        tr: [
          'Kapıda **Maymuncukla Aç**’ı seç.',
          'Gösterge yeşil bölgedeyken basarak pimleri yerine oturt (ev 3, dükkân 4, banka 5 pim).',
          'Iskalarsan kilit tıkırdar, maymuncuk kırılabilir.',
        ],
        en: [
          'Choose **Pick the Lock** at the door.',
          'Press while the gauge is in the green zone to set each pin (house 3, shop 4, bank 5 pins).',
          'Miss and the lock rattles — the pick may break.',
        ],
      },
      tips: {
        tr: ['Kapıyı kırmak ses çıkarır, maymuncuk çıkarmaz; ama görülürsen ikisi de suçtur.', 'Kapanış saatinde içerideysen kapıdan rahatça çıkabilirsin.'],
        en: ['Breaking a door is loud, picking is silent; both are crimes if someone sees you.', 'If you are inside at closing time you can still walk out the door.'],
      },
      rel: ['robbery', 'wanted', 'mask'],
    },
    {
      id: 'robbery', cat: 'law', tags: ['rob', 'wanted', 'money'],
      title: { tr: 'Soygun', en: 'Robbery' },
      chip: { tr: 'Soygun', en: 'Robbery' },
      q: {
        tr: ['dükkan nasıl soyulur', 'banka soygunu', 'yol soygunu', 'birini nasıl soyarım', 'posta arabası soymak'],
        en: ['how do I rob a store', 'bank robbery', 'highway robbery', 'how to rob someone', 'robbing a stagecoach'],
      },
      a: {
        tr: 'Tezgâhta **Dükkanı Soy** ya da bankada **Bankayı Soy** seçeneği vardır; birine silah doğrultup [[E]] ile **Soy** da diyebilirsin. Soygunlar anında bildirilir, bu yüzden maske ve kaçış planı şarttır.',
        en: 'Shop counters offer **Rob the Store** and banks **Rob the Bank**; you can also aim at someone and press [[E]] → **Rob**. Robberies are reported immediately, so bring a mask and an escape plan.',
      },
      steps: {
        tr: [
          'Soyulan dükkânın kasası boşalır ve ancak 3 gün sonra dolar; bankanın kasası 7 günde yenilenir.',
          'Yoldaki yük ve posta arabalarının sürücüsünü indirip yükünü arayabilirsin (soygun ve at hırsızlığı sayılır).',
          'Kendi işletmeni soyamazsın.',
        ],
        en: [
          'A robbed shop’s till is empty and refills only after 3 days; a bank vault refills in 7 days.',
          'You can pull drivers off freight wagons and mail coaches on the road and search the cargo (counts as robbery and horse theft).',
          'You cannot rob your own business.',
        ],
      },
      tips: {
        tr: ['**Şeytanın Ta Kendisi** başarımı (onur −80) soygunlardan 2 kat kazanç sağlar; ama onur düşükken kasaba sana sırt çevirir.'],
        en: ['The **Devil Himself** achievement (honor −80) doubles robbery loot, though towns turn against you at low honor.'],
      },
      rel: ['mask', 'wanted', 'honor'],
    },
    {
      id: 'evidence', cat: 'law', tags: ['body', 'witness', 'carry'],
      title: { tr: 'Cesetler ve kanıt', en: 'Bodies and evidence' },
      chip: { tr: 'Kanıt', en: 'Evidence' },
      q: {
        tr: ['ceset nasıl saklanır', 'ceset nasıl gömülür', 'cesedi suya atmak', 'kanıt nedir'],
        en: ['how do I hide a body', 'how to bury a body', 'throw a body in the water', 'what counts as evidence'],
      },
      a: {
        tr: 'Öldürdüğün masum birinin cesedi **kanıttır**. Biri onu bulduğunda sen yakındaysan suç sana yazılır. Cesedi ıssız bir yere taşıyabilir, suya atabilir ya da **kürekle gömebilirsin**.',
        en: 'The body of an innocent you killed is **evidence**. If someone finds it while you are nearby, the crime is pinned on you. Carry it somewhere remote, sink it in water or **bury it with a shovel**.',
      },
      steps: {
        tr: [
          'Cesedi omzuna al ya da atının eyerine yükle.',
          'Suya bırakılan ceset kan bırakmadan dibe batar (yalnızca ödül hedefi yüzer).',
          'Cesetle ya da bağlı biriyle görülmek de suçtur.',
        ],
        en: [
          'Put the body on your shoulder or load it onto your saddle.',
          'A body left in water sinks without a trace (only bounty targets float).',
          'Being seen with a body or a hogtied person is a crime too.',
        ],
      },
      tips: {
        tr: ['Bağladığın tanık kanuna haber veremez.'],
        en: ['A witness you have hogtied cannot report you.'],
      },
      rel: ['carry', 'wanted', 'lasso'],
    },
    {
      id: 'brawl', cat: 'law', tags: ['melee', 'witness', 'social'],
      title: { tr: 'Yumruk kavgası', en: 'Fistfights' },
      chip: { tr: 'Kavga', en: 'Fistfight' },
      q: {
        tr: ['yumruk atmak suç mu', 'kavga nasıl edilir', 'kavgadan sonra özür', 'yakın dövüş tuşu'],
        en: ['is punching a crime', 'how to start a fight', 'apologize after a fight', 'melee key'],
      },
      a: {
        tr: 'Bir kasabalıya (kanun adamı ve çocuk dışında) yumrukla vurmak hemen suç sayılmaz. Karşılık veren biriyle dövüşmek suç değildir; yumruk kavgasında kimse ölmez. Yakın dövüş tuşu [[F]].',
        en: 'Punching a townsperson (except lawmen and children) is not an instant crime. Fighting someone who hits back is legal, and nobody dies in a fistfight. The melee key is [[F]].',
      },
      steps: {
        tr: [
          'Huysuz biri kolayca kavgaya girer; utangaç, yaşlı ya da seni seven biri pek girmez.',
          'Yenilen “Yeter!” der ya da bayılır.',
          'Teslim olana ya da yere serilene vurmaya devam etmek saldırı suçudur.',
          'Kavgadan sonra **Özür Dile** seçeneği çıkar.',
        ],
        en: [
          'Grumpy folk fight back easily; shy, old or friendly people rarely do.',
          'The loser says “Enough!” or gets knocked out.',
          'Hitting someone who gave up or is down is assault.',
          'After a fight you get an **Apologize** option.',
        ],
      },
      tips: {
        tr: ['Silah dipçiği ve bıçak kavga sayılmaz.'],
        en: ['Gun butts and knives do not count as a fistfight.'],
      },
      rel: ['social', 'honor', 'wanted'],
    },
    {
      id: 'lasso', cat: 'law', tags: ['lasso', 'carry', 'horse', 'bounty'],
      title: { tr: 'Kement ve bağlama', en: 'Lasso and hogtying' },
      chip: { tr: 'Kement', en: 'Lasso' },
      q: {
        tr: ['kement nasıl kullanılır', 'birini nasıl bağlarım', 'atlıyı attan indirmek', 'hayvan nasıl bağlanır', 'kement nereden alınır'],
        en: ['how do I use the lasso', 'how to hogtie someone', 'pull a rider off a horse', 'how to tie up an animal', 'where to buy a lasso'],
      },
      a: {
        tr: '**Kementi** ($1,50, silahçı) çarktan seç ve hedefe at. Yakaladığın kişiye yaklaşıp [[E]]’yi **basılı tutarak** bağlarsın. Uzaklaşırsan (at sırtında da) peşinden sürüklenir; ateş tuşu ipi bırakır.',
        en: 'Pick the **lasso** ($1.50, gunsmith) from the wheel and throw it at a target. Walk up to someone you caught and **hold** [[E]] to hogtie them. Move away (even on horseback) and they get dragged; the fire button lets go.',
      },
      steps: {
        tr: [
          'Atlı birini kementle eyerden çekebilirsin.',
          'Küçük ve orta boy hayvanlar bağlanıp omza alınabilir; ayı gibi iri hayvanlar ipi hemen koparır.',
          'Bağlı kişi ya da hayvan bir süre sonra kurtulur.',
          'Yumrukla yere serilen biri ölmez, bayılır; o da bağlanabilir.',
        ],
        en: [
          'You can yank a rider out of the saddle with the lasso.',
          'Small and medium animals can be tied and shouldered; big ones like bears snap the rope at once.',
          'A hogtied person or animal eventually breaks free.',
          'Someone knocked down with fists is unconscious, not dead, and can be hogtied too.',
        ],
      },
      tips: {
        tr: ['Kement yabani atı evcilleştirmeyi çok kolaylaştırır.'],
        en: ['The lasso makes taming a wild horse much easier.'],
      },
      rel: ['bounty', 'carry', 'horse-tame'],
    },
    {
      id: 'carry', cat: 'law', tags: ['carry', 'horse', 'body', 'pelt'],
      title: { tr: 'Omuzda ve eyerde taşıma', en: 'Carrying on your shoulder and saddle' },
      chip: { tr: 'Taşıma', en: 'Carrying' },
      q: {
        tr: ['ceset nasıl taşınır', 'ata nasıl yüklenir', 'leş nasıl omuza alınır', 'yük taşırken koşamıyorum'],
        en: ['how do I carry a body', 'how to load onto the horse', 'how to shoulder a carcass', 'I cannot run while carrying'],
      },
      a: {
        tr: 'Cesetleri, bağlı ya da baygın kişileri, leşleri ve büyük postları **omzuna alabilir**, atının yanındayken **eyere yükleyebilirsin**. Eyer 4 birim taşır: kişi ve iri leş 2, post ve küçük leş 1.',
        en: 'You can **shoulder** bodies, hogtied or unconscious people, carcasses and big pelts, and **load them onto your saddle** when next to your horse. The saddle holds 4 units: a person or big carcass is 2, a pelt or small carcass 1.',
      },
      steps: {
        tr: [
          'Leş ve cesette ikincil eylem (şarjör tuşu, [[R]]) omza alır.',
          'Omzunda yük varken koşamaz, silah kullanamazsın.',
          'Yüklü at biraz yavaşlar.',
          'Omzunda yükle otelin merdivenini çıkamaz, faytona binemezsin.',
        ],
        en: [
          'The secondary action on a carcass or body (the reload key, [[R]]) puts it on your shoulder.',
          'While carrying you cannot run or use weapons.',
          'A loaded horse is a little slower.',
          'You cannot climb hotel stairs or ride the carriage with something on your shoulder.',
        ],
      },
      tips: {
        tr: ['Bayılırsan ya da ölürsen yük olduğun yerde kalır.'],
        en: ['If you faint or die, the load stays where you fell.'],
      },
      rel: ['evidence', 'pelts', 'bounty'],
    },
    {
      id: 'honor', cat: 'law', tags: ['honor', 'influence'],
      title: { tr: 'Onur', en: 'Honor' },
      chip: { tr: 'Onur', en: 'Honor' },
      q: {
        tr: ['onur nasıl artar', 'onur ne işe yarar', 'onurum düştü', 'iyi adam olmak', 'kiliseye bağış'],
        en: ['how do I raise honor', 'what does honor do', 'my honor dropped', 'playing as a good guy', 'church donation'],
      },
      a: {
        tr: 'Onur fiyatları, insanların sana davranışını ve nüfuzunu etkiler. Yabancılara yardım etmek, kiliseye bağış yapmak (50¢) ve dua etmek onuru artırır; suç, rüşvet ve tekelcilik düşürür.',
        en: 'Honor affects prices, how people treat you and your influence. Helping strangers, donating at church (50¢) and praying raise it; crime, bribes and monopolies lower it.',
      },
      steps: {
        tr: [
          'Yolda yaralı yolculara ve sıkışmış yabancılara yardım et.',
          'Kilisede **Kiliseye Bağış Yap** onuru 3 artırır; **Dua Et** günde bir kez yapılır.',
          'Çiftlik hayvanlarını (inek, tavuk) vurmak onur kaybettirir ve görülürse suçtur.',
        ],
        en: [
          'Help wounded travelers and strangers in trouble on the road.',
          '**Donate to the Church** raises honor by 3; you can **Pray** once a day.',
          'Shooting farm animals (cows, chickens) costs honor and is a crime if seen.',
        ],
      },
      tips: {
        tr: ['**Aziz** (onur 80): doktor yarı fiyat. **İyi Samiriyeli** (5 yardım): onur kazanımı 1,5 kat.', 'Banka kurmak için onur 10 ve üstü gerekir.'],
        en: ['**Saint** (honor 80): doctors at half price. **Good Samaritan** (help 5 strangers): 1.5× honor gain.', 'Owning a bank needs honor 10 or more.'],
      },
      rel: ['influence', 'services', 'achievements'],
    },
  ];
  if (typeof module === 'object' && module.exports) module.exports = A;
  else (root.WIKI_ARTICLES = root.WIKI_ARTICLES || []).push(...A);
})(typeof self !== 'undefined' ? self : this);
