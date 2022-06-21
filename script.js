let gameActive = true;
let currentPlayer;
let gameState = ["", "", "", "", "", "", "", "", ""];
const blue = document.querySelector(".champ-card-blue");
const red = document.querySelector(".champ-card-red");
const modal = document.querySelector(".modal");
const battleground = document.querySelector(".battleground");
const action_box = document.querySelector(".action-box");
const action_btn = document.querySelector(".action-btn");
const game_status = document.querySelector(".game-status");
const game_restart = document.querySelector(".game-restart");
const blue_win = document.querySelector(".blue-win");
const red_win = document.querySelector(".red-win");
///////////////////////////sound effects
function play() {
  let theme = new Audio("./assets/audios/main-theme.mp3");
  theme.loop = true;
  theme.volume = 0.4;
  theme.play();
}
window.addEventListener("click", () => {
  new Audio("./assets/audios/katana.wav").play();
});

//////////////////////////game intro
function startGame() {
  play();
  red.classList.add("red-active");
  new Audio("./assets/audios/Zed.ogx").play();
  setTimeout(() => {
    blue.classList.add("blue-active");
    new Audio("./assets/audios/Yasuo.ogx").play();
  }, 3200);
}
/////////////////change statues btn to first player's color
function colorTurn() {
  return currentPlayer === "RED"
    ? (game_status.style.backgroundColor = "crimson")
    : (game_status.style.backgroundColor = "dodgerBlue");
}
action_btn.addEventListener("click", startGame);
////////////////intro animations
function interface() {
  //so background music dose not play again if we accidentally clicked on action_btn again
  action_btn.disabled = true;
  //
  blue.classList.add("blue-inactive");
  red.classList.add("red-inactive");
  action_box.style.display = "flex";
  action_btn.innerHTML = "FIGHT";
  colorTurn();
  setTimeout(() => {
    modal.style.display = "none";
    battleground.style.display = "flex";
    game_status.style.display = "flex";
    game_restart.style.display = "flex";
  }, 1500);
}
red.addEventListener("click", () => {
  action_btn.style.backgroundColor = "crimson";
  currentPlayer = "RED";
  game_status.innerHTML = `It's ${currentPlayer}'s turn`;
  interface();
});
blue.addEventListener("click", () => {
  action_btn.style.backgroundColor = "dodgerBlue";
  currentPlayer = "BLUE";
  game_status.innerHTML = `It's ${currentPlayer}'s turn`;
  interface();
});
//////////////tic tac toe logic
const winningMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `DRAW !`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
game_status.innerHTML = currentPlayerTurn();
////////////
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}
////////////
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  if (currentPlayer === "RED") {
    clickedCell.innerHTML =
      "<div class='icon'><img src='./assets/images/katana.png' /></div>";
  } else {
    clickedCell.innerHTML =
      "<div class='icon'><img src='./assets/images/star.png' /></div>";
  }
}
///////
function handlePlayerChange() {
  currentPlayer = currentPlayer === "RED" ? "BLUE" : "RED";
  game_status.innerHTML = currentPlayerTurn();
  colorTurn();
}
////////////
function handleRestartGame() {
  window.location.reload();
}
///////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    game_status.innerHTML = winningMessage();
    gameActive = false;
    // currentPlayer === "RED" ? s : s;
    if (currentPlayer === "RED") {
      red_win.style.display = "flex";
      new Audio("./assets/audios/Zed_win.ogx").play();
    } else {
      blue_win.style.display = "flex";
      new Audio("./assets/audios/Yasuo_win.ogx").play();
    }
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    game_status.innerHTML = drawMessage();
    game_status.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    gameActive = false;
    return;
  }
  handlePlayerChange();
}
///////
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
game_restart.addEventListener("click", handleRestartGame);
