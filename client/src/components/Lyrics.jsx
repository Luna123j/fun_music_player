import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../components/Lyrics.scss";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import { favor, unfavor } from "../redux/favouriteSong";
import currentIndex from "../redux/currentIndex";

const Lyrics = () => {
  const { currentSongContent } = useSelector((state) => state.currentSongData);
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const { isFavourite } = useSelector((state) => state.favouriteSong);
  const dispatch = useDispatch();
  const { list_id } = useSelector((state) => state.player);
  const l = list_id;
  // console.log("this is list_id ahhhhh", l)
  const clickFavouriteHandler = () => {
    if (currentSongContent.length !== 0) {
      axios
        .post("/favourite", {
          currentSong: currentSongContent[currentSongContent.length - 1],
          favorStatus: isFavourite,
          username: cookie.username,
          message: "clickevent",
        })
        .then((res) => {
          console.log("from click", res.data);

          if (res.data.favored) {
            dispatch(favor());
          } else {
            dispatch(unfavor());
          }
        });
    }
  };

  // console.log("check", currentSongContent)
  useEffect(() => {
    if (currentSongContent.length !== 0) {
      axios
        .post("/favourite", {
          currentSong: currentSongContent[currentSongContent.length - 1],
          username: cookie.username,
          favorStatus: isFavourite,
          message: "get initial status",
        })
        .then((res) => {
          console.log("from effect", res.data);
          if (res.data.favored) {
            dispatch(favor());
          } else {
            dispatch(unfavor());
          }
        });
    }
  }, [currentSongContent]);

  return (
    <div className="Lyrics">
      {currentSongContent.length !== 0 && (
        <article id="Lyrics1">
          <div className="song-title">
          <div id="stitle">Title: {currentSongContent[l].title}</div>
            <div id="sartist">Artist: {currentSongContent[l].artist}</div>
            <div id="circles">
              <button
                id="favbutt"
                className="favor-button"
                onClick={clickFavouriteHandler}
              >
                <i
                  id={isFavourite ? "favIcon" : "unfavIcon"}
                  className="fa-solid fa-heart"
                ></i>
              </button>
              <img
                id="songpic"
                src={currentSongContent[l].image}
                alt={currentSongContent[l].title}
              />
            </div>
          </div>
          <div id="lyricWords" className="format-lyrics">
            {currentSongContent[l].lyrics}
          </div>
        </article>
      )}
      {currentSongContent.length === 0 && (
        <div>
        <div id="WELCOME">✨🥳Welcome to Fun music player🥳✨</div>
        <div id="partyGif"><img src="https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif" alt="welcome" />
        <img src="https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif" alt="welcome" />
        <img src="https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif" alt="welcome" /></div>
        </div>
      )}
  
    </div>
  );
};

export default Lyrics;
