import './App.css';
import Title from './components/Title'
import GuessRows from './components/GuessRows'
import Keyboard from './components/Keyboard'

function App() {
  return (<>
    <div className="App">
    <div className="game-container">
          <Title className="message-container"/>
          <GuessRows className="tile-display"/>
          <Keyboard className="key-container"/>
          </div>
    </div>
    </div>
    </>
    
  );
}

export default App;
