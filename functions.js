let divTable = document.getElementById('table');
let user = document.querySelector('#user');



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
    
    let flippedCards = []; // Array to store flipped cards
    let matchingCount = 0; // Variable to track the number of matching pairs

    function removeSrc() {
        // Revert the source to 'questionmark.jpg' for all flipped cards
        flippedCards.forEach(card => {
            card.setAttribute('src', 'icons/questionmark.jpg');
        });
        flippedCards = []; // Clear the array
    }

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('class', 'card'); // Set a class for styling

            // Set data attributes to store the index information
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);

            // Create an image element and set its source to the default value
            let img = document.createElement('img');
            img.setAttribute('class', 'icon');
            img.classList.add("default");
            img.setAttribute('src', 'icons/questionmark.jpg');

            // Add click event listener to each td element
            cell.addEventListener('click', function() {
                let currentRow = parseInt(this.getAttribute('data-row'));
                let currentCol = parseInt(this.getAttribute('data-col'));

                // Check if the card is already flipped or is currently being revealed
                if (!flippedCards.includes(img) && flippedCards.length < 2) {
                    img.setAttribute('src', randomCards[currentRow * cols + currentCol]);
                    flippedCards.push(img);

                    // Check if two cards are flipped and they match
                    if (flippedCards.length === 2 && flippedCards[0].src === flippedCards[1].src) {
                        matchingCount++; // Increment the matching count
                        flippedCards = []; // Clear the array
                    } else if (flippedCards.length === 2) {
                        // If two cards are flipped but they don't match, revert the source after a brief delay
                        setTimeout(removeSrc, 2000);
                    }

                    // Check if all pairs are matched
                    if (matchingCount === count / 2) {
                        stopTimer();
                        alert(`You won! This is your time : ${timerValue} `)
                        localStorage.setItem("user", user.value);
                        localStorage.setItem("time", timerValue)

                        console.log("Game Over! All pairs matched.");
                        // You can add your logic here for what to do when the game is over
                    }
                }
            });

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
        console.log("Timer started");
        timerId = setInterval(updateTimer, 1000); 
    }

    function stopTimer() {
      clearInterval(timerId);
    }

export { getRandomCards, shuffleArray, picMaker, updateTimer, startTimer, stopTimer };
