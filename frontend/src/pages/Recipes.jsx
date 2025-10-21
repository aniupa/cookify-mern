import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../cssFiles/cards.module.css";
import {
  loadRecipesFromLocalStorage,
  deleteRecipe,
} from "../store/reducers/recipeSlice";
import RecipeCard from "../components/RecipeCard";
import { asyncGetRecipeActions } from "../store/actions/recipeAction";
const Recipes = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);

  useEffect(() => {
    //testing here
    dispatch(asyncGetRecipeActions());
    // console.log(recipe);
    

    // dispatch(loadRecipesFromLocalStorage());
  }, [dispatch]);

  const renderRecipe = recipe?.map((item) => {
    return <RecipeCard key={item.id} item={item} />;
  });
  return (
    <div className={styles.recipeContainer}>
      {recipe.length > 0 ? renderRecipe : "No recipes found !"}
    </div>
  );
};

export default Recipes;
