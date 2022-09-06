import { createSlice } from '@reduxjs/toolkit'

export const lyricsDataSlice = createSlice({
  name: 'lyricsData',
  initialState: {
    lyricsContent: []
  },
  reducers: {
    getContent: (state,action) => {
      state.lyricsContent = action.payload;
    }
   
  }
});

// Action creators are generated for each case reducer function
export const { getContent} = lyricsDataSlice.actions

export default lyricsDataSlice.reducer