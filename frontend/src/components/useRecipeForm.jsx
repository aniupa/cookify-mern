
// src/hooks/useRecipeForm.js
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  asyncAddRecipeActions,
  asyncUpdateRecipeHandler,
} from "../store/actions/recipeAction";
// import {,
// } from "../store/actions/recipeAction";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function useRecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  const userId = useSelector((state) => state?.users?.data?.data?.user?._id);

  const createRecipeHandler = useCallback(
    async (data) => {
      if (!userId) return;
      dispatch(asyncAddRecipeActions(data, userId));
      navigate(`/user/${userId}/recipes/`);
      // console.log(data);
      
    },
    [dispatch, navigate, userId]
  );
 
  const updateRecipeHandler = useCallback(
    async (data) => {
      const id = params.id;
      if (!id || !userId) return;
      await dispatch(asyncUpdateRecipeHandler({ id, data }));
      navigate(`/user/${userId}/MyRecipes`);
    },
    [dispatch, navigate, params.id, userId]
  );

  return { createRecipeHandler, updateRecipeHandler };
}
