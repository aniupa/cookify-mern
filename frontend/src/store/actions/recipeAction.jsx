import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { loadRecipe } from "../reducers/recipeSlice";
import { loadFavorites } from "../reducers/FavoriteSlice";
export const asyncGetRecipeActions = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/recipes");
    
    dispatch(loadRecipe(res.data.recipes));
    
    
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

export const asyncAddToFavorite=({_id,favResult})=>async (dispatch,getState)=>{
 
try {
  const res=await axios.patch(`/recipes/${_id}`,{fav:favResult});
  dispatch(asyncGetRecipeActions());
  
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
