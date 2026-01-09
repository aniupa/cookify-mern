import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "../cssFiles/Navbar.module.css";
import userStyles from "../cssFiles/userUi.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/reducers/UserSlice";
// import { useNavigate } from "react-router-dom";
// const navigate=useNavigate();
const Navbar = () => {
  const dispatch = useDispatch();
  // const isUser = useSelector((state) => state.users.data);
  const isUser = useSelector((state) => state?.users?.data?.data?.user);
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(resetUser());
    // navigate('/home');
  };
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.navbar}>
      <button
        type="button"
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="navbar-links"
        aria-label="Toggle navigation"
      >
        ...
      </button>
      <nav
        id="navbar-links"
        className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ""}`}
      >
        {/* protected routes */}
        {isUser ? (
          <>
          
          
            <NavLink
              to={`/user/${isUser._id}/profile`}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              <img 
                src={isUser?.avatar ? isUser.avatar : `https://ui-avatars.com/api/?name=${
                isUser?.username || 'avatar'
              }+User&background=355F5B&color=fff`
            }
                alt=''
                className={styles.avatar}
              />

            </NavLink>
            <NavLink
              to={`/user/${isUser._id}/MyRecipes`}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              MyRecipes
              
            </NavLink>
            <NavLink
            // /user/:id/AddRecipe/</>
              to={`/user/${isUser._id}/AddRecipe/`}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Create Recipe
            </NavLink>
            <NavLink
              to={`/user/${isUser._id}/favorites`}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Favorites
            </NavLink>
            <NavLink
              to="/register"
              onClick={() => {
                localStorage.removeItem("token");
                logoutHandler();
                closeMenu();
              }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to={"/register"}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Register
            </NavLink>
            <NavLink
              to={"/"}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.isActive : "")}
            >
              Login
            </NavLink>
          </>
        )}
        <NavLink
          to={`/user/${isUser._id}/Home`}
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          About
        </NavLink>
        <NavLink
          to={`/user/${isUser._id}/recipes/`}
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Recipes
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
