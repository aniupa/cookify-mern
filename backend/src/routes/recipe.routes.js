import express from "express";
import {getRecipesController,createRecipeController,updateRecipeController,deleteRecipeController} from '../controllers/recipes.controller.js'
const router = express.Router();

router.get('/recipes',getRecipesController)
router.post('/recipes',createRecipeController)
router.delete('/recipes/:id',deleteRecipeController)
router.patch('/recipes/:id',updateRecipeController)

export default router