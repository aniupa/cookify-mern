import React from "react";
// import { Route,Routes } from 'react-router-dom'
import { lazy } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));

const RecipeVideos = lazy(() => import("../pages/Videos/RecipeVideos"));
const Recipes = lazy(() => import("../pages/Recipes"));
const CreateRecipe = lazy(() => import("../pages/createRecipe/CreateRecipe"));
const SingleRecipe = lazy(() => import("../pages/singleRecipePg/SingleRecipe"));
const RecipeCard = lazy(() => import("../components/RecipeCard"));
const UpdateRecipe = lazy(() => import("../pages/UpdateRecipe"));
const Favorites = lazy(() => import("../pages/favorites"));
const Login = lazy(() => import("../pages/authetication/login/Login"));
const MyRecipes = lazy(() => import("../pages/myRecipes/MyRecipes"));
const Register = lazy(() =>
  import("../pages/authetication/RegisterUser/RegisterUser")
);
const NotFound = lazy(() => import("../pages/NotFound"));
const About = lazy(() => import("../pages/About"));
import Loader from "../pages/Loader";
const UserRoutes = lazy(() => import("./UserRoutes"));
const AuthWrapper = lazy(() => import("../services/AuthWrapper"));
import Navbar from "../components/Navbar";

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/user/:id/Home"
          element={
            <AuthWrapper>
              <Navbar />
              <Home />
            </AuthWrapper>
          }
        />
        <Route
          path="/user/:id/MyRecipes"
          element={
            <AuthWrapper>
              <Navbar />
              <MyRecipes />
            </AuthWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <AuthWrapper>
              <Navbar />
              <About />
            </AuthWrapper>
          }
        />
        <Route
          path="/user/:id/recipes/"
          element={
            <AuthWrapper>
              <Navbar />
              <Recipes />
            </AuthWrapper>
          }
        />
        <Route
          path="/recipes/videos"
          element={
            <AuthWrapper>
              <Navbar />
              <RecipeVideos />
            </AuthWrapper>
          }
        />
        <Route
          path="/recipes/details/:id"
          element={
            <AuthWrapper>
              <Navbar />
              <SingleRecipe />{" "}
            </AuthWrapper>
          }
        />
        <Route
          path="/user/:id/AddRecipe/"
          element={
            <AuthWrapper>
              <Navbar />
              <CreateRecipe />{" "}
            </AuthWrapper>
          }
        />

        <Route
          path="/user/:id/recipe/update/:id"
          element={
            <AuthWrapper>
              <Navbar />
              <UpdateRecipe />{" "}
            </AuthWrapper>
          }
        />

        <Route
          path="/user/:id/favorites/"
          element={
            <AuthWrapper>
              <Navbar />
              <Favorites />{" "}
            </AuthWrapper>
          }
        />
        <Route
          path="/user/*"
          element={
            <AuthWrapper>
              <Navbar />
              <UserRoutes />{" "}
            </AuthWrapper>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* auth Routes */}
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
