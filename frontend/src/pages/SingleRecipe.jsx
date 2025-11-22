import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../cssFiles/singlePage.module.css";
import { toast } from "react-toastify";
import likeImg from "../assets/like-removebg-preview.png";
import unlikeImg from "../assets/unlike-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncAddToFavorite } from "../store/actions/recipeAction";


const SingleRecipe = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch=useDispatch()
  const recipe=useSelector((state)=>state.recipes.data)
  const user=useSelector((state)=>state.users.data)
  const filteredData = recipe?.find((f) => f._id == id);

  const favorite = () => {
    //testing logic
    const favResult=!filteredData.fav;
    dispatch(asyncAddToFavorite({id,favResult}))
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
          <h3>Instruction:{filteredData?.instructions}</h3>
          <h5>Ingredients:{filteredData?.ingredients}</h5>
          <div className={styles.btnContainer}>
            <button className={styles.positivebtn} onClick={() => navigate(-1)}>
              Go Back
            </button>
            {user?.data?.user?.isAdmin ? <button className={styles.negativebtn} onClick={delItem}>
              Delete Recipe
            </button>:''}
            
            
            <NavLink
              to={`/recipe/update/${id}`}
              // className={styles.positivebtn}
            >
             <button className={styles.positivebtn} onClick={() => navigate(-1)}>
              Update
            </button>
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
