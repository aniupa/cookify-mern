import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [{"title":"testing","id":"testid",fav:false},{"title":"testing","id":"testid1",fav:false}] };

const RecipeSlice = createSlice({
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
    loadRecipe: (state, action) => {
      state.data = action.payload; 
    },
  },
});

export default RecipeSlice.reducer;
export const { loadRecipesFromLocalStorage, addRecipe,loadRecipe, deleteRecipe } =
  RecipeSlice.actions;
