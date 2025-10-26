import React from 'react'
// import { Route,Routes } from 'react-router-dom'
import {  Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Navbar from "../components/Navbar";
import CreateRecipe from "../pages/CreateRecipe";
import SingleRecipe from "../pages/SingleRecipe";
import RecipeCard from "../components/RecipeCard";
import UpdateRecipe from "../pages/UpdateRecipe";
import Favorites from "../pages/favorites";
import Login from '../pages/Login';
import Register from '../pages/Register';

const MainRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/details/:id" element={<SingleRecipe />} />
        <Route path="/AddRecipe" element={<CreateRecipe />} />
        <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
        <Route path="/favorites/" element={<Favorites/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
  )
}

export default MainRoutes