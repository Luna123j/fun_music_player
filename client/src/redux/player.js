import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    play: false,
    list_id: -1
  },
  reducers: {
    onplay: (state) => {
      state.play = !state.play;
    },
    next: (state) => {
      state.list_id = state.list_id + 1
      state.play = true 
    },
    prev: (state) => {
      state.list_id -=1
      state.play = true 
    },
    playSelect: (state) => {
      state.list_id = state.list_id+1;
      state.play = true 
    },
    resetList_id: (state) => {
      state.list_id = state.list_id-1 
    }
   
  }
});

// Action creators are generated for each case reducer function
export const { onplay, next, prev, playSelect, resetList_id} = playerSlice.actions

export default playerSlice.reducer