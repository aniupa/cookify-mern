import React from "react";
// import { Route,Routes } from 'react-router-dom'
import { lazy } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const Recipes = lazy(() => import("../pages/Recipes"));
const CreateRecipe = lazy(() => import("../pages/CreateRecipe"));
const SingleRecipe = lazy(() => import("../pages/SingleRecipe"));
const RecipeCard = lazy(() => import("../components/RecipeCard"));
const UpdateRecipe = lazy(() => import("../pages/UpdateRecipe"));
const Favorites = lazy(() => import("../pages/favorites"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));
const About = lazy(() => import("../pages/About"));
import Loader from '../pages/Loader'
const UserRoutes = lazy(() => import("./UserRoutes"));
const AuthWrapper = lazy(() => import("../services/AuthWrapper"));

import Navbar from "../components/Navbar";

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/recipes"
        element={
          <AuthWrapper>
            <Recipes />
          </AuthWrapper>
        }
      />
      <Route path="/recipes/details/:id" element={<SingleRecipe />} />
      <Route path="/AddRecipe" element={<CreateRecipe />} />
      <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
      <Route path="/favorites/" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="user/*" element={<UserRoutes />} />
      <Route path="*" element={<NotFound />} />
      {/* auth Routes */}
    </Routes>
    </Suspense>
  );
};

export default MainRoutes;
