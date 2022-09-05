// this component is test data get from server, can be delete later
import React, {useState, useEffect } from 'react';
import '../components/PlayButton.scss';
import axios from 'axios';

export default function ConnectPlayButton() {
  let searchedMusicResult = [];
  let searchedMusicLyrics = {};
  const [searchText, setSearchText] = useState("");
  //ask backend fetch api data depends on specific parameters, can be track's title or artist.
  // will depends on user search in the future
  const userInput = { title: "My heart will go on", artist: "" };
  useEffect(() => {
    axios.post("/music", userInput)
      .then(
        (res) => {
          console.log(res.data)
          searchedMusicResult = res.data;
        }
      )
  }, []);

  useEffect(() => {
    axios.post("/lyrics", userInput)
      .then(
        (res) => {
          console.log(res.data)
          searchedMusicLyrics = res.data;
        }
      )
  }, []);

  return <div >
    <input
      name="search"
      type="text"
      placeholder="Enter a track title" 
      onChange={(e) => setSearchText(e.target.value)}
      />
      <button class="searchButton" type="submit">Search</button>
  </div>
}
