import './App.css';
import Title from './components/Title'
import GuessRows from './components/GuessRows'
import Keyboard from './components/Keyboard'

function App() {
  return (<>
    <div className="App">
      <div className="game-container">
        <div class="message-container"></div>
          <Title/>
          <div class="tile-display"><GuessRows/></div>
          <div class="key-container"><Keyboard/></div>
          </div>
    </div>
    </>
    
  );
}

export default App;
