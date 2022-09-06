import { createSlice } from '@reduxjs/toolkit'

export const currentSongDataSlice = createSlice({
  name: 'currentSongData',
  initialState: {
    currentSongContent: {}
  },
  reducers: {
    getCurrentSong: (state,action) => {
      state.currentSongContent = action.payload;
    }
   
  }
});

// Action creators are generated for each case reducer function
export const { getCurrentSong} = currentSongDataSlice.actions

export default currentSongDataSlice.reducer