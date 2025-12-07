import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { useState } from "react";

import { asyncGetRecipeActions } from "../store/actions/recipeAction";
import { loadRecipe, loadLazyRecipe } from "../store/reducers/RecipeSlice";
const useRegister = () => {
  const dispatch = useDispatch();

  //---pagination from here
  const recipe = useSelector((state) => state.recipes.data) || [];
  // recipe='here';

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`/recipes?page=${page}&limit=6`);
      // console.log(recipe);
      const newItems = res.data?.recipes ?? [];
      // DEBUG: inspect ids (remove in prod)
      console.log(
        "fetched ids:",
        newItems.map((i) => i._id ?? i.id)
      );
      const existingIds = new Set(recipe.map((r) => r._id ?? r.id));
      const itemsToAdd = newItems.filter(
        (i) => !existingIds.has(i._id ?? i.id)
      );
      if (itemsToAdd.length > 0) {
        dispatch(loadLazyRecipe(itemsToAdd));
      } else {
        console.log("no new items to add (duplicates filtered)");
      }
      // dispatch(loadLazyRecipe(res.data.recipes));
      // setHasMore(res.data.hasMore);
      setHasMore(Boolean(res.data?.hasMore));

      setPage((prev) => prev + 1);
      console.log(res.data.recipes.map((r) => r._id));
      console.log(page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  return { recipe, hasMore, fetchRecipes ,isLoading };
};

export default useRegister;
