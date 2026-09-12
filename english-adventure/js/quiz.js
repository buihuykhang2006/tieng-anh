/* ==========================================================================
   English Adventure — quiz.js (engine làm bài)
   ========================================================================== */

const params = new URLSearchParams(window.location.search);
const lessonId = params.get("lesson");
const found = findLessonById(lessonId);
const root = document.getElementById("quiz-root");

if (!found) {
  root.innerHTML = `<div class="empty-state"><div class="e-icon">🙈</div><h3>Không tìm thấy bài học</h3>
    <a href="learn.html" class="btn btn-primary" style="margin-top:16px;">Quay lại</a></div>`;
  throw new Error("Lesson not found");
}

const { unit, lesson } = found;
const profile = loadProfile();

let screen = "intro"; // intro | question | result
let questions = [];
let qIndex = 0;
let correctCount = 0;
let orderPlaced = [];
let orderBank = [];
let selected = null;
let feedbackState = null; // null | 'correct' | 'wrong'
let heartsOut = false;

function normalize(s) {
  return s.toLowerCase().replace(/[.,!?]/g, "").trim().replace(/\s+/g, " ");
}

function render() {
  if (heartsOut) return renderHeartsModal();
  if (screen === "intro") return renderIntro();
  if (screen === "question") return renderQuestion();
  if (screen === "result") return renderResult();
}

/* ---------------- Intro / flashcards ---------------- */
function renderIntro() {
  root.innerHTML = `
    <div class="quiz-shell">
      <div class="quiz-top">
        <a href="learn.html" class="quiz-close">✕</a>
        <div class="progress-track"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <div class="quiz-body">
        <h2 class="quiz-prompt">Từ vựng: ${lesson.title}</h2>
        <div id="flash-list" style="display:flex; flex-direction:column; gap:12px;"></div>
        <button class="btn btn-primary" id="start-btn" style="width:100%; margin-top:26px;">Bắt đầu làm bài 🚀</button>
      </div>
    </div>
  `;
  const list = document.getElementById("flash-list");
  lesson.vocab.forEach((v) => {
    const row = document.createElement("div");
    row.className = "card";
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "16px";
    row.style.margin = "0";
    row.innerHTML = `
      <div style="font-size:2.2rem;">${v.emoji}</div>
      <div style="flex:1;">
        <div style="font-family:'Baloo 2',sans-serif; font-weight:800; color:var(--forest);">${v.word}</div>
        <div style="color:var(--ink-soft); font-size:0.85rem;">${v.ipa} · ${v.vi}</div>
      </div>
      <button class="btn btn-sky" style="padding:10px 16px;">🔊</button>
    `;
    row.querySelector("button").addEventListener("click", () => speak(v.word));
    list.appendChild(row);
  });
  document.getElementById("start-btn").addEventListener("click", () => {
    resetHeartsForLesson(profile);
    questions = buildQuestions(unit, lesson);
    qIndex = 0;
    correctCount = 0;
    screen = "question";
    render();
  });
}

/* ---------------- Question screen ---------------- */
function renderQuestion() {
  const q = questions[qIndex];
  selected = null;
  feedbackState = null;
  orderPlaced = [];
  orderBank = q.type === "order" ? [...q.words] : [];

  root.innerHTML = `
    <div class="quiz-shell">
      <div class="quiz-top">
        <a href="learn.html" class="quiz-close">✕</a>
        <div class="progress-track"><div class="progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
        <div class="quiz-hearts" id="hearts-row"></div>
      </div>
      <div class="quiz-body" id="q-area"></div>
      <div id="bottom-bar"></div>
    </div>
  `;
  renderHearts();
  renderQuestionBody(q);
  renderCheckBar();
}

function renderHearts() {
  const row = document.getElementById("hearts-row");
  row.innerHTML = "";
  for (let i = 0; i < MAX_HEARTS; i++) {
    row.innerHTML += i < profile.hearts ? "❤️" : "🤍";
  }
}

function renderQuestionBody(q) {
  const area = document.getElementById("q-area");

  if (q.type === "choice") {
    area.innerHTML = `
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="quiz-emoji-display">${q.emoji}</div>
      <div class="option-grid" id="opt-grid"></div>
    `;
    const grid = document.getElementById("opt-grid");
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option-card";
      card.innerHTML = `<span>${opt}</span>`;
      card.addEventListener("click", () => {
        if (feedbackState) return;
        selected = opt;
        [...grid.children].forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        updateCheckBtn();
      });
      grid.appendChild(card);
    });
  }

  if (q.type === "listen") {
    area.innerHTML = `
      <div class="quiz-prompt">${q.prompt}</div>
      <button class="speak-btn" id="play-audio">🔊 Nghe</button>
      <div class="option-grid" id="opt-grid"></div>
    `;
    document.getElementById("play-audio").addEventListener("click", () => speak(q.audioText));
    speak(q.audioText);
    const grid = document.getElementById("opt-grid");
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option-card";
      card.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span>${opt.word}</span>`;
      card.addEventListener("click", () => {
        if (feedbackState) return;
        selected = opt.word;
        [...grid.children].forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        updateCheckBtn();
      });
      grid.appendChild(card);
    });
  }

  if (q.type === "fill") {
    area.innerHTML = `
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="option-grid" id="opt-grid"></div>
    `;
    const grid = document.getElementById("opt-grid");
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option-card";
      card.innerHTML = `<span>${opt}</span>`;
      card.addEventListener("click", () => {
        if (feedbackState) return;
        selected = opt;
        [...grid.children].forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        updateCheckBtn();
      });
      grid.appendChild(card);
    });
  }

  if (q.type === "order") {
    area.innerHTML = `
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="answer-slot" id="answer-slot"></div>
      <div class="word-bank" id="word-bank"></div>
    `;
    renderOrderUI();
  }
}

function renderOrderUI() {
  const slot = document.getElementById("answer-slot");
  const bank = document.getElementById("word-bank");
  slot.innerHTML = "";
  bank.innerHTML = "";

  orderPlaced.forEach((word, i) => {
    const chip = document.createElement("button");
    chip.className = "word-chip placed";
    chip.textContent = word;
    chip.addEventListener("click", () => {
      if (feedbackState) return;
      orderPlaced.splice(i, 1);
      orderBank.push(word);
      renderOrderUI();
      updateCheckBtn();
    });
    slot.appendChild(chip);
  });

  orderBank.forEach((word, i) => {
    const chip = document.createElement("button");
    chip.className = "word-chip";
    chip.textContent = word;
    chip.addEventListener("click", () => {
      if (feedbackState) return;
      orderBank.splice(i, 1);
      orderPlaced.push(word);
      renderOrderUI();
      updateCheckBtn();
    });
    bank.appendChild(chip);
  });
}

function updateCheckBtn() {
  const btn = document.getElementById("check-btn");
  if (!btn) return;
  const q = questions[qIndex];
  const ready = q.type === "order" ? orderPlaced.length === q.words.length : !!selected;
  btn.disabled = !ready;
}

function renderCheckBar() {
  const bar = document.getElementById("bottom-bar");
  bar.innerHTML = `
    <div class="check-bar">
      <button class="btn btn-primary" id="check-btn" disabled>Kiểm tra</button>
    </div>
  `;
  document.getElementById("check-btn").addEventListener("click", handleCheck);
}

function handleCheck() {
  const q = questions[qIndex];
  let ok = false;

  if (q.type === "order") {
    ok = normalize(orderPlaced.join(" ")) === normalize(q.answer);
  } else {
    ok = selected === q.answer;
  }

  feedbackState = ok ? "correct" : "wrong";
  if (ok) correctCount++;
  if (ok && q.type === "listen") profile.listenCorrectCount++;

  markAnswerVisuals(q, ok);
  renderFeedbackBar(ok, q);
}

function markAnswerVisuals(q, ok) {
  if (q.type === "order") return; // giữ nguyên chip đã đặt
  const grid = document.getElementById("opt-grid");
  if (!grid) return;
  const cards = [...grid.children];
  cards.forEach((card) => {
    const text = card.querySelector("span:last-child").textContent;
    if (text === q.answer) card.classList.add("correct");
    if (card.classList.contains("selected") && text !== q.answer) card.classList.add("wrong");
  });
}

function renderFeedbackBar(ok, q) {
  const bar = document.getElementById("bottom-bar");
  bar.innerHTML = `
    <div class="feedback-bar ${ok ? "ok" : "no"}">
      <div class="feedback-msg">${ok ? "🎉 Chính xác!" : "❌ Chưa đúng — đáp án: " + q.answer}</div>
      <button class="btn ${ok ? "btn-forest" : "btn-primary"}" id="next-btn">Tiếp tục</button>
    </div>
  `;
  document.getElementById("next-btn").addEventListener("click", handleNext);
}

function handleNext() {
  const wasWrong = feedbackState === "wrong";
  if (wasWrong) {
    const remaining = loseHeart(profile);
    if (remaining <= 0) {
      heartsOut = true;
      render();
      return;
    }
  }
  qIndex++;
  if (qIndex >= questions.length) {
    finishLesson();
  } else {
    screen = "question";
    render();
  }
}

/* ---------------- Hết tim ---------------- */
function renderHeartsModal() {
  root.innerHTML += `
    <div class="modal-overlay">
      <div class="modal-card">
        <div class="m-emoji">💔</div>
        <h3>Bạn đã hết lượt tim!</h3>
        <p>Ôn lại từ vựng để lấy lại tim và tiếp tục bài học nhé.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" id="review-btn">📖 Ôn tập & lấy lại tim</button>
          <a href="learn.html" class="btn btn-ghost">Thoát bài học</a>
        </div>
      </div>
    </div>
  `;
  document.getElementById("review-btn").addEventListener("click", () => {
    resetHeartsForLesson(profile);
    heartsOut = false;
    screen = "question";
    render();
  });
}

/* ---------------- Kết quả ---------------- */
function finishLesson() {
  const percent = Math.round((correctCount / questions.length) * 100);
  const res = completeLesson(profile, lesson, percent);
  screen = "result";
  render(percent, res);
}

function renderResult(percent, res) {
  const p = percent ?? Math.round((correctCount / questions.length) * 100);
  const r = res ?? {};
  const emoji = p === 100 ? "🌟" : p >= 70 ? "🎉" : "💪";

  root.innerHTML = `
    <div class="result-screen">
      <div class="result-card">
        <div class="result-emoji">${emoji}</div>
        <h1>Hoàn thành bài học!</h1>
        <div class="result-stats">
          <div class="result-stat"><div class="num">${correctCount}/${questions.length}</div><div class="lbl">Câu đúng</div></div>
          <div class="result-stat"><div class="num">+${r.xpEarned ?? 0}</div><div class="lbl">XP</div></div>
          <div class="result-stat"><div class="num">🔥 ${profile.streak}</div><div class="lbl">Streak</div></div>
        </div>
        ${r.leveledUp ? `<div class="badge-toast">🎊 Chúc mừng! Bạn đã lên Level ${profile.level}</div>` : ""}
        ${(r.newBadges || []).map((id) => {
          const b = BADGES.find((x) => x.id === id);
          return b ? `<div class="badge-toast">${b.icon} Huy hiệu mới: ${b.name}</div>` : "";
        }).join("")}
        <a href="learn.html" class="btn btn-primary" style="width:100%; margin-top:20px;">Tiếp tục học</a>
      </div>
    </div>
  `;
}

render();
