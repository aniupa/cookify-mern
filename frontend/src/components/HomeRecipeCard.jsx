import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from "../cssFiles/Home.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomeRecipeCard = ({item}) => {
  
const nav = useNavigate();
  const {
    _id,
    imageUrl,
    title,
    description,
    time = 30,
    difficulty = "Easy",
    fav = false,
    onView,
    onToggleFavorite,
  } = item;
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  const filteredData = recipe?.find((f) => f._id == _id);
  // useEffect(()=>{console.log(_id);
  // },[])
  const favorite = () => {
    //testing logic
    const favResult = !filteredData.fav;
    console.log(_id);

    dispatch(asyncAddToFavorite({ _id, favResult }));
    toast.success(`${title} added to favorites!!!`);
    //test ends
  };

  const viewRecipe = () => {
    nav(`/recipes/details/${_id}`);
    
  };
  const parsedTime = Number(time);
  const displayTime = Number.isFinite(parsedTime) ? `${parsedTime} mins` : "N/A";
  const difficultyLabel = Number.isFinite(parsedTime)
    ? parsedTime < 30
      ? "⭐"
      : parsedTime < 60
        ? "⭐⭐"
        : "⭐⭐⭐"
        //
    : difficulty || "Easy";
  const viewCount = Number.isFinite(Number(item?.views)) ? Number(item.views) : 0;
  return (
    // <div></div>
     <div className={styles.categorySlider}> 
      <div className={styles.card} onClick={viewRecipe}>
         <div className={styles.imageWrapper}>
        <img  src={imageUrl? imageUrl:'loading'}
            alt={title? title:""}/>
      </div>
          
          <div className={styles.cardTextCorner}>
            <h4 className={styles.title}>{title? title:""}</h4>
            <p className={styles.description}>{description? description:""}</p>
              <div className={styles.meta}>
                <span>⏱️ {displayTime}</span>
                <span>{difficultyLabel}</span>
                <span>👁️ {viewCount}</span>
              </div>
          </div>
          </div>
          
        </div> 
        
  )
}

export default HomeRecipeCard
