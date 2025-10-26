import React from "react";
import styles from "../cssFiles/CreateRecipe.module.css";
import { useForm } from "react-hook-form";


const RecipeForm = ({submitHandler,recipeBtnName}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
  return (
    <>
      <div className={styles.recipeContainer}>
        <form
          className={styles.recipeForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="url"
            {...register("image")}
            //   defaultValue={}
            placeholder="enter image url"
          />
          {/* <small>{errors}</small> */}
          <input
            type="text"
            placeholder="recipe title"
            {...register("title")}
          />
          <textarea
            name="description"
            {...register("description")}
            placeholder="enter the description"
          ></textarea>
          <textarea
            name="ingredients"
            {...register("ingredients")}
            placeholder="enter the ingredients"
          ></textarea>
          <textarea
            name="instructions"
            {...register("instruction")}
            placeholder="enter the instructions to make the recipe"
          ></textarea>
          <button type="submit">{recipeBtnName}</button>
        </form>
      </div>
    </>
  );
};

export default RecipeForm;
