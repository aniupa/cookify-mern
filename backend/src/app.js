import express from "express";
import recipeRoutes from "../src/routes/recipe.routes.js";
import userRoutes from "./routes/userRoutes.js";
import videosRouter from './routes/videosRouter.js'
// import userRecipeRoutes from './routes/userRecipes.route.js'
import cors from "cors";

const app = express();
app.use(
  cors({ origin: ["http://localhost:5173",'https://your-frontend.vercel.app'], methods: ["GET", 'PATCH',"POST", "DELETE"] })
);
app.use(express.json());
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);
app.use("/api", videosRouter);
// app.use("/api", userRecipeRoutes);

export default app;
