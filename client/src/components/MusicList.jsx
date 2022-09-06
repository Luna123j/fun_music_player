import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';


const MusicList=()=>{
  const dispatch = useDispatch();
  const { musicList } = useSelector(state => state.musicData);
  const {currentSongContent} = useSelector(state=>state.currentSongData);


  function songHandler (currentSong){
    console.log(currentSong)
    dispatch({type:"currentSongData/getCurrentSong",payload:[currentSong]});
    const message = {title: currentSong.title, artist:""}
    axios.post("/music/lyrics", message)
      .then(
        (res) => {
          console.log(res.data)

        }
      )
  }


return(
  <div>
        {musicList.map((item) => {
          return (
            <div key={item.id} onClick={()=>songHandler(item)}  >
              <p>
                <img src={item.album.cover_small} alt={item.album.title} />
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
)
}

export default MusicList