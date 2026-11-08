/* Frontier's End Wiki — kavram sözlüğü (arama motorunun eşanlamlı dalları)
   Her kavramın Türkçe ve İngilizce eş anlamlıları vardır. Sözcükler kök ya da yalın hâliyle yazılır;
   arama motoru ekleri kendisi ayıklar (atımı → at, evcilleştirebilirim → evcilleştir, horses → horse).
   Çok sözcüklü eş anlamlılar (ör. "ödül avcısı", "dead eye") öbek olarak eşleşir.
   rel: yakın kavramlar; doğrudan eşleşme yoksa düşük ağırlıkla devreye girer. */
(function (root) {
  'use strict';
  const C = {
    /* ---- Genel eylemler ---- */
    buy: { tr: ['satın al', 'satın', 'al', 'alış', 'alım', 'edin', 'sipariş', 'nereden al'], en: ['buy', 'purchase', 'acquire', 'get', 'order'] },
    sell: { tr: ['sat', 'satış', 'sattır', 'elden çıkar', 'okut'], en: ['sell', 'sale', 'selling', 'pawn'] },
    price: { tr: ['fiyat', 'ücret', 'kaç para', 'kaça', 'maliyet', 'pahalı', 'ucuz', 'bedel', 'tutar', 'ne kadar'], en: ['price', 'cost', 'fee', 'cheap', 'expensive', 'how much'], rel: ['buy'] },
    shop: { tr: ['dükkan', 'mağaza', 'market', 'alışveriş', 'genel mağaza', 'satıcı', 'tüccar', 'tezgah'], en: ['shop', 'store', 'general store', 'shopping', 'merchant', 'vendor', 'trader', 'counter'] },
    craft: { tr: ['üret', 'üretim', 'hazırla', 'tarif', 'imal', 'zanaat', 'karıştır'], en: ['craft', 'crafting', 'recipe', 'recipes', 'brew'] },
    cook: { tr: ['pişir', 'pişmiş', 'ocak', 'kızart', 'yemek yap', 'mutfak'], en: ['cook', 'cooking', 'cooked', 'stove', 'roast', 'grill', 'kitchen'] },

    /* ---- Hayatta kalma ---- */
    hunger: { tr: ['açlık', 'aç', 'acık', 'yemek', 'ye', 'yiyecek', 'besin', 'gıda', 'karın', 'doy', 'öğün', 'konserve'], en: ['hunger', 'hungry', 'food', 'eat', 'eating', 'meal', 'starving', 'starve'], rel: ['cook'] },
    thirst: { tr: ['susuzluk', 'susuz', 'susa', 'su', 'iç', 'içecek', 'kuyu', 'çeşme'], en: ['thirst', 'thirsty', 'water', 'drink', 'dehydrated', 'fountain', 'water well'] },
    canteen: { tr: ['matara', 'su kabı'], en: ['canteen', 'flask', 'water bottle'] },
    sleep: { tr: ['uyku', 'uyu', 'uykusuz', 'uykusuzluk', 'yorgun', 'yorgunluk', 'dinlen', 'yatak', 'yat', 'uyan', 'nerede kal', 'gece kal', 'gecele', 'geceyi geçir'], en: ['sleep', 'sleeping', 'tired', 'rest', 'bed', 'fatigue', 'exhausted', 'wake', 'stay the night', 'spend the night', 'where to stay'] },
    camp: { tr: ['kamp', 'kamp ateşi', 'ateş', 'uyku tulumu', 'tulum', 'çadır', 'kamp kur'], en: ['camp', 'campfire', 'camping', 'bedroll', 'tent', 'fire'] },
    health: { tr: ['can', 'sağlık', 'yara', 'yaralan', 'yaralı', 'kan', 'hasar', 'hp'], en: ['health', 'hp', 'wound', 'wounded', 'injury', 'injured', 'damage', 'hurt'] },
    heal: { tr: ['iyileş', 'iyileştir', 'tedavi', 'şifa', 'kurtar', 'can doldur'], en: ['heal', 'healing', 'cure', 'treat', 'treatment', 'recover', 'regenerate', 'regeneration'], rel: ['health'] },
    temperature: { tr: ['sıcak', 'soğuk', 'üşü', 'ısın', 'ısı', 'sıcaklık', 'derece', 'ayaz', 'don', 'donma', 'titre', 'sıcak çarpması', 'serin', 'kar', 'çöl'], en: ['heat', 'hot', 'cold', 'freeze', 'freezing', 'temperature', 'warm', 'warmth', 'chill', 'chilly', 'hypothermia', 'heatstroke', 'cool', 'snow', 'desert'] },
    clothing: { tr: ['giysi', 'kıyafet', 'elbise', 'palto', 'ceket', 'mont', 'manto', 'şapka', 'kürk', 'giy', 'panço', 'gömlek', 'terzi', 'kostüm'], en: ['clothes', 'clothing', 'outfit', 'coat', 'jacket', 'hat', 'fur', 'wear', 'poncho', 'shirt', 'tailor', 'duster'] },
    poison: { tr: ['zehir', 'zehirlen', 'zehirli', 'yılan', 'sok', 'sokma', 'ısır', 'panzehir', 'yılan yağı'], en: ['poison', 'poisoned', 'venom', 'snake', 'snakebite', 'bite', 'bitten', 'antidote', 'rattlesnake', 'snake oil'] },
    sickness: { tr: ['hasta', 'hastalık', 'hastalan', 'kinin', 'mide', 'ateşim', 'humma'], en: ['sick', 'sickness', 'ill', 'illness', 'disease', 'fever', 'quinine'] },
    faint: { tr: ['bayıl', 'bayılma', 'baygın', 'kendinden geç', 'ayıl', 'bilinçsiz'], en: ['faint', 'fainted', 'fainting', 'pass out', 'passed out', 'unconscious', 'blackout', 'blacked out'] },
    death: { tr: ['öl', 'ölüm', 'öldüm', 'ölünce', 'ölmek', 'mezar', 'hayata dön', 'diril'], en: ['die', 'death', 'dead', 'died', 'dying', 'respawn', 'revive', 'killed'] },
    doctor: { tr: ['doktor', 'hekim', 'eczane', 'eczacı'], en: ['doctor', 'physician', 'medic', 'pharmacy', 'pharmacist'] },
    medicine: { tr: ['ilaç', 'merhem', 'tonik', 'iksir', 'bandaj', 'sargı', 'laudanum', 'kinin', 'koklatma tuzu', 'sarsaparilla', 'kas merhemi'], en: ['medicine', 'meds', 'medication', 'tonic', 'potion', 'bandage', 'liniment', 'laudanum', 'quinine', 'smelling salts', 'sarsaparilla', 'health cure'] },
    drunk: { tr: ['sarhoş', 'sarhoşluk', 'alkol', 'içki', 'viski', 'bira', 'ayık', 'ayıl', 'çift görme'], en: ['drunk', 'alcohol', 'liquor', 'whiskey', 'beer', 'booze', 'hangover', 'sober', 'double vision'] },
    clean: { tr: ['temiz', 'temizlik', 'kirli', 'pis', 'banyo', 'yıkan', 'küvet', 'lavabo', 'koku'], en: ['clean', 'cleanliness', 'dirty', 'bath', 'bathe', 'wash', 'filthy', 'hygiene', 'tub'] },
    barber: { tr: ['berber', 'tıraş', 'saç', 'sakal', 'bıyık', 'saç kes'], en: ['barber', 'shave', 'haircut', 'hair', 'beard', 'mustache', 'moustache', 'hairstyle'] },
    aging: { tr: ['yaş', 'yaşlan', 'yaşlılık', 'ihtiyar', 'doğum günü', 'ağar', 'yaşlanma hızı'], en: ['age', 'aging', 'ageing', 'old', 'older', 'birthday', 'elderly', 'aging pace'] },
    time: { tr: ['zaman', 'saat', 'gün', 'gece', 'sabah', 'takvim', 'yıl', 'mevsim', 'dakika'], en: ['time', 'hour', 'day', 'night', 'morning', 'calendar', 'year', 'season', 'clock', 'minute'] },

    /* ---- Arayüz ve ayarlar ---- */
    satchel: { tr: ['çanta', 'envanter', 'eşya', 'yer yok', 'çanta doldu', 'taşıma sınırı', 'kaç tane'], en: ['satchel', 'inventory', 'bag', 'items', 'no room', 'item limit', 'full', 'how many'] },
    chest: { tr: ['sandık', 'depola', 'eşya sakla', 'sakla'], en: ['chest', 'stash', 'storage', 'store items'] },
    save: { tr: ['kayıt', 'kaydet', 'yükle', 'kayıt yükle', 'otomatik kayıt', 'yuva', 'devam et', 'kayıt dosyası'], en: ['save', 'saving', 'saved', 'load', 'autosave', 'slot', 'continue', 'save file'] },
    settings: { tr: ['ayar', 'ayarlar', 'seçenek', 'seçenekler'], en: ['settings', 'options', 'preferences', 'config', 'configuration'] },
    graphics: { tr: ['grafik', 'görüntü', 'çözünürlük', 'fps', 'kasma', 'kasıyor', 'takılma', 'performans', 'ekran kartı', 'melez', 'klasik', 'akıcı', 'gecikme', 'oyun yavaş', 'yavaş çalışıyor'], en: ['graphics', 'fps', 'lag', 'lagging', 'stutter', 'performance', 'gpu', 'resolution', 'framerate', 'frame rate', 'hybrid', 'classic', 'smooth', 'video card', 'graphics card', 'runs slow', 'game is slow'] },
    language: { tr: ['dil', 'türkçe', 'ingilizce', 'çeviri', 'lisan'], en: ['language', 'english', 'turkish', 'translation', 'translate'] },
    audio: { tr: ['ses', 'müzik', 'seslendirme', 'altyazı', 'sinematik', 'ara sahne'], en: ['audio', 'sound', 'music', 'voice', 'voice acting', 'subtitles', 'volume', 'cutscene', 'cinematic'] },
    controls: { tr: ['kontrol', 'tuş', 'klavye', 'fare', 'kol', 'oyun kolu', 'gamepad', 'joystick', 'tuş atama', 'buton', 'kısayol'], en: ['controls', 'control', 'key', 'keys', 'keyboard', 'mouse', 'controller', 'gamepad', 'joystick', 'keybind', 'keybinding', 'bindings', 'button', 'rebind', 'shortcut'] },
    hud: { tr: ['gösterge', 'radar', 'halka', 'arayüz', 'hud', 'simge', 'tehlike kartı', 'çubuk'], en: ['hud', 'radar', 'ring', 'rings', 'interface', 'ui', 'meter', 'meters', 'gauge', 'indicator', 'icon', 'danger card', 'bar'] },
    map: { tr: ['harita', 'işaret', 'rota', 'gps', 'konum', 'yol tarifi', 'pusula', 'yön'], en: ['map', 'marker', 'waypoint', 'route', 'gps', 'location', 'directions', 'compass', 'pin'] },
    journal: { tr: ['günlük', 'rehber', 'el kitabı', 'görev', 'görevler', 'istatistik'], en: ['journal', 'guide', 'handbook', 'quest', 'quests', 'log', 'statistics', 'stats'] },
    skills: { tr: ['yetenek', 'beceri', 'seviye', 'gelişim', 'xp', 'tecrübe', 'deneyim'], en: ['skill', 'skills', 'level', 'level up', 'xp', 'experience', 'progression', 'ability'] },
    achievements: { tr: ['başarım', 'kazanım', 'perk', 'rozet'], en: ['achievement', 'achievements', 'perk', 'perks', 'trophy', 'trophies', 'unlock'] },
    newgame: { tr: ['yeni oyun', 'yeni hayat', 'karakter', 'geçmiş', 'başlangıç', 'karakter oluştur', 'meslek seç'], en: ['new game', 'new life', 'character', 'background', 'start', 'beginning', 'character creation', 'origin'] },
    difficulty: { tr: ['zorluk', 'tek hayat', 'hikaye modu', 'kolay', 'zor', 'kalıcı ölüm'], en: ['difficulty', 'one life', 'permadeath', 'hardcore', 'story mode', 'easy', 'hard'] },

    /* ---- Silah ve dövüş ---- */
    aim: { tr: ['nişan', 'nişan al', 'hedef', 'kilitlen', 'nişangah', 'isabet', 'nişan yardımı'], en: ['aim', 'aiming', 'target', 'lock on', 'crosshair', 'accuracy', 'aim assist'] },
    shoot: { tr: ['ateş et', 'ateş', 'vur', 'tetik', 'atış', 'ateşle'], en: ['shoot', 'shooting', 'fire', 'firing', 'shot', 'trigger'] },
    weapon: { tr: ['silah', 'tabanca', 'tüfek', 'karabina', 'av tüfeği', 'yay', 'bıçak', 'dinamit', 'altıpatlar', 'revolver', 'silahçı'], en: ['weapon', 'weapons', 'gun', 'guns', 'pistol', 'revolver', 'rifle', 'repeater', 'shotgun', 'bow', 'knife', 'dynamite', 'carbine', 'gunsmith'] },
    ammo: { tr: ['mermi', 'fişek', 'cephane', 'ok', 'şarjör', 'şarjör değiştir', 'doldur'], en: ['ammo', 'ammunition', 'bullet', 'bullets', 'rounds', 'cartridge', 'arrow', 'arrows', 'reload', 'magazine'] },
    wheel: { tr: ['çark', 'silah çarkı', 'eşya çarkı', 'silah değiştir', 'silah seç', 'kuşan'], en: ['wheel', 'weapon wheel', 'item wheel', 'radial', 'switch weapon', 'equip'] },
    focus: { tr: ['odak', 'ağır çekim', 'zaman yavaşlat', 'zamanı yavaşlat', 'dead eye', 'deadeye'], en: ['focus', 'dead eye', 'deadeye', 'slow motion', 'bullet time', 'slow time', 'slow down time'] },
    melee: { tr: ['yumruk', 'dövüş', 'kavga', 'yakın dövüş', 'tekme', 'yumruklaş', 'dövüş'], en: ['fist', 'fists', 'punch', 'fight', 'fighting', 'brawl', 'melee', 'fistfight'] },
    duel: { tr: ['düello', 'çekiş', 'hızlı çekiş', 'kozlarını paylaş'], en: ['duel', 'dueling', 'quick draw', 'showdown', 'standoff', 'draw'] },

    /* ---- At ve yolculuk ---- */
    horse: { tr: ['at', 'beygir', 'kısrak', 'aygır', 'binek', 'tay', 'eyer', 'atım', 'atlı'], en: ['horse', 'horses', 'mount', 'steed', 'mare', 'stallion', 'pony', 'saddle', 'colt'] },
    tame: { tr: ['evcilleştir', 'ehlileştir', 'alıştır', 'terbiye', 'yakala', 'sakinleştir', 'evcil'], en: ['tame', 'taming', 'catch', 'calm', 'break a horse', 'horse breaking'], rel: ['wild'] },
    wild: { tr: ['yabani', 'vahşi', 'başıboş'], en: ['wild', 'feral', 'untamed'] },
    bond: { tr: ['bağ', 'sadakat', 'okşa', 'fırçala', 'tımar', 'bakım', 'besle', 'saman', 'at bakımı'], en: ['bond', 'bonding', 'loyalty', 'pat', 'brush', 'groom', 'grooming', 'care', 'feed', 'hay'] },
    whistle: { tr: ['ıslık', 'çağır', 'gel', 'getir', 'kayboldu', 'kaybettim', 'nerede kaldı'], en: ['whistle', 'call', 'summon', 'lost', 'come', 'missing'] },
    ride: { tr: ['bin', 'binme', 'sür', 'sürüş', 'dörtnal', 'dizgin', 'eşkin', 'in', 'geri git'], en: ['ride', 'riding', 'gallop', 'reins', 'steer', 'dismount', 'drive', 'driving', 'reverse', 'back up'] },
    stable: { tr: ['ahır', 'seyis', 'ahırdaki'], en: ['stable', 'stables', 'stable hand', 'livery'] },
    revive: { tr: ['dirilt', 'diriltici', 'at diriltici', 'yere yığıldı', 'yığıldı', 'düştü'], en: ['revive', 'reviver', 'horse reviver', 'downed', 'collapsed', 'knocked down'] },
    wagon: { tr: ['yük arabası', 'at arabası', 'araba', 'kağnı'], en: ['wagon', 'freight wagon', 'cart', 'cargo'] },
    car: { tr: ['otomobil', 'araba', 'araç', 'motor', 'benzin', 'otomobil sür'], en: ['car', 'automobile', 'motorcar', 'vehicle', 'motor'] },
    carriage: { tr: ['fayton', 'özel fayton', 'arabacı', 'yolcu arabası'], en: ['carriage', 'private carriage', 'coach', 'coachman', 'driver'] },
    train: { tr: ['tren', 'istasyon', 'bilet', 'demiryolu', 'ray', 'vagon', 'gişe'], en: ['train', 'station', 'ticket', 'railroad', 'railway', 'rail', 'fare'] },
    stagecoach: { tr: ['posta arabası', 'posta', 'yolcu arabası', 'postane'], en: ['stagecoach', 'mail coach', 'post office', 'stage coach'] },
    travel: { tr: ['seyahat', 'yolculuk', 'git', 'hızlı seyahat', 'ulaş', 'uzak', 'yolcu'], en: ['travel', 'fast travel', 'journey', 'go to', 'get to', 'reach', 'trip', 'commute'] },

    /* ---- Av ve doğa ---- */
    hunt: { tr: ['av', 'avla', 'avcı', 'avcılık', 'avlan', 'iz sür', 'pusu', 'çömel', 'gizlen'], en: ['hunt', 'hunting', 'hunter', 'prey', 'game', 'stalk', 'track', 'crouch', 'sneak'] },
    animal: { tr: ['hayvan', 'geyik', 'kızıl geyik', 'tavşan', 'bizon', 'antilop', 'tilki', 'kurt', 'çakal', 'ayı', 'boz ayı', 'puma', 'domuz', 'yaban domuzu', 'timsah', 'yılan', 'hindi', 'yaban hindisi', 'inek', 'tavuk'], en: ['animal', 'animals', 'deer', 'elk', 'rabbit', 'bison', 'buffalo', 'pronghorn', 'antelope', 'fox', 'wolf', 'wolves', 'coyote', 'bear', 'grizzly', 'cougar', 'puma', 'mountain lion', 'boar', 'alligator', 'gator', 'snake', 'turkey', 'cow', 'chicken'] },
    predator: { tr: ['tehlikeli hayvan', 'saldıran hayvan', 'vahşi hayvan', 'saldırı', 'saldırıyor', 'ayı', 'kurt', 'puma', 'timsah'], en: ['predator', 'predators', 'dangerous animal', 'attack', 'attacking', 'mauled', 'bear', 'wolf', 'wolves', 'cougar', 'alligator'] },
    skin: { tr: ['deri yüz', 'derisini yüz', 'yüz', 'leş', 'et', 'kes'], en: ['skin', 'skinning', 'carcass', 'meat', 'butcher'] },
    pelt: { tr: ['post', 'deri', 'kürk', 'postlar'], en: ['pelt', 'pelts', 'hide', 'hides', 'fur', 'skin'] },
    fish: { tr: ['balık', 'balık tut', 'olta', 'yem', 'solucan', 'misina', 'makara', 'göl', 'nehir', 'somon', 'alabalık', 'yayın'], en: ['fish', 'fishing', 'rod', 'fishing rod', 'bait', 'worm', 'line', 'reel', 'lake', 'river', 'salmon', 'trout', 'catfish', 'angler'] },
    gold: { tr: ['altın', 'ele', 'eleme', 'elek', 'altın eleği', 'altın ara', 'külçe'], en: ['gold', 'pan', 'panning', 'gold pan', 'nugget', 'nuggets', 'prospect', 'prospecting'] },
    ore: { tr: ['cevher', 'maden', 'kazma', 'demir', 'gümüş', 'kaz', 'madenci', 'cevher kayası'], en: ['ore', 'mine', 'mining', 'pickaxe', 'pick', 'iron', 'silver', 'dig', 'miner', 'ore rock'] },
    herb: { tr: ['bitki', 'ot', 'şifalı', 'topla', 'çiçek', 'mantar', 'ginseng', 'civanperçemi', 'adaçayı', 'nane', 'kekik', 'ipekotu', 'yaban mersini'], en: ['herb', 'herbs', 'plant', 'plants', 'gather', 'gathering', 'pick', 'flower', 'mushroom', 'ginseng', 'yarrow', 'sage', 'mint', 'oregano', 'milkweed', 'berries', 'forage'] },
    treasure: { tr: ['hazine', 'hazine haritası', 'gömülü', 'kürek', 'kaz', 'sandık'], en: ['treasure', 'treasure map', 'buried', 'shovel', 'dig', 'chest'] },
    collectible: { tr: ['koleksiyon', 'ok ucu', 'dinozor', 'dinozor kemiği', 'göktaşı', 'eski sikke', 'sigara kartı', 'değerli eşya'], en: ['collectible', 'collectibles', 'arrowhead', 'dinosaur', 'dinosaur bone', 'meteorite', 'old coin', 'cigarette card', 'valuables'] },
    explore: { tr: ['keşif', 'keşfet', 'önemli yer', 'yerler', 'gez', 'harabe', 'deniz feneri', 'kaplıca', 'sıcak kaynak', 'krater'], en: ['explore', 'exploring', 'discover', 'landmark', 'landmarks', 'places', 'ruins', 'lighthouse', 'hot spring', 'hot springs', 'crater'] },
    binoculars: { tr: ['dürbün', 'uzağı gör'], en: ['binoculars', 'spyglass', 'scope', 'see far'] },
    legend: { tr: ['efsane', 'efsanevi', 'efsanevi hayvan', 'efsanevi balık', 'nadir hayvan', 'ak hayalet', 'beyaz kurt', 'yaralı pençe', 'altın gölge', 'taç boynuz', 'demir boynuz', 'yaşlı diş', 'gölün hayaleti', 'bakır pul', 'yaşlı bıyık', 'demir çene', 'arama çemberi'], en: ['legend', 'legends', 'legendary', 'legendary animal', 'legendary fish', 'rare animal', 'pale ghost', 'white wolf', 'scarclaw', 'golden shadow', 'crownhorn', 'ironhorn', 'old tooth', 'lake ghost', 'copperscale', 'old whiskers', 'ironjaw', 'search circle'], rel: ['hunt', 'fish'] },
    tailorcraft: { tr: ['postundan diktir', 'diktir', 'terzi siparişi', 'heybe', 'heybe büyüt', 'eyer büyüt', 'saraç', 'çanta büyüt'], en: ['sew', 'sewn', 'tailor order', 'saddlebags', 'saddlebag', 'saddler', 'upgrade satchel', 'bigger satchel'], rel: ['clothing', 'pelt'] },

    /* ---- Para ---- */
    money: { tr: ['para', 'dolar', 'sent', 'nakit', 'servet', 'zengin', 'gelir', 'kazanç', 'cüzdan', 'kâr'], en: ['money', 'cash', 'dollar', 'dollars', 'cent', 'cents', 'wealth', 'rich', 'income', 'profit', 'wallet'] },
    earn: { tr: ['kazan', 'para kazan', 'para bas', 'zengin ol', 'para yap'], en: ['earn', 'earning', 'make money', 'get rich', 'farm money'], rel: ['money'] },
    job: { tr: ['iş', 'çalış', 'vardiya', 'maaş', 'ücret', 'meslek', 'işçi', 'mesai'], en: ['job', 'jobs', 'work', 'working', 'shift', 'wage', 'wages', 'employment', 'labor'] },
    bank: { tr: ['banka', 'yatır', 'para yatır', 'para çek', 'faiz', 'hesap', 'mevduat', 'vezne'], en: ['bank', 'deposit', 'withdraw', 'interest', 'account', 'savings', 'teller'] },
    gamble: { tr: ['kumar', 'poker', 'blackjack', 'yirmi bir', 'bahis', 'bilek güreşi', 'bilardo', 'kumarhane', 'iskambil', 'kart masası', 'kart odası', 'kart oyunu'], en: ['gamble', 'gambling', 'poker', 'blackjack', 'twenty one', 'bet', 'betting', 'arm wrestling', 'arm wrestle', 'billiards', 'pool', 'casino', 'card game', 'card room', 'card table'] },
    bounty: { tr: ['ödül', 'ödül avı', 'ilan', 'ödül ilanı', 'ilan panosu', 'aranan', 'kelle', 'hedef teslim', 'teslim et'], en: ['bounty', 'bounties', 'bounty hunting', 'poster', 'posters', 'wanted poster', 'reward', 'board', 'turn in', 'deliver'] },

    /* ---- İşletme ve nüfuz ---- */
    business: { tr: ['işletme', 'dükkan sahibi', 'dükkan al', 'iş yeri', 'işletmeci', 'kasa', 'şirket', 'patronluk'], en: ['business', 'businesses', 'own a shop', 'shopkeeper', 'manager', 'till', 'company', 'enterprise'] },
    supply: { tr: ['mal', 'stok', 'sandık', 'tedarik', 'toptan', 'toptancı', 'nakliye', 'erzak'], en: ['supply', 'supplies', 'stock', 'goods', 'crate', 'crates', 'wholesale', 'wholesaler', 'delivery', 'haul'] },
    hauler: { tr: ['nakliyeci', 'taşıyıcı', 'kamyoncu'], en: ['hauler', 'haulers', 'teamster', 'freight', 'transporter'] },
    lot: { tr: ['arsa', 'inşaat', 'inşa', 'yapı', 'bina yap', 'tasarım', 'şantiye'], en: ['lot', 'lots', 'plot', 'build', 'building', 'construct', 'construction', 'design'] },
    monopoly: { tr: ['tekel', 'tekelleş', 'pazar payı', 'sektör', 'hakimiyet', 'hakim', 'rakip', 'teklif', 'devral', 'ticaret odası'], en: ['monopoly', 'market share', 'sector', 'dominance', 'dominant', 'rival', 'rivals', 'buyout', 'takeover', 'offer', 'trade chamber'] },
    ownbank: { tr: ['kendi bankam', 'banka kur', 'banka sahibi', 'banka aç', 'kredi', 'panik', 'banka battı'], en: ['own bank', 'own a bank', 'start a bank', 'bank owner', 'loans', 'loan', 'bank run', 'panic'] },
    oil: { tr: ['petrol', 'kara altın', 'sondaj', 'kuyu', 'kule', 'rafineri', 'varil', 'sızıntı'], en: ['oil', 'black gold', 'drilling', 'drill', 'oil well', 'derrick', 'refinery', 'barrel', 'seep'] },
    influence: { tr: ['nüfuz', 'söz geçir', 'patron', 'tanınmış', 'nüfuzlu', 'sözü geçen'], en: ['influence', 'clout', 'power', 'boss', 'powerful', 'influential'] },
    bribe: { tr: ['rüşvet', 'anlaş', 'dosya', 'skandal', 'söylenti', 'islah komisyonu'], en: ['bribe', 'bribery', 'payoff', 'pay off', 'corrupt', 'scandal', 'reform commission'] },
    payroll: { tr: ['maaşa bağla', 'şerifi maaşa bağla', 'şerifi satın al', 'maaşlı şerif', 'göz yum'], en: ['payroll', 'on the payroll', 'buy the sheriff', 'look the other way'], rel: ['bribe'] },
    guard: { tr: ['koruma', 'fedai', 'adam tut', 'silahlı adam', 'muhafız'], en: ['bodyguard', 'bodyguards', 'guard', 'guards', 'hired gun', 'protection'] },

    /* ---- Kanun ---- */
    wanted: { tr: ['aranma', 'aran', 'aranıyorum', 'kanun', 'şerif', 'polis', 'yıldız', 'kaç', 'kurtul', 'peşimde', 'kovalamaca', 'suç', 'kanun adamı'], en: ['wanted', 'law', 'lawman', 'lawmen', 'sheriff', 'police', 'stars', 'escape', 'evade', 'chase', 'crime', 'pursuit', 'lose the law', 'lose wanted', 'wanted level'] },
    surrender: { tr: ['teslim ol', 'teslim', 'hapis', 'ceza öde', 'tutukla', 'tutuklan', 'cezaevi', 'kodes', 'ateşkes'], en: ['surrender', 'jail', 'prison', 'arrest', 'arrested', 'pay fine', 'fine', 'truce', 'give up'] },
    witness: { tr: ['tanık', 'şahit', 'ihbar', 'gördü', 'gören'], en: ['witness', 'witnesses', 'report', 'reported', 'snitch', 'seen'] },
    mask: { tr: ['maske', 'bandana', 'çuval maske', 'kılık', 'kimlik', 'tanınma', 'tanın'], en: ['mask', 'bandana', 'sack mask', 'disguise', 'identity', 'recognized', 'recognize'] },
    lockpick: { tr: ['maymuncuk', 'kilit', 'kilitli', 'kapı aç', 'kapı kır', 'kapalı', 'kilitli kapı'], en: ['lockpick', 'lock', 'locked', 'pick lock', 'open door', 'break door', 'closed', 'locked door'] },
    rob: { tr: ['soy', 'soygun', 'soyguncu', 'hırsız', 'hırsızlık', 'çal', 'banka soy', 'dükkan soy'], en: ['rob', 'robbery', 'heist', 'steal', 'stealing', 'thief', 'theft', 'holdup', 'loot'] },
    body: { tr: ['ceset', 'kanıt', 'göm', 'gizle', 'suya at', 'delil'], en: ['body', 'corpse', 'evidence', 'bury', 'hide', 'dispose'] },
    lasso: { tr: ['kement', 'ip', 'bağla', 'bağlı', 'sürükle', 'attan indir'], en: ['lasso', 'rope', 'hogtie', 'tie', 'tied', 'drag', 'pull off'] },
    carry: { tr: ['taşı', 'omuz', 'omza al', 'omuza al', 'eyere yükle', 'yükle', 'sırtla'], en: ['carry', 'carrying', 'shoulder', 'load', 'pick up'] },
    honor: { tr: ['onur', 'şeref', 'iyilik', 'kötülük', 'ahlak', 'ün', 'itibar', 'bağış'], en: ['honor', 'honour', 'karma', 'morality', 'evil', 'reputation', 'donate'] },
    bountyhunter: { tr: ['ödül avcısı', 'ödül avcıları', 'kelle avcısı', 'avcılar peşimde'], en: ['bounty hunter', 'bounty hunters', 'manhunter'] },

    /* ---- Kasaba ve ev ---- */
    greet: { tr: ['selam', 'selamla', 'merhaba', 'konuş', 'sohbet', 'kışkırt', 'laf at', 'karşılık ver', 'özür'], en: ['greet', 'greeting', 'hello', 'talk', 'chat', 'antagonize', 'taunt', 'talk back', 'apologize'] },
    social: { tr: ['kasabalı', 'sakin', 'insanlar', 'npc', 'halk', 'komşu', 'mizaç'], en: ['townsfolk', 'resident', 'residents', 'people', 'npc', 'npcs', 'neighbor', 'temperament'] },
    romance: { tr: ['evlen', 'evlilik', 'aşk', 'sevgili', 'flört', 'eş', 'hediye', 'yüzük', 'evlenme teklifi', 'yakınlık', 'karı', 'koca'], en: ['marry', 'marriage', 'married', 'romance', 'love', 'date', 'dating', 'spouse', 'wife', 'husband', 'gift', 'ring', 'propose', 'proposal', 'affection', 'courtship'] },
    hotel: { tr: ['otel', 'oda', 'kirala', 'resepsiyon', 'konakla', 'pansiyon'], en: ['hotel', 'room', 'rent', 'reception', 'inn', 'lodging'] },
    church: { tr: ['kilise', 'dua', 'bağış', 'rahip'], en: ['church', 'pray', 'prayer', 'donate', 'donation', 'priest'] },
    news: { tr: ['gazete', 'söylenti', 'haber', 'dedikodu', 'telgraf', 'barmen'], en: ['newspaper', 'news', 'rumor', 'rumors', 'rumour', 'gossip', 'telegraph', 'bartender'] },
    town: { tr: ['kasaba', 'şehir', 'köy', 'gelişim', 'büyü', 'nüfus', 'gerile', 'elektrik', 'hayalet kasaba'], en: ['town', 'towns', 'city', 'village', 'growth', 'grow', 'develop', 'development', 'population', 'decline', 'electricity', 'ghost town'] },
    club: { tr: ['kulüp', 'üye', 'üyelik', 'puro', 'konyak', 'okuma odası'], en: ['club', 'member', 'membership', 'cigar', 'cognac', 'reading room'] },
    property: { tr: ['mülk', 'ev', 'ev al', 'çiftlik', 'konak', 'kulübe', 'baraka', 'satılık', 'tapu dairesi', 'sandık'], en: ['property', 'house', 'home', 'buy a house', 'farm', 'manor', 'cabin', 'shack', 'real estate', 'land office', 'chest', 'storage'] },
    homestead: { tr: ['kendi evim', 'ev yap', 'ev kur', 'kazık', 'arazi kazığı', 'arazi', 'tapu', 'kaçak yapı', 'mühür'], en: ['homestead', 'build a house', 'build a home', 'stakes', 'survey stakes', 'land', 'deed', 'land deed', 'squat', 'sealed'] },
    mansion: { tr: ['malikane', 'hizmetçi', 'aşçı', 'seyis', 'uşak'], en: ['mansion', 'servant', 'servants', 'cook', 'stable hand', 'butler'] },
  };
  if (typeof module === 'object' && module.exports) module.exports = C;
  else root.WIKI_CONCEPTS = C;
})(typeof self !== 'undefined' ? self : this);
