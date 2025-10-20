import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    loadRecipesFromLocalStorage: (state) => {
      const stored = localStorage.getItem("recipes");
      state.data = stored ? JSON.parse(stored) : [];
    },
    addRecipe: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("recipes", JSON.stringify(state.data));
    },
    deleteRecipe: (state, action) => {
      state.data = state.data.filter(f, (index) => index !== action.payload); //ye mujhe id pe witch karna hai
      localStorage.setItem("recipes", JSON.stringify(state.data));
    },
    // loadRecipe: (state, action) => {
    //   state.data = action.payload;
    // },
  },
});

export default recipeSlice.reducer;
export const { loadRecipesFromLocalStorage, addRecipe, deleteRecipe } =
  recipeSlice.actions;
