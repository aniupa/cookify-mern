import styles from "../cssFiles/cards.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteRecipe from "../utils/useInfiniteRecipe.jsx";

import RecipeCard from "../components/RecipeCard";
import End from "./End";
const Recipes = () => {
  const { recipe, hasMore, fetchRecipes } = useInfiniteRecipe();

  const renderRecipe = recipe?.map((item, i) => {
    return <RecipeCard key={item?._id || i} item={item} />;
  });
  return (
    <>
      {" "}
      {/* recipe search karne ke liye option incomplete */}
      {/* <input
        type="search"
        className={styles.search}
        placeholder="Search recipe   🔍"
      /> */}
      <div className={styles.container}>
        {/* <p className={styles.veg}>Veg</p> */}
        {/* <input id="foodType" type="radio" />{" "} */}
        {/* <p className={styles.nonVeg}>Non-Veg</p> */}
        {/* <input id="foodType" type="radio" /> */}
      </div>
      {recipe && recipe.length > 0 ? (
        <InfiniteScroll
          dataLength={recipe.length}
          next={fetchRecipes}
          hasMore={hasMore}
          endMessage={<End />}
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
