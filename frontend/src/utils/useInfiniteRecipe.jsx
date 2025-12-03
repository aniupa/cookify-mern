import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { useState } from "react";

import { asyncGetRecipeActions } from "../store/actions/recipeAction";
import { loadRecipe, loadLazyRecipe } from "../store/reducers/RecipeSlice";
const useRegister = () => {
  const dispatch = useDispatch();

  //---pagination from here
  const recipe = useSelector((state) => state.recipes.data);
  // recipe='here';

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`/recipes?page=${page}&limit=6`);

      dispatch(loadLazyRecipe(res.data.recipes));
      setHasMore(res.data.hasMore);

      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  return { recipe, hasMore, fetchRecipes };
};


export default useRegister;
