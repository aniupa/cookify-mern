import React from "react";
import Navbar from "../components/Navbar";
import styles from "../cssFiles/Home.module.css";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteRecipe from "../utils/useInfiniteRecipe.jsx";

import HomeRecipeCard from "../components/HomeRecipeCard";
import End from "./End";
const Home = () => {
  const navigate = useNavigate();
  const { recipe, fetchRecipes,isLoading } = useInfiniteRecipe();

  const renderRecipe = recipe?.map((item, i) => {
    return <HomeRecipeCard key={item?._id || i} item={item} />;
  });
  const exploreRecipes = () => {
    navigate("/recipes");
  };
  return (
    <section className={styles.heroWrapper}>
      <header className={styles.navbar}>
        <div className={styles.logo}>Cookify</div>

        {/* {Navbar} */}

        <button className={styles.contactBtn}>Contact</button>
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
              Explore Recipes
            </button>

            <button className={styles.videoBtn}>
              <span>▶</span> Watch Cooking Videos
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      {/* <div className={styles.categorySlider}> */}
       
        {recipe && recipe.length > 0 ? (
        <InfiniteScroll
          dataLength={6}
          next={fetchRecipes}
          // hasMore={hasMore}
          endMessage={<End />}
          loader={<h2>Loading...</h2>}
        >
          <div className={styles.recipeContainer}>{renderRecipe}</div>
        </InfiniteScroll>
      ) : (
        "No recipes found !"
      )}
      

         

        {/* <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80"
            alt="Sushi"
          />
          <div>
            <h4>Sushi Rolls</h4>
            <p>Fresh. Healthy. The Pride of Japan.</p>
          </div>
        </div>

        <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"
            alt="Cookies"
          />
          <div>
            <h4>Chocolate Cookies</h4>
            <p>Sweet. Crunchy. An all-time favorite.</p>
          </div>
        </div> */}
      {/* </div> */}
    </section>
  );
};

export default Home;
