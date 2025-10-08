import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/AddRecipe"
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >Create Recipe</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
