import React, { useContext } from "react";
import styles from "./cards.module.css";
import { AppContent } from "../context/recipeContext";
const Recipes = () => {
  const { addRecipe, recipe } = useContext(AppContent);
  return (
    <div className={styles.recipeContainer}>
      {recipe.map((item, i) => {
        return (
          <div key={i} className={styles.recipeCard} style={{backgroundImage:`url(${item.recipeImg})`}}>
            
            <button className={styles.cardBtn}>see all</button>
          </div>
        );
      })}
    </div>
  );
};

export default Recipes;
