import React, { createContext, useState } from "react";
// import { children } from "react";

export const AppContent = createContext();
export const Wrapper = ({ children }) => {
  let [recipe, setrecipe] = useState([]);
  const addRecipe = (newRecipe) => {
    setrecipe([...recipe, newRecipe]);
  };
  return (
    <AppContent.Provider value={{ recipe, addRecipe, setrecipe }}>
      {children}
    </AppContent.Provider>
  );
};
