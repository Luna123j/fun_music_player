import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import { login, signup, musiclist,selectedSong } from "../redux/visualMode"
import Signup from './Signup';
import MusicList from './MusicList';
import Lyrics from './Lyrics';

const Userview = () => {

  const { mode } = useSelector(state => state.userMode);

  return (

      <div>
        {mode === 'musiclist' && <MusicList />}
        {mode === 'selectedSong' && <Lyrics />}
      </div>
  )
}

export default Userview;