import React from "react";
import styles from "./SingleRecipe.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import likeImg from "../assets/like-removebg-preview.png";
// import unlikeImg from "../assets/unlike-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";

import { asyncAddToFavorite, asyncIncrementRecipeViews } from "../../store/actions/recipeAction";
import { useEffect } from "react";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const _id = id;
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.data);
  const user = useSelector((state) => state.users.data);
  const filteredData = recipe?.find((f) => f._id == _id);
  const normalizeList = (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      const items = value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      return items;
    }
    return [];
  };
  const ingredients = normalizeList(filteredData?.ingredients);
  const instructions = normalizeList(filteredData?.instructions);

  useEffect(() => {
    if (id) {
      dispatch(asyncIncrementRecipeViews(id));
    }
  }, [dispatch, id]);

  const favorite = (title) => {
    //testing logic
    const favResult = !filteredData.fav;
    dispatch(asyncAddToFavorite({ _id, favResult }));
    if (favResult == true) {
      toast.success(`${filteredData.title} added to favorites!!!`);
    }
    if (favResult == false) {
      toast.success(`${filteredData.title} Removed from favorites!!!`);
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
    // <div className={styles.page}>
    //   <div className={styles.card}>

    //     <header className={styles.header}>
    //       {/* <div> */}
    //         <div className={styles.likeContainer}><h1>{filteredData?.title}</h1>
    //         <h1 className={filteredData.fav? styles.like:styles.unlike} onClick={()=>favorite(filteredData.title)}>💗</h1></div>

    //          <p className={styles.subtitle}>
    //           {filteredData?.description}</p>
    //       {/* </div> */}

    //     </header>

    //     {/* Image */}
    //     <div className={styles.imageWrapper}>
    //        <img
    //         src={filteredData?.imageUrl} alt={filteredData?.title}
    //       />
    //     </div>

    //     {/* Content */}
    //     <section className={styles.content}>
    //       {/* Ingredients */}
    //       <div className={styles.ingredients}>
    //         {filteredData?.ingredients}
    //       </div>

    //       {/* Divider */}
    //       <div className={styles.divider}></div>

    //       {/* Directions */}
    //       <div className={styles.directions}>
    //         {filteredData?.instructions}
    //       </div>
    //     </section>

    //   </div>
    // </div>
    <section className={styles.page}>
      <div className={styles.container}>
        {/* HERO */}
        <div className={styles.hero}>
          <img
            src={filteredData.imageUrl}
            alt={filteredData.title}
            className={styles.heroImage}
          />

          <div className={styles.heroContent}>
            <h1>{filteredData.title}</h1>
            <p className={styles.description}>{filteredData.description}</p>

            {/* META */}
            <div className={styles.meta}>
              <div className={styles.author}>
                <img
                  src={
                    filteredData.createdBy?.avatar ||
                    `https://ui-avatars.com/api/?name=${
                filteredData?.createdBy?.username || 'Anonymous'
              }+User&background=2f7f6f&color=fff`
                  }
                  alt="author"
                />
                
                <div>
                  <span>Created by</span>
                  <strong>{filteredData.createdBy?.username || 'Anonymous'
                  }</strong>
                </div>
              </div>

              <button className={styles.favBtn} onClick={favorite}>
                {filteredData.fav ? "Remove from favorites" : "Add to favorites"}
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* INGREDIENTS */}
          <div className={styles.box}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* INSTRUCTIONS */}
          <div className={styles.box}>
            <h3>Instructions</h3>
            <ol>
              {instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleRecipe;
