/* ==========================================================================
   English Adventure — learn.js (trang chọn Unit / Lesson)
   ========================================================================== */

const profile = loadProfile();
saveProfile(profile); // đảm bảo hồ sơ tồn tại ngay từ lần đầu

function getCurrentLevelInfo() {
  const levelOrder = getLevelOrder();
  const unlocked = Math.max(1, profile.unlockedLevel || 1);
  const idx = Math.min(Math.max(unlocked - 1, 0), Math.max(levelOrder.length - 1, 0));
  const level = (LEVEL_CONFIG || COURSE.levels || [{}])[idx] || { id: "lvl1", name: "Level 1 · Beginner", icon: "🌱" };
  return level;
}

function renderTopbar() {
  document.getElementById("pill-streak").textContent = profile.streak;
  document.getElementById("pill-hearts").textContent = profile.hearts;
  document.getElementById("pill-xp").textContent = profile.xp;

  const title = document.getElementById("page-title");
  if (title) {
    const current = getCurrentLevelInfo();
    title.textContent = `${current.name} ${current.icon || "🌱"}`;
  }
}

function statusOf(lessonId) {
  if (profile.progress[lessonId]?.completed) return "done";
  if (isLessonUnlocked(profile, lessonId)) return "available";
  return "locked";
}

function renderUnits() {
  const container = document.getElementById("units-container");
  container.innerHTML = "";

  const allLevels = (COURSE.levels && COURSE.levels.length) ? COURSE.levels : [{ id: "all", name: "All Levels", icon: "🗺️", units: COURSE.units }];

  allLevels.forEach((level, levelIndex) => {
    const levelUnits = level.units || COURSE.units.filter((unit) => unit.id.startsWith(level.id || ""));
    const levelUnlocked = !level.id || level.id === "all" ? true : isLevelUnlocked(profile, level.id);

    const levelSection = document.createElement("section");
    levelSection.className = "level-block";
    levelSection.style.marginBottom = "24px";
    levelSection.style.opacity = levelUnlocked ? "1" : "0.7";

    const levelHeader = document.createElement("div");
    levelHeader.className = "unit-header";
    levelHeader.style.background = levelIndex % 2 === 0 ? "linear-gradient(135deg, #3FA7D6, #57C7A7)" : "linear-gradient(135deg, #8E7CC3, #E85D75)";
    levelHeader.innerHTML = `<span class="ic">${level.icon || "🎯"}</span> ${level.name}${levelUnlocked ? "" : " · 🔒"}`;
    levelSection.appendChild(levelHeader);

    const levelContent = document.createElement("div");
    levelContent.style.display = "flex";
    levelContent.style.flexDirection = "column";
    levelContent.style.gap = "16px";

    if (levelUnits.length) {
      levelUnits.forEach((unit) => {
        const block = document.createElement("div");
        block.className = "unit-block";

        const header = document.createElement("div");
        header.className = "unit-header";
        header.style.background = unit.color || "#3FA7D6";
        header.innerHTML = `<span class="ic">${unit.icon || "📘"}</span> Unit — ${unit.name}`;
        block.appendChild(header);

        const trail = document.createElement("div");
        trail.className = "trail";

        unit.lessons.forEach((lesson) => {
          const status = levelUnlocked ? statusOf(lesson.id) : "locked";
          const wrap = document.createElement("div");
          wrap.style.display = "flex";
          wrap.style.flexDirection = "column";
          wrap.style.alignItems = "center";
          wrap.style.gap = "6px";

          const node = document.createElement("button");
          node.className = `lesson-node ${status}`;
          node.disabled = status === "locked";
          node.innerHTML = status === "locked" ? "🔒" : (status === "done" ? "⭐" : "▶");
          if (status === "done") {
            const check = document.createElement("span");
            check.className = "badge-check";
            check.textContent = "✅";
            node.appendChild(check);
          }
          node.addEventListener("click", () => {
            if (status !== "locked") {
              window.location.href = `quiz.html?lesson=${lesson.id}`;
            }
          });

          const label = document.createElement("div");
          label.className = "lesson-label";
          label.textContent = lesson.title;

          wrap.appendChild(node);
          wrap.appendChild(label);
          trail.appendChild(wrap);
        });

        block.appendChild(trail);
        levelContent.appendChild(block);
      });
    }

    levelSection.appendChild(levelContent);
    container.appendChild(levelSection);
  });
}

renderTopbar();
renderUnits();
