"use strict";

const cssClasses = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
const tiles = [];
const DECK_SIZE = 16;

let moveCounter = 0;

function initArray(array, size) {
    for (let i = 0; i < size; i++) {
        array.push(i);
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function extractTileId(id) {
    return parseInt(id.replace("tile_", ""), 10);
}

function indexToCard(idx) {
    return document.querySelector("#tile_" + idx);
}

function amountOfStars() {
    let nStars = 0;
    let limit = 4;
    if (moveCounter <= limit) {
        nStars = 3;
    }
    else if (moveCounter <= limit + 10) {
        nStars = 2;
    }
    else if (moveCounter <= limit + 20) {
        nStars = 1;
    }
    return nStars;
}

function updateStars() {
    let nStars = amountOfStars();
    let starElements = document.querySelectorAll(".fa.fa-star");
    starElements[0].style.opacity = nStars >= 1 ? "1" : "0.1";
    starElements[1].style.opacity = nStars >= 2 ? "1" : "0.1";
    starElements[2].style.opacity = nStars >= 3 ? "1" : "0.1";
}

let openCards = [];

function getCurrentClass(el) {
    return el.classList[2];
}

function cardClick() {  
    let currentIndex = extractTileId(this.id);
    console.log(currentIndex);

    if (openCards.length === 0) {
        openCards.push(currentIndex);
        this.classList.add("show", "open");
    } else if (openCards.length === 1) {
        if (openCards[0] === currentIndex) {
            return;
        }
        openCards.push(currentIndex);
        this.classList.add("show", "open");

        let cardEl1 = indexToCard(openCards[0]);
        let cardEl2 = indexToCard(openCards[1]);

        let card1 = getCurrentClass(cardEl1);
        let card2 = getCurrentClass(cardEl2);
        if (card1 === card2) {
            cardEl1.classList.add("match");
            cardEl2.classList.add("match");
            cardEl1.classList.remove("open");
            cardEl2.classList.remove("open");
            openCards = [];
        } else {
            setTimeout(function resetTwoCards() {
                cardEl1.classList.remove("show", "open");
                cardEl2.classList.remove("show", "open");
                openCards = [];
            }, 700);
       }
    }
    setMoveCounter(moveCounter + 1);
    updateStars();

    let isOver = document.querySelectorAll(".match").length === DECK_SIZE;
    if (isOver) {
        stopTimer();
        showWinMessage();
        startTimer();
    }
}

let counter = 0;
const counterElement = document.querySelector(".timer");
let counterIntervalId = null;

function startTimer() {
    if (!counterIntervalId) {
        counterIntervalId = setInterval(onGameTimer, 1000);
    }
}

function stopTimer() {
    if (counterIntervalId) {
        clearInterval(counterIntervalId);
        counterIntervalId = null;
    }
}

function onGameTimer() {
    counter++;
    counterElement.innerHTML = formatElapsedTime(counter);
}

function formatElapsedTime(time) {
    //From Stack Overflow
    var date = new Date(null);
    date.setSeconds(time);
    return date.toISOString().substr(11, 8);
}

function initDomElements(size, parent) {
    for (let i = 0; i < size; i++) {
        let el = document.createElement("div");
        el.classList.add("card", "fa");
        el.setAttribute("id", "tile_" + i);
        el.addEventListener("click", cardClick, false);
        parent.appendChild(el);
    }
}

function assignTileClasses(tiles, cssClasses) {
    //Go through all tiles and set classes associated with current tile value
    for (let i = 0; i < tiles.length; i++) {
        let el = indexToCard(i);
        let cls = cssClasses[tiles[i]];
        el.classList.add(cls);
    }
}

function restartGame() {
    stopTimer();
    counter = 0;
    counterElement.innerHTML = formatElapsedTime(counter);
    setMoveCounter(0);
    updateStars();
    openCards = [];

    //Shuffle tiles and reassign CSS classes back to tiles
    shuffle(tiles);
    tiles.forEach((tileIndex) => {
        let cardElement = indexToCard(tileIndex);
        cardElement.className = "card fa";
        let cls = cssClasses[tiles[tileIndex]];
        cardElement.classList.add(cls);
    });
    startTimer();
}

function restartClick() {
    //Check if game is running
    if (counterIntervalId) {
        //Reset to initial state if game is running
        restartGame();
    }
    else {
        //If game is not running then start the game timer
        startTimer();
    }
}

function setMoveCounter(value) {
    moveCounter = value;
    document.querySelector(".moves").innerHTML = "" + moveCounter;
}

function showPlural(num, text) {
    if (num === 1) {
        return `${num} ${text}`;
    } else {
        return `${num} ${text}s`;
    }
}

function showWinMessage() {
    let stars = amountOfStars();
    let msg = `Congratulations, you won!
    It took you ${moveCounter} moves to win.
    You won with ${showPlural(stars, "star")} in ${showPlural(counter, "second")}.
    
    Would you like to play again?`;
    alert(msg);
}

function main() {
    initArray(tiles, DECK_SIZE);
    shuffle(tiles);
    initDomElements(DECK_SIZE, document.querySelector(".deck"));
    assignTileClasses(tiles, cssClasses);
    document.querySelector(".restart").addEventListener("click", restartClick, false);
    startTimer();
}