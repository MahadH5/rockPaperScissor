const choices = ["Rock", "Paper", "Scissors"];

let playerScore = 0;
let computerScore = 0;
let gameStarted = false;
let gameOver = false;

const buttons = document.querySelectorAll(".choice-btn");

const playerChoiceText =
  document.getElementById("player-choice");

const computerChoiceText =
  document.getElementById("computer-choice");

const resultText =
  document.getElementById("result");

const playerScoreText =
  document.getElementById("player-score");

const computerScoreText =
  document.getElementById("computer-score");

const turnText =
  document.getElementById("turn");

const startBtn =
  document.getElementById("start-btn");

const restartBtn =
  document.getElementById("restart-btn");

function enableChoices(enable) {
  buttons.forEach(btn => {
    btn.disabled = !enable;
  });
}

function startGame() {
  gameStarted = true;
  gameOver = false;

  turnText.textContent =
    "Your Turn! Choose Rock, Paper or Scissors";

  resultText.textContent =
    "Game Started!";

  enableChoices(true);
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;

  gameStarted = false;
  gameOver = false;

  playerScoreText.textContent = 0;
  computerScoreText.textContent = 0;

  playerChoiceText.textContent = "-";
  computerChoiceText.textContent = "-";

  resultText.textContent =
    "Make your move!";

  turnText.textContent =
    "Press Start to Play";

  resultText.className = "";

  enableChoices(false);
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

buttons.forEach(button => {
  button.addEventListener("click", () => {

    if (!gameStarted || gameOver) return;

    const playerChoice =
      button.dataset.choice;

    turnText.textContent =
      "Computer is choosing...";

    setTimeout(() => {

      const computerChoice =
        choices[Math.floor(Math.random() * 3)];

      playerChoiceText.textContent =
        playerChoice;

      computerChoiceText.textContent =
        computerChoice;

      let result = "";

      resultText.className = "";

      if (playerChoice === computerChoice) {

        result = "🤝 It's a Tie!";
        resultText.classList.add("tie");

      } else if (
        (playerChoice === "Rock" &&
          computerChoice === "Scissors") ||

        (playerChoice === "Paper" &&
          computerChoice === "Rock") ||

        (playerChoice === "Scissors" &&
          computerChoice === "Paper")
      ) {

        result = "🎉 You Win This Round!";
        playerScore++;
        resultText.classList.add("win");

      } else {

        result = "💻 Computer Wins This Round!";
        computerScore++;
        resultText.classList.add("lose");
      }

      resultText.textContent = result;

      playerScoreText.textContent =
        playerScore;

      computerScoreText.textContent =
        computerScore;

      // Game Winner
      if (playerScore === 5) {

        gameOver = true;
        enableChoices(false);

        resultText.textContent =
          "🏆 Congratulations! You Won The Game!";

        resultText.className = "win";

        turnText.textContent =
          "Game Over - Press Restart";

      } else if (computerScore === 5) {

        gameOver = true;
        enableChoices(false);

        resultText.textContent =
          "💻 Computer Won The Game!";

        resultText.className = "lose";

        turnText.textContent =
          "Game Over - Press Restart";

      } else {

        turnText.textContent =
          "Your Turn! Choose Again";
      }

    }, 500);
  });
});

// Initial state
restartGame();