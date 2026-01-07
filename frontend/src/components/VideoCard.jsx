
import { href, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../pages/Videos/recipeVideos.module.css";

const VideoCard = ({ video }) => {
  const {
    _id,
    imageUrl,
    videoUrl,
    title,
    rating = 4,
    views = 164,
  } = video;

  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const duration = "20 mins";

  const getYoutubeId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(videoUrl);
  const [play, setPlay] = useState(false);
  return (
    <div
      className={styles.videoCard}
      onClick={() => setPlay(true)}
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
        {/* <span>⭐ {rating}</span> */}
        <span>👁 {views}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={()=>window.open(videoUrl, "_blank")} >
          Watch
        </button>

        <button onClick={() => navigate(`/recipes/details/${_id}`)}>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
