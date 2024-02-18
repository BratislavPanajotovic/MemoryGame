let timerStarted;
let timerValue = 0;
let timerId;

let divTable = document.getElementById("table");

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
  saveImgTableData({ randomCards, shuffledSrc });

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
          checkGameCompletion();
        }
      } else if (flippedCards.length === 2) {
        setTimeout(removeSrc, 2000);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      var cell = document.createElement("td");
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
    saveTableData(selectedDifficulty, difficultyData);

    if (playAgain) {
      easy.disabled = true;
      medium.disabled = true;
      hard.disabled = true;
      stopTimer();
      console.log(`${timerStarted}`);
      document.querySelector("#timer").innerHTML = "Your time: ";
      document.getElementById("timer").innerText += timerValue;
    } else {
      alert(
        `Game Over! All pairs matched, but ${username.value}chose not to play again.`
      );
      stopTimer();
      document.querySelector("#timer").innerHTML = "Your time: ";
      document.getElementById("timer").innerText += timerValue;
      easy.disabled = true;
      medium.disabled = true;
      hard.disabled = true;
    }
  }

  divTable.innerHTML = "";
  divTable.appendChild(table);
}
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

function showLeaderboard(selectedDifficulty) {
  let leaderboardData =
    JSON.parse(localStorage.getItem(selectedDifficulty)) || [];

  leaderboardData.sort((a, b) => a.time - b.time);

  let top5Users = leaderboardData.slice(0, 5);

  updateTable(top5Users);
}

function updateTable(leaderboardData, selectedDifficulty) {
  let table = document.querySelector("#results table");
  const storedData = loadTableData(selectedDifficulty);

  if (storedData.length > 0) {
    leaderboardData = storedData;
  }

  table.innerHTML =
    "<tr><th>Position:</th><th>Username:</th><th>Time:</th></tr>";

  leaderboardData.forEach((entry, index) => {
    let row = table.insertRow(-1);
    let positionCell = row.insertCell(0);
    let usernameCell = row.insertCell(1);
    let timeCell = row.insertCell(2);

    positionCell.textContent = `${index + 1}`;
    usernameCell.textContent = entry.user;
    timeCell.textContent = entry.time + " seconds";
  });
}
function saveTableData(tableId, data) {
  localStorage.setItem(tableId, JSON.stringify(data));
}

function loadTableData(tableId) {
  const storedData = localStorage.getItem(tableId);
  return storedData ? JSON.parse(storedData) : [];
}

function saveImgTableData(data) {
  localStorage.setItem("imgTableData", JSON.stringify(data));
}

function loadImgTableData() {
  const storedData = localStorage.getItem("imgTableData");
  return storedData ? JSON.parse(storedData) : [];
}

export { picMaker, startTimer, stopTimer, showLeaderboard, loadImgTableData };
