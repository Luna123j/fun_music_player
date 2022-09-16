import { createSlice } from "@reduxjs/toolkit";

export const musicDataSlice = createSlice({
  name: "musicData",
  initialState: {
    musicList: [],
  },
  reducers: {
    getList: (state, action) => {
      state.musicList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getList } = musicDataSlice.actions;

export default musicDataSlice.reducer;
