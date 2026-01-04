import useRecipeForm from "../../components/useRecipeForm";
import React, { useState } from "react";
import styles from "./CreateRecipe.module.css";

import { useForm } from "react-hook-form";
const CreateRecipe = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
 const [loading, setLoading] = useState(false);
  const {createRecipeHandler}=useRecipeForm();
  
  return (

    <section className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(createRecipeHandler)}>
        <h1>Create New Recipe</h1>
        <p className={styles.subtitle}>
          Share your favorite dish with the Cookify community
        </p>

        {/* Image URL */}
        <label>Recipe Image URL</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="https://example.com/recipe.jpg"
          {...register('imageUrl')}
          // onChange={handleChange}
          required
        />

        {/* Title */}
        <label>Recipe Title</label>
        <input
          type="text"
          name="title"
          placeholder="Cheesy Veg Lasagna"
          {...register('title')}
          // onChange={handleChange}
          required
        />

        {/* Video URL (optional) */}
        <label>Video URL (optional)</label>
        <input
          type="text"
          name="videoUrl"
          placeholder="https://youtube.com/..."
          {...register('videoUrl')}
          // onChange={handleChange}
        />

        {/* Description */}
        <label>Short Description</label>
        <textarea
          name="description"
          placeholder="A rich and creamy vegetarian lasagna..."
          rows={3}
          {...register('description')}
          // onChange={handleChange}
          required
        />

        {/* Ingredients */}
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          placeholder={`• Lasagna sheets\n• Cheese\n• Tomato sauce`}
          rows={4}
          {...register('ingredients')}
          // onChange={handleChange}
          required
        />

        {/* Instructions */}
        <label>Cooking Instructions</label>
        <textarea
          name="instructions"
          placeholder={`1. Preheat oven to 180°C\n2. Prepare the sauce\n3. Layer ingredients`}
          rows={5}
          {...register('instructions')}
          // onChange={handleChange}
          required
        />

        <button type="submit" onClick={()=>{setLoading(true);}} >
          {/* <button type="submit" disabled={loading} ? dont knoow its meaning></button> */}
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </section>

  );
};

export default CreateRecipe;

