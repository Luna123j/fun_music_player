import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay, next, prev } from '../redux/player';
import '../components/PlayButton.scss';


export default function PlayButton(props) {

  const { playValues, timeValues } = props
  const { audioRef, clickPrev, clickPlayHandler, play, clickNext } = playValues
  const { calculateTime, currentTime, progressBar, handleChange, duration } = timeValues
  // const dispatch = useDispatch();
  // const musicUrl = {}
  // if(currentSongContent.length>0){
  //   currentSongContent.map((song,index) => {
  //     return musicUrl[index+1]=song.mp3Url;
  //   })
  // }
//   const mp3Url={1: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
//                 2: 'https://cdns-preview-e.dzcdn.net/stream/c-e4829488eb446f23487bbf60a6aa869d-3.mp3',
//                 3: 'https://cdns-preview-3.dzcdn.net/stream/c-381eb6e90e561759fea2b229e9b844eb-3.mp3'
// }
  // const { play, list_id } = useSelector(state => state.player);
  // const { currentSongContent } = useSelector(state => state.currentSongData);
  // const dispatch = useDispatch();
  // const mp3Url = {}
  // if(currentSongContent.length>0){
  //   currentSongContent.map((song,index)=>{
  //     mp3Url[index+1]=song.mp3Url;
  //   })
  // }
  
  // const audioRef = useRef(new Audio(mp3Url[list_id]))
  // const progressBar = useRef()
  // const animationRef = useRef()
  // const [currentTime, setCurrentTime] = useState(0)
  // const [duration, setDuration] = useState(0)

  // useEffect(() => {
  //   audioRef.current.pause();
  //   audioRef.current = new Audio(mp3Url[list_id]);
  //   audioRef.current.play()
  //   // progressBar.current = audioRef.current.currentTime
  // }, [list_id]);

  // useEffect(() => {
  //   const seconds = Math.floor(audioRef.current.duration);
  //   setDuration(seconds);
  //   progressBar.current.max = seconds;
  // }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  // const calculateTime = (secs) => {
  //   const minutes = Math.floor(secs / 60);
  //   const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  //   const seconds = Math.floor(secs % 60);
  //   const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  //   return `${returnedMinutes}:${returnedSeconds}`;
  // }

  // const clickPlayHandler = () => {
  //   dispatch(onplay())
  //   if (!play) {
  //     audioRef.current.play()
  //     animationRef.current = requestAnimationFrame(whilePlaying)
  //   } else {
  //     audioRef.current.pause()
  //     animationRef.current = cancelAnimationFrame(animationRef.current)
  //   }
  // }

  // const whilePlaying = () => {
  //   progressBar.current.value = audioRef.current.currentTime;
  //   changePlayerCurrentTime();
  //   animationRef.current = requestAnimationFrame(whilePlaying);

  // }

  // const changePlayerCurrentTime = () => {
  //   progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
  //   setCurrentTime(progressBar.current.value);
  // }

  // const clickNext = () => {
  //   dispatch(next())
  // }

  // const clickPrev = () => {
  //   dispatch(prev())
  // }

  // const handleChange = (e) => {
  //   audioRef.current.currentTime = progressBar.current.value;
  //   changePlayerCurrentTime();

  // }

  return <div className='play'>
    <audio ref={audioRef}></audio>
    <button
      className="previous"
      onClick={clickPrev}>
      <i className="fa-solid fa-backward"></i>
    </button>
    <button
      className="playButton"
      onClick={clickPlayHandler}>
      {!play && <i className="fa-solid fa-play"  ></i>}
      {play && <i className="fa-solid fa-stop" ></i>}
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
        ref={progressBar}
        onChange={handleChange}>
      </input>
      <div>{(duration ? duration : "") && calculateTime(duration - currentTime)}</div>
    </div>
  </div>
}