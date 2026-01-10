import React, { useEffect, useState,useRef } from "react";
import styles from "../cssFiles/userUi.module.css";
import RecipeCard from "../components/RecipeCard";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { asyncUpdateUser } from "../store/actions/userAction";
import formStyles from "../styles/formStyles.module.css";
import { asyncGetFavoritesActions ,asyncGetMyRecipeActions} from "../store/actions/recipeAction";

import VariableProximity from "../utils/animations/VariableProximity/VariableProximity.jsx";

const Profile = () => {
  // const [activeTab, setActiveTab] = useState("recipes");
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const currentUser = useSelector((state) => state?.users?.data?.data?.user);

  const userRecipes = useSelector((state) => state?.recipes?.MyRecipes);
  const favorites = useSelector((state) => state?.favorites?.data) || [];

  const recipeCount = Array.isArray(userRecipes) ? userRecipes.length : 0;
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;
  const joinedYear = currentUser?.createdAt
    ? new Date(currentUser.createdAt).getFullYear()
    : 2026;
  const [randomBio, setRandomBio] = useState("");
  const bioText =
    currentUser?.bio ||
    randomBio ||
    "Home cook sharing simple and tasty recipes.";

    
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  //   console.log(currentUser);

  const submitHandler = (data) => {
    if (!currentUser?._id) return;
    dispatch(asyncUpdateUser(currentUser._id, data));
  };

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(asyncGetMyRecipeActions(currentUser._id));
    }
  }, [dispatch, currentUser?._id]);

  useEffect(() => {
    reset({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
    });
  }, [currentUser?.username, currentUser?.email, reset]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(asyncGetFavoritesActions(currentUser._id));
    }
  }, [dispatch, currentUser?._id]);

  useEffect(() => {
    let isActive = true;
    if (!currentUser?.bio && !randomBio) {
      axios
        .get("/random-bio")
        .then((res) => {
          if (!isActive) return;
          const nextBio = res?.data?.bio;
          if (typeof nextBio === "string" && nextBio.trim().length > 0) {
            setRandomBio(nextBio);
          }
        })
        .catch(() => {});
    }
    return () => {
      isActive = false;
    };
  }, [currentUser?.bio, randomBio]);
  return (
    
    <section className={styles.profilePage}>
      {/* PROFILE CARD */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          
           <img
            src={
              currentUser?.avatar ||
              `https://ui-avatars.com/api/?name=${
                currentUser?.username || "cookify"
              }+User&background=2f7f6f&color=fff`
            }
            alt="user avatar"
          />
        </div>

        <div className={styles.info}>
          <h2>{currentUser?.username || "Anonymous"}</h2>
          
           <div ref={containerRef} style={{ position: "relative" }}>
                   <span className={styles.bio}>  <VariableProximity
                       label={bioText}
                       className={"variable-proximity-demo"}
                       fromFontVariationSettings="'wght' 400, 'opsz' 9"
                       toFontVariationSettings="'wght' 1000, 'opsz' 40"
                       containerRef={containerRef}
                       radius={100}
                       falloff="linear"
                     /> </span>
                     </div>
         

          <div className={styles.stats}>
            <div>
              <strong>{recipeCount}</strong>
              <span>Recipes</span>
            </div>
            <div>
              <strong>{favoritesCount}</strong>
              <span>Favorites</span>
            </div>
            <div>
              <strong>{joinedYear}</strong>
              <span>Joined</span>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE */}
      <div className={styles.updateCard}>
        <div className={styles.updateHeader}>
          <h3>Update Profile</h3>
          <p>Keep your details fresh for the Cookify community.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <label className={styles.field}>
            <span>Username</span>
            <input type="text" placeholder="Username" {...register("username")} />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input type="email" placeholder="Email" {...register("email")} />
          </label>
          <label className={styles.field}>
            <span>New Password</span>
            <input
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              {...register("password")}
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </section>
  );
};


export default Profile;
