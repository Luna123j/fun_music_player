import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { playSelect } from "../redux/player";

const Favourite = () => {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState([])
  const { currentSongContent } = useSelector(state => state.currentSongData)
  const [cookie] = useCookies()
  console.log(currentSongContent)
  useEffect(() => {
    // console.log(currentSongContent[currentSongContent.length-1]);

    const senddata = setTimeout(() => {
      axios.post('/users/favourite', { username: cookie.username })
        .then(res => {
          console.log(res)
          if (res.data.error !== "No favourite record") {
            setFavourite(res.data)
          }

        })
    }, 1000)
    return () => {
      clearTimeout(senddata);
    }

  }, [currentSongContent])

  const favorPlayHandler = (item) => {

    const songDetails = {
      id: item.id,
      title: item.title,
      artist: item.artist,
      image: item.cover,
      mp3Url: item.url,
      lyrics: item.lyric
    }
    dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails })
    dispatch(playSelect());

  }

  return (
    <div>
      <h1>Favourite list</h1>
      { favourite.length === 0 && <div>There is no favourite record</div>}
      {(favourite.length !== 0) &&
        favourite.map((item, index) => {
          return (<div key={index}><button onClick={()=>favorPlayHandler(item)}> <i key={item.id} className="fa-solid fa-play"></i></button><img src={item.cover} alt={item.title} />{item.title}{item.artist}</div>)
        })
      }
    </div>

  )

}

export default Favourite;