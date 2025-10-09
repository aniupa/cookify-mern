import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContent } from "../context/recipeContext";
import { useNavigate } from "react-router-dom";
import styles from "../cssFiles/singlePage.module.css";
import { toast } from "react-toastify";
// import cardStyle from "../cssFiles/cards.module.css";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const params = useParams();
  let { recipe, addRecipe, setrecipe } = useContext(AppContent);
  const filteredData = recipe.find((f) => f.id == params.id);
  const { image, title, description, ingredients, instruction } = filteredData;
  const delItem = () => {
    const newItems = recipe.filter((f) => f.id !== params.id);

    setrecipe(newItems);
    navigate("/recipes");
    toast.success(`${title} deleted successfully  !!`);
  };
  return (
    <div className={styles.recipeContainer}>
      {recipe ? (
        <div className={styles.recipeCard}>
          <img src={image} alt={title} />

          <h1>Title:{title}</h1>
          <p>Description:{description}</p>
          <h3>Instruction:{instruction}</h3>
          <h5>Ingredients:{ingredients}</h5>
          <div className={styles.btnContainer}>
            <button onClick={navigate(-1)}>Go Back</button>
            <button className={styles.del} onClick={delItem}>
              Delete Recipe
            </button>
          </div>
        </div>
      ) : (
        <h5>loading...</h5>
      )}
    </div>
  );
};

export default SingleRecipe;
