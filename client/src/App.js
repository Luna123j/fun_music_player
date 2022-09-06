import './App.css';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import Speechinput from './components/Speechinput';
import Speechlistener from './components/Speechlistener';
import * as speechCommands from '@tensorflow-models/speech-commands';
import io from 'socket.io-client';
import SearchMusic from './components/SearchMusic';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

const socket = io();

function App() {
  const {musicList} = useSelector(state=>state.musicData);

  return (
    <div className="App">
      <Navbar />
      <Speechlistener />
      <Speechinput />
      <PlayButton />
      <div>
        {musicList.map((item) => {
          return (
            <div key={item.id}>
              <p><img src={item.album.cover} alt={item.album.title}/>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;