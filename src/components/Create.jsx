import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateRecipe.module.css";
import { AppContent } from "../context/recipeContext";
import { useContext } from "react";
import {nanoid} from "nanoid";
const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addRecipe } = useContext(AppContent);

  const submitHandler = (data) => {
    data.id = nanoid();
    addRecipe(data);
    console.log(data);
    
  };
  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit(submitHandler)}>
      <input type="url" {...register("image")} placeholder="enter image url" />
      {/* <small>{errors}</small> */}
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
  );
};

export default Create;
