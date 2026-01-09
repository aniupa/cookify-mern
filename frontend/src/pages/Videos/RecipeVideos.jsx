import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../Videos/recipeVideos.module.scss";

import VideoCard from "../../components/VideoCard.jsx";

import RotatingText from "../../utils/animations/RotatingText/RotatingText.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetVideosActions } from "../../store/actions/videosAction.jsx";

const RecipeVideos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const videos = useSelector((state) => state.recipes.Videos) || [];

  // ---- filters from URL ----
  const search = searchParams.get("search");
  const veg = searchParams.get("veg");
  const maxTime = searchParams.get("maxTime");
  const difficulty = searchParams.get("difficulty");
  const trending = searchParams.get("trending");

  const renderVideo = videos?.map((video, i) => {
    return <VideoCard key={video?._id || i} video={video} />;
  });

  useEffect(() => {
    const filters = {};
    if (search) filters.search = search;
    if (veg !== null) filters.veg = veg;
    if (maxTime) filters.maxTime = maxTime;
    if (difficulty) filters.difficulty = difficulty;
    if (trending) filters.trending = trending;
    dispatch(asyncGetVideosActions(filters));
  }, [dispatch, search, veg, maxTime, difficulty, trending]);
  const updateFilter = (key, value) => {
    const params = Object.fromEntries([...searchParams]);
    if (value === null || value === "") delete params[key];
    else params[key] = value;
    setSearchParams(params);
  };

  // const viewRecipe = () => {
  //   // navigate(`/recipes/${videos.recipeId}`);
  //   navigate('')
  // };

  return (
    <section className={styles.videosPage}>
      {/* HERO */}
      <div className={styles.videosHero}>
        <div>
          <h1> Cook Along With Real Recipes</h1>
          <RotatingText
            texts={["Short videos", "Real food", "with", " Cookify"]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          {/* <p>. . .</p> */}
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
      {/* videoSkeleton */}
      {/* VIDEO GRID */}
      {videos && videos.length > 0 ? (
        <div className={styles.videoGrid}>{renderVideo}</div>
      ) : (
        "No recipes found !"
      )}
      {/*  */}
    </section>
  );
};

export default RecipeVideos;
