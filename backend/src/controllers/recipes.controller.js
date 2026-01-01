
import { recipeModel } from "../models/recipe.model.js";
import mongoose from "mongoose";

export async function getRecipesController(req, res) {
  try {
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 6);
    const after = req.query.after || null; // last-seen _id (string) or null

    // build query
    const query = {};
    if (after) {
      // validate cursor
      if (!mongoose.isValidObjectId(after)) {
        return res.status(400).json({ message: "Invalid cursor (after)" });
      }
      // descending order: newer -> older, so fetch _id < after
      query._id = { $lt:new mongoose.Types.ObjectId(after) };
    }

    // fetch limit+1 to determine hasMore
    const docs = await recipeModel
      .find(query)
      .sort({ _id: -1 }) // newest first (stable)
      .limit(limit + 1)
      .lean();

    const hasMore = docs.length > limit;
    const items = hasMore ? docs.slice(0, limit) : docs;

    return res.json({
      recipes: items,
      hasMore,
      nextCursor: items.length ? String(items[items.length - 1]._id) : null,
    });
  } catch (error) {
    console.error("getRecipesController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * POST /api/recipes
 */
export async function createRecipeController(req, res) {
  try {
    const userId=req.body.userId;
    const { title, imageUrl, description, ingredients, instructions ,videoUrl} = req.body.recipe;

   
    const newRecipe = await recipeModel.create({
      title,
      imageUrl,
      description,
      ingredients,
      instructions,
      videoUrl,
      createdBy:userId
    });

    return res.status(201).json(newRecipe,userId);
  } catch (error) {
    console.error("createRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * DELETE /api/recipes/:id
 */
export async function deleteRecipeController(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const recipe = await recipeModel.findByIdAndDelete(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("deleteRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateRecipeController(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const data = { ...req.body };

    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === null || data[key] === undefined) {
        delete data[key];
      }
    });

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const recipe = await recipeModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    console.error("updateRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getMyRecipesController(req, res) {
  try {
    //  console.log(req.body);
     const {userId}=req.body;
     const myRecipe=await recipeModel.find({createdBy:userId}).sort({createdAt:-1}).lean();
     res.status(200).json({myRecipe})

     
  } catch (error) {
    console.error("getRecipesController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}