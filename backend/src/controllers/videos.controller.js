import { recipeModel } from "../models/recipe.model.js";

export async function getVideosController(req, res) {
  try {
    const videos = await recipeModel.find({
      videoUrl: {
        $exists: true,
        $nin: ["", null],
      },
    });

    return res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
