import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    play: false,
    list_id: -1,
    mp3Url: "",
  },
  reducers: {
    onplay: (state, action) => {
      state.play = !state.play;
    },
    next: (state) => {
      state.list_id = state.list_id + 1;
      state.play = true;
    },
    prev: (state) => {
      state.list_id -= 1;
      state.play = true;
    },
    playSelect: (state) => {
      state.list_id = state.list_id + 1;
      state.play = true;
    },
    resetList_id: (state) => {
      state.list_id = 0;
      state.play = true;
    },
    loop: (state) => {
      state.list_id = -1;
    },
    setListID: (state, action) => {
      state.list_id = action.payload;
      state.play = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onplay, next, prev, playSelect, resetList_id, loop, setListID } =
  playerSlice.actions;

export default playerSlice.reducer;
