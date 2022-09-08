import React from "react";
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../components/Lyrics.scss';



const Lyrics = () => {
  const { currentSongContent } = useSelector(state => state.currentSongData);
  const l = currentSongContent.length-1
  const navigate = useNavigate();

  return (
    <div className="Lyrics">
      <h1>Song Details</h1>
      <article>
        <p><img src={currentSongContent[l].image} alt={currentSongContent[l].title}/>{currentSongContent[l].title}</p>
        <p>artist: {currentSongContent[l].artist}</p>
        <button><i class="fa-regular fa-heart"></i></button>
        <div  className="format-lyrics" >{currentSongContent[l].lyrics}</div>
      </article>
    </div>
  )
}

export default Lyrics