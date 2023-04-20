import { Component } from 'react';
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