import { Component } from 'react';
import Keyboard from './Keyboard';
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
       return (<div className="tile-container">{guessRows.map(function(name, index){return (<div className="tile"data={Keyboard.name} key={index}>{name}</div>)})}</div>)}}
   
    export default GuessRows  
 

    
