import express from "express";
import {getRecipesController,createRecipeController,deleteRecipeController} from '../controllers/recipes.controller.js'
const router = express.Router();

router.get('/recipes',getRecipesController)
router.post('/recipes',createRecipeController)
router.delete('/recipes/:id',deleteRecipeController)

export default router