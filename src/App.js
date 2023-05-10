import React, { useState, useEffect } from 'react';
import Title from './components/Title';
const Game = () => {
  const [wordle, setWordle] = useState('');
  const [guessRows, setGuessRows] = useState(Array(6).fill(Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');
 
  let guess =''
  let setGuess =''
  let row = []
  const keys = [    'Q',    'W',    'E',    'R',    'T',    'Y',    'U',    'I',    'O',    'P',    'A',    'S',    'D',    'F',    'G',    'H',    'J',    'K',    'L',    'ENTER',    'Z',    'X',    'C',    'V',    'B',    'N',    'M',    '«',  ];

  useEffect(() => {
    const fetchWordle = async () => {
      try {
        const response = await fetch('http://localhost:8000/word');
        const json = await response.json();
        setWordle(json.toUpperCase());
      } catch (err) {
        console.log(err);
      }
    };
    fetchWordle();
  }, []);

  const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
      const updatedGuessRows = [...guessRows];
      updatedGuessRows[currentRow][currentTile] = letter;
      setGuessRows(updatedGuessRows);
      setCurrentTile(currentTile + 1);
    }
  };

  const deleteLetter = () => {
    if (currentTile > 0) {
      const updatedGuessRows = [...guessRows];
      updatedGuessRows[currentRow][currentTile - 1] = '';
      setGuessRows(updatedGuessRows);
      setCurrentTile(currentTile - 1);
    }
  };

  const handleFlip = () => {
    const newGuess = [...guess];
    let checkWordle = wordle;

    newGuess.forEach((_, index) => {
      if (guess[index].letter === wordle[index]) {
        newGuess[index] = { letter: guess[index].letter, color: 'green-overlay' };
        checkWordle = checkWordle.replace(GuessRow[index].letter, '');
      }
    });

    newGuess.forEach((_, index) => {
      if (checkWordle.includes(guess[index].letter)) {
        newGuess[index] = { letter: guess[index].letter, color: 'yellow-overlay' };
        checkWordle = checkWordle.replace(guess[index].letter, '');
      }
    });

    setGuess(newGuess);

    newGuess.forEach((guess, index) => {
      setTimeout(() => {
        const tile = document.querySelector(`#guessRow-${row}-${index}`);
        tile.classList.add('flip');
        tile.classList.add(guess.color);
        addColorToKey(guess.letter, guess.color);
      }, 500 * index);
    });
  };

  const checkRow = async () => {
    const guess = guessRows[currentRow].join('');
    if (currentTile > 4) {
      try {
        const response = await fetch(`http://localhost:8000/check/?word=${guess}`);
        const json = await response.json();
        if (json === 'Entry word not found') {
          showMessage('word not in list');
        } else {
          handleFlip();
          if (wordle === guess) {
            showMessage('Magnificent!');
            setIsGameOver(true);
          } else {
            if (currentRow >= 5) {
              setIsGameOver(true);
              showMessage('Game Over');
            } else {
              setCurrentRow(currentRow + 1);
              setCurrentTile(0);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = (letter) => {
    if (!isGameOver) {
      if (letter === '«') {
        deleteLetter();
      } else if (letter === 'ENTER') {
        checkRow();
      } else {
        addLetter(letter);
      }
    }
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(''), 2000);
  };

  const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
  };
  
  const GuessRow = ({ row, wordle, addColorToKey }) => {
    const [guess, setGuess] = useState(Array(row.length).fill({ letter: '', color: 'grey-overlay' }));
  
    return (
      <div className="App">
      <div className="game-container">
        <Title/>
      <div className="guess-row">
        {guess.map((tile, index) => (
          <tile key={index} letter={tile.letter} color={tile.color} id={`guessRow-${row}-${index}`} />
        ))}
        </div>
        <div className="key-container">{keys.map(function(name, index){return (<button key={index} onClick={handleClick}>{name}</button>)})}</div>)}
      </div>
      
      </div>
    );
  }};
  
  export default Game;
  
