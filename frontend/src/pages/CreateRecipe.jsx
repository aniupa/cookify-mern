import useRecipeForm from "../components/useRecipeForm";
import React from "react";
import styles from "../cssFiles/CreateRecipe.module.css";
import { useForm } from "react-hook-form";
const CreateRecipe = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
  const {createRecipeHandler}=useRecipeForm();
  return (
    // <div className={styles.recipeContainer}>
    //   <form className={styles.recipeForm} onSubmit={handleSubmit(createRecipeHandler)}>
    //     <input type="url" {...register("image")} placeholder="enter image url" />
    //     <input type="text" {...register("title", { required: true })} placeholder="recipe title" />
    //     {errors.title && <p style={{color:'red'}}>Title is required</p>}
    //     <textarea {...register("description")} placeholder="enter the description"></textarea>
    //     <textarea {...register("ingredients")} placeholder="enter the ingredients"></textarea>
    //     <textarea {...register("instructions")} placeholder="enter the instructions to make the recipe"></textarea>
    //     <button type="submit">Create Recipe</button>
    //   </form>
    // </div>
    //dsign 1
    //   <section className={styles.page}>
    //   <div className={styles.overlay}></div>

    //   <div className={styles.card}>
    //     <header className={styles.header}>
    //       <h1>Create New Recipe</h1>
    //       <p>Share your favorite dish with the Dishcovery community</p>
    //     </header>

    //     <form className={styles.form}>
    //       {/* Image URL */}
    //       <div className={styles.field}>
    //         <label>Recipe Image URL</label>
    //         <input
    //           type="text"
    //           placeholder="https://example.com/recipe-image.jpg"
    //         />
    //       </div>

    //       {/* Title */}
    //       <div className={styles.field}>
    //         <label>Recipe Title</label>
    //         <input type="text" placeholder="Cheesy Veg Lasagna" />
    //       </div>

    //       {/* Description */}
    //       <div className={styles.field}>
    //         <label>Short Description</label>
    //         <textarea
    //           placeholder="A rich and creamy vegetarian lasagna loaded with cheese..."
    //           rows={3}
    //         />
    //       </div>

    //       {/* Ingredients */}
    //       <div className={styles.field}>
    //         <label>Ingredients</label>
    //         <textarea
    //           placeholder="• Lasagna sheets&#10;• Cheese&#10;• Tomato sauce&#10;• Vegetables"
    //           rows={4}
    //         />
    //       </div>

    //       {/* Instructions */}
    //       <div className={styles.field}>
    //         <label>Cooking Instructions</label>
    //         <textarea
    //           placeholder="1. Preheat the oven to 180°C...&#10;2. Prepare the sauce...&#10;3. Layer ingredients..."
    //           rows={5}
    //         />
    //       </div>

    //       <button type="submit" className={styles.submitBtn}>
    //         Create Recipe 🍽️
    //       </button>
    //     </form>
    //   </div>
    // </section>

    // design 2

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

