"use strict";

const game = document.querySelector(".game");
const newGameBtn = document.querySelector("#start");

let step = true;
let count = 0;
let win = false;

function addElems() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        game.append(cell);
    }
}
function shownotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = type;
    notification.style.display = 'block';
    setTimeout(()=>{
        notification.style.display = 'none';        
    }, 1000);
}


function winable() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 2; j++) {
            if (items[i * 3 + j].textContent 
                === items[i * 3 + j + 1].textContent
                && items[i * 3 + j].textContent !== '') {
                counter++;
            }
        }
        if (counter === 2) {
            win = true;
            shownotification(!step 
                ? 'Победили Х'
                : 'Победили О', 'win');
            return;
        }
    }
}

function diagonalMainChecked() {
    let items = document.querySelectorAll('.cell');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i * 4].textContent === '') {
            break;
        }
        if (items[i * 4].textContent === items[(i + 1) * 4].textContent) {
            count++;
        }
    }
    if (count == 2) {
        win = true;
        shownotification(!step ? 'Победили Х' : 'Победили О', 'win');
    }
}

function diagonalSecondChecked() {
    let items = document.querySelectorAll('.cell');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i * 2 + 2].textContent === '') {
            break;
        }
        if (items[i * 2 + 2].textContent === items[i * 2 + 4].textContent) {
            count++;
        }
    }
    if (count == 2) {
        win = true;
        shownotification(!step ? 'Победили Х' : 'Победили О', 'win');
    }
}

function notwin() {
    const items = document.querySelector('.cell');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === '') {
            return false;
        }     
    }
    return true;
}

function verticalWin() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 2; j++) {
            if (items[j * 3 + i].textContent 
                === items[j * 3 + i + 3].textContent
                && items[j * 3 + i].textContent !== '') {
                counter++;
            }
        }
        if (counter === 2) {
            win = true;
            shownotification(!step 
                ? 'Победили Х' 
                : 'Победили О', 'win');
            return;
        }
    }
}

function clicked(event) {
    const target = event.target;
    if (win) {
        shownotification('Игра окончена. Начните заново', 'lose');
        return;
    }
    if (notwin()) {
        shownotification('Ничья', 'draw');
        return;
    } 
    if (target.textContent !== '') {
        return;
    }
    if (step) {
        step = false;
        target.textContent = 'X';
    } else {
        step = true;
        target.textContent = 'O';
    }
    count++;
    winable();
    diagonalMainChecked();
    diagonalSecondChecked();
    verticalWin();
}

function notwin() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === '') {
            return false;
        }     
    }
    return true;
}

function cleanGameField() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = '';
    }
    step = true;
    count = 0;
    win = false;
}

game.addEventListener('click', clicked);
newGameBtn.addEventListener('click', cleanGameField);
window.onload = addElems;