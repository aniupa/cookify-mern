import mongoose from "mongoose";
// import { nanoid } from "nanoid";
const recipeSchema = new mongoose.Schema({

  fav: { type: Boolean, default: false },
  imageUrl: {
    type: String,
    required: [true, "image url is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    maxlength: 500,
  },
  ingredients: { type: String, required: [true, "Ingredients is required"] },
  instructions: {
    type: String,
    required: [true, "instructions are required"],
  },
});

export const recipeModel = mongoose.model("recipe", recipeSchema);
