import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loadUser } = userSlice.actions;
