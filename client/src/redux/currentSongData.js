import { createSlice } from '@reduxjs/toolkit'

export const currentSongDataSlice = createSlice({
  name: 'currentSongData',
  initialState: {
    currentSongContent: [],
    currentIndex: -1
  },
  reducers: {
    getCurrentSong: (state,action) => {
      state.currentSongContent = [...state.currentSongContent,action.payload];
    }

  }
});

// Action creators are generated for each case reducer function
export const { getCurrentSong} = currentSongDataSlice.actions

export default currentSongDataSlice.reducer