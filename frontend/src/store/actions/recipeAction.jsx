import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { loadRecipe } from "../reducers/recipeSlice";
import { loadFavorites } from "../reducers/FavoriteSlice";
export const asyncGetRecipeActions = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/recipes");
    dispatch(loadRecipe(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const asyncAddRecipeActions = (recipe) => async (dispatch, getState) => {
  try {
    // console.log(recipe);

    const res = await axios.post("/recipes", recipe);

    toast.success("recipe added successfully!!");
    console.log("new recipe added successfully", res);
  } catch (error) {
    toast.error("error while creating recipe in create.jsx");
    return console.log("err creating recipe", error);
  }
};

export const asyncAddToFavorite=({id,favResult})=>async (dispatch,getState)=>{
 
try {
   console.log(id);
  console.log(favResult);
  const res=await axios.patch(`/recipes/${id}`,{fav:favResult});
  dispatch(asyncGetRecipeActions());
  console.log('added to fav');
  
} catch (error) {
  console.log(error);

  
} 
  
}

export const asyncUpdateRecipeHandler=({id,data})=>async (dispatch,getState)=>{
  try {
    const res=await axios.patch(`/recipes/${id}`,data);
    toast.success("recipe updated successfully!!");
    console.log(" recipe updated successfully", res);
    // console.log(res);
    
  } catch (error) {
    console.log(error);
    
    toast.error("error while updating recipe in asyncUpdateRecipeHandler");
    
  }
}

// export const fetchNextRecipesPage = () => async (dispatch, getState) => {
//   const { page, limit, loading, hasMore } = getState().recipes;
//   if (loading || !hasMore) return; // prevent duplicate/extra calls

//   dispatch(fetchNextPagePending());
//   try {
//     const nextPage = page + 1;
//     const res = await axios.get(`/recipes?page=${nextPage}&limit=${limit}`);
//     dispatch(fetchNextPageFulfilled({ recipes: res.data.recipes, page: nextPage, hasMore: res.data.hasMore }));
//   } catch (err) {
//     dispatch(err.message);
//   }
// };
