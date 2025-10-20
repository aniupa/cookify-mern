import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from '../store/reducers/recipeSlice.jsx'
export const store = configureStore({
  reducer: { recipes: recipeSlice },
});
