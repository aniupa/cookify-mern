import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  getRecipes,
  incrementRecipeViews,
  setFavorite,
  updateRecipe,
} from "../services/recipes.service.js";

const handleServiceError = (res, error, label) => {
  if (error?.status) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(label, error);
  return res.status(500).json({ message: "Internal server error" });
};

export async function getRecipesController(req, res) {
  try {
    const result = await getRecipes({
      limit: req.query.limit,
      after: req.query.after || null,
      userId: req.query.userId || null,
    });
    return res.json(result);
  } catch (error) {
    return handleServiceError(res, error, "getRecipesController error:");
  }
}

/**
 * POST /api/recipes
 */
export async function createRecipeController(req, res) {
  try {
    const userId = req.userId || req.body.userId;
    const recipe = await createRecipe({ userId, recipe: req.body.recipe });
    return res.status(201).json({ recipe, userId });
  } catch (error) {
    return handleServiceError(res, error, "createRecipeController error:");
  }
}

/**
 * DELETE /api/recipes/:id
 */
export async function deleteRecipeController(req, res) {
  try {
    await deleteRecipe({
      recipeId: req.params.id,
      userId: req.userId || req.body?.userId || req.query?.userId,
    });
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return handleServiceError(res, error, "deleteRecipeController error:");
  }
}

export async function updateRecipeController(req, res) {
  try {
    const updatedRecipe = await updateRecipe({
      id: req.params.id,
      userId: req.userId || req.body?.userId,
      data: req.body,
    });
    return res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    return handleServiceError(res, error, "updateRecipeController error:");
  }
}


export async function getMyRecipesController(req, res) {
  try {
    const myRecipe = await getMyRecipes({ userId: req.params.id });
    res.status(200).json({ myRecipe });
  } catch (error) {
    return handleServiceError(res, error, "getMyRecipesController error:");
  }
}

export async function setFavoriteController(req, res) {
  try {
    const result = await setFavorite({
      recipeId: req.params.id,
      userId: req.userId || req.body?.userId,
      favorite: req.body?.favorite,
      fav: req.body?.fav,
    });
    return res.status(200).json({ favorite: result.favorite });
  } catch (error) {
    return handleServiceError(res, error, "setFavoriteController error:");
  }
}

export async function incrementRecipeViewsController(req, res) {
  try {
    const recipe = await incrementRecipeViews({ id: req.params.id });
    return res.status(200).json({ id: recipe._id, views: recipe.views });
  } catch (error) {
    return handleServiceError(res, error, "incrementRecipeViewsController error:");
  }
}
