const quoteHolder = document.querySelector(".quote");
const typingInput = document.querySelector(".typing-input");
const genQuoteBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-next");
const wordsPerMin = document.querySelector(".words-per-min > .num");
const timer = document.querySelector(".timer > .num");
const accuracy = document.querySelector(".accuracy > .num");
const btnPause = document.querySelector(".btn-pause");
const stats = document.querySelector(".stats-container");

const quotes = [
  `If you're not doing something with your life, then it doesn’t matter how long you live. If you're doing something with your life, then it doesn't matter how short your life may be. A life is not measured by years lived, but by its usefulness. If you are giving, loving, serving, helping, encouraging, and adding value to others, then you're living a life that counts!`,

  `When one door of happiness closes, another opens; but often we look so long in disappointment and bitterness at the closed door that we do not expectantly look for and therefore see with pleasure and gratitude the one which has been opened for us.`,
  `Time is too slow for those who wait, too swift for those who fear, too long for those who grieve, too short for those who rejoice, but for those who love, time is eternity.`,
  `If you live long enough, you'll make mistakes. But if you learn from them, you'll be a better person. It's how you handle adversity, not how it affects you. The main thing is never quit, never quit, never quit.`,
  `You can do anything you want to do as long as you keep a good attitude and keep working at it. But the second you give up, you’re screwed.`,
];

let QuoteRenderer = () => {
  quoteHolder.innerHTML = quotes[
    Math.floor(Math.random() * (quotes.length - 1))
  ]
    .split(" ")
    .map((word) => `<span>${word}</span> `)
    .join(" ");
};
addEventListener("load", QuoteRenderer);

genQuoteBtn.onclick = () => location.reload();

let isAppPaused = false;
btnPause.onclick = toggleAppStatus;

function toggleAppStatus() {
  isAppPaused = !isAppPaused;
  console.log(isAppPaused);
  if (isAppPaused) {
    clearInterval(ticking);
    typingInput.readonly = true;
  } else startApp();
}

// start app when user press Enter
addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    typingInput.focus();

    startApp();
  }
});

typingInput.addEventListener("mousedown", (e) => e.preventDefault());

function startApp() {
  tickticking();
  typingInput.addEventListener("keydown", analyseTyping);
}

function tickticking() {
  let timeLimit = 100;
  //setting the timer
  ticking = setInterval(() => {
    let spanWords = document.querySelectorAll("span");
    spanWords.__proto__.filter = Array.prototype.filter;
    let processedWordsNum = spanWords.filter(
      (span) =>
        span.classList.contains("passed") || span.classList.contains("noteq")
    ).length;
    // setting accuracy
    let passedWords = spanWords.filter((span) =>
      span.classList.contains("passed")
    ).length;
    if (processedWordsNum === 0) processedWordsNum = 0.5;
    accuracy.innerText = ((passedWords / processedWordsNum) * 100).toFixed();
    // setting speed
    if (timer.innerText !== "0") {
      console.log(processedWordsNum);
      wordsPerMin.innerText = (
        (processedWordsNum * timeLimit) /
        +timer.innerText
      ).toFixed();
    }
    // setting timer
    timer.innerText = +timer.innerText + 1;
    if (timer.innerText >= timeLimit) {
      typingInput.readonly = true;
      clearInterval(ticking);
    }
  }, 1000);
}

function analyseTyping(e) {
  let typedWords = typingInput.value.split(" ");
  let typedWord = typedWords[typedWords.length - 1];
  let spanWords = document.querySelectorAll("span");
  let curSpanWord = spanWords[typedWords.length - 1];
  let curWord = curSpanWord.innerText;
  spanWords.__proto__.filter = Array.prototype.filter;

  // when user click back space
  if (e.key === "Backspace") {
    let processedWordsNum = spanWords.filter(
      (span) =>
        span.classList.contains("passed") || span.classList.contains("noteq")
    ).length;
    if (typedWords.length !== processedWordsNum) {
      spanWords.forEach((span, i) => {
        if (i > typedWords.length - 1) {
          spanWords[i].classList = "";
        }
      });
    }
  }
  // console.log(curWord, typedWord);
  if (e.key === " ") {
    if (curWord === typedWord) {
      curSpanWord.classList = "passed";
    } else {
      curSpanWord.classList = "noteq";
    }
    if (typedWords.length >= spanWords.length) {
      clearInterval(ticking);
      stats.style.backgroundColor = "darkgreen";
    }
  }
}

const modalTwo = document.getElementById("modal_two");
const closeModalButton = document.getElementsByClassName("modal_button");

const flyModal = document.getElementById("modal_fly");

modalTwo.addEventListener("click", () => {
  flyModal.style.animation = "flyIn 0.5s linear";
  flyModal.style.display = "flex";
});

closeModalButton.addEventListener("click", (event) => {
  const actualModal = event.target.parentElement;

  actualModal.style.animation = "flyOut 0.3s linear";
  setTimeout(function () {
    actualModal.style.display = "none";
  }, 300);
});
