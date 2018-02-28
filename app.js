const cssClasses = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
const tiles = [];
const DECK_SIZE = 16;

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

function cardClick() {
    this.classList.add("show");
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

function main() {
    initArray(tiles, DECK_SIZE);
    shuffle(tiles);
    initDomElements(DECK_SIZE, document.querySelector(".deck"));
    assignTileClasses(tiles, cssClasses);
}