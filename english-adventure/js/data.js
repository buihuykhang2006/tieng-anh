/* ==========================================================================
   English Adventure — Dữ liệu chương trình học 10 level
   Cấu trúc: COURSE > units > lessons > vocab + questions
   Mỗi level tăng số bài học / unit theo cấp độ
   ========================================================================== */

const LEVEL_CONFIG = [
  { id: "lvl1", name: "Level 1 · Beginner", icon: "🌱", lessonsPerUnit: 2, units: ["Hello", "Numbers", "Colors", "Animals", "Toys"] },
  { id: "lvl2", name: "Level 2 · Starter", icon: "🌼", lessonsPerUnit: 3, units: ["Family", "School", "Food", "Body", "Weather"] },
  { id: "lvl3", name: "Level 3 · Growing", icon: "🌞", lessonsPerUnit: 4, units: ["Home", "Daily Life", "Places", "Clothes", "Actions"] },
  { id: "lvl4", name: "Level 4 · Explorer", icon: "🧭", lessonsPerUnit: 5, units: ["Jobs", "Hobbies", "Transport", "Nature", "Time"] },
  { id: "lvl5", name: "Level 5 · Confident", icon: "🚀", lessonsPerUnit: 6, units: ["Food & Drink", "Animals 2", "Sports", "Music", "Travel"] },
  { id: "lvl6", name: "Level 6 · Brave", icon: "🛡️", lessonsPerUnit: 7, units: ["City", "Health", "Technology", "Culture", "Festivals"] },
  { id: "lvl7", name: "Level 7 · Advanced", icon: "🏔️", lessonsPerUnit: 8, units: ["Environment", "Science", "Shopping", "Books", "Stories"] },
  { id: "lvl8", name: "Level 8 · Strong", icon: "🦁", lessonsPerUnit: 9, units: ["Communication", "History", "Design", "Media", "Adventure"] },
  { id: "lvl9", name: "Level 9 · Elite", icon: "🌌", lessonsPerUnit: 10, units: ["Career", "Dreams", "Leadership", "Innovation", "Future"] },
  { id: "lvl10", name: "Level 10 · Master", icon: "🏆", lessonsPerUnit: 12, units: ["Fluency", "Debate", "Presentation", "Writing", "Real World"] },
];

const WORD_BANK = {
  Hello: ["Hello", "Hi", "Goodbye", "Teacher", "Student", "School", "Friend", "Class", "Please", "Thanks"],
  Numbers: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"],
  Colors: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Pink", "Purple", "Orange", "Brown", "Gray", "Gold"],
  Animals: ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Lion", "Tiger", "Bear", "Monkey", "Elephant", "Horse", "Zebra"],
  Toys: ["Ball", "Doll", "Car", "Robot", "Puzzle", "Blocks", "Kite", "Train", "Plane", "Teddy bear", "Toy", "Puzzle"],
  Family: ["Mother", "Father", "Brother", "Sister", "Baby", "Grandma", "Grandpa", "Aunt", "Uncle", "Cousin", "Family", "Home"],
  School: ["Book", "Pen", "Desk", "Chair", "Teacher", "Classroom", "Pencil", "Bag", "Board", "Lesson", "Homework", "Together"],
  Food: ["Apple", "Bread", "Milk", "Rice", "Soup", "Cake", "Tea", "Water", "Juice", "Egg", "Salad", "Cookie"],
  Body: ["Head", "Face", "Hand", "Foot", "Eye", "Ear", "Mouth", "Hair", "Arm", "Leg", "Shoulder", "Smile"],
  Weather: ["Sun", "Cloud", "Rain", "Wind", "Snow", "Storm", "Warm", "Cool", "Sunny", "Cloudy", "Fog", "Rainbow"],
  Home: ["Door", "Window", "Room", "Table", "Bedroom", "Kitchen", "Bathroom", "Garden", "Lamp", "Chair", "Sofa", "Clock"],
  "Daily Life": ["Wake up", "Brush teeth", "Eat breakfast", "Go to school", "Read book", "Play game", "Take a shower", "Sleep", "Clean room", "Help mom", "Do homework", "Ride bike"],
  Places: ["Park", "Market", "Library", "Hospital", "Station", "Restaurant", "Cinema", "Beach", "School", "Zoo", "Museum", "Store"],
  Clothes: ["Shirt", "Dress", "Pants", "Shoes", "Jacket", "Hat", "Socks", "Skirt", "Shorts", "Coat", "Gloves", "Scarf"],
  Actions: ["Run", "Jump", "Walk", "Dance", "Sing", "Draw", "Read", "Write", "Listen", "Speak", "Build", "Learn"],
  Jobs: ["Doctor", "Teacher", "Farmer", "Driver", "Nurse", "Engineer", "Artist", "Cook", "Pilot", "Builder", "Singer", "Writer"],
  Hobbies: ["Swimming", "Drawing", "Reading", "Dancing", "Cycling", "Painting", "Cooking", "Gardening", "Singing", "Running", "Traveling", "Gaming"],
  Transport: ["Bus", "Car", "Bike", "Train", "Airplane", "Ship", "Taxi", "Motorbike", "Road", "Ticket", "Station", "Airport"],
  Nature: ["Mountain", "River", "Forest", "Lake", "Flower", "Leaf", "Tree", "Bird", "Stone", "Sand", "Grass", "Sunrise"],
  Time: ["Morning", "Afternoon", "Evening", "Night", "Today", "Tomorrow", "Yesterday", "Week", "Month", "Year", "Hour", "Minute"],
  "Food & Drink": ["Pizza", "Burger", "Pasta", "Soup", "Salad", "Cake", "Tea", "Coffee", "Milk", "Water", "Juice", "Orange"],
  "Animals 2": ["Wolf", "Fox", "Panda", "Koala", "Dolphin", "Penguin", "Eagle", "Parrot", "Frog", "Snake", "Deer", "Camel"],
  Sports: ["Football", "Basketball", "Swimming", "Running", "Tennis", "Badminton", "Volleyball", "Jumping", "Training", "Score", "Coach", "Team"],
  Music: ["Song", "Guitar", "Piano", "Drum", "Violin", "Dance", "Beat", "Rhythm", "Voice", "Singer", "Concert", "Music"],
  Travel: ["Trip", "Passport", "Suitcase", "Hotel", "Guide", "Beach", "Tour", "Map", "Plane", "Train", "Ticket", "Holiday"],
  City: ["Street", "Bridge", "Tower", "Square", "Market", "Museum", "Station", "Park", "Traffic", "Building", "Neighborhood", "City"],
  Health: ["Healthy", "Exercise", "Sleep", "Medicine", "Doctor", "Hospital", "Pain", "Rest", "Water", "Vitamin", "Energy", "Balance"],
  Technology: ["Computer", "Phone", "Tablet", "Internet", "Keyboard", "Website", "Camera", "Robot", "Software", "Screen", "Battery", "Charge"],
  Culture: ["Festival", "Painting", "Dance", "Music", "Poem", "Story", "Language", "Tradition", "Ceremony", "Museum", "Art", "Culture"],
  Festivals: ["New Year", "Christmas", "Tet", "Birthday", "Party", "Lantern", "Firework", "Gift", "Celebration", "Music", "Dance", "Festival"],
  Environment: ["Air", "Earth", "River", "Forest", "Recycle", "Energy", "Planet", "Clean", "Waste", "Nature", "Protect", "Eco"],
  Science: ["Science", "Experiment", "Planet", "Gravity", "Energy", "Lab", "Atom", "Galaxy", "Human", "Earth", "Space", "Research"],
  Shopping: ["Shop", "Basket", "Price", "Money", "Cash", "Card", "Store", "List", "Buy", "Sell", "Discount", "Receipt"],
  Books: ["Book", "Story", "Page", "Chapter", "Author", "Poem", "Novel", "Library", "Comic", "Reader", "Write", "Read"],
  Stories: ["Hero", "Dragon", "Castle", "Forest", "Magic", "Adventure", "King", "Queen", "Princess", "Treasure", "Legend", "Story"],
  Communication: ["Message", "Phone", "Email", "Call", "Friend", "Meet", "Discuss", "Listen", "Talk", "Note", "Reply", "Address"],
  History: ["Past", "Ancient", "People", "King", "Queen", "Empire", "Weapon", "Map", "Memory", "Village", "Story", "History"],
  Design: ["Color", "Shape", "Sketch", "Pattern", "Style", "Decoration", "Canvas", "Poster", "Project", "Brand", "Design", "Art"],
  Media: ["Video", "Camera", "Photo", "Radio", "Podcast", "News", "Channel", "Screen", "Stream", "Social", "Media", "Record"],
  Adventure: ["Journey", "Trail", "Compass", "Camp", "Forest", "River", "Cave", "Summit", "Map", "Tent", "Adventure", "Discovery"],
  Career: ["Career", "Office", "Manager", "Project", "Client", "Team", "Leader", "Target", "Task", "Salary", "Work", "Success"],
  Dreams: ["Dream", "Future", "Goal", "Hope", "Wish", "Power", "Courage", "Plan", "Success", "Bravery", "Vision", "Dreams"],
  Leadership: ["Leader", "Team", "Plan", "Vision", "Courage", "Decision", "Guide", "Support", "Strategy", "Result", "Focus", "Leadership"],
  Innovation: ["Idea", "Create", "Invent", "Future", "Design", "Launch", "Smart", "Process", "Product", "Technology", "Label", "Innovation"],
  Future: ["Future", "Tomorrow", "Cloud", "Robot", "Space", "Travel", "Smart", "System", "Connect", "Dream", "Goal", "Future"],
  Fluency: ["Fluent", "Sentence", "Speak", "Listen", "Read", "Write", "Confident", "Practice", "Clear", "Smooth", "Fast", "Fluency"],
  Debate: ["Argue", "Opinion", "Reason", "Fact", "Point", "Question", "Discuss", "Evidence", "Claim", "Response", "Debate", "Balance"],
  Presentation: ["Present", "Slide", "Speech", "Audience", "Topic", "Voice", "Pause", "Show", "Explain", "Report", "Presentation", "Story"],
  Writing: ["Write", "Draft", "Essay", "Paragraph", "Sentence", "Letter", "Drafting", "Grammar", "Word", "Journal", "Writing", "Style"],
  "Real World": ["Market", "Doctor", "Airport", "Office", "Travel", "Restaurant", "Public", "Ticket", "Map", "Guide", "Real", "World"],
};

const UNIT_ICONS = {
  Hello: "👋", Numbers: "🔢", Colors: "🎨", Animals: "🐶", Toys: "🧸", Family: "👨‍👩‍👧", School: "🏫", Food: "🍎", Body: "🧍",
  Weather: "🌤️", Home: "🏠", "Daily Life": "🧩", Places: "📍", Clothes: "👕", Actions: "🏃", Jobs: "💼", Hobbies: "🎯",
  Transport: "🚗", Nature: "🌿", Time: "⏰", "Food & Drink": "🥗", "Animals 2": "🦊", Sports: "⚽", Music: "🎵", Travel: "✈️",
  City: "🏙️", Health: "💊", Technology: "💻", Culture: "🎭", Festivals: "🎉", Environment: "🌍", Science: "🔬", Shopping: "🛒",
  Books: "📚", Stories: "📖", Communication: "💬", History: "🏺", Design: "🎨", Media: "📺", Adventure: "🗺️", Career: "👔",
  Dreams: "🌠", Leadership: "🧠", Innovation: "⚙️", Future: "🚀", Fluency: "🗣️", Debate: "🗣️", Presentation: "📊", Writing: "✍️",
  "Real World": "🌎"
};

const UNIT_COLORS = ["#3FA7D6", "#8E7CC3", "#E85D75", "#3FA76B", "#F2994A", "#F7B267", "#7FBCB8", "#FF6B6B", "#4ECDC4", "#5B8DEF"];

const VOCAB_WORD_ORDER = [...new Set(Object.values(WORD_BANK).flat())];

function buildUniqueWordLabels() {
  const labels = {};
  const used = new Set();

  VOCAB_WORD_ORDER.forEach((word) => {
    const letters = word.replace(/[^a-z]/gi, "").toUpperCase();
    let label = letters.slice(0, 2) || "??";
    let length = 2;
    while (used.has(label) && length <= letters.length) {
      length += 1;
      label = letters.slice(0, length);
    }
    if (used.has(label)) label = `${letters.slice(0, 1)}${letters.slice(-1)}`;
    if (used.has(label)) label = `${label}${VOCAB_WORD_ORDER.indexOf(word) + 1}`;
    labels[word] = label;
    used.add(label);
  });

  return labels;
}

const VOCAB_WORD_LABELS = buildUniqueWordLabels();

function buildVocabulary(word) {
  const trimmed = String(word).trim();
  const base = trimmed.toLowerCase().replace(/\s+/g, "");

  const emojiMap = {
    Hello: "👋", Hi: "🙋", Goodbye: "👋", Teacher: "🧑‍🏫", Student: "🧑‍🎓", School: "🏫", Friend: "🤝", Class: "📚",
    One: "1️⃣", Two: "2️⃣", Three: "3️⃣", Four: "4️⃣", Five: "5️⃣", Six: "6️⃣", Seven: "7️⃣", Eight: "8️⃣", Nine: "9️⃣", Ten: "🔟",
    Red: "🔴", Blue: "🔵", Green: "🟢", Yellow: "🟡", Black: "⚫", White: "⚪", Pink: "🩷", Purple: "🟣", Orange: "🟠", Brown: "🟤",
    Dog: "🐶", Cat: "🐱", Bird: "🐦", Fish: "🐟", Rabbit: "🐰", Lion: "🦁", Tiger: "🐯", Bear: "🐻", Monkey: "🐒", Elephant: "🐘",
    Ball: "⚽", Doll: "🪆", Car: "🚗", Robot: "🤖", Puzzle: "🧩", Kite: "🪁", Train: "🚆", Plane: "✈️", "Teddy bear": "🧸",
    Mother: "👩", Father: "👨", Brother: "👦", Sister: "👧", Family: "👨‍👩‍👧", Book: "📘", Pen: "🖊️", Desk: "🪑", Apple: "🍎", Bread: "🍞",
    Milk: "🥛", Rice: "🍚", Soup: "🍲", Cake: "🎂", Tea: "🫖", Water: "💧", Egg: "🥚", Sun: "☀️", Rain: "🌧️", Snow: "❄️", Cloud: "☁️",
    Wind: "💨", Rainbow: "🌈", Park: "🌳", Beach: "🏖️", Shirt: "👕", Shoes: "👟", Jacket: "🧥", Hat: "🧢", Pants: "👖", Scarf: "🧣",
    Run: "🏃", Jump: "🤸", Sing: "🎤", Dance: "💃", Read: "📖", Write: "✍️", Listen: "🎧", Speak: "🗣️", Doctor: "🩺", Engineer: "🛠️",
    Football: "⚽", Basketball: "🏀", Swimming: "🏊", Guitar: "🎸", Piano: "🎹", Song: "🎵", Trip: "🧳", Hotel: "🏨", City: "🏙️",
    Computer: "💻", Phone: "📱", Internet: "🌐", Science: "🔬", Store: "🛒", Music: "🎵", Adventure: "🗺️", Future: "🚀"
  };

  const viMap = {
    Hello: "Xin chào", Hi: "Chào", Goodbye: "Tạm biệt", Teacher: "Giáo viên", Student: "Học sinh", School: "Trường học",
    Friend: "Bạn bè", Class: "Lớp học", One: "Một", Two: "Hai", Three: "Ba", Four: "Bốn", Five: "Năm", Six: "Sáu", Seven: "Bảy",
    Eight: "Tám", Nine: "Chín", Ten: "Mười", Red: "Màu đỏ", Blue: "Màu xanh dương", Green: "Màu xanh lá", Yellow: "Màu vàng",
    Black: "Màu đen", White: "Màu trắng", Pink: "Màu hồng", Purple: "Màu tím", Orange: "Màu cam", Brown: "Màu nâu",
    Dog: "Con chó", Cat: "Con mèo", Bird: "Con chim", Fish: "Con cá", Rabbit: "Con thỏ", Lion: "Sư tử", Tiger: "Con hổ",
    Bear: "Con gấu", Monkey: "Con khỉ", Elephant: "Con voi", Ball: "Quả bóng", Doll: "Búp bê", Car: "Xe hơi", Robot: "Người máy",
    Puzzle: "Trò xếp hình", Kite: "Diều", Train: "Tàu hỏa", Plane: "Máy bay", "Teddy bear": "Gấu bông", Mother: "Mẹ",
    Father: "Bố", Brother: "Anh/chị/em trai", Sister: "Chị/em gái", Family: "Gia đình", Book: "Quyển sách", Pen: "Bút viết",
    Desk: "Bàn học", Apple: "Quả táo", Bread: "Bánh mỳ", Milk: "Sữa", Rice: "Cơm", Soup: "Súp", Cake: "Bánh ngọt",
    Tea: "Trà", Water: "Nước", Egg: "Trứng", Sun: "Mặt trời", Rain: "Mưa", Cloud: "Mây", Wind: "Gió", Rainbow: "Cầu vồng",
    Park: "Công viên", Beach: "Bãi biển", Shirt: "Áo sơ mi", Dress: "Váy", Pants: "Quần", Shoes: "Giày", Hat: "Mũ", Scarf: "Khăn quàng",
    Run: "Chạy", Jump: "Nhảy", Sing: "Hát", Dance: "Nhảy múa", Read: "Đọc", Write: "Viết", Listen: "Nghe", Speak: "Nói",
    Doctor: "Bác sĩ", Engineer: "Kỹ sư", Artist: "Nghệ sĩ", Cook: "Đầu bếp", Football: "Bóng đá", Basketball: "Bóng rổ",
    Swimming: "Bơi", Guitar: "Đàn guitar", Piano: "Đàn piano", Song: "Bài hát", Trip: "Chuyến đi", Passport: "Hộ chiếu",
    Hotel: "Khách sạn", City: "Thành phố", Computer: "Máy tính", Phone: "Điện thoại", Internet: "Internet", Science: "Khoa học",
    Store: "Cửa hàng", Music: "Âm nhạc", Adventure: "Phiêu lưu", Future: "Tương lai"
  };

  const baseIcon = emojiMap[trimmed] || emojiMap[base];
  const baseIconCount = VOCAB_WORD_ORDER.filter((vocabWord) =>
    (emojiMap[vocabWord] || emojiMap[vocabWord.toLowerCase().replace(/\s+/g, "")]) === baseIcon
  ).length;

  return {
    word: trimmed,
    vi: viMap[trimmed] || trimmed,
    emoji: baseIcon && baseIconCount === 1 ? baseIcon : (VOCAB_WORD_LABELS[trimmed] || trimmed.slice(0, 2).toUpperCase()),
    ipa: `/${base}/`
  };
}

function buildSentencePattern(words) {
  const a = words[0] || "We";
  const b = words[1] || "love";
  const c = words[2] || "English";
  return [
    { prompt: `${a} , ${b} , ${c}`, answer: `${a} ${b} ${c}.` },
    { prompt: `${c} , ${b} , ${a}`, answer: `${c} ${b} ${a}.` },
  ];
}

function makeLesson(levelId, unitName, lessonIndex, words) {
  const vocab = words.map((word) => buildVocabulary(word));
  return {
    id: `${levelId}u${unitName.toLowerCase().replace(/\s+/g, "")}l${lessonIndex + 1}`,
    title: `Bài ${lessonIndex + 1} · ${unitName}`,
    vocab,
    sentences: buildSentencePattern(vocab.map((v) => v.word).slice(0, 3))
  };
}

function buildCourse() {
  const allUnits = [];

  LEVEL_CONFIG.forEach((level) => {
    level.units.forEach((unitName, unitIndex) => {
      const words = WORD_BANK[unitName] || [unitName, "Practice", "Study", "Learn", "Success"];
      const lessons = [];
      for (let i = 0; i < level.lessonsPerUnit; i += 1) {
        const lessonWords = Array.from({ length: 5 }, (_, j) => words[(i * 5 + j + unitIndex) % words.length]);
        lessons.push(makeLesson(level.id, unitName, i, lessonWords));
      }

      allUnits.push({
        id: `${level.id}u${unitIndex + 1}`,
        name: unitName,
        icon: UNIT_ICONS[unitName] || "📘",
        color: UNIT_COLORS[(unitIndex + level.lessonsPerUnit) % UNIT_COLORS.length],
        lessons
      });
    });
  });

  return {
    id: "lvl-all",
    name: "Levels 1–10",
    subtitle: "10 level tăng dần độ khó",
    icon: "🗺️",
    levels: LEVEL_CONFIG,
    units: allUnits,
  };
}

const COURSE = buildCourse();

/* ---------- Helpers dùng để tra cứu dữ liệu ---------- */

function getAllLessons() {
  const list = [];
  COURSE.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      list.push({ unit, lesson });
    });
  });
  return list;
}

function findLessonById(lessonId) {
  for (const unit of COURSE.units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === lessonId) return { unit, lesson };
    }
  }
  return null;
}

function getPreviousLessonId(lessonId) {
  const all = getAllLessons();
  const idx = all.findIndex((x) => x.lesson.id === lessonId);
  if (idx <= 0) return null;
  return all[idx - 1].lesson.id;
}

function randomOtherVocab(unit, excludeWord, count) {
  const pool = [];
  unit.lessons.forEach((l) => l.vocab.forEach((v) => pool.push(v)));
  COURSE.units.forEach((u) => u.lessons.forEach((l) => l.vocab.forEach((v) => pool.push(v))));
  const filtered = pool.filter((v, i, arr) => v.word !== excludeWord && arr.findIndex((a) => a.word === v.word) === i);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(unit, lesson) {
  const qs = [];
  const vocab = lesson.vocab;

  vocab.forEach((v) => {
    const distractors = randomOtherVocab(unit, v.word, 2).map((d) => d.word);
    qs.push({
      type: "choice",
      prompt: "Đây là gì?",
      emoji: v.emoji,
      options: shuffle([v.word, ...distractors]),
      answer: v.word,
      hint: v.vi,
    });
  });

  shuffle(vocab).slice(0, 3).forEach((v) => {
    const distractors = randomOtherVocab(unit, v.word, 2);
    const options = shuffle([v, ...distractors]);
    qs.push({
      type: "listen",
      prompt: "Nghe và chọn hình đúng",
      audioText: v.word,
      options: options.map((o) => ({ emoji: o.emoji, word: o.word })),
      answer: v.word,
    });
  });

  shuffle(vocab).slice(0, 2).forEach((v) => {
    const distractors = randomOtherVocab(unit, v.word, 2).map((d) => d.word);
    qs.push({
      type: "fill",
      prompt: `"${v.vi}" trong tiếng Anh là ___`,
      options: shuffle([v.word, ...distractors]),
      answer: v.word,
    });
  });

  const translatedVocab = vocab.filter((v) => v.vi !== v.word);
  const translationVocab = shuffle(translatedVocab.length >= 2 ? translatedVocab : vocab).slice(0, 2);
  const localVietnameseDistractors = shuffle(vocab.filter((v) =>
    v.word !== translationVocab[0].word && v.vi !== v.word
  ));
  const globalVietnameseDistractors = randomOtherVocab(unit, translationVocab[0].word, 8)
    .filter((v) => v.vi !== v.word)
    .map((v) => v.vi);
  const vietnameseDistractors = [
    ...localVietnameseDistractors.map((v) => v.vi),
    ...globalVietnameseDistractors,
  ]
    .filter((meaning, index, meanings) => meanings.indexOf(meaning) === index)
    .slice(0, 2);
  const translationQuestions = [
    {
      type: "translate",
      direction: "english-to-vietnamese",
      prompt: "Viết lại bằng tiếng Việt",
      source: translationVocab[0].word,
      options: shuffle([translationVocab[0].vi, ...vietnameseDistractors]),
      answer: translationVocab[0].vi,
    },
    {
      type: "translate",
      direction: "vietnamese-to-english",
      prompt: "Viết lại bằng tiếng Anh",
      source: translationVocab[1].vi,
      options: shuffle([translationVocab[1].word, ...randomOtherVocab(unit, translationVocab[1].word, 2).map((v) => v.word)]),
      answer: translationVocab[1].word,
    },
  ];
  qs.push(...translationQuestions);

  (lesson.sentences || []).forEach((s) => {
    const words = s.prompt.split(",").map((w) => w.trim()).filter(Boolean);
    qs.push({
      type: "order",
      prompt: "Sắp xếp thành câu đúng",
      words: shuffle(words),
      answer: s.answer,
    });
  });

  const requiredTranslationQuestions = qs.filter((question) => question.type === "translate");
  const otherQuestions = shuffle(qs.filter((question) => question.type !== "translate"));
  return [...requiredTranslationQuestions, ...otherQuestions].slice(0, 10);
}
