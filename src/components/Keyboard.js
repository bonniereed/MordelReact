import { Component } from 'react';


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
class Keyboard extends Component {
 render(){
    return (<div class="key-container">{keys.map(function(name, index){return (<button key={index}>{name}</button>)})}</div>)}}

 export default Keyboard   