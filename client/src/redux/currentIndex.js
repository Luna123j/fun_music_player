import { createSlice } from "@reduxjs/toolkit";

export const currentIndexSlice = createSlice({
  name: "currentIndex",
  initialState: {
    index: 0,
  },
  reducers: {
    updateIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIndex } = currentIndexSlice.actions;

export default currentIndexSlice.reducer;
