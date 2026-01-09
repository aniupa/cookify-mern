import useRecipeForm from "../../components/useRecipeForm";
import React, { useState } from "react";
import styles from "./CreateRecipe.module.css";

import { useForm,useFieldArray } from "react-hook-form";
const CreateRecipe = () => {
 const { register, handleSubmit,control, formState: { errors } } = useForm({ingredients:[''],instructions:['']});
 const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "instructions",
  });

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
       
         {ingredientFields.map((item, index) => (
        <div key={item.id}>
          <input
            {...register(`ingredients.${index}`)}
            placeholder={`Ingredient ${index + 1}`}
          />
          <button type="button" onClick={() => removeIngredient(index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => addIngredient("")}>+ Add Ingredient</button>


        {/* Instructions */}
        <label>Cooking Instructions</label>
       
        {instructionFields.map((item, index) => (
        <div key={item.id}>
          <input
            {...register(`instructions.${index}`)}
            placeholder={`Step ${index + 1}`}
          />
          <button type="button" onClick={() => removeStep(index)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={() => addStep("")}>+ Add Step</button>

        <label>Time (minutes)</label>
        <input
          type="number"
          name="time"
          placeholder="30"
          min="1"
          {...register("time")}
        />

        
        <label>Veg Option</label>
        <select name="isVeg" {...register("isVeg")}>
          <option value="">Select</option>
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>

        

        <button type="submit" onClick={()=>{setLoading(true);}} >
        
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </section>

  );
};

export default CreateRecipe;

