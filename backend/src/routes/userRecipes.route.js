import express from "express";
import { getMyRecipesController } from "../controllers/recipes.controller.js";

const router = express.Router();

router.get('/user/:id/myRecipes',getMyRecipesController)

export default router;


//later delete no need