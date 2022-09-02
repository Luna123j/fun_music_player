import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    play: false,
  },
  reducers: {
    onplay: (state) => {
      state.play = !state.play;
    }
  }
});

// Action creators are generated for each case reducer function
export const { onplay } = playerSlice.actions

export default playerSlice.reducer