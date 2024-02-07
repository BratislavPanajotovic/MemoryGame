let divTable = document.getElementById("table");
let clickEventHandler;
let selectedDifficulty;
let currentUsername;
let timerStarted;
let matchingCount = 0;

// function removeClickListener() {
//   divTable.removeEventListener("click", clickEventHandler);
// }

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
function getRowsColsFromDifficulty(difficulty) {
  switch (difficulty) {
    case "beginner":
      return 4;
    case "intermediate":
      return 6;
    case "professional":
      return 8;
    case "expert":
      return 10;
    default:
      return 4; // Default to beginner if difficulty is not recognized
  }
}

function picMaker(src, rows, cols) {
  let shuffledSrc = shuffleArray([...src]);
  let count = rows * cols;
  let randomCards = getRandomCards(shuffledSrc, count);
  shuffleArray(randomCards);

  let table = document.createElement("table");
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
          setTimeout(checkGameCompletion, 2000);
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
}

function checkGameCompletion() {
  const time = timerValue;
  divTable.innerHTML = "";
  const playAgain = window.confirm(
    `You won! Your time: ${time} seconds! Do you want to have a new try?`
  );

  if (playAgain) {
    beginner.disabled = true;
    intermediate.disabled = true;
    professional.disabled = true;
    expert.disabled = true;
    // timerStarted = false;
    // removeClickListener();
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

export {
  getRandomCards,
  shuffleArray,
  picMaker,
  updateTimer,
  startTimer,
  stopTimer,
  // removeClickListener,
  getRowsColsFromDifficulty,
};
