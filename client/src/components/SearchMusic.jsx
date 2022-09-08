// this component is test data get from server, can be delete later
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../redux/musicData';
import { musiclist } from "../redux/visualMode";
import { Link , useNavigate} from "react-router-dom";



export default function SearchMusic(props) {
  const { transcriptValues, searchHandler } = props
  const { transcript, setTranscript} = transcriptValues
  const dispatch = useDispatch();
  // let searchedMusicResult = [];
  // let searchedMusicLyrics = {};
  // let searchedByLyrics = {};


  return (
    <div >
      <form className="d-flex" role="search" action="" onSubmit={searchHandler}>
        <textarea
          id="search"
          type="search"
          className="form-control me-2"
          aria-label="Search"
          value={transcript}
          onChange={(event) => setTranscript(event.target.value)}
        />
        <button className="btn btn-outline-success" type='submit'>SEARCH</button>
      </form>
    </div>
  )
}
