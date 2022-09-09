import React, { useEffect, useRef } from "react";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onlisten } from "../redux/listener";
import { onrecord } from "../redux/microphone";

import "../components/Speechlistener.scss";

export default function Speechlistener(props) {
  const { index } = useSelector(state => state.currentIndex)
  const { indexValues, listenerValues } = props;
  const { updateCurrentIndex } = indexValues
  const {listen, listener, listenOptions, stopListening} = listenerValues
  const coolLabels = [
    "🐸", 
    "👈", 
    "🔚", "😍", "👋😁", "📰", 
    "🏠", "👉", "🟢", "🎙️", "🔭", 
    "🟥", "✉️", "🎉🥳🎉Thanks for listening!🎉🥳🎉" ];
  const dispatch = useDispatch();

  return (
    <div className="listener">
      <header>
        <h1>Speech listener</h1>
      </header>
      <h1 style={{ fontsize: "4em", textAlign: "center" }}>
        {coolLabels[index]}
      </h1>
      <button onClick={() => dispatch(onlisten())}>
        {!listen && (
          <i
            className="fa-solid fa-ear-listen"
            onClick={() => listener(listenOptions, updateCurrentIndex)}
          ></i>
        )}
        {listen && (
          <i
            className="fa-solid fa-ear-deaf"
            onClick={() => stopListening()}
          ></i>
        )}
      </button>
    </div>
  );
  // removed reportToConsole from linstener params

  // Stop the recognition in 5 seconds.
  // setTimeout(() => recognizer.stopListening(), 5000);
}
