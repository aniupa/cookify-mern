import React, { useContext, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContent } from "../context/recipeContext";
import { useNavigate } from "react-router-dom";
import styles from "../cssFiles/singlePage.module.css";
import { toast } from "react-toastify";
import likeImg from "../assets/like-removebg-preview.png";
import unlikeImg from "../assets/unlike-removebg-preview.png";

const SingleRecipe = () => {
  // const [like, setlike] = useState();
  const navigate = useNavigate();
  const params = useParams();
  let { recipe, addRecipe, setrecipe } = useContext(AppContent);
  const filteredData = recipe.find((f) => f.id == params.id);
  const favorite = () => {
    const index = recipe.findIndex((i) => i.id == filteredData.id);
    if (index === -1) return;
    // recipe[index].fav ? toast.success('added to favorite successfully'): toast.error('removed from favorites')

    const updatedRecipe = { ...recipe[index], fav: !recipe[index].fav };
    const copyData = [...recipe];
    copyData[index] = updatedRecipe;
    setrecipe(copyData);
    updatedRecipe.fav
      ? toast.success("added to favorites!!")
      : toast.error("removed from favorites !!");
  };

  const delItem = () => {
    toast.success(`recipe deleted successfully  !!`);
    const newItems = recipe.filter((f) => f.id !== params.id);

    setrecipe(newItems);

    navigate("/recipes");
  };
  if (!filteredData) return <h1>Loading recipe...</h1>;

  return (
    <div className={styles.recipeContainer}>
      {recipe ? (
        <div className={styles.recipeCard}>
          {filteredData ? (
            <img
              className={styles.recipeImg}
              src={filteredData?.image}
              alt={filteredData?.title}
            />
          ) : (
            <h1>Loading...</h1>
          )}

          <img
            src={filteredData?.fav ? likeImg : unlikeImg}
            alt="like img"
            className={styles.like}
            onClick={() => {
              favorite();
            }}
          />

          <h1>Title:{filteredData?.title}</h1>
          <p>Description:{filteredData?.description}</p>
          <h3>Instruction:{filteredData?.instruction}</h3>
          <h5>Ingredients:{filteredData?.ingredients}</h5>
          <div className={styles.btnContainer}>
            <button className={styles.positivebtn} onClick={() => navigate(-1)}>
              Go Back
            </button>
            <button className={styles.negativebtn} onClick={delItem}>
              Delete Recipe
            </button>
            <NavLink
              to={`/recipe/update/${params.id}`}
              className={styles.positivebtn}
            >
              Update
            </NavLink>
          </div>
        </div>
      ) : (
        <h5>loading...</h5>
      )}
    </div>
  );
};

export default SingleRecipe;
