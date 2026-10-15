
"use strict";

// ==============================
// MEMORY+ | DAY 1
// Логіка головного меню
// ==============================

const $ = (selector) => document.querySelector(selector);

const modeData = {
  pairs: {
    title: "Знайди пари",
    symbol: "▦",
    description:
      "Перевертай картки, запам'ятовуй їхнє розташування та знаходь однакові зображення.",
    skill: "Візуальна пам'ять"
  },

  numbers: {
    title: "Числова пам'ять",
    symbol: "123",
    description:
      "Запам'ятовуй послідовності чисел і відтворюй їх у правильному порядку.",
    skill: "Числова пам'ять"
  },

  spatial: {
    title: "Запам'ятай клітинки",
    symbol: "▦",
    description:
      "Дивись, які клітинки підсвічуються, а потім відтворюй їхнє розташування.",
    skill: "Просторова пам'ять"
  },

  words: {
    title: "Згадай слова",
    symbol: "Aa",
    description:
      "Запам'ятовуй слова, а потім пригадуй їх або знаходь серед інших варіантів.",
    skill: "Словесна пам'ять"
  },

  sequence: {
    title: "Повтори сигнали",
    symbol: "◉",
    description:
      "Стеж за послідовністю кольорів і повторюй її натисканнями.",
    skill: "Пам'ять на послідовності"
  },

  faces: {
    title: "Пам'ять на обличчя",
    symbol: "☺",
    description:
      "Запам'ятовуй персонажів, їхні особливості та деталі зовнішності.",
    skill: "Візуальна пам'ять"
  }
};

const ageLabels = {
  child: "6–9 років",
  teen: "10–17 років",
  adult: "18–59 років",
  senior: "60+ років"
};

const difficultyLabels = {
  easy: "Легкий",
  normal: "Середній",
  hard: "Складний"
};

const ageSelect = $("#age");
const difficultySelect = $("#difficulty");

const modeModal = $("#modeModal");
const settingsModal = $("#settingsModal");

const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalSymbol = $("#modalSymbol");
const modalAge = $("#modalAge");
const modalDifficulty = $("#modalDifficulty");
const modalNotice = $("#modalNotice");

const toast = $("#toast");

let currentMode = null;
let toastTimeout = null;
let lastFocusedElement = null;

// Рік у футері
$("#year").textContent = new Date().getFullYear();

// ==============================
// Повідомлення користувачу
// ==============================

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==============================
// Відкриття та закриття вікон
// ==============================

function openModal(modal) {
  lastFocusedElement = document.activeElement;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const closeButton = modal.querySelector("button");

  if (closeButton) {
    closeButton.focus();
  }
}

function closeModal(modal) {
  modal.classList.add("hidden");

  const anotherModalOpen =
    !modeModal.classList.contains("hidden") ||
    !settingsModal.classList.contains("hidden");

  if (!anotherModalOpen) {
    document.body.style.overflow = "";
  }

  if (
    lastFocusedElement &&
    document.contains(lastFocusedElement)
  ) {
    lastFocusedElement.focus();
  }
}

// ==============================
// Вибір режиму
// ==============================

function openMode(modeKey) {
  const mode = modeData[modeKey];

  if (!mode) {
    showToast("Не вдалося відкрити цей режим.");
    return;
  }

  currentMode = modeKey;

  modalSymbol.textContent = mode.symbol;
  modalTitle.textContent = mode.title;
  modalDescription.textContent = mode.description;

  modalAge.textContent = ageLabels[ageSelect.value];
  modalDifficulty.textContent =
    difficultyLabels[difficultySelect.value];

  modalNotice.textContent =
    `Напрям тренування: ${mode.skill}. ` +
    "Повноцінна гра для цього режиму з'явиться під час наступних етапів розробки.";

  openModal(modeModal);
}

// ==============================
// Кнопки режимів
// ==============================

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    openMode(button.dataset.mode);
  });
});

// ==============================
// Початок тренування
// ==============================

$("#startBtn").addEventListener("click", () => {
  openMode("pairs");
});

// ==============================
// Закриття вікна режиму
// ==============================

$("#closeModal").addEventListener("click", () => {
  closeModal(modeModal);
});

$("#modalStart").addEventListener("click", () => {
  closeModal(modeModal);

  showToast(
    "Меню готове! Наступний етап — повноцінна гра «Знайди пари»."
  );
});

// ==============================
// Налаштування
// ==============================

$("#settingsBtn").addEventListener("click", () => {
  openModal(settingsModal);
});

$("#closeSettings").addEventListener("click", () => {
  closeModal(settingsModal);
});

$("#settingsDone").addEventListener("click", () => {
  closeModal(settingsModal);

  showToast(
    `Налаштування: ${ageLabels[ageSelect.value]}, ` +
    `${difficultyLabels[difficultySelect.value].toLowerCase()} рівень.`
  );
});

// ==============================
// Оновлення вибраного віку
// та складності
// ==============================

ageSelect.addEventListener("change", () => {
  if (currentMode && !modeModal.classList.contains("hidden")) {
    modalAge.textContent = ageLabels[ageSelect.value];
  }
});

difficultySelect.addEventListener("change", () => {
  if (currentMode && !modeModal.classList.contains("hidden")) {
    modalDifficulty.textContent =
      difficultyLabels[difficultySelect.value];
  }
});

// ==============================
// Повернення на головну
// ==============================

$("#homeLink").addEventListener("click", (event) => {
  event.preventDefault();

  if (!modeModal.classList.contains("hidden")) {
    closeModal(modeModal);
  }

  if (!settingsModal.classList.contains("hidden")) {
    closeModal(settingsModal);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ==============================
// Клавіша Escape закриває вікна
// ==============================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modeModal.classList.contains("hidden")) {
      closeModal(modeModal);
    } else if (!settingsModal.classList.contains("hidden")) {
      closeModal(settingsModal);
    }
  }
});

// ==============================
// Клік по затемненню
// закриває модальне вікно
// ==============================

[modeModal, settingsModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Головне меню готове
console.log("Memory+ успішно запущено!");
