import useRecipeForm from "../components/useRecipeForm";
import React from "react";
import styles from "../cssFiles/CreateRecipe.module.css";
import { useForm } from "react-hook-form";
const CreateRecipe = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
  const {createRecipeHandler}=useRecipeForm();
  return (

     <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h1>Create New Recipe</h1>
            <p>Share your favorite dish with the Dishcovery community</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit(createRecipeHandler)}>
            <div className={styles.field}>
              <label>Recipe Image URL</label>
              <input type="url" placeholder="https://example.com/recipe.jpg" {...register('imageUrl')}/>
              
            </div>

            <div className={styles.field}>
              <label>Recipe Title</label>
              <input type="text" placeholder="Cheesy Veg Lasagna" {...register('title')}/>
            </div>

            <div className={styles.field}>
              <label>Short Description</label>
              <textarea rows="3" placeholder="A rich and creamy vegetarian lasagna..." {...register('description')}/>
            </div>

            <div className={styles.field}>
              <label>Ingredients</label>
              <textarea rows="4" placeholder="• Lasagna sheets&#10;• Cheese&#10;• Tomato sauce" {...register('ingredients')}/>
            </div>

            <div className={styles.field}>
              <label>Cooking Instructions</label>
              <textarea rows="5" placeholder="1. Preheat oven to 180°C..." {...register('instructions')}/>
            </div>

            <button className={styles.submitBtn} type="submit">Create Recipe </button>
          </form>
        </div>
      </div>
    </section>

  );
};

export default CreateRecipe;

