import { createSlice } from '@reduxjs/toolkit'

export const visualModeSlice = createSlice({
  name: 'userMode',
  initialState: {
    mode: "login"
    
  },
  reducers: {
    login: (state) => {
      state.mode = "login";
    },
    signup: (state) => {
      state.mode="signup";
    },
    favourite: (state) => {
      state.mode='favourite';
    },
    recent: (state) => {
      state.mode = "recent"
    },
    musiclist: (state) => {
      state.mode = "musiclist"
    },
    selectedSong: (state) => {
      state.mode = "selectedSong"
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, signup, favourite, recent, musiclist, selectedSong} = visualModeSlice.actions

export default visualModeSlice.reducer