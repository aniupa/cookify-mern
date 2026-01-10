import React from "react";
import TrueFocus from "../utils/animations/trueFocus/trueFocus.jsx";
// import { lazy } from "react";
import { useRef } from "react";
import ImageTrail from "../utils/animations/imageTrails/imageTrails.jsx";
import VariableProximity from "../utils/animations/VariableProximity/VariableProximity.jsx";
////////////

/////////////////
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
  const containerRef = useRef(null);
  const userId = useSelector((state) => state?.users?.data?.data?.user?._id);
  useEffect(() => {
    if (userId) {
      dispatch(asyncGetLimitRecipies(6));
    }
  }, [dispatch, userId]);
  // const { recipe, fetchRecipes, isLoading } = useInfiniteRecipe();
  const recipe = useSelector((state) => state.recipes.data);
  const recipeList = Array.isArray(recipe) ? recipe.slice(0, 6) : [];

  const renderRecipe = recipeList.map((item, i) => {
    return <HomeRecipeCard key={item?._id || i} item={item} />;
  });
  const renderImageTrail = recipeList.map((item, i) => {
    return (
      <ImageTrail
        key={item?.id || i}
        items={[
          "https://unsplash.com/photos/a-hamburger-sitting-on-top-of-a-wooden-cutting-board-Fo80DfhsJUk",
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
          "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
        ]}
        variant={2}
      />
    );
  });
  const exploreRecipes = () => {
    if (!userId) return;
    navigate(`/user/${userId}/recipes/`);
  };
  const viewVideos = () => {
    console.log("videos");
    navigate("/recipes/videos");
  };
  return (
    <>
      <section className={styles.heroWrapper}>
        <header className={styles.navbar}>
          <TrueFocus />
        </header>

        <div className={styles.heroContent}>
          {/* Left Image */}
          <div className={styles.heroImage}>
            <div
              style={{
                height: "500px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {renderImageTrail}
            </div>
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
        <div ref={containerRef} style={{ position: "relative" }}>
          <VariableProximity
            label={"Hand-picked dishes loved by our community"}
            className={"variable-proximity-demo"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
      </div>

      <section className={styles.recipesSection}>
        <div className={styles.recipesInner}>
          {recipeList.length ? renderRecipe : "No recipes found"}
        </div>

        <div className={styles.viewAllWrap}>
          <button className={styles.viewAllBtn} onClick={exploreRecipes}>
            View All Recipes
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
