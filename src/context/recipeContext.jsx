import React, { createContext, useState } from "react";
// import { children } from "react";

export const AppContent = createContext();
export const Wrapper = ({ children }) => {
  const [recipe, setrecipe] = useState([{ title: "first recipe",recipeImg:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D" }]);
  const addRecipe = (addRecipe) => {
    setrecipe([...recipe, addRecipe]);
  };
  return (
    <AppContent.Provider value={{ recipe,   addRecipe }}>
      {children}
    </AppContent.Provider>
  );
};
