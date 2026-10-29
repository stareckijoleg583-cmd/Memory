"use strict";

// ==========================================================================
// MEMORY+ | ДЕНЬ 2 ТА ДЕНЬ 3
// Режим 01: «Знайди пари» (Картки, перевертання, збіги)
// Режим 02: «Числова пам'ять» (Запам'ятовування та відтворення числових послідовностей)
// ==========================================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Конфігурація режимів
const modeData = {
  pairs: {
    title: "Знайди пари",
    symbol: "▦",
    description:
      "Перевертай картки, запам'ятовуй їхнє розташування та знаходь однакові числа або зображення.",
    skill: "Візуальна та просторова пам'ять",
    isPlayable: true
  },

  numbers: {
    title: "Числова пам'ять",
    symbol: "123",
    description:
      "Запам'ятовуй послідовності чисел на екрані та відтворюй їх у правильному порядку із поступовим ускладненням.",
    skill: "Числова пам'ять та концентрація",
    isPlayable: true
  },

  spatial: {
    title: "Запам'ятай клітинки",
    symbol: "▦",
    description:
      "Дивись, які клітинки підсвічуються, а потім відтворюй їхнє розташування.",
    skill: "Просторова пам'ять",
    isPlayable: true
  },

  words: {
    title: "Згадай слова",
    symbol: "Aa",
    description:
      "Запам'ятовуй слова, а потім пригадуй їх або знаходь серед інших варіантів.",
    skill: "Словесна пам'ять",
    isPlayable: true
  },

  sequence: {
    title: "Повтори сигнали",
    symbol: "◉",
    description:
      "Стеж за послідовністю кольорів і повторюй її натисканнями.",
    skill: "Пам'ять на послідовності",
    isPlayable: false
  },

  faces: {
    title: "Пам'ять на обличчя",
    symbol: "☺",
    description:
      "Запам'ятовуй персонажів, їхні особливості та деталі зовнішності.",
    skill: "Візуальна пам'ять",
    isPlayable: false
  }
};

const ageLabels = {
  child: "6–9 років",
  teen: "10–17 років",
  adult: "18–59 років",
  senior: "60+ років"
};

const difficultyLabels = {
  easy: "Легкий (базовий)",
  normal: "Середній (стандарт)",
  hard: "Складний (високий темп)"
};

// Елементи інтерфейсу меню
const ageSelect = $("#age");
const difficultySelect = $("#difficulty");

const menuView = $("#menuView");
const gameSection = $("#gameSection");         // Режим 01 (Пари)
const numSeqSection = $("#numSeqSection");     // Режим 02 (Числова послідовність)

const modeModal = $("#modeModal");
const settingsModal = $("#settingsModal");
const victoryModal = $("#victoryModal");
const numSeqGameOverModal = $("#numSeqGameOverModal");

const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalSymbol = $("#modalSymbol");
const modalAge = $("#modalAge");
const modalDifficulty = $("#modalDifficulty");
const modalNotice = $("#modalNotice");
const modalStart = $("#modalStart");

// Елементи Режиму 01 (Знайди пари)
const gameHeading = $("#gameHeading");
const gameModeKicker = $("#gameModeKicker");
const gameTimerEl = $("#gameTimer");
const gameMovesEl = $("#gameMoves");
const gamePairsFoundEl = $("#gamePairsFound");
const gamePairsTotalEl = $("#gamePairsTotal");
const cardsGrid = $("#cardsGrid");
const gameSoundBtn = $("#gameSoundBtn");
const gameBackBtn = $("#gameBackBtn");
const gameRestartBtn = $("#gameRestartBtn");

const victoryTimeEl = $("#victoryTime");
const victoryMovesEl = $("#victoryMoves");
const victoryRatingEl = $("#victoryRating");
const victoryBestEl = $("#victoryBest");
const victoryPlayAgainBtn = $("#victoryPlayAgain");
const victoryHomeBtn = $("#victoryHome");

// Елементи Режиму 02 (Числова послідовність)
const numSeqBackBtn = $("#numSeqBackBtn");
const numSeqRestartBtn = $("#numSeqRestartBtn");
const numSeqSoundBtn = $("#numSeqSoundBtn");

const numSeqLevelEl = $("#numSeqLevel");
const numSeqDigitsCountEl = $("#numSeqDigitsCount");
const numSeqScoreEl = $("#numSeqScore");
const numSeqStreakEl = $("#numSeqStreak");
const numSeqLivesEl = $("#numSeqLives");

const numSeqDisplayCard = $("#numSeqDisplayCard");
const numSeqNumbersContainer = $("#numSeqNumbers");
const numSeqProgressBar = $("#numSeqProgressBar");
const numSeqSkipTimerBtn = $("#numSeqSkipTimerBtn");

const numSeqInputCard = $("#numSeqInputCard");
const numSeqSlotsContainer = $("#numSeqSlots");
const numSeqHiddenInput = $("#numSeqHiddenInput");
const numSeqSubmitBtn = $("#numSeqSubmitBtn");

const numSeqFeedbackCard = $("#numSeqFeedbackCard");
const numSeqFeedbackBadge = $("#numSeqFeedbackBadge");
const numSeqFeedbackTitle = $("#numSeqFeedbackTitle");
const numSeqFeedbackDesc = $("#numSeqFeedbackDesc");
const numSeqTargetDisplay = $("#numSeqTargetDisplay");
const numSeqUserDisplay = $("#numSeqUserDisplay");
const numSeqNextBtn = $("#numSeqNextBtn");

const numSeqResultLevel = $("#numSeqResultLevel");
const numSeqResultDigits = $("#numSeqResultDigits");
const numSeqResultScore = $("#numSeqResultScore");
const numSeqResultBest = $("#numSeqResultBest");
const numSeqPlayAgainBtn = $("#numSeqPlayAgainBtn");
const numSeqHomeBtn = $("#numSeqHomeBtn");

// Елементи Режиму 03 (Просторова пам'ять)
const spatialSection = $("#spatialSection");
const spatialBackBtn = $("#spatialBackBtn");
const spatialRestartBtn = $("#spatialRestartBtn");
const spatialSoundBtn = $("#spatialSoundBtn");

const spatialLevelEl = $("#spatialLevel");
const spatialGridSizeEl = $("#spatialGridSize");
const spatialTargetCountEl = $("#spatialTargetCount");
const spatialScoreEl = $("#spatialScore");
const spatialStreakEl = $("#spatialStreak");
const spatialLivesEl = $("#spatialLives");

const spatialStatusKicker = $("#spatialStatusKicker");
const spatialInstruction = $("#spatialInstruction");
const spatialRecallCounter = $("#spatialRecallCounter");
const spatialFoundCountEl = $("#spatialFoundCount");
const spatialTotalTargetEl = $("#spatialTotalTarget");

const spatialProgressWrapper = $("#spatialProgressWrapper");
const spatialProgressBar = $("#spatialProgressBar");
const spatialGrid = $("#spatialGrid");
const spatialSkipBtn = $("#spatialSkipBtn");

const spatialGameOverModal = $("#spatialGameOverModal");
const spatialResultLevel = $("#spatialResultLevel");
const spatialResultGrid = $("#spatialResultGrid");
const spatialResultScore = $("#spatialResultScore");
const spatialResultBest = $("#spatialResultBest");
const spatialPlayAgainBtn = $("#spatialPlayAgainBtn");
const spatialHomeBtn = $("#spatialHomeBtn");

// Елементи Режиму 04 (Пам'ять на слова)
const wordsSection = $("#wordsSection");
const wordsBackBtn = $("#wordsBackBtn");
const wordsRestartBtn = $("#wordsRestartBtn");
const wordsSoundBtn = $("#wordsSoundBtn");

const wordsLevelEl = $("#wordsLevel");
const wordsTargetCountEl = $("#wordsTargetCount");
const wordsScoreEl = $("#wordsScore");
const wordsStreakEl = $("#wordsStreak");
const wordsLivesEl = $("#wordsLives");

const wordsStatusKicker = $("#wordsStatusKicker");
const wordsInstruction = $("#wordsInstruction");
const wordsRecallCounter = $("#wordsRecallCounter");
const wordsFoundCountEl = $("#wordsFoundCount");
const wordsTotalTargetEl = $("#wordsTotalTarget");

const wordsProgressWrapper = $("#wordsProgressWrapper");
const wordsProgressBar = $("#wordsProgressBar");
const wordsDisplayContainer = $("#wordsDisplayContainer");
const wordsRecallGrid = $("#wordsRecallGrid");
const wordsActionRow = $("#wordsActionRow");
const wordsSkipBtn = $("#wordsSkipBtn");

const wordsGameOverModal = $("#wordsGameOverModal");
const wordsResultLevel = $("#wordsResultLevel");
const wordsResultCount = $("#wordsResultCount");
const wordsResultScore = $("#wordsResultScore");
const wordsResultBest = $("#wordsResultBest");
const wordsPlayAgainBtn = $("#wordsPlayAgainBtn");
const wordsHomeBtn = $("#wordsHomeBtn");

const toast = $("#toast");

// Глобальний стан
let currentActiveView = "menu"; // "menu" | "pairs" | "numbers" | "spatial" | "words"
let toastTimeout = null;
let lastFocusedElement = null;

let isSoundEnabled = true;
let audioCtx = null;

// Стан гри "Знайди пари"
let currentTheme = "numbers";
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let movesCount = 0;
let pairsFound = 0;
let totalPairs = 6;
let timerSeconds = 0;
let timerInterval = null;
let timerStarted = false;

// Стан гри "Числова пам'ять"
let numSeqLevel = 1;
let numSeqDigitsCount = 3;
let numSeqScore = 0;
let numSeqStreak = 0;
let numSeqLives = 3;
let maxDigitsMemorized = 3;
let targetSequence = [];
let userDigits = [];
let numSeqDisplayTimer = null;
let numSeqAnimFrame = null;
let numSeqPhase = "none"; // "display" | "input" | "feedback"

// Стан гри "Просторова пам'ять"
let spatialLevel = 1;
let spatialGridDim = 3;
let spatialTargetCount = 3;
let spatialScore = 0;
let spatialStreak = 0;
let spatialLives = 3;
let maxSpatialTargets = 3;
let spatialTargets = new Set();
let spatialFound = new Set();
let spatialPhase = "none"; // "display" | "recall" | "evaluating"
let spatialTimer = null;
let spatialAnimFrame = null;

// Стан гри "Пам'ять на слова"
let wordsLevel = 1;
let wordsTargetCount = 4;
let wordsScore = 0;
let wordsStreak = 0;
let wordsLives = 3;
let maxWordsMemorized = 4;
let targetWords = [];
let distractorWords = [];
let wordsFound = new Set();
let wordsPhase = "none"; // "display" | "recall" | "evaluating"
let wordsTimer = null;
let wordsAnimFrame = null;

// Рік у футері
$("#year").textContent = new Date().getFullYear();

// ==========================================================================
// Синтезатор звуку (Web Audio API)
// ==========================================================================

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (!isSoundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  try {
    if (type === "click" || type === "flip") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === "match" || type === "correct") {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.22);
      });
    } else if (type === "mismatch" || type === "wrong") {
      [280, 220].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.06, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.12);
      });
    } else if (type === "win") {
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.14, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.38);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.38);
      });
    }
  } catch (err) {
    console.warn("Аудіо недоступне:", err);
  }
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const icon = isSoundEnabled ? "🔊" : "🔇";
  const title = isSoundEnabled ? "Звук: увімкнено" : "Звук: вимкнено";

  gameSoundBtn.textContent = icon;
  gameSoundBtn.title = title;
  numSeqSoundBtn.textContent = icon;
  numSeqSoundBtn.title = title;
  spatialSoundBtn.textContent = icon;
  spatialSoundBtn.title = title;
  wordsSoundBtn.textContent = icon;
  wordsSoundBtn.title = title;

  showToast(isSoundEnabled ? "Звук увімкнено" : "Звук вимкнено");
}

gameSoundBtn.addEventListener("click", toggleSound);
numSeqSoundBtn.addEventListener("click", toggleSound);
spatialSoundBtn.addEventListener("click", toggleSound);
wordsSoundBtn.addEventListener("click", toggleSound);

// ==========================================================================
// Toast сповіщення
// ==========================================================================

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==========================================================================
// Модальні вікна
// ==========================================================================

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  const closeButton = modal.querySelector("button");
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  modal.classList.add("hidden");
  const anyOpen =
    !modeModal.classList.contains("hidden") ||
    !settingsModal.classList.contains("hidden") ||
    !victoryModal.classList.contains("hidden") ||
    !numSeqGameOverModal.classList.contains("hidden") ||
    !spatialGameOverModal.classList.contains("hidden") ||
    !wordsGameOverModal.classList.contains("hidden");

  if (!anyOpen) {
    document.body.style.overflow = "";
  }

  if (lastFocusedElement && document.contains(lastFocusedElement)) {
    lastFocusedElement.focus();
  }
}

// ==========================================================================
// Маршрутизація між екранами (Меню <-> Режими 01-04)
// ==========================================================================

function returnToMenu() {
  stopTimer();
  stopNumSeqTimer();
  stopSpatialTimer();
  stopWordsTimer();

  currentActiveView = "menu";
  gameSection.classList.add("hidden");
  numSeqSection.classList.add("hidden");
  spatialSection.classList.add("hidden");
  wordsSection.classList.add("hidden");
  menuView.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame(modeKey) {
  stopTimer();
  stopNumSeqTimer();
  stopSpatialTimer();
  stopWordsTimer();

  menuView.classList.add("hidden");

  if (modeKey === "numbers") {
    // РЕЖИМ 02: Числова пам'ять (Послідовності)
    currentActiveView = "numbers";
    gameSection.classList.add("hidden");
    spatialSection.classList.add("hidden");
    wordsSection.classList.add("hidden");
    numSeqSection.classList.remove("hidden");
    initNumSeqGame();
  } else if (modeKey === "spatial") {
    // РЕЖИМ 03: Просторова пам'ять (Запам'ятай клітинки)
    currentActiveView = "spatial";
    gameSection.classList.add("hidden");
    numSeqSection.classList.add("hidden");
    wordsSection.classList.add("hidden");
    spatialSection.classList.remove("hidden");
    initSpatialGame();
  } else if (modeKey === "words") {
    // РЕЖИМ 04: Словесна пам'ять (Згадай слова)
    currentActiveView = "words";
    gameSection.classList.add("hidden");
    numSeqSection.classList.add("hidden");
    spatialSection.classList.add("hidden");
    wordsSection.classList.remove("hidden");
    initWordsGame();
  } else {
    // РЕЖИМ 01: Знайди пари
    currentActiveView = "pairs";
    numSeqSection.classList.add("hidden");
    spatialSection.classList.add("hidden");
    wordsSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    buildPairsBoard();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// РЕЖИМ 01: «ЗНАЙДИ ПАРИ»
// ==========================================================================

const cardThemes = {
  numbers: [7, 13, 24, 42, 55, 68, 77, 88, 99, 104, 256, 314, 500, 777],
  icons: ["🚀", "⚡", "💎", "🧠", "⭐", "🔥", "🎯", "🍀", "🍕", "🎮", "💡", "🏆"],
  symbols: ["▲", "◆", "●", "★", "✚", "✦", "⬢", "❖", "✿", "☾", "☀", "☯"]
};

function getPairsCountByDifficulty() {
  const diff = difficultySelect.value;
  if (diff === "easy") return 4;   // 8 карток
  if (diff === "hard") return 8;   // 16 карток
  return 6;                        // 12 карток (normal)
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds++;
    gameTimerEl.textContent = formatTime(timerSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPairsBoard() {
  stopTimer();
  timerSeconds = 0;
  movesCount = 0;
  pairsFound = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  gameTimerEl.textContent = "00:00";
  gameMovesEl.textContent = "0";

  totalPairs = getPairsCountByDifficulty();
  gamePairsFoundEl.textContent = "0";
  gamePairsTotalEl.textContent = String(totalPairs);

  const pool = cardThemes[currentTheme] || cardThemes.numbers;
  const selectedValues = shuffleArray(pool).slice(0, totalPairs);
  const deck = shuffleArray([...selectedValues, ...selectedValues]);

  cardsGrid.innerHTML = "";
  cardsGrid.setAttribute("data-cols", "4");

  deck.forEach((val, index) => {
    const cardEl = document.createElement("button");
    cardEl.className = "memory-card";
    cardEl.type = "button";
    cardEl.setAttribute("data-val", String(val));
    cardEl.setAttribute("data-index", String(index));
    cardEl.setAttribute("aria-label", "Прихована картка");

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">
          <span class="card-sparkle">✦</span>
          <span class="card-logo">M+</span>
        </div>
        <div class="card-face card-front">
          <span class="card-value">${val}</span>
        </div>
      </div>
    `;

    cardEl.addEventListener("click", () => handleCardClick(cardEl));
    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(cardEl);
      }
    });

    cardsGrid.appendChild(cardEl);
  });
}

function handleCardClick(cardEl) {
  if (lockBoard) return;
  if (cardEl === firstCard) return;
  if (cardEl.classList.contains("matched") || cardEl.classList.contains("flipped")) return;

  if (!timerStarted) {
    startTimer();
  }

  cardEl.classList.add("flipped");
  playSound("flip");

  if (!firstCard) {
    firstCard = cardEl;
    return;
  }

  secondCard = cardEl;
  movesCount++;
  gameMovesEl.textContent = String(movesCount);

  if (firstCard.dataset.val === secondCard.dataset.val) {
    playSound("match");
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    pairsFound++;
    gamePairsFoundEl.textContent = String(pairsFound);
    firstCard = null;
    secondCard = null;

    if (pairsFound === totalPairs) {
      setTimeout(handlePairsVictory, 450);
    }
  } else {
    lockBoard = true;
    playSound("mismatch");
    firstCard.classList.add("mismatch");
    secondCard.classList.add("mismatch");

    setTimeout(() => {
      if (firstCard && secondCard) {
        firstCard.classList.remove("flipped", "mismatch");
        secondCard.classList.remove("flipped", "mismatch");
      }
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 780);
  }
}

function handlePairsVictory() {
  stopTimer();
  playSound("win");

  const diff = difficultySelect.value;
  const bestKey = `memory_best_${diff}_${currentTheme}`;
  const prevBestSeconds = localStorage.getItem(bestKey);

  let isNewBest = false;
  if (!prevBestSeconds || timerSeconds < Number(prevBestSeconds)) {
    localStorage.setItem(bestKey, String(timerSeconds));
    isNewBest = true;
  }

  const bestFormatted = isNewBest
    ? `${formatTime(timerSeconds)} (Новий рекорд!)`
    : formatTime(Number(prevBestSeconds));

  let stars = "⭐⭐⭐";
  if (movesCount > totalPairs * 2.2) {
    stars = "⭐";
  } else if (movesCount > totalPairs * 1.5) {
    stars = "⭐⭐";
  }

  victoryTimeEl.textContent = formatTime(timerSeconds);
  victoryMovesEl.textContent = String(movesCount);
  victoryRatingEl.textContent = stars;
  victoryBestEl.textContent = bestFormatted;

  openModal(victoryModal);
}

function setPairsTheme(themeKey, rebuild = true) {
  currentTheme = themeKey;
  $$(".theme-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.theme === themeKey);
  });
  if (rebuild) {
    buildPairsBoard();
    showToast(`Тематику змінено: ${themeKey === "numbers" ? "Числа" : themeKey === "icons" ? "Емодзі" : "Символи"}`);
  }
}

$("#tabNumbers").addEventListener("click", () => setPairsTheme("numbers"));
$("#tabIcons").addEventListener("click", () => setPairsTheme("icons"));
$("#tabSymbols").addEventListener("click", () => setPairsTheme("symbols"));

gameBackBtn.addEventListener("click", returnToMenu);
gameRestartBtn.addEventListener("click", () => {
  buildPairsBoard();
  showToast("Гру перезапущено. Картки перемішано!");
});

victoryPlayAgainBtn.addEventListener("click", () => {
  closeModal(victoryModal);
  buildPairsBoard();
});

victoryHomeBtn.addEventListener("click", () => {
  closeModal(victoryModal);
  returnToMenu();
});

// ==========================================================================
// РЕЖИМ 02: «ЧИСЛОВА ПАМ'ЯТЬ (ПОСЛІДОВНОСТІ)» // ДЕНЬ 3
// ==========================================================================

function getInitialNumSeqDigits() {
  const diff = difficultySelect.value;
  if (diff === "easy") return 3;
  if (diff === "hard") return 5;
  return 4; // normal
}

function initNumSeqGame() {
  numSeqLevel = 1;
  numSeqDigitsCount = getInitialNumSeqDigits();
  maxDigitsMemorized = numSeqDigitsCount;
  numSeqScore = 0;
  numSeqStreak = 0;
  numSeqLives = 3;

  updateNumSeqHud();
  startNumSeqRound();
}

function updateNumSeqHud() {
  numSeqLevelEl.textContent = String(numSeqLevel);
  numSeqDigitsCountEl.textContent = String(numSeqDigitsCount);
  numSeqScoreEl.textContent = numSeqScore.toLocaleString();
  numSeqStreakEl.textContent = `${numSeqStreak} 🔥`;

  let hearts = "";
  for (let i = 0; i < 3; i++) {
    hearts += i < numSeqLives ? "❤️" : "🖤";
  }
  numSeqLivesEl.textContent = hearts;
}

function generateSequence(length) {
  const seq = [];
  for (let i = 0; i < length; i++) {
    // Перша цифра 1..9, наступні 0..9
    const min = i === 0 ? 1 : 0;
    let digit;
    do {
      digit = Math.floor(Math.random() * (10 - min)) + min;
    } while (i >= 2 && digit === seq[i - 1] && digit === seq[i - 2]); // уникаємо потрійних повторів
    seq.push(digit);
  }
  return seq;
}

function stopNumSeqTimer() {
  if (numSeqDisplayTimer) {
    clearTimeout(numSeqDisplayTimer);
    numSeqDisplayTimer = null;
  }
  if (numSeqAnimFrame) {
    cancelAnimationFrame(numSeqAnimFrame);
    numSeqAnimFrame = null;
  }
}

// Початок раунду: Фаза 1 (Показ чисел)
function startNumSeqRound() {
  stopNumSeqTimer();
  numSeqPhase = "display";
  userDigits = [];

  updateNumSeqHud();

  // Генеруємо числа
  targetSequence = generateSequence(numSeqDigitsCount);

  // Відображаємо фазу 1
  numSeqDisplayCard.classList.remove("hidden");
  numSeqInputCard.classList.add("hidden");
  numSeqFeedbackCard.classList.add("hidden");

  // Малюємо цифри
  numSeqNumbersContainer.innerHTML = "";
  targetSequence.forEach((digit, idx) => {
    const badge = document.createElement("div");
    badge.className = "numseq-digit-badge";
    badge.style.animationDelay = `${idx * 0.08}s`;
    badge.textContent = String(digit);
    numSeqNumbersContainer.appendChild(badge);
  });

  // Розрахунок часу показу:
  // Легкий: 3.0s + 0.9s за цифру
  // Середній: 2.2s + 0.7s за цифру
  // Складний: 1.6s + 0.5s за цифру
  const diff = difficultySelect.value;
  const baseTime = diff === "easy" ? 3000 : diff === "hard" ? 1600 : 2200;
  const perDigit = diff === "easy" ? 900 : diff === "hard" ? 500 : 700;
  const totalDuration = baseTime + numSeqDigitsCount * perDigit;

  // Плавна анімація прогрес-бару
  const startTime = performance.now();
  numSeqProgressBar.style.width = "100%";

  function updateProgress(now) {
    const elapsed = now - startTime;
    const remaining = Math.max(0, totalDuration - elapsed);
    const percent = (remaining / totalDuration) * 100;

    numSeqProgressBar.style.width = `${percent}%`;

    if (percent > 0) {
      numSeqAnimFrame = requestAnimationFrame(updateProgress);
    } else {
      transitionToInputPhase();
    }
  }

  numSeqAnimFrame = requestAnimationFrame(updateProgress);
}

// Кнопка швидкого переходу ("Я вже запам'ятав")
numSeqSkipTimerBtn.addEventListener("click", () => {
  if (numSeqPhase === "display") {
    transitionToInputPhase();
  }
});

// Перехід до Фази 2 (Введення чисел)
function transitionToInputPhase() {
  stopNumSeqTimer();
  numSeqPhase = "input";
  userDigits = [];

  numSeqDisplayCard.classList.add("hidden");
  numSeqInputCard.classList.remove("hidden");
  numSeqFeedbackCard.classList.add("hidden");

  renderInputSlots();

  // Фокусуємо прихований інпут для клавіатури
  setTimeout(() => {
    numSeqHiddenInput.value = "";
    numSeqHiddenInput.focus();
  }, 100);
}

function renderInputSlots() {
  numSeqSlotsContainer.innerHTML = "";

  for (let i = 0; i < targetSequence.length; i++) {
    const slot = document.createElement("div");
    slot.className = "numseq-slot";

    if (i < userDigits.length) {
      slot.classList.add("filled");
      slot.textContent = String(userDigits[i]);
    } else {
      slot.textContent = "";
      if (i === userDigits.length) {
        slot.classList.add("active");
      }
    }

    numSeqSlotsContainer.appendChild(slot);
  }
}

function handleInputDigit(digitChar) {
  if (numSeqPhase !== "input") return;
  if (userDigits.length >= targetSequence.length) return;

  userDigits.push(Number(digitChar));
  playSound("click");
  renderInputSlots();

  // Автоматична перевірка, якщо введено всі цифри
  if (userDigits.length === targetSequence.length) {
    setTimeout(verifyAnswer, 250);
  }
}

function handleInputBackspace() {
  if (numSeqPhase !== "input") return;
  if (userDigits.length === 0) return;

  userDigits.pop();
  playSound("click");
  renderInputSlots();
}

// Віртуальна клавіатура
$$(".keypad-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    if (key === "backspace") {
      handleInputBackspace();
    } else if (key === "enter") {
      verifyAnswer();
    } else if (/^[0-9]$/.test(key)) {
      handleInputDigit(key);
    }
  });
});

// Кнопка перевірки
numSeqSubmitBtn.addEventListener("click", verifyAnswer);

// Фізична клавіатура
document.addEventListener("keydown", (e) => {
  if (numSeqPhase !== "input") return;

  if (e.key >= "0" && e.key <= "9") {
    e.preventDefault();
    handleInputDigit(e.key);
  } else if (e.key === "Backspace") {
    e.preventDefault();
    handleInputBackspace();
  } else if (e.key === "Enter") {
    e.preventDefault();
    verifyAnswer();
  }
});

// Перевірка відповіді (Фаза 3)
function verifyAnswer() {
  if (numSeqPhase !== "input") return;
  if (userDigits.length === 0) {
    showToast("Введіть хоча б одну цифру!");
    return;
  }

  numSeqPhase = "feedback";
  const isExactMatch =
    userDigits.length === targetSequence.length &&
    userDigits.every((val, idx) => val === targetSequence[idx]);

  numSeqInputCard.classList.add("hidden");
  numSeqFeedbackCard.classList.remove("hidden");

  // Малюємо порівняння
  numSeqTargetDisplay.innerHTML = "";
  numSeqUserDisplay.innerHTML = "";

  targetSequence.forEach((val, idx) => {
    const chip = document.createElement("span");
    chip.className = "comp-chip";
    chip.textContent = String(val);
    numSeqTargetDisplay.appendChild(chip);
  });

  userDigits.forEach((val, idx) => {
    const chip = document.createElement("span");
    const isSlotMatch = idx < targetSequence.length && val === targetSequence[idx];
    chip.className = `comp-chip ${isSlotMatch ? "match" : "diff"}`;
    chip.textContent = String(val);
    numSeqUserDisplay.appendChild(chip);
  });

  if (isExactMatch) {
    // Успіх!
    playSound("correct");
    numSeqStreak++;
    const pointsGained = (targetSequence.length * 100) + (numSeqStreak * 25);
    numSeqScore += pointsGained;

    if (targetSequence.length > maxDigitsMemorized) {
      maxDigitsMemorized = targetSequence.length;
    }

    numSeqFeedbackBadge.className = "feedback-badge success";
    numSeqFeedbackBadge.textContent = "✓";
    numSeqFeedbackTitle.textContent = "Правильно! Чудова пам'ять!";
    numSeqFeedbackDesc.textContent = `Ви безпомилково запам'ятали ${targetSequence.length} цифр! +${pointsGained} балів. Наступний раунд буде довшим.`;

    numSeqNextBtn.textContent = `Наступний рівень (${targetSequence.length + 1} цифр) ↗`;
    numSeqNextBtn.onclick = () => {
      numSeqLevel++;
      numSeqDigitsCount++;
      startNumSeqRound();
    };
  } else {
    // Помилка
    playSound("wrong");
    numSeqStreak = 0;
    numSeqLives--;

    updateNumSeqHud();

    numSeqFeedbackBadge.className = "feedback-badge error";
    numSeqFeedbackBadge.textContent = "✗";
    numSeqFeedbackTitle.textContent = "Не зовсім так!";

    if (numSeqLives > 0) {
      numSeqFeedbackDesc.textContent = `Зверніть увагу на відмінності вище. Залишилося життів: ${numSeqLives}. Спробуйте ще раз на цьому рівні!`;
      numSeqNextBtn.textContent = "Спробувати знову на цьому рівні ↻";
      numSeqNextBtn.onclick = () => {
        startNumSeqRound();
      };
    } else {
      numSeqFeedbackDesc.textContent = "Усі спроби вичерпано. Перегляньте ваші підсумкові результати тренування!";
      numSeqNextBtn.textContent = "Переглянути підсумки ➔";
      numSeqNextBtn.onclick = () => {
        handleNumSeqGameOver();
      };
    }
  }
}

function handleNumSeqGameOver() {
  playSound("win");

  const diff = difficultySelect.value;
  const bestKey = `numseq_best_digits_${diff}`;
  const prevBest = Number(localStorage.getItem(bestKey) || 0);

  let isNewRecord = false;
  if (maxDigitsMemorized > prevBest) {
    localStorage.setItem(bestKey, String(maxDigitsMemorized));
    isNewRecord = true;
  }

  numSeqResultLevel.textContent = `Рівень ${numSeqLevel}`;
  numSeqResultDigits.textContent = `${maxDigitsMemorized} цифр`;
  numSeqResultScore.textContent = numSeqScore.toLocaleString();
  numSeqResultBest.textContent = isNewRecord
    ? `${maxDigitsMemorized} цифр (Новий рекорд!)`
    : `${prevBest} цифр`;

  openModal(numSeqGameOverModal);
}

numSeqPlayAgainBtn.addEventListener("click", () => {
  closeModal(numSeqGameOverModal);
  initNumSeqGame();
});

numSeqHomeBtn.addEventListener("click", () => {
  closeModal(numSeqGameOverModal);
  returnToMenu();
});

numSeqBackBtn.addEventListener("click", returnToMenu);
numSeqRestartBtn.addEventListener("click", () => {
  initNumSeqGame();
  showToast("Тренування розпочато заново!");
});

// ==========================================================================
// РЕЖИМ 03: «ПРОСТОРОВА ПАМ'ЯТЬ (ЗАПАМ'ЯТАЙ КЛІТИНКИ)» // ДЕНЬ 4
// ==========================================================================

function getSpatialConfig(level, diff) {
  let dim = 3;
  let targets = 3;

  if (diff === "easy") {
    if (level <= 2) {
      dim = 3; targets = 3;
    } else if (level <= 4) {
      dim = 3; targets = 4;
    } else if (level <= 7) {
      dim = 4; targets = 4;
    } else if (level <= 10) {
      dim = 4; targets = 5;
    } else {
      dim = 4; targets = 6;
    }
  } else if (diff === "hard") {
    if (level === 1) {
      dim = 3; targets = 4;
    } else if (level <= 3) {
      dim = 4; targets = 5;
    } else if (level <= 5) {
      dim = 4; targets = 6;
    } else if (level <= 8) {
      dim = 5; targets = 7;
    } else if (level <= 11) {
      dim = 5; targets = 8;
    } else {
      dim = 6; targets = Math.min(14, 9 + Math.floor((level - 12) / 2));
    }
  } else {
    // normal
    if (level === 1) {
      dim = 3; targets = 3;
    } else if (level === 2) {
      dim = 3; targets = 4;
    } else if (level <= 4) {
      dim = 4; targets = 4;
    } else if (level <= 6) {
      dim = 4; targets = 5;
    } else if (level <= 8) {
      dim = 4; targets = 6;
    } else if (level <= 10) {
      dim = 5; targets = 6;
    } else if (level <= 13) {
      dim = 5; targets = 7;
    } else {
      dim = 5; targets = Math.min(12, 8 + Math.floor((level - 14) / 3));
    }
  }

  return { dim, targets };
}

function initSpatialGame() {
  spatialLevel = 1;
  spatialScore = 0;
  spatialStreak = 0;
  spatialLives = 3;
  const cfg = getSpatialConfig(spatialLevel, difficultySelect.value);
  maxSpatialTargets = cfg.targets;

  updateSpatialHud();
  startSpatialRound();
}

function updateSpatialHud() {
  spatialLevelEl.textContent = String(spatialLevel);
  spatialGridSizeEl.textContent = `${spatialGridDim}×${spatialGridDim}`;
  spatialTargetCountEl.textContent = String(spatialTargetCount);
  spatialScoreEl.textContent = spatialScore.toLocaleString();
  spatialStreakEl.textContent = `${spatialStreak} 🔥`;

  let hearts = "";
  for (let i = 0; i < 3; i++) {
    hearts += i < spatialLives ? "❤️" : "🖤";
  }
  spatialLivesEl.textContent = hearts;
}

function stopSpatialTimer() {
  if (spatialTimer) {
    clearTimeout(spatialTimer);
    spatialTimer = null;
  }
  if (spatialAnimFrame) {
    cancelAnimationFrame(spatialAnimFrame);
    spatialAnimFrame = null;
  }
}

function startSpatialRound() {
  stopSpatialTimer();
  spatialPhase = "display";
  spatialFound.clear();

  const cfg = getSpatialConfig(spatialLevel, difficultySelect.value);
  spatialGridDim = cfg.dim;
  spatialTargetCount = cfg.targets;

  if (spatialTargetCount > maxSpatialTargets) {
    maxSpatialTargets = spatialTargetCount;
  }

  updateSpatialHud();

  // Генеруємо унікальні індекси цільових клітинок
  const totalCells = spatialGridDim * spatialGridDim;
  const availableIndices = Array.from({ length: totalCells }, (_, i) => i);
  // Перемішування Фішера-Єйтса
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }
  spatialTargets = new Set(availableIndices.slice(0, spatialTargetCount));

  // Оновлюємо UI панелі
  spatialStatusKicker.textContent = "ЗАПАМ'ЯТАЙТЕ КЛІТИНКИ";
  spatialInstruction.textContent = "Запам'ятайте розташування підсвічених клітинок:";
  spatialFoundCountEl.textContent = "0";
  spatialTotalTargetEl.textContent = String(spatialTargetCount);
  spatialSkipBtn.classList.remove("hidden");
  spatialSkipBtn.disabled = false;

  // Малюємо сітку
  spatialGrid.style.setProperty("--grid-dim", String(spatialGridDim));
  spatialGrid.innerHTML = "";

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("button");
    cell.className = "spatial-cell locked";
    cell.type = "button";
    cell.dataset.index = String(i);
    cell.setAttribute("aria-label", `Клітинка ${i + 1}`);

    if (spatialTargets.has(i)) {
      cell.classList.add("highlighted");
      cell.textContent = "✦";
    }

    spatialGrid.appendChild(cell);
  }

  // Час показу: базова тривалість + час на клітинку
  const diff = difficultySelect.value;
  const baseTime = diff === "easy" ? 1800 : diff === "hard" ? 1000 : 1400;
  const perTarget = diff === "easy" ? 400 : diff === "hard" ? 220 : 300;
  const totalDuration = baseTime + spatialTargetCount * perTarget;

  const startTime = performance.now();
  spatialProgressBar.style.width = "100%";

  function updateProgress(now) {
    const elapsed = now - startTime;
    const remaining = Math.max(0, totalDuration - elapsed);
    const percent = (remaining / totalDuration) * 100;

    spatialProgressBar.style.width = `${percent}%`;

    if (percent > 0) {
      spatialAnimFrame = requestAnimationFrame(updateProgress);
    } else {
      transitionToSpatialRecallPhase();
    }
  }

  spatialAnimFrame = requestAnimationFrame(updateProgress);
}

function transitionToSpatialRecallPhase() {
  stopSpatialTimer();
  spatialPhase = "recall";

  spatialProgressBar.style.width = "0%";
  spatialSkipBtn.classList.add("hidden");

  spatialStatusKicker.textContent = "ВАША ЧЕРГА // ВІДТВОРІТЬ РОЗТАШУВАННЯ";
  spatialInstruction.textContent = "Виберіть усі клітинки, які щойно світилися:";

  const cells = spatialGrid.querySelectorAll(".spatial-cell");
  cells.forEach((cell) => {
    cell.classList.remove("highlighted", "locked");
    cell.textContent = "";

    cell.onclick = () => {
      const idx = Number(cell.dataset.index);
      handleSpatialCellClick(idx, cell);
    };
  });
}

function handleSpatialCellClick(idx, cellEl) {
  if (spatialPhase !== "recall") return;
  if (cellEl.classList.contains("locked")) return;

  if (spatialTargets.has(idx)) {
    // Правильний клік
    playSound("correct");
    spatialFound.add(idx);
    cellEl.classList.add("correct-cell", "locked");
    cellEl.textContent = "✓";

    spatialFoundCountEl.textContent = String(spatialFound.size);

    if (spatialFound.size === spatialTargets.size) {
      handleSpatialRoundWin();
    }
  } else {
    // Помилка
    handleSpatialMistake(idx, cellEl);
  }
}

function handleSpatialRoundWin() {
  spatialPhase = "evaluating";
  playSound("win");

  spatialStreak++;
  const points = spatialTargetCount * 120 + spatialStreak * 30;
  spatialScore += points;
  updateSpatialHud();

  spatialStatusKicker.textContent = "ВІДМІННО! ВСЕ ПРАВИЛЬНО";
  spatialInstruction.textContent = `Бездоганно! +${points} балів. Перехід на наступний рівень...`;

  // Блокуємо клітинки
  spatialGrid.querySelectorAll(".spatial-cell").forEach((c) => c.classList.add("locked"));

  setTimeout(() => {
    spatialLevel++;
    startSpatialRound();
  }, 1000);
}

function handleSpatialMistake(wrongIdx, wrongCellEl) {
  spatialPhase = "evaluating";
  playSound("wrong");

  wrongCellEl.classList.add("wrong-cell", "locked");
  wrongCellEl.textContent = "✗";

  spatialStreak = 0;
  spatialLives--;
  updateSpatialHud();

  spatialStatusKicker.textContent = "ПОМИЛКОВА КЛІТИНКА!";

  // Підсвічуємо пропущені цілі
  spatialGrid.querySelectorAll(".spatial-cell").forEach((c) => {
    c.classList.add("locked");
    const cIdx = Number(c.dataset.index);
    if (spatialTargets.has(cIdx) && !spatialFound.has(cIdx)) {
      c.classList.add("missed-cell");
      c.textContent = "✦";
    }
  });

  if (spatialLives > 0) {
    spatialInstruction.textContent = `Помилка! Залишилося спроб: ${spatialLives}. Спробуйте ще раз!`;
    setTimeout(() => {
      startSpatialRound();
    }, 1800);
  } else {
    spatialInstruction.textContent = "Усі спроби вичерпано. Перегляд результатів тренування...";
    setTimeout(() => {
      handleSpatialGameOver();
    }, 1500);
  }
}

function handleSpatialGameOver() {
  playSound("win");

  const diff = difficultySelect.value;
  const bestKey = `spatial_best_targets_${diff}`;
  const prevBest = Number(localStorage.getItem(bestKey) || 0);

  let isNewRecord = false;
  if (maxSpatialTargets > prevBest) {
    localStorage.setItem(bestKey, String(maxSpatialTargets));
    isNewRecord = true;
  }

  spatialResultLevel.textContent = `Рівень ${spatialLevel}`;
  spatialResultGrid.textContent = `${spatialGridDim}×${spatialGridDim}`;
  spatialResultScore.textContent = spatialScore.toLocaleString();
  spatialResultBest.textContent = isNewRecord
    ? `${maxSpatialTargets} цілей (Новий рекорд!)`
    : `${prevBest} цілей`;

  openModal(spatialGameOverModal);
}

spatialSkipBtn.addEventListener("click", () => {
  if (spatialPhase === "display") {
    transitionToSpatialRecallPhase();
  }
});

spatialPlayAgainBtn.addEventListener("click", () => {
  closeModal(spatialGameOverModal);
  initSpatialGame();
});

spatialHomeBtn.addEventListener("click", () => {
  closeModal(spatialGameOverModal);
  returnToMenu();
});

spatialBackBtn.addEventListener("click", returnToMenu);
spatialRestartBtn.addEventListener("click", () => {
  initSpatialGame();
  showToast("Тренування розпочато заново!");
});

// ==========================================================================
// РЕЖИМ 04: «ПАМ'ЯТЬ НА СЛОВА (ЗГАДАЙ СЛОВА)» // ДЕНЬ 5
// ==========================================================================

const wordDictionary = {
  easy: [
    "Кіт", "Дім", "Сад", "Ліс", "Сонце", "Книга", "Хліб", "Вода", "Річка", "Яблуко",
    "Птах", "Стіл", "Зірка", "Гора", "Море", "Квітка", "Дерево", "Міст", "Дощ", "Сніг",
    "Вітер", "Лампа", "Годинник", "Вікно", "Машина", "Пісня", "Риба", "Хмара", "Острів",
    "Корабель", "Ключ", "Замок", "Чай", "Стежка", "Кава", "Парк", "М'яч", "Листок",
    "Дзвін", "Човен", "Коло", "Стежка", "Зерно", "Скеля", "Веселка", "Джерело"
  ],
  normal: [
    "Капітан", "Галактика", "Горизонт", "Лабіринт", "Фортеця", "Мелодія", "Мандрівник",
    "Вітрило", "Компас", "Смарагд", "Телескоп", "Басейн", "Архітектор", "Орбіта",
    "Атмосфера", "Спадщина", "Скульптор", "Легенда", "Піраміда", "Мозаїка", "Кришталь",
    "Оазис", "Світанок", "Пергамент", "Скарбниця", "Вулкан", "Океан", "Планета", "Сузір'я",
    "Міраж", "Діамант", "Гармонія", "Візерунок", "Дзеркало", "Фонтан", "Бастіон",
    "Маятник", "Водоспад", "Каравела", "Алебастр", "Магніт", "Цитадель", "Барикада"
  ],
  hard: [
    "Парадокс", "Квінтесенція", "Ілюмінація", "Гравітація", "Симфонія", "Манускрипт",
    "Метаморфоза", "Астролябія", "Калейдоскоп", "Резонанс", "Синхронізація", "Еволюція",
    "Артефакт", "Перспектива", "Траєкторія", "Лабораторія", "Флуоресценція", "Кристалографія",
    "Тріумфатор", "Констеляція", "Фантасмагорія", "Магнетизм", "Інтерференція", "Спектрометр",
    "Трансформація", "Експедиція", "Апертура", "Еквілібріум", "Енігма", "Амфора",
    "Конденсація", "Флуоресцент", "Експресіонізм", "Когнітивність", "Рефлексія"
  ]
};

function getWordsConfig(level, diff) {
  let count = 4;
  let poolKey = "normal";

  if (diff === "easy") {
    poolKey = "easy";
    if (level <= 2) count = 3;
    else if (level <= 5) count = 4;
    else if (level <= 8) count = 5;
    else count = 6;
  } else if (diff === "hard") {
    poolKey = level >= 4 ? "hard" : "normal";
    if (level === 1) count = 4;
    else if (level <= 3) count = 5;
    else if (level <= 6) count = 6;
    else if (level <= 9) count = 7;
    else count = Math.min(10, 8 + Math.floor((level - 10) / 2));
  } else {
    // normal
    poolKey = level >= 6 ? "hard" : level >= 2 ? "normal" : "easy";
    if (level === 1) count = 4;
    else if (level <= 3) count = 5;
    else if (level <= 6) count = 6;
    else if (level <= 9) count = 7;
    else count = Math.min(9, 8 + Math.floor((level - 10) / 3));
  }

  // Враховуємо вікову групу
  const age = ageSelect.value;
  if (age === "child") {
    poolKey = "easy";
    count = Math.max(3, count - 1);
  }

  return { count, poolKey };
}

function initWordsGame() {
  wordsLevel = 1;
  wordsScore = 0;
  wordsStreak = 0;
  wordsLives = 3;
  const cfg = getWordsConfig(wordsLevel, difficultySelect.value);
  maxWordsMemorized = cfg.count;

  updateWordsHud();
  startWordsRound();
}

function updateWordsHud() {
  wordsLevelEl.textContent = String(wordsLevel);
  wordsTargetCountEl.textContent = `${wordsTargetCount} слів`;
  wordsScoreEl.textContent = wordsScore.toLocaleString();
  wordsStreakEl.textContent = `${wordsStreak} 🔥`;

  let hearts = "";
  for (let i = 0; i < 3; i++) {
    hearts += i < wordsLives ? "❤️" : "🖤";
  }
  wordsLivesEl.textContent = hearts;
}

function stopWordsTimer() {
  if (wordsTimer) {
    clearTimeout(wordsTimer);
    wordsTimer = null;
  }
  if (wordsAnimFrame) {
    cancelAnimationFrame(wordsAnimFrame);
    wordsAnimFrame = null;
  }
}

function startWordsRound() {
  stopWordsTimer();
  wordsPhase = "display";
  wordsFound.clear();

  const cfg = getWordsConfig(wordsLevel, difficultySelect.value);
  wordsTargetCount = cfg.count;

  if (wordsTargetCount > maxWordsMemorized) {
    maxWordsMemorized = wordsTargetCount;
  }

  updateWordsHud();

  // Вибираємо слова з потрібного словника
  const pool = [...wordDictionary[cfg.poolKey]];
  // Перемішуємо алгоритмом Фішера-Єйтса
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Цільові слова та відволікальні слова (дистрактори)
  targetWords = pool.slice(0, wordsTargetCount);
  const distractorCount = Math.max(3, wordsTargetCount);
  distractorWords = pool.slice(wordsTargetCount, wordsTargetCount + distractorCount);

  // Оновлюємо UI панелі для Фази 1 (Показ)
  wordsStatusKicker.textContent = "ЗАПАМ'ЯТАЙТЕ СЛОВА";
  wordsInstruction.textContent = "Уважно прочитайте та запам'ятайте слова:";
  wordsFoundCountEl.textContent = "0";
  wordsTotalTargetEl.textContent = String(wordsTargetCount);
  wordsRecallCounter.classList.add("hidden");

  wordsDisplayContainer.classList.remove("hidden");
  wordsRecallGrid.classList.add("hidden");
  wordsActionRow.classList.remove("hidden");
  wordsSkipBtn.classList.remove("hidden");
  wordsSkipBtn.disabled = false;

  // Рендеримо чіпи слів
  wordsDisplayContainer.innerHTML = "";
  targetWords.forEach((word, idx) => {
    const chip = document.createElement("div");
    chip.className = "word-display-chip";
    chip.style.animationDelay = `${idx * 0.08}s`;
    chip.textContent = word;
    wordsDisplayContainer.appendChild(chip);
  });

  // Розрахунок часу показу
  const diff = difficultySelect.value;
  const baseTime = diff === "easy" ? 3200 : diff === "hard" ? 1800 : 2500;
  const perWord = diff === "easy" ? 1200 : diff === "hard" ? 650 : 900;
  const totalDuration = baseTime + wordsTargetCount * perWord;

  const startTime = performance.now();
  wordsProgressBar.style.width = "100%";

  function updateProgress(now) {
    const elapsed = now - startTime;
    const remaining = Math.max(0, totalDuration - elapsed);
    const percent = (remaining / totalDuration) * 100;

    wordsProgressBar.style.width = `${percent}%`;

    if (percent > 0) {
      wordsAnimFrame = requestAnimationFrame(updateProgress);
    } else {
      transitionToWordsRecallPhase();
    }
  }

  wordsAnimFrame = requestAnimationFrame(updateProgress);
}

function transitionToWordsRecallPhase() {
  stopWordsTimer();
  wordsPhase = "recall";

  wordsProgressBar.style.width = "0%";
  wordsDisplayContainer.classList.add("hidden");
  wordsRecallGrid.classList.remove("hidden");
  wordsSkipBtn.classList.add("hidden");
  wordsRecallCounter.classList.remove("hidden");

  wordsStatusKicker.textContent = "ВАША ЧЕРГА // ЗГАДАЙТЕ СЛОВА";
  wordsInstruction.textContent = "Знайдіть усі слова, які щойно були на екрані:";

  // Об'єднуємо цільові слова та дистрактори, перемішуємо
  const allChoices = [...targetWords, ...distractorWords];
  for (let i = allChoices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
  }

  wordsRecallGrid.innerHTML = "";
  allChoices.forEach((word) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "word-choice-btn";
    btn.textContent = word;
    btn.setAttribute("aria-label", `Слово: ${word}`);

    btn.onclick = () => {
      handleWordChoiceClick(word, btn);
    };

    wordsRecallGrid.appendChild(btn);
  });
}

function handleWordChoiceClick(word, btnEl) {
  if (wordsPhase !== "recall") return;
  if (btnEl.classList.contains("locked")) return;

  const isTarget = targetWords.includes(word);

  if (isTarget) {
    // Правильно вибране слово
    playSound("correct");
    wordsFound.add(word);
    btnEl.classList.add("correct", "locked");
    btnEl.innerHTML = `<span>✓</span> <span>${word}</span>`;

    wordsFoundCountEl.textContent = String(wordsFound.size);

    if (wordsFound.size === targetWords.length) {
      handleWordsRoundWin();
    }
  } else {
    // Помилка (вибрано дистрактор)
    handleWordsMistake(word, btnEl);
  }
}

function handleWordsRoundWin() {
  wordsPhase = "evaluating";
  playSound("win");

  wordsStreak++;
  const points = wordsTargetCount * 150 + wordsStreak * 40;
  wordsScore += points;
  updateWordsHud();

  wordsStatusKicker.textContent = "ВІДМІННО! УСІ СЛОВА ВІДГАДАНО";
  wordsInstruction.textContent = `Чудова пам'ять! +${points} балів. Наступне завдання...`;

  wordsRecallGrid.querySelectorAll(".word-choice-btn").forEach((b) => b.classList.add("locked"));

  setTimeout(() => {
    wordsLevel++;
    startWordsRound();
  }, 1100);
}

function handleWordsMistake(wrongWord, wrongBtnEl) {
  wordsPhase = "evaluating";
  playSound("wrong");

  wrongBtnEl.classList.add("wrong", "locked");
  wrongBtnEl.innerHTML = `<span>✗</span> <span>${wrongWord}</span>`;

  wordsStreak = 0;
  wordsLives--;
  updateWordsHud();

  wordsStatusKicker.textContent = "ЦЬОГО СЛОВА НЕ БУЛО!";

  // Підсвічуємо пропущені цільові слова
  wordsRecallGrid.querySelectorAll(".word-choice-btn").forEach((b) => {
    b.classList.add("locked");
    const text = b.textContent.replace(/[✓✗]/g, "").trim();
    if (targetWords.includes(text) && !wordsFound.has(text)) {
      b.classList.add("missed");
      b.innerHTML = `<span>✦</span> <span>${text}</span>`;
    }
  });

  if (wordsLives > 0) {
    wordsInstruction.textContent = `Помилка! Залишилося життів: ${wordsLives}. Спробуйте ще раз!`;
    setTimeout(() => {
      startWordsRound();
    }, 1900);
  } else {
    wordsInstruction.textContent = "Усі спроби вичерпано. Перегляд результатів тренування...";
    setTimeout(() => {
      handleWordsGameOver();
    }, 1500);
  }
}

function handleWordsGameOver() {
  playSound("win");

  const diff = difficultySelect.value;
  const bestKey = `words_best_count_${diff}`;
  const prevBest = Number(localStorage.getItem(bestKey) || 0);

  let isNewRecord = false;
  if (maxWordsMemorized > prevBest) {
    localStorage.setItem(bestKey, String(maxWordsMemorized));
    isNewRecord = true;
  }

  wordsResultLevel.textContent = `Рівень ${wordsLevel}`;
  wordsResultCount.textContent = `${maxWordsMemorized} слів`;
  wordsResultScore.textContent = wordsScore.toLocaleString();
  wordsResultBest.textContent = isNewRecord
    ? `${maxWordsMemorized} слів (Новий рекорд!)`
    : `${prevBest} слів`;

  openModal(wordsGameOverModal);
}

wordsSkipBtn.addEventListener("click", () => {
  if (wordsPhase === "display") {
    transitionToWordsRecallPhase();
  }
});

wordsPlayAgainBtn.addEventListener("click", () => {
  closeModal(wordsGameOverModal);
  initWordsGame();
});

wordsHomeBtn.addEventListener("click", () => {
  closeModal(wordsGameOverModal);
  returnToMenu();
});

wordsBackBtn.addEventListener("click", returnToMenu);
wordsRestartBtn.addEventListener("click", () => {
  initWordsGame();
  showToast("Тренування розпочато заново!");
});

// ==========================================================================
// Навігація та меню вибору режиму
// ==========================================================================

function openMode(modeKey) {
  const mode = modeData[modeKey];
  if (!mode) {
    showToast("Не вдалося відкрити цей режим.");
    return;
  }

  modalSymbol.textContent = mode.symbol;
  modalTitle.textContent = mode.title;
  modalDescription.textContent = mode.description;
  modalAge.textContent = ageLabels[ageSelect.value];
  modalDifficulty.textContent = difficultyLabels[difficultySelect.value];

  if (mode.isPlayable) {
    modalNotice.textContent =
      `Режим готовий до гри! Натисніть «Грати зараз», щоб розпочати тренування.`;
    modalStart.textContent = "Грати зараз ↗";
    modalStart.onclick = () => {
      closeModal(modeModal);
      startGame(modeKey);
    };
  } else {
    modalNotice.textContent =
      `Напрям: ${mode.skill}. Цей режим заплановано на наступні етапи розробки.`;
    modalStart.textContent = "Зрозуміло";
    modalStart.onclick = () => {
      closeModal(modeModal);
    };
  }

  openModal(modeModal);
}

// Клік по кнопках режимів на головній сторінці
$$("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const modeKey = button.dataset.mode;
    if (
      modeKey === "pairs" ||
      modeKey === "numbers" ||
      modeKey === "spatial" ||
      modeKey === "words"
    ) {
      startGame(modeKey);
    } else {
      openMode(modeKey);
    }
  });
});

// Головна кнопка на банері ("Почати тренування")
$("#startBtn").addEventListener("click", () => {
  startGame("numbers");
});

$("#closeModal").addEventListener("click", () => {
  closeModal(modeModal);
});

// Вікно налаштувань
$("#settingsBtn").addEventListener("click", () => {
  openModal(settingsModal);
});

$("#closeSettings").addEventListener("click", () => {
  closeModal(settingsModal);
});

$("#settingsDone").addEventListener("click", () => {
  closeModal(settingsModal);
  showToast(
    `Налаштування: ${ageLabels[ageSelect.value]}, ${difficultyLabels[difficultySelect.value]}.`
  );
  if (currentActiveView === "pairs") {
    buildPairsBoard();
  } else if (currentActiveView === "numbers") {
    initNumSeqGame();
  } else if (currentActiveView === "spatial") {
    initSpatialGame();
  } else if (currentActiveView === "words") {
    initWordsGame();
  }
});

difficultySelect.addEventListener("change", () => {
  if (!modeModal.classList.contains("hidden")) {
    modalDifficulty.textContent = difficultyLabels[difficultySelect.value];
  }
  if (currentActiveView === "pairs") {
    buildPairsBoard();
  } else if (currentActiveView === "numbers") {
    initNumSeqGame();
  } else if (currentActiveView === "spatial") {
    initSpatialGame();
  } else if (currentActiveView === "words") {
    initWordsGame();
  }
});

ageSelect.addEventListener("change", () => {
  if (!modeModal.classList.contains("hidden")) {
    modalAge.textContent = ageLabels[ageSelect.value];
  }
});

// Клік по логотипу
$("#homeLink").addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(modeModal);
  closeModal(settingsModal);
  closeModal(victoryModal);
  closeModal(numSeqGameOverModal);
  closeModal(spatialGameOverModal);
  closeModal(wordsGameOverModal);
  returnToMenu();
});

// Клавіша Escape закриває активні модальні вікна
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!victoryModal.classList.contains("hidden")) {
      closeModal(victoryModal);
    } else if (!numSeqGameOverModal.classList.contains("hidden")) {
      closeModal(numSeqGameOverModal);
    } else if (!spatialGameOverModal.classList.contains("hidden")) {
      closeModal(spatialGameOverModal);
    } else if (!wordsGameOverModal.classList.contains("hidden")) {
      closeModal(wordsGameOverModal);
    } else if (!modeModal.classList.contains("hidden")) {
      closeModal(modeModal);
    } else if (!settingsModal.classList.contains("hidden")) {
      closeModal(settingsModal);
    }
  }
});

// Клік по фону закриває модальні вікна
[
  modeModal,
  settingsModal,
  victoryModal,
  numSeqGameOverModal,
  spatialGameOverModal,
  wordsGameOverModal
].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

console.log(
  "Memory+ | Дні 2, 3, 4 та 5 успішно ініціалізовано: «Знайди пари», «Числова пам'ять», «Просторова пам'ять» та «Пам'ять на слова» готові до гри!"
);
