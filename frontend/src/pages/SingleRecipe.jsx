
import React from "react";
import styles from "../cssFiles/SingleRecipe.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import likeImg from "../assets/like-removebg-preview.png";
import unlikeImg from "../assets/unlike-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";

import { asyncAddToFavorite } from "../store/actions/recipeAction";
import { useEffect } from "react";



const SingleRecipe = () => {

  
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  const user = useSelector((state) => state.users.data);
  const filteredData = recipe?.find((f) => f._id == id);



  const favorite = (title) => {
    //testing logic
    const favResult = !filteredData.fav;
    dispatch(asyncAddToFavorite({ id, favResult }));
    if (favResult==true) {
      
    toast.success(`${title} added to favorites!!!`)
    }
    if (favResult==false) {
      
    toast.success(`${title} Removed from favorites!!!`)
    }
    //test ends
  };

  const delItem = () => {
    toast.success(`recipe deleted successfully  !!`);
    const newItems = recipe.filter((f) => f.id !== params.id);

    setrecipe(newItems);

    navigate("/recipes");
  };
  if (!filteredData) return <h1>Loading recipe...</h1>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        
        <header className={styles.header}>
          {/* <div> */}
            <div className={styles.likeContainer}><h1>{filteredData?.title}</h1>
            <h1 className={filteredData.fav? styles.like:styles.unlike} onClick={()=>favorite(filteredData.title)}>💗</h1></div>
            
            
             <p className={styles.subtitle}>
              {filteredData?.description}</p>
          {/* </div> */}

        </header>

        {/* Image */}
        <div className={styles.imageWrapper}>
           <img
            src={filteredData?.imageUrl} alt={filteredData?.title}
          />
        </div>

        {/* Content */}
        <section className={styles.content}>
          {/* Ingredients */}
          <div className={styles.ingredients}>
            {filteredData?.ingredients}
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Directions */}
          <div className={styles.directions}>
            {filteredData?.instructions}
          </div>
        </section>

      </div>
    </div>
  );
};

export default SingleRecipe;
