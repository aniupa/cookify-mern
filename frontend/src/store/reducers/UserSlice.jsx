import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state, action) => {
      state.data = null;
    },
  },
});

export default userSlice.reducer;
export const { loadUser ,resetUser} = userSlice.actions;
