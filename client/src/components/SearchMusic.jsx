// this component is test data get from server, can be delete later
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../redux/musicData';

export default function SearchMusic() {
  const dispatch = useDispatch();
  // let searchedMusicResult = [];
  // let searchedMusicLyrics = {};
  // let searchedByLyrics = {};
  const [searchText, setSearchText] = useState("");
  // const [musicData, setMusicData] = useState([])
  //ask backend fetch api data depends on specific parameters, can be track's title or artist.
  // will depends on user search in the future
  const userInput = { title: searchText, artist: "" };
  // const lyricWantToSearch = { text: "every night in my dream" };
  // console.log(userInput)

  // get lyrics for a song

  // //search by lyrics
  // useEffect(() => {
  //   axios.post("/searchByLyrics", lyricWantToSearch)
  //     .then(
  //       (res) => {
  //         console.log(res.data)
  //         searchedByLyrics = res.data;
  //       }
  //     )
  // }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    
    axios.post("/music", userInput)
    .then(
      (res) => {
        dispatch({type:"musicData/getList",payload:[...res.data.data]});
      }
      )
    };

  return (
    <div >
      <form class="d-flex" role="search" action="" onSubmit={searchHandler}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          class="form-control me-2"
          aria-label="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button class="btn btn-outline-success" type='submit'>SEARCH</button>
      </form>
    </div>
  )
}
