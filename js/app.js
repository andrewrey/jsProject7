// DOM Elements
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function convertToSpan(word) {
  let splitWord = word.split("");
  let arrayOfSpans = splitWord.map((letter) => {
    return `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </span>
    `;
  });
  let joinedSpans = arrayOfSpans.join("");
  return joinedSpans;
}

// Show the hidden word
function displayWord() {
  wordEl.innerHTML = `${convertToSpan(selectedWord)}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! you won!";
    popup.style.display = "flex";
  }
}

function displayWrongLetters(wrongL) {
  let wrongLetterArray = wrongL.map(
    (letter) => `
  <span>${letter}</span>
 `
  );
  console.log(wrongLetterArray);
  return wrongLetterArray;
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display Wrong Letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${displayWrongLetters(wrongLetters)}
  `;

  // Display parts of the body base on number of errors
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost. 🥺`;
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart Game and play Again
playAgainBtn.addEventListener("click", () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  popup.style.display = "none";
  updateWrongLettersEl();
  displayWord();
});

displayWord();
