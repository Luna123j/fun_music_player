import { createSlice } from '@reduxjs/toolkit'

export const transcriptSlice = createSlice({
  name: 'transcript',
  initialState: {
    script: ""
  },
  reducers: {
   updateScript : (state, action) => {
    state.script = action.payload
   },  
  //  onscript: (state) => {
  //   state.script = !state.script;
  // }
  }
});

// Action creators are generated for each case reducer function
export const { updateScript } = transcriptSlice.actions

export default transcriptSlice.reducer