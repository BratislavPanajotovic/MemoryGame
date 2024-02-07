import { picMaker, updateTimer, startTimer, stopTimer } from "./functions.js";

let src = [
  "icons/ai.png",
  "icons/amazon.png",
  "icons/apple.webp",
  "icons/beats.png",
  "icons/chrome.png",
  "icons/clc.png",
  "icons/css.png",
  "icons/deezer.png",
  "icons/docker.jpg",
  "icons/e.png",
  "icons/ea.png",
  "icons/excell.png",
  "icons/fb.png",
  "icons/gh.webp",
  "icons/ghome.webp",
  "icons/git.png",
  "icons/google.png",
  "icons/gpt.png",
  "icons/html.png",
  "icons/http.png",
  "icons/in.png",
  "icons/insta-old.jpg",
  "icons/it-bootcamp.jpg",
  "icons/jordan.png",
  "icons/js.png",
  "icons/lens.png",
  "icons/location.png",
  "icons/mail.png",
  "icons/microsoft.png",
  "icons/msg.webp",
  "icons/mssg.jpg",
  "icons/netflix.png",
  "icons/nike.png",
  "icons/office.png",
  "icons/php.png",
  "icons/play.webp",
  "icons/pp.png",
  "icons/py.png",
  "icons/React-icon.svg.png",
  "icons/slack.png",
  "icons/spotify.png",
  "icons/teams.png",
  "icons/telegram.png",
  "icons/time.jpg",
  "icons/time.jpg",
  "icons/twitter.png",
  "icons/viber.png",
  "icons/wa.jpg",
  "icons/worf.png",
  "icons/yt.png",
  "icons/gdrive.png",
];

let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
let expert = document.querySelector("#expert");

let divTable = document.querySelector("#table");
let divResults = document.querySelector("#results");
let divBtns = document.querySelector("#btn");

let username = document.querySelector("#user");

let memoryGame = document.querySelector("#memoryGame");
let showTimer = document.querySelector("#timer");
let timerStarted = false;

showTimer.innerHTML = "";
memoryGame.innerHTML = "";
easy.disabled = true;
medium.disabled = true;
hard.disabled = true;
expert.disabled = true;

username.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let currentUsername = username.value.trim();
    stopTimer();
    timerStarted = false;
    if (currentUsername === "" || currentUsername.length <= 3) {
      alert("Please enter a valid username!");
    } else {
      memoryGame.innerHTML = "Memory Game!";
      easy.disabled = false;
      medium.disabled = false;
      hard.disabled = false;
      expert.disabled = false;
      event.preventDefault();
      username.placeholder = currentUsername;
      stopTimer();
    }
  }
});

let selectedDifficulty = "Easy";

easy.addEventListener("click", () => {
  selectedDifficulty = "Easy";
  picMaker(src, 4, 4, selectedDifficulty);
});

medium.addEventListener("click", () => {
  selectedDifficulty = "Medium";
  picMaker(src, 6, 6, selectedDifficulty);
});

hard.addEventListener("click", () => {
  selectedDifficulty = "Hard";
  picMaker(src, 8, 8, selectedDifficulty);
});

expert.addEventListener("click", () => {
  selectedDifficulty = "Expert";
  picMaker(src, 10, 10, selectedDifficulty);
});

const clickEventHandler = () => {
  easy.disabled = true;
  medium.disabled = true;
  hard.disabled = true;
  expert.disabled = true;
  console.log(`klik`);
  console.log(timerStarted);
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
    console.log(`Usao je. `);
  }
};

divTable.addEventListener("click", clickEventHandler);

function generateTable(selectedDifficulty) {
  let tableData = JSON.parse(localStorage.getItem(selectedDifficulty)) || [];

  console.log(tableData);

  if (tableData.length < 5) {
    tableData = Array.from({ length: 5 }, (_, index) => ({
      user: "",
      time: "",
      position: index + 1,
    }));
  }
  console.log(tableData);

  tableData.sort((a, b) => a.time - b.time);

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  let positionHeader = document.createElement("th");
  positionHeader.textContent = "Position";
  let usernameHeader = document.createElement("th");
  usernameHeader.textContent = "Username";
  let timeHeader = document.createElement("th");
  timeHeader.textContent = "Time";

  headerRow.appendChild(positionHeader);
  headerRow.appendChild(usernameHeader);
  headerRow.appendChild(timeHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  tableData.forEach((entry) => {
    let row = document.createElement("tr");
    let positionCell = document.createElement("td");
    positionCell.textContent = entry.position;
    let usernameCell = document.createElement("td");
    usernameCell.textContent = entry.user;
    let timeCell = document.createElement("td");
    timeCell.textContent = entry.time;

    row.appendChild(positionCell);
    row.appendChild(usernameCell);
    row.appendChild(timeCell);
    tbody.appendChild(row);
  });

  divResults.innerHTML = "";
  divResults.appendChild(table);
}

divBtns.addEventListener("click", function (event) {
  if (event.target.tagName === "INPUT") {
    let selectedDifficulty = event.target.value;
    generateTable(selectedDifficulty);
  }
});

generateTable("Easy");
