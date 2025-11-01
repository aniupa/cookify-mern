import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
  const user= useSelector((state) => state?.users?.data);
//   console.log(user);
  
  return user ? props.children : <Navigate to={"/login"} />;
  // <div>AuthWrapper</div>
};

export default AuthWrapper;
