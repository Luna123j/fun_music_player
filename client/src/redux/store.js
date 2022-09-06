import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import microphoneReducer from "./microphone"
import listenReducer from "./listener"
import musicDataReducer from "./musicData";
import visualModeReducer from "./visualMode"

export default configureStore({
  reducer: { 
    player: playerReducer, 
    microphone: microphoneReducer,
    listen: listenReducer,
    musicData: musicDataReducer,
    userMode: visualModeReducer
  }
})