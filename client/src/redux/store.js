import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import microphoneReducer from "./microphone"
import listenReducer from "./listener"
<<<<<<< HEAD
import musicDataReducer from "./musicData";
=======
import visualModeReducer from "./visualMode";
>>>>>>> master

export default configureStore({
  reducer: { 
    player: playerReducer, 
    microphone: microphoneReducer,
    listen: listenReducer,
<<<<<<< HEAD
    musicData: musicDataReducer
=======
    userMode: visualModeReducer
>>>>>>> master
  }
})