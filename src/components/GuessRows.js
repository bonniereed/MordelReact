import { Component } from 'react';
import Keyboard from './Keyboard';
const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");

let wordle;
let currentRow = 0;
const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]
class GuessRows extends Component {
    render(){
       return (<div class="tile-container">{guessRows.map(function(name, index){return (<div class="tile" key={index}>{name}</div>)})}</div>)}}
   
    export default GuessRows  


    // guessRows.forEach((guessRow, guessRowIndex) => {
    //     const rowElement = document.createElement("div");
    //     rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
    //     guessRow.forEach((_guess, guessIndex) => {
    //         const tileElement = document.createElement("div");
    //         tileElement.setAttribute(
    //             "id",
    //             "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    //         );
    //         tileElement.classList.add("tile");
    //         rowElement.append(tileElement);
    //     });
    //     tileDisplay.append(rowElement);
    // });
    
 


    const addColorToKey = (keyLetter, color) => {
        const key = document.getElementById(keyLetter);
        key.classList.add(color);
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
    
        guess.forEach((guess, index) => {
            if (guess.letter === wordle[index]) {
                guess.color = "green-overlay";
                checkWordle = checkWordle.replace(guess.letter, "");
            }
        });
    
        guess.forEach((guess) => {
            if (checkWordle.includes(guess.letter)) {
                guess.color = "yellow-overlay";
                checkWordle = checkWordle.replace(guess.letter, "");
            }
        });
    
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add("flip");
                tile.classList.add(guess[index].color);
                addColorToKey(guess[index].letter, guess[index].color);
            }, 500 * index);
        });
    };
    
