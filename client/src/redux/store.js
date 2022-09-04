import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import microphoneReducer from "./microphone"

export default configureStore({
  reducer: { 
    player: playerReducer, 
    microphone: microphoneReducer
  }
})