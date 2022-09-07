import React, { useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay, next, prev } from '../redux/player';
import '../components/PlayButton.scss';


export default function PlayButton(props) {
  const { playValues, timeValues } = props
  const { audioRef, clickPrev, clickPlayHandler, play, clickNext } = playValues
  const { calculateTime, currentTime, progressBar, handleChange, duration } = timeValues
  const dispatch = useDispatch();
  const mp3Url={1: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
                2: 'https://cdns-preview-e.dzcdn.net/stream/c-e4829488eb446f23487bbf60a6aa869d-3.mp3',
                3: 'https://cdns-preview-3.dzcdn.net/stream/c-381eb6e90e561759fea2b229e9b844eb-3.mp3'
}



  return <div className='play'>
    <audio ref={audioRef}></audio>
    <button 
      className="previous"
      onClick={clickPrev}>
      <i className="fa-solid fa-backward"></i>
    </button>
    <button 
      className="playButton" 
      onClick={ clickPlayHandler }>
      {!play && <i className="fa-solid fa-play"  ></i> }
      {play && <i className="fa-solid fa-stop" ></i> }
    </button>
    <button 
      className="next"
      onClick={clickNext}>
      <i className="fa-solid fa-forward"></i>
    </button>
    <div className='progressBar-layout'>
      <div>{calculateTime(currentTime)}</div>
      <input 
        type="range" 
        className="progressBar" 
        defaultValue='0' 
        ref = {progressBar}
        onChange={handleChange}>
      </input>
      <div>{(duration ? duration : "") && calculateTime(duration - currentTime)}</div>
    </div>
  </div>
}