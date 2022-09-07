import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { selectedSong } from "../redux/visualMode";
import { useNavigate } from "react-router-dom";


const MusicList = () => {
  const dispatch = useDispatch();
  const { musicList } = useSelector(state => state.musicData);


  const navigate = useNavigate();

  function songHandler(currentSong) {
    console.log(currentSong)
    const message = { title: currentSong.title, artist: "" }
    axios.post("/music/lyrics", message)
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
          dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails });
          // dispatch(selectedSong())
          navigate("/current")
        }
      )
  }

  return (
    <div>
      {musicList.slice(0, 5).map((item) => {
        return (
          <div key={item.id} onClick={() => songHandler(item)}  >
            {/* <Link to="/current"> */}
            <p>
              <img src={item.album.cover_small} alt={item.album.title} />
                title:{item.title}
                artist:{item.artist.name}
            </p>
            {/* </Link> */}
          </div>

        );
      })}
    </div>
  )
}

export default MusicList