import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { playSelect } from "../redux/player";
import "./Favourite.scss";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState([]);
  const { currentSongContent } = useSelector((state) => state.currentSongData);
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const {list_id} = useSelector(state=> state.player)
  
  console.log(favourite);
  useEffect(() => {
    // console.log(currentSongContent[currentSongContent.length-1]);
      axios
        .post("/users/favourite", { username: cookie.username })
        .then((res) => {
          console.log(res);
          if (res.data.error !== "No favourite record") {
            setFavourite(res.data);
          }
        });
  
  }, [currentSongContent]);

  const favorPlayHandler = (item) => {
    const songDetails = {
      id: item.id,
      title: item.title,
      artist: item.artist,
      image: item.cover,
      mp3Url: item.url,
      lyrics: item.lyric,
    };
    dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails });
    if (list_id === currentSongContent.length - 1) {
      dispatch(playSelect());
    } else {
      const newId = currentSongContent.length
      dispatch({type: "player/setListID", payload: newId})
    } 
  };

  return (
    <div id="favourite1">
      <h1 >Favourite list</h1>
      {favourite.length === 0 && <div>There is no favourite record</div>}
      {favourite.length !== 0 &&
        favourite.map((item, index) => {
          return (
            
              <div
                className="item"
                key={index}
                onClick={() => favorPlayHandler(item)}
              >
                <div>
                  <img src={item.cover} alt={item.title} />
                </div>
                <div className="songDetailLayout">
                  <div>{item.title}</div>
                  <div>{item.artist}</div>
                </div>
              </div>
          
          );
        })}
    </div>
  );
};

export default Favourite;
