import React, { useContext, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../cssFiles/singlePage.module.css";
import { toast } from "react-toastify";
import likeImg from "../assets/like-removebg-preview.png";
import unlikeImg from "../assets/unlike-removebg-preview.png";
import { useSelector } from "react-redux";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const params = useParams();
  const recipe=useSelector((state)=>state.recipes.data)
  const filteredData = recipe.find((f) => f.id == params.id);
  const favorite = () => {
    const index = recipe.findIndex((i) => i.id == filteredData.id);
    // console.log(index);
    
    if (index === -1) return;
    // recipe[index].fav ? toast.success('added to favorite successfully'): toast.error('removed from favorites')
    const recipe=useSelector((state)=>state.recipes.data)
    
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
