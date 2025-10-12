import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../cssFiles/CreateRecipe.module.css";
import { AppContent } from "../context/recipeContext";
import { useContext } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const UpdateRecipe = () => {
     const { recipe, setrecipe, addRecipe } = useContext(AppContent);
  const params = useParams();
  const navigate = useNavigate();
  const defaultRecipe = recipe.find((f) => f.id == params.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultRecipe?.title,
      image: defaultRecipe?.image,
      description: defaultRecipe?.description,
      instruction: defaultRecipe?.instruction,
      ingredients: defaultRecipe?.ingredients,
    },
  });
 

  const updateHandler = (data) => {
    const index = recipe.findIndex((i) => i.id == params.id);
    const copyData = [...recipe];
    copyData[index] = { ...copyData[index], ...data };
    setrecipe(copyData);
    
    toast.success("recipe data updated successfully!!");
    navigate('/recipes')

  };
  return (
    <div className={styles.recipeContainer}>
      <form
        className={styles.recipeForm}
        onSubmit={handleSubmit(updateHandler)}
      >
        <input
          type="url"
          {...register("image")}
          //   defaultValue={}
          placeholder="enter image url"
        />
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
        <button type="submit">Update recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
