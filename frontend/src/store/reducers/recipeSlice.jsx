import { createSlice } from "@reduxjs/toolkit";
// import { fetchNextRecipesPage } from "../actions/recipeAction";

const initialState = {
  data: [],
  MyRecipes:[]
};

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
      state.data = action.payload ?? [];
    },
    LoadMyRecipe: (state, action) => {
      state.MyRecipes=action.payload ?? [];
    },
    loadLazyRecipe: (state, action) => {
      // state.data = [...state.data, ...action.payload];
      const existingIds = new Set(state.data.map((d) => d._id ?? d.id));
      for (const item of action.payload) {
        const id = item._id ?? item.id;
        if (!existingIds.has(id)) {
          state.data.push(item);
          existingIds.add(id);
        }
      }
    },
    toggleFavoriteLocal: (state, action) => {
      const { id, fav } = action.payload;
      const recipe = state.data.find((r) => r._id === id);
      if (recipe) {
        recipe.fav = fav;
      }
    },
  },
});

export default RecipeSlice.reducer;
export const {
  loadRecipesFromLocalStorage,
  addRecipe,
  loadRecipe,
  loadLazyRecipe,
  deleteRecipe,
  toggleFavoriteLocal,
  LoadMyRecipe
} = RecipeSlice.actions;
