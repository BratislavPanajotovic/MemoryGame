let src = ["icons/ai.png","icons/amazon.png","icons/apple.webp","icons/beats.png","icons/chrome.png","icons/clc.png","icons/css.png","icons/deezer.png","icons/docker.jpg","icons/e.png","icons/ea.png","icons/excell.png","icons/fb.png","icons/gh.webp","icons/ghome.webp","icons/git.png","icons/google.png","icons/gpt.png","icons/html.png","icons/http.png","icons/in.png","icons/insta-old.jpg","icons/it-bootcamp.jpg","icons/jordan.png","icons/js.png","icons/lens.png","icons/location.png","icons/mail.png","icons/microsoft.png","icons/msg.webp","icons/mssg.jpg","icons/netflix.png","icons/nike.png","icons/office.png","icons/php.png","icons/play.webp","icons/pp.png","icons/py.png","icons/React-icon.svg.png","icons/slack.png","icons/spotify.png","icons/teams.png","icons/telegram.png","icons/time.jpg","icons/time.jpg","icons/twitter.png","icons/viber.png","icons/wa.jpg","icons/worf.png","icons/yt.png","icons/gdrive.png"];

import { getRandomCards, shuffleArray, picMaker, updateTimer, startTimer, stopTimer,getRowsColsFromDifficulty,removeClickListener } from './functions.js';



let beginner = document.querySelector('#beginner');
let intermediate = document.querySelector('#intermediate');
let professional = document.querySelector('#professional');
let expert = document.querySelector("#expert");

let divTable = document.querySelector('#table');
let username = document.querySelector('#user');

let memoryGame = document.querySelector('#memoryGame');
let showTimer = document.querySelector('#timer');

showTimer.innerHTML = "";
memoryGame.innerHTML = "";
beginner.disabled = true;
intermediate.disabled = true;
professional.disabled = true;
expert.disabled = true;

let currentUsername;

username.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
       let currentUsername = username.value.trim();
        timerStarted = false;
        if (currentUsername === '' || currentUsername.length <= 3) {
            alert('Please enter a valid username!');
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



let selectedDifficulty = 'beginner';
beginner.addEventListener("click", () => {
    selectedDifficulty = 'beginner';
    picMaker(src, 4, 4, currentUsername, handleGameCompletion);
});

intermediate.addEventListener("click", () => {
    selectedDifficulty = 'intermediate';
    picMaker(src, 6, 6, currentUsername, handleGameCompletion);
});

professional.addEventListener("click", () => {
    selectedDifficulty = 'professional';
    picMaker(src, 8, 8, currentUsername, handleGameCompletion);
});

expert.addEventListener("click", () => {
    selectedDifficulty = 'expert';
    picMaker(src, 10, 10, currentUsername, handleGameCompletion);
});

function handleGameCompletion() {
    stopTimer();
    const time = timerValue;

    let userResults = JSON.parse(localStorage.getItem(selectedDifficulty)) || [];

    // Add the current result to the array
    userResults.push({ username: currentUsername, time });

    // Sort the results based on time in ascending order
    userResults.sort((a, b) => a.time - b.time);

    // Keep only the top 5 results
    userResults = userResults.slice(0, 5);

    // Save the updated results back to localStorage using the selectedDifficulty as the key
    localStorage.setItem(selectedDifficulty || 'beginner', JSON.stringify(userResults));

    const playAgain = window.confirm(`You won! Your time: ${time} seconds! Do you want to have a new try?`);

    if (playAgain) {
        beginner.disabled = false;
        intermediate.disabled = false;
        professional.disabled = false;
        expert.disabled = false;
        timerValue = 0;
        timerStarted = false;
        removeClickListener();
        divTable.innerHTML = "";

        document.querySelector('#timer').innerHTML = "Your time: 0";
    } else {
        console.log("Game Over! All pairs matched, but the user chose not to play again.");
    }
}
let timerStarted = false;

const clickEventHandler = () => {
    beginner.disabled = true;
    intermediate.disabled = true;
    professional.disabled = true;
    expert.disabled = true;

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
};


divTable.addEventListener("click", clickEventHandler);
