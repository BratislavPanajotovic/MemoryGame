let divTable = document.getElementById('table');

function getRandomCards(src, count) {
    let uniquePics = Array.from(new Set(src)); // Remove duplicates from src
    let selectedPics = uniquePics.slice(0, Math.ceil(count / 2));
    let dblPics = selectedPics.flatMap(item => [item, item]);
    return dblPics.slice(0, count);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function picMaker(src, rows, cols) {
    let shuffledSrc = shuffleArray([...src]);
    let count = rows * cols;
    let randomCards = getRandomCards(shuffledSrc, count);
    shuffleArray(randomCards);

    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');

            let img = document.createElement('img');
            img.setAttribute('class', 'icon');
            img.setAttribute('src', randomCards[i * cols + j]);

            cell.appendChild(img);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    divTable.innerHTML = ''; // Clear existing content
    divTable.appendChild(table);
}

let timerValue = 0;
    let timerId;

    function updateTimer() {
      timerValue++;
      document.getElementById('timer').innerText = timerValue;
    }

    function startTimer() {
      timerId = setInterval(updateTimer, 1000); // 1000 milliseconds = 1 second
    }

    function stopTimer() {
      clearInterval(timerId);
    }

export { getRandomCards, shuffleArray, picMaker, updateTimer, startTimer, stopTimer };
