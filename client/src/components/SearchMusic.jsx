// this component is test data get from server, can be delete later
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../redux/musicData";
import { musiclist } from "../redux/visualMode";
import { Link, useNavigate } from "react-router-dom";

export default function SearchMusic(props) {
  const { script } = useSelector((state) => state.transcript);
  const { index } = useSelector((state) => state.currentIndex);
  const { listen } = useSelector ((state) => state.listen)
  const { transcriptValues, searchHandler } = props
  // const { transcript, setTranscript} = transcriptValues
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // let searchedMusicResult = [];
  // let searchedMusicLyrics = {};
  // let searchedByLyrics = {};
  const [searchText, setSearchText] = useState("");
  // const [musicData, setMusicData] = useState([])
  //ask backend fetch api data depends on specific parameters, can be track's title or artist.
  // will depends on user search in the future

  // const userInput = { title: script, artist: "" };
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

  // const voiceSearchHandler = () => {
   


  //     // e.preventDefault();
  //     console.log("COMES UP?????")
  //     // dispatch(musiclist());
  //     axios.post("/music", userInput)
  //       .then(
  //         (res) => {
  //           dispatch({ type: "musicData/getList", payload: [...res.data.data] });
  //           navigate("/search")
  //         }
  //         )
  //         .catch(err => {console.log(err)})
  //       };
    

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   console.log("COMES UP?????");
  //   // dispatch(musiclist());
  //   axios
  //     .post("/music", userInput)
  //     .then((res) => {
  //       dispatch({ type: "musicData/getList", payload: [...res.data.data] });
  //       navigate("/search");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
      
  //   };
  //     useEffect(() => {
  //   if (index === 10) {
  //     voiceSearchHandler()
  //   }
  // }, [index]);

  return (
    <div>
      <form className="d-flex" role="search" action="" onSubmit={searchHandler}>
        <textarea
          id="search"
          type="search"
          className="form-control me-2"
          aria-label="Search"
          // value={script}
          // onChange={(event) =>
          //   dispatch({
          //     type: "transcript/updateScript",
          //     payload: event.target.value,
          //   })
          // }
          value={script === undefined ? searchText : script}
          onChange={script === undefined ? (event) => setSearchText(event.target.value) : (event) => dispatch({type: "transcript/updateScript", payload: event.target.value})}
        />
        <button className="btn btn-outline-success" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
