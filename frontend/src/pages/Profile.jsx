import React, { useEffect, useState } from "react";
import like from "../assets/like-removebg-preview.png";
import styles from "../cssFiles/userUi.module.css";
// import HomeRecipeCard from "../components/HomeRecipeCard";
import RecipeCard from "../components/RecipeCard";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import formStyles from "../styles/formStyles.module.css";

const Profile = () => {
  // const [activeTab, setActiveTab] = useState("recipes");

  const currentUser = useSelector((state) => state?.users?.data?.data?.user);

  const userRecipes = useSelector((state) => state?.recipes?.MyRecipes);

  const recipeCount = Array.isArray(userRecipes) ? userRecipes.length : 0;
  const joinedDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toISOString().slice(0, 10)
    : "N/A";
  const [randomBio, setRandomBio] = useState("");
  const bioText =
    currentUser?.bio ||
    randomBio ||
    "Home cook sharing simple and tasty recipes.";

    
  const { register, handleSubmit } = useForm({
    default: { username: currentUser?.username },
  });
  //   console.log(currentUser);

  const submitHandler = (data) => {
    console.log(data);
  };

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
              <strong>{joinedDate}</strong>
              <span>Joined</span>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE */}
      <div className={styles.updateCard}>
        <h3>Update Profile</h3>

        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="New Password" />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </section>
  );
};


export default Profile;
