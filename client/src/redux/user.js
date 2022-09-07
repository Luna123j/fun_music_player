import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ""
  },
  reducers: {
    userState: (state,action) => {
      state.username = action.payload;
    },
    resetUserState: (state) => {
      state.username = ""
    }
   
  }
});

// Action creators are generated for each case reducer function
export const { userState, resetUserState } = userSlice.actions

export default userSlice.reducer