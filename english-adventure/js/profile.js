/* ==========================================================================
   English Adventure — profile.js
   ========================================================================== */

const profile = loadProfile();

const CHARACTERS = [
  { id: "fox", name: "Fox", emoji: "🦊", unlockLevel: 1 },
  { id: "cat", name: "Cat", emoji: "🐱", unlockLevel: 3 },
  { id: "panda", name: "Panda", emoji: "🐼", unlockLevel: 5 },
  { id: "rabbit", name: "Rabbit", emoji: "🐰", unlockLevel: 7 },
  { id: "tiger", name: "Tiger", emoji: "🐯", unlockLevel: 10 },
];

function renderHeader() {
  document.getElementById("pill-streak").textContent = profile.streak;
  document.getElementById("pill-hearts").textContent = profile.hearts;
  document.getElementById("pill-xp").textContent = profile.xp;
  document.getElementById("p-name").textContent = profile.name;
  document.getElementById("p-level").textContent = profile.level;
  document.getElementById("p-lessons").textContent = Object.keys(profile.progress).length;
}

function renderBadges() {
  const grid = document.getElementById("badge-grid");
  grid.innerHTML = "";
  BADGES.forEach((b) => {
    const earned = profile.badges.includes(b.id);
    const card = document.createElement("div");
    card.className = `badge-card ${earned ? "" : "locked"}`;
    card.innerHTML = `<div class="b-icon">${b.icon}</div><h4>${b.name}</h4><p>${b.desc}</p>`;
    grid.appendChild(card);
  });
}

function renderCharacters() {
  const grid = document.getElementById("char-grid");
  grid.innerHTML = "";
  CHARACTERS.forEach((c) => {
    const unlocked = profile.level >= c.unlockLevel;
    const card = document.createElement("div");
    card.className = `char-card ${unlocked ? "" : "locked"}`;
    card.innerHTML = `<div class="c-emoji">${unlocked ? c.emoji : "🔒"}</div><p>${unlocked ? c.name : "Lv." + c.unlockLevel}</p>`;
    grid.appendChild(card);
  });
}

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Bạn chắc chắn muốn xoá toàn bộ tiến độ học tập?")) {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "learn.html";
  }
});

renderHeader();
renderBadges();
renderCharacters();
