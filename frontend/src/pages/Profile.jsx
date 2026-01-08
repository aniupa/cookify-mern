import React, { useEffect, useState } from "react";
import like from "../assets/like-removebg-preview.png";
import styles from "../cssFiles/userUi.module.css";
// import HomeRecipeCard from "../components/HomeRecipeCard";
import RecipeCard from "../components/RecipeCard";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { asyncUpdateUser } from "../store/actions/userAction";
import formStyles from "../styles/formStyles.module.css";

const Profile = () => {
  // const [activeTab, setActiveTab] = useState("recipes");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state?.users?.data?.data?.user);

  const userRecipes = useSelector((state) => state?.recipes?.MyRecipes);

  const recipeCount = Array.isArray(userRecipes) ? userRecipes.length : 0;
  const joinedYear = currentUser?.createdAt
    ? new Date(currentUser.createdAt).getFullYear()
    : "N/A";
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
    reset({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
    });
  }, [currentUser, reset]);

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
                currentUser?.username || ""cookify""
              }+User&background=2f7f6f&color=fff`
            }
            alt="user avatar"
          />
        </div>

        <div className={styles.info}>
          <h2>{currentUser?.username || "Anonymous"}</h2>
          <p className={styles.bio}>
            {bioText}
          </p>

          <div className={styles.stats}>
            <div>
              <strong>{recipeCount}</strong>
              <span>Recipes</span>
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
        <h3>Update Profile</h3>

        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <input type="text" placeholder="Username" {...register("username")} />
          <input type="email" placeholder="Email" {...register("email")} />
          <input
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            {...register("password")}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </section>
  );
};


export default Profile;
