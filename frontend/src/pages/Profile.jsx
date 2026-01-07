import React, { useState } from "react";
import like from "../assets/like-removebg-preview.png";
import styles from "../cssFiles/userUi.module.css";
// import HomeRecipeCard from "../components/HomeRecipeCard";
import RecipeCard from "../components/RecipeCard";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import formStyles from "../styles/formStyles.module.css";

const Profile = ({ user }) => {
  // const [activeTab, setActiveTab] = useState("recipes");

  const { id } = useParams();

  const currentUser = useSelector((state) => state?.users?.data?.data?.user);

  const userRecipes = useSelector((state) => state?.recipes?.MyRecipes);


    
  const { register, handleSubmit } = useForm({
    default: { username: currentUser?.username },
  });
  //   console.log(currentUser);

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    
    <section className={styles.profilePage}>
      {/* PROFILE CARD */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
           <img
            src={
              currentUser?.avatar ||
              `https://ui-avatars.com/api/?name=${
                currentUser?.username || cookify
              }+User&background=2f7f6f&color=fff`
            }
            alt="user avatar"
          />
        </div>

        <div className={styles.info}>
          <h2>{user?.username || "prakash"}</h2>
          <p className={styles.bio}>
            Home cook sharing simple & tasty recipes 🍳
          </p>

          <div className={styles.stats}>
            <div>
              <strong>{userRecipes.length || 0}</strong>
              <span>Recipes</span>
            </div>
            <div>
              <strong>2024</strong>
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
