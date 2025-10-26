import { NavLink } from "react-router-dom";
import styles from "../cssFiles/Navbar.module.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isUser = useSelector((state) => state.users.data);

  return (
    <div className={styles.navbar}>
      <nav>
        {/* protected routes */}
        {isUser ? (
          <>
            {" "}
            <NavLink
              to="/AddRecipe"
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Create Recipe
            </NavLink>
            <NavLink
              to="/Favorites"
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Favorites
            </NavLink>
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to={"/register"}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Register
            </NavLink>
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Login
            </NavLink>
          </>
        )}
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
      </nav>
    </div>
  );
};

export default Navbar;
