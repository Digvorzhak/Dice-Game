"use strict";
const modal = document.querySelector(".modal");
const input = document.querySelector(".target-score-input");
const badTargetScore = document.querySelector(".bad-input");
const backgroundMusic = document.querySelector(".bgc-music");
const startGame = document.querySelector(".start-game-btn");
const player1Card = document.querySelector(".container-player1");
const player2Card = document.querySelector(".container-player2");
const player1Header = document.querySelector(".player1-title");
const player2Header = document.querySelector(".player2-title");
const player1Score = document.querySelector(".score-player1");
const player2Score = document.querySelector(".score-player2");
const player1Current = document.querySelector(".current-score-1");
const player2Current = document.querySelector(".current-score-2");
const winner1 = document.querySelector(".winner1");
const winner2 = document.querySelector(".winner2");
const player1win = document.querySelector(".player1-wins");
const player2win = document.querySelector(".player2-wins");
const dice0 = document.querySelector(".dice-img0");
const dice1 = document.querySelector(".dice-img1");
const currentBox1 = document.querySelector(".current-score-box1");
const currentBox2 = document.querySelector(".current-score-box2");

const resetBtn = document.querySelector(".new-game-btn");
const rollBtn = document.querySelector(".roll-dice-btn");
const holdBtn = document.querySelector(".hold-btn");

window.onload = (event) => {
  setTimeout(() => modal.classList.add("visible"), 500);
  // currentBox2.classList.add(".disabled-box");
  currentBox2.classList.toggle("disabled-box");
  currentBox2.classList.remove("current-score-box2");
};

let player1Wins = 0;
let player2Wins = 0;
let targetScore = 0;
let rollDiced = 0;
let gamesPlayed = 1;
let activePlayer = true;
let activeGame = true;
let diceArr = [0, 0];

const removeModal = () => {
  if (Number(input.value) > 1) {
    targetScore = Number(input.value);
    modal.classList.remove("visible");
    setTimeout(() => modal.classList.add("display-none"), 250);
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
    console.log(targetScore);
  } else {
    // badTargetScore.classList.add("visible");
    badTargetScore.style.opacity = "1";
  }
};

player1Score.value = 0;
player2Score.value = 0;
player1Current.value = 0;
player2Current.value = 0;

const switchActiveBox = (newGame) => {
  if (newGame) {
    currentBox1.classList.add("current-score-box1");
    currentBox1.classList.remove("disabled-box");
    return;
  }

  if (activeGame) {
    if (activePlayer) {
      currentBox1.classList.toggle("disabled-box");
      currentBox1.classList.remove("current-score-box1");
      currentBox2.classList.toggle("current-score-box2");
      currentBox2.classList.remove("disabled-box");
    } else {
      currentBox2.classList.toggle("disabled-box");
      currentBox2.classList.remove("current-score-box2");
      currentBox1.classList.toggle("current-score-box1");
      currentBox1.classList.remove("disabled-box");
    }
  }
};

const rollDices = () => {
  if (activeGame) {
    diceArr[0] = Math.trunc(Math.random() * 6) + 1;
    diceArr[1] = Math.trunc(Math.random() * 6) + 1;
    dice0.setAttribute("src", `/Assets/images/dice-${diceArr[0]}.png`);
    dice1.setAttribute("src", `/Assets/images/dice-${diceArr[1]}.png`);
    if (diceArr[0] + diceArr[1] === 12) {
      fadeOut();
      switchActiveBox();
      if (activePlayer) {
        diceArr = [0, 0];
        player1Current.value = 0;
        player1Current.innerText = 0;
        activePlayer = false;
      } else {
        diceArr = [0, 0];
        player2Current.value = 0;
        player2Current.innerText = 0;
        activePlayer = true;
      }
    }
    if (activePlayer) {
      player1Current.value += diceArr.reduce((accum, diceNum) => accum + diceNum);
      player1Current.innerText = player1Current.value;
    } else {
      player2Current.value += diceArr.reduce((accum, diceNum) => accum + diceNum);
      player2Current.innerText = player2Current.value;
    }

    // LOCAL STORAGE TESTING
    rollDiced++;
    localStorage.setItem("Roll Diced", rollDiced);
  }
};

const savePoints = () => {
  fadeOut();
  if (activeGame) {
    switchActiveBox();
    if (activePlayer) {
      player1Score.value += player1Current.value;
      player1Score.innerText = player1Score.value;
      activePlayer = false;
      player1Current.value = 0;
      player1Current.innerText = 0;
      if (player1Score.value >= targetScore) {
        if (player1Score.value === targetScore) {
          activeGame = false;
          player1Wins++;
          winner1.classList.remove("hidden");
          player1win.classList.remove("hidden");
          player1win.innerText = `Wins: ${player1Wins}`;
          player1Card.style.background = "#252423";
          player2Card.style.background = "#2d2a2e";
        } else {
          activeGame = false;
          player2Wins++;
          winner2.classList.remove("hidden");
          player2win.classList.remove("hidden");
          player2win.innerText = `Wins: ${player2Wins}`;
          currentBox2.classList.add("current-score-box2");
          currentBox2.classList.remove("disabled-box");
          player2Card.style.background = "#252423";
          player1Card.style.background = "#2d2a2e";
        }
        activeGame = false;
      }
    } else {
      player2Score.value += player2Current.value;
      player2Score.innerText = player2Score.value;
      activePlayer = true;
      player2Current.value = 0;
      player2Current.innerText = 0;
      if (player2Score.value >= targetScore) {
        if (player2Score.value === targetScore) {
          activeGame = false;
          player2Wins++;
          winner2.classList.remove("hidden");
          player2win.classList.remove("hidden");
          player2win.innerText = `Wins: ${player2Wins}`;

          player2Card.style.background = "#252423";
          player1Card.style.background = "#2d2a2e";
        } else {
          activeGame = false;
          player1Wins++;
          winner1.classList.remove("hidden");
          player1win.classList.remove("hidden");
          player1win.innerText = `Wins: ${player1Wins}`;
          currentBox1.classList.add("current-score-box1");
          currentBox1.classList.remove("disabled-box");
          player1Card.style.background = "#252423";
          player2Card.style.background = "#2d2a2e";
        }
        activeGame = false;
      }
    }
  }
};

const newGame = () => {
  activeGame = true;
  switchActiveBox(activePlayer);
  activePlayer = true;
  diceArr = [0, 0];
  dice0.setAttribute("src", "/Assets/images/dice-3.png");
  dice1.setAttribute("src", "/Assets/images/dice-5.png");
  player1Score.value = 0;
  player2Score.value = 0;
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  player1Current.value = 0;
  player2Current.value = 0;
  player1Current.innerText = 0;
  player2Current.innerText = 0;
  player1Card.style.background = "#252423";
  player2Card.style.background = "#2d2a2e";
  winner1.classList.add("hidden");
  winner2.classList.add("hidden");

  gamesPlayed++;
  localStorage.setItem("Games Played", gamesPlayed);
};

const fadeOut = () => {
  if (activeGame) {
    if (activePlayer) {
      player1Card.style.background = "#2d2a2e";
      player2Card.style.background = "#252423";
    } else {
      player2Card.style.background = "#2d2a2e";
      player1Card.style.background = "#252423";
    }
  }
};

startGame.addEventListener("click", removeModal);
rollBtn.addEventListener("click", rollDices);
holdBtn.addEventListener("click", savePoints);
resetBtn.addEventListener("click", newGame);
