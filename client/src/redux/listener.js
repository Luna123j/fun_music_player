import { createSlice } from "@reduxjs/toolkit";

export const listenSlice = createSlice({
  name: "listen",
  initialState: {
    listen: false,
  },
  reducers: {
    onlisten: (state) => {
      state.listen = !state.listen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onlisten } = listenSlice.actions;

export default listenSlice.reducer;
