let cardContainer = document.querySelector('.img-container');
let divTable = document.getElementById('table');

let src = ["icons/bale-icon.webp", "icons/benz-icon.jpg", "icons/cantona-94-icon.webp", "icons/casillas-icon.jpg", "icons/cristiano-icon.webp", "icons/cruyff-icon.webp", "icons/eusebio-92-icon.webp", "icons/garrincha-98-icon.webp", "icons/Gullit-Icon.jpg", "icons/henry-98-icon.webp", "icons/iniesta-icon.jpg", "icons/kroos-icon.png", "icons/maradona-icon.webp", "icons/marcelo-icon.jpg", "icons/messi-icon.webp", "icons/modric-icon.png", "icons/pele-96-icon.webp", "icons/puskas-92-icon.webp", "icons/ramos-icon.png", "icons/romario-icon.jpg", "icons/ronaldinho-98-icon.webp", "icons/ronaldo-icon.png", "icons/xavi-icon.jpg", "icons/zidane-96-icon.webp", "icons/beckham-icon.webp"];

function getRandomCards(src, count) {
    let shuffledSrc = [...src];
    shuffledSrc.sort(() => Math.random() - 0.5);
    return shuffledSrc.slice(0, count);
}

function picMaker(src) {
    let randomCards = getRandomCards(src, 16);
    let table = '<table>';

    for (let i = 0; i < randomCards.length; i++) {
        if (i % 4 === 0) {
            table += '<tr>';
        }

        let img = document.createElement('img');
        img.setAttribute('class', 'card');
        img.setAttribute('src', randomCards[i]);

        table += `<td>${img.outerHTML}</td>`;

        if ((i + 1) % 4 === 0) {
            table += '</tr>';
        }
    }

    table += '</table>';
    divTable.innerHTML = table; // Set the table HTML to divTable, removing the redundant appending of img elements.
}

picMaker(src);
