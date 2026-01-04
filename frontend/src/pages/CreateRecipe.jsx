import useRecipeForm from "../components/useRecipeForm";
import React, { useState } from "react";
import styles from "../cssFiles/CreateRecipe.module.css";

import { useForm } from "react-hook-form";
const CreateRecipe = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
 const [loading, setLoading] = useState(false);
  const {createRecipeHandler}=useRecipeForm();
  
  return (

    //  <section className={styles.page}>
    //   <div className={styles.container}>
    //     <div className={styles.card}>
    //       <header className={styles.header}>
    //         <h1>Create New Recipe</h1>
    //         <p>Share your favorite dish with the Dishcovery community</p>
    //       </header>

    //       <form className={styles.form} onSubmit={handleSubmit(createRecipeHandler)}>
    //         <div className={styles.field}>
    //           <label>Recipe Image URL</label>
    //           <input type="url" placeholder="https://example.com/recipe.jpg" {...register('imageUrl')}/>
              
    //         </div>

    //         <div className={styles.field}>
    //           <label>Recipe Title</label>
    //           <input type="text" placeholder="Cheesy Veg Lasagna" {...register('title')}/>
    //         </div>

    //         <div className={styles.field}>
    //           <label>Short Description</label>
    //           <textarea rows="3" placeholder="A rich and creamy vegetarian lasagna..." {...register('description')}/>
    //         </div>

    //         <div className={styles.field}>
    //           <label>Ingredients</label>
    //           <textarea rows="4" placeholder="• Lasagna sheets&#10;• Cheese&#10;• Tomato sauce" {...register('ingredients')}/>
    //         </div>

    //         <div className={styles.field}>
    //           <label>Cooking Instructions</label>
    //           <textarea rows="5" placeholder="1. Preheat oven to 180°C..." {...register('instructions')}/>
    //         </div>

    //         <button className={styles.submitBtn} type="submit">Create Recipe </button>
    //       </form>
    //     </div>
    //   </div>
    // </section>
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

