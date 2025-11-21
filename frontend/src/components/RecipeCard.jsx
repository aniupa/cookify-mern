import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../cssFiles/cards.module.css";

import navStyles from "../cssFiles/Navbar.module.css";

const RecipeCard = ({ item }) => {
  const { _id, image, title, description, instructions, ingredients } = item;
  return (
    <NavLink
      to={`/recipes/details/${_id}`}
      className={({ isActive }) => (isActive ? navStyles.isActive : "")}
    >
      <div className={styles.recipeCard}>
        
        <img src={image? image:'not image'} alt={title} /> <br />
        <h1>{title?.slice(0,30)}..</h1><br />
        <span className={styles.visibility}>{description?.slice(0,50)}...</span>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
