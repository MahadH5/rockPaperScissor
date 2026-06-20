const choices = ["Rock", "Paper", "Scissors"];

let playerScore = 0;
let computerScore = 0;
let gameActive = false;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const choiceBtns = document.querySelectorAll(".choice-btn");

const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const turnEl = document.getElementById("turn");

function enableChoices(enable) {
  choiceBtns.forEach(btn => {
    btn.disabled = !enable;
  });
}

function startGame() {
  gameActive = true;

  turnEl.textContent = "Choose Rock, Paper or Scissors";
  resultEl.textContent = "Game Started!";
  resultEl.className = "";

  enableChoices(true);
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  gameActive = false;

  playerChoice.textContent = "-";
  computerChoice.textContent = "-";

  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";

  resultEl.textContent = "Press Start";
  resultEl.className = "";

  turnEl.textContent = "Press Start To Play";

  enableChoices(false);
}

function getWinner(player, computer) {
  if (player === computer) return "tie";

  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "player";
  }

  return "computer";
}

function playRound(playerMove) {

  if (!gameActive) return;

  const computerMove =
    choices[Math.floor(Math.random() * choices.length)];

  playerChoice.textContent = playerMove;
  computerChoice.textContent = computerMove;

  const winner = getWinner(playerMove, computerMove);

  resultEl.className = "";

  if (winner === "tie") {

    resultEl.textContent = "🤝 It's a Tie!";
    resultEl.classList.add("tie");

  } else if (winner === "player") {

    playerScore++;
    resultEl.textContent = "🎉 You Win!";
    resultEl.classList.add("win");

  } else {

    computerScore++;
    resultEl.textContent = "💻 Computer Wins!";
    resultEl.classList.add("lose");
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  if (playerScore >= 5) {

    resultEl.textContent = "🏆 YOU WON THE GAME!";
    resultEl.className = "win";

    turnEl.textContent = "Game Over";
    gameActive = false;

    enableChoices(false);

  } else if (computerScore >= 5) {

    resultEl.textContent = "💀 COMPUTER WON THE GAME!";
    resultEl.className = "lose";

    turnEl.textContent = "Game Over";
    gameActive = false;

    enableChoices(false);
  }
}

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);

choiceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    playRound(btn.dataset.choice);
  });
});

restartGame();