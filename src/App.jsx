import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import SingleRecipe from "./pages/SingleRecipe";
import RecipeCard from "./components/RecipeCard";
import UpdateRecipe from "./pages/UpdateRecipe";
import Favorites from "./pages/favorites";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/details/:id" element={<SingleRecipe />} />
        <Route path="/AddRecipe" element={<CreateRecipe />} />
        <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
        <Route path="/favorites/" element={<Favorites/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
