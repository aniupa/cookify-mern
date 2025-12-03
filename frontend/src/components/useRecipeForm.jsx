
// src/hooks/useRecipeForm.js
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  asyncAddRecipeActions,
  asyncUpdateRecipeHandler,
} from "../store/actions/recipeAction";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function useRecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state) => state.recipes.data);
  const params = useParams();
  const defaultRecipe = recipe.find((f) => f.id == params.id);

  const createRecipeHandler = useCallback(
    async (data) => {
      // console.log("useRecipeForm.submitHandler ->", data);

      dispatch(asyncAddRecipeActions(data));
      // dispatch(addRecipe(data));

      navigate("/recipes");
    },
    [dispatch, navigate]
  );
 
  const updateRecipeHandler = async (defaultRecipe) => {
    const id = params.id;
    console.log(id);
    

    dispatch(asyncUpdateRecipeHandler({ id, defaultRecipe }));
    console.log("updateRecipeHandler");

    reset();
    navigate("/recipes");

    toast.success("recipe data updated successfully!!");
    navigate("/recipes");
  };

  return { createRecipeHandler, updateRecipeHandler };
}
