import './App.css';
import ConnectPlayButton from './components/SearchMusic';
import './components/PlayButton';
import PlayButton from './components/PlayButton';

import Speechinput from './components/Speechinput'



function App() {

  return (
    <div className="App">

    <ConnectPlayButton />

    <Speechinput />
    <PlayButton />

    </div>
  );
}

export default App;