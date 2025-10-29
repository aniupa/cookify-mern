import axios from '../../utils/axios'
import { toast } from "react-toastify";

//reducers
import { loadUser } from "../reducers/UserSlice";


export const asyncRegisterUser = (data) => async (dispatch, getState) => {
  try {console.log(data);
    const res = await axios.post("/register", data);
    
    
    toast.success("user created successfully");
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/login", data);
    localStorage.setItem("token", JSON.stringify(res));
    dispatch(asyncCurrentUser())
    console.log("inside userAction.jsx with asyncLoginUser ::", res);

    toast.success("user logged in successfully");
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser = () => (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) dispatch(loadUser(user));
    else console.log("unauthorized user");
  } catch (error) {
    console.log(error);
  }
  //
};
