import { recipeModel } from "../models/recipe.model.js";

export async function getRecipesController(req, res) {
  try {
    //---starts from here
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 6;
    // const skip = (page - 1) * limit;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 6);
    const skip = (page - 1) * limit;
    //-- end here upper block of code i dnt know about it that much
    // const recipes = await recipeModel.find().skip(skip).limit(limit);

    // const total = await recipeModel.countDocuments(); //dnt'k about countDocuments as well
    const [recipes, total] = await Promise.all([
      recipeModel
        .find()
        .sort({ createdAt: -1 }) // stable order: newest first
        .skip(skip)
        .limit(limit)
        .lean(),
      recipeModel.countDocuments(),
    ]);
    res.status(200).json({ recipes, total,page, hasMore: page * limit < total });
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
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function deleteRecipeController(req, res) {
  try {
    const id = req.params.id;
    const recipe = await recipeModel.findByIdAndDelete(id);

    if (!recipe) return res.status(404).json({ message: "recipe not found" });
    res.status(200).json({ message: "recipes deleted successfully" });
  } catch (error) {
    console.log("error in delete recipeController", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateRecipeController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    Object.keys(data).forEach((item) => {
      if (
        data[item] === "" ||
        data[item] === null ||
        data[item] === undefined
      ) {
        delete data[item];
      }
    });

    const recipe = await recipeModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found !!" });
    }
    res.status(200).json({ message: "recipe updated successfully", recipe });
  } catch (error) {
    console.log(error);
  }

  // const recipe=await recipeModel.findByIdAndUpdate(id,{}
}
