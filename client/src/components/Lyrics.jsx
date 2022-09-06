import React from "react";
import { useSelector} from 'react-redux';



const Lyrics = () => {
  const { currentSongContent } = useSelector(state => state.currentSongData);
  console.log(currentSongContent);
  return (
    <div>
      <article>
        <p><img src={currentSongContent.image} alt={currentSongContent.title}/>{currentSongContent.title}</p>
        <p>artist: {currentSongContent.artist}</p>
        <p>{currentSongContent.lyrics}</p>
      </article>
    </div>
  )
}

export default Lyrics