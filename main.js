import { getRandomCards, shuffleArray, picMaker,updateTimer , startTimer,stopTimer } from './functions.js';

let beginner = document.querySelector('#beginner');
let intermediate = document.querySelector('#intermediate');
let professional = document.querySelector('#professional');
let expert = document.querySelector("#expert");

let divTable = document.querySelector('#table')

let src = ["icons/ai.png","icons/amazon.png","icons/apple.webp","icons/beats.png","icons/chrome.png","icons/clc.png","icons/css.png","icons/deezer.png","icons/docker.jpg","icons/e.png","icons/ea.png","icons/excell.png","icons/fb.png","icons/gh.webp","icons/ghome.webp","icons/git.png","icons/google.png","icons/gpt.png","icons/html.png","icons/http.png","icons/in.png","icons/insta-old.jpg","icons/it-bootcamp.jpg","icons/jordan.png","icons/js.png","icons/lens.png","icons/location.png","icons/mail.png","icons/microsoft.png","icons/msg.webp","icons/mssg.jpg","icons/netflix.png","icons/nike.png","icons/office.png","icons/php.png","icons/play.webp","icons/pp.png","icons/py.png","icons/React-icon.svg.png","icons/slack.png","icons/spotify.png","icons/teams.png","icons/telegram.png","icons/time.jpg","icons/time.jpg","icons/twitter.png","icons/viber.png","icons/wa.jpg","icons/worf.png","icons/yt.png","icons/gdrive.png"];

let coverCard = ["icons/questionmark.jpg"];

console.log(src.length);
console.log(src);

if(beginner.checked == true) {
    picMaker(src, 4, 4);
}

beginner.addEventListener("click", () => {
    picMaker(src, 4, 4);
});

intermediate.addEventListener("click", () => {
    picMaker(src, 6, 6);
});

professional.addEventListener("click", () => {
    picMaker(src, 8, 8);
});

expert.addEventListener("click", () => {
    picMaker(src, 10, 10);
});

let timerStarted = false;
divTable.addEventListener("click", () => {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
});