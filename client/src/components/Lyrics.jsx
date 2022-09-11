import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../components/Lyrics.scss';
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import { favor, unfavor } from "../redux/favouriteSong";

const Lyrics = () => {
  const { currentSongContent } = useSelector(state => state.currentSongData);
  const [cookie] = useCookies()
  const navigate = useNavigate();
  const { isFavourite } = useSelector(state => state.favouriteSong)
  const dispatch = useDispatch()
  const {list_id} = useSelector(state => state.player)
  const l = list_id;
  // console.log("this is list_id ahhhhh", l)
  const clickFavouriteHandler = () => {
    if (currentSongContent.length !== 0) {
      axios.post('/favourite', {
        currentSong: currentSongContent[currentSongContent.length - 1],
        favorStatus: isFavourite,
        username: cookie.username,
        message: "clickevent"
      }).then(res => {
        console.log("from click", res.data);

        if (res.data.favored) {
          dispatch(favor())
        } else {
          dispatch(unfavor())
        }
      })

    }
  }

  // console.log("check", currentSongContent)
  useEffect(() => {
    if (currentSongContent.length !== 0) {
      axios.post('/favourite',
        {
          currentSong: currentSongContent[currentSongContent.length - 1],
          username: cookie.username,
          favorStatus: isFavourite,
          message: "get initial status"
        })
        .then(res => {
          console.log("from effect", res.data);
          if (res.data.favored) {
            dispatch(favor())
          } else {
            dispatch(unfavor())
          }
        })
    }
  }, [currentSongContent])

 

  return (
    <div className="Lyrics">
      <h1>Song Details</h1>
      {currentSongContent.length !== 0 &&
        <article>
          <p><img src={currentSongContent[l].image} alt={currentSongContent[l].title} />{currentSongContent[l].title}</p>
          <p>artist: {currentSongContent[l].artist}</p>
          <button className={isFavourite ? "favor-button" : "unfavor-button"} onClick={clickFavouriteHandler} ><i className="fa-regular fa-heart"></i></button>
          <div className="format-lyrics" >{currentSongContent[l].lyrics}</div>
        </article>
      }
      {currentSongContent.length === 0 &&
        <div>Welcome to Fun music player</div>
      }

    </div>
  )
}

export default Lyrics