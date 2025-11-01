import { NavLink } from "react-router-dom";
import styles from "../cssFiles/Navbar.module.css";
import userStyles from "../cssFiles/userUi.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/reducers/UserSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.users.data);
  const logoutHandler = () => {
    dispatch(resetUser());
  };
  return (
    <div className={styles.navbar}>
      <nav>
        {/* protected routes */}
        {isUser ? (
          <>
          
          
            <NavLink
              to={`/user/${isUser.data.user._id}/profile`}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              <img
                src={isUser?.image ? isUser?.image : "../assets/like.png"}
                alt={isUser?.image}
                className={userStyles.profile}
              />
            </NavLink>
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
                logoutHandler();
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
