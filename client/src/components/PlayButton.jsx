import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay, next, prev } from '../redux/player';
import '../components/PlayButton.scss';
import classNames from "classnames";
import playIcon from '../doc/music-player.png';
import stopIcon from '../doc/stop-sign.png'
import nextIcon from '../doc/skip.png'
import prevIcon from '../doc/previous.png'
import volIcon from '../doc/high-volume.png'
import muteIcon from '../doc/no-sound.png'


export default function PlayButton(props) {
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const { playValues, timeValues } = props
  const { audioRef, clickPrev, clickPlayHandler, play, clickNext, volumeBar } = playValues
  const { calculateTime, currentTime, progressBar, handleChange, duration } = timeValues
  const playButtonClass= play ? "playButton-play Img " : "playButton Img";
  const [volume, setVolume] = useState(0.2)
  const muteRef = useRef()
  


  const volumeHandler = (e) => {
    setVolume((e.target.value)/100 )
  }

  const muteHandle = () => {
    if (volume > 0) {
      muteRef.current = volume
      setVolume(0)
    }
    if (volume === 0) {
      
      setVolume(muteRef.current)
    }
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
      <img src = {prevIcon} alt='prev'/>
      {/* <i className="fa-solid fa-backward"></i> */}
    </button>
    <button
      className={playButtonClass}
      onClick={clickPlayHandler}>
      
      {!play && 
      <img src = {playIcon} alt='play'/>
     
      // <i className="fa-solid fa-play"  ></i>
      }
      {play && 
      <img src = {stopIcon} alt='stop'/>

      // <i className="fa-solid fa-stop" ></i>
      }
    </button>
    <button
      className="next"
      onClick={clickNext}>
      <img src = {nextIcon} alt='next'/>

      {/* <i className="fa-solid fa-forward"></i> */}
    </button>
    <button className="volume" onClick={ muteHandle }>
      {volume === 0 && 
      <img src = {muteIcon} alt='mute'/>

      // <i className="fa-solid fa-volume-xmark"></i>
      }
      {volume > 0 && 
      <img src = {volIcon} alt='vol'/>

      // <i className="fa-solid fa-volume-high " ></i>
      }
    </button>
    <input type="range" className='volumeBar' min="0" max="100" onChange={volumeHandler}></input>
    </div>
    
      
  
    
    {/* <div className='playList' onClick={() => setIsOpen(true)}><button><i class="fa-solid fa-list-ul"></i></button></div> */}
    
  </div>
}