import React, { useEffect, useRef } from "react";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onlisten } from "../redux/listener";
import { onrecord } from "../redux/microphone";
import { BrowserRouter , Switch, Route, Link, Routes, useNavigate } from "react-router-dom";

import "../components/Speechlistener.scss";

export default function Speechlistener(props) {
  const { index } = useSelector(state => state.currentIndex)
  const { indexValues, listenerValues } = props;
  const { updateCurrentIndex } = indexValues
  const {listen, listener, listenOptions, stopListening} = listenerValues
  let navigate = useNavigate();

  const coolLabels = [
    "🐸", 
    "👈", 
    "🔚", "😍", "😁", "📰", 
    "🏠", "👉", "🟢", "🎙️", "🔭", 
    "🟥", "✉️", "🎉" ];
  const dispatch = useDispatch();


  useEffect(() => {
    if (index === 3) {
      navigate("/users/favourite", { replace: true })
   

    } else if (index === 5)
        {      navigate("/history", { replace: true })
      }
      else if (index === 6)
      {      navigate("/", { replace: true })
      }
  }, [index]);
  return (
    <div className="listener">
     
      <div id="coolLabel">
        {coolLabels[index]}
      </div>
      <div>

        </div>
      <button id="listenbutton" onClick={() => dispatch(onlisten())}>
        
        {!listen && (
          <i
            id="ear"className="fa-solid fa-ear-listen"
            onClick={() => listener(listenOptions, updateCurrentIndex)}
          ></i>
        )}
        {listen && (
          <i
          id="notear"  className="fa-solid fa-ear-deaf"
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
