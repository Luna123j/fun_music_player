import React, { useState , useRef} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { selectedSong } from "../redux/visualMode";
import { useNavigate } from "react-router-dom";
import { next, playSelect, resetList_id } from "../redux/player"; 
import { useEffect } from "react";

const MusicList = () => {
  const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState({});
  const { musicList } = useSelector(state => state.musicData);
  const {list_id} = useSelector(state => state.player)
  const navigate = useNavigate();
 
  console.log("former", list_id)
  
  function songHandler(currentSong) {
    console.log("currentSong", currentSong)
    // const prevCurrentSong = currentSong
    // const messageinfo = { title: currentSong.title, artist: currentSong.artist.name }
    // dispatch(resetList_id())
    setCurrentSong(currentSong)
  }

  useEffect(()=> {
    if (currentSong.title) {
      axios.post("/music/lyrics", {title: currentSong.title, artist: currentSong.artist.name})
      .then(
        (res) => {
          const songDetails = {
            id: currentSong.id,
            title: currentSong.title,
            artist: currentSong.artist.name,
            image: currentSong.album.cover_small,
            mp3Url: currentSong.preview,
            lyrics: res.data.lyrics
          }
          dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails })
          dispatch(playSelect());
          navigate("/")
        })
    }}, [currentSong])

    // useEffect(() => {
    //   audioRef.current.pause();
    //   audioRef.current = new Audio(mp3Url[list_id]);
    //   console.log("list id app.js",list_id)
    //   if (isReady.current) {
    //     audioRef.current.play()
    //   } else {
    //     isReady.current = true;
    //   }
    //   // progressBar.current = audioRef.current.currentTime
    // }, [list_id]);
  
    
  return (
    <div>
      {musicList.slice(0, 5).map((item) => {
        return (
          <div key={item.id} onClick={() => songHandler(item)}  >
            <p>
              <img src={item.album.cover_small} alt={item.album.title} />
                title:{item.title}
                artist:{item.artist.name}
            </p>
          </div>

        );
      })}
    </div>
  )
}

export default MusicList