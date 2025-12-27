import React from "react";
// import { lazy } from "react";
import Navbar from "../components/Navbar";
import styles from "../cssFiles/Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteRecipe from "../utils/useInfiniteRecipe.jsx";
import HomeRecipeCard from "../components/HomeRecipeCard";
import { asyncGetLimitRecipies } from "../store/actions/recipeAction.jsx";
import End from "./End";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetLimitRecipies(6));
  }, []);
  // const { recipe, fetchRecipes, isLoading } = useInfiniteRecipe();
  const recipe = useSelector((state) => state.recipes.data);

  const renderRecipe = recipe?.map((item, i) => {
    return <HomeRecipeCard key={item?._id || i} item={item} />;
  });
  const exploreRecipes = () => {
    navigate("/recipes");
  };
  const viewVideos=()=>{
    console.log('videos');
    navigate('/recipes/videos');
    
  }
  return (
    <>
    
      <section className={styles.heroWrapper}>
        <header className={styles.navbar}>
          <div className={styles.logo}>Cookify</div>
       </header>

        <div className={styles.heroContent}>
          {/* Left Image */}
          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
              alt="Food Dish"
            />
          </div>

          {/* Right Text */}
          <div className={styles.heroText}>
            <h1>
              Taste the World <br /> from Your Kitchen
            </h1>
            <p>
              Unlock a world of flavor with our authentic recipes, learn about
              vibrant food cultures, and turn your kitchen into a gateway to
              global cuisines.
            </p>

            <div className={styles.heroActions}>
              <button className={styles.primaryBtn} onClick={exploreRecipes}>
                Discover Recipes
              </button>

              <button className={styles.videoBtn} onClick={viewVideos}>
                <span>▶</span> Watch & Cook
              </button>
            </div>
          </div>
        </div>

       
      </section>
      <div className={styles.sectionHeader}>
        <h2>Featured Recipes</h2>
        <p>Hand-picked dishes loved by our community</p>
      </div>

      <section className={styles.recipesSection}>
        <div className={styles.recipesInner}>
          {recipe.length ? renderRecipe  : "No recipes found"}
        </div>

        <div className={styles.viewAllWrap}>
          <button className={styles.viewAllBtn} onClick={exploreRecipes}>View All Recipes</button>
        </div>
      </section>
    </>
  );
};

export default Home;
