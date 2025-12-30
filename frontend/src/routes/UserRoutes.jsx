import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/:id/profile"
      
        element={<Profile />}
      />
    </Routes>
  );
};

export default UserRoutes;
