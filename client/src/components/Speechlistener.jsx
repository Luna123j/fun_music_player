import React, { useEffect, useRef } from "react";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onlisten } from "../redux/listener";
import { onrecord } from "../redux/microphone";
import { BrowserRouter , Switch, Route, Link, Routes, useNavigate } from "react-router-dom";

import "../components/Speechlistener.scss";

export default function Speechlistener(props) {
  const { indexValues, listenerValues } = props;
  const {currentIndex, updateCurrentIndex} = indexValues
  const {listen, listener, listenOptions, stopListening} = listenerValues
  let navigate = useNavigate();

  const coolLabels = [
    "🐸", 
    "👈", 
    "🔚", "😍", "👋😁", "📰", 
    "🏠", "👉", "🟢", "🎙️", "🔭", 
    "🟥", "✉️", "🎉🥳🎉Thanks for listening!🎉🥳🎉" ];
  const dispatch = useDispatch();


  useEffect(() => {
    if (currentIndex === 3) {
      navigate("/favourite", { replace: true })
   

    } else if (currentIndex === 5)
        {      navigate("/history", { replace: true })
      }
      else if (currentIndex === 6)
      {      navigate("/", { replace: true })
      }
  }, [currentIndex]);
  return (
    <div className="listener">
      <header>
        <h1>Speech listener</h1>
      </header>
      <h1 style={{ fontsize: "4em", textAlign: "center" }}>
        {coolLabels[currentIndex]}
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
