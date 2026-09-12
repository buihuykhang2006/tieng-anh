/* ==========================================================================
   English Adventure — Quản lý dữ liệu người học (localStorage)
   ========================================================================== */

const STORAGE_KEY = "ea_profile_v1";
const MAX_HEARTS = 5;
const XP_PER_LEVEL = 100;

const BADGES = [
  { id: "first_lesson", name: "First Lesson", desc: "Hoàn thành bài học đầu tiên", icon: "🏅" },
  { id: "streak_7", name: "7 Day Streak", desc: "Học 7 ngày liên tiếp", icon: "🔥" },
  { id: "word_master", name: "Word Master", desc: "Học 30 từ vựng", icon: "📚" },
  { id: "listening_hero", name: "Listening Hero", desc: "Trả lời đúng 20 câu nghe", icon: "🎧" },
  { id: "perfect", name: "Perfect", desc: "Đạt 100% trong một bài", icon: "⭐" },
];

function defaultProfile() {
  return {
    name: "Học sinh",
    xp: 0,
    level: 1,
    streak: 0,
    lastStudyDate: null,
    hearts: MAX_HEARTS,
    progress: {},          // { lessonId: { completed: true, best: 90 } }
    learnedWords: [],      // danh sách từ đã học (unique)
    listenCorrectCount: 0,
    badges: [],
    character: "fox",
    unlockedLevel: 1,
  };
}

function getLevelOrder() {
  if (Array.isArray(LEVEL_CONFIG) && LEVEL_CONFIG.length) {
    return LEVEL_CONFIG.map((level) => level.id);
  }
  if (Array.isArray(COURSE?.levels) && COURSE.levels.length) {
    return COURSE.levels.map((level) => level.id);
  }
  return [];
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultProfile(), parsed);
  } catch (e) {
    console.error("Không đọc được dữ liệu, dùng hồ sơ mới", e);
    return defaultProfile();
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function isYesterday(dateStr, today) {
  const d = new Date(dateStr);
  const y = new Date(today);
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
}

function touchStreak(profile) {
  const today = new Date();
  const todayStr = today.toDateString();
  if (profile.lastStudyDate === todayStr) {
    // đã học hôm nay rồi, không đổi streak
  } else if (profile.lastStudyDate && isYesterday(profile.lastStudyDate, today)) {
    profile.streak += 1;
  } else {
    profile.streak = 1;
  }
  profile.lastStudyDate = todayStr;
}

function addXp(profile, amount) {
  profile.xp += amount;
  const newLevel = Math.floor(profile.xp / XP_PER_LEVEL) + 1;
  const leveledUp = newLevel > profile.level;
  profile.level = newLevel;
  return leveledUp;
}

function resetHeartsForLesson(profile) {
  profile.hearts = MAX_HEARTS;
  saveProfile(profile);
}

function loseHeart(profile) {
  profile.hearts = Math.max(0, profile.hearts - 1);
  saveProfile(profile);
  return profile.hearts;
}

function checkNewBadges(profile) {
  const earned = [];
  const has = (id) => profile.badges.includes(id);

  if (!has("first_lesson") && Object.keys(profile.progress).length >= 1) {
    profile.badges.push("first_lesson");
    earned.push("first_lesson");
  }
  if (!has("streak_7") && profile.streak >= 7) {
    profile.badges.push("streak_7");
    earned.push("streak_7");
  }
  if (!has("word_master") && profile.learnedWords.length >= 30) {
    profile.badges.push("word_master");
    earned.push("word_master");
  }
  if (!has("listening_hero") && profile.listenCorrectCount >= 20) {
    profile.badges.push("listening_hero");
    earned.push("listening_hero");
  }
  return earned;
}

function completeLesson(profile, lesson, scorePercent) {
  touchStreak(profile);

  const prev = profile.progress[lesson.id];
  profile.progress[lesson.id] = {
    completed: true,
    best: prev ? Math.max(prev.best, scorePercent) : scorePercent,
  };

  lesson.vocab.forEach((v) => {
    if (!profile.learnedWords.includes(v.word)) profile.learnedWords.push(v.word);
  });

  if (scorePercent === 100 && !profile.badges.includes("perfect")) {
    profile.badges.push("perfect");
  }

  const currentLevelId = getLevelIdFromLessonId(lesson.id);
  const levelOrder = getLevelOrder();
  const currentLevelIndex = levelOrder.indexOf(currentLevelId);

  if (currentLevelId && currentLevelIndex >= 0) {
    const currentLevelLessons = COURSE.units.filter((unit) =>
      unit.lessons.some((item) => item.id.startsWith(currentLevelId))
    );

    const currentLevelDone = currentLevelLessons.length > 0 && currentLevelLessons.every((unit) =>
      unit.lessons.every((item) => !!profile.progress[item.id]?.completed)
    );

    if (currentLevelDone && currentLevelIndex + 1 < levelOrder.length) {
      profile.unlockedLevel = Math.max(profile.unlockedLevel || 1, currentLevelIndex + 2);
    }
  }

  const xpEarned = Math.round(10 + scorePercent / 10); // 10-20 XP tuỳ điểm
  const leveledUp = addXp(profile, xpEarned);
  const newBadges = checkNewBadges(profile);

  saveProfile(profile);
  return { xpEarned, leveledUp, newBadges };
}

function getLevelIdFromLessonId(lessonId) {
  if (!lessonId) return null;
  const match = String(lessonId).match(/^(lvl\d+)/);
  return match ? match[1] : null;
}

function isLevelUnlocked(profile, levelId) {
  if (!levelId) return true;
  const levelOrder = getLevelOrder();
  const idx = levelOrder.indexOf(levelId);
  if (idx <= 0) return true;

  const prevLevel = levelOrder[idx - 1];
  const prevLessons = COURSE.units.filter((unit) => unit.lessons.some((lesson) => lesson.id.startsWith(prevLevel)));
  const prevLevelDone = prevLessons.length > 0 && prevLessons.every((unit) =>
    unit.lessons.every((lesson) => !!profile.progress[lesson.id]?.completed)
  );

  return prevLevelDone;
}

function isLessonUnlocked(profile, lessonId) {
  const levelId = getLevelIdFromLessonId(lessonId);
  if (levelId && !isLevelUnlocked(profile, levelId)) return false;

  const prevId = getPreviousLessonId(lessonId);
  if (!prevId) return true; // bài đầu tiên luôn mở
  return !!profile.progress[prevId]?.completed;
}

/* Phát âm bằng Web Speech API (không cần file mp3) */
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}
