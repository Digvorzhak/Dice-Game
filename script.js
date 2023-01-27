"use strict";
const player1Card = document.querySelector(".container-player1");
const player2Card = document.querySelector(".container-player2");
const player1Header = document.querySelector(".player1-title");
const player2Header = document.querySelector(".player2-title");
const player1Score = document.querySelector(".score-player1");
const player2Score = document.querySelector(".score-player2");
const player1Current = document.querySelector(".current-score-1");
const player2Current = document.querySelector(".current-score-2");
const dice0 = document.querySelector(".dice-img0");
const dice1 = document.querySelector(".dice-img1");

const resetBtn = document.querySelector(".new-game-btn");
const rollBtn = document.querySelector(".roll-dice-btn");
const holdBtn = document.querySelector(".hold-btn");

const targetScore = 100;

let activePlayer = true;
let activeGame = true;

let diceArr = [0, 0];
player1Score.value = 0;
player2Score.value = 0;
player1Current.value = 0;
player2Current.value = 0;

const rollDices = () => {
  if (activeGame) {
    diceArr[0] = Math.trunc(Math.random() * 6) + 1;
    diceArr[1] = Math.trunc(Math.random() * 6) + 1;
    dice0.setAttribute("src", `/Assets/images/dice-${diceArr[0]}.png`);
    dice1.setAttribute("src", `/Assets/images/dice-${diceArr[1]}.png`);
    if (diceArr[0] + diceArr[1] === 12) {
      fadeOut();
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
  }
};

const savePoints = () => {
  fadeOut();
  if (activePlayer) {
    player1Score.value += player1Current.value;
    player1Score.innerText = player1Score.value;
    activePlayer = false;
    player1Current.value = 0;
    player1Current.innerText = 0;
    if (player1Score.value >= targetScore) {
      activeGame = false;
      player1Card.style.background = "#2D2A2E";
      player2Card.style.background = "#cdb1e9";
    }
  } else {
    player2Score.value += player2Current.value;
    player2Score.innerText = player2Score.value;
    activePlayer = true;
    player2Current.value = 0;
    player2Current.innerText = 0;
    if (player2Score.value >= targetScore) {
      activeGame = false;
      player2Card.style.background = "#2D2A2E";
      player1Card.style.background = "#cdb1e9";
    }
  }
};

const newGame = () => {
  activeGame = true;
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
  player1Card.style.background = "#904edb";
  player2Card.style.background = "#cdb1e9";
};

const fadeOut = () => {
  if (activeGame) {
    if (activePlayer) {
      player1Card.style.background = "#cdb1e9";
      player2Card.style.background = "#904edb";
    } else {
      player2Card.style.background = "#cdb1e9";
      player1Card.style.background = "#904edb";
    }
  }
};

rollBtn.addEventListener("click", rollDices);
holdBtn.addEventListener("click", savePoints);
resetBtn.addEventListener("click", newGame);
