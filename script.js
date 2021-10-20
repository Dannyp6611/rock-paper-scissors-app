/** modal selectors ***/
const closeBtn = document.querySelectorAll(".close-btn");
const rulesBtn = document.querySelector(".btn-rules");
const modalBackdrop = document.querySelector(".backdrop");
const main = document.querySelector("main");
const gameResults = document.querySelector(".game-results");
const scoreEl = document.querySelector("#score");

/*** game selectors ***/
const btns = document.querySelectorAll(".btn-circle");

const generateComputerChoice = () => {
  let computerChoice = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  switch (computerChoice) {
    case 1:
      computerChoice = "paper";
      break;
    case 2:
      computerChoice = "scissors";
      break;
    case 3:
      computerChoice = "rock";
      break;
  }
  return computerChoice;
};

let score;

if (!localStorage.getItem("score")) {
  localStorage.setItem("score", JSON.stringify(+0));
  score = JSON.parse(localStorage.getItem("score"));
} else {
  score = JSON.parse(localStorage.getItem("score"));
}

scoreEl.textContent = score;

const playGame = (userChoice) => {
  const computerChoice = generateComputerChoice();

  const userSelectionHTML = `
    <div class="user-picked">
        <h2>you picked</h2>
        <button class="btn-circle ${userChoice}" data-choice="${userChoice}" disabled>
            <div class="wrapper">
                <img src="./images/icon-${userChoice}.svg" alt="${userChoice} icon" />
            </div>
        </button>
    </div>
  `;

  const computerSelectionHTML = `
    <div class="computer-picked">
        <h2>the house picked</h2>
        <button class="btn-circle ${computerChoice}" data-choice="${computerChoice}" disabled>
          <div class="wrapper">
            <img src="./images/icon-${computerChoice}.svg" alt="${computerChoice} icon" />
          </div>
        </button>
    </div>
  `;

  main.style.display = "none";

  gameResults.innerHTML = userSelectionHTML;

  setTimeout(() => {
    gameResults.innerHTML += computerSelectionHTML;
  }, 2000);

  const gameResultEl = document.createElement("div");
  gameResultEl.classList.add("end-game-result");

  setTimeout(() => {
    if (userChoice === computerChoice) {
      gameResultEl.innerHTML = `
        <h4>you draw</h4>
        <button class="play-again">play again</button>
      `;
      gameResults.insertBefore(
        gameResultEl,
        document.querySelector(".computer-picked")
      );
      return;
    }
    if (
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      gameResultEl.innerHTML = `
        <h4>you win</h4>
        <button class="play-again">play again</button>
      `;
      gameResults.insertBefore(
        gameResultEl,
        document.querySelector(".computer-picked")
      );
      score++;
      localStorage.setItem("score", JSON.stringify(+score));
      scoreEl.textContent = score;
      return;
    } else {
      gameResultEl.innerHTML = `
        <h4>you lose</h4>
        <button class="play-again">play again</button>
      `;
      gameResults.insertBefore(
        gameResultEl,
        document.querySelector(".computer-picked")
      );
      if (score > 0) {
        score--;
        localStorage.setItem("score", JSON.stringify(+score));
        scoreEl.textContent = score;
      }
    }
  }, 4000);

  console.log(userChoice, computerChoice);
};

btns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const userChoice = e.currentTarget.getAttribute("data-choice");
    playGame(userChoice);
  })
);

gameResults.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-again")) {
    main.style.display = "flex";
    gameResults.innerHTML = "";
  }
});

const toggleModal = () => {
  modalBackdrop.classList.toggle("active");
};

const openModal = () => {
  modalBackdrop.classList.add("active");
};

closeBtn.forEach((btn) => btn.addEventListener("click", toggleModal));
rulesBtn.addEventListener("click", openModal);
