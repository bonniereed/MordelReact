import GuessRows from "../components/GuessRows";
import Keyboard from "../components/Keyboard";
const messageDisplay = document.querySelector(".message-container");
let wordle;
let checkWordle = wordle;
let guess = []
let currentTile=0
let currentRow=0
let isGameOver = false



const Helper =() => {


const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
};
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


const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = "";
        Helper.guessRows[currentRow][currentTile] = "";
        tile.setAttribute("data", "");
    }
};
const checkRow = () => {
    const guess = GuessRows.guessRows[currentRow].join("");
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
}


    GuessRows.guess.forEach((guess, index) => {
        if (GuessRows.guess.letter === wordle[index]) {
            GuessRows.guess.color = "green-overlay";
            checkWordle = checkWordle.replace(guess.letter, "");
        }
    });

    guess.forEach((guess) => {
        if (checkWordle.includes(guess.letter)) {
            GuessRows.guess.color = "yellow-overlay";
            checkWordle = checkWordle.replace(GuessRows.guess.letter, "");
        }
    });

    Keyboard.rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(GuessRows.guess[index].color);
            addColorToKey(GuessRows.guess[index].letter, GuessRows.guess[index].color);
        }, 500 * index);
    });

  };
export default Helper 