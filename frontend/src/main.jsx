import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Wrapper } from "./context/recipeContext.jsx";
import {Provider} from 'react-redux'
import { ToastContainer } from "react-toastify";
import {store} from './store/store.jsx'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Wrapper> */}
      <App />
      <ToastContainer />
    {/* </Wrapper> */}
  </Provider>
);
