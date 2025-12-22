import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../cssFiles/cards.module.css";
import { useDispatch } from "react-redux";
import { asyncAddToFavorite } from "../store/actions/recipeAction";
import { toast } from "react-toastify";

const RecipeCard = ({ item }) => {
  const nav = useNavigate();

  const {
    _id,
    imageUrl,
    title,
    description,
    time = "30 min",
    difficulty = "Easy",
    fav = false,
    onView,
    onToggleFavorite,
  } = item;
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  const filteredData = recipe?.find((f) => f._id == _id);
  const favorite = () => {
    //testing logic
    const favResult = !filteredData.fav;
    // console.log(item);

    dispatch(asyncAddToFavorite({ _id, favResult }));
    toast.success(`${title} added to favorites!!!`);
    //test ends
  };

  const viewRecipe = () => {
    nav(`/recipes/details/${_id}`);
    
  };
  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={title} />

        <button
          className={`${styles.favoriteBtn} ${fav ? styles.active : ""}`}
          onClick={favorite}
          aria-label="Save recipe"
        >
          ♥
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {/* Meta Info */}
        <div className={styles.meta}>
          <span>⏱ {time ? time : "5min"}</span>
          <span>⭐ {difficulty ? difficulty : 5}</span>
        </div>

        {/* CTA */}
        <button className={styles.viewBtn} onClick={viewRecipe}>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
