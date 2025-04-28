import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'username',
    initialState: null, // Start with null instead of empty object

    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },     
       clearUser: () => null,
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;