import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay, next, prev } from '../redux/player';
import '../components/PlayButton.scss';
import classNames from "classnames";


export default function PlayButton(props) {
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const { playValues, timeValues } = props
  const { audioRef, clickPrev, clickPlayHandler, play, clickNext, volumeBar } = playValues
  const { calculateTime, currentTime, progressBar, handleChange, duration } = timeValues
  const playButtonClass= play ? "playButton-play" : "playButton";
  const [volume, setVolume] = useState(false)
  
  const volumeHandler = (e) => {
    setVolume((e.target.value)/100 )
  }

  useEffect(()=> {
    audioRef.current.volume = volume
  }, [volume])
  
  return <div className='play'>
    <div className='progressBar-layout'>
      <div>{calculateTime(currentTime)}</div>
      <input
        type="range"
        className="progressBar"
        defaultValue='0'
        ref={progressBar}
        onChange={handleChange}>
      </input>
      <div>{(duration ? duration : "") && calculateTime(duration - currentTime)}</div>
    </div>

    <div className='PlayerButton'>
    <button
      className="previous"
      onClick={clickPrev}>
      <i className="fa-solid fa-backward"></i>
    </button>
    <button
      className={playButtonClass}
      onClick={clickPlayHandler}>
      {!play && <i className="fa-solid fa-play"  ></i>}
      {play && <i className="fa-solid fa-stop" ></i>}
    </button>
    <button
      className="next"
      onClick={clickNext}>
      <i className="fa-solid fa-forward"></i>
    </button>
    <button className="volume"><i className="fa-solid fa-volume-high " ></i></button>
    <input type="range" className='volumeBar' min="0" max="100" onChange={volumeHandler}></input>
    </div>
    
      
  
    
    {/* <div className='playList' onClick={() => setIsOpen(true)}><button><i class="fa-solid fa-list-ul"></i></button></div> */}
    
  </div>
}