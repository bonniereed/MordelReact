import { Component } from 'react';
import Helper from '../utils/Helper';


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

let isGameOver = false;

const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === "«") {
  
            return;
        }
        if (letter === "ENTER") {

            return;
        }
    }
};

class Keyboard extends Component {
 render(){
    return (<div className="key-container">{keys.map(function(name, index){return (<button key={index} onClick={handleClick}>{name}</button>)})}</div>)}}

 export default Keyboard   