import React, { useContext } from "react";
// import { AppContent } from "../context/recipeContext";
import RecipeCard from "../components/RecipeCard";
import styles from "../cssFiles/cards.module.css";


const Favorites = () => {
  // const { recipe } = useContext(AppContent);
  const filtered = recipe.filter((f) => f.fav == true);
  const mapped = filtered.map((item) => (
    <RecipeCard key={item.id} item={item} />
  ));
  return <div className={styles.recipeContainer}>
    {filtered.length > 0 ? mapped: 'No Favorites found !!'}
  </div>
};

export default Favorites;
