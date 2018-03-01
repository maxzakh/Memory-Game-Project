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

function updateStars() {
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
    let starElements = document.querySelectorAll(".fa.fa-star");
    starElements[0].style.visibility = nStars >= 1 ? "" : "hidden";
    starElements[1].style.visibility = nStars >= 2 ? "" : "hidden";
    starElements[2].style.visibility = nStars >= 3 ? "" : "hidden";
}

function cardClick() {
    this.classList.add("show");
    setMoveCounter(moveCounter + 1);
    updateStars();
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
    counterElement.innerHTML = "" + counter;
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
    for (let i = 0; i < tiles.length; i++) {
        let el = indexToCard(i);
        let cls = cssClasses[tiles[i]];
        el.classList.add(cls);
    }
}

function restartClick() {
    if (counterIntervalId) {
        stopTimer();
        counter = 0;
        counterElement.innerHTML = "" + counter;
        setMoveCounter(0);
        updateStars();
    }
    else {
        startTimer();
    }
}

function setMoveCounter(value) {
    moveCounter = value;
    document.querySelector(".moves").innerHTML = "" + moveCounter;
}

function main() {
    initArray(tiles, DECK_SIZE);
    shuffle(tiles);
    initDomElements(DECK_SIZE, document.querySelector(".deck"));
    assignTileClasses(tiles, cssClasses);
    document.querySelector(".restart").addEventListener("click", restartClick, false);
    startTimer();
}