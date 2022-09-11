import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { playSelect } from "../redux/player";
import "./History.scss";
import { useNavigate } from "react-router-dom";

const History = () => {
  const dispatch = useDispatch();
  const [historyList, setHistoryList] = useState([]);
  const { currentSongContent } = useSelector((state) => state.currentSongData);
  const [cookie] = useCookies();
  const navigate = useNavigate()
  // const clickHandler=()=>{
  //   dispatch()
  // }
  console.log(historyList);
  useEffect(() => {
    // console.log(currentSongContent[currentSongContent.length-1]);
    if (currentSongContent.length === 0) {
      const senddata = setTimeout(() => {
        axios.post("/history", { username: cookie.username }).then((res) => {
          setHistoryList(res.data.reverse());
        });
      }, 2000);
      return () => {
        clearTimeout(senddata);
      };
    } else if (currentSongContent.length !== 0) {
      const senddata = setTimeout(() => {
        axios
          .post("/history", {
            currentSong: currentSongContent[currentSongContent.length - 1],
            username: cookie.username,
          })
          .then((res) => {
            console.info("from backend", res);
            setHistoryList(res.data.reverse());
          });
      }, 2000);
      return () => {
        clearTimeout(senddata);
      };
    }
  }, [currentSongContent]);

  const historyPlayHandler = (item) => {
    const songDetails = {
      id: item.id,
      title: item.title,
      artist: item.artist,
      image: item.cover,
      mp3Url: item.url,
      lyrics: item.lyric,
    };
    dispatch({ type: "currentSongData/getCurrentSong", payload: songDetails });
    dispatch(playSelect());
    // navigate('/')
  };

  return (
    <div>
      <h1>History</h1>
      {historyList.length === 0 && <div>There is no history record</div>}
      {historyList.length !== 0 &&
        historyList.map((item, index) => {
          return (
            <div className="item" key={index} onClick={() => historyPlayHandler(item)}>
              {/* <button onClick={() => historyPlayHandler(item)}>
                {" "}
                <i className="fa-solid fa-play"></i>
              </button> */}
              <div><img src={item.cover} alt={item.title} /></div>
              <div>

              <div>{item.title}</div>
              <div>{item.artist}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default History;
