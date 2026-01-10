import express from "express";
import {
  getRecipesController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
  incrementRecipeViewsController,
  setFavoriteController,
} from "../controllers/recipes.controller.js";
import { getMyRecipesController } from "../controllers/recipes.controller.js";
import { requireUserId } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/recipes',getRecipesController)
router.post('/recipes',requireUserId,createRecipeController)
router.delete('/recipes/:id',requireUserId,deleteRecipeController)
router.patch('/recipes/:id',requireUserId,updateRecipeController)
router.post("/recipes/:id/views", incrementRecipeViewsController);
router.post("/recipes/:id/favorite", requireUserId, setFavoriteController);

router.get('/user/:id/myRecipes',getMyRecipesController)

export default router
