import { createSlice } from "@reduxjs/toolkit";
// import { fetchNextRecipesPage } from "../actions/recipeAction";

const initialState = {
  data: [],
  MyRecipes:[],
  Videos:[],
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
      const id = action.payload;
      if (Array.isArray(state.data)) {
        state.data = state.data.filter((item) => (item._id ?? item.id) !== id);
        localStorage.setItem("recipes", JSON.stringify(state.data));
      }
      if (Array.isArray(state.MyRecipes)) {
        state.MyRecipes = state.MyRecipes.filter(
          (item) => (item._id ?? item.id) !== id
        );
      }
      if (Array.isArray(state.Videos)) {
        state.Videos = state.Videos.filter(
          (item) => (item._id ?? item.id) !== id
        );
      }
    },
    loadRecipe: (state, action) => {
      state.data = action.payload ?? [];
    },
    LoadMyRecipe: (state, action) => {
      state.MyRecipes=action.payload;
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
    resetRecipes:(state,action)=>{
      state.MyRecipes=null;
      state.data=null;
    },
    toggleFavoriteLocal: (state, action) => {
      const { id, fav } = action.payload;
      const updateFav = (list) => {
        const recipe = list?.find((r) => (r._id ?? r.id) === id);
        if (recipe) {
          recipe.fav = fav;
        }
      };
      if (Array.isArray(state.data)) {
        updateFav(state.data);
      }
      if (Array.isArray(state.MyRecipes)) {
        updateFav(state.MyRecipes);
      }
      if (Array.isArray(state.Videos)) {
        updateFav(state.Videos);
      }
    },
    updateRecipeViewsLocal: (state, action) => {
      const { id, views } = action.payload;
      const applyViews = (list) => {
        const recipe = list?.find((r) => (r._id ?? r.id) === id);
        if (!recipe) return;
        if (Number.isFinite(Number(views))) {
          recipe.views = Number(views);
        } else {
          const current = Number(recipe.views) || 0;
          recipe.views = current + 1;
        }
      };
      if (Array.isArray(state.data)) {
        applyViews(state.data);
      }
      if (Array.isArray(state.MyRecipes)) {
        applyViews(state.MyRecipes);
      }
      if (Array.isArray(state.Videos)) {
        applyViews(state.Videos);
      }
    },
    LoadVideos:(state,action)=>{
      state.Videos=action.payload ?? [];
    }
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
  updateRecipeViewsLocal,
  LoadMyRecipe,
  resetRecipes,LoadVideos
} = RecipeSlice.actions;
