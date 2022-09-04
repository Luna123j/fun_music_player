import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay } from '../redux/player';
import '../components/PlayButton.scss';

export default function ConnectPlayButton() {
  const { play } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const mp3Url='https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3' 
  
  const audioRef = useRef(new Audio(mp3Url))
  const clickPlayHandler = () => {
    dispatch(onplay())
    if (!play){
      audioRef.current.play()  
    }
    if (play) {
      audioRef.current.pause()
    }
  }

 
  return <div className='play'>
    <audio ></audio>
    <button 
    className="previous"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-backward"></i>
    </button>
    <button className="playButton" onClick={ clickPlayHandler }>
    {!play && <i className="fa-solid fa-play"  ></i> }
    {play && <i className="fa-solid fa-stop" ></i> }
    </button>
    <button 
    className="next"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-forward"></i>
    </button>
  </div>
}
