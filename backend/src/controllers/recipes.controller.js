import { recipeModel } from "../models/recipe.model.js";

export async function getRecipesController(req, res) {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json( recipes );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function createRecipeController(req, res) {
  try {
    const { title, image, description, ingredients, instructions } = req.body;
    const newRecipe = await recipeModel.create({
      title,
      image,
      description,
      ingredients,
      instructions,
    });
    res.status(201).json( newRecipe );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function deleteRecipeController(req, res) {
  try {
    const id = req.params.id;
    const recipe=await recipeModel.findByIdAndDelete(id);
    
    if (!recipe) return res.status(404).json({ message: "recipe not found" });
    res.status(200).json({ message: "recipes deleted successfully" });
} catch (error) {
    console.log("error in delete recipeController",error);
    res.status(500).json({ message: "internal server error" });
  }
}
