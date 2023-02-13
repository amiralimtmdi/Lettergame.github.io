"use strict";

// slecting
const letters = document.querySelector(".letters");
const hint = document.querySelector(".hint-text");
const time = document.querySelector(".timer-number");
const input = document.querySelector(".input-box");
const checkBtn = document.querySelector(".check-btn");
const stastBtn = document.querySelector(".start-btn");
const refBtn = document.querySelector(".ref-btn");
const okBtn = document.querySelector(".ok-btn");
const score = document.querySelector(".score-number");
const winLoseBox = document.querySelector(".layer-blur");
const winLoseText = document.querySelector(".win-lose-text");
const menuItems = document.querySelector(".item-0");

// first styling
checkBtn.textContent = "start";
let heatrs = 2;
function init() {
  checkBtn.classList.add("hidden");
  input.classList.add("hidden");
  letters.textContent = "letters";
  hint.textContent = "";
  time.textContent = 15;
}
init();

// function of making letters shuffle
function shufflingWord() {
  // making an array fo the letters of word that selelcted
  let arrayOfLettersWord = words[randomPickWord].split("");

  // making letters shuffle
  for (let i = 0; i < arrayOfLettersWord.length - 1; i++) {
    let randomPickLetter = Math.floor(Math.random() * (words.length + 1));
    let tmp = arrayOfLettersWord[i];
    arrayOfLettersWord[i] = arrayOfLettersWord[randomPickLetter];
    arrayOfLettersWord[randomPickLetter] = tmp;
  }

  // join the shuffle word to box
  let shuffleLetters = arrayOfLettersWord.join("");
  hint.textContent = hints[randomPickWord];
  letters.textContent = shuffleLetters;
}

// list of words and hints
let words = [
  "monkey",
  "game",
  "kiss",
  "gamer",
  "pussy",
  "johny",
];
let hints = [
  "An asshell animal",
  "that playing that",
  "a position of sex",
  "someone who play game",
  "anothher name of cat",
  "famous actor",
];

// make the random picker for words
let randomPickWord = Math.floor(Math.random() * (words.length - 1));

// function click on start btn (starting Event)
function start() {
  // change btns after start
  input.classList.remove("hidden");
  checkBtn.textContent = "check";
  checkBtn.classList.remove("hidden");
  stastBtn.classList.add("hidden");

  // includ shuffling word after start
  shufflingWord();

  // includ timer
  for (let i = 0; i < 100; i++) {
    setTimeout(function () {
      time.textContent -= 1;

      // when timer was done lose or reduse heart
      if (time.textContent == 1) {
        check();
      }
    }, 1000 * i);
  }
}

// function click on check btn (clicking Event)
function check() {
  // changes after that answer was true
  input.value = input.value.toLowerCase();
  if (input.value == words[randomPickWord]) {
    input.style.border = "4px solid #068205";
    input.style.backgroundColor = "#0e4d1682";
    score.textContent = Number(score.textContent) + 10; //icrease score

    // win the game
    if (score.textContent >= 60) {
      winLoseBox.classList.remove("hidden");
    }

    // changes after that answer was false
  } else {
    input.style.border = "4px solid #870606";
    input.style.backgroundColor = "#4d0e0e82";

    // removing hearts after answer false
    document.querySelector(`.heart-${heatrs}`).style.display = "none";
    heatrs--;

    // lose the game
    if (heatrs < 0) {
      winLoseBox.style;
      winLoseBox.classList.remove("hidden");
      winLoseBox.classList.add("layer-blur-red");
      okBtn.classList.add("layer-blur-red");
      winLoseText.textContent = "You Lose :(";
    }
  }

  // arrange everythink for next round
  setTimeout(function () {
    input.value = "";
    input.style.border = "4px solid #021321";
    input.style.backgroundColor = "transparent";
    time.textContent = 15;

    // making a new array without the picked item & teplace that
    let newWords = words.filter((item) => item !== words[randomPickWord]);
    let newhints = hints.filter((item) => item !== hints[randomPickWord]);
    words = newWords;
    hints = newhints;
    console.log(words);

    // change the random picker
    randomPickWord = Math.floor(Math.random() * (words.length - 1));

    // includ the new shuffle letters
    shufflingWord();
  }, 1500);
}

// open and close setting
function openSetting() {
  // making step by step opening
  for (let i = 0; i < 4; i++) {
    setTimeout(function () {
      if (document.querySelector(`.item-${i}`).style.marginLeft == "-16px") {
        document.querySelector(".setting-icon").style.transform =
          "rotateZ(0deg) scale(1)";
        document.querySelector(`.item-${i}`).style.marginLeft = "52px";
      } else {
        document.querySelector(`.item-${i}`).style.marginLeft = "-16px";

        document.querySelector(".setting-icon").style.transform =
          "rotateZ(-360deg) scale(1.2)";
      }
    }, 200 * i);
  }
}
