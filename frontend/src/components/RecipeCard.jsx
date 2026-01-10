import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../cssFiles/cards.module.css";
import { useDispatch } from "react-redux";
import { asyncAddToFavorite } from "../store/actions/recipeAction";
import { toast } from "react-toastify";
import PixelTransition from "../utils/animations/PixelTransition/PixelTransition";
const RecipeCard = ({ item, showOwnerActions = false, onEdit, onDelete }) => {
  const nav = useNavigate();
  const currentUserId = useSelector(
    (state) => state?.users?.data?.data?.user?._id
  );

  const {
    _id,
    imageUrl,
    title,
    description,
    time = 30,
    difficulty = "easy",
    fav = false,
    views,
    onView,
    onToggleFavorite,
  } = item;
  const dispatch = useDispatch();
  const ownerId = item?.createdBy?._id ?? item?.createdBy;
  const isOwner = currentUserId && String(ownerId) === String(currentUserId);
  const parsedTime = Number(time);
  const displayTime = Number.isFinite(parsedTime) ? parsedTime : 0;
  const displayDifficulty = () => {
    if (displayTime < 30) {
      return 'Easy';
    }
    if (displayTime >= 30 && displayTime < 60) {
      return "Medium";
    } else {
      return `Hard`;
    }
  };
  const stars = () => {
    if (displayTime < 30) {
      return "⭐";
    }
    if (displayTime >= 30 && displayTime < 60) {
      return "⭐⭐";
    } else {
      return `⭐⭐⭐`;
    }
  };
  const favorite = () => {
    const favResult = !fav;

    dispatch(asyncAddToFavorite({ _id, favResult }));
    toast.success(
      favResult
        ? `${title} added to favorites!`
        : `${title} removed from favorites!`
    );
  };

  const viewRecipe = () => {
    nav(`/recipes/details/${_id}`);
  };
  const viewCount = Number.isFinite(Number(views)) ? Number(views) : 0;
  return (
    <div className={styles.card}>
      {/* Image Section */}

      <div className={styles.imageWrapper}>
        <PixelTransition
          firstContent={
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#111",
              }}
            >
              <p
                style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}
              >
                {title}
              </p>
            </div>
          }
          gridSize={12}
          pixelColor="#ffffff"
          once={false}
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
        <button
          className={`${styles.favoriteBtn} ${
            fav ? styles.active : styles.unActive
          }`}
          onClick={favorite}
          aria-label="Save recipe"
        >
          ♥
        </button>
        {/* <img src={imageUrl} alt={title} /> */}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {/* Meta Info */}
        <div className={styles.meta}>
          <span>⏱️ {displayTime} mins</span>
          <span>
            {" "}
            {stars()}
            {displayDifficulty()}
          </span>
          <span className={styles.views}>👁️ {viewCount}</span>
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          <button className={styles.viewBtn} onClick={viewRecipe}>
            View Recipe
          </button>
          {showOwnerActions && isOwner ? (
            <div className={styles.ownerActions}>
              <button className={styles.editBtn} onClick={onEdit}>
                Edit
              </button>
              <button className={styles.deleteBtn} onClick={onDelete}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
