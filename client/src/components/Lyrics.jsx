import axios from "axios";
import React from "react";
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../components/Lyrics.scss';
import { useCookies } from "react-cookie";
import { useEffect } from "react";


const Lyrics = () => {
  const { currentSongContent } = useSelector(state => state.currentSongData);
  const [cookie] = useCookies()
  const l = currentSongContent.length-1
  const navigate = useNavigate();
  const clickFavouriteHandler =()=> {
    axios.post('/favourite', {
      currentSong: currentSongContent[currentSongContent.length-1],
      username: cookie.username
    }).then(res => {
      console.log(res.data)
    })
  }

  useEffect(()=> {
    axios.post('/favourite', {username: cookie.username}).then(res => {
      console.log(res)
    })
  })

  return (
    <div className="Lyrics">
      <h1>Song Details</h1>
      {currentSongContent.length !== 0 &&
          <article>
        <p><img src={currentSongContent[l].image} alt={currentSongContent[l].title}/>{currentSongContent[l].title}</p>
        <p>artist: {currentSongContent[l].artist}</p>
        <button onClick={clickFavouriteHandler} ><i class="fa-regular fa-heart"></i></button>
        <div  className="format-lyrics" >{currentSongContent[l].lyrics}</div>
      </article>
      }
    
    </div>
  )
}

export default Lyrics