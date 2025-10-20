// import React, { createContext, useEffect, useState } from "react";

// export const AppContent = createContext();
// export const Wrapper = ({ children }) => {
//   let [recipe, setrecipe] = useState([]);
//   useEffect(() => {
//     const newStorage = localStorage.getItem("recipes");
//     if (newStorage) {
//       setrecipe(JSON.parse(newStorage));
//     } else {
//       setrecipe([]);
//     }
//   }, []);
//   useEffect(() => {
//     localStorage.setItem("recipes", JSON.stringify(recipe));
//   }, [recipe]);

//   const addRecipe = (newRecipe) => {
//     const data = [...recipe, newRecipe];
//     setrecipe([...recipe, newRecipe]);

//   };
//   return (
//     <AppContent.Provider value={{ recipe, addRecipe, setrecipe }}>
//       {children}
//     </AppContent.Provider>
//   );
// };
