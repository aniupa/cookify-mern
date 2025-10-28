import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../cssFiles/cards.module.css";

import RecipeCard from "../components/RecipeCard";
import { asyncGetRecipeActions } from "../store/actions/recipeAction";
const Recipes = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  

  useEffect(() => {
    
     dispatch(asyncGetRecipeActions());
    

  }, [dispatch]);

  const renderRecipe = recipe?.map((item,i) => {
    
    return <RecipeCard key={item?._id || i} item={item} />;
  });
  return (
    <div className={styles.recipeContainer}>
      {recipe && recipe.length > 0 ? renderRecipe : "No recipes found !"}
    </div>
  );
};

export default Recipes;
