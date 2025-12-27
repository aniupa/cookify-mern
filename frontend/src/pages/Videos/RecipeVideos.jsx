import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Videos/recipeVideos.module.scss";
import useInfiniteRecipe from "../../utils/useInfiniteRecipe";

import VideoCard from "../../components/VideoCard.jsx";

import End from "../End";

import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const RecipeVideos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipe, hasMore, fetchRecipes, isLoading } = useInfiniteRecipe();

  const navigate = useNavigate();

  // const [videos, setVideos] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const videos=useSelector(state=>state.recipes.data);

  
  // ---- filters from URL ----
  const veg = searchParams.get("veg");
  const maxTime = searchParams.get("maxTime");
  const difficulty = searchParams.get("difficulty");

 const renderVideo = recipe?.map((video, i) => {
    return <VideoCard key={video?._id || i} video={video} />;
  }); 
  const updateFilter = (key, value) => {
    const params = Object.fromEntries([...searchParams]);
    if (value === null) delete params[key];
    else params[key] = value;
    setSearchParams(params);
  };

  const viewRecipe = () => {
    navigate(`/recipes/${videos.recipeId}`);
  };

  return (
    <section className={styles.videosPage}>
      {/* HERO */}
      <div className={styles.videosHero}>
        <div>
          <h1> Cook Along With Real Recipes</h1>
          <p>Short videos. Real food. No nonsense.</p>
        </div>

        <div className={styles.heroStats}>
          <span>🔥 Trending today</span>
          <span>⏱ Avg video: 8 min</span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Search video..."
          onChange={(e) => updateFilter("search", e.target.value)}
        />

        <button onClick={() => updateFilter("maxTime", "10")}>
          ⏱ Under 10 min
        </button>

        <button onClick={() => updateFilter("veg", "true")}>🌱 Veg</button>
        <button onClick={() => updateFilter("veg", "false")}>🍗 Non-Veg</button>

        <button onClick={() => updateFilter("trending", "true")}>
          🔥 Trending
        </button>

        <select
          onChange={(e) => updateFilter("difficulty", e.target.value)}
          defaultValue=""
        >
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* VIDEO GRID */}
      {recipe && recipe.length > 0 ? (
        <InfiniteScroll
          dataLength={recipe.length}
          next={fetchRecipes}
          hasMore={hasMore}
          endMessage={<End />}
          loader={<h2>Loading...</h2>}
        >
          <div className={styles.videoGrid}>{renderVideo}</div>
        </InfiniteScroll>
      ) : (
        "No recipes found !"
      )}
      {/*  */}
    </section>
  );
};

export default RecipeVideos;
