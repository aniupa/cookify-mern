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
  const isUnderTen = maxTime === "10";
  const isVeg = veg === "true";
  const isNonVeg = veg === "false";
  const isTrending = trending === "true";

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
  const clearFilters = () => setSearchParams({});
  const topVideo = videos.reduce((top, current) => {
    const topViews = Number.isFinite(Number(top?.views)) ? Number(top.views) : -1;
    const currentViews = Number.isFinite(Number(current?.views))
      ? Number(current.views)
      : 0;
    return currentViews > topViews ? current : top;
  }, null);
  const topVideoTitle =
    typeof topVideo?.title === "string" && topVideo.title.trim()
      ? topVideo.title.trim()
      : "N/A";
  const topVideoTime = Number.isFinite(Number(topVideo?.time))
    ? Number(topVideo.time)
    : null;
  const topVideoText =
    topVideoTitle === "N/A"
      ? "N/A"
      : topVideoTime !== null
        ? `${topVideoTitle} (${topVideoTime} min)`
        : topVideoTitle;

  // const viewRecipe = () => {
  //   // navigate(`/recipes/${videos.recipeId}`);
  //   navigate('')
  // };
  const logger=()=>{
    console.log(topVideo);
    
  }

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
          <span >🔥 Trending today</span>
          <span><img className={styles.trendingImg} src={topVideo.imageUrl} alt={topVideo.title} />{logger()} {topVideoText}</span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Search video..."
          value={search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value)}
        />

        {/* <button
          className={isUnderTen ? styles.activeFilter : ""}
          onClick={() => updateFilter("maxTime", isUnderTen ? "" : "10")}
        >
          {/* Under 10 min */}
        {/* </button> */} 

        <button
          className={isVeg ? styles.activeFilter : ""}
          onClick={() => updateFilter("veg", isVeg ? "" : "true")}
        >
          Veg
        </button>
        <button
          className={isNonVeg ? styles.activeFilter : ""}
          onClick={() => updateFilter("veg", isNonVeg ? "" : "false")}
        >
          Non-Veg
        </button>

        <button
          className={isTrending ? styles.activeFilter : ""}
          onClick={() => updateFilter("trending", isTrending ? "" : "true")}
        >
          Trending
        </button>

        <select
          onChange={(e) => updateFilter("difficulty", e.target.value)}
          value={difficulty ?? ""}
        >
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className={styles.clear} onClick={clearFilters}>Clear</button>
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
