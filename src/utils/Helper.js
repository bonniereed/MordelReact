import GuessRows from "../components/GuessRows";
import Keyboard from "../components/Keyboard";
let wordle;
let checkWordle = wordle;
let guess = []

const Helper =() => {


const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
};


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