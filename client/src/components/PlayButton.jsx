import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onplay } from '../redux/player';
import '../components/PlayButton.scss';

export default function PlayButton(props) {
  const { play } = useSelector(state => state.player);
  const dispatch = useDispatch();

  return <div className='play'>
    <button 
    className="previous"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-backward"></i>
    </button>
    <button 
    className="playButton"
    onClick={()=> dispatch(onplay())}>
    <i className="fa-solid fa-play"></i>
    </button>
    <button 
    className="next"
    onClick={()=> console.log("hello")}>
    <i className="fa-solid fa-forward"></i>
    </button>
  </div>
}
