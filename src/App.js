import './App.css';
import Title from './components/Title'
import GuessRows from './components/GuessRows'
import Keyboard from './components/Keyboard'

function App() {
  return (<>
    <div className="App">
          <Title/>
          <GuessRows/>
          <Keyboard/>
    </div>
    </>
    
  );
}

export default App;
