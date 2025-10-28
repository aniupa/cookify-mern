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
        
        <img src={image? image:'not image'} alt={title} />
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
