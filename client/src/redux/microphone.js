import { createSlice } from "@reduxjs/toolkit";

export const microphoneSlice = createSlice({
  name: "microphone",
  initialState: {
    record: false,
  },
  reducers: {
    onrecord: (state) => {
      state.record = !state.record;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onrecord } = microphoneSlice.actions;

export default microphoneSlice.reducer;
