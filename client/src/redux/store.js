import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import microphoneReducer from "./microphone"
import listenReducer from "./listener"
import musicDataReducer from "./musicData";

export default configureStore({
  reducer: { 
    player: playerReducer, 
    microphone: microphoneReducer,
    listen: listenReducer,
    musicData: musicDataReducer
  }
})