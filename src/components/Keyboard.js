import { Component } from 'react';
import Helper from '../utils/Helper';
const messageDisplay = document.querySelector(".message-container");
let wordle = ""

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

const flipTile = () => {
    const rowTiles = document.querySelector(
        "#guessRow-" + Helper.currentRow
    ).childNodes;

    rowTiles.forEach((tile) => {
        Helper.guess.push({
            letter: tile.getAttribute("data"),
            color: "grey-overlay",
        });
    })};



const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};
const addLetter = (letter) => {
    if (Helper.currentTile < 5 && Helper.currentRow < 6) {
        const tile = document.getElementById(
            "guessRow-" + Helper.currentRow + "-tile-" + Helper.currentTile
        );
        tile.textContent = letter;
        Helper.guessRows[Helper.currentRow][Helper.currentTile] = letter;
        tile.setAttribute("data", letter);
        Helper.currentTile++;
    }
};

const deleteLetter = () => {
    if (Helper.currentTile > 0) {
        Helper.currentTile--;
        const tile = document.getElementById(
            "guessRow-" + Helper.currentRow + "-tile-" + Helper.currentTile
        );
        tile.textContent = "";
        Helper.guessRows[Helper.currentRow][Helper.currentTile] = "";
        tile.setAttribute("data", "");
    }
};
const checkRow = () => {
    const guess = Helper.guessRows[Helper.currentRow].join("");
    if (Helper.currentTile > 4) {
        fetch(`http://localhost:3001/check/?word=${guess}`)
            .then((response) => response.json())
            .then((json) => {
                if (json === "Entry word not found") {
                    showMessage("word not in list");
                    return;
                } else {
                    flipTile();
                    if (wordle === guess) {
                        showMessage("Magnificent!");
                        Helper.isGameOver = true;
                        return;
                    } else {
                        if (Helper.currentRow >= 5) {
                            Helper.isGameOver = true;
                            showMessage("Game Over");
                            return;
                        }
                        if (Helper.currentRow < 5) {
                            Helper.currentRow++;
                            Helper.currentTile = 0;
                        }
                    }
                }
            })
            .catch((err) => console.log(err));
    }
}

const handleClick = (letter) => {
    if (!Helper.isGameOver) {
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
    return (<div className="key-container">{keys.map(function(name, index){return (<button key={index} onClick={handleClick}>{name}</button>)})}</div>)}}

 export default Keyboard   