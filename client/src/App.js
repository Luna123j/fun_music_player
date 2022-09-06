import './App.css';
import ConnectPlayButton from './components/SearchMusic';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import Speechinput from './components/Speechinput';
import Speechlistener from './components/Speechlistener';
import io from 'socket.io-client';
import Navbar from './components/Navbar';
import Userview from './components';

const socket = io();


function App() {

  return (
    <div className="App">
    <div><Navbar /></div> 
    <Userview /> 
    <Speechlistener />
    <ConnectPlayButton />
    <Speechinput />
    <PlayButton />

    </div>
  );
}

export default App;