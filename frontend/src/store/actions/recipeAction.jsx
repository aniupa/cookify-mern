import axios from "../../utils/axios";
import { toast } from "react-toastify";
import {
  LoadMyRecipe,
  loadRecipe,
  toggleFavoriteLocal,
  deleteRecipe,
  updateRecipeViewsLocal,
} from "../reducers/recipeSlice";
import { loadFavorites } from "../reducers/FavoriteSlice";
export const asyncGetRecipeActions = (userId) => async (dispatch, getState) => {
  try {
    const params = {};
    const resolvedUserId =
      userId ?? getState()?.users?.data?.data?.user?._id;
    if (resolvedUserId) params.userId = resolvedUserId;
    const res = await axios.get("/recipes", { params });

    dispatch(loadRecipe(res.data.recipes));
  } catch (error) {
    console.log(error);
  }
};

export const asyncGetMyRecipeActions = (userId) => async (dispatch, getState) => {
  try {
    // console.log(userId);
    
    const res = await axios.get(`/user/${userId}/myRecipes`);
    // console.log(res.data.myRecipe);
    
    dispatch(LoadMyRecipe(res.data.myRecipe));
  } catch (error) {
    console.log(error);
  }
};

export const asyncGetLimitRecipies = (limit) => async (dispatch, getState) => {
  try {
    const userId = getState()?.users?.data?.data?.user?._id;
    const params = { limit };
    if (userId) params.userId = userId;
    const res = await axios.get(`/recipes`, { params });
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

export const asyncGetFavoritesActions = (userId) => async (dispatch) => {
  try {
    if (!userId) return;
    const res = await axios.get(`/user/${userId}/favorites`);
    dispatch(loadFavorites(res.data.favorites ?? []));
  } catch (error) {
    console.log(error);
  }
};

export const asyncAddToFavorite =
  ({ _id, favResult }) =>
  async (dispatch, getState) => {
    const userId = getState()?.users?.data?.data?.user?._id;
    if (!userId) {
      toast.warn("Login required to save favorites");
      return;
    }

    dispatch(toggleFavoriteLocal({ id: _id, fav: favResult }));
    try {
      await axios.post(`/recipes/${_id}/favorite`, {
        userId,
        favorite: favResult,
      });
      dispatch(asyncGetFavoritesActions(userId));
    } catch (error) {
      console.log(error);

      dispatch(toggleFavoriteLocal({ id: _id, fav: !favResult }));
    }
  };

export const asyncUpdateRecipeHandler =
  ({ id, data }) =>
  async (dispatch, getState) => {
    try {
      const userId = getState()?.users?.data?.data?.user?._id;
      if (!userId) {
        toast.warn("Login required to update recipes");
        return;
      }
      const payload = { ...data, userId };
      const res = await axios.patch(`/recipes/${id}`, payload);
      toast.success("recipe updated successfully!!");
      console.log(" recipe updated successfully", res);
      // console.log(res);
    } catch (error) {
      console.log(error);

      toast.error("error while updating recipe in asyncUpdateRecipeHandler");
    }
  };

export const asyncDeleteRecipeAction = (id) => async (dispatch, getState) => {
  try {
    const userId = getState()?.users?.data?.data?.user?._id;
    if (!userId) {
      toast.warn("Login required to delete recipes");
      return;
    }
    await axios.delete(`/recipes/${id}`, { data: { userId } });
    dispatch(deleteRecipe(id));
    toast.success("recipe deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("error while deleting recipe");
  }
};

export const asyncIncrementRecipeViews = (id) => async (dispatch) => {
  try {
    if (!id) return;
    const res = await axios.post(`/recipes/${id}/views`);
    const nextViews = res?.data?.views;
    dispatch(updateRecipeViewsLocal({ id, views: nextViews }));
  } catch (error) {
    console.log(error);
  }
};
