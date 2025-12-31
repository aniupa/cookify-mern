import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { loadRecipe, toggleFavoriteLocal } from "../reducers/recipeSlice";
import { loadFavorites } from "../reducers/FavoriteSlice";
export const asyncGetRecipeActions = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/recipes");

    dispatch(loadRecipe(res.data.recipes));
  } catch (error) {
    console.log(error);
  }
};
export const asyncGetLimitRecipies = (limit) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/recipes?limit=${limit}&offset=0`);
    dispatch(loadRecipe(res.data.recipes));
  } catch (error) {
    console.log(error);
  }
};
export const asyncAddRecipeActions = (recipe,userId) => async (dispatch, getState) => {
  try {
    // console.log(recipe);
    // const  id=currentUser._id;

    const res = await axios.post("/recipes",{ recipe,userId});

    toast.success("recipe added successfully!!");
    console.log("new recipe added successfully", userId);
    // res.status.json()
  } catch (error) {
    
    // const  id=currentUser._id;
    toast.error("error while creating recipe in create.jsx");
    return console.log("err creating recipe", "recipe:",userId,error);
  }
};

export const asyncAddToFavorite =
  ({ _id, favResult }) =>
  async (dispatch, getState) => {
     dispatch(toggleFavoriteLocal({ id: _id, fav: favResult }));
    try {

      const res = await axios.patch(`/recipes/${_id}`, { fav: favResult });
      dispatch(asyncGetRecipeActions());
    } catch (error) {

      console.log(error);
      
    dispatch(toggleFavoriteLocal({ id: _id, fav: !favResult }));
    }
  };

export const asyncUpdateRecipeHandler =
  ({ id, data }) =>
  async (dispatch, getState) => {
    try {
      const res = await axios.patch(`/recipes/${id}`, data);
      toast.success("recipe updated successfully!!");
      console.log(" recipe updated successfully", res);
      // console.log(res);
    } catch (error) {
      console.log(error);

      toast.error("error while updating recipe in asyncUpdateRecipeHandler");
    }
  };
