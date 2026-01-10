import mongoose from "mongoose";
// import { nanoid } from "nanoid";
const recipeSchema = new mongoose.Schema(
  {
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
    videoUrl: {
      type: String,
      // required: [true, "videoUrl is required"],
      trim: true,
      // maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      maxlength: 500,
    },
    views: { type: Number, default: 0, min: 0 },
    ingredients: { type: [String], required: [true, "Ingredients is required"] },
    instructions: {
      type: [String],
      required: [true, "instructions are required"],
    },
    time: { type: Number, min: 1 },
    difficulty: {
      type: String,
      trim: true,
      lowercase: true,
      // enum: ["easy", "medium", "hard"],
    },
    isVeg: { type: Boolean },
    // isTrending: { type: Boolean },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
  },
  { timestamps: true }
);

export const recipeModel = mongoose.model("recipe", recipeSchema);
