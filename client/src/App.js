import './App.css';
import './components/PlayButton';
import PlayButton from './components/PlayButton';
import io from 'socket.io-client';

const socket = io();
function App() {

  return (
    <div className="App">
   
    <PlayButton />
    </div>
  );
}

export default App;