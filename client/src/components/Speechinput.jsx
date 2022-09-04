/* eslint-disable react-hooks/rules-of-hooks */
import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import key from "../key";

// Set AssemblyAPI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: key(),
    "content-type": "application/json"
    // "transfer-encoding": "chunked", // Refused to set unsafe header "transfer-encoding" <---error in browser console??
  },
});

// TEST authentication works********************
// assembly
//     .post("/transcript", {
//         audio_url: "https://bit.ly/3yxKEIY"
//     })
//     .then((res) => console.log(res.data))
//     .catch((err) => console.error(err))


export default function Speechinput() {
  // This code is for TEXT TO SPEECH*****************************
  // const [ourText, setOurText] = useState("")
  // const msg = new SpeechSynthesisUtterance()
  // msg.text = "Don't be afraid, this is your computer speaking. I am alive now and i will never leave you."
  // const speechHandler = (msg) => {
  //   msg.text = ourText
  //   window.speechSynthesis.speak(msg)
  // }
  // useEffect(() => {
  //   window.speechSynthesis.speak(msg)
  // }, [msg])
  // *******************************************************************

  // Mic-Recorder-To-MP3
  const recorder = useRef(null); //Recorder
  const audioPlayer = useRef(null); //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.log(e));
  };

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);
  // console.log(uploadURL)

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
        checkStatusHandler();
      })
      .catch((err) => console.error(err));
  };
  // console.log(transcriptID)

  // Check the status of the Transcript and retrieve the Transcript Data
  const checkStatusHandler = async () => {
    setIsLoading(true);
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
        // setTranscript(transcriptData.text)
      });
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(transcriptData)

  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData.text);

        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <h1>React speech recognition music App</h1>
      <audio ref={audioPlayer} src={blobURL} controls="controls" />
      <div>
        <button disabled={isRecording} onClick={startRecording}>
          🎙️
        </button>
        <button disabled={!isRecording} onClick={stopRecording}>
          ✋
        </button>
        <button onClick={submitTranscriptionHandler}>SUBMIT</button>
        {/* <button onClick={checkStatusHandler}>CHECK STATUS</button> */}
      </div>
      <textarea
          className="song__search-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Type here if you want"
          value={transcript}
          // onChange={(e) => setOurText(e.target.value)}

        />
      {/* {transcriptData.status === "completed" ? (
        // <p>{transcript}</p>
      ) : (
        <p>{transcriptData.status}</p>
      )} */}
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
)}

