import "./App.scss";
import "./components/PlayButton";
import PlayButton from "./components/PlayButton";

import { onplay, next, prev, loop, playSelect } from "./redux/player";

import Speechinput from "./components/Speechinput";
import Speechlistener from "./components/Speechlistener";
import io from "socket.io-client";
import { useEffect, useState, useRef, React } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
import { useSelector, useDispatch } from "react-redux";
import { onrecord } from "./redux/microphone";
import SearchMusic from "./components/SearchMusic";
import Navbar from "./components/Navbar";
import Userview from "./components";
// import { getList } from './redux/musicData';
// import { musiclist } from "./redux/visualMode";

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import index from "./components";

import * as speechCommands from "@tensorflow-models/speech-commands";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favourite from "./components/Favourite";
import History from "./components/History";

import MusicList from "./components/MusicList";
import Lyrics from "./components/Lyrics";
import { cookieProvider, CookiesProvider } from "react-cookie";
import { updateIndex } from "./redux/currentIndex";
import Modal from "./components/Modal";
// const socket = io();

// Set AssemblyAPI Axios Header
// const SPEECH_API_KEY = process.env.REACT_APP_API_KEY;
// console.log(SPEECH_API_KEY)
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "a95cae33e75d4ed69ba5c2bbfa0de36e",
    "content-type": "application/json",
    "transfer-encoding": "chunked", // Refused to set unsafe header "transfer-encoding" <---error in browser console??
  },
});

function App() {
  // ////////////////////////////////////////
  // Speechlisten Globalized Logic
  // /////////////////////////////////////////
  const { listen } = useSelector((state) => state.listen);
  const dispatch = useDispatch();
  // const [currentIndex, setCurrentindex] = useState(0);
  const [recognizer, setRecognizer] = useState();
  const navigate = useNavigate();
  const { musicList } = useSelector((state) => state.musicData);

  const { index } = useSelector((state) => state.currentIndex);
  const { script } = useSelector((state) => state.transcript);
  //   const audioRef= useRef(new Audio(mp3Url[list_id]))
  //   const animationRef = useRef()
  //   const mp3Url={1: 'https://cdns-preview-d.dzcdn.net/stream/c-d8f5b81a6243ddfa4c97b9a4c86a82fa-6.mp3',
  //   2: 'https://cdns-preview-e.dzcdn.net/stream/c-e4829488eb446f23487bbf60a6aa869d-3.mp3',
  //   3: 'https://cdns-preview-3.dzcdn.net/stream/c-381eb6e90e561759fea2b229e9b844eb-3.mp3'
  // }
  //   useEffect(() => {
  //     if (currentIndex === 2 || currentIndex === 4) {
  //       dispatch(onplay());
  //       if (!play) {
  //         audioRef.current.play();
  //         animationRef.current = requestAnimationFrame(whilePlaying);
  //       } else {
  //         audioRef.current.pause();
  //         animationRef.current = cancelAnimationFrame(animationRef.current);
  //       }
  //     }
  //   }, [currentIndex]);

  useEffect(() => {
    console.log(index);
    if (index === 9) {
      dispatch(onrecord());
      startRecording();
    }
  }, [index]);

  useEffect(() => {
    console.log(index);
    if (index === 2) {
      dispatch(onrecord());
      stopRecording();
    }
  }, [index]);

  useEffect(() => {
    console.log(index);
    if (index === 12) {
      submitTranscriptionHandler();
    }
  }, [index]);

  useEffect(() => {
    if (index === 1) {
      clickPrev();
      if (!play) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } 
      else {
        audioRef.current.pause();
        animationRef.current = cancelAnimationFrame(animationRef.current);
      }
    }
  }, [index]);

  useEffect(() => {
    if (index === 7) {
      clickNext();
      if (!play) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } 
      else {
        audioRef.current.pause();
        animationRef.current = cancelAnimationFrame(animationRef.current);
      }
    }
  }, [index]);

  useEffect(() => {
    if (index === 8 || index === 11) {
      dispatch(onplay());
      if (!play) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioRef.current.pause();
        animationRef.current = cancelAnimationFrame(animationRef.current);
      }
    }
  }, [index]);

  const reportToConsole = (results) => {
    const scores = Array.from(results.scores);
    const labels = ["Background Noise", "Hello", "Play", "Record", "Stop"];

    const biggestValue = Math.max(...scores);
    const biggestValueIndex = scores.indexOf(biggestValue);
    // console.log(labels[biggestValueIndex]);
  };
  const updateCurrentIndex = (results) => {
    const scores = Array.from(results.scores);
    const labels = ["Background Noise", "Hello", "Play", "Record", "Stop"];

    const biggestValue = Math.max(...scores);
    const biggestValueIndex = scores.indexOf(biggestValue);
    // setCurrentindex(biggestValueIndex);
    dispatch({ type: "currentIndex/updateIndex", payload: biggestValueIndex });
  };

  const cURL = "http://localhost:3000/model/";

  async function createModel() {
    const checkpointURL = cURL + "model.json"; // model topology
    const metadataURL = cURL + "metadata.json"; // model metadata

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
    probabilityThreshold: 0.65,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
  };

  async function listener(options, listenCallback) {
    const recognizer = await createModel();
    setRecognizer(recognizer);
    const classLabels = recognizer.wordLabels(); // get class labels
    // console.log(classLabels);

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(listenCallback, options);
  }

  function stopListening() {
    if (recognizer) {
      recognizer.stopListening();
    }
  }

  const indexValues = { index, updateCurrentIndex };
  const listenerValues = { listen, listener, listenOptions, stopListening };

  // //////////////////////////////////////////
  // //////Speechinput Globalized Logic
  // ////////////////////////////////////////////
  const { record } = useSelector((state) => state.microphone);

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
  // const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      console.log(audioFile);
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);
  // console.log(uploadURL)

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    console.log("upload URL", uploadURL);
    if (!uploadURL) {
      return;
    }
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
        checkStatusHandler(res.data.id);
        // scriptMaker()
      })
      .catch((err) => console.error(err));
  };
  // console.log(transcriptID)

  // Check the status of the Transcript and retrieve the Transcript Data
  const checkStatusHandler = async (transcriptID) => {
    setIsLoading(true);
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
        // console.log("!!!!!!this is from app check status script!!!!", script)
        // console.log("!!!!!!this is from app check status data!!!!", transcriptData.text)

        // dispatch({
        //   type: "transcript/updateScript",
        //   payload: transcriptData.text,
        // });
        // setSearchText(transcriData.text)
        // if (script) {
        //   for (let s of script)  {
        //     if (s == "and." || s == "end") {
        //       console.log("THIS IS THE CONDITIONAL SCRIPT")
        //      return script.replace('and.','')
        //     }
        //   }

        // }
      });
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("statusHandler transcript", script);
  // console.log("this is transcript data", transcriptData);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (transcriptData.status !== "completed" && isLoading) {
  //       checkStatusHandler(transcriptID);
  //     } else {
  //       setIsLoading(false);

  //       dispatch({
  //         type: "transcript/updateScript",
  //         payload: transcriptData.text,
  //       });

  //       clearInterval(interval);
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // });

  useEffect(() => {
  if (transcriptData.status !== "completed" && isLoading) {
    checkStatusHandler(transcriptID)
  } else {
    setIsLoading(false)
    // console.log("!!!!!!this is from app script!!!!", script)
    // console.log("!!!!!!this is from app check status data!!!!", transcriptData.text)
   let dataText = transcriptData.text
   if (dataText){

   dataText = dataText.replace('end.' || 'and.', '')

   }

     dispatch({ type: "transcript/updateScript", payload: dataText })

  }

  })

  // const scriptMaker = function () {
  //   if (transcriptData.status !== "completed" && isLoading) {
  //     checkStatusHandler(transcriptID);
  //   } else {
  //     setIsLoading(false);
  //     console.log("!!!!!!this is from app script!!!!", script);
  //     console.log(
  //       "!!!!!!this is from app check status data!!!!",
  //       transcriptData.text
  //     );
  //     let dataText = transcriptData.text;
  //     if (dataText) {
  //       dataText = dataText.replace("end.", "");
  //     }

  //     dispatch({ type: "transcript/updateScript", payload: dataText });
  //   }
  // };

  // scriptMaker()

  // console.log(transcript)
  const recordValues = { record, startRecording, stopRecording };
  const transcriptValues = {
    // script,
    // setTranscript,
    submitTranscriptionHandler,
    transcriptData,
    setTranscriptData
  };
  // //////////////////////////////////////////
  // SearchMusic Globalized logic
  // ///////////////////////////////////////
  // ////////////////////////////////////////////
  let userInput = { title: script, artist: "" };

  const voiceSearchHandler = () => {
    // e.preventDefault();
    console.log("COMES UP?????");
    // dispatch(musiclist());
    axios
      .post("/music", userInput)
      .then((res) => {
        dispatch({ type: "musicData/getList", payload: [...res.data.data] });
        navigate("/search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   console.log("COMES UP?????");
  //   console.log(userInput, e.target[0].value)
  //   userInput.title = e.target[0].value
  //   axios
  //     .post("/music", userInput)
  //     .then((res) => {
  //       dispatch({ type: "musicData/getList", payload: [...res.data.data] });
  //       navigate("/search");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // dispatch({ type: "transcript/updateScript", payload: "" });

  useEffect(() => {
    if (index === 10) {
      voiceSearchHandler();
    }
  }, [index]);

  // //////////////////////////////////////////
  // Playbutton Globalized Logic
  // ///////////////////////////////////////
  // ////////////////////////////////////////////
  const { currentSongContent } = useSelector((state) => state.currentSongData);
  const musicUrl = [];
  if (currentSongContent.length > 0) {
    currentSongContent.map((song, index) => {
      return (musicUrl[index] = song.mp3Url);
    });
  }
  const mp3Url = { ...musicUrl };

  const { play, list_id } = useSelector((state) => state.player);

  // console.log("^^^^^^^^^^mp3 arr^^^^", currentSongContent);
  const audioRef = useRef(new Audio(mp3Url[list_id]));
  const progressBar = useRef();
  const volumeBar = useRef();
  const animationRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isReady = useRef(false);
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(mp3Url[list_id]);
    console.log("list id app.js", list_id);
    if (isReady.current) {
      audioRef.current.play();
    } else {
      isReady.current = true;
    }
    // progressBar.current = audioRef.current.currentTime
  }, [list_id]);

  useEffect(()=> {
    volumeBar.current = audioRef.current.volume
  })

  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const clickPlayHandler = () => {
    dispatch(onplay())
  }

  useEffect(()=> {
    if (play) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      animationRef.current = cancelAnimationFrame(animationRef.current);
    }
    
  }, [play])

  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
    if (audioRef.current.ended) {
      if (list_id < musicUrl.length - 1) {
        dispatch(next());
      }
    if (list_id === musicUrl.length - 1) {
      dispatch(loop())
      dispatch(next())
    }
    }
  };
  console.log("*************", audioRef.current.ended)

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const clickNext = () => {
    console.log("list length", musicUrl.length)
    if (list_id < musicUrl.length - 1) {
        dispatch(next());
      }
    if (list_id === musicUrl.length - 1) {
      dispatch(loop())
      dispatch(next())
     
    }
    console.log(list_id)
      
    };
    console.log("click next after", list_id)
    console.log("**************", audioRef.current.volume)
  const clickPrev = () => {
    if (list_id > 0) {
      dispatch(prev());
    }
    if (list_id === 0) {

    }
  };

  const handleChange = (e) => {
    audioRef.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const playValues = { audioRef, clickPrev, clickPlayHandler, play, clickNext, volumeBar };
  const timeValues = {
    calculateTime,
    currentTime,
    progressBar,
    handleChange,
    duration,
    volumeBar
  };

  // //////////////////////////////////////////
  console.log(currentSongContent, list_id)
  return (
    <CookiesProvider>
      <div className="App">
        <div>
          <Navbar transcriptValues={transcriptValues}
/>
        </div>
        <div id="appContainer">
          <div id="sider">
            <Speechlistener
              indexValues={indexValues}
              listenerValues={listenerValues}
            />
            <Speechinput
              recordValues={recordValues}
              transcriptValues={transcriptValues}
            />
          </div>
          {transcriptData.status === "processing" ? (
        <img id="luigitwerk" src="https://www.icegif.com/wp-content/uploads/roblox-icegif-10.gif" alt="loading gif">{script}</img>
      ) : (
          
          <Routes>
            <Route path="/" element={<Lyrics />} />
            <Route path="/users/favourite" element={<Favourite />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<MusicList />} />
          </Routes>
            )}
        </div>

        <div id="footerEsque">
          <PlayButton playValues={playValues} timeValues={timeValues} />
       

        </div>
      </div>
    </CookiesProvider>
  );
}

export default App;
