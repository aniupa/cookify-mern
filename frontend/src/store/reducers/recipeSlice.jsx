import { createSlice } from "@reduxjs/toolkit";
// import { fetchNextRecipesPage } from "../actions/recipeAction";

const initialState = {
  data: [],
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
      state.data = action.payload;
    },
    loadLazyRecipe: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    // addCase:
    //   (fetchNextRecipesPage.fulfilled,
    //   (state, action) => {
    //     state.loading = false;
    //     const merged = [...state.list, ...action.payload.recipes];
    //     const map = new Map();
    //     merged.forEach((r) => {
    //       if (!map.has(r._id)) map.set(r._id, r);
    //     });
    //     state.list = Array.from(map.values());
    //     state.page = action.payload.page;
    //     state.hasMore = action.payload.hasMore;
    //   }),
  },
});

export default RecipeSlice.reducer;
export const {
  loadRecipesFromLocalStorage,
  addRecipe,
  loadRecipe,
  loadLazyRecipe,
  deleteRecipe,
} = RecipeSlice.actions;
