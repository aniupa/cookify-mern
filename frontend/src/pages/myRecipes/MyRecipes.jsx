import React, { useContext, useEffect, useState } from "react";
// import { AppContent } from "../context/recipeContext";
import RecipeCard from "../../components/RecipeCard";
import styles from "../../cssFiles/cards.module.css";


import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteRecipeAction,
  asyncGetMyRecipeActions,
} from "../../store/actions/recipeAction";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
  // const { recipe } = useContext(AppContent);
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.users?.data?.data?.user?._id);
  //    const Recipe = useContext(second)
  const dispatch=useDispatch();
  // const [recipe, setrecipe] = useState([]);
  const recipe=useSelector((state)=>state.recipes.MyRecipes)
  useEffect( () => {
    // console.log(isUser);
    
     if (userId) {
       dispatch(asyncGetMyRecipeActions(userId));
     }
    // setrecipe(user);
  }, [dispatch, userId]);

  // const filtered = recipe.map((f) => console.log(f));
  const handleEdit = (id) => {
    navigate(`/user/${userId}/recipe/update/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(asyncDeleteRecipeAction(id));
  };

  const mapped = (recipe || []).map((item, i) => (
    <RecipeCard
      key={item.id ? item.id : i}
      item={item}
      showOwnerActions
      onEdit={() => handleEdit(item._id ?? item.id)}
      onDelete={() => handleDelete(item._id ?? item.id)}
    />
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

