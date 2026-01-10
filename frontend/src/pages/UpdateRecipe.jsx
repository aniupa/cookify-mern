import useRecipeForm from "../components/useRecipeForm";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../pages/createRecipe/CreateRecipe.module.css";

const UpdateRecipe = () => {
  const { id } = useParams();
  const recipeList = useSelector((state) => state.recipes.data) || [];
  const myRecipes = useSelector((state) => state.recipes.MyRecipes) || [];
  const allRecipes = [...myRecipes, ...recipeList];
  const currentRecipe = allRecipes.find((item) => (item._id ?? item.id) === id);

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      imageUrl: "",
      title: "",
      videoUrl: "",
      description: "",
      ingredients: [""],
      instructions: [""],
      time: "",
      isVeg: "",
    },
  });

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

  const { updateRecipeHandler } = useRecipeForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentRecipe) return;
    const normalizeList = (value) => {
      if (Array.isArray(value)) {
        return value.length ? value : [""];
      }
      if (typeof value === "string") {
        const items = value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
        return items.length ? items : [""];
      }
      return [""];
    };

    reset({
      imageUrl: currentRecipe.imageUrl || "",
      title: currentRecipe.title || "",
      videoUrl: currentRecipe.videoUrl || "",
      description: currentRecipe.description || "",
      ingredients: normalizeList(currentRecipe.ingredients),
      instructions: normalizeList(currentRecipe.instructions),
      time: currentRecipe.time ?? "",
      isVeg:
        typeof currentRecipe.isVeg === "boolean"
          ? String(currentRecipe.isVeg)
          : "",
    });
  }, [currentRecipe, reset]);

  return (
    <section className={styles.page}>
      <form
        className={styles.card}
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          updateRecipeHandler(data);
        })}
      >
        <h1>Update Recipe</h1>
        <p className={styles.subtitle}>
          Refresh your recipe details for the Cookify community
        </p>

        <label>Recipe Image URL</label>
        <input
          type="text"
          name="imageUrl"
          {...register("imageUrl")}
          placeholder="https://example.com/recipe.jpg"
          required
        />

        <label>Recipe Title</label>
        <input
          type="text"
          name="title"
          {...register("title")}
          placeholder="Cheesy Veg Lasagna"
          required
        />

        <label>Video URL (optional)</label>
        <input
          type="text"
          name="videoUrl"
          {...register("videoUrl")}
          placeholder="https://youtube.com/..."
        />

        <label>Short Description</label>
        <textarea
          name="description"
          {...register("description")}
          placeholder="A rich and creamy vegetarian lasagna..."
          rows={3}
          required
        ></textarea>

        <label>Ingredients</label>
        {ingredientFields.map((item, index) => (
          <div key={item.id}>
            <input
              {...register(`ingredients.${index}`)}
              placeholder={`Ingredient ${index + 1}`}
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addIngredient("")}>
          + Add Ingredient
        </button>

        <label>Cooking Instructions</label>
        {instructionFields.map((item, index) => (
          <div key={item.id}>
            <input
              {...register(`instructions.${index}`)}
              placeholder={`Step ${index + 1}`}
            />
            <button type="button" onClick={() => removeStep(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addStep("")}>
          + Add Step
        </button>

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

        <button type="submit">{loading ? "Updating..." : "Update Recipe"}</button>
      </form>
    </section>
  );
};

export default UpdateRecipe;
