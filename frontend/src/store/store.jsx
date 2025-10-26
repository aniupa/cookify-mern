import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from './reducers/RecipeSlice.jsx'
import userSlice from  './reducers/UserSlice.jsx'
export const store = configureStore({
  reducer: { recipes: recipeSlice ,users: userSlice},
});
