import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay } from '../redux/player';
import '../components/PlayButton.scss';

export default function PlayButton() {
  const { play } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const mp3Url='https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3' 
  return <div className='play'>
    <audio src={mp3Url} controls></audio>
    <button 
    className="previous"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-backward"></i>
    </button>
    <button 
    className="playButton"
    onClick={()=> dispatch(onplay())}>
    {!play && <i className="fa-solid fa-play"></i>}
    {play && <i class="fa-solid fa-stop"></i>}
    </button>
    <button 
    className="next"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-forward"></i>
    </button>
  </div>
}
