import {
  picMaker,
  startTimer,
  stopTimer,
  showLeaderboard,
} from "./functions.js";

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
let divBtns = document.querySelector("#btn");
let hTimer = document.querySelector("#timer");

let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
let expert = document.querySelector("#expert");

let resultsEasy = document.getElementById("Easy");
let resultsMedium = document.getElementById("Medium");
let resultsHard = document.getElementById("Hard");
let resultsExpert = document.getElementById("Expert");

let divTable = document.querySelector("#table");
let divResultsTable = document.querySelector("#resultsTable");

let username = document.querySelector("#user");

let memoryGame = document.querySelector("#memoryGame");

let selectedDifficulty = "Easy";
let timerStarted = false;
easy.disabled = true;
medium.disabled = true;
hard.disabled = true;
expert.disabled = true;
// divResultsTable.innerHTML = "";
hTimer.innerHTML = "";
// divBtns.classList.add("hidden");

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

document.addEventListener("DOMContentLoaded", function () {
  showLeaderboard(selectedDifficulty);
});

username.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let currentUsername = username.value.trim();
    stopTimer();
    timerStarted = false;
    hTimer.innerHTML = "Your time:";
    divBtns.classList.remove("hidden");
    divTable.addEventListener("click", clickEventHandler);

    if (easy.checked) {
      selectedDifficulty = "Easy";
      picMaker(src, 4, 4, selectedDifficulty);
    }

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

    if (currentUsername === "" || currentUsername.length <= 3) {
      alert("Please enter a valid username!");
      divTable.innerHTML = "";
      hTimer.innerHTML = "";
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

resultsEasy.addEventListener("click", () => {
  showLeaderboard("Easy");
});

resultsMedium.addEventListener("click", () => {
  showLeaderboard("Medium");
});

resultsHard.addEventListener("click", () => {
  showLeaderboard("Hard");
});

resultsExpert.addEventListener("click", () => {
  showLeaderboard("Expert");
});
