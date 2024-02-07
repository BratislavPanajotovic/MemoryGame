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

let beginner = document.querySelector("#beginner");
let intermediate = document.querySelector("#intermediate");
let professional = document.querySelector("#professional");
let expert = document.querySelector("#expert");

let divTable = document.querySelector("#table");
let username = document.querySelector("#user");

let memoryGame = document.querySelector("#memoryGame");
let showTimer = document.querySelector("#timer");
let timerStarted = false;

showTimer.innerHTML = "";
memoryGame.innerHTML = "";
beginner.disabled = true;
intermediate.disabled = true;
professional.disabled = true;
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
      beginner.disabled = false;
      intermediate.disabled = false;
      professional.disabled = false;
      expert.disabled = false;
      event.preventDefault();
      username.placeholder = currentUsername;
      stopTimer();
    }
  }
});

let selectedDifficulty = "beginner";

beginner.addEventListener("click", () => {
  selectedDifficulty = "beginner";
  picMaker(src, 4, 4);
});

intermediate.addEventListener("click", () => {
  selectedDifficulty = "intermediate";
  picMaker(src, 6, 6);
});

professional.addEventListener("click", () => {
  selectedDifficulty = "professional";
  picMaker(src, 8, 8);
});

expert.addEventListener("click", () => {
  selectedDifficulty = "expert";
  picMaker(src, 10, 10);
});

const clickEventHandler = () => {
  beginner.disabled = true;
  intermediate.disabled = true;
  professional.disabled = true;
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
