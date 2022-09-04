import React, { useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay, next, prev } from '../redux/player';
import '../components/PlayButton.scss';

export default function PlayButton() {
  const { play, list_id } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const mp3Url={1: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
                2: 'https://cdns-preview-e.dzcdn.net/stream/c-e4829488eb446f23487bbf60a6aa869d-3.mp3',
                3: 'https://cdns-preview-3.dzcdn.net/stream/c-381eb6e90e561759fea2b229e9b844eb-3.mp3'
}


const audioRef= useRef(new Audio(mp3Url[list_id]))


useEffect(()=> {
  audioRef.current.pause();
  audioRef.current = new Audio(mp3Url[list_id]);
  audioRef.current.play()
},[list_id]);

const clickPlayHandler = () => {
  dispatch(onplay())
  if (!play){
      audioRef.current.play()  
    } else {
      audioRef.current.pause()
    }
  }

  const clickNext = () => {
    dispatch(next())
  }

  const clickPrev =() => {
    dispatch(prev())
  }

 
  return <div className='play'>
    <audio ></audio>
    <button 
    className="previous"
    onClick={clickPrev}>
    <i className="fa-solid fa-backward"></i>
    </button>
    <button className="playButton" onClick={ clickPlayHandler }>
    {!play && <i className="fa-solid fa-play"  ></i> }
    {play && <i className="fa-solid fa-stop" ></i> }
    </button>
    <button 
    className="next"
    onClick={clickNext}>
    <i className="fa-solid fa-forward"></i>
    </button>
  </div>
}
