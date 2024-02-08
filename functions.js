import { clickEventHandler } from "./main.js";

let divTable = document.getElementById("table");
let clickEventHandler;
let selectedDifficulty;
let currentUsername;
let timerStarted;

function getRandomCards(src, count) {
  let uniquePics = Array.from(new Set(src));
  let selectedPics = uniquePics.slice(0, Math.ceil(count / 2));
  let dblPics = selectedPics.flatMap((item) => [item, item]);
  return dblPics.slice(0, count);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function picMaker(src, rows, cols, selectedDifficulty) {
  let shuffledSrc = shuffleArray([...src]);
  let count = rows * cols;
  let randomCards = getRandomCards(shuffledSrc, count);
  shuffleArray(randomCards);

  let table = document.createElement("table");
  table.id = "imgTable";
  let flippedCards = [];
  let matchingCount = 0;

  function removeSrc() {
    flippedCards.forEach((card) => {
      card.setAttribute("src", "icons/questionmark.jpg");
    });
    flippedCards = [];
  }

  function handleClick() {
    let currentRow = parseInt(this.getAttribute("data-row"));
    let currentCol = parseInt(this.getAttribute("data-col"));
    let img = this.querySelector("img");

    if (!flippedCards.includes(img) && flippedCards.length < 2) {
      img.setAttribute("src", randomCards[currentRow * cols + currentCol]);
      flippedCards.push(img);

      if (
        flippedCards.length === 2 &&
        flippedCards[0].src === flippedCards[1].src
      ) {
        matchingCount++;
        flippedCards = [];

        if (matchingCount === count / 2) {
          setTimeout(checkGameCompletion, 1000);
        }
      } else if (flippedCards.length === 2) {
        setTimeout(removeSrc, 2000);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", "card");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);

      let img = document.createElement("img");
      img.setAttribute("class", "icon");
      img.classList.add("default");
      img.setAttribute("src", "icons/questionmark.jpg");

      cell.addEventListener("click", handleClick);

      cell.appendChild(img);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  function checkGameCompletion() {
    const time = timerValue;
    divTable.innerHTML = "";
    const playAgain = window.confirm(
      `You won! Your time: ${time} seconds! Do you want to have a new try?`
    );
    let users = [];
    let username = document.querySelector("#user");
    let times = [];
    users.push(username.value);
    times.push(time);

    let userTimePair = { user: users[0], time: times[0] };

    let difficultyData =
      JSON.parse(localStorage.getItem(selectedDifficulty)) || [];

    let existingUserIndex = difficultyData.findIndex(
      (entry) => entry.user === users[0]
    );
    if (existingUserIndex !== -1) {
      if (times[0] < difficultyData[existingUserIndex].time) {
        difficultyData[existingUserIndex].time = times[0];
      }
    } else {
      difficultyData.push(userTimePair);
    }

    localStorage.setItem(selectedDifficulty, JSON.stringify(difficultyData));

    if (playAgain) {
      easy.disabled = true;
      medium.disabled = true;
      hard.disabled = true;
      expert.disabled = true;
      stopTimer();
      console.log(`${timerStarted}`);
      document.querySelector("#timer").innerHTML = "Your time: ";
      document.getElementById("timer").innerText += timerValue;
    } else {
      console.log(
        "Game Over! All pairs matched, but the user chose not to play again."
      );
    }
  }

  divTable.innerHTML = "";
  divTable.appendChild(table);
}

let timerValue = 0;
let timerId;

function updateTimer() {
  timerValue++;
  document.getElementById("timer").innerText = "Your time: ";
  document.getElementById("timer").innerText += timerValue;
}

function startTimer() {
  console.log("Timer started");
  timerId = setInterval(updateTimer, 1000);
}
function stopTimer() {
  clearInterval(timerId);
  timerValue = 0;
  timerStarted = false;
}

function checkGameCompletion() {
  const time = timerValue;
  const playAgain = window.confirm(
    `You won! Your time: ${time} seconds! Do you want to have a new try?`
  );

  if (playAgain) {
    beginner.disabled = false;
    intermediate.disabled = false;
    professional.disabled = false;
    expert.disabled = false;
    timerStarted = false;
    removeClickListener();
    divTable.innerHTML = "";
    stopTimer();
    timerValue = 0;
    document.querySelector("#timer").innerHTML = "Your time: 0";
  } else {
    console.log(
      "Game Over! All pairs matched, but the user chose not to play again."
    );
  }
}

export { picMaker, updateTimer, startTimer, stopTimer, showLeaderboard };
