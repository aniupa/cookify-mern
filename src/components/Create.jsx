import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../cssFiles/CreateRecipe.module.css";
import { AppContent } from "../context/recipeContext";
import { useContext } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addRecipe } = useContext(AppContent);

  const submitHandler = (data) => {
    data.id = nanoid();

    addRecipe(data);
    toast.success("recipe added successfully!!");
    reset();
    navigate("/recipes");

  };
  return (
    <div className={styles.recipeContainer}>
      
    <form className={styles.recipeForm} onSubmit={handleSubmit(submitHandler)}>
      <input type="url" {...register("image")} placeholder="enter image url" />
     
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
        {...register("instruction")}
        placeholder="enter the instructions to make the recipe"
      ></textarea>
      <button type="submit">save recipe</button>
    </form>
    </div>
  );
};

export default Create;
