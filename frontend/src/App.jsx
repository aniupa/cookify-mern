import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import MainRoutes from "./routes/MainRoutes.jsx";
import { useDispatch } from "react-redux";

//Actions
import {asyncCurrentUser} from './store/actions/userAction.jsx'
import { asyncGetRecipeActions } from "./store/actions/recipeAction.jsx";

//App
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <MainRoutes />
    </BrowserRouter>
  );
};

export default App;
