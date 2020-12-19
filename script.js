// randomly pick choice
function computerPlay() {
  let no = Math.random();
  if (no < 1 / 3) {
    return "rock";
  } else if (no > 2 / 3) {
    return "scissors";
  } else {
    return "paper";
  }
}

function checkWin(result, scores) {
  let winner;
  if (result[0] === result[1]) {
    scores.draw++; // if choices are same it is draw
    winner = "draw";
  } else if (result[0] === "rock") {
    if (result[1] === "scissors") {
      scores.human++; // human rock comp scissors human win
      winner = "human";
    } else {
      scores.comp++; // human rock comp paper comp win
      winner = "comp";
    }
  } else if (result[0] === "paper") {
    if (result[1] === "scissors") {
      scores.comp++; // human paper comp scissors comp win
      winner = "comp";
    } else {
      scores.human++; // human paper comp rock human win
      winner = "human";
    }
  } else {
    if (result[1] === "rock") {
      scores.comp++; // human scissors comp rock comp win
      winner = "comp";
    } else {
      scores.human++; // human scissors comp paper human win
      winner = "human";
    }
  }
  return scores;
}

function game(humanPlay, scores) {
  compPlay = computerPlay();
  showChoices(humanPlay, compPlay);
  let result = [humanPlay, compPlay]; // array 0: player choice , 1: random choice
  scores = checkWin(result, scores); // check who wins
  updateScores(scores); // update scores on page
  if (scores.human === 5 || scores.comp === 5) {
    const game = document.querySelector("#game");
    game.classList.add("hidden");
    const end = document.querySelector("#winner");
    end.classList.remove("hidden");
    end.classList.add("winner");
    if (scores.human === 5) {
      const humanWin = document.querySelector("#humanWin");
      humanWin.classList.remove("hidden");
      const compWin = document.querySelector("#compWin");
      compWin.classList.add("hidden");
    } else {
      const humanWin = document.querySelector("#humanWin");
      humanWin.classList.add("hidden");
      const compWin = document.querySelector("#compWin");
      compWin.classList.remove("hidden");
    }
  }
}

function showChoices(human, comp) {
  // reset choices
  const buttons = document.querySelectorAll(".choiceHum");
  buttons.forEach((button) => {
    button.classList.remove("chosen");
  });
  const compButtons = document.querySelectorAll(".choiceComp");
  compButtons.forEach((button) => {
    button.classList.add("hidden");
  });
  // add chosen class to each of selected
  if (human === "rock") {
    const hchosen = document.querySelector("#humanRock");
    hchosen.classList.add("chosen");
  } else if (human === "paper") {
    const hchosen = document.querySelector("#humanPaper");
    hchosen.classList.add("chosen");
  } else {
    const hchosen = document.querySelector("#humanScissors");
    hchosen.classList.add("chosen");
  }
  if (comp === "rock") {
    const cchosen = document.querySelector("#computerRock");
    cchosen.classList.remove("hidden");
  } else if (comp === "paper") {
    const cchosen = document.querySelector("#computerPaper");
    cchosen.classList.remove("hidden");
  } else {
    const cchosen = document.querySelector("#computerScissors");
    cchosen.classList.remove("hidden");
  }
}

function updateScores(scores) {
  const humanScore = document.querySelector("#humanScore"); // find human score on webpage
  humanScore.textContent = scores.human; // update score by changing content
  const compScore = document.querySelector("#compScore");
  compScore.textContent = scores.comp;
  const draws = document.querySelector("#draws");
  draws.textContent = scores.draw;
}

function reset() {
  let scores = { human: 0, comp: 0, draw: 0 };
  const game = document.querySelector("#game");
  game.classList.remove("hidden");
  const win = document.querySelector("#winner");
  win.classList.add("hidden");
  win.classList.remove("winner");
  const buttons = document.querySelectorAll(".choiceHum");
  const compButtons = document.querySelectorAll(".choiceComp");
  compButtons.forEach((button) => button.classList.add("hidden"));
  buttons.forEach((button) => button.classList.remove("chosen"));
  updateScores(scores);
  return scores;
}

scores = reset();
const buttons = document.querySelectorAll("button"); // create button node list
buttons.forEach((button) => {
  // iterate through each button
  button.addEventListener("click", () => {
    // wait for click
    if (button.id === "humanRock") {
      // if button id is this it is rock human choice
      game("rock", scores); // play the game
    } else if (button.id === "humanPaper") {
      game("paper", scores);
    } else if (button.id === "humanScissors") {
      game("scissors", scores);
    } else if (button.id === "play") {
      scores = reset();
    }
  });
});
