import React, { useContext } from "react";
import styles from "../cssFiles/cards.module.css";
import { AppContent } from "../context/recipeContext";
import { NavLink } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
const Recipes = () => {
  const { addRecipe, recipe } = useContext(AppContent);
  const renderRecipe = recipe.map((item) => (
    <RecipeCard key={item.id} item={item} />
  ));
  return <div className={styles.recipeContainer}>
    {recipe.length>0 ? renderRecipe:'No recipes found !'}
  </div>;
};

export default Recipes;
