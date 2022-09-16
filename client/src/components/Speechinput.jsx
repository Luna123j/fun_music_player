/* eslint-disable react-hooks/rules-of-hooks */
import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef, React } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { onrecord } from "../redux/microphone";
import "../components/Speechinput.scss";

export default function Speechinput(props) {
  const dispatch = useDispatch();
  const { recordValues, transcriptValues } = props;
  const { record, startRecording, stopRecording } = recordValues;
  const { submitTranscriptionHandler, transcriptData } = transcriptValues;
  const { script } = useSelector((state) => state.transcript);

  return (
    <div>
      <div className="record">
        <div>
          <button className="recordButton" onClick={() => dispatch(onrecord())}>
            {!record && (
              <i
                id="mIcon"
                className="fa-solid fa-microphone"
                onClick={() => startRecording()}
              ></i>
            )}
            {record && (
              <i
                id="notmIcon"
                className="fa-solid fa-microphone-slash"
                onClick={() => stopRecording()}
              ></i>
            )}
          </button>
          <button
            className="recordButton1"
            onClick={submitTranscriptionHandler}
          >
            <i id="envelope" class="fa-solid fa-envelope"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
