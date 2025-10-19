import express from "express";
import recipeRoutes from '../src/routes/recipe.routes.js'
const app = express();

app.use(express.json());
app.use('/api',recipeRoutes)

export default app;
