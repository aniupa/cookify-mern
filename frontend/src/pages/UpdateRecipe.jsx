
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";


import { useDispatch, useSelector } from "react-redux";
import { asyncAddRecipeActions } from "../store/actions/recipeAction";
const UpdateRecipe = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const recipeBtnName = "Add Recipe";
  const params = useParams();
  const defaultRecipe = recipe.find((f) => f.id == params.id);
 
 

  const submitHandler = async (data) => {
    dispatch(asyncAddRecipeActions(data));

    reset();
    navigate("/recipes");
    const index = recipe.findIndex((i) => i.id == params.id);
    const copyData = [...recipe];
    copyData[index] = { ...copyData[index], ...data };
    setrecipe(copyData);
    
    toast.success("recipe data updated successfully!!");
    navigate('/recipes')
  };
  return (
    <RecipeForm submitHandler={submitHandler} recipeBtnName={recipeBtnName} />
  );
};

export default UpdateRecipe;
