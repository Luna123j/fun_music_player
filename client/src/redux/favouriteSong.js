import { createSlice } from '@reduxjs/toolkit'

export const favouriteSongSlice = createSlice({
  name: 'favouriteSong',
  initialState: {
    isFavourite: false
    
  },
  reducers: {
    favor: (state) => {
      state.isFavourite = true;
    },
    unfavor: (state) => {
      state.isFavourite = false;

    }
  }
});

// Action creators are generated for each case reducer function
export const { favor, unfavor} = favouriteSongSlice.actions

export default favouriteSongSlice.reducer