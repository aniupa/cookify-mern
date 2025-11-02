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

  const renderRecipe = recipe?.map((item, i) => {
    return <RecipeCard key={item?._id || i} item={item} />;
  });
  return (
    <>
      {" "}
      {/* recipe search karne ke liye option incomplete */}
      <input
        type="search"
        className={styles.search}
        placeholder="Search recipe   🔍"
      />
      <div className={styles.container}>
        <p className={styles.veg}>Veg</p>
        <input id="foodType" type="radio" /> <p className={styles.nonVeg}>Non-Veg</p>
        <input id="foodType" type="radio" />
      </div>
      <div className={styles.recipeContainer}>
        {recipe && recipe.length > 0 ? renderRecipe : "No recipes found !"}
      </div>
    </>
  );
};

export default Recipes;
