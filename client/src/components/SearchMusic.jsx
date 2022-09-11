// this component is test data get from server, can be delete later
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../redux/musicData";
// import { musiclist } from "../redux/visualMode";
import { Link, useNavigate } from "react-router-dom";
import { updateScript } from "../redux/transcript";

export default function SearchMusic(props) {
  const { script } = useSelector((state) => state.transcript);
  const { index } = useSelector((state) => state.currentIndex);
  const { listen } = useSelector((state) => state.listen);
  // const { musicList } = useSelector((state) => state.getList);
  // console.log("PROPS IN SEARCHMUSIC",props)
  const { transcriptValues } = props
  const { setTranscriptData} = transcriptValues
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  // let searchedMusicResult = [];
  // let searchedMusicLyrics = {};
  // let searchedByLyrics = {};
  const [searchText, setSearchText] = useState("");
  const [click, setClickStatus] = useState(false);
  const [focus, setfocusStatus] = useState(false);

  // const [musicData, setMusicData] = useState([])
  //ask backend fetch api data depends on specific parameters, can be track's title or artist.
  // will depends on user search in the future

  const userInput = { title: searchText || script, artist: "" };

  const searchInput = React.useRef(null);

  if (document.activeElement === searchInput.current) {
    // do something
  }
  const navigate = useNavigate();

  const resetState = () => {
    console.log("RESETSTATE RAN!!!!!!!!!");

    setSearchText("");
    console.log("this is search text", searchText);
    console.log("this is script", script);
    dispatch({ type: "transcript/updateScript", payload: undefined });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    // dispatch({ type: "transcript/updateScript", payload: undefined });
setTranscriptData('')
    setClickStatus(true);
    if (userInput.title) {
      axios
      .post("/music", userInput)
      .then((res) => {
        dispatch({ type: "musicData/getList", payload: [...res.data.data] });
        setClickStatus(false);
        navigate("/search");
        document.getElementById("search").value = "";
        })
        .then(() => {
          resetState();
        });
    }

    // script = undefined
  };

  // useEffect(() => {
  // }, [click])

  return (
    <div>
      <form className="d-flex" role="search" action="" onSubmit={searchHandler}>
        <input
          id="search"
          type="search"
          className="form-control me-2"
          aria-label="Search"
          onFocus={() => {
            setfocusStatus(true);
          }}
          onBlur={() => {
            setfocusStatus(false);
          }}
          value={focus ? searchText : script}
          // onChange={(event) => script === undefined ? setSearchText(event.target.value) : dispatch({ type: "transcript/updateScript", payload: event.target.value })}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
