import React from "react";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onlisten } from "../redux/listener";



export default function Speechlistener() {
const [currentIndex, setCurrentindex] = useState(0)
const coolLabels = ["🐸", "👋😁", "🟢", "🎙️", "🟥" ]

const reportToConsole = results => {
    const scores = Array.from(results.scores)
    const labels = ["Background Noise", "Hello", "Play", "Record", "Stop"];
    // const scores = [
    //     0.0009885129984468222,
        
    //     0.9746742844581604,
        
    //     0.0009671514853835106,
        
    //     0.0015677112387493253,
        
    //     0.021802125498652458,
    // ];
    
    const biggestValue = Math.max(...scores);
    const biggestValueIndex = scores.indexOf(biggestValue);
    console.log(labels[biggestValueIndex])
}
const updateCurrentIndex = results => {
    const scores = Array.from(results.scores)
    const labels = ["Background Noise", "Hello", "Play", "Record", "Stop"];
    // const scores = [
    //     0.0009885129984468222,
        
    //     0.9746742844581604,
        
    //     0.0009671514853835106,
        
    //     0.0015677112387493253,
        
    //     0.021802125498652458,
    // ];
    
    const biggestValue = Math.max(...scores);
    const biggestValueIndex = scores.indexOf(biggestValue);
    biggestValueIndex !== 0 && setCurrentindex(biggestValueIndex)
}

  const URL = "http://localhost:3000/model/";

  async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
      "BROWSER_FFT", // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
  }

  const listenOptions = {
    includeSpectrogram: true, // in case listen should return result.spectrogram
    probabilityThreshold: 0.95,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
  };


  async function listener(options, listenCallback) {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    console.log(classLabels);

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(listenCallback, options);

    
}

const { listen } = useSelector((state) => state.listen);
const dispatch = useDispatch();

  return (
    <div>
      <header>
      <h1>Speech listener</h1>
      </header>
      <h1 style={{ fontsize: "4em", textAlign: "center" }}>{coolLabels[currentIndex]}</h1>
      <button onClick={() => dispatch(onlisten())}>
        {!listen && (<i class="fa-solid fa-ear-listen" onClick={() => listener(listenOptions, updateCurrentIndex)}></i>)}
        {listen && (<i class="fa-solid fa-ear-deaf"></i>)}
      </button>

    </div>
  );
    // removed reportToConsole from linstener params

  // Stop the recognition in 5 seconds.
  // setTimeout(() => recognizer.stopListening(), 5000);
}
