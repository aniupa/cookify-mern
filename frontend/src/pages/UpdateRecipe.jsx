import useRecipeForm from "../components/useRecipeForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      imageUrl: "",
      title: "",
      videoUrl: "",
      description: "",
      ingredients: "",
      instructions: "",
      time: "",
      difficulty: "",
      isVeg: "",
      isTrending: "",
    },
  });

  const { updateRecipeHandler } = useRecipeForm();

  useEffect(() => {
    if (!currentRecipe) return;
    reset({
      imageUrl: currentRecipe.imageUrl || "",
      title: currentRecipe.title || "",
      videoUrl: currentRecipe.videoUrl || "",
      description: currentRecipe.description || "",
      ingredients: currentRecipe.ingredients || "",
      instructions: currentRecipe.instructions || "",
      time: currentRecipe.time ?? "",
      difficulty: currentRecipe.difficulty ?? "",
      isVeg:
        typeof currentRecipe.isVeg === "boolean"
          ? String(currentRecipe.isVeg)
          : "",
      isTrending:
        typeof currentRecipe.isTrending === "boolean"
          ? String(currentRecipe.isTrending)
          : "",
    });
  }, [currentRecipe, reset]);

  return (
    <section className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(updateRecipeHandler)}>
        <h1>Update Recipe</h1>

        <label>Recipe Image URL</label>
        <input
          type="text"
          {...register("imageUrl")}
          placeholder="https://example.com/recipe.jpg"
        />

        <label>Recipe Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="recipe title"
        />
        {errors.title && <p style={{ color: "red" }}>Title is required</p>}

        <label>Video URL (optional)</label>
        <input
          type="text"
          {...register("videoUrl")}
          placeholder="https://youtube.com/..."
        />

        <label>Short Description</label>
        <textarea
          {...register("description")}
          placeholder="enter the description"
        ></textarea>

        <label>Ingredients</label>
        <textarea
          {...register("ingredients")}
          placeholder="enter the ingredients"
        ></textarea>

        <label>Cooking Instructions</label>
        <textarea
          {...register("instructions")}
          placeholder="enter the instructions to make the recipe"
        ></textarea>

        <label>Time (minutes)</label>
        <input type="number" {...register("time")} placeholder="30" min="1" />

        <label>Difficulty</label>
        <select {...register("difficulty")}>
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label>Veg Option</label>
        <select {...register("isVeg")}>
          <option value="">Select</option>
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>

        <label>Trending</label>
        <select {...register("isTrending")}>
          <option value="">Select</option>
          <option value="true">Trending</option>
          <option value="false">Not Trending</option>
        </select>

        <button type="submit">Update Recipe</button>
      </form>
    </section>
  );
};

export default UpdateRecipe;
