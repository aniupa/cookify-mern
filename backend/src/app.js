import express from "express";
import recipeRoutes from "../src/routes/recipe.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "DELETE"] })
);
app.use(express.json());
app.use("/api", recipeRoutes);

export default app;
