import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import microphoneReducer from "./microphone"
import listenReducer from "./listener"
import musicDataReducer from "./musicData";
import visualModeReducer from "./visualMode"
import currentIndexReducer from "./currentIndex";
import userReducer from "./user"
import favouriteSongReducer from "./favouriteSong";
import transcriptReducer from "./transcript";
import currentSongDataReducer from "./currentSongData";


export default configureStore({
  reducer: { 
    player: playerReducer, 
    microphone: microphoneReducer,
    listen: listenReducer,
    musicData: musicDataReducer,
    userMode: visualModeReducer,
    currentIndex: currentIndexReducer,
    user: userReducer,
    favouriteSong: favouriteSongReducer,
    transcript: transcriptReducer,
    currentSongData: currentSongDataReducer

  }
})