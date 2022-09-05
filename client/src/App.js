import './App.css';
import ConnectPlayButton from './components/SearchMusic';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import Speechinput from './components/Speechinput';
import Speechlistener from './components/Speechlistener';
import * as speechCommands from '@tensorflow-models/speech-commands';

function App() {

  return (
    <div className="App">
    <Speechlistener />
    <ConnectPlayButton />
    <Speechinput />
    <PlayButton />

    </div>
  );
}

export default App;