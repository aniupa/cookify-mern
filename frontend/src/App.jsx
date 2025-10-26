import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import MainRoutes from "./routes/MainRoutes.jsx";
import { useDispatch } from "react-redux";

//Actions
import {asyncCurrentUser} from './store/actions/userAction.jsx'

//App
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    // dispatch(asyncL)
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
    </BrowserRouter>
  );
};

export default App;
