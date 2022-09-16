import React, { useState , useRef} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { selectedSong } from "../redux/visualMode";
import { useNavigate } from "react-router-dom";
import { next, playSelect, resetList_id } from "../redux/player"; 
import { useEffect } from "react";
import '../components/MusicList.scss';
import { useCookies } from "react-cookie";

const MusicList = () => {
  const dispatch = useDispatch();
  const {currentSongContent} = useSelector(state=> state.currentSongData)
  const [currentSong, setCurrentSong] = useState({});
  const { musicList } = useSelector(state => state.musicData);
  const {list_id} = useSelector(state => state.player)
  const navigate = useNavigate();
  const [cookie] = useCookies();

 
  console.log("former", list_id)
  
  function songHandler(currentSong) {
    console.log("currentSong", currentSong)
    
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
          axios
          .post("/history", {
            currentSong: songDetails,
            username: cookie.username,
          })
          dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails })
          if (list_id === currentSongContent.length - 1) {
            dispatch(playSelect());
          } else {
            const newId = currentSongContent.length
            dispatch({type: "player/setListID", payload: newId})
          } 
        })
    }}, [currentSong])
  
  
    
  return (
    <div className="list-container">
      <h1>Search List</h1>
      {musicList.slice(0, 5).map((item) => {
        return (
          <div className="eachItem" key={item.id} onClick={() => songHandler(item)}  >
            <div id="songList">
              <img id="listPic"src={item.album.cover} alt={item.album.title} />
                - {item.artist.name}: {item.title} 
            </div>
          </div>

        );
      })}
    </div>
  )
}

export default MusicList