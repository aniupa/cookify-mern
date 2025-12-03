import useRecipeForm from "../components/useRecipeForm";
import { useForm } from "react-hook-form";

import styles from "../cssFiles/CreateRecipe.module.css";

const UpdateRecipe = () => {

 
 

  const { register, handleSubmit, formState: { errors } } = useForm();
    const {updateRecipeHandler}=useRecipeForm();

 
  return (
    <div className={styles.recipeContainer}>
      <form
        className={styles.recipeForm}
        onSubmit={handleSubmit(updateRecipeHandler)}
      >
        <input
          type="url"
          {...register("image")}
          placeholder="enter image url"
        />
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="recipe title"
        />
        {errors.title && <p style={{ color: "red" }}>Title is required</p>}
        <textarea
          {...register("description")}
          placeholder="enter the description"
        ></textarea>
        <textarea
          {...register("ingredients")}
          placeholder="enter the ingredients"
        ></textarea>
        <textarea
          {...register("instructions")}
          placeholder="enter the instructions to make the recipe"
        ></textarea>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
