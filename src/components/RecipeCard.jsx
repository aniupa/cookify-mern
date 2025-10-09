import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../cssFiles/cards.module.css";

import navStyles from "../cssFiles/Navbar.module.css";

const RecipeCard = ({ item }) => {
  const { id, image, title, description, instruction, ingredients } = item;
  return (
    <NavLink
      to={`/recipes/details/${id}`}
      className={({ isActive }) => (isActive ? navStyles.isActive : "")}
    >
      <div className={styles.recipeCard}>
        <img src={image} alt={title} />
        <h1>{title}</h1>
        <p>
          {description}... <small>more</small>
        </p>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
