import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../pages/Videos/recipeVideos.module.css";
import { useDispatch } from "react-redux";
import { asyncAddToFavorite } from ".././store/actions/recipeAction";
import { toast } from "react-toastify";
import { useEffect } from "react";

const VideoCard = ({ video }) => {
  const {
    _id,
    imageUrl,
    // imageUrlthumbnail = imageUrl,
    title,
    description,
    time = "30 min",
    difficulty = "Easy",
    // duration=20,
    rating = 4,
    fav,
    onView,
    onToggleFavorite,
    views = 164,
  } = video;
  const duration = "20 mins";
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  const filteredData = recipe?.find((f) => f._id == _id);
// videoSkeleton
  const viewRecipe = () => {
    nav(`/recipes/details/${_id}`);
  };
  return (
    <div className={styles.videoCard}>
      {/* //playIcon */}
      <div className={styles.thumb}>
        <img
          src={imageUrl ? imageUrl : <h1>Loading...</h1>}
          alt={title}
        />
        <span className={styles.duration}>{duration}</span>
        <span className={styles.playIcon}>▶</span>
      </div>

      <h3>{video.title}</h3>

      <div className={styles.meta}>
        <span>⭐ {rating}</span>
        <span>👁 {views}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={() => navigate(`/videos/${video._id}`)}>Watch</button>

        <button disabled={!video.recipeId} onClick={() => viewRecipe}>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
