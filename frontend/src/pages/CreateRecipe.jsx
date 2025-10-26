import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddRecipeActions } from "../store/actions/recipeAction";
import RecipeForm from "../components/RecipeForm";
const CreateRecipe = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const recipeBtnName = "Add Recipe";

  const submitHandler = async (data) => {
    dispatch(asyncAddRecipeActions(data));

    reset();
    navigate("/recipes");
  };
  return (
    <RecipeForm submitHandler={submitHandler} recipeBtnName={recipeBtnName} />
  );
};

export default CreateRecipe;
