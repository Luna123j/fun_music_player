import React from "react";
import { useSelector} from 'react-redux';



const Lyrics = () => {
  const { currentSongContent } = useSelector(state => state.currentSongData);
  const l = currentSongContent.length-1
  console.log(currentSongContent);
  return (
    <div>
      <article>
        <p><img src={currentSongContent[l].image} alt={currentSongContent[l].title}/>{currentSongContent[l].title}</p>
        <p>artist: {currentSongContent[l].artist}</p>
        <p>{currentSongContent[l].lyrics}</p>
      </article>
    </div>
  )
}

export default Lyrics