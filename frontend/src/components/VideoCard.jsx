
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../pages/Videos/recipeVideos.module.scss";
import { asyncIncrementRecipeViews } from "../store/actions/recipeAction";

const VideoCard = ({ video }) => {
  const { _id, imageUrl, videoUrl, title, views } = video;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const parsedTime = Number(video?.time);
  const duration = Number.isFinite(parsedTime) ? `${parsedTime} min` : "20 min";

  const getYoutubeId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(videoUrl);
  const [play, setPlay] = useState(false);
  const viewCount = Number.isFinite(Number(views)) ? Number(views) : 0;

  const handleView = () => {
    if (_id) {
      dispatch(asyncIncrementRecipeViews(_id));
    }
  };

  const handlePlay = () => {
    handleView();
    setPlay(true);
  };

  const handleWatch = (event) => {
    event.stopPropagation();
    handleView();
    window.open(videoUrl, "_blank");
  };

  const handleViewRecipe = (event) => {
    event.stopPropagation();
    navigate(`/recipes/details/${_id}`);
  };
  return (
    <div
      className={styles.videoCard}
      onClick={handlePlay}
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
    >
      <div className={styles.thumb}>
        {play && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0`}
            title={title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <img src={imageUrl} alt={title} />
        )}

        <span className={styles.duration}>{duration}</span>
        <span className={styles.playIcon}>▶</span>
      </div>

      <h3>{title}</h3>

      <div className={styles.meta}>
        <span>👁️ {viewCount}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={handleWatch}>Watch</button>

        <button onClick={handleViewRecipe}>View Recipe</button>
      </div>
    </div>
  );
};

export default VideoCard;
