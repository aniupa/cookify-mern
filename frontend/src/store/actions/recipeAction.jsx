import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { loadRecipe } from "../reducers/recipeSlice";
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
