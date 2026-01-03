import React, { useContext, useEffect, useState } from "react";
// import { AppContent } from "../context/recipeContext";
import RecipeCard from "../../components/RecipeCard";
import styles from "../../cssFiles/cards.module.css";


import { useDispatch, useSelector } from "react-redux";
import axios from "../.././utils/axios";
import { asyncGetMyRecipeActions } from "../../store/actions/recipeAction";

const MyRecipes = () => {
  // const { recipe } = useContext(AppContent);
  const userId = useSelector((state) => state.users.data.data.user._id);
  //    const Recipe = useContext(second)
  const dispatch=useDispatch();
  // const [recipe, setrecipe] = useState([]);
  const recipe=useSelector((state)=>state.recipes.MyRecipes)
  useEffect( () => {
    // console.log(isUser);
    
     dispatch(asyncGetMyRecipeActions(userId))
    // setrecipe(user);
  }, [dispatch]);

  // const filtered = recipe.map((f) => console.log(f));
  const mapped = recipe.map((item, i) => (
    <RecipeCard key={item.id ? item.id : i} item={item} />
    
  ));
  return (
    // <>
    // {console.log(recipe)
    // }</>
    <div className={styles.recipeContainer}>
      {mapped?.length > 0 ? mapped : <h2>"No Recipes found !!"</h2>}
    </div>
  );
};

export default MyRecipes;

