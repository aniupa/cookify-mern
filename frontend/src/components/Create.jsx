import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../cssFiles/CreateRecipe.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddRecipeActions } from "../store/actions/recipeAction";
const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
   
      dispatch( asyncAddRecipeActions(data));
      
      
      reset();
      navigate("/recipes");
    
  };
  return (
    <div className={styles.recipeContainer}>
      <form
        className={styles.recipeForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
          type="url"
          {...register("image")}
          placeholder="enter image url"
        />

        <input type="text" placeholder="recipe title" {...register("title")} />
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
          {...register("instructions")}
          placeholder="enter the instructions to make the recipe"
        ></textarea>
        <button type="submit">save recipe</button>
      </form>
    </div>
  );
};

export default Create;
