import { recipeModel } from "../models/recipe.model.js";

export async function getVideosController(req, res) {
  try {
    const videos = await recipeModel.find({
      videoUrl: {
        $exists: true,
        $ne: "",
        $ne: null,
      },
    });

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
  }
}
