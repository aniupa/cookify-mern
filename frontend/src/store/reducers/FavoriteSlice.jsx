import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };
const FavoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default FavoriteSlice.reducer;
export const { loadFavorites } = FavoriteSlice.actions;
