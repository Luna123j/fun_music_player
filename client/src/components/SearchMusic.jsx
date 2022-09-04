// this component is test data get from server, can be delete later
import React, { useEffect } from 'react';
import '../components/PlayButton.scss';
import axios from 'axios';

export default function ConnectPlayButton() {
  let searchedMusicResult = [];

  //ask backend fetch api data depends on specific parameters, can be track's title or artist.
  // will depends on user search in the future
  const userInput = { title: "My heart will go on", artist: "" }
  useEffect(() => {
    axios.post("/music", userInput)
      .then(
        (res) => {
          searchedMusicResult = res.data;
          console.log(searchedMusicResult);
        }
      )
  }, []);

  return <div >
    <input
      name="search"
      type="text"
      placeholder="Enter a track title" />
  </div>
}
