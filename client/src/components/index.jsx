import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import { login, signup, musiclist,selectedSong } from "../redux/visualMode"
import Signup from './Signup';
import MusicList from './MusicList';
import Lyrics from './Lyrics';

const index = () => {

  

  return (

      <div>
        <h1>Home Page</h1>
      </div>
  )
}

export default index;