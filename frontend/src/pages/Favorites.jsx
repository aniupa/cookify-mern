import React, { useEffect } from "react";
// import { AppContent } from "../context/recipeContext";
import RecipeCard from "../components/RecipeCard";
import styles from "../cssFiles/cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetFavoritesActions } from "../store/actions/recipeAction";

const Favorites = () => {
  // const { recipe } = useContext(AppContent);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.users?.data?.data?.user?._id);
  const favorites = useSelector((state) => state.favorites.data) || [];

  useEffect(() => {
    if (userId) {
      dispatch(asyncGetFavoritesActions(userId));
    }
  }, [dispatch, userId]);

  const mapped = favorites.map((item, i) => (
    <RecipeCard key={item.id ? item.id : i} item={item} />
  ));
  return (
    <div >
      {favorites?.length > 0 ? mapped : <h2>"No Favorites found !!"</h2>}
    </div>
  );
};

export default Favorites;
