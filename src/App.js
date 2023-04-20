import './App.css';
import Title from './components/Title'
import GuessRows from './components/GuessRows'
import Keyboard from './components/Keyboard'

function App() {
  return (<>
    <div className="App">
      <div className="game-container">
          <Title/>
          <GuessRows/>
          <Keyboard/>
          </div>
    </div>
    </>
    
  );
}

export default App;
