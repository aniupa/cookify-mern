import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from './reducers/RecipeSlice.jsx'
import userSlice from  './reducers/UserSlice.jsx'
import favoriteSlice from "./reducers/FavoriteSlice.jsx";
export const store = configureStore({
  reducer: { recipes: recipeSlice, users: userSlice, favorites: favoriteSlice },
});
