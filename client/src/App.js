import './App.css';
import ConnectPlayButton from './components/SearchMusic';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import io from 'socket.io-client';
import Speechinput from './components/Speechinput'


const socket = io();





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