import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../cssFiles/cards.module.css";
import axios from "../utils/axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import RecipeCard from "../components/RecipeCard";
import { asyncGetRecipeActions } from "../store/actions/recipeAction";
import { loadRecipe,loadLazyRecipe } from "../store/reducers/recipeSlice";
import End from "./End";
const Recipes = () => {
  const dispatch = useDispatch();
  
  //---pagination from here
  const recipe=useSelector((state)=>state.recipes.data);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`/recipes?page=${page}&limit=6`);
      
      dispatch(loadLazyRecipe(res.data.recipes));
      setHasMore(res.data.hasMore);

      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  //----end here

  const renderRecipe = recipe?.map((item, i) => {
    return <RecipeCard key={item?._id || i} item={item} />;
  });
  return (
    <>
      {" "}
      {/* recipe search karne ke liye option incomplete */}
      <input
        type="search"
        className={styles.search}
        placeholder="Search recipe   🔍"
      />
      <div className={styles.container}>
        <p className={styles.veg}>Veg</p>
        <input id="foodType" type="radio" />{" "}
        <p className={styles.nonVeg}>Non-Veg</p>
        <input id="foodType" type="radio" />
      </div>
      
        {recipe && recipe.length > 0 ? (
          <InfiniteScroll
            dataLength={recipe.length}
            next={fetchRecipes}
            hasMore={hasMore}
            endMessage={<End/>}
            loader={<h2>Loading...</h2>}
          >
            <div className={styles.recipeContainer}>{renderRecipe}</div>
            
          </InfiniteScroll>
        ) : (
          "No recipes found !"
        )}
      {/* </div> */}
    </>
  );
};

export default Recipes;
