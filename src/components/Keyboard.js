import { Component } from 'react';
import GuessRows from './GuessRows';
let wordle ="SUPER"
let currentTile = 0;
let isGameOver = false;

const messageDisplay = document.querySelector('.message-container')
const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "«",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "ENTER",
];

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = letter;
        GuessRows.guessRows[currentRow][currentTile] = letter;
        tile.setAttribute("data", letter);
        currentTile++;
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = "";
        GuessRows.guessRows[currentRow][currentTile] = "";
        tile.setAttribute("data", "");
    }
};

const checkRow = () => {
    const guess = GuessRows.guessRows[currentRow].join("");
    if (currentTile > 4) {
        fetch(`http://localhost:8000/check/?word=${guess}`)
            .then((response) => response.json())
            .then((json) => {
                if (json === "Entry word not found") {
                    showMessage("word not in list");
                    return;
                } else {
                    flipTile();
                    if (wordle === guess) {
                        showMessage("Magnificent!");
                        isGameOver = true;
                        return;
                    } else {
                        if (currentRow >= 5) {
                            isGameOver = true;
                            showMessage("Game Over");
                            return;
                        }
                        if (currentRow < 5) {
                            currentRow++;
                            currentTile = 0;
                        }
                    }
                }
            })
            .catch((err) => console.log(err));
    }
};

const flipTile = () => {
    const rowTiles = document.querySelector(
        "#guessRow-" + currentRow
    ).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach((tile) => {
        guess.push({
            letter: tile.getAttribute("data"),
            color: "grey-overlay",
        });
    });


const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};


const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === "«") {
            deleteLetter();
            return;
        }
        if (letter === "ENTER") {
            checkRow();
            return;
        }
        addLetter(letter);
    }
};
class Keyboard extends Component {
 render(){
    return (<div class="key-container">{keys.map(function(name, index){return (<button key={index} onClick={handleClick}>{name}</button>)})}</div>)}}

 export default Keyboard   