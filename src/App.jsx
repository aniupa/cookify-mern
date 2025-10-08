import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/AddRecipe" element={<CreateRecipe />} />
            
      </Routes>
    </BrowserRouter>
  );
};

export default App;
