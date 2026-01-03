import { NavLink } from "react-router-dom";
import styles from "../cssFiles/Navbar.module.css";
import userStyles from "../cssFiles/userUi.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/reducers/UserSlice";
// import { useNavigate } from "react-router-dom";
// const navigate=useNavigate();
const Navbar = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.users.data);
  const logoutHandler = () => {
    dispatch(resetUser());
    // navigate('/home');
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
                src={isUser?.image ? isUser?.image : "../assets/unlike-removebg-preview.png"}
                alt={isUser?.image}
                className={styles._logo}
              />

            </NavLink>
            <NavLink
              to={`/user/${isUser.data.user._id}/MyRecipes`}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              MyRecipes
              
            </NavLink>
            <NavLink
            // /user/:id/AddRecipe/</>
              to={`/user/${isUser.data.user._id}/AddRecipe/`}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Create Recipe
            </NavLink>
            <NavLink
              to={`/user/${isUser.data.user._id}/favorites`}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Favorites
            </NavLink>
            <NavLink
              to="/register"
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
              to={"/"}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Login
            </NavLink>
          </>
        )}
        <NavLink
          to={`/user/${isUser.data.user._id}/Home`}
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
          to={`/user/${isUser.data.user._id}/recipes/`}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Recipes
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
