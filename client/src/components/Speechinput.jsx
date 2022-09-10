/* eslint-disable react-hooks/rules-of-hooks */
import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef, React } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { onrecord } from "../redux/microphone";
import '../components/Speechinput.scss';


// import PlayButton from "./components/PlayButton";
// import key from "./key";




export default function Speechinput(props) {
  const dispatch = useDispatch();
  const { recordValues, transcriptValues } = props
  const { record, startRecording, stopRecording } = recordValues
  const { submitTranscriptionHandler, transcriptData } = transcriptValues
  const { script } = useSelector(state => state.transcript )


  
  return (
    <div className="record">
    
      {/* <audio ref={audioPlayer} src={blobURL} controls="controls" /> */}
      <button className="recordButton" onClick={() => dispatch(onrecord())}>
        {!record && (<i className="fa-solid fa-microphone" onClick={() => startRecording()}></i>)}
        {record && (<i className="fa-solid fa-microphone-slash" onClick={() => stopRecording()}></i>)}
      </button>
      <button onClick={submitTranscriptionHandler}>SUBMIT</button>
      {/* <button disabled={isRecording} onClick={startRecording}>
          🎙️
        </button>
        <button disabled={!isRecording} onClick={stopRecording}>
          ✋
        </button> */}
      {/* <button onClick={checkStatusHandler}>CHECK STATUS</button> */}
      {/* <textarea
        className="song__search-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Type here if you want"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      /> */}
      {transcriptData.status === "processing" ? (
        <img id="luigitwerk" src="https://www.icegif.com/wp-content/uploads/roblox-icegif-10.gif" alt="loading gif">{script}</img>
        ) : (
          <p></p>
        )}
      {/* this input was used for TEXT TO SPEECH *** we can change it */}
      {/* <input
        type='text'
        value={ourText}
        placeholder='Enter Text'
        onChange={(e) => setOurText(e.target.value)}
      /> */}
      {/* <button onClick={() => speechHandler(msg)}>SPEAK</button> */}
      {/* ************************************************************ */}
    </div>
  );
}
