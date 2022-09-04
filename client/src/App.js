import './App.css';
import ConnectPlayButton from './components/ConnetPlayButton';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import Speechinput from './components/Speechinput'


function App() {

  return (
    <div className="App">
   
    <PlayButton />

    <Speechinput/>

    <ConnectPlayButton />
    </div>
  );
}

export default App;